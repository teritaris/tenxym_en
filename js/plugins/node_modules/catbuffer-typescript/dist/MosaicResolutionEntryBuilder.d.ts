import { MosaicIdDto } from './MosaicIdDto';
import { ReceiptSourceBuilder } from './ReceiptSourceBuilder';
import { Serializer } from './Serializer';
export declare class MosaicResolutionEntryBuilder implements Serializer {
    readonly source: ReceiptSourceBuilder;
    readonly resolved: MosaicIdDto;
    constructor(source: ReceiptSourceBuilder, resolved: MosaicIdDto);
    static loadFromBinary(payload: Uint8Array): MosaicResolutionEntryBuilder;
    static createMosaicResolutionEntryBuilder(source: ReceiptSourceBuilder, resolved: MosaicIdDto): MosaicResolutionEntryBuilder;
    getSource(): ReceiptSourceBuilder;
    getResolved(): MosaicIdDto;
    getSize(): number;
    serialize(): Uint8Array;
}
