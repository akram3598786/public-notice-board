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
        // let url = "http://localhost:8080/notice/all";
        let url = "https://public-notice-opa.onrender.com/notice/all";
        axios.get(url).
            then((res) => {
            //    console.log(res.data)
                Setallnotices(res.data);
            }).
            catch((err) => {
                console.log(err);
                setError(true);
            }).finally(() => {
                setloading(false);
            })
    }

    const handleSubmit = () => {
        if (notice.length == 0) alert("Enter any notice !");
        else {
            let d = new Date();
            let d_arry = d.toString().split(" ");
            let day = d_arry[2];
            let month = d_arry[1];
            let year = d_arry[3];
            let hr = d.getHours();
            let timeSide = hr > 12 ? "PM" : "AM";
            let minutus = d.getMinutes();
            let hours = hr % 12 || 12;
            let curDate_nd_Time = day + "/" + month + "/" + year + " " + hours + ":" + minutus + " " + timeSide;

            let payload = {
                noticeText: notice,
                user: location.state.user,
                date: curDate_nd_Time
            }

            // let url = "http://localhost:8080/notice/create";
            let url = "https://public-notice-opa.onrender.com/notice/create";
            axios.post(url, payload).
                then((res) => {
                    if (res.status === 201) {
                        setnotice("")
                        getAllNotices();
                    };
                }).catch((err) => console.log(err));
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
                <p style={{ color: 'red',fontSize:'12px',margin :'0px' }}>Only 100 Characters</p>
                <button onClick={handleSubmit} className={styles.submitBtn}>Submit</button>
            </div>
            <hr />
            <div className={styles.noticesDiv}>
                <h4>All Notices</h4>
                {
                    loading ? <h1>Loading...</h1> :
                        error ? <h1 style={{ color: 'red' }}>No notice exist yet or Something went wrong</h1> :
                            <>
                                {allnotices.map((notice) => {
                                    return <div key={notice._id} className={styles.noticeCard}>
                                        <h4>{notice.noticeText}</h4>
                                        <div>
                                            <p>{notice.user}</p>
                                            <p>{notice.date}</p>
                                        </div>
                                    </div>
                                })}
                            </>
                }
            </div>
        </div>
    );
}