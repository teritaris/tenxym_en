import { AmountDto } from './AmountDto';
import { MosaicDefinitionBuilder } from './MosaicDefinitionBuilder';
import { MosaicIdDto } from './MosaicIdDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder } from './StateHeaderBuilder';
export declare class MosaicEntryBuilder extends StateHeaderBuilder implements Serializer {
    readonly mosaicId: MosaicIdDto;
    readonly supply: AmountDto;
    readonly definition: MosaicDefinitionBuilder;
    constructor(version: number, mosaicId: MosaicIdDto, supply: AmountDto, definition: MosaicDefinitionBuilder);
    static loadFromBinary(payload: Uint8Array): MosaicEntryBuilder;
    static createMosaicEntryBuilder(version: number, mosaicId: MosaicIdDto, supply: AmountDto, definition: MosaicDefinitionBuilder): MosaicEntryBuilder;
    getMosaicId(): MosaicIdDto;
    getSupply(): AmountDto;
    getDefinition(): MosaicDefinitionBuilder;
    getSize(): number;
    serialize(): Uint8Array;
}
