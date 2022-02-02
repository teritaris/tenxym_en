import { MosaicRestrictionKeyDto } from './MosaicRestrictionKeyDto';
import { Serializer } from './Serializer';
export declare class AddressKeyValueBuilder implements Serializer {
    readonly key: MosaicRestrictionKeyDto;
    readonly value: number[];
    constructor(key: MosaicRestrictionKeyDto, value: number[]);
    static loadFromBinary(payload: Uint8Array): AddressKeyValueBuilder;
    static createAddressKeyValueBuilder(key: MosaicRestrictionKeyDto, value: number[]): AddressKeyValueBuilder;
    getKey(): MosaicRestrictionKeyDto;
    getValue(): number[];
    getSize(): number;
    serialize(): Uint8Array;
}
