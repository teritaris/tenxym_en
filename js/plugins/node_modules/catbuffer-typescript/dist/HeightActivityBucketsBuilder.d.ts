import { HeightActivityBucketBuilder } from './HeightActivityBucketBuilder';
import { Serializer } from './Serializer';
export declare class HeightActivityBucketsBuilder implements Serializer {
    readonly buckets: HeightActivityBucketBuilder[];
    constructor(buckets: HeightActivityBucketBuilder[]);
    static loadFromBinary(payload: Uint8Array): HeightActivityBucketsBuilder;
    static createHeightActivityBucketsBuilder(buckets: HeightActivityBucketBuilder[]): HeightActivityBucketsBuilder;
    getBuckets(): HeightActivityBucketBuilder[];
    getSize(): number;
    serialize(): Uint8Array;
}
