import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { useLocation } from "react-router-dom";
import styles from "./Notices.module.css";
import { useState } from "react";

export default function Homepage() {

    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);
    const location = useLocation();
    const [notice, setnotice] = useState("");
    // location.state.user
    const checkAuth = () => {
        if (!isAuth) navigate("/login", { state: { message: 'User not logged in !' } })
    }
    useEffect(() => {
        checkAuth();
    }, []);

    const handleSubmit = () => {
      if(notice.length == 0) alert("Enter any notice !")
    }

    return (
        <div className={styles.mainDiv}>
            <h3>Notice Board</h3>
            <div className={styles.inputSection}>
                <h5>Submit a notice :</h5>
                <input type="text" value={notice} onChange={(e) => setnotice(e.target.value)} className={styles.noticeInput} /> <br />
                <button onClick={handleSubmit} className={styles.submitBtn}>Submit</button>
            </div>
            <hr />
            <div className={styles.noticesDiv}>
                <h4>All Notices</h4>
            </div>
        </div>
    );
}