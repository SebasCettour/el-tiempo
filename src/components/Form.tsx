import { ChangeEvent, FormEvent, useState } from "react";
import type { SearchType } from "../types";
import { countries } from "../data/countries";
import styles from "../components/Form.module.css";
import Alert from "../Alert/Alert";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
};

export default function Form({ fetchWeather }: FormProps) {
  const [search, setSearch] = useState<SearchType>({
    country: "",
    city: "",
  });
  const [alert, setAlert] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
      return;
    }
    fetchWeather(search);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="country" className={styles.label}>
          País:
        </label>
        <select
          id="country"
          value={search.country}
          name="country"
          onChange={handleChange}
          className={styles.input}
        >
          <option value="">Seleccione un País</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {alert && <Alert>{alert}</Alert>}

      <div className={styles.field}>
        <label htmlFor="city" className={styles.label}>
          Ciudad:
        </label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="Ciudad"
          value={search.city}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.submit}>
        Consultar
      </button>
    </form>
  );
}