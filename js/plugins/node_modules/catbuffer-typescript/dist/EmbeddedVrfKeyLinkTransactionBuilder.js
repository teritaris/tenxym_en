"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedVrfKeyLinkTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const VrfKeyLinkTransactionBodyBuilder_1 = require("./VrfKeyLinkTransactionBodyBuilder");
class EmbeddedVrfKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, linkedPublicKey, linkAction) {
        super(signerPublicKey, version, network, type);
        this.vrfKeyLinkTransactionBody = new VrfKeyLinkTransactionBodyBuilder_1.VrfKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const vrfKeyLinkTransactionBody = VrfKeyLinkTransactionBodyBuilder_1.VrfKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, vrfKeyLinkTransactionBody.getSize());
        return new EmbeddedVrfKeyLinkTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, vrfKeyLinkTransactionBody.linkedPublicKey, vrfKeyLinkTransactionBody.linkAction);
    }
    static createEmbeddedVrfKeyLinkTransactionBuilder(signerPublicKey, version, network, type, linkedPublicKey, linkAction) {
        return new EmbeddedVrfKeyLinkTransactionBuilder(signerPublicKey, version, network, type, linkedPublicKey, linkAction);
    }
    getLinkedPublicKey() {
        return this.vrfKeyLinkTransactionBody.getLinkedPublicKey();
    }
    getLinkAction() {
        return this.vrfKeyLinkTransactionBody.getLinkAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.vrfKeyLinkTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.vrfKeyLinkTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const vrfKeyLinkTransactionBodyBytes = this.vrfKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, vrfKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedVrfKeyLinkTransactionBuilder = EmbeddedVrfKeyLinkTransactionBuilder;
//# sourceMappingURL=EmbeddedVrfKeyLinkTransactionBuilder.js.map