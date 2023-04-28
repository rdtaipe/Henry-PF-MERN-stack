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
  const [month, setMonth] = useState(1);
  const [sold, setSold] = useState();
  const [purchase, setPurchase] = useState();

  function fetchSold() {
    axios
      .get(`http://localhost:5000/stats/sales?month=${month}&year=${year - 1}`)
      .then((res) => {
        setSold(res.data);
      });
  }
  function fetchPurchase() {
    axios
      .get(
        `http://localhost:5000/stats/purchase?month=${month}&year=${year - 1}`
      )
      .then((res) => {
        setPurchase(res.data);
        console.log(purchase);
      });
  }

  useEffect(() => {
    fetchSold();
    fetchPurchase()
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

  function handleCharts(data) {
    const labels = data.map((el) => el.day);
    const datagrap = {
      labels,
      datasets: [
        {
          label: "ventas",
          data: data.map((el) => el.sold),
          backgroundColor: "green",
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
            <MenuItem value={i + 1} key={i}>{el}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {sold && <Bar options={options} data={handleCharts(sold)} height={80} />}
    </div>
  );
};

export default Sales;
