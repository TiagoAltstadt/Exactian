import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderStyles.module.scss";

const Header = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.item}>
        <Link to="/">Registrar Movimiento</Link>
      </div>
      <div className={styles.item}>
        <Link to="/dentro">Empleados Trabajando</Link>
      </div>
      <div className={styles.item}>
        <Link to="/history">Historial</Link>
      </div>
    </nav>
  );
};

export default Header;
