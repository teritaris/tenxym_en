import { Serializer } from './Serializer';
export declare class FinalizationPointDto implements Serializer {
    readonly finalizationPoint: number;
    constructor(finalizationPoint: number);
    static loadFromBinary(payload: Uint8Array): FinalizationPointDto;
    getFinalizationPoint(): number;
    getSize(): number;
    serialize(): Uint8Array;
}
