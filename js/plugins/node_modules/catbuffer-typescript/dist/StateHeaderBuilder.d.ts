import { Serializer } from './Serializer';
export declare class StateHeaderBuilder implements Serializer {
    readonly version: number;
    constructor(version: number);
    static loadFromBinary(payload: Uint8Array): StateHeaderBuilder;
    static createStateHeaderBuilder(version: number): StateHeaderBuilder;
    getVersion(): number;
    getSize(): number;
    serialize(): Uint8Array;
}
