import React, { useMemo } from "react";
import type { CartSummaryData, Offer } from "./types";
import { PriceBeforeDiscount, PromotionInfo } from "./styles";
import { v4 as uuidv4 } from "uuid";
import { getServiceNameById } from "./helpers";
interface Props {
  cartSummaryData: CartSummaryData;
  offer: Offer;
}
export const CartSummary = ({ cartSummaryData, offer }: Props) => {
  const sortedPromotionsByHighestDiscount = useMemo(() => {
    console.log(cartSummaryData.usedPromotions);
    return cartSummaryData.usedPromotions.sort(
      (a, b) => b.calculatedDiscount - a.calculatedDiscount
    );
  }, [cartSummaryData.usedPromotions]);

  return (
    <>
      <span>
        Łączna cena:
        {cartSummaryData.basePrice !== cartSummaryData.totalPrice && (
          <PriceBeforeDiscount>{cartSummaryData.basePrice}</PriceBeforeDiscount>
        )}
        {cartSummaryData.totalPrice} zł
      </span>
      {sortedPromotionsByHighestDiscount.length > 0 && (
        <div>
          Lista kwalifikujących się promocji, zaaplikowano najkorzystniejszą:
          {sortedPromotionsByHighestDiscount.map(({ promotionInfo }, index) => (
            <PromotionInfo key={uuidv4()} activeDiscount={index === 0}>
              {promotionInfo.type === "package" && (
                <>
                  Pakiet:{" "}
                  {offer &&
                    promotionInfo.services.map((serviceId, index) => (
                      <React.Fragment key={uuidv4()}>
                        {getServiceNameById({
                          serviceId: serviceId,
                          offer: offer,
                        })}
                        {promotionInfo.services.length - 1 !== index ? (
                          " + "
                        ) : (
                          <> kosztuje {promotionInfo.packagePrice} zł</>
                        )}
                      </React.Fragment>
                    ))}
                </>
              )}
              {promotionInfo.type === "gratis" && (
                <>
                  W pakiecie:{" "}
                  {promotionInfo.services.map((serviceId, index) => (
                    <React.Fragment key={uuidv4()}>
                      {getServiceNameById({
                        serviceId: serviceId,
                        offer: offer,
                      })}
                      {promotionInfo.services.length - 1 !== index ? (
                        " + "
                      ) : (
                        <>
                          {", "}
                          {getServiceNameById({
                            serviceId: promotionInfo.gratisItem,
                            offer: offer,
                          })}{" "}
                          jest dostępny za darmo
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </>
              )}
            </PromotionInfo>
          ))}
        </div>
      )}
    </>
  );
};
