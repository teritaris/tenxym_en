import { AccountOperationRestrictionTransactionBodyBuilder } from './AccountOperationRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { AmountDto } from './AmountDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class AccountOperationRestrictionTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly accountOperationRestrictionTransactionBody: AccountOperationRestrictionTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: TransactionTypeDto[], restrictionDeletions: TransactionTypeDto[]);
    static loadFromBinary(payload: Uint8Array): AccountOperationRestrictionTransactionBuilder;
    static createAccountOperationRestrictionTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: TransactionTypeDto[], restrictionDeletions: TransactionTypeDto[]): AccountOperationRestrictionTransactionBuilder;
    getRestrictionFlags(): AccountRestrictionFlagsDto[];
    getRestrictionAdditions(): TransactionTypeDto[];
    getRestrictionDeletions(): TransactionTypeDto[];
    getSize(): number;
    getBody(): AccountOperationRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}
