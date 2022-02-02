"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnresolvedMosaicIdDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class UnresolvedMosaicIdDto {
    constructor(unresolvedMosaicId) {
        this.unresolvedMosaicId = unresolvedMosaicId;
    }
    static loadFromBinary(payload) {
        const unresolvedMosaicId = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new UnresolvedMosaicIdDto(unresolvedMosaicId);
    }
    getUnresolvedMosaicId() {
        return this.unresolvedMosaicId;
    }
    getSize() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getUnresolvedMosaicId());
    }
}
exports.UnresolvedMosaicIdDto = UnresolvedMosaicIdDto;
//# sourceMappingURL=UnresolvedMosaicIdDto.js.map