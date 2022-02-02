"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicRestrictionEntryBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicAddressRestrictionEntryBuilder_1 = require("./MosaicAddressRestrictionEntryBuilder");
const MosaicGlobalRestrictionEntryBuilder_1 = require("./MosaicGlobalRestrictionEntryBuilder");
const MosaicRestrictionEntryTypeDto_1 = require("./MosaicRestrictionEntryTypeDto");
const StateHeaderBuilder_1 = require("./StateHeaderBuilder");
class MosaicRestrictionEntryBuilder extends StateHeaderBuilder_1.StateHeaderBuilder {
    constructor(version, entryType, addressEntry, globalEntry) {
        super(version);
        GeneratorUtils_1.GeneratorUtils.notNull(entryType, 'entryType is null or undefined');
        if (entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS) {
            GeneratorUtils_1.GeneratorUtils.notNull(addressEntry, 'addressEntry is null or undefined');
        }
        if (entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL) {
            GeneratorUtils_1.GeneratorUtils.notNull(globalEntry, 'globalEntry is null or undefined');
        }
        this.entryType = entryType;
        this.addressEntry = addressEntry;
        this.globalEntry = globalEntry;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder_1.StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const entryType = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        let addressEntry = undefined;
        if (entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS) {
            addressEntry = MosaicAddressRestrictionEntryBuilder_1.MosaicAddressRestrictionEntryBuilder.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, addressEntry.getSize());
        }
        let globalEntry = undefined;
        if (entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL) {
            globalEntry = MosaicGlobalRestrictionEntryBuilder_1.MosaicGlobalRestrictionEntryBuilder.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, globalEntry.getSize());
        }
        return new MosaicRestrictionEntryBuilder(superObject.version, entryType, addressEntry, globalEntry);
    }
    static createMosaicRestrictionEntryBuilderADDRESS(version, addressEntry) {
        const entryType = MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS;
        return new MosaicRestrictionEntryBuilder(version, entryType, addressEntry, undefined);
    }
    static createMosaicRestrictionEntryBuilderGLOBAL(version, globalEntry) {
        const entryType = MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL;
        return new MosaicRestrictionEntryBuilder(version, entryType, undefined, globalEntry);
    }
    getEntryType() {
        return this.entryType;
    }
    getAddressEntry() {
        if (!(this.entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS && this.addressEntry)) {
            throw new Error('entryType is not set to ADDRESS.');
        }
        return this.addressEntry;
    }
    getGlobalEntry() {
        if (!(this.entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL && this.globalEntry)) {
            throw new Error('entryType is not set to GLOBAL.');
        }
        return this.globalEntry;
    }
    getSize() {
        let size = super.getSize();
        size += 1;
        if (this.entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS) {
            size += this.addressEntry.getSize();
        }
        if (this.entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL) {
            size += this.globalEntry.getSize();
        }
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const entryTypeBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.entryType);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, entryTypeBytes);
        if (this.entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS) {
            const addressEntryBytes = this.addressEntry.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressEntryBytes);
        }
        if (this.entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL) {
            const globalEntryBytes = this.globalEntry.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, globalEntryBytes);
        }
        return newArray;
    }
}
exports.MosaicRestrictionEntryBuilder = MosaicRestrictionEntryBuilder;
//# sourceMappingURL=MosaicRestrictionEntryBuilder.js.map