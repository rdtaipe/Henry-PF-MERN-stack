import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Badge,
  Title,
  Button,
  //Icon,
} from "@tremor/react";

//import { ToggleOff, ToggleOn, Done, Adjust } from "@mui/icons-material";
import { Notification } from "../../Components/Notification/Notification";

//import data from './data.json'
/* import './user.css' */

export default function Users(props) {
  const [users, setUsers] = useState();

  //no se como conseguir la url
  //let selector=useSelector();
  //let users=selector(state=>state.server)

  const loadUser = async () => {
    const res = await axios.get("http://localhost:5000/users");

    //await setUsers(res.data);
    // return res.data;
    let all = await res.data;
    setUsers(all);
  };

  useEffect(() => {
    loadUser();
  }, []);

  // habilitar usuarios
  const handleEnable = (status, id) => {
    // console.log("cambio", status, id);

    if (status === "active") {
      axios.put(`http://localhost:5000/users/${id}`, { status: "inactive" });

      Notification(
        "warning",
        `user ${id} has been disabled `,
        "bottom-start",
        2000
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else if (status === "inactive" || status === "suspend") {
      axios.put(`http://localhost:5000/users/${id}`, { status: "active" });
      Notification(
        "success",
        `user ${id} has been enabled `,
        "bottom-end",
        3000
      );
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  // agregar mas usuarios
  const handleAdmin = (role, id) => {
    console.log(role, id);

    if (role === "admin") {
      axios.put(`http://localhost:5000/users/${id}`, { role: "user" });
      Notification("info", `user role changed`, "bottom-start", 3000);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      axios.put(`http://localhost:5000/users/${id}`, { role: "admin" });
      Notification(
        "warning",
        `user role changed to ADMIN `,
        "bottom-end",
        3000
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  //NOTA PARA PROBAR TAILDWIND AGREGUE RAPIDAMENTE EL LINK CDN AL HTML pero no iria a a quedar asi
  //no te que hicieron uaconfiguracion especial de css que no pude ver bien coo usar

  return (
    <>
      <div>
        <Card>
          <Title className="text-center"> Table of Users </Title>

          <Table>
            <TableHead>
              <TableRow>
                {/*  <TableHeaderCell>ID</TableHeaderCell> */}
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Email verified</TableHeaderCell>
                <TableHeaderCell>Phone</TableHeaderCell>
                <TableHeaderCell>Country</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
                <TableHeaderCell>Genre</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell className="text-center">
                  Enable User
                </TableHeaderCell>
                <TableHeaderCell className="text-center">Admin</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((item) => (
                  <TableRow key={item._id}>
                    {/*  <TableCell>{item._id}</TableCell> */}
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      {item.email_verified === true
                        ? "verified"
                        : "Not verified"}
                    </TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.country}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>{item.genre}</TableCell>

                    <TableCell>
                      {item.status === "active" ? (
                        <Badge color="emerald" icon={Done}>
                          {item.status}
                        </Badge>
                      ) : item.status === "suspended" ? (
                        <Badge color="red" icon={Adjust}>
                          {item.status}
                        </Badge>
                      ) : (
                        <Badge color="red" icon={Adjust}>
                          {item.status}
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <Button
                        onClick={() => handleEnable(item.status, item._id)}
                        size="xl"
                        color="white"
                      >
                        {item.status === "active" ? (
                          <Button color="green">Active</Button>
                        ) : (
                          <Button color="pink">Inactive</Button>
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="white"
                        size="xl"
                        onClick={() => handleAdmin(item.role, item._id)}
                      >
                        {item.role === "admin" ? (
                          <Button color="purple">Admin</Button>
                        ) : (
                          <Button color="grey">User</Button>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
}
