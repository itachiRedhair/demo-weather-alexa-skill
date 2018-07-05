const Alexa = require('ask-sdk');

// Request Handlers
const { LaunchRequestHandler } = require('./handlers/Launch');
const {
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  SessionEndedRequestHandler,
  GetAddressError,
  ErrorHandler
} = require('./handlers/General');
const { TellWeatherHandler } = require('./handlers/Weather');

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    TellWeatherHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(GetAddressError, ErrorHandler)
  .lambda();
