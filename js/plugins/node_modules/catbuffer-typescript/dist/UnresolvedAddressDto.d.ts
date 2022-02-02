import { Serializer } from './Serializer';
export declare class UnresolvedAddressDto implements Serializer {
    readonly unresolvedAddress: Uint8Array;
    constructor(unresolvedAddress: Uint8Array);
    static loadFromBinary(payload: Uint8Array): UnresolvedAddressDto;
    getUnresolvedAddress(): Uint8Array;
    getSize(): number;
    serialize(): Uint8Array;
}
