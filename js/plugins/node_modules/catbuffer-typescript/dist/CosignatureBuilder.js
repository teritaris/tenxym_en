"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosignatureBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const PublicKeyDto_1 = require("./PublicKeyDto");
const SignatureDto_1 = require("./SignatureDto");
class CosignatureBuilder {
    constructor(version, signerPublicKey, signature) {
        GeneratorUtils_1.GeneratorUtils.notNull(version, 'version is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(signerPublicKey, 'signerPublicKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(signature, 'signature is null or undefined');
        this.version = version;
        this.signerPublicKey = signerPublicKey;
        this.signature = signature;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const version = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const signerPublicKey = PublicKeyDto_1.PublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.getSize());
        const signature = SignatureDto_1.SignatureDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.getSize());
        return new CosignatureBuilder(version, signerPublicKey, signature);
    }
    static createCosignatureBuilder(version, signerPublicKey, signature) {
        return new CosignatureBuilder(version, signerPublicKey, signature);
    }
    getVersion() {
        return this.version;
    }
    getSignerPublicKey() {
        return this.signerPublicKey;
    }
    getSignature() {
        return this.signature;
    }
    getSize() {
        let size = 0;
        size += 8;
        size += this.signerPublicKey.getSize();
        size += this.signature.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const versionBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getVersion());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const signatureBytes = this.signature.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signatureBytes);
        return newArray;
    }
}
exports.CosignatureBuilder = CosignatureBuilder;
//# sourceMappingURL=CosignatureBuilder.js.map