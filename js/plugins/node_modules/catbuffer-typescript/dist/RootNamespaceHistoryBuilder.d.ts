import { AddressDto } from './AddressDto';
import { NamespaceAliasBuilder } from './NamespaceAliasBuilder';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceLifetimeBuilder } from './NamespaceLifetimeBuilder';
import { NamespacePathBuilder } from './NamespacePathBuilder';
import { Serializer } from './Serializer';
import { StateHeaderBuilder } from './StateHeaderBuilder';
export declare class RootNamespaceHistoryBuilder extends StateHeaderBuilder implements Serializer {
    readonly id: NamespaceIdDto;
    readonly ownerAddress: AddressDto;
    readonly lifetime: NamespaceLifetimeBuilder;
    readonly rootAlias: NamespaceAliasBuilder;
    readonly paths: NamespacePathBuilder[];
    constructor(version: number, id: NamespaceIdDto, ownerAddress: AddressDto, lifetime: NamespaceLifetimeBuilder, rootAlias: NamespaceAliasBuilder, paths: NamespacePathBuilder[]);
    static loadFromBinary(payload: Uint8Array): RootNamespaceHistoryBuilder;
    static createRootNamespaceHistoryBuilder(version: number, id: NamespaceIdDto, ownerAddress: AddressDto, lifetime: NamespaceLifetimeBuilder, rootAlias: NamespaceAliasBuilder, paths: NamespacePathBuilder[]): RootNamespaceHistoryBuilder;
    getId(): NamespaceIdDto;
    getOwnerAddress(): AddressDto;
    getLifetime(): NamespaceLifetimeBuilder;
    getRootAlias(): NamespaceAliasBuilder;
    getPaths(): NamespacePathBuilder[];
    getSize(): number;
    serialize(): Uint8Array;
}
