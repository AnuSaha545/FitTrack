from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Global workouts list
workouts = []

# Get workouts
@app.route("/get_workouts", methods=["GET"])
def get_workouts():
    return jsonify(workouts)

# Add workout
@app.route("/add_workout", methods=["POST"])
def add_workout():
    data = request.get_json()
    workouts.append(data)
    return jsonify({"message": "Workout added successfully!"})

# Delete workout
@app.route("/delete_workout/<int:index>", methods=["DELETE"])
def delete_workout(index):
    global workouts  # Make sure to use the global workouts list
    if 0 <= index < len(workouts):
        workouts.pop(index)
        return jsonify({"message": "Workout deleted successfully!"})
    return jsonify({"message": "Invalid index"}), 400

if __name__ == "__main__":
    app.run(debug=True)
