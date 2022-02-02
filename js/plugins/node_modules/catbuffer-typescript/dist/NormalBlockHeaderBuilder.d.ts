import { AddressDto } from './AddressDto';
import { BlockFeeMultiplierDto } from './BlockFeeMultiplierDto';
import { BlockHeaderBuilder } from './BlockHeaderBuilder';
import { BlockTypeDto } from './BlockTypeDto';
import { DifficultyDto } from './DifficultyDto';
import { Hash256Dto } from './Hash256Dto';
import { HeightDto } from './HeightDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { VrfProofBuilder } from './VrfProofBuilder';
export declare class NormalBlockHeaderBuilder extends BlockHeaderBuilder implements Serializer {
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: BlockTypeDto, height: HeightDto, timestamp: TimestampDto, difficulty: DifficultyDto, generationHashProof: VrfProofBuilder, previousBlockHash: Hash256Dto, transactionsHash: Hash256Dto, receiptsHash: Hash256Dto, stateHash: Hash256Dto, beneficiaryAddress: AddressDto, feeMultiplier: BlockFeeMultiplierDto);
    static loadFromBinary(payload: Uint8Array): NormalBlockHeaderBuilder;
    static createNormalBlockHeaderBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: BlockTypeDto, height: HeightDto, timestamp: TimestampDto, difficulty: DifficultyDto, generationHashProof: VrfProofBuilder, previousBlockHash: Hash256Dto, transactionsHash: Hash256Dto, receiptsHash: Hash256Dto, stateHash: Hash256Dto, beneficiaryAddress: AddressDto, feeMultiplier: BlockFeeMultiplierDto): NormalBlockHeaderBuilder;
    getSize(): number;
    serialize(): Uint8Array;
}
