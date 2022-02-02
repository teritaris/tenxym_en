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

import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { TransferTransactionBodyBuilder } from './TransferTransactionBodyBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';

/**
 * Embedded version of TransferTransaction.
 **/
export class EmbeddedTransferTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Transfer transaction body. **/
    readonly transferTransactionBody: TransferTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param recipientAddress Recipient address.
     * @param mosaics Attached mosaics.
     * @param message Attached message.
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        recipientAddress: UnresolvedAddressDto,
        mosaics: UnresolvedMosaicBuilder[],
        message: Uint8Array,
    ) {
        super(signerPublicKey, version, network, type);
        this.transferTransactionBody = new TransferTransactionBodyBuilder(recipientAddress, mosaics, message);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedTransferTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const transferTransactionBody: TransferTransactionBodyBuilder = TransferTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, transferTransactionBody.getSize());
        return new EmbeddedTransferTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            transferTransactionBody.recipientAddress,
            transferTransactionBody.mosaics,
            transferTransactionBody.message,
        );
    }

    /**
     * Creates an instance of EmbeddedTransferTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param recipientAddress Recipient address.
     * @param mosaics Attached mosaics.
     * @param message Attached message.
     * @return Instance of EmbeddedTransferTransactionBuilder.
     */
    public static createEmbeddedTransferTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        recipientAddress: UnresolvedAddressDto,
        mosaics: UnresolvedMosaicBuilder[],
        message: Uint8Array,
    ): EmbeddedTransferTransactionBuilder {
        return new EmbeddedTransferTransactionBuilder(signerPublicKey, version, network, type, recipientAddress, mosaics, message);
    }

    /**
     * Gets recipient address.
     *
     * @return Recipient address.
     */
    public getRecipientAddress(): UnresolvedAddressDto {
        return this.transferTransactionBody.getRecipientAddress();
    }

    /**
     * Gets attached mosaics.
     *
     * @return Attached mosaics.
     */
    public getMosaics(): UnresolvedMosaicBuilder[] {
        return this.transferTransactionBody.getMosaics();
    }

    /**
     * Gets attached message.
     *
     * @return Attached message.
     */
    public getMessage(): Uint8Array {
        return this.transferTransactionBody.getMessage();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.transferTransactionBody.getSize(); // transferTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): TransferTransactionBodyBuilder {
        return this.transferTransactionBody;
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
        const transferTransactionBodyBytes = this.transferTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, transferTransactionBodyBytes);
        return newArray;
    }
}
