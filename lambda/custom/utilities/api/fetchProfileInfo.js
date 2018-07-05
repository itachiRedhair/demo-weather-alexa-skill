const fetch = require('node-fetch');

const AMAZON_PROFILE_URL = 'https://api.amazon.com/user/profile?access_token=';

const fetchProfileInfo = async handlerInput => {
  const { requestEnvelope } = handlerInput;
  const { accessToken } = requestEnvelope.context.System.user;

  if (accessToken) {
    const response = await fetch(AMAZON_PROFILE_URL + accessToken);
    const profileInfo = await response.json();
    return profileInfo;
  } else {
    return;
  }
};

module.exports = fetchProfileInfo;
