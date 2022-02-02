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
import { MosaicIdDto } from './MosaicIdDto';
import { MosaicRestrictionTypeDto } from './MosaicRestrictionTypeDto';
import { Serializer } from './Serializer';

/**
 * Binary layout of restriction rule being applied
 **/
export class RestrictionRuleBuilder implements Serializer {
    /** Identifier of the mosaic providing the restriction key. **/
    readonly referenceMosaicId: MosaicIdDto;

    /** Restriction value. **/
    readonly restrictionValue: number[];

    /** Restriction type. **/
    readonly restrictionType: MosaicRestrictionTypeDto;

    /**
     * Constructor.
     *
     * @param referenceMosaicId Identifier of the mosaic providing the restriction key.
     * @param restrictionValue Restriction value.
     * @param restrictionType Restriction type.
     */
    public constructor(referenceMosaicId: MosaicIdDto, restrictionValue: number[], restrictionType: MosaicRestrictionTypeDto) {
        GeneratorUtils.notNull(referenceMosaicId, 'referenceMosaicId is null or undefined');
        GeneratorUtils.notNull(restrictionValue, 'restrictionValue is null or undefined');
        GeneratorUtils.notNull(restrictionType, 'restrictionType is null or undefined');
        this.referenceMosaicId = referenceMosaicId;
        this.restrictionValue = restrictionValue;
        this.restrictionType = restrictionType;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): RestrictionRuleBuilder {
        const byteArray = Array.from(payload);
        const referenceMosaicId: MosaicIdDto = MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, referenceMosaicId.getSize());
        const restrictionValue: number[] = GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictionType: MosaicRestrictionTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new RestrictionRuleBuilder(referenceMosaicId, restrictionValue, restrictionType);
    }

    /**
     * Creates an instance of RestrictionRuleBuilder.
     *
     * @param referenceMosaicId Identifier of the mosaic providing the restriction key.
     * @param restrictionValue Restriction value.
     * @param restrictionType Restriction type.
     * @return Instance of RestrictionRuleBuilder.
     */
    public static createRestrictionRuleBuilder(
        referenceMosaicId: MosaicIdDto,
        restrictionValue: number[],
        restrictionType: MosaicRestrictionTypeDto,
    ): RestrictionRuleBuilder {
        return new RestrictionRuleBuilder(referenceMosaicId, restrictionValue, restrictionType);
    }

    /**
     * Gets identifier of the mosaic providing the restriction key.
     *
     * @return Identifier of the mosaic providing the restriction key.
     */
    public getReferenceMosaicId(): MosaicIdDto {
        return this.referenceMosaicId;
    }

    /**
     * Gets restriction value.
     *
     * @return Restriction value.
     */
    public getRestrictionValue(): number[] {
        return this.restrictionValue;
    }

    /**
     * Gets restriction type.
     *
     * @return Restriction type.
     */
    public getRestrictionType(): MosaicRestrictionTypeDto {
        return this.restrictionType;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.referenceMosaicId.getSize(); // referenceMosaicId
        size += 8; // restrictionValue
        size += 1; // restrictionType
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const referenceMosaicIdBytes = this.referenceMosaicId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, referenceMosaicIdBytes);
        const restrictionValueBytes = GeneratorUtils.uint64ToBuffer(this.getRestrictionValue());
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionValueBytes);
        const restrictionTypeBytes = GeneratorUtils.uint8ToBuffer(this.restrictionType);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionTypeBytes);
        return newArray;
    }
}
