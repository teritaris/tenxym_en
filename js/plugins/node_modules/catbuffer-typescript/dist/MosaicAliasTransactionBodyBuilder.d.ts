import { AliasActionDto } from './AliasActionDto';
import { MosaicIdDto } from './MosaicIdDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { Serializer } from './Serializer';
export declare class MosaicAliasTransactionBodyBuilder implements Serializer {
    readonly namespaceId: NamespaceIdDto;
    readonly mosaicId: MosaicIdDto;
    readonly aliasAction: AliasActionDto;
    constructor(namespaceId: NamespaceIdDto, mosaicId: MosaicIdDto, aliasAction: AliasActionDto);
    static loadFromBinary(payload: Uint8Array): MosaicAliasTransactionBodyBuilder;
    static createMosaicAliasTransactionBodyBuilder(namespaceId: NamespaceIdDto, mosaicId: MosaicIdDto, aliasAction: AliasActionDto): MosaicAliasTransactionBodyBuilder;
    getNamespaceId(): NamespaceIdDto;
    getMosaicId(): MosaicIdDto;
    getAliasAction(): AliasActionDto;
    getSize(): number;
    serialize(): Uint8Array;
}
