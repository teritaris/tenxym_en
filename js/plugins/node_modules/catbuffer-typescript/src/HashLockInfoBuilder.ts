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
import { Hash256Dto } from './Hash256Dto';
import { HeightDto } from './HeightDto';
import { LockStatusDto } from './LockStatusDto';
import { MosaicBuilder } from './MosaicBuilder';
import { Serializer } from './Serializer';
import { StateHeaderBuilder } from './StateHeaderBuilder';

/**
 * Binary layout for hash lock transaction info
 **/
export class HashLockInfoBuilder extends StateHeaderBuilder implements Serializer {
    /** Owner address. **/
    readonly ownerAddress: AddressDto;

    /** Mosaic associated with lock. **/
    readonly mosaic: MosaicBuilder;

    /** Height at which the lock expires. **/
    readonly endHeight: HeightDto;

    /** Flag indicating whether or not the lock was already used. **/
    readonly status: LockStatusDto;

    /** Hash. **/
    readonly hash: Hash256Dto;

    /**
     * Constructor.
     *
     * @param version Serialization version.
     * @param ownerAddress Owner address.
     * @param mosaic Mosaic associated with lock.
     * @param endHeight Height at which the lock expires.
     * @param status Flag indicating whether or not the lock was already used.
     * @param hash Hash.
     */
    public constructor(
        version: number,
        ownerAddress: AddressDto,
        mosaic: MosaicBuilder,
        endHeight: HeightDto,
        status: LockStatusDto,
        hash: Hash256Dto,
    ) {
        super(version);
        GeneratorUtils.notNull(ownerAddress, 'ownerAddress is null or undefined');
        GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        GeneratorUtils.notNull(endHeight, 'endHeight is null or undefined');
        GeneratorUtils.notNull(status, 'status is null or undefined');
        GeneratorUtils.notNull(hash, 'hash is null or undefined');
        this.ownerAddress = ownerAddress;
        this.mosaic = mosaic;
        this.endHeight = endHeight;
        this.status = status;
        this.hash = hash;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): HashLockInfoBuilder {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const ownerAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerAddress.getSize());
        const mosaic: MosaicBuilder = MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        const endHeight: HeightDto = HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, endHeight.getSize());
        const status: LockStatusDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const hash: Hash256Dto = Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.getSize());
        return new HashLockInfoBuilder(superObject.version, ownerAddress, mosaic, endHeight, status, hash);
    }

    /**
     * Creates an instance of HashLockInfoBuilder.
     *
     * @param version Serialization version.
     * @param ownerAddress Owner address.
     * @param mosaic Mosaic associated with lock.
     * @param endHeight Height at which the lock expires.
     * @param status Flag indicating whether or not the lock was already used.
     * @param hash Hash.
     * @return Instance of HashLockInfoBuilder.
     */
    public static createHashLockInfoBuilder(
        version: number,
        ownerAddress: AddressDto,
        mosaic: MosaicBuilder,
        endHeight: HeightDto,
        status: LockStatusDto,
        hash: Hash256Dto,
    ): HashLockInfoBuilder {
        return new HashLockInfoBuilder(version, ownerAddress, mosaic, endHeight, status, hash);
    }

    /**
     * Gets owner address.
     *
     * @return Owner address.
     */
    public getOwnerAddress(): AddressDto {
        return this.ownerAddress;
    }

    /**
     * Gets mosaic associated with lock.
     *
     * @return Mosaic associated with lock.
     */
    public getMosaic(): MosaicBuilder {
        return this.mosaic;
    }

    /**
     * Gets height at which the lock expires.
     *
     * @return Height at which the lock expires.
     */
    public getEndHeight(): HeightDto {
        return this.endHeight;
    }

    /**
     * Gets flag indicating whether or not the lock was already used.
     *
     * @return Flag indicating whether or not the lock was already used.
     */
    public getStatus(): LockStatusDto {
        return this.status;
    }

    /**
     * Gets hash.
     *
     * @return Hash.
     */
    public getHash(): Hash256Dto {
        return this.hash;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.ownerAddress.getSize(); // ownerAddress
        size += this.mosaic.getSize(); // mosaic
        size += this.endHeight.getSize(); // endHeight
        size += 1; // status
        size += this.hash.getSize(); // hash
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
        const ownerAddressBytes = this.ownerAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, ownerAddressBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const endHeightBytes = this.endHeight.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, endHeightBytes);
        const statusBytes = GeneratorUtils.uint8ToBuffer(this.status);
        newArray = GeneratorUtils.concatTypedArrays(newArray, statusBytes);
        const hashBytes = this.hash.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    }
}
