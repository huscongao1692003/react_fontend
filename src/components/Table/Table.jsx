import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createCustomerData(name, trackingId, date, price) {
    return { name, trackingId, date, price };
  }
  
  const rows = [
    createCustomerData("Lasania Chiken Fri", 18908424, "2 March 2022", "69.96$"),
    createCustomerData("Big Baza Bang ", 18908424, "2 March 2022", "69.96$"),
    createCustomerData("Mouth Freshner", 18908424, "2 March 2022", "69.96$"),
    createCustomerData("Cupcake", 18908421, "2 March 2022", "69.96$"),
  ];

export default function CustomerTable() {
    const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  
    const handleDetailsClick = (customer) => {
      setSelectedCustomer(customer);
    };
  
    const handleCloseForm = () => {
      setSelectedCustomer(null);
    };
  
    return (
      <div className="Table">
        <h3>Orders</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          {/* Table code... */}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Tracking ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.trackingId}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">
                  <span className="status">
                    {row.price}
                  </span>
                </TableCell>
                <TableCell align="left">
                  <button
                    onClick={() => handleDetailsClick(row)}
                    className="Details"
                  >
                    Details
                    <module/>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        {selectedCustomer && (
          <div className="popup-form" style={{ marginTop: "1rem" }}>
            <h3>Order Details</h3>
            <div
              style={{
                background: "#FFFFFF",
                padding: "1rem",
                borderRadius: "5px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <form onSubmit={handleCloseForm}>
                <div style={{ marginBottom: "0.5rem" }}>
                  <label style={{ display: "block", fontWeight: "bold" }}>
                    Name:
                  </label>
                  <input
                    type="text"
                    value={selectedCustomer.name}
                    readOnly
                    style={{ width: "100%", padding: "0.25rem" }}
                  />
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <label style={{ display: "block", fontWeight: "bold" }}>
                    Tracking ID:
                  </label>
                  <input
                    type="text"
                    value={selectedCustomer.trackingId}
                    readOnly
                    style={{ width: "100%", padding: "0.25rem" }}
                  />
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <label style={{ display: "block", fontWeight: "bold" }}>
                    Date:
                  </label>
                  <input
                    type="text"
                    value={selectedCustomer.date}
                    readOnly
                    style={{ width: "100%", padding: "0.25rem" }}
                  />
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <label style={{ display: "block", fontWeight: "bold" }}>
                    Price:
                  </label>
                  <input
                    type="text"
                    value={selectedCustomer.price}
                    readOnly
                    style={{ width: "100%", padding: "0.25rem" }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: "#59bfff",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
