import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
export declare class ReceiptBuilder implements Serializer {
    readonly version: number;
    readonly type: ReceiptTypeDto;
    constructor(version: number, type: ReceiptTypeDto);
    static loadFromBinary(payload: Uint8Array): ReceiptBuilder;
    static createReceiptBuilder(version: number, type: ReceiptTypeDto): ReceiptBuilder;
    getVersion(): number;
    getType(): ReceiptTypeDto;
    getSize(): number;
    serialize(): Uint8Array;
}
