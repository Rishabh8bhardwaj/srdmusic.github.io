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
    name: "The Last Ride",
    artist: "Sidhu Moose Wala",
    image: "https://riskyjatt.io/music/thumb/501733/The-Last-Ride-1.jpg",
    path: "https://jatt.work/dren/music/data/Single_Track/202205/The_Last_Ride/320/The_Last_Ride_1.mp3/The%20Last%20Ride%20(RiskyJatt.Com).mp3"
  },
{
    name: "295",
    artist: "Sidhu Moose Wala",
    image: "https://riskyjatt.io/music/thumb/498137/295-1.jpg",
    path: "https://jatt.work/dren/music/data/Single_Track/202107/295/320/295_1.mp3/295%20(RiskyJatt.Com).mp3"
  },
{
    name: "GOAT",
    artist: "Sidhu Moose Wala",
    image: "https://riskyjatt.io/music/thumb/501896/GOAT-1.jpg",
    path: "https://jatt.work/dren/music/data/Punjabi/202206/Moosetape_Full_Album/320/GOAT.mp3/GOAT%20(RiskyJatt.Com).mp3"
  },
{
    name: "Level",
    artist: "Sidhu Moose Wala",
    image: "https://riskyjatt.io/music/thumb/501834/Levels-1.jpg",
    path: "https://jatt.work/dren/music/data/Single_Track/202205/Levels/320/Levels_1.mp3/Levels%20(RiskyJatt.Com).mp3"
  },
{
    name: "Slowed Reverb",
    artist: "Sidhu Moose Wala",
    image: "https://riskyjatt.io/music/thumb/504462/0008-Slowed-Reverb-1.jpg",
    path: "https://jatt.work/dren/music/data/Punjabi/202304/Moose_Vibes_Slowed_Reverb/320/0008_Slowed_Reverb_.mp3/0008%20Slowed%20Reverb%20%20(RiskyJatt.Com).mp3"
  },
{
    name: "Racks and Rounds",
    artist: "Sidhu Moose Wala",
    image: "https://riskyjatt.io/music/thumb/501896/Racks-and-Rounds-1.jpg",
    path: "https://jatt.work/dren/music/data/Punjabi/202206/Moosetape_Full_Album/320/Racks_and_Rounds.mp3/Racks%20and%20Rounds%20(RiskyJatt.Com).mp3"
  },
{
    name: "Jailaan",
    artist: "Sidhu Moose Wala",
    image: "https://riskyjatt.io/music/thumb/498811/Jailaan-From-Moosa-Jatt-1.jpg",
    path: "https://jatt.work/dren/music/data/Single_Track/202109/Jailaan_From_Moosa_Jatt/320/Jailaan_From_Moosa_Jatt_1.mp3/Jailaan%20From%20Moosa%20Jatt%20(RiskyJatt.Com).mp3"
  },
{
    name: "Hollywood",
    artist: "Sidhu Moose Wala",
    image: "https://riskyjatt.io/music/thumb/501923/Hollywood-1.jpg",
    path: "https://jatt.work/dren/music/data/Single_Track/202206/Hollywood/320/Hollywood_1.mp3/Hollywood%20(RiskyJatt.Com).mp3"
  },
{
    name: "Jatt Da Muqabala",
    artist: "Sidhu Moose Wala",
    image: "https://riskyjatt.io/music/thumb/481429/PBX-1-1.jpg",
    path: "https://jatt.work/dren/music/data/Punjabi/201810/PBX_1/320/Jatt_Da_Muqabala.mp3/Jatt%20Da%20Muqabala%20(RiskyJatt.Com).mp3"
  },
{
    name: "Selfmade",
    artist: "Sidhu Moose Wala",
    image: "https://riskyjatt.io/music/thumb/481429/PBX-1-1.jpg",
    path: "https://jatt.work/dren/music/data/Punjabi/201810/PBX_1/320/Selfmade_Chaache_Maame.mp3/Selfmade%20Chaache%20Maame%20(RiskyJatt.Com).mp3"
  },
{
    name: "These Days",
    artist: "Sidhu Moose Wala",
    image: "https://riskyjatt.io/music/thumb/501896/These-Days-1.jpg",
    path: "https://jatt.work/dren/music/data/Punjabi/202206/Moosetape_Full_Album/320/These_Days.mp3/These%20Days%20(RiskyJatt.Com).mp3"
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


