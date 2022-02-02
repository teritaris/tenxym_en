"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class TimestampDto {
    constructor(timestamp) {
        this.timestamp = timestamp;
    }
    static loadFromBinary(payload) {
        const timestamp = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new TimestampDto(timestamp);
    }
    getTimestamp() {
        return this.timestamp;
    }
    getSize() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getTimestamp());
    }
}
exports.TimestampDto = TimestampDto;
//# sourceMappingURL=TimestampDto.js.map