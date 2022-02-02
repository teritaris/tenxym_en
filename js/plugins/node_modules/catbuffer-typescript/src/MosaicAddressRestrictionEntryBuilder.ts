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
import { AddressKeyValueSetBuilder } from './AddressKeyValueSetBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { MosaicIdDto } from './MosaicIdDto';
import { Serializer } from './Serializer';

/**
 * Binary layout for a mosaic restriction
 **/
export class MosaicAddressRestrictionEntryBuilder implements Serializer {
    /** Identifier of the mosaic to which the restriction applies. **/
    readonly mosaicId: MosaicIdDto;

    /** Address being restricted. **/
    readonly address: AddressDto;

    /** Address key value restriction set. **/
    readonly keyPairs: AddressKeyValueSetBuilder;

    /**
     * Constructor.
     *
     * @param mosaicId Identifier of the mosaic to which the restriction applies.
     * @param address Address being restricted.
     * @param keyPairs Address key value restriction set.
     */
    public constructor(mosaicId: MosaicIdDto, address: AddressDto, keyPairs: AddressKeyValueSetBuilder) {
        GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils.notNull(address, 'address is null or undefined');
        GeneratorUtils.notNull(keyPairs, 'keyPairs is null or undefined');
        this.mosaicId = mosaicId;
        this.address = address;
        this.keyPairs = keyPairs;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicAddressRestrictionEntryBuilder {
        const byteArray = Array.from(payload);
        const mosaicId: MosaicIdDto = MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const address: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.getSize());
        const keyPairs: AddressKeyValueSetBuilder = AddressKeyValueSetBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, keyPairs.getSize());
        return new MosaicAddressRestrictionEntryBuilder(mosaicId, address, keyPairs);
    }

    /**
     * Creates an instance of MosaicAddressRestrictionEntryBuilder.
     *
     * @param mosaicId Identifier of the mosaic to which the restriction applies.
     * @param address Address being restricted.
     * @param keyPairs Address key value restriction set.
     * @return Instance of MosaicAddressRestrictionEntryBuilder.
     */
    public static createMosaicAddressRestrictionEntryBuilder(
        mosaicId: MosaicIdDto,
        address: AddressDto,
        keyPairs: AddressKeyValueSetBuilder,
    ): MosaicAddressRestrictionEntryBuilder {
        return new MosaicAddressRestrictionEntryBuilder(mosaicId, address, keyPairs);
    }

    /**
     * Gets identifier of the mosaic to which the restriction applies.
     *
     * @return Identifier of the mosaic to which the restriction applies.
     */
    public getMosaicId(): MosaicIdDto {
        return this.mosaicId;
    }

    /**
     * Gets address being restricted.
     *
     * @return Address being restricted.
     */
    public getAddress(): AddressDto {
        return this.address;
    }

    /**
     * Gets address key value restriction set.
     *
     * @return Address key value restriction set.
     */
    public getKeyPairs(): AddressKeyValueSetBuilder {
        return this.keyPairs;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.mosaicId.getSize(); // mosaicId
        size += this.address.getSize(); // address
        size += this.keyPairs.getSize(); // keyPairs
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
        const addressBytes = this.address.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        const keyPairsBytes = this.keyPairs.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, keyPairsBytes);
        return newArray;
    }
}
