import { CosignatureBuilder } from './CosignatureBuilder';
import { Hash256Dto } from './Hash256Dto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
export declare class DetachedCosignatureBuilder extends CosignatureBuilder implements Serializer {
    readonly parentHash: Hash256Dto;
    constructor(version: number[], signerPublicKey: PublicKeyDto, signature: SignatureDto, parentHash: Hash256Dto);
    static loadFromBinary(payload: Uint8Array): DetachedCosignatureBuilder;
    static createDetachedCosignatureBuilder(version: number[], signerPublicKey: PublicKeyDto, signature: SignatureDto, parentHash: Hash256Dto): DetachedCosignatureBuilder;
    getParentHash(): Hash256Dto;
    getSize(): number;
    serialize(): Uint8Array;
}
