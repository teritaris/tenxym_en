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

import { FinalizationEpochDto } from './FinalizationEpochDto';
import { GeneratorUtils } from './GeneratorUtils';
import { LinkActionDto } from './LinkActionDto';
import { Serializer } from './Serializer';
import { VotingPublicKeyDto } from './VotingPublicKeyDto';

/**
 * Shared content between VotingKeyLinkTransaction and EmbeddedVotingKeyLinkTransaction.
 **/
export class VotingKeyLinkTransactionBodyBuilder implements Serializer {
    /** Linked voting public key.. **/
    readonly linkedPublicKey: VotingPublicKeyDto;

    /** Starting finalization epoch.. **/
    readonly startEpoch: FinalizationEpochDto;

    /** Ending finalization epoch.. **/
    readonly endEpoch: FinalizationEpochDto;

    /** Account link action.. **/
    readonly linkAction: LinkActionDto;

    /**
     * Constructor.
     *
     * @param linkedPublicKey Linked voting public key..
     * @param startEpoch Starting finalization epoch..
     * @param endEpoch Ending finalization epoch..
     * @param linkAction Account link action..
     */
    public constructor(
        linkedPublicKey: VotingPublicKeyDto,
        startEpoch: FinalizationEpochDto,
        endEpoch: FinalizationEpochDto,
        linkAction: LinkActionDto,
    ) {
        GeneratorUtils.notNull(linkedPublicKey, 'linkedPublicKey is null or undefined');
        GeneratorUtils.notNull(startEpoch, 'startEpoch is null or undefined');
        GeneratorUtils.notNull(endEpoch, 'endEpoch is null or undefined');
        GeneratorUtils.notNull(linkAction, 'linkAction is null or undefined');
        this.linkedPublicKey = linkedPublicKey;
        this.startEpoch = startEpoch;
        this.endEpoch = endEpoch;
        this.linkAction = linkAction;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): VotingKeyLinkTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const linkedPublicKey: VotingPublicKeyDto = VotingPublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, linkedPublicKey.getSize());
        const startEpoch: FinalizationEpochDto = FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startEpoch.getSize());
        const endEpoch: FinalizationEpochDto = FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, endEpoch.getSize());
        const linkAction: LinkActionDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new VotingKeyLinkTransactionBodyBuilder(linkedPublicKey, startEpoch, endEpoch, linkAction);
    }

    /**
     * Creates an instance of VotingKeyLinkTransactionBodyBuilder.
     *
     * @param linkedPublicKey Linked voting public key..
     * @param startEpoch Starting finalization epoch..
     * @param endEpoch Ending finalization epoch..
     * @param linkAction Account link action..
     * @return Instance of VotingKeyLinkTransactionBodyBuilder.
     */
    public static createVotingKeyLinkTransactionBodyBuilder(
        linkedPublicKey: VotingPublicKeyDto,
        startEpoch: FinalizationEpochDto,
        endEpoch: FinalizationEpochDto,
        linkAction: LinkActionDto,
    ): VotingKeyLinkTransactionBodyBuilder {
        return new VotingKeyLinkTransactionBodyBuilder(linkedPublicKey, startEpoch, endEpoch, linkAction);
    }

    /**
     * Gets Linked voting public key..
     *
     * @return Linked voting public key..
     */
    public getLinkedPublicKey(): VotingPublicKeyDto {
        return this.linkedPublicKey;
    }

    /**
     * Gets Starting finalization epoch..
     *
     * @return Starting finalization epoch..
     */
    public getStartEpoch(): FinalizationEpochDto {
        return this.startEpoch;
    }

    /**
     * Gets Ending finalization epoch..
     *
     * @return Ending finalization epoch..
     */
    public getEndEpoch(): FinalizationEpochDto {
        return this.endEpoch;
    }

    /**
     * Gets Account link action..
     *
     * @return Account link action..
     */
    public getLinkAction(): LinkActionDto {
        return this.linkAction;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.linkedPublicKey.getSize(); // linkedPublicKey
        size += this.startEpoch.getSize(); // startEpoch
        size += this.endEpoch.getSize(); // endEpoch
        size += 1; // linkAction
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const linkedPublicKeyBytes = this.linkedPublicKey.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        const startEpochBytes = this.startEpoch.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, startEpochBytes);
        const endEpochBytes = this.endEpoch.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, endEpochBytes);
        const linkActionBytes = GeneratorUtils.uint8ToBuffer(this.linkAction);
        newArray = GeneratorUtils.concatTypedArrays(newArray, linkActionBytes);
        return newArray;
    }
}
