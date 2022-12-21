import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { useLocation } from "react-router-dom";
import styles from "./Notices.module.css";
import { useState } from "react";
import axios from 'axios';

export default function Homepage() {

    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);
    const location = useLocation();
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(false);
    const [notice, setnotice] = useState("");
    const [allnotices, Setallnotices] = useState([]);

    const checkAuth = () => {
        if (!isAuth) navigate("/login", { state: { message: 'User not logged in !' } })
    }

    const getAllNotices = () => {
        let url = "http://localhost:8080/notice/all";
        axios.get(url).
            then((res) => {
                console.log(res.data)
                Setallnotices(res.data)}).
            catch((err) => {
                console.log(err);
                setError(true);
            }).finally(()=>{
                setloading(false);
            })
    }

    const handleSubmit = () => {  
        if (notice.length == 0) alert("Enter any notice !");
        else {
            let payload = {
                noticeText : notice,
                user : location.state.user
            }
            let url = "http://localhost:8080/notice/create";
            axios.post(url, payload).
            then((res)=>{
                if(res.status === 201) getAllNotices() ;
            }).catch((err)=>console.log(err));
        }
    }

    useEffect(() => {
        checkAuth();
        setloading(true);
        getAllNotices();
    }, []);

    return (
        <div className={styles.mainDiv}>
            <h3>Notice Board</h3>
            <div className={styles.inputSection}>
                <h5>Submit a notice :</h5>
                <textarea type="text" value={notice} onChange={(e) => setnotice(e.target.value)} maxLength="100" className={styles.noticeInput} /> <br />
                <button onClick={handleSubmit} className={styles.submitBtn}>Submit</button>
            </div>
            <hr />
            <div className={styles.noticesDiv}>
                <h4>All Notices</h4>
                {
                    loading ? <h1>Loading...</h1> :
                        error ? <h1 style={{ color: 'red' }}>No Notice exist yet or Something Went Wrong</h1> :     
                          <>
                            {allnotices.map((notice)=>{
                               return <div key={notice._id} className={styles.noticeCard}>
                               <h4>{notice.noticeText}</h4>
                               <div>
                                   <p>{notice.user}</p>
                                   <p>{notice.createdAt}</p>
                               </div>
                           </div> 
                            })}
                          </>
                }

            </div>
        </div>
    );
}