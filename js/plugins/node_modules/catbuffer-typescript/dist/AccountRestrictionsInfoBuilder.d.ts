import { AccountRestrictionAddressValueBuilder } from './AccountRestrictionAddressValueBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { AccountRestrictionMosaicValueBuilder } from './AccountRestrictionMosaicValueBuilder';
import { AccountRestrictionTransactionTypeValueBuilder } from './AccountRestrictionTransactionTypeValueBuilder';
import { Serializer } from './Serializer';
export declare class AccountRestrictionsInfoBuilder implements Serializer {
    readonly restrictionFlags: AccountRestrictionFlagsDto[];
    readonly addressRestrictions?: AccountRestrictionAddressValueBuilder;
    readonly mosaicIdRestrictions?: AccountRestrictionMosaicValueBuilder;
    readonly transactionTypeRestrictions?: AccountRestrictionTransactionTypeValueBuilder;
    constructor(restrictionFlags: AccountRestrictionFlagsDto[], addressRestrictions: AccountRestrictionAddressValueBuilder | undefined, mosaicIdRestrictions: AccountRestrictionMosaicValueBuilder | undefined, transactionTypeRestrictions: AccountRestrictionTransactionTypeValueBuilder | undefined);
    static loadFromBinary(payload: Uint8Array): AccountRestrictionsInfoBuilder;
    static createAccountRestrictionsInfoBuilder(restrictionFlags: AccountRestrictionFlagsDto[], addressRestrictions: AccountRestrictionAddressValueBuilder, mosaicIdRestrictions: AccountRestrictionMosaicValueBuilder, transactionTypeRestrictions: AccountRestrictionTransactionTypeValueBuilder): AccountRestrictionsInfoBuilder;
    getRestrictionFlags(): AccountRestrictionFlagsDto[];
    getAddressRestrictions(): AccountRestrictionAddressValueBuilder;
    getMosaicIdRestrictions(): AccountRestrictionMosaicValueBuilder;
    getTransactionTypeRestrictions(): AccountRestrictionTransactionTypeValueBuilder;
    getSize(): number;
    serialize(): Uint8Array;
}
