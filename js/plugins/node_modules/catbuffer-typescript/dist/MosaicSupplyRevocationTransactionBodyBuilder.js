"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicSupplyRevocationTransactionBodyBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
const UnresolvedMosaicBuilder_1 = require("./UnresolvedMosaicBuilder");
class MosaicSupplyRevocationTransactionBodyBuilder {
    constructor(sourceAddress, mosaic) {
        GeneratorUtils_1.GeneratorUtils.notNull(sourceAddress, 'sourceAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        this.sourceAddress = sourceAddress;
        this.mosaic = mosaic;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const sourceAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, sourceAddress.getSize());
        const mosaic = UnresolvedMosaicBuilder_1.UnresolvedMosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        return new MosaicSupplyRevocationTransactionBodyBuilder(sourceAddress, mosaic);
    }
    static createMosaicSupplyRevocationTransactionBodyBuilder(sourceAddress, mosaic) {
        return new MosaicSupplyRevocationTransactionBodyBuilder(sourceAddress, mosaic);
    }
    getSourceAddress() {
        return this.sourceAddress;
    }
    getMosaic() {
        return this.mosaic;
    }
    getSize() {
        let size = 0;
        size += this.sourceAddress.getSize();
        size += this.mosaic.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sourceAddressBytes = this.sourceAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sourceAddressBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        return newArray;
    }
}
exports.MosaicSupplyRevocationTransactionBodyBuilder = MosaicSupplyRevocationTransactionBodyBuilder;
//# sourceMappingURL=MosaicSupplyRevocationTransactionBodyBuilder.js.map