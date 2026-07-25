import "./Spinner.css";

interface SpinnerProps {
  size?: number;
  color?: string;
  label?: string;
}

export default function Spinner({
  size = 60,
  color = "#00c6fb",
  label = "Cargando",
}: SpinnerProps) {
  return (
    <div
      className="sk-cube-grid"
      role="status"
      aria-label={label}
      style={
        {
          width: size,
          height: size,
          "--sk-color": color,
        } as React.CSSProperties
      }
    >
      <div className="sk-cube sk-cube1"></div>
      <div className="sk-cube sk-cube2"></div>
      <div className="sk-cube sk-cube3"></div>
      <div className="sk-cube sk-cube4"></div>
      <div className="sk-cube sk-cube5"></div>
      <div className="sk-cube sk-cube6"></div>
      <div className="sk-cube sk-cube7"></div>
      <div className="sk-cube sk-cube8"></div>
      <div className="sk-cube sk-cube9"></div>
      <span className="sr-only">{label}...</span>
    </div>
  );
}
