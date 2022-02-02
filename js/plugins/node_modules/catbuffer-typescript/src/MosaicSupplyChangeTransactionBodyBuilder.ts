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

import { AmountDto } from './AmountDto';
import { GeneratorUtils } from './GeneratorUtils';
import { MosaicSupplyChangeActionDto } from './MosaicSupplyChangeActionDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 * Shared content between MosaicSupplyChangeTransaction and EmbeddedMosaicSupplyChangeTransaction.
 **/
export class MosaicSupplyChangeTransactionBodyBuilder implements Serializer {
    /** Affected mosaic identifier.. **/
    readonly mosaicId: UnresolvedMosaicIdDto;

    /** Change amount. It cannot be negative, use the `action` field to indicate if this amount should be **added** or **subtracted** from the current supply.. **/
    readonly delta: AmountDto;

    /** Supply change action.. **/
    readonly action: MosaicSupplyChangeActionDto;

    /**
     * Constructor.
     *
     * @param mosaicId Affected mosaic identifier..
     * @param delta Change amount. It cannot be negative, use the `action` field to indicate if this amount should be **added** or **subtracted** from the current supply..
     * @param action Supply change action..
     */
    public constructor(mosaicId: UnresolvedMosaicIdDto, delta: AmountDto, action: MosaicSupplyChangeActionDto) {
        GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils.notNull(delta, 'delta is null or undefined');
        GeneratorUtils.notNull(action, 'action is null or undefined');
        this.mosaicId = mosaicId;
        this.delta = delta;
        this.action = action;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicSupplyChangeTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const mosaicId: UnresolvedMosaicIdDto = UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const delta: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, delta.getSize());
        const action: MosaicSupplyChangeActionDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action);
    }

    /**
     * Creates an instance of MosaicSupplyChangeTransactionBodyBuilder.
     *
     * @param mosaicId Affected mosaic identifier..
     * @param delta Change amount. It cannot be negative, use the `action` field to indicate if this amount should be **added** or **subtracted** from the current supply..
     * @param action Supply change action..
     * @return Instance of MosaicSupplyChangeTransactionBodyBuilder.
     */
    public static createMosaicSupplyChangeTransactionBodyBuilder(
        mosaicId: UnresolvedMosaicIdDto,
        delta: AmountDto,
        action: MosaicSupplyChangeActionDto,
    ): MosaicSupplyChangeTransactionBodyBuilder {
        return new MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action);
    }

    /**
     * Gets Affected mosaic identifier..
     *
     * @return Affected mosaic identifier..
     */
    public getMosaicId(): UnresolvedMosaicIdDto {
        return this.mosaicId;
    }

    /**
     * Gets Change amount. It cannot be negative, use the `action` field to indicate if this amount should be **added** or **subtracted** from the current supply..
     *
     * @return Change amount. It cannot be negative, use the `action` field to indicate if this amount should be **added** or **subtracted** from the current supply..
     */
    public getDelta(): AmountDto {
        return this.delta;
    }

    /**
     * Gets Supply change action..
     *
     * @return Supply change action..
     */
    public getAction(): MosaicSupplyChangeActionDto {
        return this.action;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.mosaicId.getSize(); // mosaicId
        size += this.delta.getSize(); // delta
        size += 1; // action
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const deltaBytes = this.delta.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, deltaBytes);
        const actionBytes = GeneratorUtils.uint8ToBuffer(this.action);
        newArray = GeneratorUtils.concatTypedArrays(newArray, actionBytes);
        return newArray;
    }
}
