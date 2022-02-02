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
import { MosaicDefinitionBuilder } from './MosaicDefinitionBuilder';
import { MosaicIdDto } from './MosaicIdDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder } from './StateHeaderBuilder';

/**
 * Binary layout for mosaic entry
 **/
export class MosaicEntryBuilder extends StateHeaderBuilder implements Serializer {
    /** Entry id. **/
    readonly mosaicId: MosaicIdDto;

    /** Total supply amount. **/
    readonly supply: AmountDto;

    /** Definition comprised of entry properties. **/
    readonly definition: MosaicDefinitionBuilder;

    /**
     * Constructor.
     *
     * @param version Serialization version.
     * @param mosaicId Entry id.
     * @param supply Total supply amount.
     * @param definition Definition comprised of entry properties.
     */
    public constructor(version: number, mosaicId: MosaicIdDto, supply: AmountDto, definition: MosaicDefinitionBuilder) {
        super(version);
        GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils.notNull(supply, 'supply is null or undefined');
        GeneratorUtils.notNull(definition, 'definition is null or undefined');
        this.mosaicId = mosaicId;
        this.supply = supply;
        this.definition = definition;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicEntryBuilder {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicId: MosaicIdDto = MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const supply: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, supply.getSize());
        const definition: MosaicDefinitionBuilder = MosaicDefinitionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, definition.getSize());
        return new MosaicEntryBuilder(superObject.version, mosaicId, supply, definition);
    }

    /**
     * Creates an instance of MosaicEntryBuilder.
     *
     * @param version Serialization version.
     * @param mosaicId Entry id.
     * @param supply Total supply amount.
     * @param definition Definition comprised of entry properties.
     * @return Instance of MosaicEntryBuilder.
     */
    public static createMosaicEntryBuilder(
        version: number,
        mosaicId: MosaicIdDto,
        supply: AmountDto,
        definition: MosaicDefinitionBuilder,
    ): MosaicEntryBuilder {
        return new MosaicEntryBuilder(version, mosaicId, supply, definition);
    }

    /**
     * Gets entry id.
     *
     * @return Entry id.
     */
    public getMosaicId(): MosaicIdDto {
        return this.mosaicId;
    }

    /**
     * Gets total supply amount.
     *
     * @return Total supply amount.
     */
    public getSupply(): AmountDto {
        return this.supply;
    }

    /**
     * Gets definition comprised of entry properties.
     *
     * @return Definition comprised of entry properties.
     */
    public getDefinition(): MosaicDefinitionBuilder {
        return this.definition;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.mosaicId.getSize(); // mosaicId
        size += this.supply.getSize(); // supply
        size += this.definition.getSize(); // definition
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
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const supplyBytes = this.supply.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, supplyBytes);
        const definitionBytes = this.definition.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, definitionBytes);
        return newArray;
    }
}
