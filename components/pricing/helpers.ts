import type { ServiceType, Offer } from "./types";
interface Props {
  serviceId: ServiceType;
  offer: Offer;
}
export const getServiceNameById = ({ serviceId, offer }: Props) => {
  return offer.services.find((service) => service.id === serviceId)?.name;
};
