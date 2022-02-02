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

import { BlockDurationDto } from './BlockDurationDto';
import { GeneratorUtils } from './GeneratorUtils';
import { MosaicFlagsDto } from './MosaicFlagsDto';
import { MosaicIdDto } from './MosaicIdDto';
import { MosaicNonceDto } from './MosaicNonceDto';
import { Serializer } from './Serializer';

/**
 * Shared content between MosaicDefinitionTransaction and Embedded MosaicDefinitionTransaction.
 **/
export class MosaicDefinitionTransactionBodyBuilder implements Serializer {
    /** Unique mosaic identifier obtained from the generator account's public key and the `nonce`.
The SDK's can take care of generating this ID for you.. **/
    readonly id: MosaicIdDto;

    /** Mosaic duration expressed in blocks. If set to 0, the mosaic never expires.. **/
    readonly duration: BlockDurationDto;

    /** Random nonce used to generate the mosaic id.. **/
    readonly nonce: MosaicNonceDto;

    /** Mosaic flags.. **/
    readonly flags: MosaicFlagsDto[];

    /** Mosaic divisibility.. **/
    readonly divisibility: number;

    /**
    * Constructor.
    *
    * @param id Unique mosaic identifier obtained from the generator account's public key and the `nonce`.
The SDK's can take care of generating this ID for you..
    * @param duration Mosaic duration expressed in blocks. If set to 0, the mosaic never expires..
    * @param nonce Random nonce used to generate the mosaic id..
    * @param flags Mosaic flags..
    * @param divisibility Mosaic divisibility..
    */
    public constructor(id: MosaicIdDto, duration: BlockDurationDto, nonce: MosaicNonceDto, flags: MosaicFlagsDto[], divisibility: number) {
        GeneratorUtils.notNull(id, 'id is null or undefined');
        GeneratorUtils.notNull(duration, 'duration is null or undefined');
        GeneratorUtils.notNull(nonce, 'nonce is null or undefined');
        GeneratorUtils.notNull(flags, 'flags is null or undefined');
        GeneratorUtils.notNull(divisibility, 'divisibility is null or undefined');
        this.id = id;
        this.duration = duration;
        this.nonce = nonce;
        this.flags = flags;
        this.divisibility = divisibility;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicDefinitionTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const id: MosaicIdDto = MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, id.getSize());
        const duration: BlockDurationDto = BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.getSize());
        const nonce: MosaicNonceDto = MosaicNonceDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, nonce.getSize());
        const flags: MosaicFlagsDto[] = GeneratorUtils.toFlags(MosaicFlagsDto, GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray)));
        byteArray.splice(0, 1);
        const divisibility: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
    }

    /**
     * Creates an instance of MosaicDefinitionTransactionBodyBuilder.
     *
     * @param id Unique mosaic identifier obtained from the generator account's public key and the `nonce`.
The SDK's can take care of generating this ID for you..
     * @param duration Mosaic duration expressed in blocks. If set to 0, the mosaic never expires..
     * @param nonce Random nonce used to generate the mosaic id..
     * @param flags Mosaic flags..
     * @param divisibility Mosaic divisibility..
     * @return Instance of MosaicDefinitionTransactionBodyBuilder.
     */
    public static createMosaicDefinitionTransactionBodyBuilder(
        id: MosaicIdDto,
        duration: BlockDurationDto,
        nonce: MosaicNonceDto,
        flags: MosaicFlagsDto[],
        divisibility: number,
    ): MosaicDefinitionTransactionBodyBuilder {
        return new MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
    }

    /**
     * Gets Unique mosaic identifier obtained from the generator account's public key and the `nonce`.
The SDK's can take care of generating this ID for you..
     *
     * @return Unique mosaic identifier obtained from the generator account's public key and the `nonce`.
The SDK's can take care of generating this ID for you..
     */
    public getId(): MosaicIdDto {
        return this.id;
    }

    /**
     * Gets Mosaic duration expressed in blocks. If set to 0, the mosaic never expires..
     *
     * @return Mosaic duration expressed in blocks. If set to 0, the mosaic never expires..
     */
    public getDuration(): BlockDurationDto {
        return this.duration;
    }

    /**
     * Gets Random nonce used to generate the mosaic id..
     *
     * @return Random nonce used to generate the mosaic id..
     */
    public getNonce(): MosaicNonceDto {
        return this.nonce;
    }

    /**
     * Gets Mosaic flags..
     *
     * @return Mosaic flags..
     */
    public getFlags(): MosaicFlagsDto[] {
        return this.flags;
    }

    /**
     * Gets Mosaic divisibility..
     *
     * @return Mosaic divisibility..
     */
    public getDivisibility(): number {
        return this.divisibility;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.id.getSize(); // id
        size += this.duration.getSize(); // duration
        size += this.nonce.getSize(); // nonce
        size += 1; // flags
        size += 1; // divisibility
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const idBytes = this.id.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, idBytes);
        const durationBytes = this.duration.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        const nonceBytes = this.nonce.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, nonceBytes);
        const flagsBytes = GeneratorUtils.uint8ToBuffer(GeneratorUtils.fromFlags(MosaicFlagsDto, this.flags));
        newArray = GeneratorUtils.concatTypedArrays(newArray, flagsBytes);
        const divisibilityBytes = GeneratorUtils.uint8ToBuffer(this.getDivisibility());
        newArray = GeneratorUtils.concatTypedArrays(newArray, divisibilityBytes);
        return newArray;
    }
}
