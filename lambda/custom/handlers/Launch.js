const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },

  async handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const attributesManager = handlerInput.attributesManager;

    let prompt = '';
    const reprompt = `Ask for weather in London.`;

    const attributes = (await attributesManager.getPersistentAttributes()) || {};

    if (Object.keys(attributes).length === 0) {
      attributes.isFirstTime = false;
      attributesManager.setSessionAttributes(attributes);
      prompt += 'I am your weather skill. You can ask me for weather in london.';
    } else {
      prompt += 'Welcome back. I am all ready to help you again. You know the drill.';
    }

    return responseBuilder
      .speak(prompt)
      .reprompt(reprompt)
      .getResponse();
  },
};

module.exports = { LaunchRequestHandler };
