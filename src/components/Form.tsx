import { ChangeEvent, FormEvent, useState, useEffect, forwardRef, useMemo } from "react";
import type { SearchType } from "../types";
import { countries } from "../data/countries";
import styles from "../components/Form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faGlobe, faCity } from "@fortawesome/free-solid-svg-icons";

interface FormProps {
  fetchWeather: (search: SearchType) => Promise<void>;
}

// Lista de ciudades por país (puedes expandirla según necesidad)
const citiesByCountry: Record<string, string[]> = {
  US: ["New York", "Los Angeles", "Chicago", "Miami", "Houston", "Phoenix", "Philadelphia", "San Antonio", "An Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle", "Denver"],
  MX: ["Ciudad de México", "Guadalajara", "Monterrey", "Cancún", "Puebla", "Tijuana", "Mérida", "León", "Zapopan", "Acapulco", "Chihuahua", "San Luis Potosí", "Aguascalientes", "Hermosillo", "Saltillo", "Morelia", "Veracruz", "Tampico", "Durango", "Querétaro"],
  AR: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata", "San Miguel de Tucumán", "Mar del Plata", "Salta", "Santa Fe", "San Juan", "Resistencia", "Santiago del Estero", "Posadas", "Neuquén", "Bahía Blanca", "Paraná", "Formosa", "La Rioja", "San Luis", "Catamarca"],
  CO: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Cúcuta", "Bucaramanga", "Pereira", "Ibagué", "Pasto", "Manizales", "Neiva", "Villavicencio", "Popayán", "Valledupar", "Montería", "Sincelejo", "Tunja", "Florencia", "Riohacha"],
  BR: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre", "Belém", "Goiânia", "Guarulhos", "Campinas", "Nova Iguaçu", "São Gonçalo", "Maceió", "Duque de Caxias", "Natal", "Teresina"],
  CL: ["Santiago", "Valparaíso", "Concepción", "La Serena", "Antofagasta", "Viña del Mar", "Temuco", "Rancagua", "Talca", "Arica", "Iquique", "Puerto Montt", "Coquimbo", "Osorno", "Los Ángeles", "Calama", "Copiapó", "Quilpué", "Valdivia", "Punta Arenas"],
  ES: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao", "Alicante", "Córdoba", "Valladolid", "Vigo", "Gijón", "L'Hospitalet", "A Coruña", "Vitoria", "Granada", "Elche"],
  PE: ["Lima", "Arequipa", "Trujillo", "Cusco", "Chiclayo", "Piura", "Iquitos", "Chimbote", "Huaraz", "Ica", "Tacna", "Juliaca", "Cajamarca", "Pucallpa", "Sullana", "Chincha Alta", "Huaral", "Ayacucho", "Tarapoto", "Puno"]
};

const Form = forwardRef<HTMLFormElement, FormProps>(({ fetchWeather }, ref) => {
  const [search, setSearch] = useState<SearchType>({
    country: "",
    city: "",
  });
  const [alert, setAlert] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({
    country: false,
    city: false,
  });

  // Sugerencias de ciudades
  const citySuggestions = useMemo(() => {
    if (!search.country || !search.city) return [];
    const cities = citiesByCountry[search.country] || [];
    return cities.filter((city) =>
      city.toLowerCase().startsWith(search.city.toLowerCase())
    );
  }, [search.country, search.city]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Limpiar alerta a los 3 segundos
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Marcar el campo como tocado
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Limpiar alerta cuando el usuario comienza a escribir
    if (alert) {
      setAlert("");
    }
  };

  const handleBlur = (fieldName: keyof SearchType) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const validateForm = (): boolean => {
    if (!search.country.trim()) {
      setAlert("Por favor selecciona un país");
      return false;
    }

    if (!search.city.trim()) {
      setAlert("Por favor ingresa una ciudad");
      return false;
    }

    if (search.city.trim().length < 2) {
      setAlert("La ciudad debe tener al menos 2 caracteres");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await fetchWeather(search);
    } catch {
      setAlert("Error al consultar. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: keyof SearchType): string => {
    if (!touched[fieldName]) return "";

    const value = search[fieldName];

    if (fieldName === "country" && !value.trim()) {
      return "País es requerido";
    }

    if (fieldName === "city") {
      if (!value.trim()) {
        return "Ciudad es requerida";
      }
      if (value.trim().length < 2) {
        return "Mínimo 2 caracteres";
      }
    }

    return "";
  };

  return (
    <div className={styles.formWrapper}>
      <form
        ref={ref}
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className={styles.formHeader}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          <h2 className={styles.formTitle}>
            Ingresa un país y una ciudad para obtener información meteorológica
          </h2>
        </div>

        <div className={styles.fieldsContainer}>
          {/* País */}
          <div className={styles.field}>
            <label htmlFor="country" className={styles.label}>
              <FontAwesomeIcon icon={faGlobe} className={styles.fieldIcon} />
              País:
            </label>
            <div className={styles.inputWrapper}>
              <select
                id="country"
                value={search.country}
                name="country"
                onChange={handleChange}
                onBlur={() => handleBlur("country")}
                className={`${styles.select} ${
                  getFieldError("country") ? styles.error : ""
                }`}
                disabled={isSubmitting}
                aria-describedby={
                  getFieldError("country") ? "country-error" : undefined
                }
              >
                <option value="">Selecciona un País</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              {getFieldError("country") && (
                <span id="country-error" className={styles.errorMessage}>
                  {getFieldError("country")}
                </span>
              )}
            </div>
          </div>

          {/* Ciudad */}
          <div className={styles.field}>
            <label htmlFor="city" className={styles.label}>
              <FontAwesomeIcon icon={faCity} className={styles.fieldIcon} />
              Ciudad:
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="city"
                type="text"
                name="city"
                placeholder="Ej: Madrid, Barcelona, Valencia..."
                value={search.city}
                onChange={(e) => {
                  handleChange(e);
                  setShowSuggestions(true);
                }}
                onBlur={() => {
                  handleBlur("city");
                  setTimeout(() => setShowSuggestions(false), 100); // Espera para permitir click
                }}
                onFocus={() => setShowSuggestions(true)}
                className={`${styles.input} ${
                  getFieldError("city") ? styles.error : ""
                }`}
                disabled={isSubmitting}
                aria-describedby={
                  getFieldError("city") ? "city-error" : undefined
                }
                autoComplete="off"
              />
              {showSuggestions && citySuggestions.length > 0 && (
                <ul className={styles.suggestionsList}>
                  {citySuggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      className={styles.suggestionItem}
                      onMouseDown={() => {
                        setSearch((prev) => ({ ...prev, city: suggestion }));
                        setShowSuggestions(false);
                      }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
              {getFieldError("city") && (
                <span id="city-error" className={styles.errorMessage}>
                  {getFieldError("city")}
                </span>
              )}
            </div>
          </div>
        </div>

        {alert && (
          <div className={styles.alertContainer}>
            <div className={styles.formAlert}>
              {alert}
            </div>
          </div>
        )}

        <button
          type="submit"
          className={`${styles.submit} ${
            isSubmitting ? styles.submitting : ""
          }`}
          disabled={isSubmitting}
          aria-label={isSubmitting ? "Consultando..." : "Consultar"}
        >
          {isSubmitting ? (
            <>
              <div className={styles.spinner}></div>
              Consultando...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSearch} className={styles.submitIcon} />
              Consultar
            </>
          )}
        </button>
      </form>
    </div>
  );
});

Form.displayName = "Form";

export default Form;
