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
    name: "Dil Diyan Gallan",
    artist: "Atif Aslam",
    image: "https://pagalnew.com/coverimages/Dil-Diyan-Gallan-Tiger-Zinda-Hai-500-500.jpg",
    path: "https://pagalnew.com/download320/3715"
  },
{
    name: "Dil Meri Na Sune",
    artist: "Atif Aslam",
    image: "https://pagalnew.com/coverimages/Dil-Meri-Na-Sune-Genius-500-500.jpg",
    path: "https://pagalnew.com/download320/2794"
  },
{
    name: "Dil Na Janane Kyun",
    artist: "Atif Aslam",
    image: "https://pagalnew.com/coverimages/Dil-Na-Jaane-Kyun-Jayantabhai-Ki-Luv-Story-500-500.jpg",
    path: "https://pagalnew.com/download320/5947"
  },
{
    name: "Jeena Jeena",
    artist: "Atif Aslam",
    image: "https://pagalnew.com/coverimages/Jeena-Jeena-Badlapur-500-500.jpg",
    path: "https://pagalnew.com/download320/4527"
  },
{
    name: "Jeene Laga Hoon",
    artist: "Atif Aslam",
    image: "https://pagalnew.com/coverimages/Jeene-Laga-Hoon-Ramaiya-Vastavaiya-500-500.jpg",
    path: "https://pagalnew.com/download320/5690"
  },
{
    name: "Le Jaa Tu Mujhe",
    artist: "Atif Aslam",
    image: "https://pagalnew.com/coverimages/Le-Jaa-Tu-Mujhe-F.A.L.T.U-500-500.jpg",
    path: "https://pagalnew.com/download320/11295"
  },
{
    name: "Mein Rang Sharbaton ka",
    artist: "Atif Aslam",
    image: "https://pagalnew.com/coverimages/Main-Rang-Sharbaton-Ka-Phata-Poster-Nikhla-Hero-500-500.jpg",
    path: "https://pagalnew.com/download320/6258"
  },
{
    name: "O-Saathi",
    artist: "Atif Aslam",
    image: "https://pagalnew.com/coverimages/O-Saathi-Baaghi-2-500-500.jpg",
    path: "https://pagalnew.com/download320/2785"
  },
{
    name: "Pehli Nazar Mein mix ",
    artist: "Atif Aslam",
    image: "https://pagalnew.com/coverimages/Pehli-Nazar-Mein-Lounge-Mix-Race-500-500.jpg",
    path: "https://pagalnew.com/download320/8906"
  },
{
    name: "Pehli Nazar mein",
    artist: "Atif Aslam",
    image: "https://pagalnew.com/coverimages/Pehli-Nazar-Mein-Race-500-500.jpg",
    path: "https://pagalnew.com/download320/8904"
  },
{
    name: "Piya O Re Piya",
    artist: "Atif Aslam",
    image: "https://pagalnew.com/coverimages/Piya-O-Re-Piya-Sad-Tere-Naal-Love-Ho-Gaya-500-500.jpg",
    path: "https://pagalnew.com/download320/5757"
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


