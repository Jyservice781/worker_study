const button = document.getElementById("lotto-button")
const stopButton = document.getElementById("stop-button")

const worker = new Worker("worker.js")
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