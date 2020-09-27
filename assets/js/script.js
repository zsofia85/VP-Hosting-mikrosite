let options = {
    "controls": true, 
    "autoplay": false, 
    "preload": "auto", 
    "muted": true
};

videojs('video1', options);


//Balsamic roasted vegetables button
const elmVideo = document.querySelector('#video1 > video');
const elmJumpTo82 = document.querySelector('#btnveganskip');
const funcJumpTo82 = () => {
    elmVideo.currentTime = 79;
}
elmJumpTo82.addEventListener('click', funcJumpTo82);





video.hotspots.init(); //If you move this above the button, it stops the button from working