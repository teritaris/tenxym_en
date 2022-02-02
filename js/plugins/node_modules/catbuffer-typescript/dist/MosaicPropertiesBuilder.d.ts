import { BlockDurationDto } from './BlockDurationDto';
import { MosaicFlagsDto } from './MosaicFlagsDto';
import { Serializer } from './Serializer';
export declare class MosaicPropertiesBuilder implements Serializer {
    readonly flags: MosaicFlagsDto[];
    readonly divisibility: number;
    readonly duration: BlockDurationDto;
    constructor(flags: MosaicFlagsDto[], divisibility: number, duration: BlockDurationDto);
    static loadFromBinary(payload: Uint8Array): MosaicPropertiesBuilder;
    static createMosaicPropertiesBuilder(flags: MosaicFlagsDto[], divisibility: number, duration: BlockDurationDto): MosaicPropertiesBuilder;
    getFlags(): MosaicFlagsDto[];
    getDivisibility(): number;
    getDuration(): BlockDurationDto;
    getSize(): number;
    serialize(): Uint8Array;
}
