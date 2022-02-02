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

import { AccountKeyLinkTransactionBodyBuilder } from './AccountKeyLinkTransactionBodyBuilder';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';

/**
 * Embedded version of AccountKeyLinkTransaction.
 **/
export class EmbeddedAccountKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Account key link transaction body. **/
    readonly accountKeyLinkTransactionBody: AccountKeyLinkTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param linkedPublicKey Linked public key..
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
        this.accountKeyLinkTransactionBody = new AccountKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedAccountKeyLinkTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountKeyLinkTransactionBody: AccountKeyLinkTransactionBodyBuilder = AccountKeyLinkTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, accountKeyLinkTransactionBody.getSize());
        return new EmbeddedAccountKeyLinkTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            accountKeyLinkTransactionBody.linkedPublicKey,
            accountKeyLinkTransactionBody.linkAction,
        );
    }

    /**
     * Creates an instance of EmbeddedAccountKeyLinkTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param linkedPublicKey Linked public key..
     * @param linkAction Account link action..
     * @return Instance of EmbeddedAccountKeyLinkTransactionBuilder.
     */
    public static createEmbeddedAccountKeyLinkTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        linkedPublicKey: PublicKeyDto,
        linkAction: LinkActionDto,
    ): EmbeddedAccountKeyLinkTransactionBuilder {
        return new EmbeddedAccountKeyLinkTransactionBuilder(signerPublicKey, version, network, type, linkedPublicKey, linkAction);
    }

    /**
     * Gets Linked public key..
     *
     * @return Linked public key..
     */
    public getLinkedPublicKey(): PublicKeyDto {
        return this.accountKeyLinkTransactionBody.getLinkedPublicKey();
    }

    /**
     * Gets Account link action..
     *
     * @return Account link action..
     */
    public getLinkAction(): LinkActionDto {
        return this.accountKeyLinkTransactionBody.getLinkAction();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.accountKeyLinkTransactionBody.getSize(); // accountKeyLinkTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): AccountKeyLinkTransactionBodyBuilder {
        return this.accountKeyLinkTransactionBody;
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
        const accountKeyLinkTransactionBodyBytes = this.accountKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
