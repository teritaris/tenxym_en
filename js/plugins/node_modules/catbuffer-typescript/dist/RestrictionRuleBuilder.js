"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestrictionRuleBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
class RestrictionRuleBuilder {
    constructor(referenceMosaicId, restrictionValue, restrictionType) {
        GeneratorUtils_1.GeneratorUtils.notNull(referenceMosaicId, 'referenceMosaicId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(restrictionValue, 'restrictionValue is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(restrictionType, 'restrictionType is null or undefined');
        this.referenceMosaicId = referenceMosaicId;
        this.restrictionValue = restrictionValue;
        this.restrictionType = restrictionType;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const referenceMosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, referenceMosaicId.getSize());
        const restrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictionType = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new RestrictionRuleBuilder(referenceMosaicId, restrictionValue, restrictionType);
    }
    static createRestrictionRuleBuilder(referenceMosaicId, restrictionValue, restrictionType) {
        return new RestrictionRuleBuilder(referenceMosaicId, restrictionValue, restrictionType);
    }
    getReferenceMosaicId() {
        return this.referenceMosaicId;
    }
    getRestrictionValue() {
        return this.restrictionValue;
    }
    getRestrictionType() {
        return this.restrictionType;
    }
    getSize() {
        let size = 0;
        size += this.referenceMosaicId.getSize();
        size += 8;
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const referenceMosaicIdBytes = this.referenceMosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, referenceMosaicIdBytes);
        const restrictionValueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getRestrictionValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValueBytes);
        const restrictionTypeBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.restrictionType);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionTypeBytes);
        return newArray;
    }
}
exports.RestrictionRuleBuilder = RestrictionRuleBuilder;
//# sourceMappingURL=RestrictionRuleBuilder.js.map