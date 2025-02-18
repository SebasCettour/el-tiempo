import { useState } from "react";
import Alert from "./Alert/Alert";
import styles from "./App.module.css";
import Form from "./components/Form";
import Spinner from "./components/Spinner/Spinner";
import MoreDetails from "./components/WeatherDetail/MoreDetails";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";

function App() {
  const { weather, loading, notFound, fetchWeather, hasWeatherData } = useWeather();
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(prev => !prev);

  return (
    <>
      <h1 className={styles.title}>El tiempo</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />

        {loading && <Spinner />}

        {hasWeatherData && <WeatherDetail weather={weather} />}
        
        {hasWeatherData && (
          <>
            <button className={styles.toggleButton} onClick={toggleDetails}>
              {showDetails ? "Ver menos -" : "Ver más +"}
            </button>

            {/* Mostrar el componente MoreDetails solo si showDetails es verdadero */}
            {showDetails && <MoreDetails weather={weather} />}
          </>
        )}

        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  );
}

export default App;
