const fetchProfileInfo = require('./../utilities/api/fetchProfileInfo');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },

  async handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const attributesManager = handlerInput.attributesManager;

    const profileInfo = await fetchProfileInfo(handlerInput);

    let prompt = '';

    if (profileInfo) {
      console.log(profileInfo);
      prompt += `Hi ${profileInfo.name.split(' ')[0]}. `;
    }

    const reprompt = `Ask for weather in London.`;

    let attributes;

    try {
      attributes = (await attributesManager.getPersistentAttributes()) || {};
    } catch (e) {
      console.log(e);
      attributes = {};
    }

    if (Object.keys(attributes).length === 0) {
      attributes.isFirstTime = false;
      prompt += 'I am your weather skill. You can ask me for weather in london.';
    } else {
      prompt += 'Welcome back. I am all ready to help you again. You know the drill.';
    }

    attributesManager.setSessionAttributes(attributes);

    return responseBuilder
      .speak(prompt)
      .reprompt(reprompt)
      .withSimpleCard('My Weather Skill', prompt)
      .getResponse();
  },
};

module.exports = { LaunchRequestHandler };
