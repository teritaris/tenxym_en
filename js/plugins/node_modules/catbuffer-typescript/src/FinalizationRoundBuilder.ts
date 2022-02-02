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
import { FinalizationPointDto } from './FinalizationPointDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';

/**
 * Binary layout for finalization round
 **/
export class FinalizationRoundBuilder implements Serializer {
    /** Finalization epoch. **/
    readonly epoch: FinalizationEpochDto;

    /** Finalization point. **/
    readonly point: FinalizationPointDto;

    /**
     * Constructor.
     *
     * @param epoch Finalization epoch.
     * @param point Finalization point.
     */
    public constructor(epoch: FinalizationEpochDto, point: FinalizationPointDto) {
        GeneratorUtils.notNull(epoch, 'epoch is null or undefined');
        GeneratorUtils.notNull(point, 'point is null or undefined');
        this.epoch = epoch;
        this.point = point;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): FinalizationRoundBuilder {
        const byteArray = Array.from(payload);
        const epoch: FinalizationEpochDto = FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, epoch.getSize());
        const point: FinalizationPointDto = FinalizationPointDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, point.getSize());
        return new FinalizationRoundBuilder(epoch, point);
    }

    /**
     * Creates an instance of FinalizationRoundBuilder.
     *
     * @param epoch Finalization epoch.
     * @param point Finalization point.
     * @return Instance of FinalizationRoundBuilder.
     */
    public static createFinalizationRoundBuilder(epoch: FinalizationEpochDto, point: FinalizationPointDto): FinalizationRoundBuilder {
        return new FinalizationRoundBuilder(epoch, point);
    }

    /**
     * Gets finalization epoch.
     *
     * @return Finalization epoch.
     */
    public getEpoch(): FinalizationEpochDto {
        return this.epoch;
    }

    /**
     * Gets finalization point.
     *
     * @return Finalization point.
     */
    public getPoint(): FinalizationPointDto {
        return this.point;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.epoch.getSize(); // epoch
        size += this.point.getSize(); // point
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const epochBytes = this.epoch.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, epochBytes);
        const pointBytes = this.point.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, pointBytes);
        return newArray;
    }
}
