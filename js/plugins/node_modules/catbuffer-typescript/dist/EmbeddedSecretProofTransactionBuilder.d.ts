import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { Hash256Dto } from './Hash256Dto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { SecretProofTransactionBodyBuilder } from './SecretProofTransactionBodyBuilder';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class EmbeddedSecretProofTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly secretProofTransactionBody: SecretProofTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, hashAlgorithm: LockHashAlgorithmDto, proof: Uint8Array);
    static loadFromBinary(payload: Uint8Array): EmbeddedSecretProofTransactionBuilder;
    static createEmbeddedSecretProofTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, hashAlgorithm: LockHashAlgorithmDto, proof: Uint8Array): EmbeddedSecretProofTransactionBuilder;
    getRecipientAddress(): UnresolvedAddressDto;
    getSecret(): Hash256Dto;
    getHashAlgorithm(): LockHashAlgorithmDto;
    getProof(): Uint8Array;
    getSize(): number;
    getBody(): SecretProofTransactionBodyBuilder;
    serialize(): Uint8Array;
}
