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
import { FinalizationEpochDto } from './FinalizationEpochDto';
import { GeneratorUtils } from './GeneratorUtils';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { VotingKeyLinkTransactionBodyBuilder } from './VotingKeyLinkTransactionBodyBuilder';
import { VotingPublicKeyDto } from './VotingPublicKeyDto';

/**
 * Embedded version of VotingKeyLinkTransaction.
 **/
export class EmbeddedVotingKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Voting key link transaction body. **/
    readonly votingKeyLinkTransactionBody: VotingKeyLinkTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param linkedPublicKey Linked voting public key..
     * @param startEpoch Starting finalization epoch..
     * @param endEpoch Ending finalization epoch..
     * @param linkAction Account link action..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        linkedPublicKey: VotingPublicKeyDto,
        startEpoch: FinalizationEpochDto,
        endEpoch: FinalizationEpochDto,
        linkAction: LinkActionDto,
    ) {
        super(signerPublicKey, version, network, type);
        this.votingKeyLinkTransactionBody = new VotingKeyLinkTransactionBodyBuilder(linkedPublicKey, startEpoch, endEpoch, linkAction);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedVotingKeyLinkTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const votingKeyLinkTransactionBody: VotingKeyLinkTransactionBodyBuilder = VotingKeyLinkTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, votingKeyLinkTransactionBody.getSize());
        return new EmbeddedVotingKeyLinkTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            votingKeyLinkTransactionBody.linkedPublicKey,
            votingKeyLinkTransactionBody.startEpoch,
            votingKeyLinkTransactionBody.endEpoch,
            votingKeyLinkTransactionBody.linkAction,
        );
    }

    /**
     * Creates an instance of EmbeddedVotingKeyLinkTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param linkedPublicKey Linked voting public key..
     * @param startEpoch Starting finalization epoch..
     * @param endEpoch Ending finalization epoch..
     * @param linkAction Account link action..
     * @return Instance of EmbeddedVotingKeyLinkTransactionBuilder.
     */
    public static createEmbeddedVotingKeyLinkTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        linkedPublicKey: VotingPublicKeyDto,
        startEpoch: FinalizationEpochDto,
        endEpoch: FinalizationEpochDto,
        linkAction: LinkActionDto,
    ): EmbeddedVotingKeyLinkTransactionBuilder {
        return new EmbeddedVotingKeyLinkTransactionBuilder(
            signerPublicKey,
            version,
            network,
            type,
            linkedPublicKey,
            startEpoch,
            endEpoch,
            linkAction,
        );
    }

    /**
     * Gets Linked voting public key..
     *
     * @return Linked voting public key..
     */
    public getLinkedPublicKey(): VotingPublicKeyDto {
        return this.votingKeyLinkTransactionBody.getLinkedPublicKey();
    }

    /**
     * Gets Starting finalization epoch..
     *
     * @return Starting finalization epoch..
     */
    public getStartEpoch(): FinalizationEpochDto {
        return this.votingKeyLinkTransactionBody.getStartEpoch();
    }

    /**
     * Gets Ending finalization epoch..
     *
     * @return Ending finalization epoch..
     */
    public getEndEpoch(): FinalizationEpochDto {
        return this.votingKeyLinkTransactionBody.getEndEpoch();
    }

    /**
     * Gets Account link action..
     *
     * @return Account link action..
     */
    public getLinkAction(): LinkActionDto {
        return this.votingKeyLinkTransactionBody.getLinkAction();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.votingKeyLinkTransactionBody.getSize(); // votingKeyLinkTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): VotingKeyLinkTransactionBodyBuilder {
        return this.votingKeyLinkTransactionBody;
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
        const votingKeyLinkTransactionBodyBytes = this.votingKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, votingKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
