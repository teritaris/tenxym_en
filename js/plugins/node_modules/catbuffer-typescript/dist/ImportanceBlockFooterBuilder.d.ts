import { AmountDto } from './AmountDto';
import { Hash256Dto } from './Hash256Dto';
import { Serializer } from './Serializer';
export declare class ImportanceBlockFooterBuilder implements Serializer {
    readonly votingEligibleAccountsCount: number;
    readonly harvestingEligibleAccountsCount: number[];
    readonly totalVotingBalance: AmountDto;
    readonly previousImportanceBlockHash: Hash256Dto;
    constructor(votingEligibleAccountsCount: number, harvestingEligibleAccountsCount: number[], totalVotingBalance: AmountDto, previousImportanceBlockHash: Hash256Dto);
    static loadFromBinary(payload: Uint8Array): ImportanceBlockFooterBuilder;
    static createImportanceBlockFooterBuilder(votingEligibleAccountsCount: number, harvestingEligibleAccountsCount: number[], totalVotingBalance: AmountDto, previousImportanceBlockHash: Hash256Dto): ImportanceBlockFooterBuilder;
    getVotingEligibleAccountsCount(): number;
    getHarvestingEligibleAccountsCount(): number[];
    getTotalVotingBalance(): AmountDto;
    getPreviousImportanceBlockHash(): Hash256Dto;
    getSize(): number;
    serialize(): Uint8Array;
}
