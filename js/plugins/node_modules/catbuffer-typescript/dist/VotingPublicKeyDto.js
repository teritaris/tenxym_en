"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingPublicKeyDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class VotingPublicKeyDto {
    constructor(votingPublicKey) {
        this.votingPublicKey = votingPublicKey;
    }
    static loadFromBinary(payload) {
        const votingPublicKey = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(payload), 32);
        return new VotingPublicKeyDto(votingPublicKey);
    }
    getVotingPublicKey() {
        return this.votingPublicKey;
    }
    getSize() {
        return 32;
    }
    serialize() {
        return this.getVotingPublicKey();
    }
}
exports.VotingPublicKeyDto = VotingPublicKeyDto;
//# sourceMappingURL=VotingPublicKeyDto.js.map