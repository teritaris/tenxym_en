import { AmountDto } from './AmountDto';
import { FinalizationEpochDto } from './FinalizationEpochDto';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { VotingKeyLinkTransactionBodyBuilder } from './VotingKeyLinkTransactionBodyBuilder';
import { VotingPublicKeyDto } from './VotingPublicKeyDto';
export declare class VotingKeyLinkTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly votingKeyLinkTransactionBody: VotingKeyLinkTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, linkedPublicKey: VotingPublicKeyDto, startEpoch: FinalizationEpochDto, endEpoch: FinalizationEpochDto, linkAction: LinkActionDto);
    static loadFromBinary(payload: Uint8Array): VotingKeyLinkTransactionBuilder;
    static createVotingKeyLinkTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, linkedPublicKey: VotingPublicKeyDto, startEpoch: FinalizationEpochDto, endEpoch: FinalizationEpochDto, linkAction: LinkActionDto): VotingKeyLinkTransactionBuilder;
    getLinkedPublicKey(): VotingPublicKeyDto;
    getStartEpoch(): FinalizationEpochDto;
    getEndEpoch(): FinalizationEpochDto;
    getLinkAction(): LinkActionDto;
    getSize(): number;
    getBody(): VotingKeyLinkTransactionBodyBuilder;
    serialize(): Uint8Array;
}
