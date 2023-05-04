import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, Container } from "@mui/material";
import { useSelector } from 'react-redux'
ChartJS.register(ArcElement, Tooltip, Legend);

const Users = () => {
  const [userGenres, setUserGenres] = useState();
  const { url } = useSelector((state) => state.server);

  function fetchUsersGenres() {
    axios.get(`${url}stats/usersgenres`).then((res) => {
      setUserGenres(res.data);
    });
  }

  useEffect(() => {
    fetchUsersGenres();
  }, []);

  function handleCharts(usersGenres) {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: `Total Users: ${Object.values(userGenres).reduce(
            (acumulador, valorActual) => acumulador + valorActual,
            0
          )}`,
        },
      },
    };
    const labels = Object.keys(userGenres);
    const datagrap = {
      labels,
      datasets: [
        {
          data: Object.values(userGenres),
          backgroundColor: [
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 99, 132, 0.5)",
            "rgba(255, 206, 86, 0.5)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return { datagrap, options };
  }
  return (
    <Container sx={{ mt: 5 }}>
      {userGenres && (
        <Box width={350} height={350}>
          <Doughnut
            data={handleCharts(userGenres).datagrap}
            options={handleCharts(userGenres).options}
          />
        </Box>
      )}
    </Container>
  );
};

export default Users;
