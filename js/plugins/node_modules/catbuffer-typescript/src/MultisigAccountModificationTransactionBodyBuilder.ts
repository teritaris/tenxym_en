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
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
 * Shared content between MultisigAccountModificationTransaction and EmbeddedMultisigAccountModificationTransaction.
 **/
export class MultisigAccountModificationTransactionBodyBuilder implements Serializer {
    /** Relative change to the **minimum** number of cosignatures required when **removing a cosignatory**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**.. **/
    readonly minRemovalDelta: number;

    /** Relative change to the **minimum** number of cosignatures required when **approving a transaction**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**.. **/
    readonly minApprovalDelta: number;

    /** Cosignatory address additions.
All accounts in this list will be able to cosign transactions on behalf of the multisig account. The number of required cosignatures depends on the configured minimum approval and minimum removal values.. **/
    readonly addressAdditions: UnresolvedAddressDto[];

    /** Cosignatory address deletions.
All accounts in this list will stop being able to cosign transactions on behalf of the multisig account. A transaction containing **any** address in this array requires a number of cosignatures at least equal to the minimum removal value.. **/
    readonly addressDeletions: UnresolvedAddressDto[];

    /**
    * Constructor.
    *
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
        minRemovalDelta: number,
        minApprovalDelta: number,
        addressAdditions: UnresolvedAddressDto[],
        addressDeletions: UnresolvedAddressDto[],
    ) {
        GeneratorUtils.notNull(minRemovalDelta, 'minRemovalDelta is null or undefined');
        GeneratorUtils.notNull(minApprovalDelta, 'minApprovalDelta is null or undefined');
        GeneratorUtils.notNull(addressAdditions, 'addressAdditions is null or undefined');
        GeneratorUtils.notNull(addressDeletions, 'addressDeletions is null or undefined');
        this.minRemovalDelta = minRemovalDelta;
        this.minApprovalDelta = minApprovalDelta;
        this.addressAdditions = addressAdditions;
        this.addressDeletions = addressDeletions;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MultisigAccountModificationTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const minRemovalDelta: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const minApprovalDelta: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const addressAdditionsCount: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const addressDeletionsCount: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const addressAdditions: UnresolvedAddressDto[] = GeneratorUtils.loadFromBinary(
            UnresolvedAddressDto.loadFromBinary,
            Uint8Array.from(byteArray),
            addressAdditionsCount,
        );
        byteArray.splice(
            0,
            addressAdditions.reduce((sum, c) => sum + c.getSize(), 0),
        );
        const addressDeletions: UnresolvedAddressDto[] = GeneratorUtils.loadFromBinary(
            UnresolvedAddressDto.loadFromBinary,
            Uint8Array.from(byteArray),
            addressDeletionsCount,
        );
        byteArray.splice(
            0,
            addressDeletions.reduce((sum, c) => sum + c.getSize(), 0),
        );
        return new MultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions);
    }

    /**
     * Creates an instance of MultisigAccountModificationTransactionBodyBuilder.
     *
     * @param minRemovalDelta Relative change to the **minimum** number of cosignatures required when **removing a cosignatory**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**..
     * @param minApprovalDelta Relative change to the **minimum** number of cosignatures required when **approving a transaction**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**..
     * @param addressAdditions Cosignatory address additions.
All accounts in this list will be able to cosign transactions on behalf of the multisig account. The number of required cosignatures depends on the configured minimum approval and minimum removal values..
     * @param addressDeletions Cosignatory address deletions.
All accounts in this list will stop being able to cosign transactions on behalf of the multisig account. A transaction containing **any** address in this array requires a number of cosignatures at least equal to the minimum removal value..
     * @return Instance of MultisigAccountModificationTransactionBodyBuilder.
     */
    public static createMultisigAccountModificationTransactionBodyBuilder(
        minRemovalDelta: number,
        minApprovalDelta: number,
        addressAdditions: UnresolvedAddressDto[],
        addressDeletions: UnresolvedAddressDto[],
    ): MultisigAccountModificationTransactionBodyBuilder {
        return new MultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions);
    }

    /**
     * Gets Relative change to the **minimum** number of cosignatures required when **removing a cosignatory**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**..
     *
     * @return Relative change to the **minimum** number of cosignatures required when **removing a cosignatory**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**..
     */
    public getMinRemovalDelta(): number {
        return this.minRemovalDelta;
    }

    /**
     * Gets Relative change to the **minimum** number of cosignatures required when **approving a transaction**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**..
     *
     * @return Relative change to the **minimum** number of cosignatures required when **approving a transaction**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be **-1**..
     */
    public getMinApprovalDelta(): number {
        return this.minApprovalDelta;
    }

    /**
     * Gets Cosignatory address additions.
All accounts in this list will be able to cosign transactions on behalf of the multisig account. The number of required cosignatures depends on the configured minimum approval and minimum removal values..
     *
     * @return Cosignatory address additions.
All accounts in this list will be able to cosign transactions on behalf of the multisig account. The number of required cosignatures depends on the configured minimum approval and minimum removal values..
     */
    public getAddressAdditions(): UnresolvedAddressDto[] {
        return this.addressAdditions;
    }

    /**
     * Gets Cosignatory address deletions.
All accounts in this list will stop being able to cosign transactions on behalf of the multisig account. A transaction containing **any** address in this array requires a number of cosignatures at least equal to the minimum removal value..
     *
     * @return Cosignatory address deletions.
All accounts in this list will stop being able to cosign transactions on behalf of the multisig account. A transaction containing **any** address in this array requires a number of cosignatures at least equal to the minimum removal value..
     */
    public getAddressDeletions(): UnresolvedAddressDto[] {
        return this.addressDeletions;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += 1; // minRemovalDelta
        size += 1; // minApprovalDelta
        size += 1; // addressAdditionsCount
        size += 1; // addressDeletionsCount
        size += 4; // multisigAccountModificationTransactionBodyReserved1
        size += this.addressAdditions.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0); // addressAdditions
        size += this.addressDeletions.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0); // addressDeletions
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const minRemovalDeltaBytes = GeneratorUtils.uint8ToBuffer(this.getMinRemovalDelta());
        newArray = GeneratorUtils.concatTypedArrays(newArray, minRemovalDeltaBytes);
        const minApprovalDeltaBytes = GeneratorUtils.uint8ToBuffer(this.getMinApprovalDelta());
        newArray = GeneratorUtils.concatTypedArrays(newArray, minApprovalDeltaBytes);
        const addressAdditionsCountBytes = GeneratorUtils.uint8ToBuffer(this.addressAdditions.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressAdditionsCountBytes);
        const addressDeletionsCountBytes = GeneratorUtils.uint8ToBuffer(this.addressDeletions.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressDeletionsCountBytes);
        const multisigAccountModificationTransactionBodyReserved1Bytes = GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, multisigAccountModificationTransactionBodyReserved1Bytes);
        const addressAdditionsBytes = GeneratorUtils.writeList(this.addressAdditions, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressAdditionsBytes);
        const addressDeletionsBytes = GeneratorUtils.writeList(this.addressDeletions, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressDeletionsBytes);
        return newArray;
    }
}
