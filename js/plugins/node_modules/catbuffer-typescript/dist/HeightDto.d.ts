import { Serializer } from './Serializer';
export declare class HeightDto implements Serializer {
    readonly height: number[];
    constructor(height: number[]);
    static loadFromBinary(payload: Uint8Array): HeightDto;
    getHeight(): number[];
    getSize(): number;
    serialize(): Uint8Array;
}
