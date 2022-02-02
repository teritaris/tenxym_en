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

import { AccountAddressRestrictionTransactionBuilder } from './AccountAddressRestrictionTransactionBuilder';
import { AccountKeyLinkTransactionBuilder } from './AccountKeyLinkTransactionBuilder';
import { AccountMetadataTransactionBuilder } from './AccountMetadataTransactionBuilder';
import { AccountMosaicRestrictionTransactionBuilder } from './AccountMosaicRestrictionTransactionBuilder';
import { AccountOperationRestrictionTransactionBuilder } from './AccountOperationRestrictionTransactionBuilder';
import { AddressAliasTransactionBuilder } from './AddressAliasTransactionBuilder';
import { AggregateBondedTransactionBuilder } from './AggregateBondedTransactionBuilder';
import { AggregateCompleteTransactionBuilder } from './AggregateCompleteTransactionBuilder';
import { HashLockTransactionBuilder } from './HashLockTransactionBuilder';
import { MosaicAddressRestrictionTransactionBuilder } from './MosaicAddressRestrictionTransactionBuilder';
import { MosaicAliasTransactionBuilder } from './MosaicAliasTransactionBuilder';
import { MosaicDefinitionTransactionBuilder } from './MosaicDefinitionTransactionBuilder';
import { MosaicGlobalRestrictionTransactionBuilder } from './MosaicGlobalRestrictionTransactionBuilder';
import { MosaicMetadataTransactionBuilder } from './MosaicMetadataTransactionBuilder';
import { MosaicSupplyChangeTransactionBuilder } from './MosaicSupplyChangeTransactionBuilder';
import { MosaicSupplyRevocationTransactionBuilder } from './MosaicSupplyRevocationTransactionBuilder';
import { MultisigAccountModificationTransactionBuilder } from './MultisigAccountModificationTransactionBuilder';
import { NamespaceMetadataTransactionBuilder } from './NamespaceMetadataTransactionBuilder';
import { NamespaceRegistrationTransactionBuilder } from './NamespaceRegistrationTransactionBuilder';
import { NodeKeyLinkTransactionBuilder } from './NodeKeyLinkTransactionBuilder';
import { SecretLockTransactionBuilder } from './SecretLockTransactionBuilder';
import { SecretProofTransactionBuilder } from './SecretProofTransactionBuilder';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { TransferTransactionBuilder } from './TransferTransactionBuilder';
import { VotingKeyLinkTransactionBuilder } from './VotingKeyLinkTransactionBuilder';
import { VrfKeyLinkTransactionBuilder } from './VrfKeyLinkTransactionBuilder';

/** Helper class for embedded transaction serialization */
export class TransactionHelper {
    /** Deserialize an transaction builder from binary */
    public static loadFromBinary(payload: Uint8Array): TransactionBuilder {
        const header = TransactionBuilder.loadFromBinary(payload);
        if (header.type === TransactionTypeDto.ACCOUNT_KEY_LINK && header.version === 1) {
            return AccountKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.NODE_KEY_LINK && header.version === 1) {
            return NodeKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.AGGREGATE_COMPLETE && header.version === 1) {
            return AggregateCompleteTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.AGGREGATE_BONDED && header.version === 1) {
            return AggregateBondedTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.VOTING_KEY_LINK && header.version === 1) {
            return VotingKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.VRF_KEY_LINK && header.version === 1) {
            return VrfKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.HASH_LOCK && header.version === 1) {
            return HashLockTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.SECRET_LOCK && header.version === 1) {
            return SecretLockTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.SECRET_PROOF && header.version === 1) {
            return SecretProofTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.ACCOUNT_METADATA && header.version === 1) {
            return AccountMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.MOSAIC_METADATA && header.version === 1) {
            return MosaicMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.NAMESPACE_METADATA && header.version === 1) {
            return NamespaceMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.MOSAIC_DEFINITION && header.version === 1) {
            return MosaicDefinitionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.MOSAIC_SUPPLY_CHANGE && header.version === 1) {
            return MosaicSupplyChangeTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.MOSAIC_SUPPLY_REVOCATION && header.version === 1) {
            return MosaicSupplyRevocationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.MULTISIG_ACCOUNT_MODIFICATION && header.version === 1) {
            return MultisigAccountModificationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.ADDRESS_ALIAS && header.version === 1) {
            return AddressAliasTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.MOSAIC_ALIAS && header.version === 1) {
            return MosaicAliasTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.NAMESPACE_REGISTRATION && header.version === 1) {
            return NamespaceRegistrationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.ACCOUNT_ADDRESS_RESTRICTION && header.version === 1) {
            return AccountAddressRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.ACCOUNT_MOSAIC_RESTRICTION && header.version === 1) {
            return AccountMosaicRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.ACCOUNT_OPERATION_RESTRICTION && header.version === 1) {
            return AccountOperationRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.MOSAIC_ADDRESS_RESTRICTION && header.version === 1) {
            return MosaicAddressRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.MOSAIC_GLOBAL_RESTRICTION && header.version === 1) {
            return MosaicGlobalRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === TransactionTypeDto.TRANSFER && header.version === 1) {
            return TransferTransactionBuilder.loadFromBinary(payload);
        }

        return header;
    }
}
