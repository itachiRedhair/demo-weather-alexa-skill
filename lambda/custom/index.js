const Alexa = require('ask-sdk');

// Request Handlers
const { LaunchRequestHandler } = require('./handlers/Launch');
const {
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  SessionEndedRequestHandler,
  GetAddressError,
  ErrorHandler,
} = require('./handlers/General');
const { TellWeatherHandler } = require('./handlers/Weather');

const skillBuilder = Alexa.SkillBuilders.standard();

const PersistenceSavingResponseInterceptor = {
  process(handlerInput) {
    return new Promise((resolve, reject) => {
      const attributesManager = handlerInput.attributesManager;
      const sessionAttributes = attributesManager.getSessionAttributes(); // Get Session Attributes
      attributesManager.setPersistentAttributes(sessionAttributes); // Provide Session Attributes to Attribute Manager for Persistence
      attributesManager
        .savePersistentAttributes() // Persist those attributes
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    TellWeatherHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
  )
  .addResponseInterceptors(PersistenceSavingResponseInterceptor)
  .addErrorHandlers(GetAddressError, ErrorHandler)
  .withTableName('MyWeatherTable')
  .withAutoCreateTable(true)
  .lambda();
