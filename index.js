const button = document.getElementById("lotto-button")
const stopButton = document.getElementById("stop-button")

const worker = new Worker("worker.js")

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    worker.postMessage("window-hidden");
    console.log("윈도우 다른거 사용합니다")
  } else {
    worker.postMessage("window-visible")
    console.log("윈도우 다른거 사용!!안!!합니다")
  }
});

worker.onmessage = (event) => {
  if (event.data.type === "idle-time") {
    console.log(`Idle time: ${event.data.value} seconds`);
  } else if (event.data.type === "reset-idle") {
    console.log("User is active again. Reset idle timer.");
  }
}

worker.onmessage = (event) => {
    const randomNumber = event.data;
    document.getElementById("result").innerHTML = randomNumber;
};

button.addEventListener("click", () => {
    worker.postMessage("안녕!");
})

stopButton.addEventListener('click', () => {
    worker.terminate("stop")
    document.getElementById("result").innerHTML = "!";
})