import { Serializer } from './Serializer';
export declare class VotingPublicKeyDto implements Serializer {
    readonly votingPublicKey: Uint8Array;
    constructor(votingPublicKey: Uint8Array);
    static loadFromBinary(payload: Uint8Array): VotingPublicKeyDto;
    getVotingPublicKey(): Uint8Array;
    getSize(): number;
    serialize(): Uint8Array;
}
