import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, TextField, Rating, Tabs, Tab, Button, Alert
} from "@mui/material";

export default function SubmitWinners({ ...props }) {
  const [tab, setTab] = useState(0);
  const [pool, setPool] = useState(200);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [alertMessage, setAlertMessage] = useState(""); 
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [saved, setSaved] = useState([]);
  const businessId = props.id;

  useEffect(() => {
    axios.get(`/api/answers/${businessId}`).then((response) => {
      const responseData = response.data;
      setData(Array.isArray(responseData) ? responseData : []);
    });
    axios.get(`/api/winners/${businessId}`).then((response) => {
      const responseData = response.data;
      setSaved(Array.isArray(responseData) ? responseData : []);
    });
    axios.get(`/api/business/${businessId}`).then((response) => {
      setPool(response.data.award_limit || 0);
    });
  }, [businessId]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSelect = (_id) => {
    setSelected((prev) =>
      prev.includes(_id) ? prev.filter((item) => item !== _id) : [...prev, _id]
    );
  };

  const handleRatingChange = (_id, newRating) => {
    setData((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, rating: newRating } : item
      )
    );
    axios.post(`/api/answers/${_id}`, { rating: newRating }).catch(() => {});
  };

  const handleInputChange = (_id, value) => {
    let num = Number(value);
    if (num < 0) num = 0;
    if (num > pool) num = pool;

    setData((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, award: num } : item
      )
    );
  };

  const handleSave = () => {
    const selectedRows = data.filter((item) => selected.includes(item._id));

    const awardMissing = selectedRows.some((row) => !row.award);
    if (awardMissing) {
      setAlertMessage("The answer must be given and award.");
      setAlertSeverity("error");
      setTimeout(() => setAlertMessage(""), 5000);  
      return;
    }

    const totalAward = selectedRows.reduce(
      (sum, item) => sum + (item.award || 0),
      0
    );

    if (totalAward > pool) {
      setAlertMessage("Not enough funds in the cash pool.");
      setAlertSeverity("error");
      setTimeout(() => setAlertMessage(""), 5000);  
      return;
    }

    setPool((prev) => prev - totalAward);
    setSaved([...saved, ...selectedRows]);
    setData(data.filter((item) => !selected.includes(item._id)));
    setSelected([]);

    const winnersPayload = selectedRows.map(({ user, award }) => ({
      user,
      award,
    }));

    axios.post(`/api/winners/${businessId}`, { winners: winnersPayload });
    axios.put(`/api/business/${businessId}`, { award_limit: (pool - totalAward) });
  };

  const handleUnsave = (_id) => {
    const itemToUnsave = saved.find((item) => item._id === _id);
    if (!itemToUnsave) return;

    setPool((prev) => prev + (itemToUnsave.award || 0));
    setSaved(saved.filter((item) => item._id !== _id));

    axios.put(`/api/business/${businessId}`, {
      award_limit: pool + (itemToUnsave.award || 0),
    });

    itemToUnsave.award = 0;
    setData([...data, itemToUnsave]);

    axios.delete(`/api/winners/${businessId}/${itemToUnsave.user}`);
  };

  const winnersCount = saved.length + selected.length;

  return (
    <Paper style={{ backgroundColor: "#333333", color: "#fff", padding: "20px" }}>
      {alertMessage && (
        <Alert severity={alertSeverity} style={{ marginBottom: "20px" }}>
          {alertMessage}
        </Alert>
      )}
      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label="Answers" style={{ color: "#fff" }} />
        <Tab label="Winners" style={{ color: "#fff" }} />
      </Tabs>

      <div className="py-5 flex justify-end">
        <h3 className="text-xl font-semibold">Cash Pool: ${pool.toFixed(2)}</h3>
      </div>

      {tab === 0 && Array.isArray(data) && data.length > 0 && (
        <div>
          <TableContainer
            component={Paper}
            style={{
              backgroundColor: "#333333",
              color: "#fff",
              overflowX: "auto",
              maxWidth: "100%",
            }}
          >
            {pool > 0 && winnersCount < 5 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={selected.length === 0 || winnersCount >= 5}
                style={{
                  margin: "20px 0px 20px 20px",
                  color: "#000",
                }}
              >
                Save Winners
              </Button>
            )}
            <Table>
              <TableHead>
                <TableRow>
                  {pool > 0 && winnersCount < 5 && (
                    <TableCell style={{ color: "#fff" }}>Select</TableCell>
                  )}
                  <TableCell style={{ color: "#fff" }}>Link</TableCell>
                  <TableCell style={{ color: "#fff" }}>Rating</TableCell>
                  {pool > 0 && winnersCount < 5 && (
                    <TableCell style={{ color: "#fff" }}>Award</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row._id}>
                    {pool > 0 && winnersCount < 5 && (
                      <TableCell>
                        <Checkbox
                          checked={selected.includes(row._id)}
                          onChange={() => handleSelect(row._id)}
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      <a
                        href={row.submission_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#90caf9" }}
                      >
                        {row.submission_link}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Rating
                        value={row.rating}
                        onChange={(event, newValue) =>
                          handleRatingChange(row._id, newValue)
                        }
                        sx={{ color: "white" }}
                      />
                    </TableCell>
                    {pool > 0 && winnersCount < 5 && (
                      <TableCell>
                        <TextField
                          type="number"
                          value={row.award || ""}
                          onChange={(e) =>
                            handleInputChange(row._id, e.target.value)
                          }
                          style={{
                            width: "100%",
                            minWidth: "150px",
                            backgroundColor: "#333",
                          }}
                          disabled={pool === 0}
                          InputProps={{
                            sx: { color: "white" },
                          }}
                          inputProps={{
                            min: 0,
                            max: 6,
                          }}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {tab === 1 && (
        <div style={{ overflowX: "auto" }}>
          <TableContainer
            component={Paper}
            style={{
              backgroundColor: "#333333",
              color: "#fff",
              overflowX: "auto",
              maxWidth: "100%",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#fff" }}>Link</TableCell>
                  <TableCell style={{ color: "#fff" }}>Rating</TableCell>
                  <TableCell style={{ color: "#fff" }}>Award</TableCell>
                  <TableCell style={{ color: "#fff" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {saved.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <a
                        href={row.submission_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#90caf9" }}
                      >
                        {row.submission_link}
                      </a>
                    </TableCell>
                    <TableCell>{row.rating}</TableCell>
                    <TableCell>{row.award}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleUnsave(row._id)}
                        style={{ color: "#f48fb1", margin: "10px" }}
                      >
                        Unsave
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Paper>
  );
}
