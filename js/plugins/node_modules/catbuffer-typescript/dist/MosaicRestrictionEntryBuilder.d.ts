import { MosaicAddressRestrictionEntryBuilder } from './MosaicAddressRestrictionEntryBuilder';
import { MosaicGlobalRestrictionEntryBuilder } from './MosaicGlobalRestrictionEntryBuilder';
import { MosaicRestrictionEntryTypeDto } from './MosaicRestrictionEntryTypeDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder } from './StateHeaderBuilder';
export declare class MosaicRestrictionEntryBuilder extends StateHeaderBuilder implements Serializer {
    readonly entryType: MosaicRestrictionEntryTypeDto;
    readonly addressEntry?: MosaicAddressRestrictionEntryBuilder;
    readonly globalEntry?: MosaicGlobalRestrictionEntryBuilder;
    constructor(version: number, entryType: MosaicRestrictionEntryTypeDto, addressEntry: MosaicAddressRestrictionEntryBuilder | undefined, globalEntry: MosaicGlobalRestrictionEntryBuilder | undefined);
    static loadFromBinary(payload: Uint8Array): MosaicRestrictionEntryBuilder;
    static createMosaicRestrictionEntryBuilderADDRESS(version: number, addressEntry: MosaicAddressRestrictionEntryBuilder): MosaicRestrictionEntryBuilder;
    static createMosaicRestrictionEntryBuilderGLOBAL(version: number, globalEntry: MosaicGlobalRestrictionEntryBuilder): MosaicRestrictionEntryBuilder;
    getEntryType(): MosaicRestrictionEntryTypeDto;
    getAddressEntry(): MosaicAddressRestrictionEntryBuilder;
    getGlobalEntry(): MosaicGlobalRestrictionEntryBuilder;
    getSize(): number;
    serialize(): Uint8Array;
}
