import { MosaicResolutionEntryBuilder } from './MosaicResolutionEntryBuilder';
import { ReceiptBuilder } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class MosaicResolutionStatementBuilder extends ReceiptBuilder implements Serializer {
    readonly unresolved: UnresolvedMosaicIdDto;
    readonly resolutionEntries: MosaicResolutionEntryBuilder[];
    constructor(version: number, type: ReceiptTypeDto, unresolved: UnresolvedMosaicIdDto, resolutionEntries: MosaicResolutionEntryBuilder[]);
    static loadFromBinary(payload: Uint8Array): MosaicResolutionStatementBuilder;
    static createMosaicResolutionStatementBuilder(version: number, type: ReceiptTypeDto, unresolved: UnresolvedMosaicIdDto, resolutionEntries: MosaicResolutionEntryBuilder[]): MosaicResolutionStatementBuilder;
    getUnresolved(): UnresolvedMosaicIdDto;
    getResolutionEntries(): MosaicResolutionEntryBuilder[];
    getSize(): number;
    serialize(): Uint8Array;
}
