import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class AccountAddressRestrictionTransactionBodyBuilder implements Serializer {
    readonly restrictionFlags: AccountRestrictionFlagsDto[];
    readonly restrictionAdditions: UnresolvedAddressDto[];
    readonly restrictionDeletions: UnresolvedAddressDto[];
    constructor(restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedAddressDto[], restrictionDeletions: UnresolvedAddressDto[]);
    static loadFromBinary(payload: Uint8Array): AccountAddressRestrictionTransactionBodyBuilder;
    static createAccountAddressRestrictionTransactionBodyBuilder(restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedAddressDto[], restrictionDeletions: UnresolvedAddressDto[]): AccountAddressRestrictionTransactionBodyBuilder;
    getRestrictionFlags(): AccountRestrictionFlagsDto[];
    getRestrictionAdditions(): UnresolvedAddressDto[];
    getRestrictionDeletions(): UnresolvedAddressDto[];
    getSize(): number;
    serialize(): Uint8Array;
}
