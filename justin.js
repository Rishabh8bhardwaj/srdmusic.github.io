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
    name: "Yummy",
    artist: "Justin Bieber",
    image: "https://songs6.vlcmusic.com/tiny_image/timthumb.php?q=100&w=250&src=images/24873.png",
    path: "https://songs6.vlcmusic.com/download.php?track_id=24873&format=320"
  },
{
    name: "Stuck with you",
    artist: "Justin Bieber",
    image: "https://songs6.vlcmusic.com/tiny_image/timthumb.php?q=100&w=250&src=images/27790.png",
    path: "https://songs6.vlcmusic.com/download.php?track_id=27790&format=320"
  },
{
    name: "Monster",
    artist: "Justin Bieber",
    image: "https://songs6.vlcmusic.com/tiny_image/timthumb.php?q=100&w=250&src=images/33734.png",
    path: "https://songs6.vlcmusic.com/download.php?track_id=33734&format=320"
  },
{
    name: "Peaches",
    artist: "Justin Bieber",
    image: "https://songs6.vlcmusic.com/tiny_image/timthumb.php?q=100&w=250&src=images/36742.png",
    path: "https://songs6.vlcmusic.com/download.php?track_id=36742&format=320"
  },
{
    name: "Sorry",
    artist: "Justin Bieber",
    image: "https://naasongslyrics.com/wp-content/uploads/2020/12/Sorry-300x225.jpg",
    path: "https://naasongs.vip/myuploads/uploads/English%20Songs/Sorry.mp3"
  },
{
    name: "No Sense",
    artist: "Justin Bieber",
    image: "https://naasongslyrics.com/wp-content/uploads/2021/01/nonsense-300x225.jpg",
    path: "https://naasongs.vip/myuploads/uploads/English%20Songs/Justin%20Bieber-%20No%20Sense.mp3"
  },
{
    name: "Let Me Love You",
    artist: "Justin Bieber",
    image: "https://1.bp.blogspot.com/-tb2peB_LB30/XViUg2myiWI/AAAAAAAABB8/GlpF-qJUNi4qbSkbuabnzx2rGESOUtFuwCLcBGAs/s1600/let%2Bme%2Blove%2Byou.jpg",
    path: "https://paglasongs.com/files/download/type/320/id/3537"
  },
{
    name: "Stay",
    artist: "Justin Bieber",
    image: "https://paglasongs.com/uploads/thumb/sft8/3510_4.jpg",
    path: "https://paglasongs.com/files/download/type/320/id/3510"
  },
{
    name: "Baby",
    artist: "Justin Bieber",
    image: "https://paglasongs.com/uploads/thumb/sft6/2576_4.jpg",
    path: "https://paglasongs.com/files/download/type/320/id/2576"
  },
{
    name: "Intentions",
    artist: "Justin Bieber",
    image: "https://paglasongs.com/uploads/thumb/sft2/719_4.jpg",
    path: "https://paglasongs.com/files/download/type/320/id/719"
  },
{
    name: "What Do You Mean",
    artist: "Justin Bieber",
    image: "https://dl.mr-jatt1.com/siteuploads/thumb/c/3176_5.jpg",
    path: "https://dl.mr-jatt1.com/siteuploads/files/sfd16/7690/What%20Do%20You%20Mean(Mr-Jatt1.com).mp3"
  },
{
    name: "I'm the one",
    artist: "Justin Bieber",
    image: "https://dl.mr-jatt1.com/siteuploads/thumb/c/708_5.jpg",
    path: "https://dl.mr-jatt1.com/siteuploads/files/sfd3/1404/I'm%20the%20One(Mr-Jatt1.com).mp3"
  },
{
    name: "Coldwater",
    artist: "Justin Bieber",
    image: "https://dl.mr-jatt1.com/siteuploads/thumb/c/2664_5.jpg",
    path: "https://dl.mr-jatt1.com/siteuploads/files/sfd14/6655/Cold%20Water(Mr-Jatt1.com).mp3"
  },
{
    name: "Ghost",
    artist: "Justin Bieber",
    image: "https://dl.mr-jatt1.com/siteuploads/thumb/c/2851_5.jpg",
    path: "https://dl.mr-jatt1.com/siteuploads/files/sfd15/7093/Ghost(Mr-Jatt1.com).mp3"
  },
{
    name: "Holy",
    artist: "Justin Bieber",
    image: "https://dl.mr-jatt1.com/siteuploads/thumb/c/2855_5.jpg",
    path: "https://dl.mr-jatt1.com/siteuploads/files/sfd15/7097/Holy(Mr-Jatt1.com).mp3"
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


