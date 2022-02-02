"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifficultyDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class DifficultyDto {
    constructor(difficulty) {
        this.difficulty = difficulty;
    }
    static loadFromBinary(payload) {
        const difficulty = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new DifficultyDto(difficulty);
    }
    getDifficulty() {
        return this.difficulty;
    }
    getSize() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getDifficulty());
    }
}
exports.DifficultyDto = DifficultyDto;
//# sourceMappingURL=DifficultyDto.js.map