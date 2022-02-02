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

import { AliasActionDto } from './AliasActionDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { MosaicAliasTransactionBodyBuilder } from './MosaicAliasTransactionBodyBuilder';
import { MosaicIdDto } from './MosaicIdDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';

/**
 * Embedded version of MosaicAliasTransaction
 **/
export class EmbeddedMosaicAliasTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Mosaic alias transaction body. **/
    readonly mosaicAliasTransactionBody: MosaicAliasTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param namespaceId Identifier of the namespace that will become (or stop being) an alias for the Mosaic..
     * @param mosaicId Aliased mosaic identifier..
     * @param aliasAction Alias action..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        namespaceId: NamespaceIdDto,
        mosaicId: MosaicIdDto,
        aliasAction: AliasActionDto,
    ) {
        super(signerPublicKey, version, network, type);
        this.mosaicAliasTransactionBody = new MosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedMosaicAliasTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicAliasTransactionBody: MosaicAliasTransactionBodyBuilder = MosaicAliasTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, mosaicAliasTransactionBody.getSize());
        return new EmbeddedMosaicAliasTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            mosaicAliasTransactionBody.namespaceId,
            mosaicAliasTransactionBody.mosaicId,
            mosaicAliasTransactionBody.aliasAction,
        );
    }

    /**
     * Creates an instance of EmbeddedMosaicAliasTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param namespaceId Identifier of the namespace that will become (or stop being) an alias for the Mosaic..
     * @param mosaicId Aliased mosaic identifier..
     * @param aliasAction Alias action..
     * @return Instance of EmbeddedMosaicAliasTransactionBuilder.
     */
    public static createEmbeddedMosaicAliasTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        namespaceId: NamespaceIdDto,
        mosaicId: MosaicIdDto,
        aliasAction: AliasActionDto,
    ): EmbeddedMosaicAliasTransactionBuilder {
        return new EmbeddedMosaicAliasTransactionBuilder(signerPublicKey, version, network, type, namespaceId, mosaicId, aliasAction);
    }

    /**
     * Gets Identifier of the namespace that will become (or stop being) an alias for the Mosaic..
     *
     * @return Identifier of the namespace that will become (or stop being) an alias for the Mosaic..
     */
    public getNamespaceId(): NamespaceIdDto {
        return this.mosaicAliasTransactionBody.getNamespaceId();
    }

    /**
     * Gets Aliased mosaic identifier..
     *
     * @return Aliased mosaic identifier..
     */
    public getMosaicId(): MosaicIdDto {
        return this.mosaicAliasTransactionBody.getMosaicId();
    }

    /**
     * Gets Alias action..
     *
     * @return Alias action..
     */
    public getAliasAction(): AliasActionDto {
        return this.mosaicAliasTransactionBody.getAliasAction();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.mosaicAliasTransactionBody.getSize(); // mosaicAliasTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): MosaicAliasTransactionBodyBuilder {
        return this.mosaicAliasTransactionBody;
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
        const mosaicAliasTransactionBodyBytes = this.mosaicAliasTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicAliasTransactionBodyBytes);
        return newArray;
    }
}
