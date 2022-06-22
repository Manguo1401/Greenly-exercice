import { Store, DiscountOffer } from "./store";

// TOUPGRADE Testing could be robustified by adding for loops testing a month of days to be sure that any situation is checked.

describe("Checking store", () => {
  let store: Store;

  describe("Checking active discounts", () => {
    beforeEach(() => {
      store = new Store([
        new DiscountOffer("Velib", 20, 30),
        new DiscountOffer("Naturalia", 10, 5),
        new DiscountOffer("Ilek", 15, 40),
        new DiscountOffer("Vinted", 20, 40)
      ]);

      store.updateDiscounts();
    });

    it("should decrease the discount and expiresIn by 1 for Velib", () => {
      expect(store.discountOffers[0]).toEqual(
        new DiscountOffer("Velib", 19, 29)
      );
    });

    it("should increase the discount by 1 and decrease expires in by 1 for Naturalia", () => {
      expect(store.discountOffers[1]).toEqual(
        new DiscountOffer("Naturalia", 9, 6)
      );
    });

    it("should not change the discount for Ilek", () => {
      expect(store.discountOffers[2]).toEqual(
        new DiscountOffer("Ilek", 15, 40)
      );
      expect(store.discountOffers[3]).toEqual(
        new DiscountOffer("Vinted", 19, 41)
      );
    });

    it("should increase the discount by 1, 2 or 3  and decrease expiresIn by 1 for Vinted when expiresIn is respectively =<10, =<5", () => {
      let vintedStore = new Store([
        new DiscountOffer("Vinted", 15, 10),
        new DiscountOffer("Vinted", 10, 10),
        new DiscountOffer("Vinted", 5, 10)
      ]);
      vintedStore.updateDiscounts();

      expect(vintedStore.discountOffers).toEqual([
        new DiscountOffer("Vinted", 14, 11),
        new DiscountOffer("Vinted", 9, 12),
        new DiscountOffer("Vinted", 4, 13)
      ]);
    });
  });

  describe("Checking overdue discounts", () => {
    beforeEach(() => {
      store = new Store([
        new DiscountOffer("Velib", 0, 30),
        new DiscountOffer("Naturalia", 0, 5),
        new DiscountOffer("Ilek", 0, 40),
        new DiscountOffer("Vinted", 0, 40)
      ]);

      store.updateDiscounts();
    });

    it("should decrease the discount by 2 and expiresIn by 1 if the expiration date has passed for Velib", () => {
      expect(store.discountOffers[0]).toEqual(
        new DiscountOffer("Velib", -1, 28)
      );
    });

    it("should increase the discount by 2 and decrease expires in by 1 for Naturalia", () => {
      expect(store.discountOffers[1]).toEqual(
        new DiscountOffer("Naturalia", -1, 7)
      );
    });

    it("should not change the discount for Ilek", () => {
      expect(store.discountOffers[2]).toEqual(new DiscountOffer("Ilek", 0, 40));
    });

    it("should have a discount back to 0 for Vinted", () => {
      expect(store.discountOffers[3]).toEqual(
        new DiscountOffer("Vinted", -1, 0)
      );
    });
  });

  describe("Checking 50% maximum discount", () => {
    beforeEach(() => {
      store = new Store([
        new DiscountOffer("Naturalia", 5, 50),
        new DiscountOffer("Vinted", 5, 50)
      ]);
      store.updateDiscounts();
    });

    it("should block the discount to 50% for all offers", () => {
      expect(store.discountOffers[0].discountInPercent).toBe(50);
      expect(store.discountOffers[1].discountInPercent).toBe(50);
    });
  });
});
