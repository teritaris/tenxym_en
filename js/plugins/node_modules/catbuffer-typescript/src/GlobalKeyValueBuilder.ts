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
import { MosaicRestrictionKeyDto } from './MosaicRestrictionKeyDto';
import { RestrictionRuleBuilder } from './RestrictionRuleBuilder';
import { Serializer } from './Serializer';

/**
 * Binary layout for a global key-value
 **/
export class GlobalKeyValueBuilder implements Serializer {
    /** Key associated with a restriction rule. **/
    readonly key: MosaicRestrictionKeyDto;

    /** Restriction rule (the value) associated with a key. **/
    readonly restrictionRule: RestrictionRuleBuilder;

    /**
     * Constructor.
     *
     * @param key Key associated with a restriction rule.
     * @param restrictionRule Restriction rule (the value) associated with a key.
     */
    public constructor(key: MosaicRestrictionKeyDto, restrictionRule: RestrictionRuleBuilder) {
        GeneratorUtils.notNull(key, 'key is null or undefined');
        GeneratorUtils.notNull(restrictionRule, 'restrictionRule is null or undefined');
        this.key = key;
        this.restrictionRule = restrictionRule;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): GlobalKeyValueBuilder {
        const byteArray = Array.from(payload);
        const key: MosaicRestrictionKeyDto = MosaicRestrictionKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, key.getSize());
        const restrictionRule: RestrictionRuleBuilder = RestrictionRuleBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, restrictionRule.getSize());
        return new GlobalKeyValueBuilder(key, restrictionRule);
    }

    /**
     * Creates an instance of GlobalKeyValueBuilder.
     *
     * @param key Key associated with a restriction rule.
     * @param restrictionRule Restriction rule (the value) associated with a key.
     * @return Instance of GlobalKeyValueBuilder.
     */
    public static createGlobalKeyValueBuilder(
        key: MosaicRestrictionKeyDto,
        restrictionRule: RestrictionRuleBuilder,
    ): GlobalKeyValueBuilder {
        return new GlobalKeyValueBuilder(key, restrictionRule);
    }

    /**
     * Gets key associated with a restriction rule.
     *
     * @return Key associated with a restriction rule.
     */
    public getKey(): MosaicRestrictionKeyDto {
        return this.key;
    }

    /**
     * Gets restriction rule (the value) associated with a key.
     *
     * @return Restriction rule (the value) associated with a key.
     */
    public getRestrictionRule(): RestrictionRuleBuilder {
        return this.restrictionRule;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.key.getSize(); // key
        size += this.restrictionRule.getSize(); // restrictionRule
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const keyBytes = this.key.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, keyBytes);
        const restrictionRuleBytes = this.restrictionRule.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionRuleBytes);
        return newArray;
    }
}
