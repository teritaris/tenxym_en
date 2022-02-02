import { Serializer } from './Serializer';
export declare class DifficultyDto implements Serializer {
    readonly difficulty: number[];
    constructor(difficulty: number[]);
    static loadFromBinary(payload: Uint8Array): DifficultyDto;
    getDifficulty(): number[];
    getSize(): number;
    serialize(): Uint8Array;
}
