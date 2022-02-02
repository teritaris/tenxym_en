"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VrfKeyLinkTransactionBodyBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const PublicKeyDto_1 = require("./PublicKeyDto");
class VrfKeyLinkTransactionBodyBuilder {
    constructor(linkedPublicKey, linkAction) {
        GeneratorUtils_1.GeneratorUtils.notNull(linkedPublicKey, 'linkedPublicKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(linkAction, 'linkAction is null or undefined');
        this.linkedPublicKey = linkedPublicKey;
        this.linkAction = linkAction;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const linkedPublicKey = PublicKeyDto_1.PublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, linkedPublicKey.getSize());
        const linkAction = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new VrfKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    static createVrfKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction) {
        return new VrfKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    getLinkedPublicKey() {
        return this.linkedPublicKey;
    }
    getLinkAction() {
        return this.linkAction;
    }
    getSize() {
        let size = 0;
        size += this.linkedPublicKey.getSize();
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const linkedPublicKeyBytes = this.linkedPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        const linkActionBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.linkAction);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkActionBytes);
        return newArray;
    }
}
exports.VrfKeyLinkTransactionBodyBuilder = VrfKeyLinkTransactionBodyBuilder;
//# sourceMappingURL=VrfKeyLinkTransactionBodyBuilder.js.map