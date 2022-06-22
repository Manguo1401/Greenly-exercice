export type PartnerName =
  | "Velib"
  | "Naturalia"
  | "Vinted"
  | "Ilek"
  | "BackMarket";

type Offer = "Classic" | "Reversed" | "Constant";

export type PartnerOptions = {
  offer: Offer;
  cancelOnExpire?: boolean;
  discountStep?: number | number[][]; // If number[][] the nested array is a composition [day, exponentialRatio]
};
