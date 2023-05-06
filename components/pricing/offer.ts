import type { Offer } from "./types";
import { ServiceType } from "./types";

export const offers: Offer[] = [
  {
    year: 2025,
    services: [
      {
        id: ServiceType.Internet,
        name: "Internet",
        price: 59,
      },
      {
        id: ServiceType.Tv,
        name: "Telewizja",
        price: 59,
      },
      {
        id: ServiceType.Phone,
        name: "Abonament telefoniczny",
        price: 29,
      },
      {
        id: ServiceType.Decoder,
        name: "Dekoder 4k",
        price: 29,
        availableOnlyWith: ServiceType.Tv,
      },
    ],
    promotions: [
      {
        type: "package",
        services: [ServiceType.Internet, ServiceType.Tv],
        packagePrice: 99,
      },
      {
        type: "package",
        services: [ServiceType.Internet, ServiceType.Phone],
        packagePrice: 64,
      },
      {
        type: "gratis",
        services: [ServiceType.Decoder, ServiceType.Internet, ServiceType.Tv],
        gratisItem: ServiceType.Decoder,
      },
    ],
  },
  {
    year: 2024,
    services: [
      {
        id: ServiceType.Internet,
        name: "Internet",
        price: 49,
      },
      {
        id: ServiceType.Tv,
        name: "Telewizja",
        price: 49,
      },
      {
        id: ServiceType.Phone,
        name: "Abonament telefoniczny",
        price: 29,
      },
      {
        id: ServiceType.Decoder,
        name: "Dekoder 4k",
        price: 29,
        availableOnlyWith: ServiceType.Tv,
      },
    ],
    promotions: [
      {
        type: "package",
        services: [ServiceType.Internet, ServiceType.Tv],
        packagePrice: 89,
      },
      {
        type: "package",
        services: [ServiceType.Internet, ServiceType.Phone],
        packagePrice: 64,
      },
      {
        type: "gratis",
        services: [ServiceType.Decoder, ServiceType.Internet, ServiceType.Tv],
        gratisItem: ServiceType.Decoder,
      },
    ],
  },
  {
    year: 2023,
    services: [
      {
        id: ServiceType.Internet,
        name: "Internet",
        price: 39,
      },
      {
        id: ServiceType.Tv,
        name: "Telewizja",
        price: 49,
      },
      {
        id: ServiceType.Phone,
        name: "Abonament telefoniczny",
        price: 29,
      },
      {
        id: ServiceType.Decoder,
        name: "Dekoder 4k",
        price: 29,
        availableOnlyWith: ServiceType.Tv,
      },
    ],
    promotions: [
      {
        type: "package",
        services: [ServiceType.Internet, ServiceType.Tv],
        packagePrice: 79,
      },
      {
        type: "package",
        services: [ServiceType.Internet, ServiceType.Phone],
        packagePrice: 64,
      },
      {
        type: "gratis",
        services: [ServiceType.Decoder, ServiceType.Internet, ServiceType.Tv],
        gratisItem: ServiceType.Decoder,
      },
    ],
  },
];
export const years = offers.map((offer) => offer.year);
