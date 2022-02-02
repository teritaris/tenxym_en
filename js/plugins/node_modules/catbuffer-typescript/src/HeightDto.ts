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

/** Index of a block in the blockchain.
The first block (the [Nemesis](/concepts/block.html#block-creation) block) has height 1 and each subsequent block increases height by 1.. */
export class HeightDto implements Serializer {
    /** Index of a block in the blockchain.
The first block (the [Nemesis](/concepts/block.html#block-creation) block) has height 1 and each subsequent block increases height by 1.. */
    readonly height: number[];

    /**
     * Constructor.
     *
     * @param height Index of a block in the blockchain.
The first block (the [Nemesis](/concepts/block.html#block-creation) block) has height 1 and each subsequent block increases height by 1..
     */
    constructor(height: number[]) {
        this.height = height;
    }

    /**
     * Creates an instance of HeightDto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of HeightDto.
     */
    public static loadFromBinary(payload: Uint8Array): HeightDto {
        const height = GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new HeightDto(height);
    }

    /**
     * Gets Index of a block in the blockchain.
The first block (the [Nemesis](/concepts/block.html#block-creation) block) has height 1 and each subsequent block increases height by 1..
     *
     * @return Index of a block in the blockchain.
The first block (the [Nemesis](/concepts/block.html#block-creation) block) has height 1 and each subsequent block increases height by 1..
     */
    public getHeight(): number[] {
        return this.height;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        return 8;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        return GeneratorUtils.uint64ToBuffer(this.getHeight());
    }
}
