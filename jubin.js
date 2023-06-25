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
    name: "Bewafa Tera Masoom Chehra",
    artist: "Jubin Nautiyal",
    image: "https://www.pagalworld.us/_big/bewafa-tera-masoom-chehra-jubin-nautiyal-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/19446/Bewafa%20Tera%20Masoom%20Chehra%20-%20(Raag.Fm).mp3"
  },
{
    name: "Akh Lad Jaave",
    artist: "Jubin Nautiyal",
    image: "https://www.pagalworld.us/_big/loveratri-2018-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi/14557/Akh%20Lad%20Jave%20-%20(Raag.Fm).mp3"
  },
{
    name: "Kuch To Bta Zindagi",
    artist: "Jubin Nautiyal",
    image: "https://www.pagalworld.us/_big/bajrangi-bhaijaan-2015-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi/1251872/Zindagi%20Kuch%20Toh%20Bata%20(Reprise)%20-%20(Raag.Fm).mp3"
  },
{
    name: "Lo safar",
    artist: "Jubin Nautiyal",
    image: "https://www.pagalworld.us/_big/baaghi-2-2018-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/13487/Lo%20Safar%20(Baaghi%202)%20-%20(Raag.Fm).mp3"
  },
{
    name: "Meri Aashiqui",
    artist: "Jubin Nautiyal",
    image: "https://www.pagalworld.us/_big/meri-aashiqui-jubin-nautiyal-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/18118/Meri%20Aashiqui%20-%20(Raag.Fm).mp3"
  },
{
    name: "Dil Jaaniye",
    artist: "Jubin Nautiyal",
    image: "https://www.pagalworld.us/_big/khandaani-shafakhana-2019-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/15577/Dil%20Jaaniye%20From%20Khandaani%20Shafakhana%20-%20(Raag.Fm).mp3"
  },
{
    name: "Taaron ke Shehar",
    artist: "Jubin Nautiyal",
    image: "https://www.pagalworld.us/_big/taaron-ke-shehar-neha-kakkar-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/19032/Taaron%20Ke%20Shehar%20-%20(Raag.Fm).mp3"
  },
{
    name: "Tum Hi Aana",
    artist: "Jubin Nautiyal",
    image: "https://www.pagalworld.us/_big/marjaavaan-2019-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/16409/Tum%20Hi%20Ana%20(Marjaavaan)%20-%20(Raag.Fm).mp3"
  },
{
    name: "Tujhe Kitna Chahein Aur",
    artist: "Jubin Nautiyal",
    image: "https://www.pagalworld.us/_big/kabir-singh-2019-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi/15265/Tujhe%20Kitna%20Chahein%20Aur%20(Film%20Version)%20-%20(Raag.Fm).mp3"
  },
{
    name: "Kinna Sona",
    artist: "Jubin Nautiyal",
    image: "https://www.pagalworld.us/_big/marjaavaan-2019-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/16711/Kinna%20Sohna%20(Marjaavaan)%20-%20(Raag.Fm).mp3"
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


