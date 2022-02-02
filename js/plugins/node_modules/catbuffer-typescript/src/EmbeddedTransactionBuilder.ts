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
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';

/**
 * Binary layout for an embedded transaction
 **/
export class EmbeddedTransactionBuilder implements Serializer {
    /** Public key of the signer of the entity.. **/
    readonly signerPublicKey: PublicKeyDto;

    /** Version of this structure.. **/
    readonly version: number;

    /** Network on which this entity was created.. **/
    readonly network: NetworkTypeDto;

    /** Transaction type. **/
    readonly type: TransactionTypeDto;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     */
    public constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto) {
        GeneratorUtils.notNull(signerPublicKey, 'signerPublicKey is null or undefined');
        GeneratorUtils.notNull(version, 'version is null or undefined');
        GeneratorUtils.notNull(network, 'network is null or undefined');
        GeneratorUtils.notNull(type, 'type is null or undefined');
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedTransactionBuilder {
        const byteArray = Array.from(payload);
        const size: number = GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const signerPublicKey: PublicKeyDto = PublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.getSize());
        GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const network: NetworkTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const type: TransactionTypeDto = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        return new EmbeddedTransactionBuilder(signerPublicKey, version, network, type);
    }

    /**
     * Creates an instance of EmbeddedTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @return Instance of EmbeddedTransactionBuilder.
     */
    public static createEmbeddedTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
    ): EmbeddedTransactionBuilder {
        return new EmbeddedTransactionBuilder(signerPublicKey, version, network, type);
    }

    /**
     * Gets Public key of the signer of the entity..
     *
     * @return Public key of the signer of the entity..
     */
    public getSignerPublicKey(): PublicKeyDto {
        return this.signerPublicKey;
    }

    /**
     * Gets Version of this structure..
     *
     * @return Version of this structure..
     */
    public getVersion(): number {
        return this.version;
    }

    /**
     * Gets Network on which this entity was created..
     *
     * @return Network on which this entity was created..
     */
    public getNetwork(): NetworkTypeDto {
        return this.network;
    }

    /**
     * Gets transaction type.
     *
     * @return Transaction type.
     */
    public getType(): TransactionTypeDto {
        return this.type;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += 4; // size
        size += 4; // embeddedTransactionHeaderReserved1
        size += this.signerPublicKey.getSize(); // signerPublicKey
        size += 4; // entityBodyReserved1
        size += 1; // version
        size += 1; // network
        size += 2; // type
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): undefined | Serializer {
        return undefined;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const sizeBytes = GeneratorUtils.uint32ToBuffer(this.getSize());
        newArray = GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        const embeddedTransactionHeaderReserved1Bytes = GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, embeddedTransactionHeaderReserved1Bytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const entityBodyReserved1Bytes = GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, entityBodyReserved1Bytes);
        const versionBytes = GeneratorUtils.uint8ToBuffer(this.getVersion());
        newArray = GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        const networkBytes = GeneratorUtils.uint8ToBuffer(this.network);
        newArray = GeneratorUtils.concatTypedArrays(newArray, networkBytes);
        const typeBytes = GeneratorUtils.uint16ToBuffer(this.type);
        newArray = GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        return newArray;
    }
}
