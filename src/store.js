"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = exports.DiscountOffer = void 0;
const store_typeguards_1 = require("./store.typeguards");
// Constants that could change in time (Black friday etc). Maybe add them in a config file
const MAXIMUM_DISCOUNT = 50;
class DiscountOffer {
    constructor(partnerName, expiresIn, discountRateInPercent) {
        this.partnerName = partnerName;
        this.expiresIn = expiresIn;
        this.discountInPercent = discountRateInPercent;
    }
}
exports.DiscountOffer = DiscountOffer;
class Store {
    constructor(discountOffers = []) {
        // TOUPGRADE : this map should be pushed to a DB to be able to personalise the different offers at any moment and add new ones dynamically. Would be loaded dynamically
        this.offersMap = {
            Velib: {
                offer: "Classic"
            },
            Naturalia: {
                offer: "Reversed"
            },
            Ilek: {
                offer: "Constant"
            },
            Vinted: {
                offer: "Reversed",
                cancelOnExpire: true,
                discountStep: [
                    [5, 3],
                    [10, 2]
                ]
            },
            BackMarket: {
                offer: "Classic",
                discountStep: 2
            }
        };
        this.discountOffers = discountOffers;
    }
    updateDiscounts() {
        this.discountOffers.forEach(offer => {
            const partnerOptions = this.getPartnerOption(offer.partnerName);
            this.updateExpiresIn(offer, partnerOptions);
            this.calculateDiscountInPercent(offer, partnerOptions);
            this.checkCancelOnExpire(offer, partnerOptions);
            this.checkMaximumDiscountLimit(offer);
        });
        return this.discountOffers;
    }
    calculateDiscountInPercent(offer, partnerOptions) {
        const discountStep = this.getDiscountStep(offer, partnerOptions);
        switch (partnerOptions.offer) {
            case "Constant":
                break;
            case "Reversed":
                return offer.discountInPercent = offer.discountInPercent + discountStep;
            case "Classic":
            default:
                return offer.discountInPercent = offer.discountInPercent - discountStep;
        }
    }
    checkMaximumDiscountLimit(offer) {
        if (offer.discountInPercent >= MAXIMUM_DISCOUNT)
            return offer.discountInPercent = MAXIMUM_DISCOUNT;
    }
    checkCancelOnExpire(offer, partnerOptions) {
        if (offer.expiresIn < 0 && partnerOptions.cancelOnExpire)
            offer.discountInPercent = 0;
    }
    updateExpiresIn(offer, partnerOptions) {
        if (partnerOptions.offer !== "Constant")
            offer.expiresIn--;
    }
    getDiscountStep(offer, partnerOptions) {
        let discountStep = partnerOptions.discountStep || 1;
        if ((0, store_typeguards_1.isRatioAnArray)(discountStep)) {
            const [expiresIn, ratio] = discountStep.find(ratioArray => offer.expiresIn <= ratioArray[0]) || [0, 1];
            discountStep = ratio;
        }
        if (offer.expiresIn < 0)
            discountStep = discountStep * 2;
        return discountStep;
    }
    getPartnerOption(partnerName) {
        return this.offersMap[partnerName];
    }
}
exports.Store = Store;
