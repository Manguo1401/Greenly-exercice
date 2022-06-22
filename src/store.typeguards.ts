import { PartnerOptions } from './store.types';

export const isRatioAnArray = (ratio: PartnerOptions['discountStep']): ratio is number[][] => {
    if (Array.isArray(ratio)) {
        return true;
      }
    return false;
}