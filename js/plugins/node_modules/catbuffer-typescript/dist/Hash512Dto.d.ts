import { Serializer } from './Serializer';
export declare class Hash512Dto implements Serializer {
    readonly hash512: Uint8Array;
    constructor(hash512: Uint8Array);
    static loadFromBinary(payload: Uint8Array): Hash512Dto;
    getHash512(): Uint8Array;
    getSize(): number;
    serialize(): Uint8Array;
}
