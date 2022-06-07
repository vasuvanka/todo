export class IP {
  ip!: string;
  city!: string;
  region!: string;
  country!: string;
  currency!: string;
  countryCapital!: string;
  countryName!: string;
  latitude!: string;
  longitude!: string;
  timezone!: string;
  utcOffset!: string;
  currencyName!: string;
  languages!: string;
  asn!: string;
  org!: string;

  static fromJson(json: any): IP {
    const ip = new IP();
    json = json || {};

    ip.ip = json.ip;
    ip.city = json.city;
    ip.region = json.region;
    ip.country = json.country_capital + ' - ' + json.country_name;
    ip.currency = `${json.currency_name}-${json.currency}`;
    ip.countryCapital = json.country_capital;
    ip.countryName = json.country_name;
    ip.latitude = json.latitude;
    ip.longitude = json.longitude;
    ip.timezone = json.timezone;
    ip.utcOffset = json.utc_offset;
    ip.currencyName = json.currency_name;
    ip.languages = json.languages;
    ip.asn = json.asn;
    ip.org = json.org;

    return ip;
  }
}
