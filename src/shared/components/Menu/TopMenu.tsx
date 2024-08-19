import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/AuthProvider";
import styles from "./TopMenu.module.css";

const TopMenu = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  return (
    <div className={styles.menu}>
      <h2>MERU</h2>
      {token && (
        <div className={styles.buttonContainer}>
          
          <button
            className="primary"
            onClick={() => {
              setToken(null);
              navigate("/");
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default TopMenu;
