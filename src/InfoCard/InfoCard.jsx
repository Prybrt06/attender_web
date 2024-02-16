/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import InfoTile from "../InfoTile/InfoTile";

import "./Style.css";

const InfoCard = ({ subject, setState }) => {
    const [infos, setInfos] = useState([]);
    const token = Cookies.get("token");
    const getUpdates = async () => {
        const res = await fetch(
            `https://attender-backend.onrender.com/update/${subject?.id}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (res.status >= 200 && res.status < 300) {
            const json = await res.json();

            console.log(json);
            const infos = json.updates;
            setInfos(infos);
        }
    };

    useEffect(() => {
        getUpdates();
    }, []);
    return (
        <div>
            <section className="info_header">
                <h3>{subject?.name}</h3>
                <div>
                    <h2
                        className="cancel_bt"
                        onClick={() => {
                            setState(1);
                        }}
                    >
                        ✗
                    </h2>
                </div>
            </section>
            <section id="infos">
                {infos.map((info, index) => (
                    <InfoTile info={info} />
                ))}
            </section>
        </div>
    );
};

export default InfoCard;
