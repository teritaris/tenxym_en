import { Serializer } from './Serializer';
export declare class ProofGammaDto implements Serializer {
    readonly proofGamma: Uint8Array;
    constructor(proofGamma: Uint8Array);
    static loadFromBinary(payload: Uint8Array): ProofGammaDto;
    getProofGamma(): Uint8Array;
    getSize(): number;
    serialize(): Uint8Array;
}
