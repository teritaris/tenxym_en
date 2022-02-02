import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
export declare class CosignatureBuilder implements Serializer {
    readonly version: number[];
    readonly signerPublicKey: PublicKeyDto;
    readonly signature: SignatureDto;
    constructor(version: number[], signerPublicKey: PublicKeyDto, signature: SignatureDto);
    static loadFromBinary(payload: Uint8Array): CosignatureBuilder;
    static createCosignatureBuilder(version: number[], signerPublicKey: PublicKeyDto, signature: SignatureDto): CosignatureBuilder;
    getVersion(): number[];
    getSignerPublicKey(): PublicKeyDto;
    getSignature(): SignatureDto;
    getSize(): number;
    serialize(): Uint8Array;
}
