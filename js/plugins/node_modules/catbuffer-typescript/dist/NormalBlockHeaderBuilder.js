"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalBlockHeaderBuilder = void 0;
const BlockHeaderBuilder_1 = require("./BlockHeaderBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class NormalBlockHeaderBuilder extends BlockHeaderBuilder_1.BlockHeaderBuilder {
    constructor(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier) {
        super(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = BlockHeaderBuilder_1.BlockHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        return new NormalBlockHeaderBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.height, superObject.timestamp, superObject.difficulty, superObject.generationHashProof, superObject.previousBlockHash, superObject.transactionsHash, superObject.receiptsHash, superObject.stateHash, superObject.beneficiaryAddress, superObject.feeMultiplier);
    }
    static createNormalBlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier) {
        return new NormalBlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier);
    }
    getSize() {
        let size = super.getSize();
        size += 4;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const blockHeaderReserved1Bytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, blockHeaderReserved1Bytes);
        return newArray;
    }
}
exports.NormalBlockHeaderBuilder = NormalBlockHeaderBuilder;
//# sourceMappingURL=NormalBlockHeaderBuilder.js.map