import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class EmbeddedTransactionBuilder implements Serializer {
    readonly signerPublicKey: PublicKeyDto;
    readonly version: number;
    readonly network: NetworkTypeDto;
    readonly type: TransactionTypeDto;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto);
    static loadFromBinary(payload: Uint8Array): EmbeddedTransactionBuilder;
    static createEmbeddedTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto): EmbeddedTransactionBuilder;
    getSignerPublicKey(): PublicKeyDto;
    getVersion(): number;
    getNetwork(): NetworkTypeDto;
    getType(): TransactionTypeDto;
    getSize(): number;
    getBody(): undefined | Serializer;
    serialize(): Uint8Array;
}
