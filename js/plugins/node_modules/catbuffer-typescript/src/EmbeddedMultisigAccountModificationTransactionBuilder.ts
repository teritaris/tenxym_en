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

import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { MultisigAccountModificationTransactionBodyBuilder } from './MultisigAccountModificationTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
 * Embedded version of MultisigAccountModificationTransaction.
 **/
export class EmbeddedMultisigAccountModificationTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Multisig account modification transaction body. **/
    readonly multisigAccountModificationTransactionBody: MultisigAccountModificationTransactionBodyBuilder;

    /**
    * Constructor.
    *
    * @param signerPublicKey Public key of the signer of the entity..
    * @param version Version of this structure..
    * @param network Network on which this entity was created..
    * @param type Transaction type.
    * @param minRemovalDelta Relative change to the **minimum** number of cosignatures required when **removing a cosignatory**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**..
    * @param minApprovalDelta Relative change to the **minimum** number of cosignatures required when **approving a transaction**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**..
    * @param addressAdditions Cosignatory address additions.
All accounts in this list will be able to cosign transactions on behalf of the multisig account. The number of required cosignatures depends on the configured minimum approval and minimum removal values..
    * @param addressDeletions Cosignatory address deletions.
All accounts in this list will stop being able to cosign transactions on behalf of the multisig account. A transaction containing **any** address in this array requires a number of cosignatures at least equal to the minimum removal value..
    */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        minRemovalDelta: number,
        minApprovalDelta: number,
        addressAdditions: UnresolvedAddressDto[],
        addressDeletions: UnresolvedAddressDto[],
    ) {
        super(signerPublicKey, version, network, type);
        this.multisigAccountModificationTransactionBody = new MultisigAccountModificationTransactionBodyBuilder(
            minRemovalDelta,
            minApprovalDelta,
            addressAdditions,
            addressDeletions,
        );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedMultisigAccountModificationTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const multisigAccountModificationTransactionBody: MultisigAccountModificationTransactionBodyBuilder =
            MultisigAccountModificationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, multisigAccountModificationTransactionBody.getSize());
        return new EmbeddedMultisigAccountModificationTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            multisigAccountModificationTransactionBody.minRemovalDelta,
            multisigAccountModificationTransactionBody.minApprovalDelta,
            multisigAccountModificationTransactionBody.addressAdditions,
            multisigAccountModificationTransactionBody.addressDeletions,
        );
    }

    /**
     * Creates an instance of EmbeddedMultisigAccountModificationTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param minRemovalDelta Relative change to the **minimum** number of cosignatures required when **removing a cosignatory**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**..
     * @param minApprovalDelta Relative change to the **minimum** number of cosignatures required when **approving a transaction**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**..
     * @param addressAdditions Cosignatory address additions.
All accounts in this list will be able to cosign transactions on behalf of the multisig account. The number of required cosignatures depends on the configured minimum approval and minimum removal values..
     * @param addressDeletions Cosignatory address deletions.
All accounts in this list will stop being able to cosign transactions on behalf of the multisig account. A transaction containing **any** address in this array requires a number of cosignatures at least equal to the minimum removal value..
     * @return Instance of EmbeddedMultisigAccountModificationTransactionBuilder.
     */
    public static createEmbeddedMultisigAccountModificationTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        minRemovalDelta: number,
        minApprovalDelta: number,
        addressAdditions: UnresolvedAddressDto[],
        addressDeletions: UnresolvedAddressDto[],
    ): EmbeddedMultisigAccountModificationTransactionBuilder {
        return new EmbeddedMultisigAccountModificationTransactionBuilder(
            signerPublicKey,
            version,
            network,
            type,
            minRemovalDelta,
            minApprovalDelta,
            addressAdditions,
            addressDeletions,
        );
    }

    /**
     * Gets Relative change to the **minimum** number of cosignatures required when **removing a cosignatory**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**..
     *
     * @return Relative change to the **minimum** number of cosignatures required when **removing a cosignatory**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**..
     */
    public getMinRemovalDelta(): number {
        return this.multisigAccountModificationTransactionBody.getMinRemovalDelta();
    }

    /**
     * Gets Relative change to the **minimum** number of cosignatures required when **approving a transaction**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**..
     *
     * @return Relative change to the **minimum** number of cosignatures required when **approving a transaction**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**..
     */
    public getMinApprovalDelta(): number {
        return this.multisigAccountModificationTransactionBody.getMinApprovalDelta();
    }

    /**
     * Gets Cosignatory address additions.
All accounts in this list will be able to cosign transactions on behalf of the multisig account. The number of required cosignatures depends on the configured minimum approval and minimum removal values..
     *
     * @return Cosignatory address additions.
All accounts in this list will be able to cosign transactions on behalf of the multisig account. The number of required cosignatures depends on the configured minimum approval and minimum removal values..
     */
    public getAddressAdditions(): UnresolvedAddressDto[] {
        return this.multisigAccountModificationTransactionBody.getAddressAdditions();
    }

    /**
     * Gets Cosignatory address deletions.
All accounts in this list will stop being able to cosign transactions on behalf of the multisig account. A transaction containing **any** address in this array requires a number of cosignatures at least equal to the minimum removal value..
     *
     * @return Cosignatory address deletions.
All accounts in this list will stop being able to cosign transactions on behalf of the multisig account. A transaction containing **any** address in this array requires a number of cosignatures at least equal to the minimum removal value..
     */
    public getAddressDeletions(): UnresolvedAddressDto[] {
        return this.multisigAccountModificationTransactionBody.getAddressDeletions();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.multisigAccountModificationTransactionBody.getSize(); // multisigAccountModificationTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): MultisigAccountModificationTransactionBodyBuilder {
        return this.multisigAccountModificationTransactionBody;
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
        const multisigAccountModificationTransactionBodyBytes = this.multisigAccountModificationTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, multisigAccountModificationTransactionBodyBytes);
        return newArray;
    }
}
