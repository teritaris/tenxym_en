"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceIdDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class NamespaceIdDto {
    constructor(namespaceId) {
        this.namespaceId = namespaceId;
    }
    static loadFromBinary(payload) {
        const namespaceId = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new NamespaceIdDto(namespaceId);
    }
    getNamespaceId() {
        return this.namespaceId;
    }
    getSize() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getNamespaceId());
    }
}
exports.NamespaceIdDto = NamespaceIdDto;
//# sourceMappingURL=NamespaceIdDto.js.map