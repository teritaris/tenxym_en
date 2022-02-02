"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedTransactionHelper = void 0;
const EmbeddedAccountAddressRestrictionTransactionBuilder_1 = require("./EmbeddedAccountAddressRestrictionTransactionBuilder");
const EmbeddedAccountKeyLinkTransactionBuilder_1 = require("./EmbeddedAccountKeyLinkTransactionBuilder");
const EmbeddedAccountMetadataTransactionBuilder_1 = require("./EmbeddedAccountMetadataTransactionBuilder");
const EmbeddedAccountMosaicRestrictionTransactionBuilder_1 = require("./EmbeddedAccountMosaicRestrictionTransactionBuilder");
const EmbeddedAccountOperationRestrictionTransactionBuilder_1 = require("./EmbeddedAccountOperationRestrictionTransactionBuilder");
const EmbeddedAddressAliasTransactionBuilder_1 = require("./EmbeddedAddressAliasTransactionBuilder");
const EmbeddedHashLockTransactionBuilder_1 = require("./EmbeddedHashLockTransactionBuilder");
const EmbeddedMosaicAddressRestrictionTransactionBuilder_1 = require("./EmbeddedMosaicAddressRestrictionTransactionBuilder");
const EmbeddedMosaicAliasTransactionBuilder_1 = require("./EmbeddedMosaicAliasTransactionBuilder");
const EmbeddedMosaicDefinitionTransactionBuilder_1 = require("./EmbeddedMosaicDefinitionTransactionBuilder");
const EmbeddedMosaicGlobalRestrictionTransactionBuilder_1 = require("./EmbeddedMosaicGlobalRestrictionTransactionBuilder");
const EmbeddedMosaicMetadataTransactionBuilder_1 = require("./EmbeddedMosaicMetadataTransactionBuilder");
const EmbeddedMosaicSupplyChangeTransactionBuilder_1 = require("./EmbeddedMosaicSupplyChangeTransactionBuilder");
const EmbeddedMosaicSupplyRevocationTransactionBuilder_1 = require("./EmbeddedMosaicSupplyRevocationTransactionBuilder");
const EmbeddedMultisigAccountModificationTransactionBuilder_1 = require("./EmbeddedMultisigAccountModificationTransactionBuilder");
const EmbeddedNamespaceMetadataTransactionBuilder_1 = require("./EmbeddedNamespaceMetadataTransactionBuilder");
const EmbeddedNamespaceRegistrationTransactionBuilder_1 = require("./EmbeddedNamespaceRegistrationTransactionBuilder");
const EmbeddedNodeKeyLinkTransactionBuilder_1 = require("./EmbeddedNodeKeyLinkTransactionBuilder");
const EmbeddedSecretLockTransactionBuilder_1 = require("./EmbeddedSecretLockTransactionBuilder");
const EmbeddedSecretProofTransactionBuilder_1 = require("./EmbeddedSecretProofTransactionBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EmbeddedTransferTransactionBuilder_1 = require("./EmbeddedTransferTransactionBuilder");
const EmbeddedVotingKeyLinkTransactionBuilder_1 = require("./EmbeddedVotingKeyLinkTransactionBuilder");
const EmbeddedVrfKeyLinkTransactionBuilder_1 = require("./EmbeddedVrfKeyLinkTransactionBuilder");
const TransactionTypeDto_1 = require("./TransactionTypeDto");
class EmbeddedTransactionHelper {
    static loadFromBinary(payload) {
        const header = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.ACCOUNT_KEY_LINK && header.version == 1) {
            return EmbeddedAccountKeyLinkTransactionBuilder_1.EmbeddedAccountKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.NODE_KEY_LINK && header.version == 1) {
            return EmbeddedNodeKeyLinkTransactionBuilder_1.EmbeddedNodeKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.VOTING_KEY_LINK && header.version == 1) {
            return EmbeddedVotingKeyLinkTransactionBuilder_1.EmbeddedVotingKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.VRF_KEY_LINK && header.version == 1) {
            return EmbeddedVrfKeyLinkTransactionBuilder_1.EmbeddedVrfKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.HASH_LOCK && header.version == 1) {
            return EmbeddedHashLockTransactionBuilder_1.EmbeddedHashLockTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.SECRET_LOCK && header.version == 1) {
            return EmbeddedSecretLockTransactionBuilder_1.EmbeddedSecretLockTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.SECRET_PROOF && header.version == 1) {
            return EmbeddedSecretProofTransactionBuilder_1.EmbeddedSecretProofTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.ACCOUNT_METADATA && header.version == 1) {
            return EmbeddedAccountMetadataTransactionBuilder_1.EmbeddedAccountMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MOSAIC_METADATA && header.version == 1) {
            return EmbeddedMosaicMetadataTransactionBuilder_1.EmbeddedMosaicMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.NAMESPACE_METADATA && header.version == 1) {
            return EmbeddedNamespaceMetadataTransactionBuilder_1.EmbeddedNamespaceMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MOSAIC_DEFINITION && header.version == 1) {
            return EmbeddedMosaicDefinitionTransactionBuilder_1.EmbeddedMosaicDefinitionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MOSAIC_SUPPLY_CHANGE && header.version == 1) {
            return EmbeddedMosaicSupplyChangeTransactionBuilder_1.EmbeddedMosaicSupplyChangeTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MOSAIC_SUPPLY_REVOCATION && header.version == 1) {
            return EmbeddedMosaicSupplyRevocationTransactionBuilder_1.EmbeddedMosaicSupplyRevocationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MULTISIG_ACCOUNT_MODIFICATION && header.version == 1) {
            return EmbeddedMultisigAccountModificationTransactionBuilder_1.EmbeddedMultisigAccountModificationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.ADDRESS_ALIAS && header.version == 1) {
            return EmbeddedAddressAliasTransactionBuilder_1.EmbeddedAddressAliasTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MOSAIC_ALIAS && header.version == 1) {
            return EmbeddedMosaicAliasTransactionBuilder_1.EmbeddedMosaicAliasTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.NAMESPACE_REGISTRATION && header.version == 1) {
            return EmbeddedNamespaceRegistrationTransactionBuilder_1.EmbeddedNamespaceRegistrationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.ACCOUNT_ADDRESS_RESTRICTION && header.version == 1) {
            return EmbeddedAccountAddressRestrictionTransactionBuilder_1.EmbeddedAccountAddressRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.ACCOUNT_MOSAIC_RESTRICTION && header.version == 1) {
            return EmbeddedAccountMosaicRestrictionTransactionBuilder_1.EmbeddedAccountMosaicRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.ACCOUNT_OPERATION_RESTRICTION && header.version == 1) {
            return EmbeddedAccountOperationRestrictionTransactionBuilder_1.EmbeddedAccountOperationRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MOSAIC_ADDRESS_RESTRICTION && header.version == 1) {
            return EmbeddedMosaicAddressRestrictionTransactionBuilder_1.EmbeddedMosaicAddressRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MOSAIC_GLOBAL_RESTRICTION && header.version == 1) {
            return EmbeddedMosaicGlobalRestrictionTransactionBuilder_1.EmbeddedMosaicGlobalRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.TRANSFER && header.version == 1) {
            return EmbeddedTransferTransactionBuilder_1.EmbeddedTransferTransactionBuilder.loadFromBinary(payload);
        }
        return header;
    }
}
exports.EmbeddedTransactionHelper = EmbeddedTransactionHelper;
//# sourceMappingURL=EmbeddedTransactionHelper.js.map