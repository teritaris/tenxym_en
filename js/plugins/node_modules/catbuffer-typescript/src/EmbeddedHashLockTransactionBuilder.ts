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
import { HashLockTransactionBodyBuilder } from './HashLockTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';

/**
 * Embedded version of HashLockTransaction.
 **/
export class EmbeddedHashLockTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Hash lock transaction body. **/
    readonly hashLockTransactionBody: HashLockTransactionBodyBuilder;

    /**
    * Constructor.
    *
    * @param signerPublicKey Public key of the signer of the entity..
    * @param version Version of this structure..
    * @param network Network on which this entity was created..
    * @param type Transaction type.
    * @param mosaic Locked mosaic..
    * @param duration Number of blocks for which a lock should be valid.
The default maximum is 48h (See the `maxHashLockDuration` network property)..
    * @param hash Hash of the AggregateBondedTransaction to be confirmed before unlocking the mosaics..
    */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        mosaic: UnresolvedMosaicBuilder,
        duration: BlockDurationDto,
        hash: Hash256Dto,
    ) {
        super(signerPublicKey, version, network, type);
        this.hashLockTransactionBody = new HashLockTransactionBodyBuilder(mosaic, duration, hash);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedHashLockTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const hashLockTransactionBody: HashLockTransactionBodyBuilder = HashLockTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, hashLockTransactionBody.getSize());
        return new EmbeddedHashLockTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            hashLockTransactionBody.mosaic,
            hashLockTransactionBody.duration,
            hashLockTransactionBody.hash,
        );
    }

    /**
     * Creates an instance of EmbeddedHashLockTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param mosaic Locked mosaic..
     * @param duration Number of blocks for which a lock should be valid.
The default maximum is 48h (See the `maxHashLockDuration` network property)..
     * @param hash Hash of the AggregateBondedTransaction to be confirmed before unlocking the mosaics..
     * @return Instance of EmbeddedHashLockTransactionBuilder.
     */
    public static createEmbeddedHashLockTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        mosaic: UnresolvedMosaicBuilder,
        duration: BlockDurationDto,
        hash: Hash256Dto,
    ): EmbeddedHashLockTransactionBuilder {
        return new EmbeddedHashLockTransactionBuilder(signerPublicKey, version, network, type, mosaic, duration, hash);
    }

    /**
     * Gets Locked mosaic..
     *
     * @return Locked mosaic..
     */
    public getMosaic(): UnresolvedMosaicBuilder {
        return this.hashLockTransactionBody.getMosaic();
    }

    /**
     * Gets Number of blocks for which a lock should be valid.
The default maximum is 48h (See the `maxHashLockDuration` network property)..
     *
     * @return Number of blocks for which a lock should be valid.
The default maximum is 48h (See the `maxHashLockDuration` network property)..
     */
    public getDuration(): BlockDurationDto {
        return this.hashLockTransactionBody.getDuration();
    }

    /**
     * Gets Hash of the AggregateBondedTransaction to be confirmed before unlocking the mosaics..
     *
     * @return Hash of the AggregateBondedTransaction to be confirmed before unlocking the mosaics..
     */
    public getHash(): Hash256Dto {
        return this.hashLockTransactionBody.getHash();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.hashLockTransactionBody.getSize(); // hashLockTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): HashLockTransactionBodyBuilder {
        return this.hashLockTransactionBody;
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
        const hashLockTransactionBodyBytes = this.hashLockTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, hashLockTransactionBodyBytes);
        return newArray;
    }
}
