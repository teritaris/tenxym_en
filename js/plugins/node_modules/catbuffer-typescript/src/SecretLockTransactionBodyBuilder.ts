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
import { GeneratorUtils } from './GeneratorUtils';
import { Hash256Dto } from './Hash256Dto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';

/**
 * Shared content between SecretLockTransaction and EmbeddedSecretLockTransaction.
 **/
export class SecretLockTransactionBodyBuilder implements Serializer {
    /** Address that receives the funds once successfully unlocked by a SecretProofTransaction.. **/
    readonly recipientAddress: UnresolvedAddressDto;

    /** Hashed proof.. **/
    readonly secret: Hash256Dto;

    /** Locked mosaics.. **/
    readonly mosaic: UnresolvedMosaicBuilder;

    /** Number of blocks to wait for the SecretProofTransaction.. **/
    readonly duration: BlockDurationDto;

    /** Algorithm used to hash the proof.. **/
    readonly hashAlgorithm: LockHashAlgorithmDto;

    /**
     * Constructor.
     *
     * @param recipientAddress Address that receives the funds once successfully unlocked by a SecretProofTransaction..
     * @param secret Hashed proof..
     * @param mosaic Locked mosaics..
     * @param duration Number of blocks to wait for the SecretProofTransaction..
     * @param hashAlgorithm Algorithm used to hash the proof..
     */
    public constructor(
        recipientAddress: UnresolvedAddressDto,
        secret: Hash256Dto,
        mosaic: UnresolvedMosaicBuilder,
        duration: BlockDurationDto,
        hashAlgorithm: LockHashAlgorithmDto,
    ) {
        GeneratorUtils.notNull(recipientAddress, 'recipientAddress is null or undefined');
        GeneratorUtils.notNull(secret, 'secret is null or undefined');
        GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        GeneratorUtils.notNull(duration, 'duration is null or undefined');
        GeneratorUtils.notNull(hashAlgorithm, 'hashAlgorithm is null or undefined');
        this.recipientAddress = recipientAddress;
        this.secret = secret;
        this.mosaic = mosaic;
        this.duration = duration;
        this.hashAlgorithm = hashAlgorithm;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): SecretLockTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const recipientAddress: UnresolvedAddressDto = UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.getSize());
        const secret: Hash256Dto = Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.getSize());
        const mosaic: UnresolvedMosaicBuilder = UnresolvedMosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        const duration: BlockDurationDto = BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.getSize());
        const hashAlgorithm: LockHashAlgorithmDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new SecretLockTransactionBodyBuilder(recipientAddress, secret, mosaic, duration, hashAlgorithm);
    }

    /**
     * Creates an instance of SecretLockTransactionBodyBuilder.
     *
     * @param recipientAddress Address that receives the funds once successfully unlocked by a SecretProofTransaction..
     * @param secret Hashed proof..
     * @param mosaic Locked mosaics..
     * @param duration Number of blocks to wait for the SecretProofTransaction..
     * @param hashAlgorithm Algorithm used to hash the proof..
     * @return Instance of SecretLockTransactionBodyBuilder.
     */
    public static createSecretLockTransactionBodyBuilder(
        recipientAddress: UnresolvedAddressDto,
        secret: Hash256Dto,
        mosaic: UnresolvedMosaicBuilder,
        duration: BlockDurationDto,
        hashAlgorithm: LockHashAlgorithmDto,
    ): SecretLockTransactionBodyBuilder {
        return new SecretLockTransactionBodyBuilder(recipientAddress, secret, mosaic, duration, hashAlgorithm);
    }

    /**
     * Gets Address that receives the funds once successfully unlocked by a SecretProofTransaction..
     *
     * @return Address that receives the funds once successfully unlocked by a SecretProofTransaction..
     */
    public getRecipientAddress(): UnresolvedAddressDto {
        return this.recipientAddress;
    }

    /**
     * Gets Hashed proof..
     *
     * @return Hashed proof..
     */
    public getSecret(): Hash256Dto {
        return this.secret;
    }

    /**
     * Gets Locked mosaics..
     *
     * @return Locked mosaics..
     */
    public getMosaic(): UnresolvedMosaicBuilder {
        return this.mosaic;
    }

    /**
     * Gets Number of blocks to wait for the SecretProofTransaction..
     *
     * @return Number of blocks to wait for the SecretProofTransaction..
     */
    public getDuration(): BlockDurationDto {
        return this.duration;
    }

    /**
     * Gets Algorithm used to hash the proof..
     *
     * @return Algorithm used to hash the proof..
     */
    public getHashAlgorithm(): LockHashAlgorithmDto {
        return this.hashAlgorithm;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.recipientAddress.getSize(); // recipientAddress
        size += this.secret.getSize(); // secret
        size += this.mosaic.getSize(); // mosaic
        size += this.duration.getSize(); // duration
        size += 1; // hashAlgorithm
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        const secretBytes = this.secret.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, secretBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const durationBytes = this.duration.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        const hashAlgorithmBytes = GeneratorUtils.uint8ToBuffer(this.hashAlgorithm);
        newArray = GeneratorUtils.concatTypedArrays(newArray, hashAlgorithmBytes);
        return newArray;
    }
}
