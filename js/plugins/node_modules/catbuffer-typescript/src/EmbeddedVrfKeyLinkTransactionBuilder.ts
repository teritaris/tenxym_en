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
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { VrfKeyLinkTransactionBodyBuilder } from './VrfKeyLinkTransactionBodyBuilder';

/**
 * Embedded version of VrfKeyLinkTransaction.
 **/
export class EmbeddedVrfKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Vrf key link transaction body. **/
    readonly vrfKeyLinkTransactionBody: VrfKeyLinkTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param linkedPublicKey Linked VRF public key..
     * @param linkAction Account link action..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        linkedPublicKey: PublicKeyDto,
        linkAction: LinkActionDto,
    ) {
        super(signerPublicKey, version, network, type);
        this.vrfKeyLinkTransactionBody = new VrfKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedVrfKeyLinkTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const vrfKeyLinkTransactionBody: VrfKeyLinkTransactionBodyBuilder = VrfKeyLinkTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, vrfKeyLinkTransactionBody.getSize());
        return new EmbeddedVrfKeyLinkTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            vrfKeyLinkTransactionBody.linkedPublicKey,
            vrfKeyLinkTransactionBody.linkAction,
        );
    }

    /**
     * Creates an instance of EmbeddedVrfKeyLinkTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param linkedPublicKey Linked VRF public key..
     * @param linkAction Account link action..
     * @return Instance of EmbeddedVrfKeyLinkTransactionBuilder.
     */
    public static createEmbeddedVrfKeyLinkTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        linkedPublicKey: PublicKeyDto,
        linkAction: LinkActionDto,
    ): EmbeddedVrfKeyLinkTransactionBuilder {
        return new EmbeddedVrfKeyLinkTransactionBuilder(signerPublicKey, version, network, type, linkedPublicKey, linkAction);
    }

    /**
     * Gets Linked VRF public key..
     *
     * @return Linked VRF public key..
     */
    public getLinkedPublicKey(): PublicKeyDto {
        return this.vrfKeyLinkTransactionBody.getLinkedPublicKey();
    }

    /**
     * Gets Account link action..
     *
     * @return Account link action..
     */
    public getLinkAction(): LinkActionDto {
        return this.vrfKeyLinkTransactionBody.getLinkAction();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.vrfKeyLinkTransactionBody.getSize(); // vrfKeyLinkTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): VrfKeyLinkTransactionBodyBuilder {
        return this.vrfKeyLinkTransactionBody;
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
        const vrfKeyLinkTransactionBodyBytes = this.vrfKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, vrfKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
