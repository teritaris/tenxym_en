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
import { MosaicBuilder } from './MosaicBuilder';
import { ReceiptBuilder } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';

/**
 * An invisible state change modified an account's balance.
 **/
export class BalanceChangeReceiptBuilder extends ReceiptBuilder implements Serializer {
    /** Modified mosaic.. **/
    readonly mosaic: MosaicBuilder;

    /** Address of the affected account.. **/
    readonly targetAddress: AddressDto;

    /**
     * Constructor.
     *
     * @param version Receipt version..
     * @param type Type of receipt..
     * @param mosaic Modified mosaic..
     * @param targetAddress Address of the affected account..
     */
    public constructor(version: number, type: ReceiptTypeDto, mosaic: MosaicBuilder, targetAddress: AddressDto) {
        super(version, type);
        GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        GeneratorUtils.notNull(targetAddress, 'targetAddress is null or undefined');
        this.mosaic = mosaic;
        this.targetAddress = targetAddress;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): BalanceChangeReceiptBuilder {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaic: MosaicBuilder = MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        const targetAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.getSize());
        return new BalanceChangeReceiptBuilder(superObject.version, superObject.type, mosaic, targetAddress);
    }

    /**
     * Creates an instance of BalanceChangeReceiptBuilder.
     *
     * @param version Receipt version..
     * @param type Type of receipt..
     * @param mosaic Modified mosaic..
     * @param targetAddress Address of the affected account..
     * @return Instance of BalanceChangeReceiptBuilder.
     */
    public static createBalanceChangeReceiptBuilder(
        version: number,
        type: ReceiptTypeDto,
        mosaic: MosaicBuilder,
        targetAddress: AddressDto,
    ): BalanceChangeReceiptBuilder {
        return new BalanceChangeReceiptBuilder(version, type, mosaic, targetAddress);
    }

    /**
     * Gets Modified mosaic..
     *
     * @return Modified mosaic..
     */
    public getMosaic(): MosaicBuilder {
        return this.mosaic;
    }

    /**
     * Gets Address of the affected account..
     *
     * @return Address of the affected account..
     */
    public getTargetAddress(): AddressDto {
        return this.targetAddress;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.mosaic.getSize(); // mosaic
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
        const superBytes = super.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        return newArray;
    }
}
