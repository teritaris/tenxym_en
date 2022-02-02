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

import { AccountKeyTypeFlagsDto } from './AccountKeyTypeFlagsDto';
import { AccountStateFormatDto } from './AccountStateFormatDto';
import { AccountTypeDto } from './AccountTypeDto';
import { AddressDto } from './AddressDto';
import { GeneratorUtils } from './GeneratorUtils';
import { HeightActivityBucketsBuilder } from './HeightActivityBucketsBuilder';
import { HeightDto } from './HeightDto';
import { ImportanceSnapshotBuilder } from './ImportanceSnapshotBuilder';
import { MosaicBuilder } from './MosaicBuilder';
import { PinnedVotingKeyBuilder } from './PinnedVotingKeyBuilder';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder } from './StateHeaderBuilder';

/**
 * Binary layout for non-historical account state
 **/
export class AccountStateBuilder extends StateHeaderBuilder implements Serializer {
    /** Address of account. **/
    readonly address: AddressDto;

    /** Height at which address has been obtained. **/
    readonly addressHeight: HeightDto;

    /** Public key of account. **/
    readonly publicKey: PublicKeyDto;

    /** Height at which public key has been obtained. **/
    readonly publicKeyHeight: HeightDto;

    /** Type of account. **/
    readonly accountType: AccountTypeDto;

    /** Account format. **/
    readonly format: AccountStateFormatDto;

    /** Mask of supplemental public key flags. **/
    readonly supplementalPublicKeysMask: AccountKeyTypeFlagsDto[];

    /** Linked account public key. **/
    readonly linkedPublicKey?: PublicKeyDto;

    /** Node public key. **/
    readonly nodePublicKey?: PublicKeyDto;

    /** Vrf public key. **/
    readonly vrfPublicKey?: PublicKeyDto;

    /** Voting public keys. **/
    readonly votingPublicKeys: PinnedVotingKeyBuilder[];

    /** Current importance snapshot of the account. **/
    readonly importanceSnapshots?: ImportanceSnapshotBuilder;

    /** Activity buckets of the account. **/
    readonly activityBuckets?: HeightActivityBucketsBuilder;

    /** Balances of account. **/
    readonly balances: MosaicBuilder[];

    /**
     * Constructor.
     *
     * @param version Serialization version.
     * @param address Address of account.
     * @param addressHeight Height at which address has been obtained.
     * @param publicKey Public key of account.
     * @param publicKeyHeight Height at which public key has been obtained.
     * @param accountType Type of account.
     * @param format Account format.
     * @param supplementalPublicKeysMask Mask of supplemental public key flags.
     * @param linkedPublicKey Linked account public key.
     * @param nodePublicKey Node public key.
     * @param vrfPublicKey Vrf public key.
     * @param votingPublicKeys Voting public keys.
     * @param importanceSnapshots Current importance snapshot of the account.
     * @param activityBuckets Activity buckets of the account.
     * @param balances Balances of account.
     */
    public constructor(
        version: number,
        address: AddressDto,
        addressHeight: HeightDto,
        publicKey: PublicKeyDto,
        publicKeyHeight: HeightDto,
        accountType: AccountTypeDto,
        format: AccountStateFormatDto,
        supplementalPublicKeysMask: AccountKeyTypeFlagsDto[],
        linkedPublicKey: PublicKeyDto | undefined,
        nodePublicKey: PublicKeyDto | undefined,
        vrfPublicKey: PublicKeyDto | undefined,
        votingPublicKeys: PinnedVotingKeyBuilder[],
        importanceSnapshots: ImportanceSnapshotBuilder | undefined,
        activityBuckets: HeightActivityBucketsBuilder | undefined,
        balances: MosaicBuilder[],
    ) {
        super(version);
        GeneratorUtils.notNull(address, 'address is null or undefined');
        GeneratorUtils.notNull(addressHeight, 'addressHeight is null or undefined');
        GeneratorUtils.notNull(publicKey, 'publicKey is null or undefined');
        GeneratorUtils.notNull(publicKeyHeight, 'publicKeyHeight is null or undefined');
        GeneratorUtils.notNull(accountType, 'accountType is null or undefined');
        GeneratorUtils.notNull(format, 'format is null or undefined');
        GeneratorUtils.notNull(supplementalPublicKeysMask, 'supplementalPublicKeysMask is null or undefined');
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.LINKED) > -1) {
            GeneratorUtils.notNull(linkedPublicKey, 'linkedPublicKey is null or undefined');
        }
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.NODE) > -1) {
            GeneratorUtils.notNull(nodePublicKey, 'nodePublicKey is null or undefined');
        }
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.VRF) > -1) {
            GeneratorUtils.notNull(vrfPublicKey, 'vrfPublicKey is null or undefined');
        }
        GeneratorUtils.notNull(votingPublicKeys, 'votingPublicKeys is null or undefined');
        if (format === AccountStateFormatDto.HIGH_VALUE) {
            GeneratorUtils.notNull(importanceSnapshots, 'importanceSnapshots is null or undefined');
        }
        if (format === AccountStateFormatDto.HIGH_VALUE) {
            GeneratorUtils.notNull(activityBuckets, 'activityBuckets is null or undefined');
        }
        GeneratorUtils.notNull(balances, 'balances is null or undefined');
        this.address = address;
        this.addressHeight = addressHeight;
        this.publicKey = publicKey;
        this.publicKeyHeight = publicKeyHeight;
        this.accountType = accountType;
        this.format = format;
        this.supplementalPublicKeysMask = supplementalPublicKeysMask;
        this.linkedPublicKey = linkedPublicKey;
        this.nodePublicKey = nodePublicKey;
        this.vrfPublicKey = vrfPublicKey;
        this.votingPublicKeys = votingPublicKeys;
        this.importanceSnapshots = importanceSnapshots;
        this.activityBuckets = activityBuckets;
        this.balances = balances;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AccountStateBuilder {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const address: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.getSize());
        const addressHeight: HeightDto = HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, addressHeight.getSize());
        const publicKey: PublicKeyDto = PublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, publicKey.getSize());
        const publicKeyHeight: HeightDto = HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, publicKeyHeight.getSize());
        const accountType: AccountTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const format: AccountStateFormatDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const supplementalPublicKeysMask: AccountKeyTypeFlagsDto[] = GeneratorUtils.toFlags(
            AccountKeyTypeFlagsDto,
            GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray)),
        );
        byteArray.splice(0, 1);
        const votingPublicKeysCount: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        let linkedPublicKey: PublicKeyDto | undefined = undefined;
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.LINKED) > -1) {
            linkedPublicKey = PublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, linkedPublicKey.getSize());
        }
        let nodePublicKey: PublicKeyDto | undefined = undefined;
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.NODE) > -1) {
            nodePublicKey = PublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, nodePublicKey.getSize());
        }
        let vrfPublicKey: PublicKeyDto | undefined = undefined;
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.VRF) > -1) {
            vrfPublicKey = PublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, vrfPublicKey.getSize());
        }
        const votingPublicKeys: PinnedVotingKeyBuilder[] = GeneratorUtils.loadFromBinary(
            PinnedVotingKeyBuilder.loadFromBinary,
            Uint8Array.from(byteArray),
            votingPublicKeysCount,
        );
        byteArray.splice(
            0,
            votingPublicKeys.reduce((sum, c) => sum + c.getSize(), 0),
        );
        let importanceSnapshots: ImportanceSnapshotBuilder | undefined = undefined;
        if (format === AccountStateFormatDto.HIGH_VALUE) {
            importanceSnapshots = ImportanceSnapshotBuilder.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, importanceSnapshots.getSize());
        }
        let activityBuckets: HeightActivityBucketsBuilder | undefined = undefined;
        if (format === AccountStateFormatDto.HIGH_VALUE) {
            activityBuckets = HeightActivityBucketsBuilder.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, activityBuckets.getSize());
        }
        const balancesCount: number = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const balances: MosaicBuilder[] = GeneratorUtils.loadFromBinary(
            MosaicBuilder.loadFromBinary,
            Uint8Array.from(byteArray),
            balancesCount,
        );
        byteArray.splice(
            0,
            balances.reduce((sum, c) => sum + c.getSize(), 0),
        );
        return new AccountStateBuilder(
            superObject.version,
            address,
            addressHeight,
            publicKey,
            publicKeyHeight,
            accountType,
            format,
            supplementalPublicKeysMask,
            linkedPublicKey,
            nodePublicKey,
            vrfPublicKey,
            votingPublicKeys,
            importanceSnapshots,
            activityBuckets,
            balances,
        );
    }

    /**
     * Creates an instance of AccountStateBuilder.
     *
     * @param version Serialization version.
     * @param address Address of account.
     * @param addressHeight Height at which address has been obtained.
     * @param publicKey Public key of account.
     * @param publicKeyHeight Height at which public key has been obtained.
     * @param accountType Type of account.
     * @param supplementalPublicKeysMask Mask of supplemental public key flags.
     * @param linkedPublicKey Linked account public key.
     * @param nodePublicKey Node public key.
     * @param vrfPublicKey Vrf public key.
     * @param votingPublicKeys Voting public keys.
     * @param importanceSnapshots Current importance snapshot of the account.
     * @param activityBuckets Activity buckets of the account.
     * @param balances Balances of account.
     * @return Instance of AccountStateBuilder.
     */
    public static createAccountStateBuilderHIGH_VALUE(
        version: number,
        address: AddressDto,
        addressHeight: HeightDto,
        publicKey: PublicKeyDto,
        publicKeyHeight: HeightDto,
        accountType: AccountTypeDto,
        supplementalPublicKeysMask: AccountKeyTypeFlagsDto[],
        linkedPublicKey: PublicKeyDto,
        nodePublicKey: PublicKeyDto,
        vrfPublicKey: PublicKeyDto,
        votingPublicKeys: PinnedVotingKeyBuilder[],
        importanceSnapshots: ImportanceSnapshotBuilder,
        activityBuckets: HeightActivityBucketsBuilder,
        balances: MosaicBuilder[],
    ): AccountStateBuilder {
        const format = AccountStateFormatDto.HIGH_VALUE;
        return new AccountStateBuilder(
            version,
            address,
            addressHeight,
            publicKey,
            publicKeyHeight,
            accountType,
            format,
            supplementalPublicKeysMask,
            linkedPublicKey,
            nodePublicKey,
            vrfPublicKey,
            votingPublicKeys,
            importanceSnapshots,
            activityBuckets,
            balances,
        );
    }

    /**
     * Creates an instance of AccountStateBuilder.
     *
     * @param version Serialization version.
     * @param address Address of account.
     * @param addressHeight Height at which address has been obtained.
     * @param publicKey Public key of account.
     * @param publicKeyHeight Height at which public key has been obtained.
     * @param accountType Type of account.
     * @param supplementalPublicKeysMask Mask of supplemental public key flags.
     * @param linkedPublicKey Linked account public key.
     * @param nodePublicKey Node public key.
     * @param vrfPublicKey Vrf public key.
     * @param votingPublicKeys Voting public keys.
     * @param balances Balances of account.
     * @return Instance of AccountStateBuilder.
     */
    public static createAccountStateBuilderREGULAR(
        version: number,
        address: AddressDto,
        addressHeight: HeightDto,
        publicKey: PublicKeyDto,
        publicKeyHeight: HeightDto,
        accountType: AccountTypeDto,
        supplementalPublicKeysMask: AccountKeyTypeFlagsDto[],
        linkedPublicKey: PublicKeyDto,
        nodePublicKey: PublicKeyDto,
        vrfPublicKey: PublicKeyDto,
        votingPublicKeys: PinnedVotingKeyBuilder[],
        balances: MosaicBuilder[],
    ): AccountStateBuilder {
        const format = AccountStateFormatDto.REGULAR;
        return new AccountStateBuilder(
            version,
            address,
            addressHeight,
            publicKey,
            publicKeyHeight,
            accountType,
            format,
            supplementalPublicKeysMask,
            linkedPublicKey,
            nodePublicKey,
            vrfPublicKey,
            votingPublicKeys,
            undefined,
            undefined,
            balances,
        );
    }

    /**
     * Gets address of account.
     *
     * @return Address of account.
     */
    public getAddress(): AddressDto {
        return this.address;
    }

    /**
     * Gets height at which address has been obtained.
     *
     * @return Height at which address has been obtained.
     */
    public getAddressHeight(): HeightDto {
        return this.addressHeight;
    }

    /**
     * Gets public key of account.
     *
     * @return Public key of account.
     */
    public getPublicKey(): PublicKeyDto {
        return this.publicKey;
    }

    /**
     * Gets height at which public key has been obtained.
     *
     * @return Height at which public key has been obtained.
     */
    public getPublicKeyHeight(): HeightDto {
        return this.publicKeyHeight;
    }

    /**
     * Gets type of account.
     *
     * @return Type of account.
     */
    public getAccountType(): AccountTypeDto {
        return this.accountType;
    }

    /**
     * Gets account format.
     *
     * @return Account format.
     */
    public getFormat(): AccountStateFormatDto {
        return this.format;
    }

    /**
     * Gets mask of supplemental public key flags.
     *
     * @return Mask of supplemental public key flags.
     */
    public getSupplementalPublicKeysMask(): AccountKeyTypeFlagsDto[] {
        return this.supplementalPublicKeysMask;
    }

    /**
     * Gets linked account public key.
     *
     * @return Linked account public key.
     */
    public getLinkedPublicKey(): PublicKeyDto {
        if (!(this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.LINKED) > -1 && this.linkedPublicKey)) {
            throw new Error('supplementalPublicKeysMask is not set to LINKED.');
        }
        return this.linkedPublicKey;
    }

    /**
     * Gets node public key.
     *
     * @return Node public key.
     */
    public getNodePublicKey(): PublicKeyDto {
        if (!(this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.NODE) > -1 && this.nodePublicKey)) {
            throw new Error('supplementalPublicKeysMask is not set to NODE.');
        }
        return this.nodePublicKey;
    }

    /**
     * Gets vrf public key.
     *
     * @return Vrf public key.
     */
    public getVrfPublicKey(): PublicKeyDto {
        if (!(this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.VRF) > -1 && this.vrfPublicKey)) {
            throw new Error('supplementalPublicKeysMask is not set to VRF.');
        }
        return this.vrfPublicKey;
    }

    /**
     * Gets voting public keys.
     *
     * @return Voting public keys.
     */
    public getVotingPublicKeys(): PinnedVotingKeyBuilder[] {
        return this.votingPublicKeys;
    }

    /**
     * Gets current importance snapshot of the account.
     *
     * @return Current importance snapshot of the account.
     */
    public getImportanceSnapshots(): ImportanceSnapshotBuilder {
        if (!(this.format === AccountStateFormatDto.HIGH_VALUE && this.importanceSnapshots)) {
            throw new Error('format is not set to HIGH_VALUE.');
        }
        return this.importanceSnapshots;
    }

    /**
     * Gets activity buckets of the account.
     *
     * @return Activity buckets of the account.
     */
    public getActivityBuckets(): HeightActivityBucketsBuilder {
        if (!(this.format === AccountStateFormatDto.HIGH_VALUE && this.activityBuckets)) {
            throw new Error('format is not set to HIGH_VALUE.');
        }
        return this.activityBuckets;
    }

    /**
     * Gets balances of account.
     *
     * @return Balances of account.
     */
    public getBalances(): MosaicBuilder[] {
        return this.balances;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.address.getSize(); // address
        size += this.addressHeight.getSize(); // addressHeight
        size += this.publicKey.getSize(); // publicKey
        size += this.publicKeyHeight.getSize(); // publicKeyHeight
        size += 1; // accountType
        size += 1; // format
        size += 1; // supplementalPublicKeysMask
        size += 1; // votingPublicKeysCount
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.LINKED) > -1) {
            size += this.linkedPublicKey!.getSize(); // linkedPublicKey
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.NODE) > -1) {
            size += this.nodePublicKey!.getSize(); // nodePublicKey
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.VRF) > -1) {
            size += this.vrfPublicKey!.getSize(); // vrfPublicKey
        }
        size += this.votingPublicKeys.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0); // votingPublicKeys
        if (this.format === AccountStateFormatDto.HIGH_VALUE) {
            size += this.importanceSnapshots!.getSize(); // importanceSnapshots
        }
        if (this.format === AccountStateFormatDto.HIGH_VALUE) {
            size += this.activityBuckets!.getSize(); // activityBuckets
        }
        size += 2; // balancesCount
        size += this.balances.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0); // balances
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
        const addressHeightBytes = this.addressHeight.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressHeightBytes);
        const publicKeyBytes = this.publicKey.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, publicKeyBytes);
        const publicKeyHeightBytes = this.publicKeyHeight.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, publicKeyHeightBytes);
        const accountTypeBytes = GeneratorUtils.uint8ToBuffer(this.accountType);
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountTypeBytes);
        const formatBytes = GeneratorUtils.uint8ToBuffer(this.format);
        newArray = GeneratorUtils.concatTypedArrays(newArray, formatBytes);
        const supplementalPublicKeysMaskBytes = GeneratorUtils.uint8ToBuffer(
            GeneratorUtils.fromFlags(AccountKeyTypeFlagsDto, this.supplementalPublicKeysMask),
        );
        newArray = GeneratorUtils.concatTypedArrays(newArray, supplementalPublicKeysMaskBytes);
        const votingPublicKeysCountBytes = GeneratorUtils.uint8ToBuffer(this.votingPublicKeys.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, votingPublicKeysCountBytes);
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.LINKED) > -1) {
            const linkedPublicKeyBytes = this.linkedPublicKey!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.NODE) > -1) {
            const nodePublicKeyBytes = this.nodePublicKey!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, nodePublicKeyBytes);
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto.VRF) > -1) {
            const vrfPublicKeyBytes = this.vrfPublicKey!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, vrfPublicKeyBytes);
        }
        const votingPublicKeysBytes = GeneratorUtils.writeList(this.votingPublicKeys, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, votingPublicKeysBytes);
        if (this.format === AccountStateFormatDto.HIGH_VALUE) {
            const importanceSnapshotsBytes = this.importanceSnapshots!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, importanceSnapshotsBytes);
        }
        if (this.format === AccountStateFormatDto.HIGH_VALUE) {
            const activityBucketsBytes = this.activityBuckets!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, activityBucketsBytes);
        }
        const balancesCountBytes = GeneratorUtils.uint16ToBuffer(this.balances.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, balancesCountBytes);
        const balancesBytes = GeneratorUtils.writeList(this.balances, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, balancesBytes);
        return newArray;
    }
}
