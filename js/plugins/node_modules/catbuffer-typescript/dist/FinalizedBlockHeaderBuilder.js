"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalizedBlockHeaderBuilder = void 0;
const FinalizationRoundBuilder_1 = require("./FinalizationRoundBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const HeightDto_1 = require("./HeightDto");
class FinalizedBlockHeaderBuilder {
    constructor(round, height, hash) {
        GeneratorUtils_1.GeneratorUtils.notNull(round, 'round is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(height, 'height is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(hash, 'hash is null or undefined');
        this.round = round;
        this.height = height;
        this.hash = hash;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const round = FinalizationRoundBuilder_1.FinalizationRoundBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, round.getSize());
        const height = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, height.getSize());
        const hash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.getSize());
        return new FinalizedBlockHeaderBuilder(round, height, hash);
    }
    static createFinalizedBlockHeaderBuilder(round, height, hash) {
        return new FinalizedBlockHeaderBuilder(round, height, hash);
    }
    getRound() {
        return this.round;
    }
    getHeight() {
        return this.height;
    }
    getHash() {
        return this.hash;
    }
    getSize() {
        let size = 0;
        size += this.round.getSize();
        size += this.height.getSize();
        size += this.hash.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const roundBytes = this.round.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, roundBytes);
        const heightBytes = this.height.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, heightBytes);
        const hashBytes = this.hash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    }
}
exports.FinalizedBlockHeaderBuilder = FinalizedBlockHeaderBuilder;
//# sourceMappingURL=FinalizedBlockHeaderBuilder.js.map