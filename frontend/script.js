const API = "http://127.0.0.1:8000";

const ctx = document.getElementById("weeklyChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Steps",
      data: [4000, 6500, 8000, 7000, 9000, 11000, 10000],
      backgroundColor: "#4f46e5"
    }]
  },
  options: {
    plugins: { legend: { display: false }},
    scales: {
      y: { ticks: { color: "white" }},
      x: { ticks: { color: "white" }}
    }
  }
});


function setGoal() {
  fetch(`${API}/goal`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      goal_type: goalType.value,
      target_value: goalValue.value
    })
  }).then(() => alert("Goal saved"));
}

function addActivity() {
  fetch(`${API}/activity`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      steps: steps.value,
      calories: calories.value,
      workout_minutes: minutes.value,
      date: new Date().toISOString().split("T")[0]
    })
  }).then(() => alert("Activity logged"));
}

function loadProgress(type) {
  fetch(`${API}/progress/${type}`)
    .then(res => res.json())
    .then(data => {
      progressText.innerText =
        `${data.current} / ${data.goal} (${data.progress}%)`;
      progressFill.style.width = data.progress + "%";
    });

}
function updateGoal(percent) {
  const circle = document.getElementById("progressCircle");
  const offset = 377 - (377 * percent / 100);
  circle.style.strokeDashoffset = offset;
  document.getElementById("goalPercent").innerText = percent + "%";
}

updateGoal(data.progress);

function setRing(className, percent) {
  const circle = document.querySelector(`.${className}`);
  const offset = 314 - (314 * percent / 100);
  circle.style.strokeDashoffset = offset;
}

setRing("steps", 72);
setRing("workout", 54);
setRing("calories", 81);

document.getElementById("stepsPercent").innerText = "72%";
document.getElementById("workoutPercent").innerText = "54%";
document.getElementById("caloriesPercent").innerText = "81%";

function toggleLog() {
  const panel = document.getElementById("logPanel");
  panel.style.bottom = panel.style.bottom === "30px" ? "-300px" : "30px";
}

new Chart(document.getElementById("weeklyChart"), {
  type: "line",
  data: {
    labels: ["M","T","W","T","F","S","S"],
    datasets: [{
      data: [6,8,7,9,10,12,11],
      borderColor: "#00ff9d",
      tension: 0.4
    }]
  },
  options: {
    plugins: { legend: { display: false }},
    scales: {
      x: { ticks: { color: "#9ca3af" }},
      y: { ticks: { color: "#9ca3af" }}
    }
  }
});

new Chart(document.getElementById("weeklyChart"), {
  type: "line",
  data: {
    labels: ["M","T","W","T","F","S","S"],
    datasets: [{
      data: [6,8,7,9,10,12,11],
      borderColor: "#00ff9d",
      tension: 0.4
    }]
  },
  options: {
    plugins: { legend: { display: false }},
    scales: {
      x: { ticks: { color: "#9ca3af" }},
      y: { ticks: { color: "#9ca3af" }}
    }
  }
});

