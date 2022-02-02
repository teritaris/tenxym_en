import { AmountDto } from './AmountDto';
import { BlockDurationDto } from './BlockDurationDto';
import { Hash256Dto } from './Hash256Dto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { SecretLockTransactionBodyBuilder } from './SecretLockTransactionBodyBuilder';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export declare class SecretLockTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly secretLockTransactionBody: SecretLockTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hashAlgorithm: LockHashAlgorithmDto);
    static loadFromBinary(payload: Uint8Array): SecretLockTransactionBuilder;
    static createSecretLockTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hashAlgorithm: LockHashAlgorithmDto): SecretLockTransactionBuilder;
    getRecipientAddress(): UnresolvedAddressDto;
    getSecret(): Hash256Dto;
    getMosaic(): UnresolvedMosaicBuilder;
    getDuration(): BlockDurationDto;
    getHashAlgorithm(): LockHashAlgorithmDto;
    getSize(): number;
    getBody(): SecretLockTransactionBodyBuilder;
    serialize(): Uint8Array;
}
