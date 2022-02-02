"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountStateBuilder = void 0;
const AccountKeyTypeFlagsDto_1 = require("./AccountKeyTypeFlagsDto");
const AccountStateFormatDto_1 = require("./AccountStateFormatDto");
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const HeightActivityBucketsBuilder_1 = require("./HeightActivityBucketsBuilder");
const HeightDto_1 = require("./HeightDto");
const ImportanceSnapshotBuilder_1 = require("./ImportanceSnapshotBuilder");
const MosaicBuilder_1 = require("./MosaicBuilder");
const PinnedVotingKeyBuilder_1 = require("./PinnedVotingKeyBuilder");
const PublicKeyDto_1 = require("./PublicKeyDto");
const StateHeaderBuilder_1 = require("./StateHeaderBuilder");
class AccountStateBuilder extends StateHeaderBuilder_1.StateHeaderBuilder {
    constructor(version, address, addressHeight, publicKey, publicKeyHeight, accountType, format, supplementalPublicKeysMask, linkedPublicKey, nodePublicKey, vrfPublicKey, votingPublicKeys, importanceSnapshots, activityBuckets, balances) {
        super(version);
        GeneratorUtils_1.GeneratorUtils.notNull(address, 'address is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(addressHeight, 'addressHeight is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(publicKey, 'publicKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(publicKeyHeight, 'publicKeyHeight is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(accountType, 'accountType is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(format, 'format is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(supplementalPublicKeysMask, 'supplementalPublicKeysMask is null or undefined');
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.LINKED) > -1) {
            GeneratorUtils_1.GeneratorUtils.notNull(linkedPublicKey, 'linkedPublicKey is null or undefined');
        }
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.NODE) > -1) {
            GeneratorUtils_1.GeneratorUtils.notNull(nodePublicKey, 'nodePublicKey is null or undefined');
        }
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.VRF) > -1) {
            GeneratorUtils_1.GeneratorUtils.notNull(vrfPublicKey, 'vrfPublicKey is null or undefined');
        }
        GeneratorUtils_1.GeneratorUtils.notNull(votingPublicKeys, 'votingPublicKeys is null or undefined');
        if (format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            GeneratorUtils_1.GeneratorUtils.notNull(importanceSnapshots, 'importanceSnapshots is null or undefined');
        }
        if (format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            GeneratorUtils_1.GeneratorUtils.notNull(activityBuckets, 'activityBuckets is null or undefined');
        }
        GeneratorUtils_1.GeneratorUtils.notNull(balances, 'balances is null or undefined');
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
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder_1.StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const address = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.getSize());
        const addressHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, addressHeight.getSize());
        const publicKey = PublicKeyDto_1.PublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, publicKey.getSize());
        const publicKeyHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, publicKeyHeight.getSize());
        const accountType = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const format = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const supplementalPublicKeysMask = GeneratorUtils_1.GeneratorUtils.toFlags(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto, GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray)));
        byteArray.splice(0, 1);
        const votingPublicKeysCount = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        let linkedPublicKey = undefined;
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.LINKED) > -1) {
            linkedPublicKey = PublicKeyDto_1.PublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, linkedPublicKey.getSize());
        }
        let nodePublicKey = undefined;
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.NODE) > -1) {
            nodePublicKey = PublicKeyDto_1.PublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, nodePublicKey.getSize());
        }
        let vrfPublicKey = undefined;
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.VRF) > -1) {
            vrfPublicKey = PublicKeyDto_1.PublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, vrfPublicKey.getSize());
        }
        const votingPublicKeys = GeneratorUtils_1.GeneratorUtils.loadFromBinary(PinnedVotingKeyBuilder_1.PinnedVotingKeyBuilder.loadFromBinary, Uint8Array.from(byteArray), votingPublicKeysCount);
        byteArray.splice(0, votingPublicKeys.reduce((sum, c) => sum + c.getSize(), 0));
        let importanceSnapshots = undefined;
        if (format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            importanceSnapshots = ImportanceSnapshotBuilder_1.ImportanceSnapshotBuilder.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, importanceSnapshots.getSize());
        }
        let activityBuckets = undefined;
        if (format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            activityBuckets = HeightActivityBucketsBuilder_1.HeightActivityBucketsBuilder.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, activityBuckets.getSize());
        }
        const balancesCount = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const balances = GeneratorUtils_1.GeneratorUtils.loadFromBinary(MosaicBuilder_1.MosaicBuilder.loadFromBinary, Uint8Array.from(byteArray), balancesCount);
        byteArray.splice(0, balances.reduce((sum, c) => sum + c.getSize(), 0));
        return new AccountStateBuilder(superObject.version, address, addressHeight, publicKey, publicKeyHeight, accountType, format, supplementalPublicKeysMask, linkedPublicKey, nodePublicKey, vrfPublicKey, votingPublicKeys, importanceSnapshots, activityBuckets, balances);
    }
    static createAccountStateBuilderHIGH_VALUE(version, address, addressHeight, publicKey, publicKeyHeight, accountType, supplementalPublicKeysMask, linkedPublicKey, nodePublicKey, vrfPublicKey, votingPublicKeys, importanceSnapshots, activityBuckets, balances) {
        const format = AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE;
        return new AccountStateBuilder(version, address, addressHeight, publicKey, publicKeyHeight, accountType, format, supplementalPublicKeysMask, linkedPublicKey, nodePublicKey, vrfPublicKey, votingPublicKeys, importanceSnapshots, activityBuckets, balances);
    }
    static createAccountStateBuilderREGULAR(version, address, addressHeight, publicKey, publicKeyHeight, accountType, supplementalPublicKeysMask, linkedPublicKey, nodePublicKey, vrfPublicKey, votingPublicKeys, balances) {
        const format = AccountStateFormatDto_1.AccountStateFormatDto.REGULAR;
        return new AccountStateBuilder(version, address, addressHeight, publicKey, publicKeyHeight, accountType, format, supplementalPublicKeysMask, linkedPublicKey, nodePublicKey, vrfPublicKey, votingPublicKeys, undefined, undefined, balances);
    }
    getAddress() {
        return this.address;
    }
    getAddressHeight() {
        return this.addressHeight;
    }
    getPublicKey() {
        return this.publicKey;
    }
    getPublicKeyHeight() {
        return this.publicKeyHeight;
    }
    getAccountType() {
        return this.accountType;
    }
    getFormat() {
        return this.format;
    }
    getSupplementalPublicKeysMask() {
        return this.supplementalPublicKeysMask;
    }
    getLinkedPublicKey() {
        if (!(this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.LINKED) > -1 && this.linkedPublicKey)) {
            throw new Error('supplementalPublicKeysMask is not set to LINKED.');
        }
        return this.linkedPublicKey;
    }
    getNodePublicKey() {
        if (!(this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.NODE) > -1 && this.nodePublicKey)) {
            throw new Error('supplementalPublicKeysMask is not set to NODE.');
        }
        return this.nodePublicKey;
    }
    getVrfPublicKey() {
        if (!(this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.VRF) > -1 && this.vrfPublicKey)) {
            throw new Error('supplementalPublicKeysMask is not set to VRF.');
        }
        return this.vrfPublicKey;
    }
    getVotingPublicKeys() {
        return this.votingPublicKeys;
    }
    getImportanceSnapshots() {
        if (!(this.format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE && this.importanceSnapshots)) {
            throw new Error('format is not set to HIGH_VALUE.');
        }
        return this.importanceSnapshots;
    }
    getActivityBuckets() {
        if (!(this.format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE && this.activityBuckets)) {
            throw new Error('format is not set to HIGH_VALUE.');
        }
        return this.activityBuckets;
    }
    getBalances() {
        return this.balances;
    }
    getSize() {
        let size = super.getSize();
        size += this.address.getSize();
        size += this.addressHeight.getSize();
        size += this.publicKey.getSize();
        size += this.publicKeyHeight.getSize();
        size += 1;
        size += 1;
        size += 1;
        size += 1;
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.LINKED) > -1) {
            size += this.linkedPublicKey.getSize();
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.NODE) > -1) {
            size += this.nodePublicKey.getSize();
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.VRF) > -1) {
            size += this.vrfPublicKey.getSize();
        }
        size += this.votingPublicKeys.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0);
        if (this.format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            size += this.importanceSnapshots.getSize();
        }
        if (this.format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            size += this.activityBuckets.getSize();
        }
        size += 2;
        size += this.balances.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const addressBytes = this.address.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        const addressHeightBytes = this.addressHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressHeightBytes);
        const publicKeyBytes = this.publicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, publicKeyBytes);
        const publicKeyHeightBytes = this.publicKeyHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, publicKeyHeightBytes);
        const accountTypeBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.accountType);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountTypeBytes);
        const formatBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.format);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, formatBytes);
        const supplementalPublicKeysMaskBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(GeneratorUtils_1.GeneratorUtils.fromFlags(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto, this.supplementalPublicKeysMask));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, supplementalPublicKeysMaskBytes);
        const votingPublicKeysCountBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.votingPublicKeys.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, votingPublicKeysCountBytes);
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.LINKED) > -1) {
            const linkedPublicKeyBytes = this.linkedPublicKey.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.NODE) > -1) {
            const nodePublicKeyBytes = this.nodePublicKey.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, nodePublicKeyBytes);
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlagsDto_1.AccountKeyTypeFlagsDto.VRF) > -1) {
            const vrfPublicKeyBytes = this.vrfPublicKey.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, vrfPublicKeyBytes);
        }
        const votingPublicKeysBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.votingPublicKeys, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, votingPublicKeysBytes);
        if (this.format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            const importanceSnapshotsBytes = this.importanceSnapshots.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, importanceSnapshotsBytes);
        }
        if (this.format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            const activityBucketsBytes = this.activityBuckets.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, activityBucketsBytes);
        }
        const balancesCountBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.balances.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, balancesCountBytes);
        const balancesBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.balances, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, balancesBytes);
        return newArray;
    }
}
exports.AccountStateBuilder = AccountStateBuilder;
//# sourceMappingURL=AccountStateBuilder.js.map