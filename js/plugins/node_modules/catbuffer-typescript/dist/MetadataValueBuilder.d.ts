import { Serializer } from './Serializer';
export declare class MetadataValueBuilder implements Serializer {
    readonly data: Uint8Array;
    constructor(data: Uint8Array);
    static loadFromBinary(payload: Uint8Array): MetadataValueBuilder;
    static createMetadataValueBuilder(data: Uint8Array): MetadataValueBuilder;
    getData(): Uint8Array;
    getSize(): number;
    serialize(): Uint8Array;
}
