import { Table, Button, Card, Accordion, NavItem } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";

const RecentOrders = () => {
  // const url = "http://localhost:5000";
  const url = "https://food-mania.herokuapp.com";

  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();

  useEffect(() => {
    axios({
      method: "get",
      url: `${url}/orders`,
    })
      .then((res) => {
        console.log("order details", res);
        setGlobalState((prevState) => ({
          ...prevState,
          allOrders: res.data.orders,
          // totalAmount:res.data.orderTotal
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(mapOrders);
  console.log(globalState.allOrders);
  const pendingOrders = globalState.allOrders.filter((getStatus) => {
    return getStatus.status === "accepted";
  });

  console.log(pendingOrders);
  return (
    <div>
      <h1>Recent Orders</h1>
      <div className="d-flex flex-column-reverse">
        {pendingOrders.map(
          (
            {
              orderDetails,
              orderTotal,
              address,
              email,
              phone,
              remarks,
              name,
              _id,
              status,
            },
            index
          ) => {
            return (
              <Accordion key={index}>
                <Card>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey="0"
                    style={{ color: "Gray", cursor: "pointer" }}
                  >
                    Order#{index}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <div className="p-4">
                      <h4>Order Details</h4>
                      <div>
                        <Table striped bordered hover size="sm">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Quantity</th>
                              <th>Actual Price</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderDetails.map((value, index) => {
                              return (
                                <tr key={index}>
                                  <td>{value.name}</td>
                                  <td>{value.quantity}</td>
                                  <td>{value.actualPrice}</td>
                                  <td>{value.amount}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                          <h4>User Details</h4>
                          <tfoot>
                            <tr>
                              <th>Total Amount</th>
                              <td colSpan="3">{orderTotal}</td>
                            </tr>
                            <tr>
                              <th>Status</th>
                              <td colSpan="3">{status}</td>
                            </tr>
                            <tr>
                              <th>Name</th>
                              <td colSpan="3">{name}</td>
                            </tr>
                            <tr>
                              <th>Email</th>
                              <td colSpan="3">{email}</td>
                            </tr>
                            <tr>
                              <th>Address</th>
                              <td colSpan="3">{address}</td>
                            </tr>
                            <tr>
                              <th>Phone Number</th>
                              <td colSpan="3">{phone}</td>
                            </tr>
                            <tr>
                              <th>Remarks</th>
                              <td colSpan="3">{remarks}</td>
                            </tr>
                          </tfoot>
                        </Table>
                      </div>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            );
          }
        )}
      </div>
    </div>
  );
};

export default RecentOrders;
