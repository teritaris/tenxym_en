import { AddressDto } from './AddressDto';
import { MetadataTypeDto } from './MetadataTypeDto';
import { MetadataValueBuilder } from './MetadataValueBuilder';
import { ScopedMetadataKeyDto } from './ScopedMetadataKeyDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder } from './StateHeaderBuilder';
export declare class MetadataEntryBuilder extends StateHeaderBuilder implements Serializer {
    readonly sourceAddress: AddressDto;
    readonly targetAddress: AddressDto;
    readonly scopedMetadataKey: ScopedMetadataKeyDto;
    readonly targetId: number[];
    readonly metadataType: MetadataTypeDto;
    readonly value: MetadataValueBuilder;
    constructor(version: number, sourceAddress: AddressDto, targetAddress: AddressDto, scopedMetadataKey: ScopedMetadataKeyDto, targetId: number[], metadataType: MetadataTypeDto, value: MetadataValueBuilder);
    static loadFromBinary(payload: Uint8Array): MetadataEntryBuilder;
    static createMetadataEntryBuilder(version: number, sourceAddress: AddressDto, targetAddress: AddressDto, scopedMetadataKey: ScopedMetadataKeyDto, targetId: number[], metadataType: MetadataTypeDto, value: MetadataValueBuilder): MetadataEntryBuilder;
    getSourceAddress(): AddressDto;
    getTargetAddress(): AddressDto;
    getScopedMetadataKey(): ScopedMetadataKeyDto;
    getTargetId(): number[];
    getMetadataType(): MetadataTypeDto;
    getValue(): MetadataValueBuilder;
    getSize(): number;
    serialize(): Uint8Array;
}
