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
    name: "Tera Yaar hoon mai",
    artist: "Arjit singh",
    image: "https://img.pagalworld.icu/Tera%20Yaar%20Hoon%20Main%20-323-hd.jpg",
    path: "https://hindi.pagalworld.icu/2018/Sonu%20Ke%20Titu%20Ki%20Sweety/b-Tera-Yaar-Hoon-Main-(pagalworldsongs.co.in).mp3"
  },
  {
    name: "subah subah",
    artist: "Arjit singh",
    image: "https://img.pagalworld.icu/Subah%20Subah-324-hd.jpg",
    path: "https://hindi.pagalworld.icu/2018/Sonu%20Ke%20Titu%20Ki%20Sweety/Subah-Subah-b-SKTKS-(pagalworldsongs.co.in).mp3"
  },
  {
    name: "khol de pyaar",
    artist: "Arjit singh",
    image: "https://img.pagalworld.icu/Khol%20De%20Par-363-hd.jpg",
    path: "https://hindi.pagalworld.icu/2018/Hichki/Khol-De-Par-(pagalworldsongs.co.in).mp3",
  },
  {
    name: "Nashe Si Chad Gayi",
    artist: "Arjit singh",
    image: "https://img.pagalworld.icu/Nashe%20Si%20Chadh%20Gayi-1756-hd.jpg",
    path: "https://hindi.pagalworld.icu/2016/Befikre/Nashe-Si-Chadh-Gayi-(pagalworldsongs.co.in).mp3",
  },
  {
    name: "Pachtaoge",
    artist: "Arjit Singh",
    image: "https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_797999819.jpg",
    path: "https://pagalsong.in/download/10638/Pachtaoge%20-%20Arijit%20Singh%20320%20KBPS%20mp3",
  }, {
    name: "Phir Bhi Tumko Chaahunga",
    artist: "Arjit singh",
    image: "https://img.pagalworld.icu/Phir%20Bhi%20Tumko%20Chaahunga-856-hd.jpg",
    path: "https://pagalnew.com/download320/3478",
  }, {
    name: "Galti se Mistake",
    artist: "Arjit singh",
    image: "https://img.pagalworld.icu/Galti%20Se%20Mistake%20-942-hd.jpg",
    path: "https://hindi.pagalworld.icu/2017/Jagga%20Jasoos/Galti-Se-Mistake-b-Jagga-Jasoos-(pagalworldsongs.co.in).mp3",
  }, {
    name: "Tera Fitoor",
    artist: "Arjit singh",
    image: "https://img.pagalworld.icu/Tera%20Fitoor-539-hd.jpg",
    path: "https://hindi.pagalworld.icu/2018/Genius/Tera-Fitoor-(Genius)-(pagalworldsongs.co.in).mp3",
  }, {
    name: "Ghungroo",
    artist: "Arjit singh",
    image: "https://img.pagalworld.icu/Ghungroo-7857-hd.jpg",
    path: "https://hindi.pagalworld.icu/2019/WAR/Ghungroo-b-War-(pagalworldsongs.co.in).mp3",
  },
  {
    name: "Hawayein",
    artist: "Arjit singh",
    image: "https://img.pagalworld.icu/Hawayein%20-952-hd.jpg",
    path: "https://hindi.pagalworld.icu/2017/Jab%20Harry%20Met%20Sejal/Hawayein-b-Jab-Harry-Met-Sejal-(pagalworldsongs.co.in).mp3",
  },
  {
    name: "Ae Dil Hai Mushkil",
    artist: "Arjit singh",
    image: "https://img.pagalworld.icu/Ae%20Dil%20Hai%20Mushkil%20Title%20Track-1587-hd.jpg",
    path: "https://hindi.pagalworld.icu/2016/Ae%20Dil%20Hai%20Mushkil%20-%20Deluxe%20Edition/Ae-Dil-Hai-Mushkil-Title-Track-(pagalworldsongs.co.in).mp3",
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


