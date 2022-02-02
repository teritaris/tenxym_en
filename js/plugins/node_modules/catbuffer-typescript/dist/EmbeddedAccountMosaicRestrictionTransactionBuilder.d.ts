import { AccountMosaicRestrictionTransactionBodyBuilder } from './AccountMosaicRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class EmbeddedAccountMosaicRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly accountMosaicRestrictionTransactionBody: AccountMosaicRestrictionTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedMosaicIdDto[], restrictionDeletions: UnresolvedMosaicIdDto[]);
    static loadFromBinary(payload: Uint8Array): EmbeddedAccountMosaicRestrictionTransactionBuilder;
    static createEmbeddedAccountMosaicRestrictionTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedMosaicIdDto[], restrictionDeletions: UnresolvedMosaicIdDto[]): EmbeddedAccountMosaicRestrictionTransactionBuilder;
    getRestrictionFlags(): AccountRestrictionFlagsDto[];
    getRestrictionAdditions(): UnresolvedMosaicIdDto[];
    getRestrictionDeletions(): UnresolvedMosaicIdDto[];
    getSize(): number;
    getBody(): AccountMosaicRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}
