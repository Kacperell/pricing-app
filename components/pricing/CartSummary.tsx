import React, { useMemo } from "react";
import type { CartSummaryData, Offer } from "./types";
import { PriceBeforeDiscount, PromotionInfo } from "./styles";
import { v4 as uuidv4 } from "uuid";
import { getServiceNameById } from "./helpers";
interface Props {
  cartSummary: CartSummaryData;
  offer: Offer;
}
export const CartSummary = ({ cartSummary, offer }: Props) => {
  const sortedPromotionsByHighestDiscount = useMemo(() => {
    console.log(cartSummary.usedPromotions);
    return cartSummary.usedPromotions.sort(
      (a, b) => b.calculatedDiscount - a.calculatedDiscount
    );
  }, [cartSummary.usedPromotions]);

  return (
    <>
      <span>
        Łączna cena:
        {cartSummary.basePrice !== cartSummary.totalPrice && (
          <PriceBeforeDiscount>{cartSummary.basePrice}</PriceBeforeDiscount>
        )}
        {cartSummary.totalPrice} zł
      </span>
      {sortedPromotionsByHighestDiscount.length > 0 && (
        <div>
          Lista kwalifikujących się promocji, zaaplikowano najkorzystniejszą:
          {sortedPromotionsByHighestDiscount.map(({ promotionInfo }, i) => (
            <PromotionInfo key={uuidv4()} activeDiscount={i === 0}>
              {promotionInfo.type === "package" && (
                <>
                  Pakiet:{" "}
                  {offer &&
                    promotionInfo.services.map((serviceId, i) => (
                      <React.Fragment key={uuidv4()}>
                        {getServiceNameById({
                          serviceId: serviceId,
                          offer: offer,
                        })}
                        {promotionInfo.services.length - 1 !== i ? (
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
                  {promotionInfo.services.map((serviceId, i) => (
                    <React.Fragment key={uuidv4()}>
                      {getServiceNameById({
                        serviceId: serviceId,
                        offer: offer,
                      })}
                      {promotionInfo.services.length - 1 !== i ? (
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
