"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InflationReceiptBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicBuilder_1 = require("./MosaicBuilder");
const ReceiptBuilder_1 = require("./ReceiptBuilder");
class InflationReceiptBuilder extends ReceiptBuilder_1.ReceiptBuilder {
    constructor(version, type, mosaic) {
        super(version, type);
        GeneratorUtils_1.GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        this.mosaic = mosaic;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        return new InflationReceiptBuilder(superObject.version, superObject.type, mosaic);
    }
    static createInflationReceiptBuilder(version, type, mosaic) {
        return new InflationReceiptBuilder(version, type, mosaic);
    }
    getMosaic() {
        return this.mosaic;
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaic.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        return newArray;
    }
}
exports.InflationReceiptBuilder = InflationReceiptBuilder;
//# sourceMappingURL=InflationReceiptBuilder.js.map