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
import { Hash256Dto } from './Hash256Dto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
 * Shared content between SecretProofTransaction and EmbeddedSecretProofTransaction.
 **/
export class SecretProofTransactionBodyBuilder implements Serializer {
    /** Address that receives the funds once unlocked.. **/
    readonly recipientAddress: UnresolvedAddressDto;

    /** Hashed proof.. **/
    readonly secret: Hash256Dto;

    /** Algorithm used to hash the proof.. **/
    readonly hashAlgorithm: LockHashAlgorithmDto;

    /** Original random set of bytes that were hashed.. **/
    readonly proof: Uint8Array;

    /**
     * Constructor.
     *
     * @param recipientAddress Address that receives the funds once unlocked..
     * @param secret Hashed proof..
     * @param hashAlgorithm Algorithm used to hash the proof..
     * @param proof Original random set of bytes that were hashed..
     */
    public constructor(recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, hashAlgorithm: LockHashAlgorithmDto, proof: Uint8Array) {
        GeneratorUtils.notNull(recipientAddress, 'recipientAddress is null or undefined');
        GeneratorUtils.notNull(secret, 'secret is null or undefined');
        GeneratorUtils.notNull(hashAlgorithm, 'hashAlgorithm is null or undefined');
        GeneratorUtils.notNull(proof, 'proof is null or undefined');
        this.recipientAddress = recipientAddress;
        this.secret = secret;
        this.hashAlgorithm = hashAlgorithm;
        this.proof = proof;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): SecretProofTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const recipientAddress: UnresolvedAddressDto = UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.getSize());
        const secret: Hash256Dto = Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.getSize());
        const proofSize: number = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const hashAlgorithm: LockHashAlgorithmDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const proof: Uint8Array = GeneratorUtils.getBytes(Uint8Array.from(byteArray), proofSize);
        byteArray.splice(0, proofSize);
        return new SecretProofTransactionBodyBuilder(recipientAddress, secret, hashAlgorithm, proof);
    }

    /**
     * Creates an instance of SecretProofTransactionBodyBuilder.
     *
     * @param recipientAddress Address that receives the funds once unlocked..
     * @param secret Hashed proof..
     * @param hashAlgorithm Algorithm used to hash the proof..
     * @param proof Original random set of bytes that were hashed..
     * @return Instance of SecretProofTransactionBodyBuilder.
     */
    public static createSecretProofTransactionBodyBuilder(
        recipientAddress: UnresolvedAddressDto,
        secret: Hash256Dto,
        hashAlgorithm: LockHashAlgorithmDto,
        proof: Uint8Array,
    ): SecretProofTransactionBodyBuilder {
        return new SecretProofTransactionBodyBuilder(recipientAddress, secret, hashAlgorithm, proof);
    }

    /**
     * Gets Address that receives the funds once unlocked..
     *
     * @return Address that receives the funds once unlocked..
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
     * Gets Algorithm used to hash the proof..
     *
     * @return Algorithm used to hash the proof..
     */
    public getHashAlgorithm(): LockHashAlgorithmDto {
        return this.hashAlgorithm;
    }

    /**
     * Gets Original random set of bytes that were hashed..
     *
     * @return Original random set of bytes that were hashed..
     */
    public getProof(): Uint8Array {
        return this.proof;
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
        size += 2; // proofSize
        size += 1; // hashAlgorithm
        size += this.proof.length; // proof
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
        const proofSizeBytes = GeneratorUtils.uint16ToBuffer(this.proof.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, proofSizeBytes);
        const hashAlgorithmBytes = GeneratorUtils.uint8ToBuffer(this.hashAlgorithm);
        newArray = GeneratorUtils.concatTypedArrays(newArray, hashAlgorithmBytes);
        const proofBytes = this.proof;
        newArray = GeneratorUtils.concatTypedArrays(newArray, proofBytes);
        return newArray;
    }
}
