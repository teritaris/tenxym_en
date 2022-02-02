"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingKeyLinkTransactionBodyBuilder = void 0;
const FinalizationEpochDto_1 = require("./FinalizationEpochDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const VotingPublicKeyDto_1 = require("./VotingPublicKeyDto");
class VotingKeyLinkTransactionBodyBuilder {
    constructor(linkedPublicKey, startEpoch, endEpoch, linkAction) {
        GeneratorUtils_1.GeneratorUtils.notNull(linkedPublicKey, 'linkedPublicKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(startEpoch, 'startEpoch is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(endEpoch, 'endEpoch is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(linkAction, 'linkAction is null or undefined');
        this.linkedPublicKey = linkedPublicKey;
        this.startEpoch = startEpoch;
        this.endEpoch = endEpoch;
        this.linkAction = linkAction;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const linkedPublicKey = VotingPublicKeyDto_1.VotingPublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, linkedPublicKey.getSize());
        const startEpoch = FinalizationEpochDto_1.FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startEpoch.getSize());
        const endEpoch = FinalizationEpochDto_1.FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, endEpoch.getSize());
        const linkAction = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new VotingKeyLinkTransactionBodyBuilder(linkedPublicKey, startEpoch, endEpoch, linkAction);
    }
    static createVotingKeyLinkTransactionBodyBuilder(linkedPublicKey, startEpoch, endEpoch, linkAction) {
        return new VotingKeyLinkTransactionBodyBuilder(linkedPublicKey, startEpoch, endEpoch, linkAction);
    }
    getLinkedPublicKey() {
        return this.linkedPublicKey;
    }
    getStartEpoch() {
        return this.startEpoch;
    }
    getEndEpoch() {
        return this.endEpoch;
    }
    getLinkAction() {
        return this.linkAction;
    }
    getSize() {
        let size = 0;
        size += this.linkedPublicKey.getSize();
        size += this.startEpoch.getSize();
        size += this.endEpoch.getSize();
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const linkedPublicKeyBytes = this.linkedPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        const startEpochBytes = this.startEpoch.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, startEpochBytes);
        const endEpochBytes = this.endEpoch.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, endEpochBytes);
        const linkActionBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.linkAction);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkActionBytes);
        return newArray;
    }
}
exports.VotingKeyLinkTransactionBodyBuilder = VotingKeyLinkTransactionBodyBuilder;
//# sourceMappingURL=VotingKeyLinkTransactionBodyBuilder.js.map