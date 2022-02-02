import { Serializer } from './Serializer';
export declare class FinalizationEpochDto implements Serializer {
    readonly finalizationEpoch: number;
    constructor(finalizationEpoch: number);
    static loadFromBinary(payload: Uint8Array): FinalizationEpochDto;
    getFinalizationEpoch(): number;
    getSize(): number;
    serialize(): Uint8Array;
}
