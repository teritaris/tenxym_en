import { BlockDurationDto } from './BlockDurationDto';
import { Hash256Dto } from './Hash256Dto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export declare class SecretLockTransactionBodyBuilder implements Serializer {
    readonly recipientAddress: UnresolvedAddressDto;
    readonly secret: Hash256Dto;
    readonly mosaic: UnresolvedMosaicBuilder;
    readonly duration: BlockDurationDto;
    readonly hashAlgorithm: LockHashAlgorithmDto;
    constructor(recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hashAlgorithm: LockHashAlgorithmDto);
    static loadFromBinary(payload: Uint8Array): SecretLockTransactionBodyBuilder;
    static createSecretLockTransactionBodyBuilder(recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hashAlgorithm: LockHashAlgorithmDto): SecretLockTransactionBodyBuilder;
    getRecipientAddress(): UnresolvedAddressDto;
    getSecret(): Hash256Dto;
    getMosaic(): UnresolvedMosaicBuilder;
    getDuration(): BlockDurationDto;
    getHashAlgorithm(): LockHashAlgorithmDto;
    getSize(): number;
    serialize(): Uint8Array;
}
