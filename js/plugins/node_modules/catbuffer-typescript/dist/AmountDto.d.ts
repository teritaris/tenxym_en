import { Serializer } from './Serializer';
export declare class AmountDto implements Serializer {
    readonly amount: number[];
    constructor(amount: number[]);
    static loadFromBinary(payload: Uint8Array): AmountDto;
    getAmount(): number[];
    getSize(): number;
    serialize(): Uint8Array;
}
