import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderStyles.module.scss";

const Header = () => {
  return (
    <nav className={styles.header}>
      <a href="https://exactian.com/landing/">
        <img src="logo.png" alt="" />
      </a>

      <div className={styles.options}>
        <div className={styles.item}>
          <Link to="/">Registrar Movimientos</Link>
        </div>
        <div className={styles.item}>
          <Link to="/logged-in">Personal Activo</Link>
        </div>
        <div className={styles.item}>
          <Link to="/history">Historial</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
