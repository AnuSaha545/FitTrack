import { useState, useEffect } from "react";

function App() {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [workouts, setWorkouts] = useState([]);

  // Fetch workouts from backend
  const getWorkouts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_workouts");
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  // Add workout
  const addWorkout = async () => {
    if (exercise === "" || duration === "") {
      alert("Please fill all fields");
      return;
    }

    const workoutData = { exercise, duration };

    try {
      await fetch("http://127.0.0.1:5000/add_workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workoutData),
      });
      setExercise("");
      setDuration("");
      getWorkouts();
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  // Delete workout by index
  const deleteWorkout = async (index) => {
    try {
      await fetch(`http://127.0.0.1:5000/delete_workout/${index}`, {
        method: "DELETE",
      });
      getWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🏋️ FitTrack</h1>

      {/* Input Card */}
      <div style={styles.card}>
        <input
          style={styles.input}
          type="text"
          placeholder="Exercise Name"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button style={styles.button} onClick={addWorkout}>
          Add Workout
        </button>
      </div>

      {/* Workout History */}
      <div style={styles.historyContainer}>
        <h2 style={styles.subHeading}>📌 Workout History</h2>
        {workouts.length === 0 ? (
          <p style={styles.noWorkout}>No workouts added yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Exercise</th>
                <th style={styles.th}>Duration (mins)</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((w, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{w.exercise}</td>
                  <td style={styles.td}>{w.duration}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.deleteButton}
                      onClick={() => deleteWorkout(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(to right, #e0f7fa, #ffffff)",
    minHeight: "100vh",
    padding: "40px",
    textAlign: "center",
    width: "100%",
    boxSizing: "border-box",
  },
  heading: {
    fontSize: "48px",
    marginBottom: "30px",
    color: "#007bff",
    textShadow: "1px 1px 2px #aaa",
  },
  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "15px",
    width: "400px",
    margin: "auto",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
  input: {
    width: "90%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    background: "#007bff",
    color: "white",
    padding: "12px",
    border: "none",
    width: "95%",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },
  historyContainer: {
    marginTop: "50px",
    width: "80%",
    maxWidth: "900px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  subHeading: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "#007bff",
  },
  noWorkout: {
    fontSize: "18px",
    color: "#555",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  th: {
    padding: "15px",
    background: "#007bff",
    color: "#fff",
    fontSize: "18px",
  },
  tr: {
    transition: "all 0.2s",
    "&:hover": {
      background: "#f1f1f1",
    },
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    fontSize: "16px",
    color: "#333",
  },
  deleteButton: {
    background: "#ff4d4f",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};

export default App;
