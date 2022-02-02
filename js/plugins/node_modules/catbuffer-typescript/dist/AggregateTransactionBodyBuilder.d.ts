import { CosignatureBuilder } from './CosignatureBuilder';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { Hash256Dto } from './Hash256Dto';
import { Serializer } from './Serializer';
export declare class AggregateTransactionBodyBuilder implements Serializer {
    readonly transactionsHash: Hash256Dto;
    readonly transactions: EmbeddedTransactionBuilder[];
    readonly cosignatures: CosignatureBuilder[];
    constructor(transactionsHash: Hash256Dto, transactions: EmbeddedTransactionBuilder[], cosignatures: CosignatureBuilder[]);
    static loadFromBinary(payload: Uint8Array): AggregateTransactionBodyBuilder;
    static createAggregateTransactionBodyBuilder(transactionsHash: Hash256Dto, transactions: EmbeddedTransactionBuilder[], cosignatures: CosignatureBuilder[]): AggregateTransactionBodyBuilder;
    getTransactionsHash(): Hash256Dto;
    getTransactions(): EmbeddedTransactionBuilder[];
    getCosignatures(): CosignatureBuilder[];
    getSize(): number;
    serialize(): Uint8Array;
}
