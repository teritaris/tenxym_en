"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHelper = void 0;
const AccountAddressRestrictionTransactionBuilder_1 = require("./AccountAddressRestrictionTransactionBuilder");
const AccountKeyLinkTransactionBuilder_1 = require("./AccountKeyLinkTransactionBuilder");
const AccountMetadataTransactionBuilder_1 = require("./AccountMetadataTransactionBuilder");
const AccountMosaicRestrictionTransactionBuilder_1 = require("./AccountMosaicRestrictionTransactionBuilder");
const AccountOperationRestrictionTransactionBuilder_1 = require("./AccountOperationRestrictionTransactionBuilder");
const AddressAliasTransactionBuilder_1 = require("./AddressAliasTransactionBuilder");
const AggregateBondedTransactionBuilder_1 = require("./AggregateBondedTransactionBuilder");
const AggregateCompleteTransactionBuilder_1 = require("./AggregateCompleteTransactionBuilder");
const HashLockTransactionBuilder_1 = require("./HashLockTransactionBuilder");
const MosaicAddressRestrictionTransactionBuilder_1 = require("./MosaicAddressRestrictionTransactionBuilder");
const MosaicAliasTransactionBuilder_1 = require("./MosaicAliasTransactionBuilder");
const MosaicDefinitionTransactionBuilder_1 = require("./MosaicDefinitionTransactionBuilder");
const MosaicGlobalRestrictionTransactionBuilder_1 = require("./MosaicGlobalRestrictionTransactionBuilder");
const MosaicMetadataTransactionBuilder_1 = require("./MosaicMetadataTransactionBuilder");
const MosaicSupplyChangeTransactionBuilder_1 = require("./MosaicSupplyChangeTransactionBuilder");
const MosaicSupplyRevocationTransactionBuilder_1 = require("./MosaicSupplyRevocationTransactionBuilder");
const MultisigAccountModificationTransactionBuilder_1 = require("./MultisigAccountModificationTransactionBuilder");
const NamespaceMetadataTransactionBuilder_1 = require("./NamespaceMetadataTransactionBuilder");
const NamespaceRegistrationTransactionBuilder_1 = require("./NamespaceRegistrationTransactionBuilder");
const NodeKeyLinkTransactionBuilder_1 = require("./NodeKeyLinkTransactionBuilder");
const SecretLockTransactionBuilder_1 = require("./SecretLockTransactionBuilder");
const SecretProofTransactionBuilder_1 = require("./SecretProofTransactionBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
const TransactionTypeDto_1 = require("./TransactionTypeDto");
const TransferTransactionBuilder_1 = require("./TransferTransactionBuilder");
const VotingKeyLinkTransactionBuilder_1 = require("./VotingKeyLinkTransactionBuilder");
const VrfKeyLinkTransactionBuilder_1 = require("./VrfKeyLinkTransactionBuilder");
class TransactionHelper {
    static loadFromBinary(payload) {
        const header = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.ACCOUNT_KEY_LINK && header.version === 1) {
            return AccountKeyLinkTransactionBuilder_1.AccountKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.NODE_KEY_LINK && header.version === 1) {
            return NodeKeyLinkTransactionBuilder_1.NodeKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.AGGREGATE_COMPLETE && header.version === 1) {
            return AggregateCompleteTransactionBuilder_1.AggregateCompleteTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.AGGREGATE_BONDED && header.version === 1) {
            return AggregateBondedTransactionBuilder_1.AggregateBondedTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.VOTING_KEY_LINK && header.version === 1) {
            return VotingKeyLinkTransactionBuilder_1.VotingKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.VRF_KEY_LINK && header.version === 1) {
            return VrfKeyLinkTransactionBuilder_1.VrfKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.HASH_LOCK && header.version === 1) {
            return HashLockTransactionBuilder_1.HashLockTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.SECRET_LOCK && header.version === 1) {
            return SecretLockTransactionBuilder_1.SecretLockTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.SECRET_PROOF && header.version === 1) {
            return SecretProofTransactionBuilder_1.SecretProofTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.ACCOUNT_METADATA && header.version === 1) {
            return AccountMetadataTransactionBuilder_1.AccountMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MOSAIC_METADATA && header.version === 1) {
            return MosaicMetadataTransactionBuilder_1.MosaicMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.NAMESPACE_METADATA && header.version === 1) {
            return NamespaceMetadataTransactionBuilder_1.NamespaceMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MOSAIC_DEFINITION && header.version === 1) {
            return MosaicDefinitionTransactionBuilder_1.MosaicDefinitionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MOSAIC_SUPPLY_CHANGE && header.version === 1) {
            return MosaicSupplyChangeTransactionBuilder_1.MosaicSupplyChangeTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MOSAIC_SUPPLY_REVOCATION && header.version === 1) {
            return MosaicSupplyRevocationTransactionBuilder_1.MosaicSupplyRevocationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MULTISIG_ACCOUNT_MODIFICATION && header.version === 1) {
            return MultisigAccountModificationTransactionBuilder_1.MultisigAccountModificationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.ADDRESS_ALIAS && header.version === 1) {
            return AddressAliasTransactionBuilder_1.AddressAliasTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MOSAIC_ALIAS && header.version === 1) {
            return MosaicAliasTransactionBuilder_1.MosaicAliasTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.NAMESPACE_REGISTRATION && header.version === 1) {
            return NamespaceRegistrationTransactionBuilder_1.NamespaceRegistrationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.ACCOUNT_ADDRESS_RESTRICTION && header.version === 1) {
            return AccountAddressRestrictionTransactionBuilder_1.AccountAddressRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.ACCOUNT_MOSAIC_RESTRICTION && header.version === 1) {
            return AccountMosaicRestrictionTransactionBuilder_1.AccountMosaicRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.ACCOUNT_OPERATION_RESTRICTION && header.version === 1) {
            return AccountOperationRestrictionTransactionBuilder_1.AccountOperationRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MOSAIC_ADDRESS_RESTRICTION && header.version === 1) {
            return MosaicAddressRestrictionTransactionBuilder_1.MosaicAddressRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.MOSAIC_GLOBAL_RESTRICTION && header.version === 1) {
            return MosaicGlobalRestrictionTransactionBuilder_1.MosaicGlobalRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto_1.TransactionTypeDto.TRANSFER && header.version === 1) {
            return TransferTransactionBuilder_1.TransferTransactionBuilder.loadFromBinary(payload);
        }
        return header;
    }
}
exports.TransactionHelper = TransactionHelper;
//# sourceMappingURL=TransactionHelper.js.map