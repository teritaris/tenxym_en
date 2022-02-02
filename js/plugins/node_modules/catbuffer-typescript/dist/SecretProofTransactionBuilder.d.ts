import { AmountDto } from './AmountDto';
import { Hash256Dto } from './Hash256Dto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { SecretProofTransactionBodyBuilder } from './SecretProofTransactionBodyBuilder';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class SecretProofTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly secretProofTransactionBody: SecretProofTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, hashAlgorithm: LockHashAlgorithmDto, proof: Uint8Array);
    static loadFromBinary(payload: Uint8Array): SecretProofTransactionBuilder;
    static createSecretProofTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, hashAlgorithm: LockHashAlgorithmDto, proof: Uint8Array): SecretProofTransactionBuilder;
    getRecipientAddress(): UnresolvedAddressDto;
    getSecret(): Hash256Dto;
    getHashAlgorithm(): LockHashAlgorithmDto;
    getProof(): Uint8Array;
    getSize(): number;
    getBody(): SecretProofTransactionBodyBuilder;
    serialize(): Uint8Array;
}
