export enum ServiceType {
  Internet,
  Tv,
  Phone,
  Decoder,
}

interface Service {
  id: ServiceType;
  name: string;
  price: number;
  availableOnlyWith?: ServiceType;
}

type PackagePromotion = PromotionBase<"package"> & { packagePrice: number };
type GratisPromotion = PromotionBase<"gratis"> & { gratisItem: ServiceType };
interface PromotionBase<T extends "package" | "gratis"> {
  type: T;
  services: ServiceType[];
}
export type Promotion = PackagePromotion | GratisPromotion;

interface UsedPromotion {
  promotionInfo: Promotion;
  calculatedDiscount: number;
}
export interface CartSummaryData {
  basePrice: number;
  totalPrice: number;
  usedPromotions: UsedPromotion[];
}

export interface Offer {
  year: number;
  services: Service[];
  promotions: Promotion[];
}
