"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptSourceBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class ReceiptSourceBuilder {
    constructor(primaryId, secondaryId) {
        GeneratorUtils_1.GeneratorUtils.notNull(primaryId, 'primaryId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(secondaryId, 'secondaryId is null or undefined');
        this.primaryId = primaryId;
        this.secondaryId = secondaryId;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const primaryId = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const secondaryId = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        return new ReceiptSourceBuilder(primaryId, secondaryId);
    }
    static createReceiptSourceBuilder(primaryId, secondaryId) {
        return new ReceiptSourceBuilder(primaryId, secondaryId);
    }
    getPrimaryId() {
        return this.primaryId;
    }
    getSecondaryId() {
        return this.secondaryId;
    }
    getSize() {
        let size = 0;
        size += 4;
        size += 4;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const primaryIdBytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.getPrimaryId());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, primaryIdBytes);
        const secondaryIdBytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.getSecondaryId());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secondaryIdBytes);
        return newArray;
    }
}
exports.ReceiptSourceBuilder = ReceiptSourceBuilder;
//# sourceMappingURL=ReceiptSourceBuilder.js.map