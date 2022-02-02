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

/** How hard it was to harvest this block.
The initial value is 1e14 and it will remain like this as long as blocks are generated every `blockGenerationTargetTime` seconds ([network property](/guides/network/configuring-network-properties.html)).
If blocks start taking more or less time than the configured value, the difficulty will be adjusted (in the range of 1e13 to 1e15) to try to hit the target time.
See the [Technical Reference](/symbol-technicalref/main.pdf) section 8.1.. */
export class DifficultyDto implements Serializer {
    /** How hard it was to harvest this block.
The initial value is 1e14 and it will remain like this as long as blocks are generated every `blockGenerationTargetTime` seconds ([network property](/guides/network/configuring-network-properties.html)).
If blocks start taking more or less time than the configured value, the difficulty will be adjusted (in the range of 1e13 to 1e15) to try to hit the target time.
See the [Technical Reference](/symbol-technicalref/main.pdf) section 8.1.. */
    readonly difficulty: number[];

    /**
     * Constructor.
     *
     * @param difficulty How hard it was to harvest this block.
The initial value is 1e14 and it will remain like this as long as blocks are generated every `blockGenerationTargetTime` seconds ([network property](/guides/network/configuring-network-properties.html)).
If blocks start taking more or less time than the configured value, the difficulty will be adjusted (in the range of 1e13 to 1e15) to try to hit the target time.
See the [Technical Reference](/symbol-technicalref/main.pdf) section 8.1..
     */
    constructor(difficulty: number[]) {
        this.difficulty = difficulty;
    }

    /**
     * Creates an instance of DifficultyDto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of DifficultyDto.
     */
    public static loadFromBinary(payload: Uint8Array): DifficultyDto {
        const difficulty = GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new DifficultyDto(difficulty);
    }

    /**
     * Gets How hard it was to harvest this block.
The initial value is 1e14 and it will remain like this as long as blocks are generated every `blockGenerationTargetTime` seconds ([network property](/guides/network/configuring-network-properties.html)).
If blocks start taking more or less time than the configured value, the difficulty will be adjusted (in the range of 1e13 to 1e15) to try to hit the target time.
See the [Technical Reference](/symbol-technicalref/main.pdf) section 8.1..
     *
     * @return How hard it was to harvest this block.
The initial value is 1e14 and it will remain like this as long as blocks are generated every `blockGenerationTargetTime` seconds ([network property](/guides/network/configuring-network-properties.html)).
If blocks start taking more or less time than the configured value, the difficulty will be adjusted (in the range of 1e13 to 1e15) to try to hit the target time.
See the [Technical Reference](/symbol-technicalref/main.pdf) section 8.1..
     */
    public getDifficulty(): number[] {
        return this.difficulty;
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
        return GeneratorUtils.uint64ToBuffer(this.getDifficulty());
    }
}
