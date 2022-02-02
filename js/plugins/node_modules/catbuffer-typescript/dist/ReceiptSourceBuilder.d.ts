import { Serializer } from './Serializer';
export declare class ReceiptSourceBuilder implements Serializer {
    readonly primaryId: number;
    readonly secondaryId: number;
    constructor(primaryId: number, secondaryId: number);
    static loadFromBinary(payload: Uint8Array): ReceiptSourceBuilder;
    static createReceiptSourceBuilder(primaryId: number, secondaryId: number): ReceiptSourceBuilder;
    getPrimaryId(): number;
    getSecondaryId(): number;
    getSize(): number;
    serialize(): Uint8Array;
}
