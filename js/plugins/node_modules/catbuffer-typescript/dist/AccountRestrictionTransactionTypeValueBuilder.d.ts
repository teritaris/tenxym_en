import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class AccountRestrictionTransactionTypeValueBuilder implements Serializer {
    readonly restrictionValues: TransactionTypeDto[];
    constructor(restrictionValues: TransactionTypeDto[]);
    static loadFromBinary(payload: Uint8Array): AccountRestrictionTransactionTypeValueBuilder;
    static createAccountRestrictionTransactionTypeValueBuilder(restrictionValues: TransactionTypeDto[]): AccountRestrictionTransactionTypeValueBuilder;
    getRestrictionValues(): TransactionTypeDto[];
    getSize(): number;
    serialize(): Uint8Array;
}
