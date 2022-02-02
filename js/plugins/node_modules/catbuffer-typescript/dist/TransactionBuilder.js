"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionBuilder = void 0;
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const PublicKeyDto_1 = require("./PublicKeyDto");
const SignatureDto_1 = require("./SignatureDto");
const TimestampDto_1 = require("./TimestampDto");
class TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline) {
        GeneratorUtils_1.GeneratorUtils.notNull(signature, 'signature is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(signerPublicKey, 'signerPublicKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(version, 'version is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(network, 'network is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(type, 'type is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(fee, 'fee is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(deadline, 'deadline is null or undefined');
        this.signature = signature;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.fee = fee;
        this.deadline = deadline;
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
        const fee = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, fee.getSize());
        const deadline = TimestampDto_1.TimestampDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, deadline.getSize());
        return new TransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline);
    }
    static createTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline) {
        return new TransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline);
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
    getFee() {
        return this.fee;
    }
    getDeadline() {
        return this.deadline;
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
        size += this.fee.getSize();
        size += this.deadline.getSize();
        return size;
    }
    getBody() {
        return undefined;
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
        const feeBytes = this.fee.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, feeBytes);
        const deadlineBytes = this.deadline.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, deadlineBytes);
        return newArray;
    }
}
exports.TransactionBuilder = TransactionBuilder;
//# sourceMappingURL=TransactionBuilder.js.map