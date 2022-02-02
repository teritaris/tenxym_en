import { AddressDto } from './AddressDto';
import { HeightDto } from './HeightDto';
import { MosaicPropertiesBuilder } from './MosaicPropertiesBuilder';
import { Serializer } from './Serializer';
export declare class MosaicDefinitionBuilder implements Serializer {
    readonly startHeight: HeightDto;
    readonly ownerAddress: AddressDto;
    readonly revision: number;
    readonly properties: MosaicPropertiesBuilder;
    constructor(startHeight: HeightDto, ownerAddress: AddressDto, revision: number, properties: MosaicPropertiesBuilder);
    static loadFromBinary(payload: Uint8Array): MosaicDefinitionBuilder;
    static createMosaicDefinitionBuilder(startHeight: HeightDto, ownerAddress: AddressDto, revision: number, properties: MosaicPropertiesBuilder): MosaicDefinitionBuilder;
    getStartHeight(): HeightDto;
    getOwnerAddress(): AddressDto;
    getRevision(): number;
    getProperties(): MosaicPropertiesBuilder;
    getSize(): number;
    serialize(): Uint8Array;
}
