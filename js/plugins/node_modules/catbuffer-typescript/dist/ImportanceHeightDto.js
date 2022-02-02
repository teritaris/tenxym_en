"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportanceHeightDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class ImportanceHeightDto {
    constructor(importanceHeight) {
        this.importanceHeight = importanceHeight;
    }
    static loadFromBinary(payload) {
        const importanceHeight = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new ImportanceHeightDto(importanceHeight);
    }
    getImportanceHeight() {
        return this.importanceHeight;
    }
    getSize() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getImportanceHeight());
    }
}
exports.ImportanceHeightDto = ImportanceHeightDto;
//# sourceMappingURL=ImportanceHeightDto.js.map