import { NamespaceAliasBuilder } from './NamespaceAliasBuilder';
import { NamespaceIdDto } from './NamespaceIdDto';
import { Serializer } from './Serializer';
export declare class NamespacePathBuilder implements Serializer {
    readonly path: NamespaceIdDto[];
    readonly alias: NamespaceAliasBuilder;
    constructor(path: NamespaceIdDto[], alias: NamespaceAliasBuilder);
    static loadFromBinary(payload: Uint8Array): NamespacePathBuilder;
    static createNamespacePathBuilder(path: NamespaceIdDto[], alias: NamespaceAliasBuilder): NamespacePathBuilder;
    getPath(): NamespaceIdDto[];
    getAlias(): NamespaceAliasBuilder;
    getSize(): number;
    serialize(): Uint8Array;
}
