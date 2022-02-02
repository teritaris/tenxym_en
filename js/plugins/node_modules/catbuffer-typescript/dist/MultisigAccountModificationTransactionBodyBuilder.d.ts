import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class MultisigAccountModificationTransactionBodyBuilder implements Serializer {
    readonly minRemovalDelta: number;
    readonly minApprovalDelta: number;
    readonly addressAdditions: UnresolvedAddressDto[];
    readonly addressDeletions: UnresolvedAddressDto[];
    constructor(minRemovalDelta: number, minApprovalDelta: number, addressAdditions: UnresolvedAddressDto[], addressDeletions: UnresolvedAddressDto[]);
    static loadFromBinary(payload: Uint8Array): MultisigAccountModificationTransactionBodyBuilder;
    static createMultisigAccountModificationTransactionBodyBuilder(minRemovalDelta: number, minApprovalDelta: number, addressAdditions: UnresolvedAddressDto[], addressDeletions: UnresolvedAddressDto[]): MultisigAccountModificationTransactionBodyBuilder;
    getMinRemovalDelta(): number;
    getMinApprovalDelta(): number;
    getAddressAdditions(): UnresolvedAddressDto[];
    getAddressDeletions(): UnresolvedAddressDto[];
    getSize(): number;
    serialize(): Uint8Array;
}
