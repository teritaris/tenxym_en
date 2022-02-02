"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicIdDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class MosaicIdDto {
    constructor(mosaicId) {
        this.mosaicId = mosaicId;
    }
    static loadFromBinary(payload) {
        const mosaicId = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new MosaicIdDto(mosaicId);
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getSize() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getMosaicId());
    }
}
exports.MosaicIdDto = MosaicIdDto;
//# sourceMappingURL=MosaicIdDto.js.map