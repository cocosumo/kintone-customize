const env = {
  isStaging: true,
  prodAppId: 108,
};

export const envAppId = () => {
  if (env.isStaging) return env.prodAppId;
  return undefined;
};

export default env;
