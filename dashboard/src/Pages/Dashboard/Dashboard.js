import React from "react";
import styled from "styled-components";
import Sales from "./Charts/Sales";

export default function Dashboard(props) {
  return (
    <div>
      <h1>Dashboard</h1>
      <Sales />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
