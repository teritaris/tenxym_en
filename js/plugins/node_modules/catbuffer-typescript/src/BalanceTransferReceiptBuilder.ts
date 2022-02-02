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
 * An invisible state change triggered a mosaic transfer.
 **/
export class BalanceTransferReceiptBuilder extends ReceiptBuilder implements Serializer {
    /** Transferred mosaic. **/
    readonly mosaic: MosaicBuilder;

    /** Address of the sender account.. **/
    readonly senderAddress: AddressDto;

    /** Address of the recipient account.. **/
    readonly recipientAddress: AddressDto;

    /**
     * Constructor.
     *
     * @param version Receipt version..
     * @param type Type of receipt..
     * @param mosaic Transferred mosaic.
     * @param senderAddress Address of the sender account..
     * @param recipientAddress Address of the recipient account..
     */
    public constructor(
        version: number,
        type: ReceiptTypeDto,
        mosaic: MosaicBuilder,
        senderAddress: AddressDto,
        recipientAddress: AddressDto,
    ) {
        super(version, type);
        GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        GeneratorUtils.notNull(senderAddress, 'senderAddress is null or undefined');
        GeneratorUtils.notNull(recipientAddress, 'recipientAddress is null or undefined');
        this.mosaic = mosaic;
        this.senderAddress = senderAddress;
        this.recipientAddress = recipientAddress;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): BalanceTransferReceiptBuilder {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaic: MosaicBuilder = MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        const senderAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, senderAddress.getSize());
        const recipientAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.getSize());
        return new BalanceTransferReceiptBuilder(superObject.version, superObject.type, mosaic, senderAddress, recipientAddress);
    }

    /**
     * Creates an instance of BalanceTransferReceiptBuilder.
     *
     * @param version Receipt version..
     * @param type Type of receipt..
     * @param mosaic Transferred mosaic.
     * @param senderAddress Address of the sender account..
     * @param recipientAddress Address of the recipient account..
     * @return Instance of BalanceTransferReceiptBuilder.
     */
    public static createBalanceTransferReceiptBuilder(
        version: number,
        type: ReceiptTypeDto,
        mosaic: MosaicBuilder,
        senderAddress: AddressDto,
        recipientAddress: AddressDto,
    ): BalanceTransferReceiptBuilder {
        return new BalanceTransferReceiptBuilder(version, type, mosaic, senderAddress, recipientAddress);
    }

    /**
     * Gets Transferred mosaic.
     *
     * @return Transferred mosaic.
     */
    public getMosaic(): MosaicBuilder {
        return this.mosaic;
    }

    /**
     * Gets Address of the sender account..
     *
     * @return Address of the sender account..
     */
    public getSenderAddress(): AddressDto {
        return this.senderAddress;
    }

    /**
     * Gets Address of the recipient account..
     *
     * @return Address of the recipient account..
     */
    public getRecipientAddress(): AddressDto {
        return this.recipientAddress;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.mosaic.getSize(); // mosaic
        size += this.senderAddress.getSize(); // senderAddress
        size += this.recipientAddress.getSize(); // recipientAddress
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
        const senderAddressBytes = this.senderAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, senderAddressBytes);
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        return newArray;
    }
}
