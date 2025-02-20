// worker 스레드에서 self 는 생략가능함.
// 웹 워커는 DOM 요소를 직접적으로 접근할 수 없음. 

onmessage = (event) => {
    for (let i = 0; i < 500000000; i++){}
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    postMessage(randomNumber);    
}