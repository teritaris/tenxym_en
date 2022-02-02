"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockDurationDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class BlockDurationDto {
    constructor(blockDuration) {
        this.blockDuration = blockDuration;
    }
    static loadFromBinary(payload) {
        const blockDuration = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new BlockDurationDto(blockDuration);
    }
    getBlockDuration() {
        return this.blockDuration;
    }
    getSize() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getBlockDuration());
    }
}
exports.BlockDurationDto = BlockDurationDto;
//# sourceMappingURL=BlockDurationDto.js.map