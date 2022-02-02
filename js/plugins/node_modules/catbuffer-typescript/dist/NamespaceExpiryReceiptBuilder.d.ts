import { NamespaceIdDto } from './NamespaceIdDto';
import { ReceiptBuilder } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
export declare class NamespaceExpiryReceiptBuilder extends ReceiptBuilder implements Serializer {
    readonly artifactId: NamespaceIdDto;
    constructor(version: number, type: ReceiptTypeDto, artifactId: NamespaceIdDto);
    static loadFromBinary(payload: Uint8Array): NamespaceExpiryReceiptBuilder;
    static createNamespaceExpiryReceiptBuilder(version: number, type: ReceiptTypeDto, artifactId: NamespaceIdDto): NamespaceExpiryReceiptBuilder;
    getArtifactId(): NamespaceIdDto;
    getSize(): number;
    serialize(): Uint8Array;
}
