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
import { TransactionTypeDto } from './TransactionTypeDto';

/**
 * Binary layout for transaction type based account restriction
 **/
export class AccountRestrictionTransactionTypeValueBuilder implements Serializer {
    /** Restriction values. **/
    readonly restrictionValues: TransactionTypeDto[];

    /**
     * Constructor.
     *
     * @param restrictionValues Restriction values.
     */
    public constructor(restrictionValues: TransactionTypeDto[]) {
        GeneratorUtils.notNull(restrictionValues, 'restrictionValues is null or undefined');
        this.restrictionValues = restrictionValues;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AccountRestrictionTransactionTypeValueBuilder {
        const byteArray = Array.from(payload);
        const restrictionValuesCount: number[] = GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictionValues: TransactionTypeDto[] = GeneratorUtils.loadFromBinaryEnums(
            Uint8Array.from(byteArray),
            restrictionValuesCount,
            2,
        );
        byteArray.splice(
            0,
            restrictionValues.reduce((sum) => sum + 2, 0),
        );
        return new AccountRestrictionTransactionTypeValueBuilder(restrictionValues);
    }

    /**
     * Creates an instance of AccountRestrictionTransactionTypeValueBuilder.
     *
     * @param restrictionValues Restriction values.
     * @return Instance of AccountRestrictionTransactionTypeValueBuilder.
     */
    public static createAccountRestrictionTransactionTypeValueBuilder(
        restrictionValues: TransactionTypeDto[],
    ): AccountRestrictionTransactionTypeValueBuilder {
        return new AccountRestrictionTransactionTypeValueBuilder(restrictionValues);
    }

    /**
     * Gets restriction values.
     *
     * @return Restriction values.
     */
    public getRestrictionValues(): TransactionTypeDto[] {
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
        size += this.restrictionValues.reduce((sum) => sum + 2, 0);
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
        const restrictionValuesBytes = GeneratorUtils.writeListEnum(this.restrictionValues, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionValuesBytes);
        return newArray;
    }
}
