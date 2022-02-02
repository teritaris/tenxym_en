"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportanceDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class ImportanceDto {
    constructor(importance) {
        this.importance = importance;
    }
    static loadFromBinary(payload) {
        const importance = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new ImportanceDto(importance);
    }
    getImportance() {
        return this.importance;
    }
    getSize() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getImportance());
    }
}
exports.ImportanceDto = ImportanceDto;
//# sourceMappingURL=ImportanceDto.js.map