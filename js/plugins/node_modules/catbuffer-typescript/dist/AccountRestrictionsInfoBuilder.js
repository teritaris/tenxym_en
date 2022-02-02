"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRestrictionsInfoBuilder = void 0;
const AccountRestrictionAddressValueBuilder_1 = require("./AccountRestrictionAddressValueBuilder");
const AccountRestrictionFlagsDto_1 = require("./AccountRestrictionFlagsDto");
const AccountRestrictionMosaicValueBuilder_1 = require("./AccountRestrictionMosaicValueBuilder");
const AccountRestrictionTransactionTypeValueBuilder_1 = require("./AccountRestrictionTransactionTypeValueBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class AccountRestrictionsInfoBuilder {
    constructor(restrictionFlags, addressRestrictions, mosaicIdRestrictions, transactionTypeRestrictions) {
        GeneratorUtils_1.GeneratorUtils.notNull(restrictionFlags, 'restrictionFlags is null or undefined');
        if (restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.ADDRESS) > -1) {
            GeneratorUtils_1.GeneratorUtils.notNull(addressRestrictions, 'addressRestrictions is null or undefined');
        }
        if (restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.MOSAIC_ID) > -1) {
            GeneratorUtils_1.GeneratorUtils.notNull(mosaicIdRestrictions, 'mosaicIdRestrictions is null or undefined');
        }
        if (restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.TRANSACTION_TYPE) > -1) {
            GeneratorUtils_1.GeneratorUtils.notNull(transactionTypeRestrictions, 'transactionTypeRestrictions is null or undefined');
        }
        this.restrictionFlags = restrictionFlags;
        this.addressRestrictions = addressRestrictions;
        this.mosaicIdRestrictions = mosaicIdRestrictions;
        this.transactionTypeRestrictions = transactionTypeRestrictions;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const restrictionFlags = GeneratorUtils_1.GeneratorUtils.toFlags(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto, GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray)));
        byteArray.splice(0, 2);
        let addressRestrictions = undefined;
        if (restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.ADDRESS) > -1) {
            addressRestrictions = AccountRestrictionAddressValueBuilder_1.AccountRestrictionAddressValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, addressRestrictions.getSize());
        }
        let mosaicIdRestrictions = undefined;
        if (restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.MOSAIC_ID) > -1) {
            mosaicIdRestrictions = AccountRestrictionMosaicValueBuilder_1.AccountRestrictionMosaicValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, mosaicIdRestrictions.getSize());
        }
        let transactionTypeRestrictions = undefined;
        if (restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.TRANSACTION_TYPE) > -1) {
            transactionTypeRestrictions = AccountRestrictionTransactionTypeValueBuilder_1.AccountRestrictionTransactionTypeValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, transactionTypeRestrictions.getSize());
        }
        return new AccountRestrictionsInfoBuilder(restrictionFlags, addressRestrictions, mosaicIdRestrictions, transactionTypeRestrictions);
    }
    static createAccountRestrictionsInfoBuilder(restrictionFlags, addressRestrictions, mosaicIdRestrictions, transactionTypeRestrictions) {
        return new AccountRestrictionsInfoBuilder(restrictionFlags, addressRestrictions, mosaicIdRestrictions, transactionTypeRestrictions);
    }
    getRestrictionFlags() {
        return this.restrictionFlags;
    }
    getAddressRestrictions() {
        if (!(this.restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.ADDRESS) > -1 && this.addressRestrictions)) {
            throw new Error('restrictionFlags is not set to ADDRESS.');
        }
        return this.addressRestrictions;
    }
    getMosaicIdRestrictions() {
        if (!(this.restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.MOSAIC_ID) > -1 && this.mosaicIdRestrictions)) {
            throw new Error('restrictionFlags is not set to MOSAIC_ID.');
        }
        return this.mosaicIdRestrictions;
    }
    getTransactionTypeRestrictions() {
        if (!(this.restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.TRANSACTION_TYPE) > -1 && this.transactionTypeRestrictions)) {
            throw new Error('restrictionFlags is not set to TRANSACTION_TYPE.');
        }
        return this.transactionTypeRestrictions;
    }
    getSize() {
        let size = 0;
        size += 2;
        if (this.restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.ADDRESS) > -1) {
            size += this.addressRestrictions.getSize();
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.MOSAIC_ID) > -1) {
            size += this.mosaicIdRestrictions.getSize();
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.TRANSACTION_TYPE) > -1) {
            size += this.transactionTypeRestrictions.getSize();
        }
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const restrictionFlagsBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(GeneratorUtils_1.GeneratorUtils.fromFlags(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto, this.restrictionFlags));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionFlagsBytes);
        if (this.restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.ADDRESS) > -1) {
            const addressRestrictionsBytes = this.addressRestrictions.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressRestrictionsBytes);
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.MOSAIC_ID) > -1) {
            const mosaicIdRestrictionsBytes = this.mosaicIdRestrictions.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdRestrictionsBytes);
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.TRANSACTION_TYPE) > -1) {
            const transactionTypeRestrictionsBytes = this.transactionTypeRestrictions.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transactionTypeRestrictionsBytes);
        }
        return newArray;
    }
}
exports.AccountRestrictionsInfoBuilder = AccountRestrictionsInfoBuilder;
//# sourceMappingURL=AccountRestrictionsInfoBuilder.js.map