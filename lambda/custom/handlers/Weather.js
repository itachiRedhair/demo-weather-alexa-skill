const TellWeatherHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return request.type === intents.type.IntentRequest && request.intent.name === 'TellWeather';
  },

  async handle(handlerInput) {
    // TODO: extract slots from request and pass it to fetchWeather api and get response and tell the response
    //
    return handlerInput.responseBuilder
      .speak(`Here's the weather in London.`)
      .reprompt(`Ask me about weather in New York.`)
      .getResponse();
  }
};

module.exports = { TellWeatherHandler };
