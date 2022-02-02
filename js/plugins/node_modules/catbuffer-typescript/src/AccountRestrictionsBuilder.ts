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

import { AccountRestrictionsInfoBuilder } from './AccountRestrictionsInfoBuilder';
import { AddressDto } from './AddressDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';
import { StateHeaderBuilder } from './StateHeaderBuilder';

/**
 * Binary layout for account restrictions
 **/
export class AccountRestrictionsBuilder extends StateHeaderBuilder implements Serializer {
    /** Address on which restrictions are placed. **/
    readonly address: AddressDto;

    /** Account restrictions. **/
    readonly restrictions: AccountRestrictionsInfoBuilder[];

    /**
     * Constructor.
     *
     * @param version Serialization version.
     * @param address Address on which restrictions are placed.
     * @param restrictions Account restrictions.
     */
    public constructor(version: number, address: AddressDto, restrictions: AccountRestrictionsInfoBuilder[]) {
        super(version);
        GeneratorUtils.notNull(address, 'address is null or undefined');
        GeneratorUtils.notNull(restrictions, 'restrictions is null or undefined');
        this.address = address;
        this.restrictions = restrictions;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AccountRestrictionsBuilder {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const address: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.getSize());
        const restrictionsCount: number[] = GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictions: AccountRestrictionsInfoBuilder[] = GeneratorUtils.loadFromBinary(
            AccountRestrictionsInfoBuilder.loadFromBinary,
            Uint8Array.from(byteArray),
            restrictionsCount,
        );
        byteArray.splice(
            0,
            restrictions.reduce((sum, c) => sum + c.getSize(), 0),
        );
        return new AccountRestrictionsBuilder(superObject.version, address, restrictions);
    }

    /**
     * Creates an instance of AccountRestrictionsBuilder.
     *
     * @param version Serialization version.
     * @param address Address on which restrictions are placed.
     * @param restrictions Account restrictions.
     * @return Instance of AccountRestrictionsBuilder.
     */
    public static createAccountRestrictionsBuilder(
        version: number,
        address: AddressDto,
        restrictions: AccountRestrictionsInfoBuilder[],
    ): AccountRestrictionsBuilder {
        return new AccountRestrictionsBuilder(version, address, restrictions);
    }

    /**
     * Gets address on which restrictions are placed.
     *
     * @return Address on which restrictions are placed.
     */
    public getAddress(): AddressDto {
        return this.address;
    }

    /**
     * Gets account restrictions.
     *
     * @return Account restrictions.
     */
    public getRestrictions(): AccountRestrictionsInfoBuilder[] {
        return this.restrictions;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.address.getSize(); // address
        size += 8; // restrictionsCount
        size += this.restrictions.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0); // restrictions
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
        const addressBytes = this.address.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        const restrictionsCountBytes = GeneratorUtils.uint64ToBuffer(this.restrictions.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionsCountBytes);
        const restrictionsBytes = GeneratorUtils.writeList(this.restrictions, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionsBytes);
        return newArray;
    }
}
