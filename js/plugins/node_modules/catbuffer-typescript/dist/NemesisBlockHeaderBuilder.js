"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NemesisBlockHeaderBuilder = void 0;
const BlockHeaderBuilder_1 = require("./BlockHeaderBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const ImportanceBlockFooterBuilder_1 = require("./ImportanceBlockFooterBuilder");
class NemesisBlockHeaderBuilder extends BlockHeaderBuilder_1.BlockHeaderBuilder {
    constructor(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier, votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash) {
        super(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier);
        this.importanceBlockFooter = new ImportanceBlockFooterBuilder_1.ImportanceBlockFooterBuilder(votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = BlockHeaderBuilder_1.BlockHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const importanceBlockFooter = ImportanceBlockFooterBuilder_1.ImportanceBlockFooterBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, importanceBlockFooter.getSize());
        return new NemesisBlockHeaderBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.height, superObject.timestamp, superObject.difficulty, superObject.generationHashProof, superObject.previousBlockHash, superObject.transactionsHash, superObject.receiptsHash, superObject.stateHash, superObject.beneficiaryAddress, superObject.feeMultiplier, importanceBlockFooter.votingEligibleAccountsCount, importanceBlockFooter.harvestingEligibleAccountsCount, importanceBlockFooter.totalVotingBalance, importanceBlockFooter.previousImportanceBlockHash);
    }
    static createNemesisBlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier, votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash) {
        return new NemesisBlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier, votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash);
    }
    getVotingEligibleAccountsCount() {
        return this.importanceBlockFooter.getVotingEligibleAccountsCount();
    }
    getHarvestingEligibleAccountsCount() {
        return this.importanceBlockFooter.getHarvestingEligibleAccountsCount();
    }
    getTotalVotingBalance() {
        return this.importanceBlockFooter.getTotalVotingBalance();
    }
    getPreviousImportanceBlockHash() {
        return this.importanceBlockFooter.getPreviousImportanceBlockHash();
    }
    getSize() {
        let size = super.getSize();
        size += this.importanceBlockFooter.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const importanceBlockFooterBytes = this.importanceBlockFooter.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, importanceBlockFooterBytes);
        return newArray;
    }
}
exports.NemesisBlockHeaderBuilder = NemesisBlockHeaderBuilder;
//# sourceMappingURL=NemesisBlockHeaderBuilder.js.map