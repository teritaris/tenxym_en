"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofScalarDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class ProofScalarDto {
    constructor(proofScalar) {
        this.proofScalar = proofScalar;
    }
    static loadFromBinary(payload) {
        const proofScalar = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(payload), 32);
        return new ProofScalarDto(proofScalar);
    }
    getProofScalar() {
        return this.proofScalar;
    }
    getSize() {
        return 32;
    }
    serialize() {
        return this.getProofScalar();
    }
}
exports.ProofScalarDto = ProofScalarDto;
//# sourceMappingURL=ProofScalarDto.js.map