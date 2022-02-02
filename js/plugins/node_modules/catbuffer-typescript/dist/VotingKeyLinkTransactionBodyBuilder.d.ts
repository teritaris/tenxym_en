import { FinalizationEpochDto } from './FinalizationEpochDto';
import { LinkActionDto } from './LinkActionDto';
import { Serializer } from './Serializer';
import { VotingPublicKeyDto } from './VotingPublicKeyDto';
export declare class VotingKeyLinkTransactionBodyBuilder implements Serializer {
    readonly linkedPublicKey: VotingPublicKeyDto;
    readonly startEpoch: FinalizationEpochDto;
    readonly endEpoch: FinalizationEpochDto;
    readonly linkAction: LinkActionDto;
    constructor(linkedPublicKey: VotingPublicKeyDto, startEpoch: FinalizationEpochDto, endEpoch: FinalizationEpochDto, linkAction: LinkActionDto);
    static loadFromBinary(payload: Uint8Array): VotingKeyLinkTransactionBodyBuilder;
    static createVotingKeyLinkTransactionBodyBuilder(linkedPublicKey: VotingPublicKeyDto, startEpoch: FinalizationEpochDto, endEpoch: FinalizationEpochDto, linkAction: LinkActionDto): VotingKeyLinkTransactionBodyBuilder;
    getLinkedPublicKey(): VotingPublicKeyDto;
    getStartEpoch(): FinalizationEpochDto;
    getEndEpoch(): FinalizationEpochDto;
    getLinkAction(): LinkActionDto;
    getSize(): number;
    serialize(): Uint8Array;
}
