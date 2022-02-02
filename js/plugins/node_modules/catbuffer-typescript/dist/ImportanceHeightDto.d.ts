import { Serializer } from './Serializer';
export declare class ImportanceHeightDto implements Serializer {
    readonly importanceHeight: number[];
    constructor(importanceHeight: number[]);
    static loadFromBinary(payload: Uint8Array): ImportanceHeightDto;
    getImportanceHeight(): number[];
    getSize(): number;
    serialize(): Uint8Array;
}
