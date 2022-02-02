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

import { BlockDurationDto } from './BlockDurationDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { MosaicDefinitionTransactionBodyBuilder } from './MosaicDefinitionTransactionBodyBuilder';
import { MosaicFlagsDto } from './MosaicFlagsDto';
import { MosaicIdDto } from './MosaicIdDto';
import { MosaicNonceDto } from './MosaicNonceDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';

/**
 * Embedded version of MosaicDefinitionTransaction.
 **/
export class EmbeddedMosaicDefinitionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Mosaic definition transaction body. **/
    readonly mosaicDefinitionTransactionBody: MosaicDefinitionTransactionBodyBuilder;

    /**
    * Constructor.
    *
    * @param signerPublicKey Public key of the signer of the entity..
    * @param version Version of this structure..
    * @param network Network on which this entity was created..
    * @param type Transaction type.
    * @param id Unique mosaic identifier obtained from the generator account's public key and the `nonce`.
The SDK's can take care of generating this ID for you..
    * @param duration Mosaic duration expressed in blocks. If set to 0, the mosaic never expires..
    * @param nonce Random nonce used to generate the mosaic id..
    * @param flags Mosaic flags..
    * @param divisibility Mosaic divisibility..
    */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        id: MosaicIdDto,
        duration: BlockDurationDto,
        nonce: MosaicNonceDto,
        flags: MosaicFlagsDto[],
        divisibility: number,
    ) {
        super(signerPublicKey, version, network, type);
        this.mosaicDefinitionTransactionBody = new MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedMosaicDefinitionTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicDefinitionTransactionBody: MosaicDefinitionTransactionBodyBuilder =
            MosaicDefinitionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicDefinitionTransactionBody.getSize());
        return new EmbeddedMosaicDefinitionTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            mosaicDefinitionTransactionBody.id,
            mosaicDefinitionTransactionBody.duration,
            mosaicDefinitionTransactionBody.nonce,
            mosaicDefinitionTransactionBody.flags,
            mosaicDefinitionTransactionBody.divisibility,
        );
    }

    /**
     * Creates an instance of EmbeddedMosaicDefinitionTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param id Unique mosaic identifier obtained from the generator account's public key and the `nonce`.
The SDK's can take care of generating this ID for you..
     * @param duration Mosaic duration expressed in blocks. If set to 0, the mosaic never expires..
     * @param nonce Random nonce used to generate the mosaic id..
     * @param flags Mosaic flags..
     * @param divisibility Mosaic divisibility..
     * @return Instance of EmbeddedMosaicDefinitionTransactionBuilder.
     */
    public static createEmbeddedMosaicDefinitionTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        id: MosaicIdDto,
        duration: BlockDurationDto,
        nonce: MosaicNonceDto,
        flags: MosaicFlagsDto[],
        divisibility: number,
    ): EmbeddedMosaicDefinitionTransactionBuilder {
        return new EmbeddedMosaicDefinitionTransactionBuilder(
            signerPublicKey,
            version,
            network,
            type,
            id,
            duration,
            nonce,
            flags,
            divisibility,
        );
    }

    /**
     * Gets Unique mosaic identifier obtained from the generator account's public key and the `nonce`.
The SDK's can take care of generating this ID for you..
     *
     * @return Unique mosaic identifier obtained from the generator account's public key and the `nonce`.
The SDK's can take care of generating this ID for you..
     */
    public getId(): MosaicIdDto {
        return this.mosaicDefinitionTransactionBody.getId();
    }

    /**
     * Gets Mosaic duration expressed in blocks. If set to 0, the mosaic never expires..
     *
     * @return Mosaic duration expressed in blocks. If set to 0, the mosaic never expires..
     */
    public getDuration(): BlockDurationDto {
        return this.mosaicDefinitionTransactionBody.getDuration();
    }

    /**
     * Gets Random nonce used to generate the mosaic id..
     *
     * @return Random nonce used to generate the mosaic id..
     */
    public getNonce(): MosaicNonceDto {
        return this.mosaicDefinitionTransactionBody.getNonce();
    }

    /**
     * Gets Mosaic flags..
     *
     * @return Mosaic flags..
     */
    public getFlags(): MosaicFlagsDto[] {
        return this.mosaicDefinitionTransactionBody.getFlags();
    }

    /**
     * Gets Mosaic divisibility..
     *
     * @return Mosaic divisibility..
     */
    public getDivisibility(): number {
        return this.mosaicDefinitionTransactionBody.getDivisibility();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.mosaicDefinitionTransactionBody.getSize(); // mosaicDefinitionTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): MosaicDefinitionTransactionBodyBuilder {
        return this.mosaicDefinitionTransactionBody;
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
        const mosaicDefinitionTransactionBodyBytes = this.mosaicDefinitionTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicDefinitionTransactionBodyBytes);
        return newArray;
    }
}
