"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceChangeReceiptBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicBuilder_1 = require("./MosaicBuilder");
const ReceiptBuilder_1 = require("./ReceiptBuilder");
class BalanceChangeReceiptBuilder extends ReceiptBuilder_1.ReceiptBuilder {
    constructor(version, type, mosaic, targetAddress) {
        super(version, type);
        GeneratorUtils_1.GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(targetAddress, 'targetAddress is null or undefined');
        this.mosaic = mosaic;
        this.targetAddress = targetAddress;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        const targetAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.getSize());
        return new BalanceChangeReceiptBuilder(superObject.version, superObject.type, mosaic, targetAddress);
    }
    static createBalanceChangeReceiptBuilder(version, type, mosaic, targetAddress) {
        return new BalanceChangeReceiptBuilder(version, type, mosaic, targetAddress);
    }
    getMosaic() {
        return this.mosaic;
    }
    getTargetAddress() {
        return this.targetAddress;
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaic.getSize();
        size += this.targetAddress.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        return newArray;
    }
}
exports.BalanceChangeReceiptBuilder = BalanceChangeReceiptBuilder;
//# sourceMappingURL=BalanceChangeReceiptBuilder.js.map