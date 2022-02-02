import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceMetadataTransactionBodyBuilder } from './NamespaceMetadataTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class EmbeddedNamespaceMetadataTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly namespaceMetadataTransactionBody: NamespaceMetadataTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], targetNamespaceId: NamespaceIdDto, valueSizeDelta: number, value: Uint8Array);
    static loadFromBinary(payload: Uint8Array): EmbeddedNamespaceMetadataTransactionBuilder;
    static createEmbeddedNamespaceMetadataTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], targetNamespaceId: NamespaceIdDto, valueSizeDelta: number, value: Uint8Array): EmbeddedNamespaceMetadataTransactionBuilder;
    getTargetAddress(): UnresolvedAddressDto;
    getScopedMetadataKey(): number[];
    getTargetNamespaceId(): NamespaceIdDto;
    getValueSizeDelta(): number;
    getValue(): Uint8Array;
    getSize(): number;
    getBody(): NamespaceMetadataTransactionBodyBuilder;
    serialize(): Uint8Array;
}
