import { AddressKeyValueBuilder } from './AddressKeyValueBuilder';
import { Serializer } from './Serializer';
export declare class AddressKeyValueSetBuilder implements Serializer {
    readonly keys: AddressKeyValueBuilder[];
    constructor(keys: AddressKeyValueBuilder[]);
    static loadFromBinary(payload: Uint8Array): AddressKeyValueSetBuilder;
    static createAddressKeyValueSetBuilder(keys: AddressKeyValueBuilder[]): AddressKeyValueSetBuilder;
    getKeys(): AddressKeyValueBuilder[];
    getSize(): number;
    serialize(): Uint8Array;
}
