"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicNonceDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class MosaicNonceDto {
    constructor(mosaicNonce) {
        this.mosaicNonce = mosaicNonce;
    }
    static loadFromBinary(payload) {
        const mosaicNonce = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(payload));
        return new MosaicNonceDto(mosaicNonce);
    }
    getMosaicNonce() {
        return this.mosaicNonce;
    }
    getSize() {
        return 4;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.getMosaicNonce());
    }
}
exports.MosaicNonceDto = MosaicNonceDto;
//# sourceMappingURL=MosaicNonceDto.js.map