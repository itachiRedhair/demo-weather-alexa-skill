const fetchWeather = require('./../utilities/api/fetchWeather');

const TellWeatherHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return request.type === 'IntentRequest' && request.intent.name === 'TellWeather';
  },

  async handle(handlerInput) {
    const citySlot = handlerInput.requestEnvelope.request.intent.slots.city;

    let cityName;
    if (citySlot && citySlot.value) {
      cityName = citySlot.value.toLowerCase();
    }

    let weatherInfo;
    if (cityName) {
      weatherInfo = await fetchWeather(cityName);
    } else {
      // TODO: Get Weather based on device address
    }

    let prompt;
    if (weatherInfo) {
      const temperature = weatherInfo.main.temp - 273;
      prompt = `Currently the temperature in london in ${temperature.toFixed(2)} celsius.`;
    } else {
      prompt = 'Sorry no weather information is available for this city.';
    }

    return handlerInput.responseBuilder
      .speak(prompt)
      .reprompt(`Ask me about weather in New York.`)
      .getResponse();
  }
};

module.exports = { TellWeatherHandler };
