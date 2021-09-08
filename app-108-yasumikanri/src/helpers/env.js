const env = {
  isStaging: false,
  prodAppId: 108,
};

export const envAppId = () => {
  if (env.isStaging) return env.prodAppId;
  return undefined;
};

export default env;
