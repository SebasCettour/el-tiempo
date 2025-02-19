export const formatTemperature = (temperature: number): string => {
    const kelvin = 273.15;
    return (temperature - kelvin).toFixed(1).toString();
};

export const getWindDirection = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) return "Norte";
    if (deg >= 22.5 && deg < 67.5) return "Noreste";
    if (deg >= 67.5 && deg < 112.5) return "Este";
    if (deg >= 112.5 && deg < 157.5) return "Sureste";
    if (deg >= 157.5 && deg < 202.5) return "Sur";
    if (deg >= 202.5 && deg < 247.5) return "Suroeste";
    if (deg >= 247.5 && deg < 292.5) return "Oeste";
    if (deg >= 292.5 && deg < 337.5) return "Noroeste";
  };

  export const windSpeedKmH = (speed: number): string => {
    return (speed * 3.6).toFixed(1);
};
