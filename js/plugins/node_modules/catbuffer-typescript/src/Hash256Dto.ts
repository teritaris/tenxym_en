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

/** A 32-byte (256 bit) hash.
The exact algorithm is unspecified as it can change depending on where it is used.. */
export class Hash256Dto implements Serializer {
    /** A 32-byte (256 bit) hash.
The exact algorithm is unspecified as it can change depending on where it is used.. */
    readonly hash256: Uint8Array;

    /**
     * Constructor.
     *
     * @param hash256 A 32-byte (256 bit) hash.
The exact algorithm is unspecified as it can change depending on where it is used..
     */
    constructor(hash256: Uint8Array) {
        this.hash256 = hash256;
    }

    /**
     * Creates an instance of Hash256Dto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of Hash256Dto.
     */
    public static loadFromBinary(payload: Uint8Array): Hash256Dto {
        const hash256 = GeneratorUtils.getBytes(Uint8Array.from(payload), 32);
        return new Hash256Dto(hash256);
    }

    /**
     * Gets A 32-byte (256 bit) hash.
The exact algorithm is unspecified as it can change depending on where it is used..
     *
     * @return A 32-byte (256 bit) hash.
The exact algorithm is unspecified as it can change depending on where it is used..
     */
    public getHash256(): Uint8Array {
        return this.hash256;
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
        return this.getHash256();
    }
}
