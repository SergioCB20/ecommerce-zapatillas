"use client";
import React, { useState } from "react";
import { registerUser } from "../../../lib/authService"; // Importa la función de registro

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Nuevo estado para el nombre de usuario
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Registra al usuario con Firebase Authentication
      await registerUser(email, password, username);
      setSuccess(true);
      setError("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
            fontSize: "24px",
          }}
        >
          Registro
        </h1>
        <form onSubmit={handleRegister}>
          {/* Campo de nombre de usuario */}
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
              required
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Campo de correo electrónico */}
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Campo de contraseña */}
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
          >
            Registrarse
          </button>
        </form>

        {/* Mensajes de error o éxito */}
        {error && (
          <p
            style={{
              marginTop: "15px",
              color: "red",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}
        {success && (
          <p
            style={{
              marginTop: "15px",
              color: "green",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            ¡Registro exitoso!
          </p>
        )}
      </div>
    </div>
  );
}