import { Serializer } from './Serializer';
export declare class BlockDurationDto implements Serializer {
    readonly blockDuration: number[];
    constructor(blockDuration: number[]);
    static loadFromBinary(payload: Uint8Array): BlockDurationDto;
    getBlockDuration(): number[];
    getSize(): number;
    serialize(): Uint8Array;
}
