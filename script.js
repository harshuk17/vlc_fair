document.addEventListener("DOMContentLoaded",function(){

    const gettingVideo= document.querySelector("#gettingVideo");
    const inputVideo= document.querySelector("#inputVideo");
    const videoPlayer= document.querySelector("#main");
    const totalTimeElem = document.querySelector("#totalTime");
    const currentTimeElem = document.querySelector("#currentTime");
    const slider = document.querySelector("#slider");
    const toast=document.querySelector("#toast");
    const iconPhoto=document.querySelector("#iconPhoto");

    let video="";
    let duration;
    let timerObj;
    let currentPlayTime = 0;


    slider.value=0;

const inputHandler=()=>{
    // making a function which provide click on choose file by clicking on open option 
    inputVideo.click();
    const videoElement=document.querySelector("video");
    videoElement.remove();
      
};
const acceptInputHandler=(obj)=>{
    (function(){
        iconPhoto.style.display="none";
    })()
    const selectedvideo= obj.target.files[0]; 
    // now making selected video as base64 string type by using predefined methods provided by browser
    const link=URL.createObjectURL(selectedvideo);
    // creating element for main part
    const videoElement= document.createElement("video");
    videoElement.src=link;

    // if (videoPlayer.children.length > 0) {

    //     // if present -> remove it 
    //     videoPlayer.removeChild(videoPlayer.children[0]);
    // }

    videoPlayer.appendChild(videoElement);
    // till above line we done for further stling we can do more things
    videoElement.setAttribute("class","video");
    videoElement.play();
    // videoELement.controls="true";
    videoElement.volume= 0.3;
    video=videoElement;
    console.log("video inner",video);
    videoElement.addEventListener("loadedmetadata", function () {
        // it gives in decimal value -> convert that into seconds
        duration = Math.round(videoElement.duration);
        // convert seconds into hrs:mins:secs
        let time = timeFormat(duration);
        totalTimeElem.innerText = time;
        slider.setAttribute("max", duration);
        startTimer();

    })
    
};

gettingVideo.addEventListener("click",inputHandler);
// when file was selcted 
inputVideo.addEventListener("change",acceptInputHandler);

// adding controls to menubar options payback and volume
const speedUp= document.querySelector("#speedUp");
const speedDown= document.querySelector("#speedDown");
const volumeUp= document.querySelector("#volumeUp");
const volumeDown= document.querySelector("#volumeDown");
 
const speedUpHandler=()=>{

    const videoElement = document.querySelector("video");
    if(videoElement==null){
        return;
    }
    if(videoElement.playbackRate>=2){
        return;
    }
    console.log(videoElement.playbackRate);
    const up=videoElement.playbackRate+0.5;
    videoElement.playbackRate=up;

    // making  toast functionality
 
    toast.innerText=videoElement.playbackRate+"x";
    console.log("toast 1",toast);
    (function(){
        toast.style.display = "block";
        setTimeout(() => {
            toast.style.display = "none"
        }, 1000)
    })() 
    console.log("i am toaster",toast.innerText);
    console.log("speedafter",videoElement.playbackRate);
};
 const speedDownHandler=()=>{
    console.log("i am inside speed down handler");
    const videoElement=document.querySelector("video");
    if(videoElement==null){
        return;
    }
    if(videoElement.playbackRate<=0.5){
        return;
    }
    console.log("speed down before",videoElement.playbackRate);
    const down=videoElement.playbackRate-0.5;
    videoElement.playbackRate=down;
    // making functionality of toast
 
    toast.innerText=videoElement.playbackRate+"x";
    console.log("toast 1",toast);
    (function(){
        toast.style.display="block";
        setTimeout(function(){
            toast.style.display="none";
        },1000);
    })() 
    console.log("speed down after",videoElement.playbackRate);


};
// making function of volume up and volume down options
const volumeUpHandler=()=>{
    const videoElement= document.querySelector("video");
    if(!videoElement){
        return;
    }
    if(videoElement.volume>=0.99){
        return;
    }
    console.log("before volume",videoElement.volume);
    videoElement.volume+=0.1;
    // making volume toast
 
    toast.innerText = `${Math.round(videoElement.volume * 100)}%`;
    console.log("toast 1",toast);
    (function(){
        toast.style.display="block";
        setTimeout(function(){
            toast.style.display="none";
        },2000);
    })() 
    console.log("after volume",videoElement.volume);
}
const volumeDownHandler=()=>{
    const videoElement= document.querySelector("video");
    if(!videoElement){
        return;
    }
    if(videoElement.volume<=0.1){
        videoElement.volume=0;
        return;
    }
    console.log("volume before down",videoElement.volume);
    videoElement.volume-= 0.1;
    // making toast element 
 
    toast.innerText = `${Math.round(videoElement.volume * 100)}%`;
    console.log("toast 1",toast);
    (function(){
        toast.style.display="block";
        setTimeout(function(){
            toast.style.display="none";
        },2000);
    })() 
    console.log("volume after down",videoElement.volume);
}
speedUp.addEventListener("click", speedUpHandler);
speedDown.addEventListener("click",speedDownHandler);
volumeUp.addEventListener("click", volumeUpHandler);
volumeDown.addEventListener("click", volumeDownHandler);

// making functionality of footer 


// functionality of the play pause button
const play= document.querySelector("#play");

const playbutton=()=>{
    const videoElement=document.querySelector("video");
    if(videoElement.paused){
        videoElement.play();
        play.setAttribute('aria-label', 'Pause video');
        play.innerHTML = '<i class="fa-solid fa-pause"></i>';
       
    }else{
        videoElement.pause();
        play.setAttribute('aria-label', 'Play video');
        play.innerHTML = '<i class="fa-solid fa-play"></i>';
    }

}

play.addEventListener("click",playbutton)

// functionalty of stop button 
const stop=document.querySelector("#stop");
const stopHandler=()=>{
    const videoElement=document.querySelector("video");
    const slider=document.querySelector("#slider");
    (function(){
        videoElement.remove();
       
        video.currentTime = 0; // Reset the video to the start
    slider.value = 0; // Reset the slider to the start
    currentTimeElem.innerText = "00:00:00"; // Reset the displayed current time
    totalTimeElem.innerText = '--/--/--';
    stopTimer(); // Stop the timer
    })();
}
stop.addEventListener("click",stopHandler);

// setting time of seek bar current time and duration
function timeFormat(timeCount) {
    let time = '';
    const sec = parseInt(timeCount, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60);
    let seconds = sec - (hours * 3600) - (minutes * 60);
    if (hours < 10)
        hours = "0" + hours;
    if (minutes < 10)
        minutes = "0" + minutes;
    if (seconds < 10)
        seconds = "0" + seconds;
    time = `${hours}:${minutes}:${seconds}`;
    return time;
}

function startTimer() {
    timerObj = setInterval(function () {
        currentPlayTime = Math.round(video.currentTime);
        slider.value = currentPlayTime;
        const time = timeFormat(currentPlayTime);
        currentTimeElem.innerText = time;
        if (currentPlayTime == video.duration) {
            stopHandler();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerObj);
}
// tooltip handling on slider
slider.addEventListener('mousemove', (event) => {
    const videoElement=document.querySelector("video")
    const rect = slider.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percent = offsetX / slider.offsetWidth;
    const tooltipTime = percent * videoElement.duration;

    tooltipSeekbar.style.left = `${offsetX}px`;
    tooltipSeekbar.innerText = formatTime(tooltipTime);
    tooltipSeekbar.style.opacity = 1;
});

slider.addEventListener('mouseleave', () => {
    tooltipSeekbar.style.opacity = 0;
});

// making functionality of click on seek bar and set the current time

slider.addEventListener("input",()=>{
    const videoElement=document.querySelector("video");
    videoElement.currentTime=slider.value;
})

    // making function to expand screen
    const expand = document.querySelector("#expand");
console.log(expand);

const fullScreenHandler=()=>{
    const videoElement=document.querySelector("video");
    videoElement.mozRequestFullScreen();
    console.log("inside full screen handler");
}
expand.addEventListener("click",fullScreenHandler);

// making functionality of the fordward and backward button 
const backward= document.querySelector("#Backward");

const backwardHandler=()=>{
    const videoElement=document.querySelector("video");
    console.log("current time",videoElement.currentTime);
    videoElement.currentTime-=10;
    if(videoElement.currentTime<0){
        videoElement.currentTime=0;
    }
}
backward.addEventListener("click",backwardHandler);

const fordward= document.querySelector("#fordward");

const fordwardHandler=()=>{
    const videoElement=document.querySelector("video");
    videoElement.currentTime+=10;
    if(videoElement.currentTime>videoElement.duration){
        return;
    }
}
fordward.addEventListener("click",fordwardHandler);


// makinng functionality of full screen by double clicking
const videoPlayerHandler=()=>{
   
    if (document.fullscreenElement) {
        // Exit full screen
       
        if (document.mozCancelFullScreen) { 
            document.mozCancelFullScreen();
        } 
    } else {
        // Enter full screen
      if (videoPlayer.mozRequestFullScreen) { 
            videoPlayer.mozRequestFullScreen();
        } 
    }
    
}
videoPlayer.addEventListener("dblclick",videoPlayerHandler);

// *********keybord controller***********

const body = document.querySelector("body");
// keyboard inputs
body.addEventListener("keyup", function (e) {
    const video=document.querySelector("video");
    console.log(e.key);
    if (!video) return;
    if (e.code == "Space") {
        
        playbutton();
    }
    else if (e.key == "ArrowUp" ) {
        volumeUpHandler()
    }
    else if (e.key == "ArrowDown") {
        volumeDownHandler();
    }
    else if (e.key == "+") {
        speedUpHandler();
    }
    else if (e.key == "-") {
        speedDownhandler();
    }
    else if (e.key == "ArrowRight") {
        fordwardHandler();
    }
    else if (e.key == "ArrowLeft") {
        backwardHandler();
        
    }
})

// making the functionality when holding on right side of the player the video playback speed auutomaticall becomes 2x
const holding2x=document.querySelector("#holding2x");
const mousedownHandler=()=>{
    console.log("holding2x");
    const videoElement=document.querySelector("video");
    videoElement.playbackRate+=1;
    toast.innerText=videoElement.playbackRate+"x✈";
    (function(){
        toast.style.display="block";
        // setTimeout(function(){
        //     toast.style.display="none";
        // },);
    })() 


}
const mouseupHandler=()=>{
    const videoElement=document.querySelector("video");

    videoElement.playbackRate=1;
    (function(){
        toast.style.display="none";
        // setTimeout(function(){
        //     toast.style.display="none";
        // },);
    })() 
}
holding2x.addEventListener("mousedown",mousedownHandler);
holding2x.addEventListener("mouseup",mouseupHandler);

// functionality to show the footer in fullScreen mode
const footerHead=document.querySelector("#footerHead");
const videoElement=document.querySelector("video");
console.log("hello footerhead");
const showFooter=()=>{
    footer.style.display="block";
    setTimeout(function(){
        footer.style.display="none";
    },3000);
    console.log("i am inside show footer");
}
function handleFullscreenChange() {
    if (document.fullscreenElement) {
      showFooter();
    } else {
      footer.classList.remove('show');
    }
  }
videoElement.addEventListener("mozfullscreenchange",handleFullscreenChange());
videoElement.addEventListener("mousemove",showFooter());

videoPlayer.addEventListener("click",playbutton());
})
    



