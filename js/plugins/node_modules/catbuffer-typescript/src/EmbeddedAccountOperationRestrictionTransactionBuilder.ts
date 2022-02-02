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

import { AccountOperationRestrictionTransactionBodyBuilder } from './AccountOperationRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';

/**
 * Embedded version of AccountOperationRestrictionTransaction.
 **/
export class EmbeddedAccountOperationRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Account operation restriction transaction body. **/
    readonly accountOperationRestrictionTransactionBody: AccountOperationRestrictionTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param restrictionFlags Type of restriction being applied to the listed transaction types..
     * @param restrictionAdditions Array of transaction types being added to the restricted list..
     * @param restrictionDeletions Array of transaction types being rtemoved from the restricted list..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: TransactionTypeDto[],
        restrictionDeletions: TransactionTypeDto[],
    ) {
        super(signerPublicKey, version, network, type);
        this.accountOperationRestrictionTransactionBody = new AccountOperationRestrictionTransactionBodyBuilder(
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

    public static loadFromBinary(payload: Uint8Array): EmbeddedAccountOperationRestrictionTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountOperationRestrictionTransactionBody: AccountOperationRestrictionTransactionBodyBuilder =
            AccountOperationRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountOperationRestrictionTransactionBody.getSize());
        return new EmbeddedAccountOperationRestrictionTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            accountOperationRestrictionTransactionBody.restrictionFlags,
            accountOperationRestrictionTransactionBody.restrictionAdditions,
            accountOperationRestrictionTransactionBody.restrictionDeletions,
        );
    }

    /**
     * Creates an instance of EmbeddedAccountOperationRestrictionTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param restrictionFlags Type of restriction being applied to the listed transaction types..
     * @param restrictionAdditions Array of transaction types being added to the restricted list..
     * @param restrictionDeletions Array of transaction types being rtemoved from the restricted list..
     * @return Instance of EmbeddedAccountOperationRestrictionTransactionBuilder.
     */
    public static createEmbeddedAccountOperationRestrictionTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: TransactionTypeDto[],
        restrictionDeletions: TransactionTypeDto[],
    ): EmbeddedAccountOperationRestrictionTransactionBuilder {
        return new EmbeddedAccountOperationRestrictionTransactionBuilder(
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
     * Gets Type of restriction being applied to the listed transaction types..
     *
     * @return Type of restriction being applied to the listed transaction types..
     */
    public getRestrictionFlags(): AccountRestrictionFlagsDto[] {
        return this.accountOperationRestrictionTransactionBody.getRestrictionFlags();
    }

    /**
     * Gets Array of transaction types being added to the restricted list..
     *
     * @return Array of transaction types being added to the restricted list..
     */
    public getRestrictionAdditions(): TransactionTypeDto[] {
        return this.accountOperationRestrictionTransactionBody.getRestrictionAdditions();
    }

    /**
     * Gets Array of transaction types being rtemoved from the restricted list..
     *
     * @return Array of transaction types being rtemoved from the restricted list..
     */
    public getRestrictionDeletions(): TransactionTypeDto[] {
        return this.accountOperationRestrictionTransactionBody.getRestrictionDeletions();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.accountOperationRestrictionTransactionBody.getSize(); // accountOperationRestrictionTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): AccountOperationRestrictionTransactionBodyBuilder {
        return this.accountOperationRestrictionTransactionBody;
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
        const accountOperationRestrictionTransactionBodyBytes = this.accountOperationRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountOperationRestrictionTransactionBodyBytes);
        return newArray;
    }
}
