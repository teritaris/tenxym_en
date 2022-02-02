import { GlobalKeyValueSetBuilder } from './GlobalKeyValueSetBuilder';
import { MosaicIdDto } from './MosaicIdDto';
import { Serializer } from './Serializer';
export declare class MosaicGlobalRestrictionEntryBuilder implements Serializer {
    readonly mosaicId: MosaicIdDto;
    readonly keyPairs: GlobalKeyValueSetBuilder;
    constructor(mosaicId: MosaicIdDto, keyPairs: GlobalKeyValueSetBuilder);
    static loadFromBinary(payload: Uint8Array): MosaicGlobalRestrictionEntryBuilder;
    static createMosaicGlobalRestrictionEntryBuilder(mosaicId: MosaicIdDto, keyPairs: GlobalKeyValueSetBuilder): MosaicGlobalRestrictionEntryBuilder;
    getMosaicId(): MosaicIdDto;
    getKeyPairs(): GlobalKeyValueSetBuilder;
    getSize(): number;
    serialize(): Uint8Array;
}
