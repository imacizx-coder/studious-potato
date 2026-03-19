let time = 1500;
let timerRunning = false;
let xp = localStorage.getItem("xp") || 0;

document.getElementById("xp").innerText = xp;

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;

  let interval = setInterval(() => {
    time--;
    let min = Math.floor(time / 60);
    let sec = time % 60;

    document.getElementById("timer").innerText =
      `${min}:${sec < 10 ? "0" : ""}${sec}`;

    if (time <= 0) {
      clearInterval(interval);
      timerRunning = false;
      addXP(50);
      alert("Sesi selesai! +50 XP 🎉");
    }
  }, 1000);
}

function resetTimer() {
  time = 1500;
  document.getElementById("timer").innerText = "25:00";
}

function addXP(amount) {
  xp = parseInt(xp) + amount;
  localStorage.setItem("xp", xp);
  document.getElementById("xp").innerText = xp;
}

function addTask() {
  let input = document.getElementById("taskInput");
  let li = document.createElement("li");

  li.innerText = input.value;
  li.onclick = () => {
    li.style.textDecoration = "line-through";
    addXP(10);
  };

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

async function askAI() {
  let input = document.getElementById("aiInput").value;

  let res = await fetch("http://127.0.0.1:8000/ai", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({message: input})
  });

  let data = await res.json();
  document.getElementById("aiResponse").innerText = data.reply;
}