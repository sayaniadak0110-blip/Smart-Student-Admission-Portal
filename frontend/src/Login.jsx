import { useState } from "react";

function Login({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {

        // Save JWT token
        localStorage.setItem("token", result.token);

        // Save logged-in user information
        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: result.userId,
            name: result.name,
            email: result.email,
            role: result.role,
          })
        );

        setMessage("Login successful!");

        setTimeout(() => {
          onClose();
          onLoginSuccess();
        }, 1000);

      } else {

        setMessage(
          result?.message ||
          "Invalid email or password"
        );
      }

    } catch (error) {

      console.error("Login error:", error);

      setMessage("Unable to connect to server.");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 10, 25, 0.72)",
        backdropFilter: "blur(12px)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "35px",
          borderRadius: "25px",
          background:
            "linear-gradient(145deg, rgba(20,110,150,0.95), rgba(5, 49, 82, 0.96))",
          border: "1px solid rgba(120,230,255,0.35)",
          boxShadow: "0 25px 70px rgba(0,0,0,0.45)",
          color: "white",
        }}
      >
        <button
          onClick={onClose}
          style={{
            float: "right",
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.1)",
            color: "white",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ×
        </button>

        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <div style={{ fontSize: "45px" }}>🎓</div>

          <h2 style={{ margin: "10px 0 5px" }}>
            Welcome Back
          </h2>

          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.7)",
              fontSize: "13px",
            }}
          >
            Login to Smart Admission
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontSize: "13px",
            }}
          >
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "13px",
              marginBottom: "17px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.18)",
              color: "white",
              outline: "none",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontSize: "13px",
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "13px",
              marginBottom: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.18)",
              color: "white",
              outline: "none",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "13px",
              border: "none",
              background:
                "linear-gradient(100deg, #248eff, #08cfff)",
              color: "white",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {message && (
          <p
            style={{
              marginTop: "18px",
              textAlign: "center",
              color: "#8ff8ff",
              fontSize: "13px",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;