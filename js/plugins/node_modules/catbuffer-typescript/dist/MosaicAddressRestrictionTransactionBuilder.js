"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicAddressRestrictionTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicAddressRestrictionTransactionBodyBuilder_1 = require("./MosaicAddressRestrictionTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicAddressRestrictionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.mosaicAddressRestrictionTransactionBody = new MosaicAddressRestrictionTransactionBodyBuilder_1.MosaicAddressRestrictionTransactionBodyBuilder(mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicAddressRestrictionTransactionBody = MosaicAddressRestrictionTransactionBodyBuilder_1.MosaicAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAddressRestrictionTransactionBody.getSize());
        return new MosaicAddressRestrictionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicAddressRestrictionTransactionBody.mosaicId, mosaicAddressRestrictionTransactionBody.restrictionKey, mosaicAddressRestrictionTransactionBody.previousRestrictionValue, mosaicAddressRestrictionTransactionBody.newRestrictionValue, mosaicAddressRestrictionTransactionBody.targetAddress);
    }
    static createMosaicAddressRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress) {
        return new MosaicAddressRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress);
    }
    getMosaicId() {
        return this.mosaicAddressRestrictionTransactionBody.getMosaicId();
    }
    getRestrictionKey() {
        return this.mosaicAddressRestrictionTransactionBody.getRestrictionKey();
    }
    getPreviousRestrictionValue() {
        return this.mosaicAddressRestrictionTransactionBody.getPreviousRestrictionValue();
    }
    getNewRestrictionValue() {
        return this.mosaicAddressRestrictionTransactionBody.getNewRestrictionValue();
    }
    getTargetAddress() {
        return this.mosaicAddressRestrictionTransactionBody.getTargetAddress();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicAddressRestrictionTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.mosaicAddressRestrictionTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicAddressRestrictionTransactionBodyBytes = this.mosaicAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAddressRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.MosaicAddressRestrictionTransactionBuilder = MosaicAddressRestrictionTransactionBuilder;
//# sourceMappingURL=MosaicAddressRestrictionTransactionBuilder.js.map