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
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';

/**
 * Shared content between MosaicSupplyRevocationTransaction and EmbeddedMosaicSupplyRevocationTransaction.
 **/
export class MosaicSupplyRevocationTransactionBodyBuilder implements Serializer {
    /** Address from which tokens should be revoked.. **/
    readonly sourceAddress: UnresolvedAddressDto;

    /** Revoked mosaic and amount.. **/
    readonly mosaic: UnresolvedMosaicBuilder;

    /**
     * Constructor.
     *
     * @param sourceAddress Address from which tokens should be revoked..
     * @param mosaic Revoked mosaic and amount..
     */
    public constructor(sourceAddress: UnresolvedAddressDto, mosaic: UnresolvedMosaicBuilder) {
        GeneratorUtils.notNull(sourceAddress, 'sourceAddress is null or undefined');
        GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        this.sourceAddress = sourceAddress;
        this.mosaic = mosaic;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicSupplyRevocationTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const sourceAddress: UnresolvedAddressDto = UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, sourceAddress.getSize());
        const mosaic: UnresolvedMosaicBuilder = UnresolvedMosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        return new MosaicSupplyRevocationTransactionBodyBuilder(sourceAddress, mosaic);
    }

    /**
     * Creates an instance of MosaicSupplyRevocationTransactionBodyBuilder.
     *
     * @param sourceAddress Address from which tokens should be revoked..
     * @param mosaic Revoked mosaic and amount..
     * @return Instance of MosaicSupplyRevocationTransactionBodyBuilder.
     */
    public static createMosaicSupplyRevocationTransactionBodyBuilder(
        sourceAddress: UnresolvedAddressDto,
        mosaic: UnresolvedMosaicBuilder,
    ): MosaicSupplyRevocationTransactionBodyBuilder {
        return new MosaicSupplyRevocationTransactionBodyBuilder(sourceAddress, mosaic);
    }

    /**
     * Gets Address from which tokens should be revoked..
     *
     * @return Address from which tokens should be revoked..
     */
    public getSourceAddress(): UnresolvedAddressDto {
        return this.sourceAddress;
    }

    /**
     * Gets Revoked mosaic and amount..
     *
     * @return Revoked mosaic and amount..
     */
    public getMosaic(): UnresolvedMosaicBuilder {
        return this.mosaic;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.sourceAddress.getSize(); // sourceAddress
        size += this.mosaic.getSize(); // mosaic
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const sourceAddressBytes = this.sourceAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, sourceAddressBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        return newArray;
    }
}
