import { AddressDto } from './AddressDto';
import { AmountDto } from './AmountDto';
import { BlockFeeMultiplierDto } from './BlockFeeMultiplierDto';
import { BlockHeaderBuilder } from './BlockHeaderBuilder';
import { BlockTypeDto } from './BlockTypeDto';
import { DifficultyDto } from './DifficultyDto';
import { Hash256Dto } from './Hash256Dto';
import { HeightDto } from './HeightDto';
import { ImportanceBlockFooterBuilder } from './ImportanceBlockFooterBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { VrfProofBuilder } from './VrfProofBuilder';
export declare class NemesisBlockHeaderBuilder extends BlockHeaderBuilder implements Serializer {
    readonly importanceBlockFooter: ImportanceBlockFooterBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: BlockTypeDto, height: HeightDto, timestamp: TimestampDto, difficulty: DifficultyDto, generationHashProof: VrfProofBuilder, previousBlockHash: Hash256Dto, transactionsHash: Hash256Dto, receiptsHash: Hash256Dto, stateHash: Hash256Dto, beneficiaryAddress: AddressDto, feeMultiplier: BlockFeeMultiplierDto, votingEligibleAccountsCount: number, harvestingEligibleAccountsCount: number[], totalVotingBalance: AmountDto, previousImportanceBlockHash: Hash256Dto);
    static loadFromBinary(payload: Uint8Array): NemesisBlockHeaderBuilder;
    static createNemesisBlockHeaderBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: BlockTypeDto, height: HeightDto, timestamp: TimestampDto, difficulty: DifficultyDto, generationHashProof: VrfProofBuilder, previousBlockHash: Hash256Dto, transactionsHash: Hash256Dto, receiptsHash: Hash256Dto, stateHash: Hash256Dto, beneficiaryAddress: AddressDto, feeMultiplier: BlockFeeMultiplierDto, votingEligibleAccountsCount: number, harvestingEligibleAccountsCount: number[], totalVotingBalance: AmountDto, previousImportanceBlockHash: Hash256Dto): NemesisBlockHeaderBuilder;
    getVotingEligibleAccountsCount(): number;
    getHarvestingEligibleAccountsCount(): number[];
    getTotalVotingBalance(): AmountDto;
    getPreviousImportanceBlockHash(): Hash256Dto;
    getSize(): number;
    serialize(): Uint8Array;
}
