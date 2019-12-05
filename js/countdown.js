// 180分カウントダウン

console.log('応答中です');

var interval_id;
var start_click = false;
var time = 2400;//2400
var min = 2400;//2400
var sec = 0;



function count_down() {
    var display = document.getElementById('display');
    // console.log(time);
    if (time === 1) {
        display.innerHTML = "TIME UP!3秒後に移動します";

        setTimeout(function () {
            window.location.href = 'Myoutput.html';
        }, 3000);

    } else {
        time--;

        min = Math.floor(time / 60);
        sen = Math.floor(time % 60);
        display.innerHTML = '0' + min + ':' + sen;
        if (sen < 10) {
            display.innerHTML = '0' + min + ':' + '0' + sen;
        }
    }

}


function count_reset() {
    time = 2400;
    min = 0;
    sen = 0;
    var reset = document.getElementById('display');
    reset.innerHTML = '40:00';

}


