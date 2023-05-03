import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Sales = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [sold, setSold] = useState();
  const [purchase, setPurchase] = useState();

  function fetchSold() {
    axios
      .get(`http://localhost:5000/stats/sales?month=${month}&year=${year}`)
      .then((res) => {
        setSold(res.data);
      });
  }
  function fetchPurchase() {
    axios
      .get(`http://localhost:5000/stats/purchases?month=${month}&year=${year}`)
      .then((res) => {
        setPurchase(res.data);
      });
  }

  useEffect(() => {
    fetchSold();
    fetchPurchase();
  }, [month]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "ventas 2022",
      },
    },
  };

  function handleCharts(sold, purchase) {
    const labels = Object.keys(sold);
    const datagrap = {
      labels,
      datasets: [
        {
          label: "entradas",
          data: Object.values(sold),
          backgroundColor: "green",
        },
        {
          label: "salidas",
          data: Object.values(purchase),
          backgroundColor: "red",
        },
      ],
    };
    return datagrap;
  }

  function handleMonth(event) {
    setMonth(event.target.value);
  }

  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <FormControl sx={{ mt: 2, width: 200, height: 20 }}>
        <InputLabel>Month</InputLabel>
        <Select value={month} label="month" onChange={(e) => handleMonth(e)}>
          {monthList.map((el, i) => (
            <MenuItem value={i + 1} key={i}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {sold && purchase && (
        <Bar
          options={options}
          data={handleCharts(sold, purchase)}
          height={80}
        />
      )}
      {sold && purchase && (
        <Container>
          <div>
            total sold:{" "}
            {Object.values(sold).reduce(
              (acumulador, valorActual) => acumulador + valorActual,
              0
            ).toFixed(2)}
          </div>
          <div>
            total purchase:{" "}
            {Object.values(purchase).reduce(
              (acumulador, valorActual) => acumulador + valorActual,
              0
            ).toFixed(2)}
          </div>
        </Container>
      )}
    </div>
  );
};

export default Sales;
