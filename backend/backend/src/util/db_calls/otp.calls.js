const saveOTP = (modelName, id, otp) => {
    const newOTPVerification = new modelName({
        userId: id,
        otp: otp,
        createdAt: Date.now(),
        expiresAt: Date.now() + 300000
      });
  
      newOTPVerification.save();
}

const findUserOTP = async (modelName, filter) => {
  const model = await modelName.findOne(filter);
  return model
}

const deleteOTP = async (modelName, filter) => {
  const model = await modelName.deleteMany(filter);
  return model
}
export {saveOTP, findUserOTP, deleteOTP};