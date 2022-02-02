import { ImportanceDto } from './ImportanceDto';
import { ImportanceHeightDto } from './ImportanceHeightDto';
import { Serializer } from './Serializer';
export declare class ImportanceSnapshotBuilder implements Serializer {
    readonly importance: ImportanceDto;
    readonly height: ImportanceHeightDto;
    constructor(importance: ImportanceDto, height: ImportanceHeightDto);
    static loadFromBinary(payload: Uint8Array): ImportanceSnapshotBuilder;
    static createImportanceSnapshotBuilder(importance: ImportanceDto, height: ImportanceHeightDto): ImportanceSnapshotBuilder;
    getImportance(): ImportanceDto;
    getHeight(): ImportanceHeightDto;
    getSize(): number;
    serialize(): Uint8Array;
}
