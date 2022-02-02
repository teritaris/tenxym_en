import { AmountDto } from './AmountDto';
import { BlockDurationDto } from './BlockDurationDto';
import { Hash256Dto } from './Hash256Dto';
import { HashLockTransactionBodyBuilder } from './HashLockTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export declare class HashLockTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly hashLockTransactionBody: HashLockTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hash: Hash256Dto);
    static loadFromBinary(payload: Uint8Array): HashLockTransactionBuilder;
    static createHashLockTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hash: Hash256Dto): HashLockTransactionBuilder;
    getMosaic(): UnresolvedMosaicBuilder;
    getDuration(): BlockDurationDto;
    getHash(): Hash256Dto;
    getSize(): number;
    getBody(): HashLockTransactionBodyBuilder;
    serialize(): Uint8Array;
}
