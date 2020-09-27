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
            video.hotspots.off(); 
            const elmsHotspots = document.querySelectorAll('a.hotspot');
            elmsHotspots.forEach((elmHotspot) => {
                elmHotspot.parentElement.removeChild(elmHotspot);
            });
            delete video;
            delete hotspots;
        }
    }
}


const hotspots = [

    //vegan icon click
{
    active: true,
    videoId: "video1",
    markIn: 78.38,
    markOut: 78.42,
    sizeX: 45,
    sizeY: 45,
    posX: -0.2,
    posY: 33,
    ui: {
        pause: true,
        type: "image",
        style: "`border: none;",
        image: "assets/img/btnCircleRED.png",
    },
    hotspot: {
        type: "function",
    }
},

{
    active: true,
    videoId: "video1",
    markIn: 78.38,
    markOut: 78.42,
    sizeX: 15,
    sizeY: 15,
    posX: 80,
    posY: 83,
    ui: {
        pause: true,
        type: "image",
        style: "`border: none;",
        image: "assets/img/btnAnywhereContinue.png",
    },
    hotspot: {
        type: "function",
    }
},



//info continue
{
    active: true,
    videoId: "video1",
    markIn: 79,
    markOut: 79.15,
    sizeX: 15,
    sizeY: 15,
    posX: 80,
    posY: 83,
    ui: {
        pause: true,
        type: "image",
        style: "`border: none;",
        image: "assets/img/btnAnywhereContinue.png",
    },
    hotspot: {
        type: "function",
    }
},

//info hover
{
    active: true,
    videoId: "video1",
    markIn: 79,
    markOut: 79.15,
    sizeX: 23,
    sizeY: 9,
    posX: 74,
    posY: 16,
    ui: {
        type: "box",
        title: "info",
        style: `
        border: none; 
        background-color: rgba(0,0,0,0)
        `,
    },
    hotspot: {
        type: "link",
        url: "assets/info.html",
        target: "_blank"
    }
},

{
    active: true,
    videoId: "video1",
    markIn: 79,
    markOut: 79.15,
    sizeX: 23,
    sizeY: 9,
    posX: 74,
    posY: 41,
    ui: {
        type: "box",
        title: "info",
        style: `
        border: none; 
        background-color: rgba(0,0,0,0)
        `,
    },
    hotspot: {
        type: "link",
        url: "assets/info.html",
        target: "_blank"
    }
},

{
    active: true,
    videoId: "video1",
    markIn: 79,
    markOut: 79.15,
    sizeX: 23,
    sizeY: 9,
    posX: 74,
    posY: 65,
    ui: {
        type: "box",
        title: "info",
        style: `
        border: none; 
        background-color: rgba(0,0,0,0)
        `,
    },
    hotspot: {
        type: "link",
        url: "assets/info.html",
        target: "_blank"
    }
},

//ingredient continue
{
    active: true,
    videoId: "video1",
    markIn: 79.30,
    markOut: 79.45,
    sizeX: 15,
    sizeY: 15,
    posX: 80,
    posY: 83,
    ui: {
        pause: true,
        type: "image",
        style: "`border: none;",
        image: "assets/img/btnAnywhereContinueWHITE.png",
    },
    hotspot: {
        type: "function",
    }
},

//ingredients
{
    active: true,
    videoId: "video1",
    markIn: 79.30,
    markOut: 79.45,
    sizeX: 58,
    sizeY: 58,
    posX: 70,
    posY: 18,
    ui: {
        pause: true,
        type: "image",
        style: "`border: none;",
        image: "assets/img/RecipeText.png",
    },
    hotspot: {
        type: "function",
    }
},


//instructions
//step 1
//step 2
{
    active: true,
    videoId: "video1",
    markIn: 88,
    markOut: 131.30,
    sizeX: 20,
    sizeY: 100,
    posX: 0,
    posY: 0,
    ui: {
        type: "box",
        title: "Step 2",
        style: `border: none; 
            background-color: rgba(355,355,355,1); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            text-decoration: none; 
            text-align: left;
            font-size: 1.5vw; 
            color: rgba(248,69,57,1);`,
        text: "2. Scrub or peel the carrots and parsnips, then slice them into 1-inch pieces. Wash the mushrooms and cut them in half. Peel the onion and slice it into 1-inch wide wedges. Wash the radishes, cut off their stems and roots, then slice each one in half."
    },
    hotspot: {
        type: "link",
        url: "assets/info.html",
        target: "_blank"
    }
},
//step 3
{
    active: true,
    videoId: "video1",
    markIn: 131.30,
    markOut: 142,
    sizeX: 20,
    sizeY: 100,
    posX: 0,
    posY: 0,
    ui: {
        type: "box",
        title: "Step 3",
        style: `border: none; 
            background-color: rgba(355,355,355,1); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            text-decoration: none; 
            text-align: left;
            font-size: 1.5vw; 
            color: rgba(248,69,57,1);`,
        text: "3. Spread the prepared vegetables out over a large baking sheet, making sure they're in a single layer and no piled on top one another. Pour the balsamic marinade over top, then toss the vegetables until they're all well coated."
    },
    hotspot: {
        type: "link",
        url: "assets/info.html",
        target: "_blank"
    }
},
//step 4
{
    active: true,
    videoId: "video1",
    markIn: 151,
    markOut: 160,
    sizeX: 20,
    sizeY: 100,
    posX: 0,
    posY: 0,
    ui: {
        type: "box",
        title: "Step 3",
        style: `border: none; 
            background-color: rgba(355,355,355,1); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            text-decoration: none; 
            text-align: left;
            font-size: 1.5vw; 
            color: rgba(248,69,57,1);`,
        text: "4.  Carefully remove the baking sheet from the oven, give the vegetables a good stir, then return them to the oven and roast for an additional 15-20 minutes, or until the vegetables are tender and have browned on the edges."
    },
    hotspot: {
        type: "link",
        url: "assets/info.html",
        target: "_blank"
    }
},
]