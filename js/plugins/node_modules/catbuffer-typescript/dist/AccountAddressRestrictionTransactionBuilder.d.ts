import { AccountAddressRestrictionTransactionBodyBuilder } from './AccountAddressRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { AmountDto } from './AmountDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class AccountAddressRestrictionTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly accountAddressRestrictionTransactionBody: AccountAddressRestrictionTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedAddressDto[], restrictionDeletions: UnresolvedAddressDto[]);
    static loadFromBinary(payload: Uint8Array): AccountAddressRestrictionTransactionBuilder;
    static createAccountAddressRestrictionTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedAddressDto[], restrictionDeletions: UnresolvedAddressDto[]): AccountAddressRestrictionTransactionBuilder;
    getRestrictionFlags(): AccountRestrictionFlagsDto[];
    getRestrictionAdditions(): UnresolvedAddressDto[];
    getRestrictionDeletions(): UnresolvedAddressDto[];
    getSize(): number;
    getBody(): AccountAddressRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}
