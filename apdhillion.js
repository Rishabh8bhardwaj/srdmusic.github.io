let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  
{
  name: "Faraar",
  artist: "AP Dhillon",
  image: "https://cover.mr-jatt.im/thumb/489745/Faraar-1.jpg",
  path: "https://cdnsongs.com/dren/music/data/Punjabi/202007/Desi_Family_3/320/Faraar_1.mp3/Faraar.mp3"
},
{
  name: "Spaceship",
  artist: "AP Dhillon",
  image: "https://cover.mr-jatt.im/thumb/499820/Spaceship-1.jpg",
  path: "https://cdnsongs.com/dren/music/data/Punjabi/202111/Hidden_Gems_EP/320/Spaceship_1.mp3/Spaceship.mp3"
},
{
  name: "Arrogant",
  artist: "AP Dhillon",
  image: "https://cover.mr-jatt.im/thumb/489745/Arrogant-1.jpg",
  path: "https://cdnsongs.com/dren/music/data/Punjabi/202007/Desi_Family_3/320/Arrogant_1.mp3/Arrogant.mp3"
},
{
  name: "Majhe Aale",
  artist: "AP Dhillon",
  image: "https://cover.mr-jatt.im/thumb/499820/Majhe-Aale-1.jpg",
  path: "https://cdnsongs.com/dren/music/data/Punjabi/202111/Hidden_Gems_EP/320/Majhe_Aale_1.mp3/Majhe%20Aale.mp3"
},
{
  name: "Foreigns",
  artist: "AP Dhillon",
  image: "https://cover.mr-jatt.im/thumb/491467/Foreigns-1.jpg",
  path: "https://cdnsongs.com/dren/music/data/Single_Track/202011/Foreigns/320/Foreigns_1.mp3/Foreigns.mp3"
},
{
  name: "All Night Live",
  artist: "AP Dhillon",
  image: "https://cover.mr-jatt.im/thumb/502806/All-Night-Live-1.jpg",
  path: "https://cdnsongs.com/dren/music/data/Punjabi/202210/Two_Hearts_Never_Break_The_Same_EP/320/All_Night_Live_.mp3/All%20Night%20Live%20.mp3"
},
{
  name: "Dil Nu",
  artist: "AP Dhillon",
  image: "https://cover.mr-jatt.im/thumb/502806/Dil-Nu-1.jpg",
  path: "https://cdnsongs.com/dren/music/data/Punjabi/202210/Two_Hearts_Never_Break_The_Same_EP/320/Dil_Nu.mp3/Dil%20Nu.mp3"
},
{
  name: "Toxic",
  artist: "AP Dhillon",
  image: "https://cover.mr-jatt.im/thumb/490924/Toxic-1.jpg",
  path: "https://cdnsongs.com/dren/music/data/Single_Track/202010/Toxic/320/Toxic_1.mp3/Toxic.mp3"
},
{
  name: "Ma Belle",
  artist: "AP Dhillon",
  image: "https://cover.mr-jatt.im/thumb/498163/Ma-Belle-1.jpg",
  path: "https://cdnsongs.com/dren/music/data/Single_Track/202107/Ma_Belle/320/Ma_Belle_1.mp3/Ma%20Belle.mp3"
},
{
  name: "Summer High",
  artist: "AP Dhillon",
  image: "https://cover.mr-jatt.im/thumb/502332/Summer-High-1659684687.jpg",
  path: "https://cdnsongs.com/dren/music/data/Single_Track/202208/Summer_High/320/Summer_High_1.mp3/Summer%20High.mp3"
},
{
  name: "Insane",
  artist: "AP Dhillon",
  image: "https://cover.mr-jatt.im/thumb/497111/Insane-1.jpg",
  path: "https://cdnsongs.com/dren/music/data/Single_Track/202104/Insane/320/Insane_1.mp3/Insane.mp3"
},
{
  name: "Wo Noor",
  artist: "AP Dhillon",
  image: "https://cover.mr-jatt.im/thumb/502806/Wo-Noor-1.jpg",
  path: "https://cdnsongs.com/dren/music/data/Punjabi/202210/Two_Hearts_Never_Break_The_Same_EP/320/Wo_Noor.mp3/Wo%20Noor.mp3"
},

];

function random_bg_color() {

 // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;  
}
function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
 }

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


