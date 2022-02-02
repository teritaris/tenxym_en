"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnresolvedMosaicBuilder = void 0;
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
class UnresolvedMosaicBuilder {
    constructor(mosaicId, amount) {
        GeneratorUtils_1.GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(amount, 'amount is null or undefined');
        this.mosaicId = mosaicId;
        this.amount = amount;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const amount = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, amount.getSize());
        return new UnresolvedMosaicBuilder(mosaicId, amount);
    }
    static createUnresolvedMosaicBuilder(mosaicId, amount) {
        return new UnresolvedMosaicBuilder(mosaicId, amount);
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getAmount() {
        return this.amount;
    }
    getSize() {
        let size = 0;
        size += this.mosaicId.getSize();
        size += this.amount.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const amountBytes = this.amount.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, amountBytes);
        return newArray;
    }
}
exports.UnresolvedMosaicBuilder = UnresolvedMosaicBuilder;
//# sourceMappingURL=UnresolvedMosaicBuilder.js.map