import { BlockDurationDto } from './BlockDurationDto';
import { Hash256Dto } from './Hash256Dto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export declare class HashLockTransactionBodyBuilder implements Serializer {
    readonly mosaic: UnresolvedMosaicBuilder;
    readonly duration: BlockDurationDto;
    readonly hash: Hash256Dto;
    constructor(mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hash: Hash256Dto);
    static loadFromBinary(payload: Uint8Array): HashLockTransactionBodyBuilder;
    static createHashLockTransactionBodyBuilder(mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hash: Hash256Dto): HashLockTransactionBodyBuilder;
    getMosaic(): UnresolvedMosaicBuilder;
    getDuration(): BlockDurationDto;
    getHash(): Hash256Dto;
    getSize(): number;
    serialize(): Uint8Array;
}
