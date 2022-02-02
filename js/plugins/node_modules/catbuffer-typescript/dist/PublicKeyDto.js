"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicKeyDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class PublicKeyDto {
    constructor(publicKey) {
        this.publicKey = publicKey;
    }
    static loadFromBinary(payload) {
        const publicKey = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(payload), 32);
        return new PublicKeyDto(publicKey);
    }
    getPublicKey() {
        return this.publicKey;
    }
    getSize() {
        return 32;
    }
    serialize() {
        return this.getPublicKey();
    }
}
exports.PublicKeyDto = PublicKeyDto;
//# sourceMappingURL=PublicKeyDto.js.map