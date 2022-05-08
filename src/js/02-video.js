import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
iframe.contentWindow.postMessage('https://player.vimeo.com/video/236203659', '*');
const player = new Player(iframe);

function saveLocal(data) {
    localStorage.setItem("videoplayer-current-time", data.seconds);
}

const loadLocal = localStorage.getItem("videoplayer-current-time")

//load local time
if (loadLocal) {
    player.setCurrentTime(loadLocal);
};
//add/rewrite watching time
player.on('timeupdate', throttle(saveLocal, 1000));