import { Serializer } from './Serializer';
export declare class ImportanceDto implements Serializer {
    readonly importance: number[];
    constructor(importance: number[]);
    static loadFromBinary(payload: Uint8Array): ImportanceDto;
    getImportance(): number[];
    getSize(): number;
    serialize(): Uint8Array;
}
