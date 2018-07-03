const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },

  handle(handlerInput) {
    const prompt = `Welcome to your weather skill.`;
    const reprompt = `Ask for weather in London.`;

    return handlerInput.responseBuilder
      .speak(prompt + ` ` + reprompt)
      .reprompt(reprompt)
      .getResponse();
  }
};

module.exports = { LaunchRequestHandler };
