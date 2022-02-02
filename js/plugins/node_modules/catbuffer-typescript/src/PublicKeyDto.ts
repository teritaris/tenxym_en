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

/** A 32-byte (256 bit) integer derived from a private key.
It serves as the public identifier of the [key pair](/concepts/cryptography.html#key-pair) and can be disseminated widely. It is used to prove that an entity was signed with the paired private key.. */
export class PublicKeyDto implements Serializer {
    /** A 32-byte (256 bit) integer derived from a private key.
It serves as the public identifier of the [key pair](/concepts/cryptography.html#key-pair) and can be disseminated widely. It is used to prove that an entity was signed with the paired private key.. */
    readonly publicKey: Uint8Array;

    /**
     * Constructor.
     *
     * @param publicKey A 32-byte (256 bit) integer derived from a private key.
It serves as the public identifier of the [key pair](/concepts/cryptography.html#key-pair) and can be disseminated widely. It is used to prove that an entity was signed with the paired private key..
     */
    constructor(publicKey: Uint8Array) {
        this.publicKey = publicKey;
    }

    /**
     * Creates an instance of PublicKeyDto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of PublicKeyDto.
     */
    public static loadFromBinary(payload: Uint8Array): PublicKeyDto {
        const publicKey = GeneratorUtils.getBytes(Uint8Array.from(payload), 32);
        return new PublicKeyDto(publicKey);
    }

    /**
     * Gets A 32-byte (256 bit) integer derived from a private key.
It serves as the public identifier of the [key pair](/concepts/cryptography.html#key-pair) and can be disseminated widely. It is used to prove that an entity was signed with the paired private key..
     *
     * @return A 32-byte (256 bit) integer derived from a private key.
It serves as the public identifier of the [key pair](/concepts/cryptography.html#key-pair) and can be disseminated widely. It is used to prove that an entity was signed with the paired private key..
     */
    public getPublicKey(): Uint8Array {
        return this.publicKey;
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
        return this.getPublicKey();
    }
}
