"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicResolutionStatementBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicResolutionEntryBuilder_1 = require("./MosaicResolutionEntryBuilder");
const ReceiptBuilder_1 = require("./ReceiptBuilder");
const UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
class MosaicResolutionStatementBuilder extends ReceiptBuilder_1.ReceiptBuilder {
    constructor(version, type, unresolved, resolutionEntries) {
        super(version, type);
        GeneratorUtils_1.GeneratorUtils.notNull(unresolved, 'unresolved is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(resolutionEntries, 'resolutionEntries is null or undefined');
        this.unresolved = unresolved;
        this.resolutionEntries = resolutionEntries;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const unresolved = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, unresolved.getSize());
        const resolutionEntries = GeneratorUtils_1.GeneratorUtils.loadFromBinaryRemaining(MosaicResolutionEntryBuilder_1.MosaicResolutionEntryBuilder.loadFromBinary, Uint8Array.from(byteArray), byteArray.length, 0);
        byteArray.splice(0, resolutionEntries.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0));
        return new MosaicResolutionStatementBuilder(superObject.version, superObject.type, unresolved, resolutionEntries);
    }
    static createMosaicResolutionStatementBuilder(version, type, unresolved, resolutionEntries) {
        return new MosaicResolutionStatementBuilder(version, type, unresolved, resolutionEntries);
    }
    getUnresolved() {
        return this.unresolved;
    }
    getResolutionEntries() {
        return this.resolutionEntries;
    }
    getSize() {
        let size = super.getSize();
        size += this.unresolved.getSize();
        size += this.resolutionEntries.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const unresolvedBytes = this.unresolved.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, unresolvedBytes);
        const resolutionEntriesBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.resolutionEntries, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, resolutionEntriesBytes);
        return newArray;
    }
}
exports.MosaicResolutionStatementBuilder = MosaicResolutionStatementBuilder;
//# sourceMappingURL=MosaicResolutionStatementBuilder.js.map