import { Serializer } from './Serializer';
export declare class ScopedMetadataKeyDto implements Serializer {
    readonly scopedMetadataKey: number[];
    constructor(scopedMetadataKey: number[]);
    static loadFromBinary(payload: Uint8Array): ScopedMetadataKeyDto;
    getScopedMetadataKey(): number[];
    getSize(): number;
    serialize(): Uint8Array;
}
