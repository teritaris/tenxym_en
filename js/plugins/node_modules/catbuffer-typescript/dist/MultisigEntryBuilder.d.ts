import { AddressDto } from './AddressDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder } from './StateHeaderBuilder';
export declare class MultisigEntryBuilder extends StateHeaderBuilder implements Serializer {
    readonly minApproval: number;
    readonly minRemoval: number;
    readonly accountAddress: AddressDto;
    readonly cosignatoryAddresses: AddressDto[];
    readonly multisigAddresses: AddressDto[];
    constructor(version: number, minApproval: number, minRemoval: number, accountAddress: AddressDto, cosignatoryAddresses: AddressDto[], multisigAddresses: AddressDto[]);
    static loadFromBinary(payload: Uint8Array): MultisigEntryBuilder;
    static createMultisigEntryBuilder(version: number, minApproval: number, minRemoval: number, accountAddress: AddressDto, cosignatoryAddresses: AddressDto[], multisigAddresses: AddressDto[]): MultisigEntryBuilder;
    getMinApproval(): number;
    getMinRemoval(): number;
    getAccountAddress(): AddressDto;
    getCosignatoryAddresses(): AddressDto[];
    getMultisigAddresses(): AddressDto[];
    getSize(): number;
    serialize(): Uint8Array;
}
