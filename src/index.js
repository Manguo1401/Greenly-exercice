"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const fs_1 = __importDefault(require("fs"));
const discountOffers = [
    new store_1.DiscountOffer("Velib", 20, 30),
    new store_1.DiscountOffer("Naturalia", 10, 5),
    new store_1.DiscountOffer("Vinted", 5, 40),
    new store_1.DiscountOffer("Ilek", 15, 40)
];
const store = new store_1.Store(discountOffers);
const log = [];
for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
    log.push(JSON.stringify(store.updateDiscounts()));
}
/* eslint-disable no-console */
fs_1.default.writeFile("output.txt", log.toString(), err => {
    if (err) {
        console.log("error");
    }
    else {
        console.log("success");
    }
});
/* eslint-enable no-console */
