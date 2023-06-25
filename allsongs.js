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
{
  name: "Alone",
  artist: "Alan walker",
  image: "https://olagist.net/wp-content/uploads/2018/02/Alan-Walker-Alone-Mp3-Image.jpg",
  path: "https://olagist.net/wp-content/uploads/2018/02/Alan_Walker_-_Alone_Olagist.co_.mp3"
},
{
  name: "The walker unity",
  artist: "alan walker",
  image: "https://olagist.net/wp-content/uploads/2019/07/music-alan-walker-the-walkers-unity-art.jpg",
  path: "https://olagist.net/wp-content/uploads/2019/07/Alan_Walker_The_Walkers_-_Unity.mp3"
},
{
  name: "Faded",
  artist: "Alan walker",
  image: "https://olagist.net/wp-content/uploads/2018/01/Alan-Walker-Faded-640x640.jpg",
  path: "https://olagist.net/wp-content/uploads/2018/01/Alan_Walker_-_Faded_Olagist.co_.mp3",
},
{
  name: "Sing me to sleep",
  artist: "Alan walker",
  image: "https://olagist.net/wp-content/uploads/2018/02/Alan-Walker-Sing-Me-To-Sleep.jpg",
  path: "https://olagist.net/wp-content/uploads/2018/02/Alan_Walker_-_Sing_Me_To_Sleep_Olagist.co_.mp3",
},
{
  name: "Spectre",
  artist: "Alan walker",
  image: "https://olagist.net/wp-content/uploads/2018/02/alan-walker-spectre.jpg",
  path: "https://olagist.net/wp-content/uploads/2018/02/Alan_Walker_-_The_Spectre_Olagist.co_.mp3",
}, {
  name: "Live fast",
  artist: "Alan walker",
  image: "https://olagist.net/wp-content/uploads/2019/07/alan-walker-ft-asap-rocky-live-fast.jpg",
  path: "https://olagist.net/wp-content/uploads/2019/07/Alan_Walker_ASAP_Rocky_-_Live_Fast.mp3",
}, {
  name: "All fall down",
  artist: "Alan walker",
  image: "https://olagist.net/wp-content/uploads/2018/02/Alan-Walker-All-Falls-Down.jpg",
  path: "https://olagist.net/wp-content/uploads/2018/02/Alan_Walker_Ft_Noah_Cyrus_-_All_Falls_Down_Olagist.co_.mp3",
}, {
  name: "Tired",
  artist: "Alan walker",
  image: "https://olagist.net/wp-content/uploads/2018/02/Alan-Walker-Tired.jpg",
  path: "https://olagist.net/wp-content/uploads/2018/02/Alan_Walker_ft_Gavin_James_-_Tired_Olagist.co_.mp3",
}, {
  name: "On My Way",
  artist: "Alan walker",
  image: "https://olagist.net/wp-content/uploads/2019/03/alan-walker-on-my-way.jpg",
  path: "https://olagist.net/wp-content/uploads/2019/03/Alan_Walker_Ft_Sabrina_Carpenter_Farruko_-_On_My_Way.mp3",
},
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


