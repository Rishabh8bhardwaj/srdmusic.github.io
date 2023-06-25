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
    name: "Do you Know",
    artist: "Diljit Dosanjh",
    image: "https://covers.djpunjab.pro/image/33292/Do-You-Know-1.jpg",
    path: "https://cdnsongs.com/dren/music/data/Single_Track/201609/Do_You_Know/320/Do_You_Know_1.mp3/Do%20You%20Know.mp3"
  },
{
    name: "Born to Shine",
    artist: "Diljit Dosanjh",
    image: "https://covers.djpunjab.pro/image/489789/Born-To-Shine-1.jpg",
    path: "https://cdnsongs.com/dren/music/data/Punjabi/202007/G_O_A_T/320/Born_To_Shine_1.mp3/Born%20To%20Shine.mp3"
  },
{
    name: "Lemonade",
    artist: "Diljit Dosanjh",
    image: "https://covers.djpunjab.pro/image/502196/Lemonade-1.jpg",
    path: "https://cdnsongs.com/dren/music/data/Punjabi/202207/Drive_Thru_EP/320/Lemonade.mp3/Lemonade.mp3"
  },
{
    name: "G-O-A-T",
    artist: "Diljit Dosanjh",
    image: "https://covers.djpunjab.pro/image/489786/G-O-A-T-1.jpg",
    path: "https://cdnsongs.com/dren/music/data/Single_Track/202007/G_O_A_T/320/G_O_A_T_1.mp3/G%20O%20A%20T.mp3"
  },
{
    name: "Jugni",
    artist: "Diljit Dosanjh",
    image: "https://pagalnew.com/coverimages/Jugni-Diljit-Dosanjh-500-500.jpg",
    path: "https://pagalnew.com/download320/34916"
  },
{
    name: "Lak 28 Kudi Da",
    artist: "Diljit Dosanjh",
    image: "https://pagalnew.com/coverimages/Lak-28-Kudi-Da-Diljit-Dosanjh-500-500.jpg",
    path: "https://pagalnew.com/download320/30327"
  },
{
    name: "Proper patola",
    artist: "Diljit Dosanjh",
    image: "https://pagalnew.com/coverimages/Proper-Patola-Diljit-Dosanjh-500-500.jpg",
    path: "https://pagalnew.com/download320/30326"
  },
{
    name: "Sher From Honsla",
    artist: "Diljit Dosanjh",
    image: "https://pagalnew.com/coverimages/Sher-From-Honsla-Rakh-Diljit-Dosanjh-500-500.jpg",
    path: "https://pagalnew.com/download320/20218"
  },
{
    name: "Black White",
    artist: "Diljit Dosanjh",
    image: "https://pagalnew.com/coverimages/Black-White-Diljit-Dosanjh-500-500.jpg",
    path: "https://pagalnew.com/download320/19419"
  },
{
    name: "Dum Dum",
    artist: "Diljit Dosanjh",
    image: "https://pagalnew.com/coverimages/Dum-Dum-(Reprise)-Diljit-Dosanjh-Version-Phillauri-500-500.jpg",
    path: "https://pagalnew.com/download320/3421"
  },
{
    name: "Jigra te laija",
    artist: "Diljit Dosanjh",
    image: "https://pagalnew.com/coverimages/jigra-te-laija-gabrua-jodi-500-500.jpg",
    path: "https://pagalnew.com/download320/42211"
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


