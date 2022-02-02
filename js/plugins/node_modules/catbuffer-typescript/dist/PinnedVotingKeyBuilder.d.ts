import { FinalizationEpochDto } from './FinalizationEpochDto';
import { Serializer } from './Serializer';
import { VotingPublicKeyDto } from './VotingPublicKeyDto';
export declare class PinnedVotingKeyBuilder implements Serializer {
    readonly votingKey: VotingPublicKeyDto;
    readonly startEpoch: FinalizationEpochDto;
    readonly endEpoch: FinalizationEpochDto;
    constructor(votingKey: VotingPublicKeyDto, startEpoch: FinalizationEpochDto, endEpoch: FinalizationEpochDto);
    static loadFromBinary(payload: Uint8Array): PinnedVotingKeyBuilder;
    static createPinnedVotingKeyBuilder(votingKey: VotingPublicKeyDto, startEpoch: FinalizationEpochDto, endEpoch: FinalizationEpochDto): PinnedVotingKeyBuilder;
    getVotingKey(): VotingPublicKeyDto;
    getStartEpoch(): FinalizationEpochDto;
    getEndEpoch(): FinalizationEpochDto;
    getSize(): number;
    serialize(): Uint8Array;
}
