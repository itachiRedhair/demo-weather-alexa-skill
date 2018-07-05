const fetchDeviceAddress = async handlerInput => {
  const { requestEnvelope, serviceClientFactory } = handlerInput;
  try {
    const { deviceId } = requestEnvelope.context.System.device;
    const deviceAddressServiceClient = serviceClientFactory.getDeviceAddressServiceClient();
    const address = await deviceAddressServiceClient.getFullAddress(deviceId);

    console.log('Address successfully retrieved, now responding to user.');

    return address;
  } catch (error) {
    throw error;
  }
};

module.exports = fetchDeviceAddress;
