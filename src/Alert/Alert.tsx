import { ReactNode } from "react";
import styles from "./Alert.module.css";

interface AlertProps {
  children: ReactNode;
  type?: "error" | "warning" | "info" | "success";
  className?: string;
}

export default function Alert({ 
  children, 
  type = "error", 
  className = "" 
}: AlertProps) {
  return (
    <div 
      className={`${styles.alert} ${styles[type]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      {children}
    </div>
  );
}
