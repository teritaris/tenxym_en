import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { FinalizationEpochDto } from './FinalizationEpochDto';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { VotingKeyLinkTransactionBodyBuilder } from './VotingKeyLinkTransactionBodyBuilder';
import { VotingPublicKeyDto } from './VotingPublicKeyDto';
export declare class EmbeddedVotingKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly votingKeyLinkTransactionBody: VotingKeyLinkTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, linkedPublicKey: VotingPublicKeyDto, startEpoch: FinalizationEpochDto, endEpoch: FinalizationEpochDto, linkAction: LinkActionDto);
    static loadFromBinary(payload: Uint8Array): EmbeddedVotingKeyLinkTransactionBuilder;
    static createEmbeddedVotingKeyLinkTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, linkedPublicKey: VotingPublicKeyDto, startEpoch: FinalizationEpochDto, endEpoch: FinalizationEpochDto, linkAction: LinkActionDto): EmbeddedVotingKeyLinkTransactionBuilder;
    getLinkedPublicKey(): VotingPublicKeyDto;
    getStartEpoch(): FinalizationEpochDto;
    getEndEpoch(): FinalizationEpochDto;
    getLinkAction(): LinkActionDto;
    getSize(): number;
    getBody(): VotingKeyLinkTransactionBodyBuilder;
    serialize(): Uint8Array;
}
