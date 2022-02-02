import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export declare class MosaicSupplyRevocationTransactionBodyBuilder implements Serializer {
    readonly sourceAddress: UnresolvedAddressDto;
    readonly mosaic: UnresolvedMosaicBuilder;
    constructor(sourceAddress: UnresolvedAddressDto, mosaic: UnresolvedMosaicBuilder);
    static loadFromBinary(payload: Uint8Array): MosaicSupplyRevocationTransactionBodyBuilder;
    static createMosaicSupplyRevocationTransactionBodyBuilder(sourceAddress: UnresolvedAddressDto, mosaic: UnresolvedMosaicBuilder): MosaicSupplyRevocationTransactionBodyBuilder;
    getSourceAddress(): UnresolvedAddressDto;
    getMosaic(): UnresolvedMosaicBuilder;
    getSize(): number;
    serialize(): Uint8Array;
}
