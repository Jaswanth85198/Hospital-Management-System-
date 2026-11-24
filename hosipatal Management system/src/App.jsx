
import React, { useState } from "react";

function App() {

  const [page, setPage] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [condition, setCondition] = useState("");

  const [searchName, setSearchName] = useState("");
  const [patientData, setPatientData] = useState(null);

  const [message, setMessage] = useState("");

  // LOGIN FUNCTION
  function handleLogin(e) {
    e.preventDefault();

    const user = username.trim().toLowerCase();
    const pass = password.trim();

    if (user === "admin" && pass === "admin@18") {
      setPage("admin");
      setMessage("");
    }
    else if (user === "doctor" && pass === "doctor@18") {
      setPage("doctor");
      setMessage("");
    }
    else if (user === "patient" && pass === "patient@18") {
      setPage("patient");
      setMessage("");
    }
    else {
      const users = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      const found = users.find(
        u => u.username.toLowerCase() === user &&
             u.password === pass
      );

      if (found) {
        setPage("patient");
        setMessage("");
      }
      else {
        setMessage("Invalid Username or Password!");
      }
    }
  }

  // SIGNUP FUNCTION
  function handleSignup(e) {
    e.preventDefault();

    let users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const exists = users.find(
      u => u.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (exists) {
      setMessage("Username already exists!");
      return;
    }

    if (
      ["admin", "doctor", "patient"].includes(
        username.trim().toLowerCase()
      )
    ) {
      setMessage("This username is reserved!");
      return;
    }

    users.push({
      username: username.trim(),
      password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    setMessage("Signup Successful! Please Login.");

    setUsername("");
    setPassword("");
    setPage("login");
  }

  // DOCTOR SUBMIT PATIENT DETAILS
  function handleSubmit(e) {
    e.preventDefault();

    let patients = JSON.parse(
      localStorage.getItem("patients") || "[]"
    );

    const exists = patients.find(
      p => p.id === patientId.trim()
    );

    if (exists) {
      setMessage("Patient ID already exists!");
      return;
    }

    patients.push({
      name: patientName.trim(),
      id: patientId.trim(),
      condition: condition.trim()
    });

    localStorage.setItem(
      "patients",
      JSON.stringify(patients)
    );

    setMessage("Patient Details Saved Successfully!");

    setPatientName("");
    setPatientId("");
    setCondition("");
  }

  // PATIENT SEARCH
  function handleSearch(e) {
    e.preventDefault();

    let patients = JSON.parse(
      localStorage.getItem("patients") || "[]"
    );

    const found = patients.find(
      p => p.name.toLowerCase() === searchName.trim().toLowerCase()
    );

    setPatientData(found || null);

    if (found) {
      setMessage("Patient Details Found!");
    } else {
      setMessage("Patient Not Found!");
    }
  }

  // LOGOUT
  function logout() {
    setPage("login");

    setUsername("");
    setPassword("");

    setSearchName("");
    setPatientData(null);

    setMessage("");
  }

  // LOGIN PAGE
  if (page === "login") {
    return (
      <div style={styles.container}>

        <h1>Hospital System</h1>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

        </form>

        <p style={styles.message}>{message}</p>

        <p>
          Don't have an account?
          <button
            onClick={() => {
              setPage("signup");
              setMessage("");
            }}
          >
            Signup
          </button>
        </p>

      </div>
    );
  }

  // SIGNUP PAGE
  if (page === "signup") {
    return (
      <div style={styles.container}>

        <h1>Hospital System</h1>
        <h2>Signup</h2>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit">Signup</button>

        </form>

        <p style={styles.message}>{message}</p>

        <button
          onClick={() => {
            setPage("login");
            setMessage("");
          }}
        >
          Back to Login
        </button>

      </div>
    );
  }

  // ADMIN DASHBOARD
  if (page === "admin") {
    return (
      <div style={styles.container}>

        <h1>Hospital System</h1>
        <h2>Admin Dashboard</h2>

        <h3>Welcome Admin!</h3>

        <p>Hospital Management System</p>

        <button onClick={logout}>Logout</button>

      </div>
    );
  }

  // DOCTOR DASHBOARD
  if (page === "doctor") {
    return (
      <div style={styles.container}>

        <h1>Hospital System</h1>
        <h2>Doctor Dashboard</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter Patient Name"
            value={patientName}
            onChange={e => setPatientName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={e => setPatientId(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter Patient Condition"
            value={condition}
            onChange={e => setCondition(e.target.value)}
            required
          />

          <button type="submit">Submit</button>

        </form>

        <p style={styles.message}>{message}</p>

        <button onClick={logout}>Logout</button>

      </div>
    );
  }

  // PATIENT DASHBOARD
  if (page === "patient") {
    return (
      <div style={styles.container}>

        <h1>Hospital System</h1>
        <h2>Patient Dashboard</h2>

        <form onSubmit={handleSearch}>

          <input
            type="text"
            placeholder="Enter Patient Name"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            required
          />

          <button type="submit">Get Details</button>

        </form>

        {patientData && (
          <div style={styles.details}>

            <h3>Patient Details</h3>

            <p>Name: {patientData.name}</p>

            <p>Patient ID: {patientData.id}</p>

            <p>Condition: {patientData.condition}</p>

          </div>
        )}

        <p style={styles.message}>{message}</p>

        <button onClick={logout}>Logout</button>

      </div>
    );
  }

  return null;
}


// CSS STYLES
const styles = {

  container: {
    width: "350px",
    margin: "70px auto",
    padding: "25px",
    textAlign: "center",
    border: "2px solid #2196F3",
    borderRadius: "12px",
    fontFamily: "Arial",
    backgroundColor: "#f5faff"
  },

  message: {
    color: "green",
    fontWeight: "bold"
  },

  details: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #2196F3",
    borderRadius: "8px",
    backgroundColor: "#e3f2fd"
  }

};

export default App;
