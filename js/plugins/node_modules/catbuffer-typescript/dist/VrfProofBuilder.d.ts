import { ProofGammaDto } from './ProofGammaDto';
import { ProofScalarDto } from './ProofScalarDto';
import { ProofVerificationHashDto } from './ProofVerificationHashDto';
import { Serializer } from './Serializer';
export declare class VrfProofBuilder implements Serializer {
    readonly gamma: ProofGammaDto;
    readonly verificationHash: ProofVerificationHashDto;
    readonly scalar: ProofScalarDto;
    constructor(gamma: ProofGammaDto, verificationHash: ProofVerificationHashDto, scalar: ProofScalarDto);
    static loadFromBinary(payload: Uint8Array): VrfProofBuilder;
    static createVrfProofBuilder(gamma: ProofGammaDto, verificationHash: ProofVerificationHashDto, scalar: ProofScalarDto): VrfProofBuilder;
    getGamma(): ProofGammaDto;
    getVerificationHash(): ProofVerificationHashDto;
    getScalar(): ProofScalarDto;
    getSize(): number;
    serialize(): Uint8Array;
}
