import { FinalizationRoundBuilder } from './FinalizationRoundBuilder';
import { Hash256Dto } from './Hash256Dto';
import { HeightDto } from './HeightDto';
import { Serializer } from './Serializer';
export declare class FinalizedBlockHeaderBuilder implements Serializer {
    readonly round: FinalizationRoundBuilder;
    readonly height: HeightDto;
    readonly hash: Hash256Dto;
    constructor(round: FinalizationRoundBuilder, height: HeightDto, hash: Hash256Dto);
    static loadFromBinary(payload: Uint8Array): FinalizedBlockHeaderBuilder;
    static createFinalizedBlockHeaderBuilder(round: FinalizationRoundBuilder, height: HeightDto, hash: Hash256Dto): FinalizedBlockHeaderBuilder;
    getRound(): FinalizationRoundBuilder;
    getHeight(): HeightDto;
    getHash(): Hash256Dto;
    getSize(): number;
    serialize(): Uint8Array;
}
