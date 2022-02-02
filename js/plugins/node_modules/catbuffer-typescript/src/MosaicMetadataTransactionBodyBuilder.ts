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
 * Shared content between MosaicMetadataTransaction and EmbeddedMosaicMetadataTransaction.
 **/
export class MosaicMetadataTransactionBodyBuilder implements Serializer {
    /** Account owning the mosaic whose metadata should be modified.. **/
    readonly targetAddress: UnresolvedAddressDto;

    /** Metadata key scoped to source, target and type.. **/
    readonly scopedMetadataKey: number[];

    /** Mosaic whose metadata should be modified.. **/
    readonly targetMosaicId: UnresolvedMosaicIdDto;

    /** Change in value size in bytes, compared to previous size.. **/
    readonly valueSizeDelta: number;

    /** Difference between existing value and new value. \note When there is no existing value, this array is directly used and `value_size_delta`==`value_size`. \note When there is an existing value, the new value is the byte-wise XOR of the previous value and this array.. **/
    readonly value: Uint8Array;

    /**
     * Constructor.
     *
     * @param targetAddress Account owning the mosaic whose metadata should be modified..
     * @param scopedMetadataKey Metadata key scoped to source, target and type..
     * @param targetMosaicId Mosaic whose metadata should be modified..
     * @param valueSizeDelta Change in value size in bytes, compared to previous size..
     * @param value Difference between existing value and new value. \note When there is no existing value, this array is directly used and `value_size_delta`==`value_size`. \note When there is an existing value, the new value is the byte-wise XOR of the previous value and this array..
     */
    public constructor(
        targetAddress: UnresolvedAddressDto,
        scopedMetadataKey: number[],
        targetMosaicId: UnresolvedMosaicIdDto,
        valueSizeDelta: number,
        value: Uint8Array,
    ) {
        GeneratorUtils.notNull(targetAddress, 'targetAddress is null or undefined');
        GeneratorUtils.notNull(scopedMetadataKey, 'scopedMetadataKey is null or undefined');
        GeneratorUtils.notNull(targetMosaicId, 'targetMosaicId is null or undefined');
        GeneratorUtils.notNull(valueSizeDelta, 'valueSizeDelta is null or undefined');
        GeneratorUtils.notNull(value, 'value is null or undefined');
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetMosaicId = targetMosaicId;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicMetadataTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const targetAddress: UnresolvedAddressDto = UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.getSize());
        const scopedMetadataKey: number[] = GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const targetMosaicId: UnresolvedMosaicIdDto = UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetMosaicId.getSize());
        const valueSizeDelta: number = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const valueSize: number = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const value: Uint8Array = GeneratorUtils.getBytes(Uint8Array.from(byteArray), valueSize);
        byteArray.splice(0, valueSize);
        return new MosaicMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value);
    }

    /**
     * Creates an instance of MosaicMetadataTransactionBodyBuilder.
     *
     * @param targetAddress Account owning the mosaic whose metadata should be modified..
     * @param scopedMetadataKey Metadata key scoped to source, target and type..
     * @param targetMosaicId Mosaic whose metadata should be modified..
     * @param valueSizeDelta Change in value size in bytes, compared to previous size..
     * @param value Difference between existing value and new value. \note When there is no existing value, this array is directly used and `value_size_delta`==`value_size`. \note When there is an existing value, the new value is the byte-wise XOR of the previous value and this array..
     * @return Instance of MosaicMetadataTransactionBodyBuilder.
     */
    public static createMosaicMetadataTransactionBodyBuilder(
        targetAddress: UnresolvedAddressDto,
        scopedMetadataKey: number[],
        targetMosaicId: UnresolvedMosaicIdDto,
        valueSizeDelta: number,
        value: Uint8Array,
    ): MosaicMetadataTransactionBodyBuilder {
        return new MosaicMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value);
    }

    /**
     * Gets Account owning the mosaic whose metadata should be modified..
     *
     * @return Account owning the mosaic whose metadata should be modified..
     */
    public getTargetAddress(): UnresolvedAddressDto {
        return this.targetAddress;
    }

    /**
     * Gets Metadata key scoped to source, target and type..
     *
     * @return Metadata key scoped to source, target and type..
     */
    public getScopedMetadataKey(): number[] {
        return this.scopedMetadataKey;
    }

    /**
     * Gets Mosaic whose metadata should be modified..
     *
     * @return Mosaic whose metadata should be modified..
     */
    public getTargetMosaicId(): UnresolvedMosaicIdDto {
        return this.targetMosaicId;
    }

    /**
     * Gets Change in value size in bytes, compared to previous size..
     *
     * @return Change in value size in bytes, compared to previous size..
     */
    public getValueSizeDelta(): number {
        return this.valueSizeDelta;
    }

    /**
     * Gets Difference between existing value and new value. \note When there is no existing value, this array is directly used and `value_size_delta`==`value_size`. \note When there is an existing value, the new value is the byte-wise XOR of the previous value and this array..
     *
     * @return Difference between existing value and new value. \note When there is no existing value, this array is directly used and `value_size_delta`==`value_size`. \note When there is an existing value, the new value is the byte-wise XOR of the previous value and this array..
     */
    public getValue(): Uint8Array {
        return this.value;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.targetAddress.getSize(); // targetAddress
        size += 8; // scopedMetadataKey
        size += this.targetMosaicId.getSize(); // targetMosaicId
        size += 2; // valueSizeDelta
        size += 2; // valueSize
        size += this.value.length; // value
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        const scopedMetadataKeyBytes = GeneratorUtils.uint64ToBuffer(this.getScopedMetadataKey());
        newArray = GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const targetMosaicIdBytes = this.targetMosaicId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, targetMosaicIdBytes);
        const valueSizeDeltaBytes = GeneratorUtils.uint16ToBuffer(this.getValueSizeDelta());
        newArray = GeneratorUtils.concatTypedArrays(newArray, valueSizeDeltaBytes);
        const valueSizeBytes = GeneratorUtils.uint16ToBuffer(this.value.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, valueSizeBytes);
        const valueBytes = this.value;
        newArray = GeneratorUtils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
