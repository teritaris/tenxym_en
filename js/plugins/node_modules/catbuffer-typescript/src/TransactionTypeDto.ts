/**
 *** Copyright (c) 2016-2019, Jaguar0625, gimre, BloodyRookie, Tech Bureau, Corp.
 *** Copyright (c) 2020-present, Jaguar0625, gimre, BloodyRookie.
 *** All rights reserved.
 ***
 *** This file is part of Catapult.
 ***
 *** Catapult is free software: you can redistribute it and/or modify
 *** it under the terms of the GNU Lesser General Public License as published by
 *** the Free Software Foundation, either version 3 of the License, or
 *** (at your option) any later version.
 ***
 *** Catapult is distributed in the hope that it will be useful,
 *** but WITHOUT ANY WARRANTY; without even the implied warranty of
 *** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *** GNU Lesser General Public License for more details.
 ***
 *** You should have received a copy of the GNU Lesser General Public License
 *** along with Catapult. If not, see <http://www.gnu.org/licenses/>.
 **/

/**
 * Enumeration of Transaction types
 **/
export enum TransactionTypeDto {
    /** AccountKeyLinkTransaction. */
    ACCOUNT_KEY_LINK = 16716,

    /** NodeKeyLinkTransaction. */
    NODE_KEY_LINK = 16972,

    /** AggregateCompleteTransaction. */
    AGGREGATE_COMPLETE = 16705,

    /** AggregateBondedTransaction. */
    AGGREGATE_BONDED = 16961,

    /** VotingKeyLinkTransaction. */
    VOTING_KEY_LINK = 16707,

    /** VrfKeyLinkTransaction. */
    VRF_KEY_LINK = 16963,

    /** HashLockTransaction. */
    HASH_LOCK = 16712,

    /** SecretLockTransaction. */
    SECRET_LOCK = 16722,

    /** SecretProofTransaction. */
    SECRET_PROOF = 16978,

    /** AccountMetadataTransaction. */
    ACCOUNT_METADATA = 16708,

    /** MosaicMetadataTransaction. */
    MOSAIC_METADATA = 16964,

    /** NamespaceMetadataTransaction. */
    NAMESPACE_METADATA = 17220,

    /** MosaicDefinitionTransaction. */
    MOSAIC_DEFINITION = 16717,

    /** MosaicSupplyChangeTransaction. */
    MOSAIC_SUPPLY_CHANGE = 16973,

    /** MosaicSupplyRevocationTransaction. */
    MOSAIC_SUPPLY_REVOCATION = 17229,

    /** MultisigAccountModificationTransaction. */
    MULTISIG_ACCOUNT_MODIFICATION = 16725,

    /** AddressAliasTransaction. */
    ADDRESS_ALIAS = 16974,

    /** MosaicAliasTransaction. */
    MOSAIC_ALIAS = 17230,

    /** NamespaceRegistrationTransaction. */
    NAMESPACE_REGISTRATION = 16718,

    /** AccountAddressRestrictionTransaction. */
    ACCOUNT_ADDRESS_RESTRICTION = 16720,

    /** AccountMosaicRestrictionTransaction. */
    ACCOUNT_MOSAIC_RESTRICTION = 16976,

    /** AccountOperationRestrictionTransaction. */
    ACCOUNT_OPERATION_RESTRICTION = 17232,

    /** MosaicAddressRestrictionTransaction. */
    MOSAIC_ADDRESS_RESTRICTION = 16977,

    /** MosaicGlobalRestrictionTransaction. */
    MOSAIC_GLOBAL_RESTRICTION = 16721,

    /** TransferTransaction. */
    TRANSFER = 16724,
}
