"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockFeeMultiplierDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class BlockFeeMultiplierDto {
    constructor(blockFeeMultiplier) {
        this.blockFeeMultiplier = blockFeeMultiplier;
    }
    static loadFromBinary(payload) {
        const blockFeeMultiplier = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(payload));
        return new BlockFeeMultiplierDto(blockFeeMultiplier);
    }
    getBlockFeeMultiplier() {
        return this.blockFeeMultiplier;
    }
    getSize() {
        return 4;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.getBlockFeeMultiplier());
    }
}
exports.BlockFeeMultiplierDto = BlockFeeMultiplierDto;
//# sourceMappingURL=BlockFeeMultiplierDto.js.map