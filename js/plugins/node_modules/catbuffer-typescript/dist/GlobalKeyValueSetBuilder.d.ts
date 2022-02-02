import { GlobalKeyValueBuilder } from './GlobalKeyValueBuilder';
import { Serializer } from './Serializer';
export declare class GlobalKeyValueSetBuilder implements Serializer {
    readonly keys: GlobalKeyValueBuilder[];
    constructor(keys: GlobalKeyValueBuilder[]);
    static loadFromBinary(payload: Uint8Array): GlobalKeyValueSetBuilder;
    static createGlobalKeyValueSetBuilder(keys: GlobalKeyValueBuilder[]): GlobalKeyValueSetBuilder;
    getKeys(): GlobalKeyValueBuilder[];
    getSize(): number;
    serialize(): Uint8Array;
}
