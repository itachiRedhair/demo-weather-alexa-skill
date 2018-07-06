const fetchWeather = require('./../utilities/api/fetchWeather');
const fetchDeviceAddress = require('./../utilities/api/fetchDeviceAddress');

const states = {
  WEATHER: 'WEATHER',
};

const TellWeatherHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return request.type === 'IntentRequest' && request.intent.name === 'TellWeather';
  },

  async handle(handlerInput) {
    const citySlot = handlerInput.requestEnvelope.request.intent.slots.city;

    let cityName;
    if (citySlot && citySlot.value) {
      cityName = citySlot.value;
    }

    let weatherInfo;
    if (cityName) {
      weatherInfo = await fetchWeather(cityName);
    } else {
      const deviceAddress = await fetchDeviceAddress(handlerInput);
      console.log(deviceAddress);

      if (deviceAddress && deviceAddress.city) {
        cityName = deviceAddress.city;
        weatherInfo = await fetchWeather(deviceAddress.city);
      }
    }

    let prompt;
    if (weatherInfo) {
      // Generating prompt based on temperature
      const temperature = weatherInfo.main.temp - 273;
      prompt = `Currently the temperature in ${cityName} in ${temperature.toFixed(2)} celsius.`;

      // Setting state attribute --> "WEATHER" for contextual response
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.state = states.WEATHER;
      attributes.weatherInfo = weatherInfo;
      handlerInput.attributesManager.setSessionAttributes(attributes);
    } else {
      prompt = 'Sorry no weather information is available for this city.';
    }

    return handlerInput.responseBuilder
      .speak(prompt)
      .reprompt(`Ask me about weather in New York.`)
      .getResponse();
  },
};

const MoreInformationHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    const attributes = handlerInput.attributesManager.getSessionAttributes();

    return (
      attributes.state === 'WEATHER' && // <-- This will insure that MoreInformationHandler---
      request.type === 'IntentRequest' && // ---will only be called after successful prompt of temperature from TellWeatherHandler
      request.intent.name === 'MoreInformation'
    );
  },

  async handle(handlerInput) {
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    attributes.state = '';
    handlerInput.attributesManager.setSessionAttributes(attributes);

    const weatherInfo = attributes.weatherInfo;

    let prompt;
    if (weatherInfo) {
      prompt = `Wind is running at ${
        weatherInfo.wind.speed
      } metres per second in the direction of ${
        weatherInfo.wind.deg
      } meteorological degrees and humidity is ${weatherInfo.main.humidity} percentage.`;
    } else {
      prompt = 'No more information is available.';
    }

    return handlerInput.responseBuilder
      .speak(prompt)
      .reprompt(`Ask me about weather in New York.`)
      .getResponse();
  },
};

module.exports = { TellWeatherHandler, MoreInformationHandler };
