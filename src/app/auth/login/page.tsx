"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/authService";
import Link from "next/link";
import { useUser } from "@/context/UserContext"; // Importa el hook useUser

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { user, loading } = useUser(); // Usa el hook useUser

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpiar error anterior

    try {
      await loginUser(email, password); // Usa la función login del contexto
      console.log("Usuario después del login:", user);
      router.push("/dashboard"); // Redirigir después del login exitoso
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Si es un error de tipo Error, usa su mensaje
      } else {
        setError("Error al iniciar sesión.");
      }
    }
  };

  if (loading) {
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "#6b7280",
          fontSize: "18px",
        }}
      >
        Cargando...
      </p>
    );
  }

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
        {/* Título */}
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
            fontSize: "24px",
          }}
        >
          Iniciar sesión
        </h1>
        {/* Formulario */}
        <form onSubmit={handleLogin}>
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
          {/* Botón de inicio de sesión */}
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
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Iniciar sesión
          </button>
        </form>
        {/* Mensajes de error */}
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
        {/* Enlaces adicionales */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link
            href="/auth/password"
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            ¿No tienes una cuenta?{" "}
            <Link
              href="/auth/register"
              style={{
                color: "#007bff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
