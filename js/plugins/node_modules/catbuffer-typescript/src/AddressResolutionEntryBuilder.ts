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
import { ReceiptSourceBuilder } from './ReceiptSourceBuilder';
import { Serializer } from './Serializer';

/**
 * Actual Address behind a NamespaceId at the time a transaction was confirmed.
 **/
export class AddressResolutionEntryBuilder implements Serializer {
    /** Information about the transaction that triggered the receipt.. **/
    readonly source: ReceiptSourceBuilder;

    /** Resolved Address.. **/
    readonly resolved: AddressDto;

    /**
     * Constructor.
     *
     * @param source Information about the transaction that triggered the receipt..
     * @param resolved Resolved Address..
     */
    public constructor(source: ReceiptSourceBuilder, resolved: AddressDto) {
        GeneratorUtils.notNull(source, 'source is null or undefined');
        GeneratorUtils.notNull(resolved, 'resolved is null or undefined');
        this.source = source;
        this.resolved = resolved;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AddressResolutionEntryBuilder {
        const byteArray = Array.from(payload);
        const source: ReceiptSourceBuilder = ReceiptSourceBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, source.getSize());
        const resolved: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, resolved.getSize());
        return new AddressResolutionEntryBuilder(source, resolved);
    }

    /**
     * Creates an instance of AddressResolutionEntryBuilder.
     *
     * @param source Information about the transaction that triggered the receipt..
     * @param resolved Resolved Address..
     * @return Instance of AddressResolutionEntryBuilder.
     */
    public static createAddressResolutionEntryBuilder(source: ReceiptSourceBuilder, resolved: AddressDto): AddressResolutionEntryBuilder {
        return new AddressResolutionEntryBuilder(source, resolved);
    }

    /**
     * Gets Information about the transaction that triggered the receipt..
     *
     * @return Information about the transaction that triggered the receipt..
     */
    public getSource(): ReceiptSourceBuilder {
        return this.source;
    }

    /**
     * Gets Resolved Address..
     *
     * @return Resolved Address..
     */
    public getResolved(): AddressDto {
        return this.resolved;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.source.getSize(); // source
        size += this.resolved.getSize(); // resolved
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const sourceBytes = this.source.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, sourceBytes);
        const resolvedBytes = this.resolved.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, resolvedBytes);
        return newArray;
    }
}
