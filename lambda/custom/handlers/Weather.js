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

    console.log(cityName);

    return handlerInput.responseBuilder
      .speak(`Here's the weather in London.`)
      .reprompt(`Ask me about weather in New York.`)
      .getResponse();
  }
};

module.exports = { TellWeatherHandler };
