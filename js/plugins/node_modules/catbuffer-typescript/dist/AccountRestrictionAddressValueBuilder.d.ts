import { AddressDto } from './AddressDto';
import { Serializer } from './Serializer';
export declare class AccountRestrictionAddressValueBuilder implements Serializer {
    readonly restrictionValues: AddressDto[];
    constructor(restrictionValues: AddressDto[]);
    static loadFromBinary(payload: Uint8Array): AccountRestrictionAddressValueBuilder;
    static createAccountRestrictionAddressValueBuilder(restrictionValues: AddressDto[]): AccountRestrictionAddressValueBuilder;
    getRestrictionValues(): AddressDto[];
    getSize(): number;
    serialize(): Uint8Array;
}
