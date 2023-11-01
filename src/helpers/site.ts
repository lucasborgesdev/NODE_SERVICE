const SITE_KEY_REPLACE_REGEX =
  /(^www.)*(^dev.)*(^tst.)*(^prd.)*(-store)*(-admin)*/g;

const getSiteKey = (siteURL: string) => {
  const { hostname } = new URL(siteURL);
  const [key] = hostname.replace(SITE_KEY_REPLACE_REGEX, '').split('.');
  return key;
};

export { getSiteKey };
