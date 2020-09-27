let options = {
    "controls": true, 
    "autoplay": false, 
    "preload": "auto", 
    "muted": true
};

videojs('video1', options);


const elmVideo = document.querySelector('#video1 > video');

const elmStatus = document.querySelector('#status');
elmVideo.addEventListener('play', (event) => {
    elmStatus.innerHTML = 'Play';
});



//Balsamic glazed vegetables button
const elmJumpTo82 = document.querySelector('#btnveganskip');
const funcJumpTo82 = () => {
    elmVideo.currentTime = 82;
}
elmJumpTo82.addEventListener('click', funcJumpTo82);

