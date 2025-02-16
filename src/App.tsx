import styles from "./App.module.css"
import Form from "./components/Form"
import useWeather from "./hooks/useWeather"

function App() {
  
const {fetchWeather} = useWeather()
  return (
    <>
      <h1 className={styles.title}>El tiempo</h1>
      <div className={styles.container}>
        <Form 
        fetchWeather={fetchWeather}
        
        />
        <p>2</p>
      </div>
    </>
  )
}

export default App
