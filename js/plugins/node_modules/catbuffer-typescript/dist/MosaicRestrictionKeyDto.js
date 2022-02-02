"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicRestrictionKeyDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class MosaicRestrictionKeyDto {
    constructor(mosaicRestrictionKey) {
        this.mosaicRestrictionKey = mosaicRestrictionKey;
    }
    static loadFromBinary(payload) {
        const mosaicRestrictionKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new MosaicRestrictionKeyDto(mosaicRestrictionKey);
    }
    getMosaicRestrictionKey() {
        return this.mosaicRestrictionKey;
    }
    getSize() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getMosaicRestrictionKey());
    }
}
exports.MosaicRestrictionKeyDto = MosaicRestrictionKeyDto;
//# sourceMappingURL=MosaicRestrictionKeyDto.js.map