import { AddressAliasTransactionBodyBuilder } from './AddressAliasTransactionBodyBuilder';
import { AddressDto } from './AddressDto';
import { AliasActionDto } from './AliasActionDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class EmbeddedAddressAliasTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly addressAliasTransactionBody: AddressAliasTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, namespaceId: NamespaceIdDto, address: AddressDto, aliasAction: AliasActionDto);
    static loadFromBinary(payload: Uint8Array): EmbeddedAddressAliasTransactionBuilder;
    static createEmbeddedAddressAliasTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, namespaceId: NamespaceIdDto, address: AddressDto, aliasAction: AliasActionDto): EmbeddedAddressAliasTransactionBuilder;
    getNamespaceId(): NamespaceIdDto;
    getAddress(): AddressDto;
    getAliasAction(): AliasActionDto;
    getSize(): number;
    getBody(): AddressAliasTransactionBodyBuilder;
    serialize(): Uint8Array;
}
