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
import { AliasActionDto } from './AliasActionDto';
import { GeneratorUtils } from './GeneratorUtils';
import { NamespaceIdDto } from './NamespaceIdDto';
import { Serializer } from './Serializer';

/**
 * Shared content between AddressAliasTransaction and EmbeddedAddressAliasTransaction.
 **/
export class AddressAliasTransactionBodyBuilder implements Serializer {
    /** Identifier of the namespace that will become (or stop being) an alias for the address.. **/
    readonly namespaceId: NamespaceIdDto;

    /** Aliased address.. **/
    readonly address: AddressDto;

    /** Alias action.. **/
    readonly aliasAction: AliasActionDto;

    /**
     * Constructor.
     *
     * @param namespaceId Identifier of the namespace that will become (or stop being) an alias for the address..
     * @param address Aliased address..
     * @param aliasAction Alias action..
     */
    public constructor(namespaceId: NamespaceIdDto, address: AddressDto, aliasAction: AliasActionDto) {
        GeneratorUtils.notNull(namespaceId, 'namespaceId is null or undefined');
        GeneratorUtils.notNull(address, 'address is null or undefined');
        GeneratorUtils.notNull(aliasAction, 'aliasAction is null or undefined');
        this.namespaceId = namespaceId;
        this.address = address;
        this.aliasAction = aliasAction;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AddressAliasTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const namespaceId: NamespaceIdDto = NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceId.getSize());
        const address: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.getSize());
        const aliasAction: AliasActionDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new AddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction);
    }

    /**
     * Creates an instance of AddressAliasTransactionBodyBuilder.
     *
     * @param namespaceId Identifier of the namespace that will become (or stop being) an alias for the address..
     * @param address Aliased address..
     * @param aliasAction Alias action..
     * @return Instance of AddressAliasTransactionBodyBuilder.
     */
    public static createAddressAliasTransactionBodyBuilder(
        namespaceId: NamespaceIdDto,
        address: AddressDto,
        aliasAction: AliasActionDto,
    ): AddressAliasTransactionBodyBuilder {
        return new AddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction);
    }

    /**
     * Gets Identifier of the namespace that will become (or stop being) an alias for the address..
     *
     * @return Identifier of the namespace that will become (or stop being) an alias for the address..
     */
    public getNamespaceId(): NamespaceIdDto {
        return this.namespaceId;
    }

    /**
     * Gets Aliased address..
     *
     * @return Aliased address..
     */
    public getAddress(): AddressDto {
        return this.address;
    }

    /**
     * Gets Alias action..
     *
     * @return Alias action..
     */
    public getAliasAction(): AliasActionDto {
        return this.aliasAction;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.namespaceId.getSize(); // namespaceId
        size += this.address.getSize(); // address
        size += 1; // aliasAction
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const namespaceIdBytes = this.namespaceId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, namespaceIdBytes);
        const addressBytes = this.address.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        const aliasActionBytes = GeneratorUtils.uint8ToBuffer(this.aliasAction);
        newArray = GeneratorUtils.concatTypedArrays(newArray, aliasActionBytes);
        return newArray;
    }
}
