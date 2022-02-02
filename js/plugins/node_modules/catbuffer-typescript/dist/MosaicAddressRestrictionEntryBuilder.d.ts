import { AddressDto } from './AddressDto';
import { AddressKeyValueSetBuilder } from './AddressKeyValueSetBuilder';
import { MosaicIdDto } from './MosaicIdDto';
import { Serializer } from './Serializer';
export declare class MosaicAddressRestrictionEntryBuilder implements Serializer {
    readonly mosaicId: MosaicIdDto;
    readonly address: AddressDto;
    readonly keyPairs: AddressKeyValueSetBuilder;
    constructor(mosaicId: MosaicIdDto, address: AddressDto, keyPairs: AddressKeyValueSetBuilder);
    static loadFromBinary(payload: Uint8Array): MosaicAddressRestrictionEntryBuilder;
    static createMosaicAddressRestrictionEntryBuilder(mosaicId: MosaicIdDto, address: AddressDto, keyPairs: AddressKeyValueSetBuilder): MosaicAddressRestrictionEntryBuilder;
    getMosaicId(): MosaicIdDto;
    getAddress(): AddressDto;
    getKeyPairs(): AddressKeyValueSetBuilder;
    getSize(): number;
    serialize(): Uint8Array;
}
