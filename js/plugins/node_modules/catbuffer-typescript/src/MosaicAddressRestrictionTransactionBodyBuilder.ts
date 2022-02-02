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

import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 * Shared content between MosaicAddressRestrictionTransaction and EmbeddedMosaicAddressRestrictionTransaction.
 **/
export class MosaicAddressRestrictionTransactionBodyBuilder implements Serializer {
    /** Identifier of the mosaic to which the restriction applies.. **/
    readonly mosaicId: UnresolvedMosaicIdDto;

    /** Restriction key.. **/
    readonly restrictionKey: number[];

    /** Previous restriction value. Set `previousRestrictionValue` to `FFFFFFFFFFFFFFFF` if the target address does not have a previous restriction value for this mosaic id and restriction key.. **/
    readonly previousRestrictionValue: number[];

    /** New restriction value.. **/
    readonly newRestrictionValue: number[];

    /** Address being restricted.. **/
    readonly targetAddress: UnresolvedAddressDto;

    /**
     * Constructor.
     *
     * @param mosaicId Identifier of the mosaic to which the restriction applies..
     * @param restrictionKey Restriction key..
     * @param previousRestrictionValue Previous restriction value. Set `previousRestrictionValue` to `FFFFFFFFFFFFFFFF` if the target address does not have a previous restriction value for this mosaic id and restriction key..
     * @param newRestrictionValue New restriction value..
     * @param targetAddress Address being restricted..
     */
    public constructor(
        mosaicId: UnresolvedMosaicIdDto,
        restrictionKey: number[],
        previousRestrictionValue: number[],
        newRestrictionValue: number[],
        targetAddress: UnresolvedAddressDto,
    ) {
        GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils.notNull(restrictionKey, 'restrictionKey is null or undefined');
        GeneratorUtils.notNull(previousRestrictionValue, 'previousRestrictionValue is null or undefined');
        GeneratorUtils.notNull(newRestrictionValue, 'newRestrictionValue is null or undefined');
        GeneratorUtils.notNull(targetAddress, 'targetAddress is null or undefined');
        this.mosaicId = mosaicId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
        this.targetAddress = targetAddress;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicAddressRestrictionTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const mosaicId: UnresolvedMosaicIdDto = UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const restrictionKey: number[] = GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const previousRestrictionValue: number[] = GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const newRestrictionValue: number[] = GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const targetAddress: UnresolvedAddressDto = UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.getSize());
        return new MosaicAddressRestrictionTransactionBodyBuilder(
            mosaicId,
            restrictionKey,
            previousRestrictionValue,
            newRestrictionValue,
            targetAddress,
        );
    }

    /**
     * Creates an instance of MosaicAddressRestrictionTransactionBodyBuilder.
     *
     * @param mosaicId Identifier of the mosaic to which the restriction applies..
     * @param restrictionKey Restriction key..
     * @param previousRestrictionValue Previous restriction value. Set `previousRestrictionValue` to `FFFFFFFFFFFFFFFF` if the target address does not have a previous restriction value for this mosaic id and restriction key..
     * @param newRestrictionValue New restriction value..
     * @param targetAddress Address being restricted..
     * @return Instance of MosaicAddressRestrictionTransactionBodyBuilder.
     */
    public static createMosaicAddressRestrictionTransactionBodyBuilder(
        mosaicId: UnresolvedMosaicIdDto,
        restrictionKey: number[],
        previousRestrictionValue: number[],
        newRestrictionValue: number[],
        targetAddress: UnresolvedAddressDto,
    ): MosaicAddressRestrictionTransactionBodyBuilder {
        return new MosaicAddressRestrictionTransactionBodyBuilder(
            mosaicId,
            restrictionKey,
            previousRestrictionValue,
            newRestrictionValue,
            targetAddress,
        );
    }

    /**
     * Gets Identifier of the mosaic to which the restriction applies..
     *
     * @return Identifier of the mosaic to which the restriction applies..
     */
    public getMosaicId(): UnresolvedMosaicIdDto {
        return this.mosaicId;
    }

    /**
     * Gets Restriction key..
     *
     * @return Restriction key..
     */
    public getRestrictionKey(): number[] {
        return this.restrictionKey;
    }

    /**
     * Gets Previous restriction value. Set `previousRestrictionValue` to `FFFFFFFFFFFFFFFF` if the target address does not have a previous restriction value for this mosaic id and restriction key..
     *
     * @return Previous restriction value. Set `previousRestrictionValue` to `FFFFFFFFFFFFFFFF` if the target address does not have a previous restriction value for this mosaic id and restriction key..
     */
    public getPreviousRestrictionValue(): number[] {
        return this.previousRestrictionValue;
    }

    /**
     * Gets New restriction value..
     *
     * @return New restriction value..
     */
    public getNewRestrictionValue(): number[] {
        return this.newRestrictionValue;
    }

    /**
     * Gets Address being restricted..
     *
     * @return Address being restricted..
     */
    public getTargetAddress(): UnresolvedAddressDto {
        return this.targetAddress;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.mosaicId.getSize(); // mosaicId
        size += 8; // restrictionKey
        size += 8; // previousRestrictionValue
        size += 8; // newRestrictionValue
        size += this.targetAddress.getSize(); // targetAddress
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const restrictionKeyBytes = GeneratorUtils.uint64ToBuffer(this.getRestrictionKey());
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionKeyBytes);
        const previousRestrictionValueBytes = GeneratorUtils.uint64ToBuffer(this.getPreviousRestrictionValue());
        newArray = GeneratorUtils.concatTypedArrays(newArray, previousRestrictionValueBytes);
        const newRestrictionValueBytes = GeneratorUtils.uint64ToBuffer(this.getNewRestrictionValue());
        newArray = GeneratorUtils.concatTypedArrays(newArray, newRestrictionValueBytes);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        return newArray;
    }
}
