
const validateVehicleNoFormat = (vehicleNo) => {
    const regex = /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/; // Example: TN22BB1234
    return regex.test(vehicleNo);
  };
  

  const isVehicleNoUnique = async (vehicleNo, DriverDetails) => {
    const existingVehicle = await DriverDetails.findOne({ vehicleNo });
    return !existingVehicle; 
  };
  
  module.exports = {
    validateVehicleNoFormat,
    isVehicleNoUnique,
  };
  