"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMosaicSupplyRevocationTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicSupplyRevocationTransactionBodyBuilder_1 = require("./MosaicSupplyRevocationTransactionBodyBuilder");
class EmbeddedMosaicSupplyRevocationTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, sourceAddress, mosaic) {
        super(signerPublicKey, version, network, type);
        this.mosaicSupplyRevocationTransactionBody = new MosaicSupplyRevocationTransactionBodyBuilder_1.MosaicSupplyRevocationTransactionBodyBuilder(sourceAddress, mosaic);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicSupplyRevocationTransactionBody = MosaicSupplyRevocationTransactionBodyBuilder_1.MosaicSupplyRevocationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicSupplyRevocationTransactionBody.getSize());
        return new EmbeddedMosaicSupplyRevocationTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicSupplyRevocationTransactionBody.sourceAddress, mosaicSupplyRevocationTransactionBody.mosaic);
    }
    static createEmbeddedMosaicSupplyRevocationTransactionBuilder(signerPublicKey, version, network, type, sourceAddress, mosaic) {
        return new EmbeddedMosaicSupplyRevocationTransactionBuilder(signerPublicKey, version, network, type, sourceAddress, mosaic);
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
exports.EmbeddedMosaicSupplyRevocationTransactionBuilder = EmbeddedMosaicSupplyRevocationTransactionBuilder;
//# sourceMappingURL=EmbeddedMosaicSupplyRevocationTransactionBuilder.js.map