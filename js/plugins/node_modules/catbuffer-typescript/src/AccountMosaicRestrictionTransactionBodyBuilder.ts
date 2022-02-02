/**
 *** Copyright (c) 2016-2019, Jaguar0625, gimre, BloodyRookie, Tech Bureau, Corp.
 *** Copyright (c) 2020-present, Jaguar0625, gimre, BloodyRookie.
 *** All rights reserved.
 ***
 *** This file is part of Catapult.
 ***
 *** Catapult is free software: you can redistribute it and/or modify
 *** it under the terms of the GNU Lesser General Public License as published by
 *** the Free Software Foundation, either version 3 of the License, or
 *** (at your option) any later version.
 ***
 *** Catapult is distributed in the hope that it will be useful,
 *** but WITHOUT ANY WARRANTY; without even the implied warranty of
 *** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *** GNU Lesser General Public License for more details.
 ***
 *** You should have received a copy of the GNU Lesser General Public License
 *** along with Catapult. If not, see <http://www.gnu.org/licenses/>.
 **/

import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 * Shared content between AccountMosaicRestrictionTransaction and EmbeddedAccountMosaicRestrictionTransaction.
 **/
export class AccountMosaicRestrictionTransactionBodyBuilder implements Serializer {
    /** Type of restriction being applied to the listed mosaics.. **/
    readonly restrictionFlags: AccountRestrictionFlagsDto[];

    /** Array of mosaics being added to the restricted list.. **/
    readonly restrictionAdditions: UnresolvedMosaicIdDto[];

    /** Array of mosaics being removed from the restricted list.. **/
    readonly restrictionDeletions: UnresolvedMosaicIdDto[];

    /**
     * Constructor.
     *
     * @param restrictionFlags Type of restriction being applied to the listed mosaics..
     * @param restrictionAdditions Array of mosaics being added to the restricted list..
     * @param restrictionDeletions Array of mosaics being removed from the restricted list..
     */
    public constructor(
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: UnresolvedMosaicIdDto[],
        restrictionDeletions: UnresolvedMosaicIdDto[],
    ) {
        GeneratorUtils.notNull(restrictionFlags, 'restrictionFlags is null or undefined');
        GeneratorUtils.notNull(restrictionAdditions, 'restrictionAdditions is null or undefined');
        GeneratorUtils.notNull(restrictionDeletions, 'restrictionDeletions is null or undefined');
        this.restrictionFlags = restrictionFlags;
        this.restrictionAdditions = restrictionAdditions;
        this.restrictionDeletions = restrictionDeletions;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AccountMosaicRestrictionTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const restrictionFlags: AccountRestrictionFlagsDto[] = GeneratorUtils.toFlags(
            AccountRestrictionFlagsDto,
            GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray)),
        );
        byteArray.splice(0, 2);
        const restrictionAdditionsCount: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const restrictionDeletionsCount: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const restrictionAdditions: UnresolvedMosaicIdDto[] = GeneratorUtils.loadFromBinary(
            UnresolvedMosaicIdDto.loadFromBinary,
            Uint8Array.from(byteArray),
            restrictionAdditionsCount,
        );
        byteArray.splice(
            0,
            restrictionAdditions.reduce((sum, c) => sum + c.getSize(), 0),
        );
        const restrictionDeletions: UnresolvedMosaicIdDto[] = GeneratorUtils.loadFromBinary(
            UnresolvedMosaicIdDto.loadFromBinary,
            Uint8Array.from(byteArray),
            restrictionDeletionsCount,
        );
        byteArray.splice(
            0,
            restrictionDeletions.reduce((sum, c) => sum + c.getSize(), 0),
        );
        return new AccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }

    /**
     * Creates an instance of AccountMosaicRestrictionTransactionBodyBuilder.
     *
     * @param restrictionFlags Type of restriction being applied to the listed mosaics..
     * @param restrictionAdditions Array of mosaics being added to the restricted list..
     * @param restrictionDeletions Array of mosaics being removed from the restricted list..
     * @return Instance of AccountMosaicRestrictionTransactionBodyBuilder.
     */
    public static createAccountMosaicRestrictionTransactionBodyBuilder(
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: UnresolvedMosaicIdDto[],
        restrictionDeletions: UnresolvedMosaicIdDto[],
    ): AccountMosaicRestrictionTransactionBodyBuilder {
        return new AccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }

    /**
     * Gets Type of restriction being applied to the listed mosaics..
     *
     * @return Type of restriction being applied to the listed mosaics..
     */
    public getRestrictionFlags(): AccountRestrictionFlagsDto[] {
        return this.restrictionFlags;
    }

    /**
     * Gets Array of mosaics being added to the restricted list..
     *
     * @return Array of mosaics being added to the restricted list..
     */
    public getRestrictionAdditions(): UnresolvedMosaicIdDto[] {
        return this.restrictionAdditions;
    }

    /**
     * Gets Array of mosaics being removed from the restricted list..
     *
     * @return Array of mosaics being removed from the restricted list..
     */
    public getRestrictionDeletions(): UnresolvedMosaicIdDto[] {
        return this.restrictionDeletions;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += 2; // restrictionFlags
        size += 1; // restrictionAdditionsCount
        size += 1; // restrictionDeletionsCount
        size += 4; // accountRestrictionTransactionBodyReserved1
        size += this.restrictionAdditions.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0); // restrictionAdditions
        size += this.restrictionDeletions.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0); // restrictionDeletions
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const restrictionFlagsBytes = GeneratorUtils.uint16ToBuffer(
            GeneratorUtils.fromFlags(AccountRestrictionFlagsDto, this.restrictionFlags),
        );
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionFlagsBytes);
        const restrictionAdditionsCountBytes = GeneratorUtils.uint8ToBuffer(this.restrictionAdditions.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsCountBytes);
        const restrictionDeletionsCountBytes = GeneratorUtils.uint8ToBuffer(this.restrictionDeletions.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsCountBytes);
        const accountRestrictionTransactionBodyReserved1Bytes = GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountRestrictionTransactionBodyReserved1Bytes);
        const restrictionAdditionsBytes = GeneratorUtils.writeList(this.restrictionAdditions, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsBytes);
        const restrictionDeletionsBytes = GeneratorUtils.writeList(this.restrictionDeletions, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsBytes);
        return newArray;
    }
}
