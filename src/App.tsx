import styles from "./App.module.css"
import Form from "./components/Form"

function App() {
  

  return (
    <>
      <h1 className={styles.title}>El tiempo</h1>
      <div className={styles.container}>
        <Form />
        <p>2</p>
      </div>
    </>
  )
}

export default App
