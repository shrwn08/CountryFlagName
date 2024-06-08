import React, { useState, useEffect } from "react";
import axios from "axios";
import Circularprogress from "@mui/material/CircularProgress";
import "./card.css";

const Card = ({ item }) => {
  if (!item) {
    return (
      <div>
        <Circularprogress />
      </div>
    );
  }

  return (
    <div className="card">
      <img src={item.flags.png} alt={item.flags.alt} className="card-image" />
      <h3>{item.name.common}</h3>
    </div>
  );
};

const FlagCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryData = await axios.get(
          "https://restcountries.com/v3.1/all"
        );
        if (countryData.status === 200) {
          setData(countryData.data);
          console.log(countryData.data);
        }
      } catch (error) {
        console.log("unable to fetch data", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    <Circularprogress />;
  }

  return (
    <div className="container">
      <div className="cards-container">
        {data.map((item,index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FlagCard;
