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

import { AddressDto } from './AddressDto';
import { GeneratorUtils } from './GeneratorUtils';
import { MetadataTypeDto } from './MetadataTypeDto';
import { MetadataValueBuilder } from './MetadataValueBuilder';
import { ScopedMetadataKeyDto } from './ScopedMetadataKeyDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder } from './StateHeaderBuilder';

/**
 * Binary layout of a metadata entry
 **/
export class MetadataEntryBuilder extends StateHeaderBuilder implements Serializer {
    /** Metadata source address (provider). **/
    readonly sourceAddress: AddressDto;

    /** Metadata target address. **/
    readonly targetAddress: AddressDto;

    /** Metadata key scoped to source, target and type. **/
    readonly scopedMetadataKey: ScopedMetadataKeyDto;

    /** Target id. **/
    readonly targetId: number[];

    /** Metadata type. **/
    readonly metadataType: MetadataTypeDto;

    /** Value. **/
    readonly value: MetadataValueBuilder;

    /**
     * Constructor.
     *
     * @param version Serialization version.
     * @param sourceAddress Metadata source address (provider).
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param targetId Target id.
     * @param metadataType Metadata type.
     * @param value Value.
     */
    public constructor(
        version: number,
        sourceAddress: AddressDto,
        targetAddress: AddressDto,
        scopedMetadataKey: ScopedMetadataKeyDto,
        targetId: number[],
        metadataType: MetadataTypeDto,
        value: MetadataValueBuilder,
    ) {
        super(version);
        GeneratorUtils.notNull(sourceAddress, 'sourceAddress is null or undefined');
        GeneratorUtils.notNull(targetAddress, 'targetAddress is null or undefined');
        GeneratorUtils.notNull(scopedMetadataKey, 'scopedMetadataKey is null or undefined');
        GeneratorUtils.notNull(targetId, 'targetId is null or undefined');
        GeneratorUtils.notNull(metadataType, 'metadataType is null or undefined');
        GeneratorUtils.notNull(value, 'value is null or undefined');
        this.sourceAddress = sourceAddress;
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetId = targetId;
        this.metadataType = metadataType;
        this.value = value;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MetadataEntryBuilder {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const sourceAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, sourceAddress.getSize());
        const targetAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.getSize());
        const scopedMetadataKey: ScopedMetadataKeyDto = ScopedMetadataKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, scopedMetadataKey.getSize());
        const targetId: number[] = GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const metadataType: MetadataTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const value: MetadataValueBuilder = MetadataValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, value.getSize());
        return new MetadataEntryBuilder(
            superObject.version,
            sourceAddress,
            targetAddress,
            scopedMetadataKey,
            targetId,
            metadataType,
            value,
        );
    }

    /**
     * Creates an instance of MetadataEntryBuilder.
     *
     * @param version Serialization version.
     * @param sourceAddress Metadata source address (provider).
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param targetId Target id.
     * @param metadataType Metadata type.
     * @param value Value.
     * @return Instance of MetadataEntryBuilder.
     */
    public static createMetadataEntryBuilder(
        version: number,
        sourceAddress: AddressDto,
        targetAddress: AddressDto,
        scopedMetadataKey: ScopedMetadataKeyDto,
        targetId: number[],
        metadataType: MetadataTypeDto,
        value: MetadataValueBuilder,
    ): MetadataEntryBuilder {
        return new MetadataEntryBuilder(version, sourceAddress, targetAddress, scopedMetadataKey, targetId, metadataType, value);
    }

    /**
     * Gets metadata source address (provider).
     *
     * @return Metadata source address (provider).
     */
    public getSourceAddress(): AddressDto {
        return this.sourceAddress;
    }

    /**
     * Gets metadata target address.
     *
     * @return Metadata target address.
     */
    public getTargetAddress(): AddressDto {
        return this.targetAddress;
    }

    /**
     * Gets metadata key scoped to source, target and type.
     *
     * @return Metadata key scoped to source, target and type.
     */
    public getScopedMetadataKey(): ScopedMetadataKeyDto {
        return this.scopedMetadataKey;
    }

    /**
     * Gets target id.
     *
     * @return Target id.
     */
    public getTargetId(): number[] {
        return this.targetId;
    }

    /**
     * Gets metadata type.
     *
     * @return Metadata type.
     */
    public getMetadataType(): MetadataTypeDto {
        return this.metadataType;
    }

    /**
     * Gets value.
     *
     * @return Value.
     */
    public getValue(): MetadataValueBuilder {
        return this.value;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.sourceAddress.getSize(); // sourceAddress
        size += this.targetAddress.getSize(); // targetAddress
        size += this.scopedMetadataKey.getSize(); // scopedMetadataKey
        size += 8; // targetId
        size += 1; // metadataType
        size += this.value.getSize(); // value
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
        const sourceAddressBytes = this.sourceAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, sourceAddressBytes);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        const scopedMetadataKeyBytes = this.scopedMetadataKey.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const targetIdBytes = GeneratorUtils.uint64ToBuffer(this.getTargetId());
        newArray = GeneratorUtils.concatTypedArrays(newArray, targetIdBytes);
        const metadataTypeBytes = GeneratorUtils.uint8ToBuffer(this.metadataType);
        newArray = GeneratorUtils.concatTypedArrays(newArray, metadataTypeBytes);
        const valueBytes = this.value.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
