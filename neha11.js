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
    name: "Tu He Yarr Mera",
    artist: "Neha Kakkar",
    image: "https://www.pagalworld.us/_big/pati-patni-aur-woh-2019-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/16950/Tu%20Hi%20Yaar%20Mera%20(Pati%20Patni%20Aur%20Woh)%20-%20(Raag.Fm).mp3"
  },
{
    name: "Dilbar",
    artist: "Neha Kakkar",
    image: "https://www.pagalworld.us/_big/satyameva-jayate-2018-250.jpg",
    path: "https://pagalsong.in/download/1701/Dilbar%20128%20KBPS%20mp3"
  },
{
    name: "Yaad Piya Ki Aane Lagi",
    artist: "Neha Kakkar",
    image: "https://www.pagalworld.us/_big/yaad-piya-ki-aane-lagi-neha-kakkar-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/16767/Yaad%20Piya%20Ki%20Aane%20Lagi%20-%20(Raag.Fm).mp3"
  },
{
    name: " O Saki Saki",
    artist: "Neha Kakkar",
    image: "https://www.pagalworld.us/_big/batla-house-2019-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/15563/O%20Saki%20Saki%20(Batla%20House)%20-%20(Raag.Fm).mp3"
  },
{
    name: "Taaron ke shehar",
    artist: "Neha Kakkar",
    image: "https://www.pagalworld.us/_big/taaron-ke-shehar-neha-kakkar-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/19032/Taaron%20Ke%20Shehar%20-%20(Raag.Fm).mp3"
  },
{
    name: "Morni Banke",
    artist: "Neha Kakkar",
    image: "https://www.pagalworld.us/_big/badhaai-ho-2018-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/16609/Tum%20Par%20Hum%20Hai%20Atke%20(Pagalpanti)%20-%20(Raag.Fm).mp3"
  },
{
    name: "Londan Thumakda",
    artist: "Neha Kakkar",
    image: "https://www.pagalworld.us/_big/queen-2014-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi/1150037/London%20Thumakda%20-%20(Raag.Fm).mp3"
  },
{
    name: "Garmi",
    artist: "Neha Kakkar",
    image: "https://www.pagalworld.us/_big/street-dancer-3d-2020-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/17138/Garmi%20(Street%20Dancer%203D)%20-%20(Raag.Fm).mp3"
  },
{
    name: "Teri Aankhon Mein",
    artist: "Neha Kakkar",
    image: "https://www.pagalworld.us/_big/teri-aankhon-mein-darshan-raval-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/19135/Teri%20Aankhon%20Mein%20-%20(Raag.Fm).mp3"
  },
{
    name: "Coca Cola",
    artist: "Neha Kakkar",
    image: "https://www.pagalworld.us/_big/luka-chuppi-2019-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi/14906/Coca%20Cola%20-%20(Raag.Fm).mp3"
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


