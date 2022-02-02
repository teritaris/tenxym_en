import { AccountMosaicRestrictionTransactionBodyBuilder } from './AccountMosaicRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { AmountDto } from './AmountDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class AccountMosaicRestrictionTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly accountMosaicRestrictionTransactionBody: AccountMosaicRestrictionTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedMosaicIdDto[], restrictionDeletions: UnresolvedMosaicIdDto[]);
    static loadFromBinary(payload: Uint8Array): AccountMosaicRestrictionTransactionBuilder;
    static createAccountMosaicRestrictionTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedMosaicIdDto[], restrictionDeletions: UnresolvedMosaicIdDto[]): AccountMosaicRestrictionTransactionBuilder;
    getRestrictionFlags(): AccountRestrictionFlagsDto[];
    getRestrictionAdditions(): UnresolvedMosaicIdDto[];
    getRestrictionDeletions(): UnresolvedMosaicIdDto[];
    getSize(): number;
    getBody(): AccountMosaicRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}
