"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeightDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class HeightDto {
    constructor(height) {
        this.height = height;
    }
    static loadFromBinary(payload) {
        const height = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new HeightDto(height);
    }
    getHeight() {
        return this.height;
    }
    getSize() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getHeight());
    }
}
exports.HeightDto = HeightDto;
//# sourceMappingURL=HeightDto.js.map