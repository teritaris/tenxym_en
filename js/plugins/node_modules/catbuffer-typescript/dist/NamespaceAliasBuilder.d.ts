import { AddressDto } from './AddressDto';
import { MosaicIdDto } from './MosaicIdDto';
import { NamespaceAliasTypeDto } from './NamespaceAliasTypeDto';
import { Serializer } from './Serializer';
export declare class NamespaceAliasBuilder implements Serializer {
    readonly namespaceAliasType: NamespaceAliasTypeDto;
    readonly mosaicAlias?: MosaicIdDto;
    readonly addressAlias?: AddressDto;
    constructor(namespaceAliasType: NamespaceAliasTypeDto, mosaicAlias: MosaicIdDto | undefined, addressAlias: AddressDto | undefined);
    static loadFromBinary(payload: Uint8Array): NamespaceAliasBuilder;
    static createNamespaceAliasBuilderADDRESS(addressAlias: AddressDto): NamespaceAliasBuilder;
    static createNamespaceAliasBuilderNONE(): NamespaceAliasBuilder;
    static createNamespaceAliasBuilderMOSAIC_ID(mosaicAlias: MosaicIdDto): NamespaceAliasBuilder;
    getNamespaceAliasType(): NamespaceAliasTypeDto;
    getMosaicAlias(): MosaicIdDto;
    getAddressAlias(): AddressDto;
    getSize(): number;
    serialize(): Uint8Array;
}
