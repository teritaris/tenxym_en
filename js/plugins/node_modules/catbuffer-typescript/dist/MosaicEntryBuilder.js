"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicEntryBuilder = void 0;
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicDefinitionBuilder_1 = require("./MosaicDefinitionBuilder");
const MosaicIdDto_1 = require("./MosaicIdDto");
const StateHeaderBuilder_1 = require("./StateHeaderBuilder");
class MosaicEntryBuilder extends StateHeaderBuilder_1.StateHeaderBuilder {
    constructor(version, mosaicId, supply, definition) {
        super(version);
        GeneratorUtils_1.GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(supply, 'supply is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(definition, 'definition is null or undefined');
        this.mosaicId = mosaicId;
        this.supply = supply;
        this.definition = definition;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder_1.StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const supply = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, supply.getSize());
        const definition = MosaicDefinitionBuilder_1.MosaicDefinitionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, definition.getSize());
        return new MosaicEntryBuilder(superObject.version, mosaicId, supply, definition);
    }
    static createMosaicEntryBuilder(version, mosaicId, supply, definition) {
        return new MosaicEntryBuilder(version, mosaicId, supply, definition);
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getSupply() {
        return this.supply;
    }
    getDefinition() {
        return this.definition;
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicId.getSize();
        size += this.supply.getSize();
        size += this.definition.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const supplyBytes = this.supply.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, supplyBytes);
        const definitionBytes = this.definition.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, definitionBytes);
        return newArray;
    }
}
exports.MosaicEntryBuilder = MosaicEntryBuilder;
//# sourceMappingURL=MosaicEntryBuilder.js.map