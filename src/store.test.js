"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
// TOUPGRADE Testing could be robustified by adding for loops testing a month of days to be sure that any situation is checked.
describe("Checking store", () => {
    let store;
    describe("Checking active discounts", () => {
        beforeEach(() => {
            store = new store_1.Store([
                new store_1.DiscountOffer("Velib", 20, 30),
                new store_1.DiscountOffer("Naturalia", 10, 5),
                new store_1.DiscountOffer("Ilek", 15, 40),
                new store_1.DiscountOffer("Vinted", 20, 40),
                new store_1.DiscountOffer("BackMarket", 20, 40)
            ]);
            store.updateDiscounts();
        });
        it("should decrease the discount and expiresIn by 1 for Velib", () => {
            expect(store.discountOffers[0]).toEqual(new store_1.DiscountOffer("Velib", 19, 29));
        });
        it("should increase the discount by 1 and decrease expires in by 1 for Naturalia", () => {
            expect(store.discountOffers[1]).toEqual(new store_1.DiscountOffer("Naturalia", 9, 6));
        });
        it("should not change the discount for Ilek", () => {
            expect(store.discountOffers[2]).toEqual(new store_1.DiscountOffer("Ilek", 15, 40));
            expect(store.discountOffers[3]).toEqual(new store_1.DiscountOffer("Vinted", 19, 41));
        });
        it("should increase the discount by 1, 2 or 3  and decrease expiresIn by 1 for Vinted when expiresIn is respectively =<10, =<5", () => {
            let vintedStore = new store_1.Store([
                new store_1.DiscountOffer("Vinted", 15, 10),
                new store_1.DiscountOffer("Vinted", 10, 10),
                new store_1.DiscountOffer("Vinted", 5, 10)
            ]);
            vintedStore.updateDiscounts();
            expect(vintedStore.discountOffers).toEqual([
                new store_1.DiscountOffer("Vinted", 14, 11),
                new store_1.DiscountOffer("Vinted", 9, 12),
                new store_1.DiscountOffer("Vinted", 4, 13)
            ]);
        });
        it("should decrease the discount by 2 and expiresIn by 1 for BackMarket", () => {
            expect(store.discountOffers[4]).toEqual(new store_1.DiscountOffer("BackMarket", 19, 38));
        });
    });
    describe("Checking overdue discounts", () => {
        beforeEach(() => {
            store = new store_1.Store([
                new store_1.DiscountOffer("Velib", 0, 30),
                new store_1.DiscountOffer("Naturalia", 0, 5),
                new store_1.DiscountOffer("Ilek", 0, 40),
                new store_1.DiscountOffer("Vinted", 0, 40),
                new store_1.DiscountOffer("BackMarket", 0, 40)
            ]);
            store.updateDiscounts();
        });
        it("should decrease the discount by 2 and expiresIn by 1 if the expiration date has passed for Velib", () => {
            expect(store.discountOffers[0]).toEqual(new store_1.DiscountOffer("Velib", -1, 28));
        });
        it("should increase the discount by 2 and decrease expires in by 1 for Naturalia", () => {
            expect(store.discountOffers[1]).toEqual(new store_1.DiscountOffer("Naturalia", -1, 7));
        });
        it("should not change the discount for Ilek", () => {
            expect(store.discountOffers[2]).toEqual(new store_1.DiscountOffer("Ilek", 0, 40));
        });
        it("should have a discount back to 0 for Vinted", () => {
            expect(store.discountOffers[3]).toEqual(new store_1.DiscountOffer("Vinted", -1, 0));
        });
        it("should decrease the discount by 4 and expiresIn by 1 if the expiration date has passed for BackMarket", () => {
            expect(store.discountOffers[4]).toEqual(new store_1.DiscountOffer("BackMarket", -1, 36));
        });
    });
    describe("Checking 50% maximum discount", () => {
        beforeEach(() => {
            store = new store_1.Store([
                new store_1.DiscountOffer("Naturalia", 5, 50),
                new store_1.DiscountOffer("Vinted", 5, 50)
            ]);
            store.updateDiscounts();
        });
        it("should block the discount to 50% for all offers", () => {
            expect(store.discountOffers[0].discountInPercent).toBe(50);
            expect(store.discountOffers[1].discountInPercent).toBe(50);
        });
    });
});
