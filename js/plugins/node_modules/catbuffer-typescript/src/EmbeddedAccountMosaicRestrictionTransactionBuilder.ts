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

import { AccountMosaicRestrictionTransactionBodyBuilder } from './AccountMosaicRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 * Embedded version of AccountMosaicRestrictionTransaction.
 **/
export class EmbeddedAccountMosaicRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Account mosaic restriction transaction body. **/
    readonly accountMosaicRestrictionTransactionBody: AccountMosaicRestrictionTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param restrictionFlags Type of restriction being applied to the listed mosaics..
     * @param restrictionAdditions Array of mosaics being added to the restricted list..
     * @param restrictionDeletions Array of mosaics being removed from the restricted list..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: UnresolvedMosaicIdDto[],
        restrictionDeletions: UnresolvedMosaicIdDto[],
    ) {
        super(signerPublicKey, version, network, type);
        this.accountMosaicRestrictionTransactionBody = new AccountMosaicRestrictionTransactionBodyBuilder(
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

    public static loadFromBinary(payload: Uint8Array): EmbeddedAccountMosaicRestrictionTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountMosaicRestrictionTransactionBody: AccountMosaicRestrictionTransactionBodyBuilder =
            AccountMosaicRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMosaicRestrictionTransactionBody.getSize());
        return new EmbeddedAccountMosaicRestrictionTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            accountMosaicRestrictionTransactionBody.restrictionFlags,
            accountMosaicRestrictionTransactionBody.restrictionAdditions,
            accountMosaicRestrictionTransactionBody.restrictionDeletions,
        );
    }

    /**
     * Creates an instance of EmbeddedAccountMosaicRestrictionTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param restrictionFlags Type of restriction being applied to the listed mosaics..
     * @param restrictionAdditions Array of mosaics being added to the restricted list..
     * @param restrictionDeletions Array of mosaics being removed from the restricted list..
     * @return Instance of EmbeddedAccountMosaicRestrictionTransactionBuilder.
     */
    public static createEmbeddedAccountMosaicRestrictionTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: UnresolvedMosaicIdDto[],
        restrictionDeletions: UnresolvedMosaicIdDto[],
    ): EmbeddedAccountMosaicRestrictionTransactionBuilder {
        return new EmbeddedAccountMosaicRestrictionTransactionBuilder(
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
     * Gets Type of restriction being applied to the listed mosaics..
     *
     * @return Type of restriction being applied to the listed mosaics..
     */
    public getRestrictionFlags(): AccountRestrictionFlagsDto[] {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionFlags();
    }

    /**
     * Gets Array of mosaics being added to the restricted list..
     *
     * @return Array of mosaics being added to the restricted list..
     */
    public getRestrictionAdditions(): UnresolvedMosaicIdDto[] {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionAdditions();
    }

    /**
     * Gets Array of mosaics being removed from the restricted list..
     *
     * @return Array of mosaics being removed from the restricted list..
     */
    public getRestrictionDeletions(): UnresolvedMosaicIdDto[] {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionDeletions();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.accountMosaicRestrictionTransactionBody.getSize(); // accountMosaicRestrictionTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): AccountMosaicRestrictionTransactionBodyBuilder {
        return this.accountMosaicRestrictionTransactionBody;
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
        const accountMosaicRestrictionTransactionBodyBytes = this.accountMosaicRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountMosaicRestrictionTransactionBodyBytes);
        return newArray;
    }
}
