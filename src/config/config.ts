export default () => {
  return {
    port: process.env.PORT,
    db: {
      url: process.env.APP_DATABASE_SECRET_URL,
    },
    redis: {
      url: process.env.REDDIS_URL,
    },
  };
};
