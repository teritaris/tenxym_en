import { BlockDurationDto } from './BlockDurationDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { Hash256Dto } from './Hash256Dto';
import { HashLockTransactionBodyBuilder } from './HashLockTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export declare class EmbeddedHashLockTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly hashLockTransactionBody: HashLockTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hash: Hash256Dto);
    static loadFromBinary(payload: Uint8Array): EmbeddedHashLockTransactionBuilder;
    static createEmbeddedHashLockTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hash: Hash256Dto): EmbeddedHashLockTransactionBuilder;
    getMosaic(): UnresolvedMosaicBuilder;
    getDuration(): BlockDurationDto;
    getHash(): Hash256Dto;
    getSize(): number;
    getBody(): HashLockTransactionBodyBuilder;
    serialize(): Uint8Array;
}
