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
import { MosaicBuilder } from './MosaicBuilder';
import { ReceiptBuilder } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';

/**
 * Network currency mosaics were created due to [inflation](/concepts/inflation).
 **/
export class InflationReceiptBuilder extends ReceiptBuilder implements Serializer {
    /** Created mosaic.. **/
    readonly mosaic: MosaicBuilder;

    /**
     * Constructor.
     *
     * @param version Receipt version..
     * @param type Type of receipt..
     * @param mosaic Created mosaic..
     */
    public constructor(version: number, type: ReceiptTypeDto, mosaic: MosaicBuilder) {
        super(version, type);
        GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        this.mosaic = mosaic;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): InflationReceiptBuilder {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaic: MosaicBuilder = MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        return new InflationReceiptBuilder(superObject.version, superObject.type, mosaic);
    }

    /**
     * Creates an instance of InflationReceiptBuilder.
     *
     * @param version Receipt version..
     * @param type Type of receipt..
     * @param mosaic Created mosaic..
     * @return Instance of InflationReceiptBuilder.
     */
    public static createInflationReceiptBuilder(version: number, type: ReceiptTypeDto, mosaic: MosaicBuilder): InflationReceiptBuilder {
        return new InflationReceiptBuilder(version, type, mosaic);
    }

    /**
     * Gets Created mosaic..
     *
     * @return Created mosaic..
     */
    public getMosaic(): MosaicBuilder {
        return this.mosaic;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.mosaic.getSize(); // mosaic
        return size;
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
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        return newArray;
    }
}
