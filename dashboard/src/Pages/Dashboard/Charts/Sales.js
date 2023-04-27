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
  const [data, setData] = useState();

  function fetchdata() {
    axios
      .get(`http://localhost:5000/stats/sales?month=${month}&year=${year - 1}`)
      .then((res) => {setData(res.data);console.log(data);});
  }

  useEffect(() => {
    fetchdata();
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

  return (
    <div>
      <FormControl sx={{ mt: 2, width: 200, height: 20 }}>
        <InputLabel>Month</InputLabel>
        <Select value={month} label="month" onChange={(e) => handleMonth(e)}>
          <MenuItem value={1}>enero</MenuItem>
          <MenuItem value={2}>febrero</MenuItem>
          <MenuItem value={3}>marzo</MenuItem>
        </Select>
      </FormControl>
      {data && <Bar options={options} data={handleCharts(data)} height={80} />}
    </div>
  );
};

export default Sales;
