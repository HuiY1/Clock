document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".page-item a");
    const contents = document.querySelectorAll(".content");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));

            contents.forEach(content => {
                content.classList.remove("active");
            });

            target.classList.add("active");
        });
    });

    // Activate the first section by default
    if (links.length > 0) {
        links[0].click();
    }

    const items = document.querySelectorAll('.page-item');

    // 为每个 .page-item 元素添加 onclick 事件
    items.forEach(function (item) {
        item.onclick = function () {
            // 遍历所有 .page-item 元素，设置背景颜色
            items.forEach(function (el) {
                el.style.backgroundColor = '#383839'; // 设置所有 .page-item 的背景颜色
            });
            this.style.backgroundColor = '#7c7c7c'; // 设置被点击的 .page-item 的背景颜色
        };
    });
});

function invertColor(hex) {
    if (hex.charAt(0) === '#') {
        hex = hex.slice(1);
    }
    let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16).padStart(2, '0');
    let g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16).padStart(2, '0');
    let b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}

function invertColors() {
    let body = document.body;
    let div = document.querySelector('.content-container');

    let bodyBg = window.getComputedStyle(body).backgroundColor;
    let divCl = window.getComputedStyle(div).color;

    body.style.backgroundColor = invertColor(rgbToHex(bodyBg));
    div.style.color = invertColor(rgbToHex(divCl));

    const clock = document.getElementById('clock');
    if (clock.style.filter === 'invert(0)') {
        clock.style.filter = 'invert(1)';
    }
    else {
        clock.style.filter = 'invert(0)';
    }

}

function rgbToHex(rgb) {
    let result = rgb.match(/\d+/g).map(function (x) {
        return parseInt(x).toString(16).padStart(2, '0');
    });
    return `#${result.join('')}`;
}




let currentHour = 0;
let currentMinute = 0;
let currentSecond = 0;
let timer;
let isDragging = false;
let dragging = null;

function updateClock() {
    currentSecond++;
    if (currentSecond >= 60) {
        currentSecond = 0;
        currentMinute++;
        if (currentMinute >= 60) {
            currentMinute = 0;
            currentHour = (currentHour + 1) % 12;
        }
    }
    setClockHands();
}

function setClockHands() {
    const secondAngle = currentSecond * 6;
    const minuteAngle = currentMinute * 6 + currentSecond * 0.1;
    const hourAngle = (currentHour % 12) * 30 + currentMinute * 0.5;

    document.getElementById('secondHand').setAttribute('transform', `rotate(${secondAngle}, 200, 200)`);
    document.getElementById('minuteHand').setAttribute('transform', `rotate(${minuteAngle}, 200, 200)`);
    document.getElementById('hourHand').setAttribute('transform', `rotate(${hourAngle}, 200, 200)`);

    document.getElementById('digital').innerText = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}:${currentSecond.toString().padStart(2, '0')}`;
}

function setClockTime() {
    const hourInput = parseInt(document.getElementById('hourInput').value);
    const minuteInput = parseInt(document.getElementById('minuteInput').value);
    const secondInput = parseInt(document.getElementById('secondInput').value);

    if (!isNaN(hourInput) && !isNaN(minuteInput) && !isNaN(secondInput)) {
        currentHour = hourInput % 12;
        currentMinute = minuteInput % 60;
        currentSecond = secondInput % 60;
        setClockHands();
    }
}

function setHand(hand, angle) {
    hand.setAttribute('transform', `rotate(${angle}, 200, 200)`);
}

function getAngleFromEvent(event) {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left - 200;
    const y = event.clientY - rect.top - 200;
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    return (angle < 0 ? angle + 360 : angle);
}

function updateTimeFromAngle(hand, angle) {
    if (hand.id === 'secondHand') {
        currentSecond = Math.round(angle / 6);
    } else if (hand.id === 'minuteHand') {
        currentMinute = Math.round(angle / 6);
    } else if (hand.id === 'hourHand') {
        currentHour = Math.round(angle / 30) % 12;
    }
    setClockHands();
}

document.querySelectorAll('#hourHand, #minuteHand, #secondHand').forEach(hand => {
    hand.addEventListener('mousedown', (e) => {
        isDragging = true;
        clearInterval(timer);
        dragging = e.target;
    });
});

document.addEventListener('mousemove', (e) => {
    if (dragging) {
        const angle = getAngleFromEvent(e);
        setHand(dragging, angle);
        updateTimeFromAngle(dragging, angle);
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        dragging = null;
        timer = setInterval(updateClock, 1000);
    }
});

// Initial call to set the correct time immediately
updateClock();
timer = setInterval(updateClock, 1000);

let timerInterval, stopwatchInterval;
let timerTime = 0, stopwatchTime = 0;
let laps = [];
const audioAlert = document.getElementById('audioAlert');

function formatTime(time) {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
    const hours = parseInt(document.getElementById('timerHourInput').value) || 0;
    const minutes = parseInt(document.getElementById('timerMinuteInput').value) || 0;
    const seconds = parseInt(document.getElementById('timerSecondInput').value) || 0;
    timerTime = (hours * 3600) + (minutes * 60) + seconds;

    stopTimer();
    timerInterval = setInterval(() => {
        if (timerTime > 0) {
            timerTime--;
            document.getElementById('timerDisplay').textContent = formatTime(timerTime);
        } else {
            audioAlert.play();
            clearInterval(timerInterval);

            alert("Time's up!");
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    timerTime = 0;
    document.getElementById('timerDisplay').textContent = "00:00:00";
    document.getElementById('timerHourInput').value = '';
    document.getElementById('timerMinuteInput').value = '';
    document.getElementById('timerSecondInput').value = '';
}

function startStopwatch() {
    stopStopwatch();
    stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        document.getElementById('stopwatchDisplay').textContent = formatTime1(stopwatchTime);
    }, 1000);
}



function startStopwatch() {
    stopStopwatch();
    stopwatchInterval = setInterval(() => {
        stopwatchTime += 10; // 增加10毫秒
        document.getElementById('stopwatchDisplay').textContent = formatTime1(stopwatchTime);
    }, 10); // 每10毫秒更新一次显示
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchTime = 0;
    laps = [];
    document.getElementById('stopwatchDisplay').textContent = "00:00:00.00"; // 初始显示格式
    document.getElementById('laps').innerHTML = '';
}

function recordLap() {
    laps.push(stopwatchTime);
    const lapList = document.getElementById('laps');
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${formatTime1(stopwatchTime)}`;
    lapList.appendChild(lapItem);
}

function formatTime1(milliseconds) {
    let hours = Math.floor(milliseconds / (1000 * 60 * 60));
    let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    let ms = Math.floor((milliseconds % 1000) / 10); // 获取十分之一秒部分

    // 将时间格式化为 hh:mm:ss.SS
    return `${padZero(hours, 2)}:${padZero(minutes, 2)}:${padZero(seconds, 2)}.${padZero(ms, 2)}`;
}

function padZero(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

var realtime=document.getElementById("realtime");
var datetime = new Date();
var hour = datetime.getHours();
var minute = datetime.getMinutes();
var second = datetime.getSeconds();
let clockInterval;
let clockTime = 0;
clockInterval = setInterval(() => {
    clockTime+=1000;
    document.getElementById('realtime').textContent = formatTime2(clockTime);
}, 1000);
function formatTime2(milliseconds) {
    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)+parseInt(second);
    let jin1=0;let jin2=0;
    if(seconds>59){
        seconds-=60;
        jin1=1;
    }
    let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))+parseInt(minute)+jin1;
    if(minutes>59){
        minutes-=60;
        jin2=1;
    }
    let hours = Math.floor(milliseconds / (1000 * 60 * 60))+parseInt(hour)+jin2;
    if(hours>23){
        hours-=24;
    }
    
    if(clockon==1)
    {
        if(hours==arr_h&&minutes==arr_m&&seconds==arr_s)
        {
            alert("The alarm clock is ringing.");
        }
    }
    return `${padZero(hours, 2)}:${padZero(minutes, 2)}:${padZero(seconds, 2)}`;
}
let clockon=0;
let arr_h = 0 ;
let arr_m = 0 ;
let arr_s = 0 ;
var num = 0;
var flag = 0;
function setclock()
{
    if(clockon==0)
    {
        arr_h = parseInt(document.getElementById('clockHourInput').value);
        arr_m = parseInt(document.getElementById('clockMinuteInput').value);
        arr_s = parseInt(document.getElementById('clockSecondInput').value);
        var s = "Alarm Clock: " + `${padZero(arr_h, 2)}:${padZero(arr_m, 2)}:${padZero(arr_s, 2)}`;
        document.getElementById('clockonon').textContent= s;
    }
    clockon=1;
}
function clearclock()
{
    if(clockon==1)
    {
        document.getElementById('clockonon').textContent = "";
    }
    clockon=0;
}
