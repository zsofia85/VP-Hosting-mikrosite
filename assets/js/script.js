let options = {
    "controls": true, 
    "autoplay": true, 
    "preload": "auto", 
    "muted": true
};

videojs('YourHealthyLunch', options);


const elmVideo = document.querySelector('#YourHealthyLunch > video');

const elmStatus = document.querySelector('#status');
elmVideo.addEventListener('play', (event) => {
    elmStatus.innerHTML = 'Play';
});



//Balsamic glazed vegetables button
const elmJumpTo30 = document.querySelector('#veganskip');
const funcJumpTo30 = () => {
    elmVideo.currentTime = 30;
}
elmJumpTo20.addEventListener('click', funcJumpTo30);

