import { MosaicIdDto } from './MosaicIdDto';
import { ReceiptBuilder } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
export declare class MosaicExpiryReceiptBuilder extends ReceiptBuilder implements Serializer {
    readonly artifactId: MosaicIdDto;
    constructor(version: number, type: ReceiptTypeDto, artifactId: MosaicIdDto);
    static loadFromBinary(payload: Uint8Array): MosaicExpiryReceiptBuilder;
    static createMosaicExpiryReceiptBuilder(version: number, type: ReceiptTypeDto, artifactId: MosaicIdDto): MosaicExpiryReceiptBuilder;
    getArtifactId(): MosaicIdDto;
    getSize(): number;
    serialize(): Uint8Array;
}
