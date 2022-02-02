import { AddressDto } from './AddressDto';
import { Hash256Dto } from './Hash256Dto';
import { HeightDto } from './HeightDto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { LockStatusDto } from './LockStatusDto';
import { MosaicBuilder } from './MosaicBuilder';
import { Serializer } from './Serializer';
import { StateHeaderBuilder } from './StateHeaderBuilder';
export declare class SecretLockInfoBuilder extends StateHeaderBuilder implements Serializer {
    readonly ownerAddress: AddressDto;
    readonly mosaic: MosaicBuilder;
    readonly endHeight: HeightDto;
    readonly status: LockStatusDto;
    readonly hashAlgorithm: LockHashAlgorithmDto;
    readonly secret: Hash256Dto;
    readonly recipient: AddressDto;
    constructor(version: number, ownerAddress: AddressDto, mosaic: MosaicBuilder, endHeight: HeightDto, status: LockStatusDto, hashAlgorithm: LockHashAlgorithmDto, secret: Hash256Dto, recipient: AddressDto);
    static loadFromBinary(payload: Uint8Array): SecretLockInfoBuilder;
    static createSecretLockInfoBuilder(version: number, ownerAddress: AddressDto, mosaic: MosaicBuilder, endHeight: HeightDto, status: LockStatusDto, hashAlgorithm: LockHashAlgorithmDto, secret: Hash256Dto, recipient: AddressDto): SecretLockInfoBuilder;
    getOwnerAddress(): AddressDto;
    getMosaic(): MosaicBuilder;
    getEndHeight(): HeightDto;
    getStatus(): LockStatusDto;
    getHashAlgorithm(): LockHashAlgorithmDto;
    getSecret(): Hash256Dto;
    getRecipient(): AddressDto;
    getSize(): number;
    serialize(): Uint8Array;
}
