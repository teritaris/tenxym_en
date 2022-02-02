"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmountDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class AmountDto {
    constructor(amount) {
        this.amount = amount;
    }
    static loadFromBinary(payload) {
        const amount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new AmountDto(amount);
    }
    getAmount() {
        return this.amount;
    }
    getSize() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getAmount());
    }
}
exports.AmountDto = AmountDto;
//# sourceMappingURL=AmountDto.js.map