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

import { AddressAliasTransactionBodyBuilder } from './AddressAliasTransactionBodyBuilder';
import { AddressDto } from './AddressDto';
import { AliasActionDto } from './AliasActionDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';

/**
 * Embedded version of AddressAliasTransaction.
 **/
export class EmbeddedAddressAliasTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Address alias transaction body. **/
    readonly addressAliasTransactionBody: AddressAliasTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param namespaceId Identifier of the namespace that will become (or stop being) an alias for the address..
     * @param address Aliased address..
     * @param aliasAction Alias action..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        namespaceId: NamespaceIdDto,
        address: AddressDto,
        aliasAction: AliasActionDto,
    ) {
        super(signerPublicKey, version, network, type);
        this.addressAliasTransactionBody = new AddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedAddressAliasTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const addressAliasTransactionBody: AddressAliasTransactionBodyBuilder = AddressAliasTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, addressAliasTransactionBody.getSize());
        return new EmbeddedAddressAliasTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            addressAliasTransactionBody.namespaceId,
            addressAliasTransactionBody.address,
            addressAliasTransactionBody.aliasAction,
        );
    }

    /**
     * Creates an instance of EmbeddedAddressAliasTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param namespaceId Identifier of the namespace that will become (or stop being) an alias for the address..
     * @param address Aliased address..
     * @param aliasAction Alias action..
     * @return Instance of EmbeddedAddressAliasTransactionBuilder.
     */
    public static createEmbeddedAddressAliasTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        namespaceId: NamespaceIdDto,
        address: AddressDto,
        aliasAction: AliasActionDto,
    ): EmbeddedAddressAliasTransactionBuilder {
        return new EmbeddedAddressAliasTransactionBuilder(signerPublicKey, version, network, type, namespaceId, address, aliasAction);
    }

    /**
     * Gets Identifier of the namespace that will become (or stop being) an alias for the address..
     *
     * @return Identifier of the namespace that will become (or stop being) an alias for the address..
     */
    public getNamespaceId(): NamespaceIdDto {
        return this.addressAliasTransactionBody.getNamespaceId();
    }

    /**
     * Gets Aliased address..
     *
     * @return Aliased address..
     */
    public getAddress(): AddressDto {
        return this.addressAliasTransactionBody.getAddress();
    }

    /**
     * Gets Alias action..
     *
     * @return Alias action..
     */
    public getAliasAction(): AliasActionDto {
        return this.addressAliasTransactionBody.getAliasAction();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.addressAliasTransactionBody.getSize(); // addressAliasTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): AddressAliasTransactionBodyBuilder {
        return this.addressAliasTransactionBody;
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
        const addressAliasTransactionBodyBytes = this.addressAliasTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressAliasTransactionBodyBytes);
        return newArray;
    }
}
