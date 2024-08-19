import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { signUp } from "../../api/user";
import Alert from "../../shared/components/Alert/Alert";
import { z } from "zod";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const passwordForm = z
    .object({
      email: z.string().email({ message: "Email no valido" }),
      password: z
        .string()
        .min(6, { message: "Password debe tener al menos 6 caracteres" }),
      repeatPassword: z
        .string()
        .min(6, { message: "Password debe tener al menos 6 caracteres" }),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: "Passwords no coinciden",
      path: ["repeatPassword"], // path of error
    });

  const signup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = passwordForm.safeParse({
        email,
        password,
        repeatPassword,
      });

      if (!result.success) {
        setError(result.error.issues.map((issue) => issue.message).join(", "));
        return;
      }
      await signUp({ email, password });

      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.leftSide}>&nbsp;</div>
        <div className={styles.rightSide}>
          <div>
            <h2>MERU</h2>
          </div>
          <div>
            {error && <Alert message={error} variant="error" />}
            <form onSubmit={signup}>
              <div>
                <label>Correo Electronico: </label>
                <input
                  type="email"
                  className={styles.input}
                  value={email}
                  onChange={(emailValue) => setEmail(emailValue.target.value)}
                />
              </div>
              <div>
                <label>Contraseña: </label>
                <input
                  type="password"
                  className={styles.input}
                  value={password}
                  onChange={(passwordValue) =>
                    setPassword(passwordValue.target.value)
                  }
                />
              </div>
              <div>
                <label>Repetir Contraseña: </label>
                <input
                  type="password"
                  className={styles.input}
                  value={repeatPassword}
                  onChange={(passwordValue) =>
                    setRepeatPassword(passwordValue.target.value)
                  }
                />
              </div>
              <button className={styles.loginButton}>Crear Cuenta</button>
              <hr className={styles.separator} />
              <p>
                Ya tienes una cuenta?{" "}
                <Link to="/" className={styles.linkButton}>
                  Ingresa
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
