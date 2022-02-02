"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceRegistrationTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceRegistrationTransactionBodyBuilder_1 = require("./NamespaceRegistrationTransactionBodyBuilder");
const NamespaceRegistrationTypeDto_1 = require("./NamespaceRegistrationTypeDto");
const TransactionBuilder_1 = require("./TransactionBuilder");
class NamespaceRegistrationTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, duration, parentId, id, registrationType, name) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.namespaceRegistrationTransactionBody = new NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder(duration, parentId, id, registrationType, name);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const namespaceRegistrationTransactionBody = NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceRegistrationTransactionBody.getSize());
        return new NamespaceRegistrationTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, namespaceRegistrationTransactionBody.duration, namespaceRegistrationTransactionBody.parentId, namespaceRegistrationTransactionBody.id, namespaceRegistrationTransactionBody.registrationType, namespaceRegistrationTransactionBody.name);
    }
    static createNamespaceRegistrationTransactionBuilderROOT(signature, signerPublicKey, version, network, type, fee, deadline, duration, id, name) {
        const registrationType = NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT;
        return new NamespaceRegistrationTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, duration, undefined, id, registrationType, name);
    }
    static createNamespaceRegistrationTransactionBuilderCHILD(signature, signerPublicKey, version, network, type, fee, deadline, parentId, id, name) {
        const registrationType = NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD;
        return new NamespaceRegistrationTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, undefined, parentId, id, registrationType, name);
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
exports.NamespaceRegistrationTransactionBuilder = NamespaceRegistrationTransactionBuilder;
//# sourceMappingURL=NamespaceRegistrationTransactionBuilder.js.map