//hotspots
// REF: JS by Dan Høegh UCN MMD 2020

const fps = 30;
const debug = false;

const msInterval = Math.floor(1000/fps);
let engine;

let video = {
    log: (message = 'Missing log text') => {
        if (debug) { 
            console.log(message);
        }
    },
    hotspots: {
        running: false,
        init: () => {
            video.log('video hotspot engine: init');
            const elmsVideo = document.querySelectorAll('video');
            elmsVideo.forEach((elmVideo) => {
                elmVideo.parentElement.classList.add('videoHotspotsParent');                  
                elmVideo.addEventListener('play', (event) => {
                    if (!video.hotspots.running) {
                        video.hotspots.on();
                    }
                });
                elmVideo.addEventListener('seeked', (event) => {
                    if (!video.hotspots.running) {
                        video.hotspots.on(true);
                    }
                });
                elmVideo.addEventListener('pause', (event) => {
                    if (video.hotspots.running) {
                        let videoPlaying = false;
                        elmsVideo.forEach((elmVideo) => {
                            if (!elmVideo.paused) {
                                videoPlaying = true;
                            }
                        });
                        if (!videoPlaying) {
                            video.hotspots.off();
                        }
                    }
                });
            });
        },

        on: (isSeeked = false) => {
            video.log('video hotspot engine: on');
            if (!video.hotspots.running) {
                video.hotspots.running = true;
            }
            engine = setInterval(() => {
                video.log('engine loop');
                video.hotspots.update(isSeeked);
            }, msInterval);
        },

        off: () => {
            video.log('video hotspot engine: off');
            video.hotspots.running = false;
            clearInterval(engine);
        },

        update: () => {
            hotspots.forEach((hotspot, index) => {
                if (hotspot.active) {
                    const video = document.querySelector(`#${hotspot.videoId}>video`);
                    if (video){
                        const now = video.currentTime;
                        const elmHotspotCheck = document.querySelector(`#hotspotId${index}`);
    
                        if (hotspot.markIn > now || hotspot.markOut <= now) {
                            if (elmHotspotCheck){
                                const elmHotspot = document.querySelector(`#hotspotId${index}`);
                                elmHotspot.parentElement.removeChild(elmHotspot);
                                hotspot.onscreen = false;
                            }
                        } else if (hotspot.markIn <= now && hotspot.markOut > now) {
                            if (!elmHotspotCheck) {
                                let elmHotspot = document.createElement('a');
                                elmHotspot.id = `hotspotId${index}`;
                                elmHotspot.className = 'hotspot';
                                if (hotspot.ui.title){
                                    elmHotspot.title = hotspot.ui.title;
                                }
                                if (hotspot.ui.text && hotspot.ui.text != ""){
                                    elmHotspot.innerHTML = hotspot.ui.text;
                                }
                                let css = "";
                                css += `width: ${hotspot.sizeX}%;`;
                                css += `height: ${hotspot.sizeY}%;`;
                                css += `left: ${hotspot.posX}%;`;
                                css += `top: ${hotspot.posY}%;`;
                                css += `${hotspot.ui.style};`;
                                if (hotspot.ui.type == 'image'){
                                    css += `background-image: url(${hotspot.ui.image});`;
                                    elmHotspot.classList.add('image');
                                }
                                elmHotspot.style = css;

                                if (hotspot.hotspot.type == 'link'){
                                    elmHotspot.href = hotspot.hotspot.url;
                                    elmHotspot.target = hotspot.hotspot.target;
                                } 
                                else {
                                    elmHotspot.addEventListener('click', (event) => {
                                        event.preventDefault();
                                        hotspot.hotspot.func();
                                    });
                                }
                                video.parentElement.appendChild(elmHotspot);
                                if (hotspot.ui.pause) {
                                    videojs(hotspot.videoId).pause();
                                }
                            }
                        } 
                    }
                }
            });
        },
        remove: () => {
            video.log('video hotspot engine: cleanup');
            video.hotspots.off();                                               // turn off engine
            const elmsHotspots = document.querySelectorAll('a.hotspot');        // find all hotspot DOM elements
            elmsHotspots.forEach((elmHotspot) => {                              // loop through hotspots
                elmHotspot.parentElement.removeChild(elmHotspot);               // remove current hotspot
            });
            delete video;                                                       // remove the variable from memory
            delete hotspots;                                                    // remove the variable from memory
        }

    }
}


const hotspots = [

    //vegan icon click
{
    active: true,
    videoId: "video1",
    markIn: 77,
    markOut: 60,
    sizeX: 50,
    sizeY: 50,
    posX: 0,
    posY: 0,
    ui: {
        pause: true,
        type: "box",
        style: `border: none; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            text-decoration: none; 
            font-size: 2vw;
        text: "woop"`
    },
    hotspot: {
        type: "link",
        url: "http://tv2.dk",
        //func:  = () => {
        //}
    }
},


//info hover
{
    active: true,
    videoId: "video1",
    markIn: 82,
    markOut: 86,
    sizeX: 20,
    sizeY: 10,
    posX: 0,
    posY: 0,
    ui: {
        type: "box",
        title: "Step 2",
        style: `border: none; 
            background-color: rgba(255,0,0,.5); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            text-decoration: none; 
            font-size: 2vw; 
            color: white;`,
        text: "This is text in a box"
    },
    hotspot: {
        type: "link",
        url: "http://tv2.dk",
        target: "_blank"
    }
},

{
    active: true,
    videoId: "video1",
    markIn: 82,
    markOut: 86,
    sizeX: 20,
    sizeY: 10,
    posX: 0,
    posY: 0,
    ui: {
        type: "box",
        title: "Step 2",
        style: `border: none; 
            background-color: rgba(255,0,0,.5); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            text-decoration: none; 
            font-size: 2vw; 
            color: white;`,
        text: "This is text in a box"
    },
    hotspot: {
        type: "link",
        url: "http://tv2.dk",
        target: "_blank"
    }
},

{
    active: true,
    videoId: "video1",
    markIn: 82,
    markOut: 86,
    sizeX: 20,
    sizeY: 10,
    posX: 0,
    posY: 0,
    ui: {
        type: "box",
        title: "Step 2",
        style: `border: none; 
            background-color: rgba(255,0,0,.5); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            text-decoration: none; 
            font-size: 2vw; 
            color: white;`,
        text: "This is text in a box"
    },
    hotspot: {
        type: "link",
        url: "http://tv2.dk",
        target: "_blank"
    }
},


//ingredients
{
    active: true,
    videoId: "video1",
    markIn: 87,
    markOut: 90,
    sizeX: 50,
    sizeY: 50,
    posX: 0,
    posY: 0,
    ui: {
        pause: true,
        type: "box",
        title: "Step 2",
        style: `border: none; 
            background-color: rgba(255,0,0,.5); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            text-decoration: none; 
            font-size: 2vw; 
            color: white;`,
        text: "This is text in a box"
    },
    hotspot: {
        type: "link",
        url: "http://tv2.dk",
        target: "_blank"
    }
},


//continue button
{
    active: true,
    videoId: "video1",
    markIn: 87,
    markOut: 90,
    sizeX: 20,
    sizeY: 40,
    posX: 0,
    posY: 0,
    ui: {
        type: "image",
        style: "`border: none;",
        image: "assets/img/btnContinueWHITE.png",
    },
    hotspot: {
        type: "link",
        url: "http://tv2.dk",
        target: "_blank"
    }
},


//instructions


//step 1
{
    active: true,
    videoId: "video1",
    markIn: 91,
    markOut: 98,
    sizeX: 50,
    sizeY: 50,
    posX: 0,
    posY: 0,
    ui: {
        type: "box",
        title: "Step 2",
        style: `border: none; 
            background-color: rgba(255,0,0,.5); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            text-decoration: none; 
            font-size: 2vw; 
            color: white;`,
        text: "This is text in a box"
    },
    hotspot: {
        type: "link",
        url: "http://tv2.dk",
        target: "_blank"
    }
},
//step 2
{
    active: true,
    videoId: "video1",
    markIn: 98,
    markOut: 143,
    sizeX: 50,
    sizeY: 50,
    posX: 0,
    posY: 0,
    ui: {
        type: "box",
        title: "Step 2",
        style: `border: none; 
            background-color: rgba(255,0,0,.5); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            text-decoration: none; 
            font-size: 2vw; 
            color: white;`,
        text: "This is text in a box"
    },
    hotspot: {
        type: "link",
        url: "http://tv2.dk",
        target: "_blank"
    }
},
//step 3
{
    active: true,
    videoId: "video1",
    markIn: 143,
    markOut: 154,
    sizeX: 50,
    sizeY: 50,
    posX: 0,
    posY: 0,
    ui: {
        type: "box",
        title: "Step 2",
        style: `border: none; 
            background-color: rgba(255,0,0,.5); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            text-decoration: none; 
            font-size: 2vw; 
            color: white;`,
        text: "This is text in a box"
    },
    hotspot: {
        type: "link",
        url: "http://tv2.dk",
        target: "_blank"
    }
},
//step 4
{
    active: true,
    videoId: "video1",
    markIn: 154,
    markOut: 177,
    sizeX: 50,
    sizeY: 50,
    posX: 0,
    posY: 0,
    ui: {
        type: "box",
        title: "Step 2",
        style: `border: none; 
            background-color: rgba(255,0,0,.5); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            text-decoration: none; 
            font-size: 2vw; 
            color: white;`,
        text: "This is text in a box"
    },
    hotspot: {
        type: "link",
        url: "http://tv2.dk",
        target: "_blank"
    }
},
//step 5
{
    active: true,
    videoId: "video1",
    markIn: 177,
    markOut: 180,
    sizeX: 50,
    sizeY: 50,
    posX: 0,
    posY: 0,
    ui: {
        type: "box",
        title: "Step 2",
        style: `border: none; 
            background-color: rgba(255,0,0,.5); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            text-decoration: none; 
            font-size: 2vw; 
            color: white;`,
        text: "This is text in a box"
    },
    hotspot: {
        type: "link",
        url: "http://tv2.dk",
        target: "_blank"
    }
},
]