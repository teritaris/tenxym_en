"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const PublicKeyDto_1 = require("./PublicKeyDto");
class EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type) {
        GeneratorUtils_1.GeneratorUtils.notNull(signerPublicKey, 'signerPublicKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(version, 'version is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(network, 'network is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(type, 'type is null or undefined');
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const size = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
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
        return new EmbeddedTransactionBuilder(signerPublicKey, version, network, type);
    }
    static createEmbeddedTransactionBuilder(signerPublicKey, version, network, type) {
        return new EmbeddedTransactionBuilder(signerPublicKey, version, network, type);
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
    getSize() {
        let size = 0;
        size += 4;
        size += 4;
        size += this.signerPublicKey.getSize();
        size += 4;
        size += 1;
        size += 1;
        size += 2;
        return size;
    }
    getBody() {
        return undefined;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sizeBytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.getSize());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        const embeddedTransactionHeaderReserved1Bytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, embeddedTransactionHeaderReserved1Bytes);
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
        return newArray;
    }
}
exports.EmbeddedTransactionBuilder = EmbeddedTransactionBuilder;
//# sourceMappingURL=EmbeddedTransactionBuilder.js.map