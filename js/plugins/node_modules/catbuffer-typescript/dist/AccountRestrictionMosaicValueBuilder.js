"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRestrictionMosaicValueBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
class AccountRestrictionMosaicValueBuilder {
    constructor(restrictionValues) {
        GeneratorUtils_1.GeneratorUtils.notNull(restrictionValues, 'restrictionValues is null or undefined');
        this.restrictionValues = restrictionValues;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const restrictionValuesCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictionValues = GeneratorUtils_1.GeneratorUtils.loadFromBinary(MosaicIdDto_1.MosaicIdDto.loadFromBinary, Uint8Array.from(byteArray), restrictionValuesCount);
        byteArray.splice(0, restrictionValues.reduce((sum, c) => sum + c.getSize(), 0));
        return new AccountRestrictionMosaicValueBuilder(restrictionValues);
    }
    static createAccountRestrictionMosaicValueBuilder(restrictionValues) {
        return new AccountRestrictionMosaicValueBuilder(restrictionValues);
    }
    getRestrictionValues() {
        return this.restrictionValues;
    }
    getSize() {
        let size = 0;
        size += 8;
        size += this.restrictionValues.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.getSize(), 0), 0);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const restrictionValuesCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.restrictionValues.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesCountBytes);
        const restrictionValuesBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.restrictionValues, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesBytes);
        return newArray;
    }
}
exports.AccountRestrictionMosaicValueBuilder = AccountRestrictionMosaicValueBuilder;
//# sourceMappingURL=AccountRestrictionMosaicValueBuilder.js.map