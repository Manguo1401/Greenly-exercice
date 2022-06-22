import { isRatioAnArray } from "./store.typeguards";
import { PartnerName, PartnerOptions } from "./store.types";

// Constants that could change in time (Black friday etc). Maybe add them in a config file
const MAXIMUM_DISCOUNT = 50;

export class DiscountOffer {
  partnerName: PartnerName;
  expiresIn: number;
  discountInPercent: number;

  constructor(
    partnerName: PartnerName,
    expiresIn: number,
    discountRateInPercent: number
  ) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }
}

export class Store {
  discountOffers: DiscountOffer[];

  constructor(discountOffers: DiscountOffer[] = []) {
    this.discountOffers = discountOffers;
  }

  // TOUPGRADE : this map should be pushed to a DB to be able to personalise the different offers at any moment and add new ones dynamically. Would be loaded dynamically
  offersMap: Record<PartnerName, PartnerOptions> = {
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

  updateDiscounts() {

    this.discountOffers.forEach(offer => {
      const partnerOptions = this.getPartnerOption(offer.partnerName);
      this.updateExpiresIn(offer, partnerOptions);
      this.calculateDiscountInPercent(offer, partnerOptions);
      this.checkCancelOnExpire(offer, partnerOptions);
      this.checkMaximumDiscountLimit(offer);
    })

    return this.discountOffers;
  }

  calculateDiscountInPercent(offer: DiscountOffer, partnerOptions: PartnerOptions) {
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

  checkMaximumDiscountLimit(offer: DiscountOffer) {   
    if (offer.discountInPercent >= MAXIMUM_DISCOUNT ) return offer.discountInPercent = MAXIMUM_DISCOUNT;
  }

   checkCancelOnExpire(offer: DiscountOffer, partnerOptions: PartnerOptions) {
     if (offer.expiresIn < 0 && partnerOptions.cancelOnExpire) offer.discountInPercent = 0;
   } 
  
  updateExpiresIn(offer: DiscountOffer, partnerOptions: PartnerOptions) {
    if (partnerOptions.offer !== "Constant") offer.expiresIn--;

  }


  getDiscountStep(offer: DiscountOffer, partnerOptions: PartnerOptions): number {
    let discountStep = partnerOptions.discountStep || 1;

    if (isRatioAnArray(discountStep)) {
      const [expiresIn, ratio] = discountStep.find(ratioArray => offer.expiresIn <= ratioArray[0]) || [0,1];
      discountStep =  ratio;
    }

    if (offer.expiresIn < 0) discountStep = discountStep * 2;

    return discountStep;
  }

  getPartnerOption(partnerName: PartnerName): PartnerOptions {
    return this.offersMap[partnerName];
  }


}
