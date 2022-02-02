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
import { MosaicRestrictionTypeDto } from './MosaicRestrictionTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 * Shared content between MosaicGlobalRestrictionTransaction and EmbeddedMosaicGlobalRestrictionTransaction.
 **/
export class MosaicGlobalRestrictionTransactionBodyBuilder implements Serializer {
    /** Identifier of the mosaic being restricted. The mosaic creator must be the signer of the transaction.. **/
    readonly mosaicId: UnresolvedMosaicIdDto;

    /** Identifier of the mosaic providing the restriction key. The mosaic global restriction for the mosaic identifier depends on global restrictions set on the reference mosaic. Set `reference_mosaic_id` to **0** if the mosaic giving the restriction equals the `mosaic_id`.. **/
    readonly referenceMosaicId: UnresolvedMosaicIdDto;

    /** Restriction key relative to the reference mosaic identifier.. **/
    readonly restrictionKey: number[];

    /** Previous restriction value.. **/
    readonly previousRestrictionValue: number[];

    /** New restriction value.. **/
    readonly newRestrictionValue: number[];

    /** Previous restriction type.. **/
    readonly previousRestrictionType: MosaicRestrictionTypeDto;

    /** New restriction type.. **/
    readonly newRestrictionType: MosaicRestrictionTypeDto;

    /**
     * Constructor.
     *
     * @param mosaicId Identifier of the mosaic being restricted. The mosaic creator must be the signer of the transaction..
     * @param referenceMosaicId Identifier of the mosaic providing the restriction key. The mosaic global restriction for the mosaic identifier depends on global restrictions set on the reference mosaic. Set `reference_mosaic_id` to **0** if the mosaic giving the restriction equals the `mosaic_id`..
     * @param restrictionKey Restriction key relative to the reference mosaic identifier..
     * @param previousRestrictionValue Previous restriction value..
     * @param newRestrictionValue New restriction value..
     * @param previousRestrictionType Previous restriction type..
     * @param newRestrictionType New restriction type..
     */
    public constructor(
        mosaicId: UnresolvedMosaicIdDto,
        referenceMosaicId: UnresolvedMosaicIdDto,
        restrictionKey: number[],
        previousRestrictionValue: number[],
        newRestrictionValue: number[],
        previousRestrictionType: MosaicRestrictionTypeDto,
        newRestrictionType: MosaicRestrictionTypeDto,
    ) {
        GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils.notNull(referenceMosaicId, 'referenceMosaicId is null or undefined');
        GeneratorUtils.notNull(restrictionKey, 'restrictionKey is null or undefined');
        GeneratorUtils.notNull(previousRestrictionValue, 'previousRestrictionValue is null or undefined');
        GeneratorUtils.notNull(newRestrictionValue, 'newRestrictionValue is null or undefined');
        GeneratorUtils.notNull(previousRestrictionType, 'previousRestrictionType is null or undefined');
        GeneratorUtils.notNull(newRestrictionType, 'newRestrictionType is null or undefined');
        this.mosaicId = mosaicId;
        this.referenceMosaicId = referenceMosaicId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
        this.previousRestrictionType = previousRestrictionType;
        this.newRestrictionType = newRestrictionType;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicGlobalRestrictionTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const mosaicId: UnresolvedMosaicIdDto = UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const referenceMosaicId: UnresolvedMosaicIdDto = UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, referenceMosaicId.getSize());
        const restrictionKey: number[] = GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const previousRestrictionValue: number[] = GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const newRestrictionValue: number[] = GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const previousRestrictionType: MosaicRestrictionTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const newRestrictionType: MosaicRestrictionTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new MosaicGlobalRestrictionTransactionBodyBuilder(
            mosaicId,
            referenceMosaicId,
            restrictionKey,
            previousRestrictionValue,
            newRestrictionValue,
            previousRestrictionType,
            newRestrictionType,
        );
    }

    /**
     * Creates an instance of MosaicGlobalRestrictionTransactionBodyBuilder.
     *
     * @param mosaicId Identifier of the mosaic being restricted. The mosaic creator must be the signer of the transaction..
     * @param referenceMosaicId Identifier of the mosaic providing the restriction key. The mosaic global restriction for the mosaic identifier depends on global restrictions set on the reference mosaic. Set `reference_mosaic_id` to **0** if the mosaic giving the restriction equals the `mosaic_id`..
     * @param restrictionKey Restriction key relative to the reference mosaic identifier..
     * @param previousRestrictionValue Previous restriction value..
     * @param newRestrictionValue New restriction value..
     * @param previousRestrictionType Previous restriction type..
     * @param newRestrictionType New restriction type..
     * @return Instance of MosaicGlobalRestrictionTransactionBodyBuilder.
     */
    public static createMosaicGlobalRestrictionTransactionBodyBuilder(
        mosaicId: UnresolvedMosaicIdDto,
        referenceMosaicId: UnresolvedMosaicIdDto,
        restrictionKey: number[],
        previousRestrictionValue: number[],
        newRestrictionValue: number[],
        previousRestrictionType: MosaicRestrictionTypeDto,
        newRestrictionType: MosaicRestrictionTypeDto,
    ): MosaicGlobalRestrictionTransactionBodyBuilder {
        return new MosaicGlobalRestrictionTransactionBodyBuilder(
            mosaicId,
            referenceMosaicId,
            restrictionKey,
            previousRestrictionValue,
            newRestrictionValue,
            previousRestrictionType,
            newRestrictionType,
        );
    }

    /**
     * Gets Identifier of the mosaic being restricted. The mosaic creator must be the signer of the transaction..
     *
     * @return Identifier of the mosaic being restricted. The mosaic creator must be the signer of the transaction..
     */
    public getMosaicId(): UnresolvedMosaicIdDto {
        return this.mosaicId;
    }

    /**
     * Gets Identifier of the mosaic providing the restriction key. The mosaic global restriction for the mosaic identifier depends on global restrictions set on the reference mosaic. Set `reference_mosaic_id` to **0** if the mosaic giving the restriction equals the `mosaic_id`..
     *
     * @return Identifier of the mosaic providing the restriction key. The mosaic global restriction for the mosaic identifier depends on global restrictions set on the reference mosaic. Set `reference_mosaic_id` to **0** if the mosaic giving the restriction equals the `mosaic_id`..
     */
    public getReferenceMosaicId(): UnresolvedMosaicIdDto {
        return this.referenceMosaicId;
    }

    /**
     * Gets Restriction key relative to the reference mosaic identifier..
     *
     * @return Restriction key relative to the reference mosaic identifier..
     */
    public getRestrictionKey(): number[] {
        return this.restrictionKey;
    }

    /**
     * Gets Previous restriction value..
     *
     * @return Previous restriction value..
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
     * Gets Previous restriction type..
     *
     * @return Previous restriction type..
     */
    public getPreviousRestrictionType(): MosaicRestrictionTypeDto {
        return this.previousRestrictionType;
    }

    /**
     * Gets New restriction type..
     *
     * @return New restriction type..
     */
    public getNewRestrictionType(): MosaicRestrictionTypeDto {
        return this.newRestrictionType;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.mosaicId.getSize(); // mosaicId
        size += this.referenceMosaicId.getSize(); // referenceMosaicId
        size += 8; // restrictionKey
        size += 8; // previousRestrictionValue
        size += 8; // newRestrictionValue
        size += 1; // previousRestrictionType
        size += 1; // newRestrictionType
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
        const referenceMosaicIdBytes = this.referenceMosaicId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, referenceMosaicIdBytes);
        const restrictionKeyBytes = GeneratorUtils.uint64ToBuffer(this.getRestrictionKey());
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionKeyBytes);
        const previousRestrictionValueBytes = GeneratorUtils.uint64ToBuffer(this.getPreviousRestrictionValue());
        newArray = GeneratorUtils.concatTypedArrays(newArray, previousRestrictionValueBytes);
        const newRestrictionValueBytes = GeneratorUtils.uint64ToBuffer(this.getNewRestrictionValue());
        newArray = GeneratorUtils.concatTypedArrays(newArray, newRestrictionValueBytes);
        const previousRestrictionTypeBytes = GeneratorUtils.uint8ToBuffer(this.previousRestrictionType);
        newArray = GeneratorUtils.concatTypedArrays(newArray, previousRestrictionTypeBytes);
        const newRestrictionTypeBytes = GeneratorUtils.uint8ToBuffer(this.newRestrictionType);
        newArray = GeneratorUtils.concatTypedArrays(newArray, newRestrictionTypeBytes);
        return newArray;
    }
}
