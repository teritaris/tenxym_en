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

import { AddressDto } from './AddressDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';

/**
 * Binary layout for address based account restriction
 **/
export class AccountRestrictionAddressValueBuilder implements Serializer {
    /** Restriction values. **/
    readonly restrictionValues: AddressDto[];

    /**
     * Constructor.
     *
     * @param restrictionValues Restriction values.
     */
    public constructor(restrictionValues: AddressDto[]) {
        GeneratorUtils.notNull(restrictionValues, 'restrictionValues is null or undefined');
        this.restrictionValues = restrictionValues;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AccountRestrictionAddressValueBuilder {
        const byteArray = Array.from(payload);
        const restrictionValuesCount: number[] = GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictionValues: AddressDto[] = GeneratorUtils.loadFromBinary(
            AddressDto.loadFromBinary,
            Uint8Array.from(byteArray),
            restrictionValuesCount,
        );
        byteArray.splice(
            0,
            restrictionValues.reduce((sum, c) => sum + c.getSize(), 0),
        );
        return new AccountRestrictionAddressValueBuilder(restrictionValues);
    }

    /**
     * Creates an instance of AccountRestrictionAddressValueBuilder.
     *
     * @param restrictionValues Restriction values.
     * @return Instance of AccountRestrictionAddressValueBuilder.
     */
    public static createAccountRestrictionAddressValueBuilder(restrictionValues: AddressDto[]): AccountRestrictionAddressValueBuilder {
        return new AccountRestrictionAddressValueBuilder(restrictionValues);
    }

    /**
     * Gets restriction values.
     *
     * @return Restriction values.
     */
    public getRestrictionValues(): AddressDto[] {
        return this.restrictionValues;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += 8; // restrictionValuesCount
        size += this.restrictionValues.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0); // restrictionValues
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const restrictionValuesCountBytes = GeneratorUtils.uint64ToBuffer(this.restrictionValues.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionValuesCountBytes);
        const restrictionValuesBytes = GeneratorUtils.writeList(this.restrictionValues, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionValuesBytes);
        return newArray;
    }
}
