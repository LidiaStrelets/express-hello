module.exports = {
  secret: 'mySuperPwd',
  port: process.env.PORT || 4000,
  production: process.NODE_ENV === 'production' ? true : false,
};
