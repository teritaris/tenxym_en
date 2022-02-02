"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofGammaDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class ProofGammaDto {
    constructor(proofGamma) {
        this.proofGamma = proofGamma;
    }
    static loadFromBinary(payload) {
        const proofGamma = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(payload), 32);
        return new ProofGammaDto(proofGamma);
    }
    getProofGamma() {
        return this.proofGamma;
    }
    getSize() {
        return 32;
    }
    serialize() {
        return this.getProofGamma();
    }
}
exports.ProofGammaDto = ProofGammaDto;
//# sourceMappingURL=ProofGammaDto.js.map