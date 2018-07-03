const Alexa = require("ask-sdk");

// Request Handlers
const { LaunchRequestHandler } = require("./handlers/Launch");
const {
  SessionEndedRequestHandler,
  ErrorHandler
} = require("./handlers/General");
const { TellWeatherHandler } = require("./handlers/Weather");

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    TellWeatherHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
