"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicSupplyRevocationTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicSupplyRevocationTransactionBodyBuilder_1 = require("./MosaicSupplyRevocationTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicSupplyRevocationTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, sourceAddress, mosaic) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.mosaicSupplyRevocationTransactionBody = new MosaicSupplyRevocationTransactionBodyBuilder_1.MosaicSupplyRevocationTransactionBodyBuilder(sourceAddress, mosaic);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicSupplyRevocationTransactionBody = MosaicSupplyRevocationTransactionBodyBuilder_1.MosaicSupplyRevocationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicSupplyRevocationTransactionBody.getSize());
        return new MosaicSupplyRevocationTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicSupplyRevocationTransactionBody.sourceAddress, mosaicSupplyRevocationTransactionBody.mosaic);
    }
    static createMosaicSupplyRevocationTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, sourceAddress, mosaic) {
        return new MosaicSupplyRevocationTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, sourceAddress, mosaic);
    }
    getSourceAddress() {
        return this.mosaicSupplyRevocationTransactionBody.getSourceAddress();
    }
    getMosaic() {
        return this.mosaicSupplyRevocationTransactionBody.getMosaic();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicSupplyRevocationTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.mosaicSupplyRevocationTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicSupplyRevocationTransactionBodyBytes = this.mosaicSupplyRevocationTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicSupplyRevocationTransactionBodyBytes);
        return newArray;
    }
}
exports.MosaicSupplyRevocationTransactionBuilder = MosaicSupplyRevocationTransactionBuilder;
//# sourceMappingURL=MosaicSupplyRevocationTransactionBuilder.js.map