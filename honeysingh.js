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
    name: "Care Ni Karda",
    artist: "Yo Yo Honey Singh",
    image: "https://img.pagalworld.icu/%20%20Care%20Ni%20Karda%20-15248-hd.jpg",
    path: "https://hindi.pagalworld.icu/2020/Care%20Ni%20Karda-5f91511eb688d.mp3"
  },
{
    name: "Chhote Chhote Peg",
    artist: "Yo Yo Honey Singh",
    image: "https://img.pagalworld.icu/Chhote%20Chhote%20Peg-322-hd.jpg",
    path: "https://hindi.pagalworld.icu/2018/Sonu%20Ke%20Titu%20Ki%20Sweety/Chhote-Chhote-Peg-(pagalworldsongs.co.in).mp3"
  },
{
    name: "Sunny Sunny",
    artist: "Yo Yo Honey Singh",
    image: "https://img.pagalworld.icu/516220px-Yaariyan282014film29poster.jpg",
    path: "https://hindi.pagalworld.icu/2013/Yaariyan/Sunny-Sunny-(pagalworldsongs.co.in).mp3"
  },
{
    name: "Chaar Botal Vodka",
    artist: "Yo Yo Honey Singh",
    image: "https://img.pagalworld.icu/Chaar%20Botal%20Vodka-2644-hd.jpg",
    path: "https://hindi.pagalworld.icu/2014/Ragini%20MMS%202/Chaar-Botal-Vodka-(pagalworldsongs.co.in).mp3"
  },
{
    name: "Aao Raja",
    artist: "Yo Yo Honey Singh",
    image: "https://img.pagalworld.icu/Aao%20Raja-1932-hd.jpg",
    path: "https://hindi.pagalworld.icu/2015/Gabbar%20is%20Back/Aao-Raja-(Gabbar-Is-Back)-(pagalworldsongs.co.in).mp3"
  },
{
    name: "Hai Apna Dil",
    artist: "Yo Yo Honey Singh",
    image: "https://img.pagalworld.icu/Hai%20Apna%20Dil%20-2478-hd.jpg",
    path: "https://hindi.pagalworld.icu/2014/The%20Xpose/Hai-Apna-Dil-(Blue-S-Mix)-(pagalworldsongs.co.in).mp3"
  },
{
    name: "Ek Mulaqat",
    artist: "Yo Yo Honey Singh",
    image: "https://img.pagalworld.icu/594220px-TheShaukeens2.jpg",
    path: "https://hindi.pagalworld.icu/2014/Sonali%20Cable/EK-Mulaqat-(pagalworldsongs.co.in).mp3"
  },
{
    name: "Blue Eyes",
    artist: "Yo Yo Honey Singh",
    image: "https://cover.mr-jatt.im/thumb/12716/Blue-Eyes-1.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi-Singles/1146676/Blue%20Eyes%20-%20(Raag.Fm).mp3"
  },
{
    name: "Dil Chori",
    artist: "Yo Yo Honey Singh",
    image: "https://cover.mr-jatt.im/thumb/41314/Dil-Chori-1.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi/13075/Dil%20Chori%20Sada%20Ho%20Geya%20-%20(Raag.Fm).mp3"
  },
{
    name: "Desi  Kalakaar",
    artist: "Yo Yo Honey Singh",
    image: "https://www.pagalworld.us/_big/desi-kalakaar-honey-singh-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi/1195833/Desi%20Kalakaar%20-%20(Raag.Fm).mp3"
  },
{
    name: "Party with Bhoothnath",
    artist: "Yo Yo Honey Singh",
    image: "https://www.pagalworld.us/_big/bhoothnath-returns-2014-250.jpg",
    path: "https://raag.fm/files/mp3/128/Hindi/1152264/Party%20With%20The%20Bhoothnath%20-%20(Raag.Fm).mp3"
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


