"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRestrictionAddressValueBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
class AccountRestrictionAddressValueBuilder {
    constructor(restrictionValues) {
        GeneratorUtils_1.GeneratorUtils.notNull(restrictionValues, 'restrictionValues is null or undefined');
        this.restrictionValues = restrictionValues;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const restrictionValuesCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictionValues = GeneratorUtils_1.GeneratorUtils.loadFromBinary(AddressDto_1.AddressDto.loadFromBinary, Uint8Array.from(byteArray), restrictionValuesCount);
        byteArray.splice(0, restrictionValues.reduce((sum, c) => sum + c.getSize(), 0));
        return new AccountRestrictionAddressValueBuilder(restrictionValues);
    }
    static createAccountRestrictionAddressValueBuilder(restrictionValues) {
        return new AccountRestrictionAddressValueBuilder(restrictionValues);
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
exports.AccountRestrictionAddressValueBuilder = AccountRestrictionAddressValueBuilder;
//# sourceMappingURL=AccountRestrictionAddressValueBuilder.js.map