import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {

    const navigate = useNavigate();
    const {loginHandler} = useContext(AuthContext);
    const handleSignOut = () => {
       loginHandler(false);
       navigate('/login')
    }
    return (
        <div className={styles.NanDiv}>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}