"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopedMetadataKeyDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class ScopedMetadataKeyDto {
    constructor(scopedMetadataKey) {
        this.scopedMetadataKey = scopedMetadataKey;
    }
    static loadFromBinary(payload) {
        const scopedMetadataKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new ScopedMetadataKeyDto(scopedMetadataKey);
    }
    getScopedMetadataKey() {
        return this.scopedMetadataKey;
    }
    getSize() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getScopedMetadataKey());
    }
}
exports.ScopedMetadataKeyDto = ScopedMetadataKeyDto;
//# sourceMappingURL=ScopedMetadataKeyDto.js.map