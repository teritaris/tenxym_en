"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultisigEntryBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const StateHeaderBuilder_1 = require("./StateHeaderBuilder");
class MultisigEntryBuilder extends StateHeaderBuilder_1.StateHeaderBuilder {
    constructor(version, minApproval, minRemoval, accountAddress, cosignatoryAddresses, multisigAddresses) {
        super(version);
        GeneratorUtils_1.GeneratorUtils.notNull(minApproval, 'minApproval is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(minRemoval, 'minRemoval is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(accountAddress, 'accountAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(cosignatoryAddresses, 'cosignatoryAddresses is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(multisigAddresses, 'multisigAddresses is null or undefined');
        this.minApproval = minApproval;
        this.minRemoval = minRemoval;
        this.accountAddress = accountAddress;
        this.cosignatoryAddresses = cosignatoryAddresses;
        this.multisigAddresses = multisigAddresses;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder_1.StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const minApproval = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const minRemoval = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const accountAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddress.getSize());
        const cosignatoryAddressesCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const cosignatoryAddresses = GeneratorUtils_1.GeneratorUtils.loadFromBinary(AddressDto_1.AddressDto.loadFromBinary, Uint8Array.from(byteArray), cosignatoryAddressesCount);
        byteArray.splice(0, cosignatoryAddresses.reduce((sum, c) => sum + c.getSize(), 0));
        const multisigAddressesCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const multisigAddresses = GeneratorUtils_1.GeneratorUtils.loadFromBinary(AddressDto_1.AddressDto.loadFromBinary, Uint8Array.from(byteArray), multisigAddressesCount);
        byteArray.splice(0, multisigAddresses.reduce((sum, c) => sum + c.getSize(), 0));
        return new MultisigEntryBuilder(superObject.version, minApproval, minRemoval, accountAddress, cosignatoryAddresses, multisigAddresses);
    }
    static createMultisigEntryBuilder(version, minApproval, minRemoval, accountAddress, cosignatoryAddresses, multisigAddresses) {
        return new MultisigEntryBuilder(version, minApproval, minRemoval, accountAddress, cosignatoryAddresses, multisigAddresses);
    }
    getMinApproval() {
        return this.minApproval;
    }
    getMinRemoval() {
        return this.minRemoval;
    }
    getAccountAddress() {
        return this.accountAddress;
    }
    getCosignatoryAddresses() {
        return this.cosignatoryAddresses;
    }
    getMultisigAddresses() {
        return this.multisigAddresses;
    }
    getSize() {
        let size = super.getSize();
        size += 4;
        size += 4;
        size += this.accountAddress.getSize();
        size += 8;
        size += this.cosignatoryAddresses.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0);
        size += 8;
        size += this.multisigAddresses.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const minApprovalBytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.getMinApproval());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, minApprovalBytes);
        const minRemovalBytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.getMinRemoval());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, minRemovalBytes);
        const accountAddressBytes = this.accountAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountAddressBytes);
        const cosignatoryAddressesCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.cosignatoryAddresses.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, cosignatoryAddressesCountBytes);
        const cosignatoryAddressesBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.cosignatoryAddresses, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, cosignatoryAddressesBytes);
        const multisigAddressesCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.multisigAddresses.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigAddressesCountBytes);
        const multisigAddressesBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.multisigAddresses, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigAddressesBytes);
        return newArray;
    }
}
exports.MultisigEntryBuilder = MultisigEntryBuilder;
//# sourceMappingURL=MultisigEntryBuilder.js.map