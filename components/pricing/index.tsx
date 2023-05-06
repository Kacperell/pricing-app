import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ServiceType, CartSummaryData, Offer } from "./types";
import { offers, years } from "./offer";
import { PricingContainer } from "./styles";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { CartSummary } from "./CartSummary";
const Pricing: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedServices, setSelectedServices] = useState<
    ServiceType[] | null
  >(null);

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const offer = useMemo(() => {
    return offers.find(
      (offerElement) => offerElement.year === selectedYear
    ) as Offer;
  }, [selectedYear]);

  const handleChooseService = (e: React.ChangeEvent<HTMLInputElement>) => {
    const serviceId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices === null) {
        return isChecked ? [serviceId] : null;
      }
      if (isChecked) {
        return [...prevSelectedServices, serviceId];
      }
      //delete service when is unchecked
      prevSelectedServices = prevSelectedServices.filter(
        (s) => s !== serviceId
      );
      const invalidServices = prevSelectedServices.filter((s) => {
        // check if services are invalid, this happens when service is only available when another is selected.
        const service = offer.services.find((srv) => srv.id === s);
        const requiredService = service?.availableOnlyWith;
        return (
          requiredService && !prevSelectedServices?.includes(requiredService)
        );
      });
      return prevSelectedServices.filter(
        // remove invalid services
        (s) => s !== serviceId && !invalidServices.includes(s)
      );
    });
  };

  const cartSummary = useMemo<CartSummaryData>(() => {
    if (!selectedServices || !offer) {
      return {
        basePrice: 0,
        totalPrice: 0,
        usedPromotions: [],
      };
    }

    const selectedServicesPrices = selectedServices.map((selectedServiceId) => {
      const selectedService = offer.services.find(
        (service) => service.id === selectedServiceId
      );
      if (selectedService === undefined) {
        return 0;
      }
      return selectedService.price;
    });

    const basePrice = selectedServicesPrices.reduce((a, b) => a + b, 0);

    const promotions = offer.promotions.filter((promotion) =>
      promotion.services.every((serviceId) =>
        selectedServices.includes(serviceId)
      )
    );

    const promotionsWithDiscountValues = promotions.map((promotion) => {
      if (promotion.type === "package") {
        const priceOfServicesFromPackageWithotuDiscount = promotion.services
          .map((serviceId) => {
            const service = offer.services.find(
              (service) => service.id === serviceId
            );
            if (service === undefined) {
              return 0;
            }
            return service.price;
          })
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        return {
          promotionInfo: promotion,
          calculatedDiscount:
            priceOfServicesFromPackageWithotuDiscount - promotion.packagePrice,
        };
      } else if (promotion.type === "gratis") {
        const priceOfGratisItemWithoutDiscount =
          offer.services.find((element) => element.id === promotion.gratisItem)
            ?.price ?? 0;

        return {
          promotionInfo: promotion,
          calculatedDiscount: priceOfGratisItemWithoutDiscount,
        };
      } else {
        throw new Error(`Unexpected promotion: ${promotion}`);
      }
    });

    if (!promotionsWithDiscountValues.length) {
      return {
        basePrice,
        totalPrice: basePrice,
        usedPromotions: [],
      };
    }
    const promotionWthTheBiggestDiscount = promotionsWithDiscountValues.reduce(
      (accumulator, currentValue) => {
        if (currentValue.calculatedDiscount > accumulator.calculatedDiscount) {
          return currentValue;
        }
        return accumulator;
      }
    );
    return {
      basePrice,
      totalPrice: basePrice - promotionWthTheBiggestDiscount.calculatedDiscount,
      usedPromotions: promotionsWithDiscountValues,
    };
  }, [selectedServices, offer]);

  return (
    <PricingContainer>
      <h1>Kalkulator usług telekomunikacyjnych</h1>
      <FormGroup>
        <InputLabel>Wybierz rok oferty</InputLabel>
        <Select value={`${selectedYear}`} onChange={handleYearChange}>
          {years.map((year) => (
            <MenuItem key={uuidv4()} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        {offer.services.map((service) => (
          <FormControlLabel
            key={uuidv4()}
            control={
              <Checkbox
                checked={selectedServices?.includes(service.id) || false}
                value={service.id}
                onChange={handleChooseService}
                disabled={
                  service.availableOnlyWith
                    ? !selectedServices?.includes(service.availableOnlyWith)
                    : false
                }
              />
            }
            label={`${service.name} - ${service.price} zł`}
          />
        ))}
      </FormGroup>
      <CartSummary cartSummary={cartSummary} offer={offer} />
    </PricingContainer>
  );
};

export default Pricing;
