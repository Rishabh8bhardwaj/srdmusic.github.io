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
    name: "Lahore",
    artist: "Guru Randhawa",
    image: "https://pagalfree.com/images/128Lagdi%20Lahore%20Di%20-%20Street%20Dancer%203D%20128%20Kbps.jpg",
    path: "https://pagalfree.com/download/320-Lagdi%20Lahore%20Di%20-%20Street%20Dancer%203D%20320%20Kbps.mp3"
  },
{
    name: "Naach Meri Rani",
    artist: "Guru Randhawa",
    image: "https://pagalfree.com/images/128Naach%20Meri%20Rani%20-%20Guru%20Randhawa%20128%20Kbps.jpg",
    path: "https://pagalfree.com/download/320-Naach%20Meri%20Rani%20-%20Guru%20Randhawa%20320%20Kbps.mp3"
  },
{
    name: "Baby Girl",
    artist: "Guru Randhawa",
    image: "https://pagalfree.com/images/128Baby%20Girl%20-%20Guru%20Randhawa%20128%20Kbps.jpg",
    path: "https://pagalfree.com/download/320-Baby%20Girl%20-%20Guru%20Randhawa%20320%20Kbps.mp3"
  },
{
    name: "Teri Choriyaan",
    artist: "Guru Randhawa",
    image: "https://pagalfree.com/images/128Teri%20Choriyaan%20-%20Chhalaang%20128%20Kbps.jpg",
    path: "https://pagalfree.com/download/320-Teri%20Choriyaan%20-%20Chhalaang%20320%20Kbps.mp3"
  },
{
    name: "Surma",
    artist: "Guru Randhawa",
    image: "https://pagalfree.com/images/128Surma%20Surma%20-%20Guru%20Randhawa%20128%20Kbps.jpg",
    path: "https://pagalfree.com/download/320-Surma%20Surma%20-%20Guru%20Randhawa%20320%20Kbps.mp3"
  },
{
    name: "Outfit",
    artist: "Guru Randhawa",
    image: "https://pagalfree.com/images/128Outfit%20-%20Ujda%20Chaman%20128%20Kbps.jpg",
    path: "https://pagalfree.com/download/320-Outfit%20-%20Ujda%20Chaman%20320%20Kbps.mp3"
  },
{
    name: "Morni Banke",
    artist: "Guru Randhawa",
    image: "https://pagalfree.com/images/128Morni%20Banke%20-%20Badhaai%20Ho%20128%20Kbps.jpg",
    path: "https://pagalfree.com/download/320-Morni%20Banke%20-%20Badhaai%20Ho%20320%20Kbps.mp3"
  },
{
    name: "Patola",
    artist: "Guru Randhawa",
    image: "https://pagalfree.com/images/128Patola%20-%20Blackmail%20128%20Kbps.jpg",
    path: "https://pagalfree.com/download/320-Patola%20-%20Blackmail%20320%20Kbps.mp3"
  },
{
    name: "Nachle Na Dil",
    artist: "Guru Randhawa",
    image: "https://pagalfree.com/images/128Nachle%20Na%20-%20Dil%20Juunglee%20128%20Kbps.jpg",
    path: "https://pagalfree.com/download/320-Nachle%20Na%20-%20Dil%20Juunglee%20320%20Kbps.mp3"
  },
{
    name: "High Rated Gabru",
    artist: "Guru Randhawa",
    image: "https://pagalfree.com/images/128High%20Rated%20Gabru%20-%20Nawabzaade%20128%20Kbps.jpg",
    path: "https://pagalfree.com/download/320-High%20Rated%20Gabru%20-%20Nawabzaade%20320%20Kbps.mp3"
  },
{
    name: "Suit Suit",
    artist: "Guru Randhawa",
    image: "https://pagalfree.com/images/128Suit%20Suit%20-%20Hindi%20Medium%20128%20Kbps.jpg",
    path: "https://pagalfree.com/download/320-Suit%20Suit%20-%20Hindi%20Medium%20320%20Kbps.mp3"
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


