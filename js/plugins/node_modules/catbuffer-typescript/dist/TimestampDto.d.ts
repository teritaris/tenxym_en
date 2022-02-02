import { Serializer } from './Serializer';
export declare class TimestampDto implements Serializer {
    readonly timestamp: number[];
    constructor(timestamp: number[]);
    static loadFromBinary(payload: Uint8Array): TimestampDto;
    getTimestamp(): number[];
    getSize(): number;
    serialize(): Uint8Array;
}
