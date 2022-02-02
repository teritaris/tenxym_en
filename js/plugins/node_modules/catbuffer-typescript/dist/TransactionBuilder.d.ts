import { AmountDto } from './AmountDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class TransactionBuilder implements Serializer {
    readonly signature: SignatureDto;
    readonly signerPublicKey: PublicKeyDto;
    readonly version: number;
    readonly network: NetworkTypeDto;
    readonly type: TransactionTypeDto;
    readonly fee: AmountDto;
    readonly deadline: TimestampDto;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto);
    static loadFromBinary(payload: Uint8Array): TransactionBuilder;
    static createTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto): TransactionBuilder;
    getSignature(): SignatureDto;
    getSignerPublicKey(): PublicKeyDto;
    getVersion(): number;
    getNetwork(): NetworkTypeDto;
    getType(): TransactionTypeDto;
    getFee(): AmountDto;
    getDeadline(): TimestampDto;
    getSize(): number;
    getBody(): undefined | Serializer;
    serialize(): Uint8Array;
}
