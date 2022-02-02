import { AddressDto } from './AddressDto';
import { Hash256Dto } from './Hash256Dto';
import { HeightDto } from './HeightDto';
import { LockStatusDto } from './LockStatusDto';
import { MosaicBuilder } from './MosaicBuilder';
import { Serializer } from './Serializer';
import { StateHeaderBuilder } from './StateHeaderBuilder';
export declare class HashLockInfoBuilder extends StateHeaderBuilder implements Serializer {
    readonly ownerAddress: AddressDto;
    readonly mosaic: MosaicBuilder;
    readonly endHeight: HeightDto;
    readonly status: LockStatusDto;
    readonly hash: Hash256Dto;
    constructor(version: number, ownerAddress: AddressDto, mosaic: MosaicBuilder, endHeight: HeightDto, status: LockStatusDto, hash: Hash256Dto);
    static loadFromBinary(payload: Uint8Array): HashLockInfoBuilder;
    static createHashLockInfoBuilder(version: number, ownerAddress: AddressDto, mosaic: MosaicBuilder, endHeight: HeightDto, status: LockStatusDto, hash: Hash256Dto): HashLockInfoBuilder;
    getOwnerAddress(): AddressDto;
    getMosaic(): MosaicBuilder;
    getEndHeight(): HeightDto;
    getStatus(): LockStatusDto;
    getHash(): Hash256Dto;
    getSize(): number;
    serialize(): Uint8Array;
}
