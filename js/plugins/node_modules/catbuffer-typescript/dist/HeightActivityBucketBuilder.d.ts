import { AmountDto } from './AmountDto';
import { ImportanceHeightDto } from './ImportanceHeightDto';
import { Serializer } from './Serializer';
export declare class HeightActivityBucketBuilder implements Serializer {
    readonly startHeight: ImportanceHeightDto;
    readonly totalFeesPaid: AmountDto;
    readonly beneficiaryCount: number;
    readonly rawScore: number[];
    constructor(startHeight: ImportanceHeightDto, totalFeesPaid: AmountDto, beneficiaryCount: number, rawScore: number[]);
    static loadFromBinary(payload: Uint8Array): HeightActivityBucketBuilder;
    static createHeightActivityBucketBuilder(startHeight: ImportanceHeightDto, totalFeesPaid: AmountDto, beneficiaryCount: number, rawScore: number[]): HeightActivityBucketBuilder;
    getStartHeight(): ImportanceHeightDto;
    getTotalFeesPaid(): AmountDto;
    getBeneficiaryCount(): number;
    getRawScore(): number[];
    getSize(): number;
    serialize(): Uint8Array;
}
