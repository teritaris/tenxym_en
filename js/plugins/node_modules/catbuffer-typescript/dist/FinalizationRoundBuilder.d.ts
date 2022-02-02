import { FinalizationEpochDto } from './FinalizationEpochDto';
import { FinalizationPointDto } from './FinalizationPointDto';
import { Serializer } from './Serializer';
export declare class FinalizationRoundBuilder implements Serializer {
    readonly epoch: FinalizationEpochDto;
    readonly point: FinalizationPointDto;
    constructor(epoch: FinalizationEpochDto, point: FinalizationPointDto);
    static loadFromBinary(payload: Uint8Array): FinalizationRoundBuilder;
    static createFinalizationRoundBuilder(epoch: FinalizationEpochDto, point: FinalizationPointDto): FinalizationRoundBuilder;
    getEpoch(): FinalizationEpochDto;
    getPoint(): FinalizationPointDto;
    getSize(): number;
    serialize(): Uint8Array;
}
