import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class AccountOperationRestrictionTransactionBodyBuilder implements Serializer {
    readonly restrictionFlags: AccountRestrictionFlagsDto[];
    readonly restrictionAdditions: TransactionTypeDto[];
    readonly restrictionDeletions: TransactionTypeDto[];
    constructor(restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: TransactionTypeDto[], restrictionDeletions: TransactionTypeDto[]);
    static loadFromBinary(payload: Uint8Array): AccountOperationRestrictionTransactionBodyBuilder;
    static createAccountOperationRestrictionTransactionBodyBuilder(restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: TransactionTypeDto[], restrictionDeletions: TransactionTypeDto[]): AccountOperationRestrictionTransactionBodyBuilder;
    getRestrictionFlags(): AccountRestrictionFlagsDto[];
    getRestrictionAdditions(): TransactionTypeDto[];
    getRestrictionDeletions(): TransactionTypeDto[];
    getSize(): number;
    serialize(): Uint8Array;
}
