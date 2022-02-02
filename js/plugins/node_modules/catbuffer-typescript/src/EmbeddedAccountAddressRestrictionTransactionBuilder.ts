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

import { AccountAddressRestrictionTransactionBodyBuilder } from './AccountAddressRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
 * Embedded version of AccountAddressRestrictionTransaction.
 **/
export class EmbeddedAccountAddressRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Account address restriction transaction body. **/
    readonly accountAddressRestrictionTransactionBody: AccountAddressRestrictionTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param restrictionFlags Type of restriction being applied to the listed addresses..
     * @param restrictionAdditions Array of account addresses being added to the restricted list..
     * @param restrictionDeletions Array of account addresses being removed from the restricted list..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: UnresolvedAddressDto[],
        restrictionDeletions: UnresolvedAddressDto[],
    ) {
        super(signerPublicKey, version, network, type);
        this.accountAddressRestrictionTransactionBody = new AccountAddressRestrictionTransactionBodyBuilder(
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions,
        );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedAccountAddressRestrictionTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountAddressRestrictionTransactionBody: AccountAddressRestrictionTransactionBodyBuilder =
            AccountAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddressRestrictionTransactionBody.getSize());
        return new EmbeddedAccountAddressRestrictionTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            accountAddressRestrictionTransactionBody.restrictionFlags,
            accountAddressRestrictionTransactionBody.restrictionAdditions,
            accountAddressRestrictionTransactionBody.restrictionDeletions,
        );
    }

    /**
     * Creates an instance of EmbeddedAccountAddressRestrictionTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param restrictionFlags Type of restriction being applied to the listed addresses..
     * @param restrictionAdditions Array of account addresses being added to the restricted list..
     * @param restrictionDeletions Array of account addresses being removed from the restricted list..
     * @return Instance of EmbeddedAccountAddressRestrictionTransactionBuilder.
     */
    public static createEmbeddedAccountAddressRestrictionTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: UnresolvedAddressDto[],
        restrictionDeletions: UnresolvedAddressDto[],
    ): EmbeddedAccountAddressRestrictionTransactionBuilder {
        return new EmbeddedAccountAddressRestrictionTransactionBuilder(
            signerPublicKey,
            version,
            network,
            type,
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions,
        );
    }

    /**
     * Gets Type of restriction being applied to the listed addresses..
     *
     * @return Type of restriction being applied to the listed addresses..
     */
    public getRestrictionFlags(): AccountRestrictionFlagsDto[] {
        return this.accountAddressRestrictionTransactionBody.getRestrictionFlags();
    }

    /**
     * Gets Array of account addresses being added to the restricted list..
     *
     * @return Array of account addresses being added to the restricted list..
     */
    public getRestrictionAdditions(): UnresolvedAddressDto[] {
        return this.accountAddressRestrictionTransactionBody.getRestrictionAdditions();
    }

    /**
     * Gets Array of account addresses being removed from the restricted list..
     *
     * @return Array of account addresses being removed from the restricted list..
     */
    public getRestrictionDeletions(): UnresolvedAddressDto[] {
        return this.accountAddressRestrictionTransactionBody.getRestrictionDeletions();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.accountAddressRestrictionTransactionBody.getSize(); // accountAddressRestrictionTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): AccountAddressRestrictionTransactionBodyBuilder {
        return this.accountAddressRestrictionTransactionBody;
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
        const accountAddressRestrictionTransactionBodyBytes = this.accountAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountAddressRestrictionTransactionBodyBytes);
        return newArray;
    }
}
