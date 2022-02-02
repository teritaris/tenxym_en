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
import { Serializer } from './Serializer';

/** A PublicKey used for voting during the [finalization process](/concepts/block.html#finalization).. */
export class VotingPublicKeyDto implements Serializer {
    /** A PublicKey used for voting during the [finalization process](/concepts/block.html#finalization).. */
    readonly votingPublicKey: Uint8Array;

    /**
     * Constructor.
     *
     * @param votingPublicKey A PublicKey used for voting during the [finalization process](/concepts/block.html#finalization)..
     */
    constructor(votingPublicKey: Uint8Array) {
        this.votingPublicKey = votingPublicKey;
    }

    /**
     * Creates an instance of VotingPublicKeyDto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of VotingPublicKeyDto.
     */
    public static loadFromBinary(payload: Uint8Array): VotingPublicKeyDto {
        const votingPublicKey = GeneratorUtils.getBytes(Uint8Array.from(payload), 32);
        return new VotingPublicKeyDto(votingPublicKey);
    }

    /**
     * Gets A PublicKey used for voting during the [finalization process](/concepts/block.html#finalization)..
     *
     * @return A PublicKey used for voting during the [finalization process](/concepts/block.html#finalization)..
     */
    public getVotingPublicKey(): Uint8Array {
        return this.votingPublicKey;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        return 32;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        return this.getVotingPublicKey();
    }
}
