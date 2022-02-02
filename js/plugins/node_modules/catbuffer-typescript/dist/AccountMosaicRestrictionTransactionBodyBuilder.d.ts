import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class AccountMosaicRestrictionTransactionBodyBuilder implements Serializer {
    readonly restrictionFlags: AccountRestrictionFlagsDto[];
    readonly restrictionAdditions: UnresolvedMosaicIdDto[];
    readonly restrictionDeletions: UnresolvedMosaicIdDto[];
    constructor(restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedMosaicIdDto[], restrictionDeletions: UnresolvedMosaicIdDto[]);
    static loadFromBinary(payload: Uint8Array): AccountMosaicRestrictionTransactionBodyBuilder;
    static createAccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedMosaicIdDto[], restrictionDeletions: UnresolvedMosaicIdDto[]): AccountMosaicRestrictionTransactionBodyBuilder;
    getRestrictionFlags(): AccountRestrictionFlagsDto[];
    getRestrictionAdditions(): UnresolvedMosaicIdDto[];
    getRestrictionDeletions(): UnresolvedMosaicIdDto[];
    getSize(): number;
    serialize(): Uint8Array;
}
