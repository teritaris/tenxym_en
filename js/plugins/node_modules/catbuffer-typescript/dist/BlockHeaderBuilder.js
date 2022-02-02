"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockHeaderBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const BlockFeeMultiplierDto_1 = require("./BlockFeeMultiplierDto");
const DifficultyDto_1 = require("./DifficultyDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const HeightDto_1 = require("./HeightDto");
const PublicKeyDto_1 = require("./PublicKeyDto");
const SignatureDto_1 = require("./SignatureDto");
const TimestampDto_1 = require("./TimestampDto");
const VrfProofBuilder_1 = require("./VrfProofBuilder");
class BlockHeaderBuilder {
    constructor(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier) {
        GeneratorUtils_1.GeneratorUtils.notNull(signature, 'signature is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(signerPublicKey, 'signerPublicKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(version, 'version is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(network, 'network is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(type, 'type is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(height, 'height is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(timestamp, 'timestamp is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(difficulty, 'difficulty is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(generationHashProof, 'generationHashProof is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(previousBlockHash, 'previousBlockHash is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(transactionsHash, 'transactionsHash is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(receiptsHash, 'receiptsHash is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(stateHash, 'stateHash is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(beneficiaryAddress, 'beneficiaryAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(feeMultiplier, 'feeMultiplier is null or undefined');
        this.signature = signature;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.height = height;
        this.timestamp = timestamp;
        this.difficulty = difficulty;
        this.generationHashProof = generationHashProof;
        this.previousBlockHash = previousBlockHash;
        this.transactionsHash = transactionsHash;
        this.receiptsHash = receiptsHash;
        this.stateHash = stateHash;
        this.beneficiaryAddress = beneficiaryAddress;
        this.feeMultiplier = feeMultiplier;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const size = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const signature = SignatureDto_1.SignatureDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.getSize());
        const signerPublicKey = PublicKeyDto_1.PublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.getSize());
        GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const network = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const type = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const height = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, height.getSize());
        const timestamp = TimestampDto_1.TimestampDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, timestamp.getSize());
        const difficulty = DifficultyDto_1.DifficultyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, difficulty.getSize());
        const generationHashProof = VrfProofBuilder_1.VrfProofBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, generationHashProof.getSize());
        const previousBlockHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, previousBlockHash.getSize());
        const transactionsHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transactionsHash.getSize());
        const receiptsHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, receiptsHash.getSize());
        const stateHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, stateHash.getSize());
        const beneficiaryAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, beneficiaryAddress.getSize());
        const feeMultiplier = BlockFeeMultiplierDto_1.BlockFeeMultiplierDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, feeMultiplier.getSize());
        return new BlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier);
    }
    static createBlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier) {
        return new BlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier);
    }
    getSignature() {
        return this.signature;
    }
    getSignerPublicKey() {
        return this.signerPublicKey;
    }
    getVersion() {
        return this.version;
    }
    getNetwork() {
        return this.network;
    }
    getType() {
        return this.type;
    }
    getHeight() {
        return this.height;
    }
    getTimestamp() {
        return this.timestamp;
    }
    getDifficulty() {
        return this.difficulty;
    }
    getGenerationHashProof() {
        return this.generationHashProof;
    }
    getPreviousBlockHash() {
        return this.previousBlockHash;
    }
    getTransactionsHash() {
        return this.transactionsHash;
    }
    getReceiptsHash() {
        return this.receiptsHash;
    }
    getStateHash() {
        return this.stateHash;
    }
    getBeneficiaryAddress() {
        return this.beneficiaryAddress;
    }
    getFeeMultiplier() {
        return this.feeMultiplier;
    }
    getSize() {
        let size = 0;
        size += 4;
        size += 4;
        size += this.signature.getSize();
        size += this.signerPublicKey.getSize();
        size += 4;
        size += 1;
        size += 1;
        size += 2;
        size += this.height.getSize();
        size += this.timestamp.getSize();
        size += this.difficulty.getSize();
        size += this.generationHashProof.getSize();
        size += this.previousBlockHash.getSize();
        size += this.transactionsHash.getSize();
        size += this.receiptsHash.getSize();
        size += this.stateHash.getSize();
        size += this.beneficiaryAddress.getSize();
        size += this.feeMultiplier.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sizeBytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.getSize());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        const verifiableEntityHeaderReserved1Bytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, verifiableEntityHeaderReserved1Bytes);
        const signatureBytes = this.signature.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signatureBytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const entityBodyReserved1Bytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, entityBodyReserved1Bytes);
        const versionBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.getVersion());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        const networkBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.network);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, networkBytes);
        const typeBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.type);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        const heightBytes = this.height.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, heightBytes);
        const timestampBytes = this.timestamp.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, timestampBytes);
        const difficultyBytes = this.difficulty.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, difficultyBytes);
        const generationHashProofBytes = this.generationHashProof.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, generationHashProofBytes);
        const previousBlockHashBytes = this.previousBlockHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, previousBlockHashBytes);
        const transactionsHashBytes = this.transactionsHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transactionsHashBytes);
        const receiptsHashBytes = this.receiptsHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, receiptsHashBytes);
        const stateHashBytes = this.stateHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, stateHashBytes);
        const beneficiaryAddressBytes = this.beneficiaryAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, beneficiaryAddressBytes);
        const feeMultiplierBytes = this.feeMultiplier.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, feeMultiplierBytes);
        return newArray;
    }
}
exports.BlockHeaderBuilder = BlockHeaderBuilder;
//# sourceMappingURL=BlockHeaderBuilder.js.map