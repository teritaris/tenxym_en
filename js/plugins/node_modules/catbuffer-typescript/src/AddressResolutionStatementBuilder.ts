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

import { AddressResolutionEntryBuilder } from './AddressResolutionEntryBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { ReceiptBuilder } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
 * An Address resolution statement links a namespace alias used in a transaction to the real address **at the time of the transaction**.
 **/
export class AddressResolutionStatementBuilder extends ReceiptBuilder implements Serializer {
    /** Unresolved address.. **/
    readonly unresolved: UnresolvedAddressDto;

    /** Resolution entries.. **/
    readonly resolutionEntries: AddressResolutionEntryBuilder[];

    /**
     * Constructor.
     *
     * @param version Receipt version..
     * @param type Type of receipt..
     * @param unresolved Unresolved address..
     * @param resolutionEntries Resolution entries..
     */
    public constructor(
        version: number,
        type: ReceiptTypeDto,
        unresolved: UnresolvedAddressDto,
        resolutionEntries: AddressResolutionEntryBuilder[],
    ) {
        super(version, type);
        GeneratorUtils.notNull(unresolved, 'unresolved is null or undefined');
        GeneratorUtils.notNull(resolutionEntries, 'resolutionEntries is null or undefined');
        this.unresolved = unresolved;
        this.resolutionEntries = resolutionEntries;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AddressResolutionStatementBuilder {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const unresolved: UnresolvedAddressDto = UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, unresolved.getSize());
        const resolutionEntries: AddressResolutionEntryBuilder[] = GeneratorUtils.loadFromBinaryRemaining(
            AddressResolutionEntryBuilder.loadFromBinary,
            Uint8Array.from(byteArray),
            byteArray.length,
            0,
        );
        byteArray.splice(
            0,
            resolutionEntries.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0),
        );
        return new AddressResolutionStatementBuilder(superObject.version, superObject.type, unresolved, resolutionEntries);
    }

    /**
     * Creates an instance of AddressResolutionStatementBuilder.
     *
     * @param version Receipt version..
     * @param type Type of receipt..
     * @param unresolved Unresolved address..
     * @param resolutionEntries Resolution entries..
     * @return Instance of AddressResolutionStatementBuilder.
     */
    public static createAddressResolutionStatementBuilder(
        version: number,
        type: ReceiptTypeDto,
        unresolved: UnresolvedAddressDto,
        resolutionEntries: AddressResolutionEntryBuilder[],
    ): AddressResolutionStatementBuilder {
        return new AddressResolutionStatementBuilder(version, type, unresolved, resolutionEntries);
    }

    /**
     * Gets Unresolved address..
     *
     * @return Unresolved address..
     */
    public getUnresolved(): UnresolvedAddressDto {
        return this.unresolved;
    }

    /**
     * Gets Resolution entries..
     *
     * @return Resolution entries..
     */
    public getResolutionEntries(): AddressResolutionEntryBuilder[] {
        return this.resolutionEntries;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.unresolved.getSize(); // unresolved
        size += this.resolutionEntries.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0); // resolutionEntries
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const unresolvedBytes = this.unresolved.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, unresolvedBytes);
        const resolutionEntriesBytes = GeneratorUtils.writeList(this.resolutionEntries, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, resolutionEntriesBytes);
        return newArray;
    }
}
