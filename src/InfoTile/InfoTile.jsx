/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const InfoTile = ({ info }) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    timeZone: "Asia/Kolkata",
  };

  const [formatedTime, setFromatedTime] = useState("");

  useEffect(() => {
    const time = new Date(info?.createdAt);
    const fTime = time.toLocaleDateString("en-IN", options);
    setFromatedTime(fTime);
  }, []);

  return <div className="infoTile">{formatedTime}</div>;
};

export default InfoTile;
