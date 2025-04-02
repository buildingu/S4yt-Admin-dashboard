import { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, TextField, Rating, Tabs, Tab, Button
} from "@mui/material";

const initialData = [
  { id: 1, link: "https://example1.com", rating: 5, inputValue: 0 },
  { id: 2, link: "https://example2.com", rating: 7, inputValue: 2 },
  { id: 3, link: "https://example3.com", rating: 4, inputValue: 1 },
];

export default function SubmitWinners() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState(initialData);
  const [selected, setSelected] = useState([]);
  const [saved, setSaved] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRatingChange = (id, newRating) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rating: newRating } : item))
    );
  };

  const handleInputChange = (id, value) => {
    let num = Number(value);

    if (num < 0) num = 0;
    if (num > 6) num = 6;
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, inputValue: num } : item))
    );
  };

  const handleSave = () => {
    setSaved([...saved, ...data.filter((item) => selected.includes(item.id))]);
    setData(data.filter((item) => !selected.includes(item.id)));
    setSelected([]);
  };

  const handleUnsave = (id) => {
    const itemToUnsave = saved.find((item) => item.id === id);
    setSaved(saved.filter((item) => item.id !== id));
    setData([...data, itemToUnsave]);
  };

  return (
    <Paper style={{ backgroundColor: "#333333", color: "#fff", padding: "20px" }}>
      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label="Available Links" style={{ color: "#fff" }} />
        <Tab label="Saved Links" style={{ color: "#fff" }} />
      </Tabs>

      {tab === 0 && (
        <div style={{ overflowX: "disabled" }}> 
         <TableContainer component={Paper} style={{ backgroundColor: "#333333", color: "#fff",  overflowX: "auto", maxWidth: "100%",}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#fff" }}>Select</TableCell>
                  <TableCell style={{ color: "#fff" }}>Link</TableCell>
                  <TableCell style={{ color: "#fff" }}>Rating</TableCell>
                  <TableCell style={{ color: "#fff" }}>Input</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(row.id)}
                        onChange={() => handleSelect(row.id)}
                        style={{ color: "#90caf9" }}
                      />
                    </TableCell>
                    <TableCell>
                      <a href={row.link} target="_blank" rel="noopener noreferrer" style={{ color: "#90caf9" }}>
                        {row.link}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Rating
                        value={row.rating}
                        onChange={(event, newValue) => handleRatingChange(row.id, newValue)}
                        sx={{ color: "white" }} 
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={row.inputValue}
                        onChange={(e) => handleInputChange(row.id, e.target.value)}
                        style={{ width: "100%", minWidth: "150px", backgroundColor: "#333" }}
                        InputProps={{
                          sx: { color: "white" },
                        }}
                        inputProps={{
                          min: 0,
                          max: 6
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="contained" onClick={handleSave} disabled={selected.length === 0} style={{ margin: "20px 0px 20px 20px", backgroundColor: "#90caf9", color: "#000" }}>
              Save Selected
            </Button>
          </TableContainer>
        </div>
      )}

      {tab === 1 && (
        <div style={{ overflowX: "auto" }}> 
          <TableContainer component={Paper} style={{ backgroundColor: "#333333", color: "#fff",  overflowX: "auto", maxWidth: "100%"}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#fff" }}>Link</TableCell>
                  <TableCell style={{ color: "#fff" }}>Rating</TableCell>
                  <TableCell style={{ color: "#fff" }}>Input</TableCell>
                  <TableCell style={{ color: "#fff" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {saved.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <a href={row.link} target="_blank" rel="noopener noreferrer" style={{ color: "#90caf9" }}>
                        {row.link}
                      </a>
                    </TableCell>
                    <TableCell>{row.rating}</TableCell>
                    <TableCell>{row.inputValue}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="secondary" onClick={() => handleUnsave(row.id)} style={{ color: "#f48fb1", margin: "10px" }}>
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