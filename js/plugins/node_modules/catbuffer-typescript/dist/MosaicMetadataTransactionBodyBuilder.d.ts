import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class MosaicMetadataTransactionBodyBuilder implements Serializer {
    readonly targetAddress: UnresolvedAddressDto;
    readonly scopedMetadataKey: number[];
    readonly targetMosaicId: UnresolvedMosaicIdDto;
    readonly valueSizeDelta: number;
    readonly value: Uint8Array;
    constructor(targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], targetMosaicId: UnresolvedMosaicIdDto, valueSizeDelta: number, value: Uint8Array);
    static loadFromBinary(payload: Uint8Array): MosaicMetadataTransactionBodyBuilder;
    static createMosaicMetadataTransactionBodyBuilder(targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], targetMosaicId: UnresolvedMosaicIdDto, valueSizeDelta: number, value: Uint8Array): MosaicMetadataTransactionBodyBuilder;
    getTargetAddress(): UnresolvedAddressDto;
    getScopedMetadataKey(): number[];
    getTargetMosaicId(): UnresolvedMosaicIdDto;
    getValueSizeDelta(): number;
    getValue(): Uint8Array;
    getSize(): number;
    serialize(): Uint8Array;
}
