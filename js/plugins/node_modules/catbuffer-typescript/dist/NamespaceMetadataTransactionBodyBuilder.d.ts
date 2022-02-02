import { NamespaceIdDto } from './NamespaceIdDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class NamespaceMetadataTransactionBodyBuilder implements Serializer {
    readonly targetAddress: UnresolvedAddressDto;
    readonly scopedMetadataKey: number[];
    readonly targetNamespaceId: NamespaceIdDto;
    readonly valueSizeDelta: number;
    readonly value: Uint8Array;
    constructor(targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], targetNamespaceId: NamespaceIdDto, valueSizeDelta: number, value: Uint8Array);
    static loadFromBinary(payload: Uint8Array): NamespaceMetadataTransactionBodyBuilder;
    static createNamespaceMetadataTransactionBodyBuilder(targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], targetNamespaceId: NamespaceIdDto, valueSizeDelta: number, value: Uint8Array): NamespaceMetadataTransactionBodyBuilder;
    getTargetAddress(): UnresolvedAddressDto;
    getScopedMetadataKey(): number[];
    getTargetNamespaceId(): NamespaceIdDto;
    getValueSizeDelta(): number;
    getValue(): Uint8Array;
    getSize(): number;
    serialize(): Uint8Array;
}
