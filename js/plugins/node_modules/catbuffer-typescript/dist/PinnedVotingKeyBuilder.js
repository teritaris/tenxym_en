"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinnedVotingKeyBuilder = void 0;
const FinalizationEpochDto_1 = require("./FinalizationEpochDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const VotingPublicKeyDto_1 = require("./VotingPublicKeyDto");
class PinnedVotingKeyBuilder {
    constructor(votingKey, startEpoch, endEpoch) {
        GeneratorUtils_1.GeneratorUtils.notNull(votingKey, 'votingKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(startEpoch, 'startEpoch is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(endEpoch, 'endEpoch is null or undefined');
        this.votingKey = votingKey;
        this.startEpoch = startEpoch;
        this.endEpoch = endEpoch;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const votingKey = VotingPublicKeyDto_1.VotingPublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, votingKey.getSize());
        const startEpoch = FinalizationEpochDto_1.FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startEpoch.getSize());
        const endEpoch = FinalizationEpochDto_1.FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, endEpoch.getSize());
        return new PinnedVotingKeyBuilder(votingKey, startEpoch, endEpoch);
    }
    static createPinnedVotingKeyBuilder(votingKey, startEpoch, endEpoch) {
        return new PinnedVotingKeyBuilder(votingKey, startEpoch, endEpoch);
    }
    getVotingKey() {
        return this.votingKey;
    }
    getStartEpoch() {
        return this.startEpoch;
    }
    getEndEpoch() {
        return this.endEpoch;
    }
    getSize() {
        let size = 0;
        size += this.votingKey.getSize();
        size += this.startEpoch.getSize();
        size += this.endEpoch.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const votingKeyBytes = this.votingKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, votingKeyBytes);
        const startEpochBytes = this.startEpoch.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, startEpochBytes);
        const endEpochBytes = this.endEpoch.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, endEpochBytes);
        return newArray;
    }
}
exports.PinnedVotingKeyBuilder = PinnedVotingKeyBuilder;
//# sourceMappingURL=PinnedVotingKeyBuilder.js.map