"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedNamespaceRegistrationTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceRegistrationTransactionBodyBuilder_1 = require("./NamespaceRegistrationTransactionBodyBuilder");
const NamespaceRegistrationTypeDto_1 = require("./NamespaceRegistrationTypeDto");
class EmbeddedNamespaceRegistrationTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, duration, parentId, id, registrationType, name) {
        super(signerPublicKey, version, network, type);
        this.namespaceRegistrationTransactionBody = new NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder(duration, parentId, id, registrationType, name);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const namespaceRegistrationTransactionBody = NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceRegistrationTransactionBody.getSize());
        return new EmbeddedNamespaceRegistrationTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, namespaceRegistrationTransactionBody.duration, namespaceRegistrationTransactionBody.parentId, namespaceRegistrationTransactionBody.id, namespaceRegistrationTransactionBody.registrationType, namespaceRegistrationTransactionBody.name);
    }
    static createEmbeddedNamespaceRegistrationTransactionBuilderROOT(signerPublicKey, version, network, type, duration, id, name) {
        const registrationType = NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT;
        return new EmbeddedNamespaceRegistrationTransactionBuilder(signerPublicKey, version, network, type, duration, undefined, id, registrationType, name);
    }
    static createEmbeddedNamespaceRegistrationTransactionBuilderCHILD(signerPublicKey, version, network, type, parentId, id, name) {
        const registrationType = NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD;
        return new EmbeddedNamespaceRegistrationTransactionBuilder(signerPublicKey, version, network, type, undefined, parentId, id, registrationType, name);
    }
    getDuration() {
        return this.namespaceRegistrationTransactionBody.getDuration();
    }
    getParentId() {
        return this.namespaceRegistrationTransactionBody.getParentId();
    }
    getId() {
        return this.namespaceRegistrationTransactionBody.getId();
    }
    getRegistrationType() {
        return this.namespaceRegistrationTransactionBody.getRegistrationType();
    }
    getName() {
        return this.namespaceRegistrationTransactionBody.getName();
    }
    getSize() {
        let size = super.getSize();
        size += this.namespaceRegistrationTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.namespaceRegistrationTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const namespaceRegistrationTransactionBodyBytes = this.namespaceRegistrationTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceRegistrationTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedNamespaceRegistrationTransactionBuilder = EmbeddedNamespaceRegistrationTransactionBuilder;
//# sourceMappingURL=EmbeddedNamespaceRegistrationTransactionBuilder.js.map