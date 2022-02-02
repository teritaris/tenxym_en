import { HeightDto } from './HeightDto';
import { Serializer } from './Serializer';
export declare class NamespaceLifetimeBuilder implements Serializer {
    readonly lifetimeStart: HeightDto;
    readonly lifetimeEnd: HeightDto;
    constructor(lifetimeStart: HeightDto, lifetimeEnd: HeightDto);
    static loadFromBinary(payload: Uint8Array): NamespaceLifetimeBuilder;
    static createNamespaceLifetimeBuilder(lifetimeStart: HeightDto, lifetimeEnd: HeightDto): NamespaceLifetimeBuilder;
    getLifetimeStart(): HeightDto;
    getLifetimeEnd(): HeightDto;
    getSize(): number;
    serialize(): Uint8Array;
}
