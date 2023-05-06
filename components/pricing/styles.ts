import styled from "styled-components";

export const PricingContainer = styled.div`
  max-width: 700px;
  padding: 1.5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PriceBeforeDiscount = styled.span`
  color: gray;
  text-decoration: line-through;
  margin: 0px 5px;
`;

export const PromotionInfo = styled.div<{ activeDiscount?: boolean }>`
  display: flex;
  color: ${(props) => (props.activeDiscount ? "red" : "gray")};
  font-weight: ${({ activeDiscount }) => (activeDiscount ? "bold" : "normal")};
  font-size: 0.8rem;
  margin-top: 0.4rem;
`;
