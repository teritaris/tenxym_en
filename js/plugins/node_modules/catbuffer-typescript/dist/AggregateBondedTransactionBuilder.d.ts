import { AggregateTransactionBodyBuilder } from './AggregateTransactionBodyBuilder';
import { AmountDto } from './AmountDto';
import { CosignatureBuilder } from './CosignatureBuilder';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { Hash256Dto } from './Hash256Dto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class AggregateBondedTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly aggregateTransactionBody: AggregateTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, transactionsHash: Hash256Dto, transactions: EmbeddedTransactionBuilder[], cosignatures: CosignatureBuilder[]);
    static loadFromBinary(payload: Uint8Array): AggregateBondedTransactionBuilder;
    static createAggregateBondedTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, transactionsHash: Hash256Dto, transactions: EmbeddedTransactionBuilder[], cosignatures: CosignatureBuilder[]): AggregateBondedTransactionBuilder;
    getTransactionsHash(): Hash256Dto;
    getTransactions(): EmbeddedTransactionBuilder[];
    getCosignatures(): CosignatureBuilder[];
    getSize(): number;
    getBody(): AggregateTransactionBodyBuilder;
    serialize(): Uint8Array;
}
