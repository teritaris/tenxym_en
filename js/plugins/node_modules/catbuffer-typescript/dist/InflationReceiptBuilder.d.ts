import { MosaicBuilder } from './MosaicBuilder';
import { ReceiptBuilder } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
export declare class InflationReceiptBuilder extends ReceiptBuilder implements Serializer {
    readonly mosaic: MosaicBuilder;
    constructor(version: number, type: ReceiptTypeDto, mosaic: MosaicBuilder);
    static loadFromBinary(payload: Uint8Array): InflationReceiptBuilder;
    static createInflationReceiptBuilder(version: number, type: ReceiptTypeDto, mosaic: MosaicBuilder): InflationReceiptBuilder;
    getMosaic(): MosaicBuilder;
    getSize(): number;
    serialize(): Uint8Array;
}
