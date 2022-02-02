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
import { Hash256Dto } from './Hash256Dto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { SecretLockTransactionBodyBuilder } from './SecretLockTransactionBodyBuilder';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';

/**
 * Embedded version of SecretLockTransaction.
 **/
export class EmbeddedSecretLockTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Secret lock transaction body. **/
    readonly secretLockTransactionBody: SecretLockTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param recipientAddress Address that receives the funds once successfully unlocked by a SecretProofTransaction..
     * @param secret Hashed proof..
     * @param mosaic Locked mosaics..
     * @param duration Number of blocks to wait for the SecretProofTransaction..
     * @param hashAlgorithm Algorithm used to hash the proof..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        recipientAddress: UnresolvedAddressDto,
        secret: Hash256Dto,
        mosaic: UnresolvedMosaicBuilder,
        duration: BlockDurationDto,
        hashAlgorithm: LockHashAlgorithmDto,
    ) {
        super(signerPublicKey, version, network, type);
        this.secretLockTransactionBody = new SecretLockTransactionBodyBuilder(recipientAddress, secret, mosaic, duration, hashAlgorithm);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedSecretLockTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const secretLockTransactionBody: SecretLockTransactionBodyBuilder = SecretLockTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, secretLockTransactionBody.getSize());
        return new EmbeddedSecretLockTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            secretLockTransactionBody.recipientAddress,
            secretLockTransactionBody.secret,
            secretLockTransactionBody.mosaic,
            secretLockTransactionBody.duration,
            secretLockTransactionBody.hashAlgorithm,
        );
    }

    /**
     * Creates an instance of EmbeddedSecretLockTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param recipientAddress Address that receives the funds once successfully unlocked by a SecretProofTransaction..
     * @param secret Hashed proof..
     * @param mosaic Locked mosaics..
     * @param duration Number of blocks to wait for the SecretProofTransaction..
     * @param hashAlgorithm Algorithm used to hash the proof..
     * @return Instance of EmbeddedSecretLockTransactionBuilder.
     */
    public static createEmbeddedSecretLockTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        recipientAddress: UnresolvedAddressDto,
        secret: Hash256Dto,
        mosaic: UnresolvedMosaicBuilder,
        duration: BlockDurationDto,
        hashAlgorithm: LockHashAlgorithmDto,
    ): EmbeddedSecretLockTransactionBuilder {
        return new EmbeddedSecretLockTransactionBuilder(
            signerPublicKey,
            version,
            network,
            type,
            recipientAddress,
            secret,
            mosaic,
            duration,
            hashAlgorithm,
        );
    }

    /**
     * Gets Address that receives the funds once successfully unlocked by a SecretProofTransaction..
     *
     * @return Address that receives the funds once successfully unlocked by a SecretProofTransaction..
     */
    public getRecipientAddress(): UnresolvedAddressDto {
        return this.secretLockTransactionBody.getRecipientAddress();
    }

    /**
     * Gets Hashed proof..
     *
     * @return Hashed proof..
     */
    public getSecret(): Hash256Dto {
        return this.secretLockTransactionBody.getSecret();
    }

    /**
     * Gets Locked mosaics..
     *
     * @return Locked mosaics..
     */
    public getMosaic(): UnresolvedMosaicBuilder {
        return this.secretLockTransactionBody.getMosaic();
    }

    /**
     * Gets Number of blocks to wait for the SecretProofTransaction..
     *
     * @return Number of blocks to wait for the SecretProofTransaction..
     */
    public getDuration(): BlockDurationDto {
        return this.secretLockTransactionBody.getDuration();
    }

    /**
     * Gets Algorithm used to hash the proof..
     *
     * @return Algorithm used to hash the proof..
     */
    public getHashAlgorithm(): LockHashAlgorithmDto {
        return this.secretLockTransactionBody.getHashAlgorithm();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.secretLockTransactionBody.getSize(); // secretLockTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): SecretLockTransactionBodyBuilder {
        return this.secretLockTransactionBody;
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
        const secretLockTransactionBodyBytes = this.secretLockTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, secretLockTransactionBodyBytes);
        return newArray;
    }
}
