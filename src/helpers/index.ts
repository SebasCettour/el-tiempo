export const formatTemperature = (temperature: number): string => {
    const kelvin = 273.15;
    return (temperature - kelvin).toFixed(1).toString();
};
