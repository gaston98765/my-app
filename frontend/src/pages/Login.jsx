import { useState } from "react";
import { Link } from "react-router-dom";

 function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    alert("Login successful (front-end only)");
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button className="btn-primary">Login</button>
      </form>

      <p>Don’t have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}
export default Login;
