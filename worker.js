// worker 스레드에서 self 는 생략가능함.
// 웹 워커는 DOM 요소를 직접적으로 접근할 수 없음. 

onmessage = (event) => {
    for (let i = 0; i < 500000000; i++){}
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    postMessage(randomNumber);    
}

let lastActiveTime = Date.now();
let isWindowActive = true;
let idleInterval = null;

onmessage = (event) => {
  if (event.data === "window-hidden") {
    isWindowActive = false
    lastActiveTime = Date.now()
    
    idleInterval = setInterval(() => {
      const idleTime = Math.floor((Date.now() - lastActiveTime) / 1000);
      console.log("idleTime", lastActiveTime)
      postMessage({ type: "idle-time", value: idleTime });
    }, 1000)
    
  } else if (event.data === "window-visible") {
    isWindowActive = true;
    if (idleInterval) clearInterval(idleInterval)
    console.log("idleInterval", idleInterval)
    postMessage({ type: "reset-idle" })
  }
}