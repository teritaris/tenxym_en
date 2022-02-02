import { AddressDto } from './AddressDto';
import { AliasActionDto } from './AliasActionDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { Serializer } from './Serializer';
export declare class AddressAliasTransactionBodyBuilder implements Serializer {
    readonly namespaceId: NamespaceIdDto;
    readonly address: AddressDto;
    readonly aliasAction: AliasActionDto;
    constructor(namespaceId: NamespaceIdDto, address: AddressDto, aliasAction: AliasActionDto);
    static loadFromBinary(payload: Uint8Array): AddressAliasTransactionBodyBuilder;
    static createAddressAliasTransactionBodyBuilder(namespaceId: NamespaceIdDto, address: AddressDto, aliasAction: AliasActionDto): AddressAliasTransactionBodyBuilder;
    getNamespaceId(): NamespaceIdDto;
    getAddress(): AddressDto;
    getAliasAction(): AliasActionDto;
    getSize(): number;
    serialize(): Uint8Array;
}
