const TellWeatherHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return request.type === 'IntentRequest' && request.intent.name === 'TellWeather';
  },

  async handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(`Here's the weather in London.`)
      .reprompt(`Ask me about weather in New York.`)
      .getResponse();
  }
};

module.exports = { TellWeatherHandler };
