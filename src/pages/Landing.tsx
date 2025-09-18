import { useNavigate } from "react-router-dom";

export default function Landing() {

  const nav = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">𓆩𓁺𓆪 Welcome, King Artur 𓆩𓁺𓆪</h1>
      <p className="landing-subtitle">
        One place. All control.
      </p>
      <button onClick={() => nav("/dashboard")} className="landing-button">Enter</button>
    </div>
  );
}