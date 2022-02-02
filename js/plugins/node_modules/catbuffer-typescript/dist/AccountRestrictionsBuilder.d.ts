import { AccountRestrictionsInfoBuilder } from './AccountRestrictionsInfoBuilder';
import { AddressDto } from './AddressDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder } from './StateHeaderBuilder';
export declare class AccountRestrictionsBuilder extends StateHeaderBuilder implements Serializer {
    readonly address: AddressDto;
    readonly restrictions: AccountRestrictionsInfoBuilder[];
    constructor(version: number, address: AddressDto, restrictions: AccountRestrictionsInfoBuilder[]);
    static loadFromBinary(payload: Uint8Array): AccountRestrictionsBuilder;
    static createAccountRestrictionsBuilder(version: number, address: AddressDto, restrictions: AccountRestrictionsInfoBuilder[]): AccountRestrictionsBuilder;
    getAddress(): AddressDto;
    getRestrictions(): AccountRestrictionsInfoBuilder[];
    getSize(): number;
    serialize(): Uint8Array;
}
