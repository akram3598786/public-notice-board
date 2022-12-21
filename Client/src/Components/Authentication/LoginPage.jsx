import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import styles from "./LoginPage.module.css";

export default function Login(){
    const [Username, setUsername] = useState("");
    const {loginHandler} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick=()=>{
      if(Username.length == 0) alert("Enter username");
      else{
        loginHandler(true);
        navigate("/",{state:{user : Username}});
      }
    }

    return (
        <div className={styles.mainDiv}>
          <h3 style={{marginBottom : "0px"}}>Pick a username</h3>
          <span>Enter alphanumeric value e.g Akram123</span>
          <input type="text"  value={Username} onChange={(e)=>setUsername(e.target.value)} className={styles.UsernameInput}/>
          <button onClick={handleClick} className={styles.loginBtn}>Login</button>
        </div>
    );
}