import { Serializer } from './Serializer';
export declare class AddressDto implements Serializer {
    readonly address: Uint8Array;
    constructor(address: Uint8Array);
    static loadFromBinary(payload: Uint8Array): AddressDto;
    getAddress(): Uint8Array;
    getSize(): number;
    serialize(): Uint8Array;
}
