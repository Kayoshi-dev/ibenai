import { Util } from "leaflet";
import trim = Util.trim;

interface IAdressData {
  house_number?: string;
  country: string;
  country_code: string;
  county: string;
  municipality: string;
  postcode: string;
  region: string;
  road: string;
  state: string;
  town: string;
  city: string;
  isolated_dwelling: string;
  locality: string;
  village: string;
}

export function addressFormatted(addressData: {
  address: IAdressData;
}): string {
  return trim(
    `${addressData?.address?.house_number || ""} ${
      addressData?.address?.road ||
      addressData?.address?.isolated_dwelling ||
      addressData?.address?.locality ||
      ""
    } ${
      addressData?.address?.city ||
      addressData?.address?.town ||
      addressData?.address?.village ||
      ""
    }`
  );
}
