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
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';

/**
 * Receipts provide proof for every state change not retrievable from the block.
 **/
export class ReceiptBuilder implements Serializer {
    /** Receipt version.. **/
    readonly version: number;

    /** Type of receipt.. **/
    readonly type: ReceiptTypeDto;

    /**
     * Constructor.
     *
     * @param version Receipt version..
     * @param type Type of receipt..
     */
    public constructor(version: number, type: ReceiptTypeDto) {
        GeneratorUtils.notNull(version, 'version is null or undefined');
        GeneratorUtils.notNull(type, 'type is null or undefined');
        this.version = version;
        this.type = type;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): ReceiptBuilder {
        const byteArray = Array.from(payload);
        const size: number = GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version: number = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const type: ReceiptTypeDto = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        return new ReceiptBuilder(version, type);
    }

    /**
     * Creates an instance of ReceiptBuilder.
     *
     * @param version Receipt version..
     * @param type Type of receipt..
     * @return Instance of ReceiptBuilder.
     */
    public static createReceiptBuilder(version: number, type: ReceiptTypeDto): ReceiptBuilder {
        return new ReceiptBuilder(version, type);
    }

    /**
     * Gets Receipt version..
     *
     * @return Receipt version..
     */
    public getVersion(): number {
        return this.version;
    }

    /**
     * Gets Type of receipt..
     *
     * @return Type of receipt..
     */
    public getType(): ReceiptTypeDto {
        return this.type;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += 4; // size
        size += 2; // version
        size += 2; // type
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const sizeBytes = Uint8Array.from([]); // Ignored serialization: size AttributeKind.SIMPLE
        newArray = GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        const versionBytes = GeneratorUtils.uint16ToBuffer(this.getVersion());
        newArray = GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        const typeBytes = GeneratorUtils.uint16ToBuffer(this.type);
        newArray = GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        return newArray;
    }
}
