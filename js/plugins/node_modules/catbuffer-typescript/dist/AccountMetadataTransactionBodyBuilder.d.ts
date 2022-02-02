import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class AccountMetadataTransactionBodyBuilder implements Serializer {
    readonly targetAddress: UnresolvedAddressDto;
    readonly scopedMetadataKey: number[];
    readonly valueSizeDelta: number;
    readonly value: Uint8Array;
    constructor(targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], valueSizeDelta: number, value: Uint8Array);
    static loadFromBinary(payload: Uint8Array): AccountMetadataTransactionBodyBuilder;
    static createAccountMetadataTransactionBodyBuilder(targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], valueSizeDelta: number, value: Uint8Array): AccountMetadataTransactionBodyBuilder;
    getTargetAddress(): UnresolvedAddressDto;
    getScopedMetadataKey(): number[];
    getValueSizeDelta(): number;
    getValue(): Uint8Array;
    getSize(): number;
    serialize(): Uint8Array;
}
