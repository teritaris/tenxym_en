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
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceRegistrationTransactionBodyBuilder } from './NamespaceRegistrationTransactionBodyBuilder';
import { NamespaceRegistrationTypeDto } from './NamespaceRegistrationTypeDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';

/**
 * Embedded version of NamespaceRegistrationTransaction.
 **/
export class EmbeddedNamespaceRegistrationTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Namespace registration transaction body. **/
    readonly namespaceRegistrationTransactionBody: NamespaceRegistrationTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param duration Number of confirmed blocks you would like to rent the namespace for. Required for root namespaces..
     * @param parentId Parent namespace identifier. Required for sub-namespaces..
     * @param id Namespace identifier..
     * @param registrationType Namespace registration type..
     * @param name Namespace name..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        duration: BlockDurationDto | undefined,
        parentId: NamespaceIdDto | undefined,
        id: NamespaceIdDto,
        registrationType: NamespaceRegistrationTypeDto,
        name: Uint8Array,
    ) {
        super(signerPublicKey, version, network, type);
        this.namespaceRegistrationTransactionBody = new NamespaceRegistrationTransactionBodyBuilder(
            duration,
            parentId,
            id,
            registrationType,
            name,
        );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedNamespaceRegistrationTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const namespaceRegistrationTransactionBody: NamespaceRegistrationTransactionBodyBuilder =
            NamespaceRegistrationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceRegistrationTransactionBody.getSize());
        return new EmbeddedNamespaceRegistrationTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            namespaceRegistrationTransactionBody.duration,
            namespaceRegistrationTransactionBody.parentId,
            namespaceRegistrationTransactionBody.id,
            namespaceRegistrationTransactionBody.registrationType,
            namespaceRegistrationTransactionBody.name,
        );
    }

    /**
     * Creates an instance of EmbeddedNamespaceRegistrationTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param duration Number of confirmed blocks you would like to rent the namespace for. Required for root namespaces..
     * @param id Namespace identifier..
     * @param name Namespace name..
     * @return Instance of EmbeddedNamespaceRegistrationTransactionBuilder.
     */
    public static createEmbeddedNamespaceRegistrationTransactionBuilderROOT(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        duration: BlockDurationDto,
        id: NamespaceIdDto,
        name: Uint8Array,
    ): EmbeddedNamespaceRegistrationTransactionBuilder {
        const registrationType = NamespaceRegistrationTypeDto.ROOT;
        return new EmbeddedNamespaceRegistrationTransactionBuilder(
            signerPublicKey,
            version,
            network,
            type,
            duration,
            undefined,
            id,
            registrationType,
            name,
        );
    }

    /**
     * Creates an instance of EmbeddedNamespaceRegistrationTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param parentId Parent namespace identifier. Required for sub-namespaces..
     * @param id Namespace identifier..
     * @param name Namespace name..
     * @return Instance of EmbeddedNamespaceRegistrationTransactionBuilder.
     */
    public static createEmbeddedNamespaceRegistrationTransactionBuilderCHILD(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        parentId: NamespaceIdDto,
        id: NamespaceIdDto,
        name: Uint8Array,
    ): EmbeddedNamespaceRegistrationTransactionBuilder {
        const registrationType = NamespaceRegistrationTypeDto.CHILD;
        return new EmbeddedNamespaceRegistrationTransactionBuilder(
            signerPublicKey,
            version,
            network,
            type,
            undefined,
            parentId,
            id,
            registrationType,
            name,
        );
    }

    /**
     * Gets Number of confirmed blocks you would like to rent the namespace for. Required for root namespaces..
     *
     * @return Number of confirmed blocks you would like to rent the namespace for. Required for root namespaces..
     */
    public getDuration(): BlockDurationDto {
        return this.namespaceRegistrationTransactionBody.getDuration();
    }

    /**
     * Gets Parent namespace identifier. Required for sub-namespaces..
     *
     * @return Parent namespace identifier. Required for sub-namespaces..
     */
    public getParentId(): NamespaceIdDto {
        return this.namespaceRegistrationTransactionBody.getParentId();
    }

    /**
     * Gets Namespace identifier..
     *
     * @return Namespace identifier..
     */
    public getId(): NamespaceIdDto {
        return this.namespaceRegistrationTransactionBody.getId();
    }

    /**
     * Gets Namespace registration type..
     *
     * @return Namespace registration type..
     */
    public getRegistrationType(): NamespaceRegistrationTypeDto {
        return this.namespaceRegistrationTransactionBody.getRegistrationType();
    }

    /**
     * Gets Namespace name..
     *
     * @return Namespace name..
     */
    public getName(): Uint8Array {
        return this.namespaceRegistrationTransactionBody.getName();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.namespaceRegistrationTransactionBody.getSize(); // namespaceRegistrationTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): NamespaceRegistrationTransactionBodyBuilder {
        return this.namespaceRegistrationTransactionBody;
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
        const namespaceRegistrationTransactionBodyBytes = this.namespaceRegistrationTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, namespaceRegistrationTransactionBodyBytes);
        return newArray;
    }
}
