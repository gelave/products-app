import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { logIn } from "../../api/user";
import Alert from "../../shared/components/Alert/Alert";
import { useAuth } from "../../providers/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setToken } = useAuth()

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const loginResponse = await logIn({email, password});
      setToken(loginResponse.token);
      navigate("/home");
       
    } catch (error) {
      if (error instanceof Error){
        setError(error.message);
      }
    }
  }

  return(
    <div className={styles.outerContainer}>
      <div className={ styles.container }>
        <div className={ styles.leftSide }>&nbsp;</div>
        <div className={ styles.rightSide }>
          <div>
            <h2>MERU</h2>
          </div>
          <div>
            { error && <Alert message={error} variant="error"/>}
            <form onSubmit={login}>
              
              <div>
                <label>Correo Electronico: </label>
                <input type="email" className={styles.input} value={email} onChange={ (emailValue) => setEmail(emailValue.target.value) } />
              </div>
              <div>
                <label>Contraseña: </label>
                <input type="password" className={styles.input} value={password} onChange={ (passwordValue) => setPassword(passwordValue.target.value) } />
              </div>
              <button className={styles.loginButton}>Login</button>
              <hr className={styles.separator}/>
              <p>No tienes una cuenta? <Link to="signup" className={styles.linkButton}>Registrate</Link></p>
            </form>
          </div>
        </div>  
      </div>
      </div>
  )
}

export default Login