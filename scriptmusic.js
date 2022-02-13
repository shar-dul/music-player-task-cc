let now_playing=document.querySelector('.now_playing');
let track_art=document.querySelector('.track-cover');
let track_name=document.querySelector('.track-name');
let track_artist=document.querySelector('.track-artist');
let playpause_btn=document.querySelector('.playpause-track');
let next_btn=document.querySelector('.next-track');
let prev_btn=document.querySelector('.prev-track');

let seek_slider=document.querySelector('.seek_slider');
let volume_slider=document.querySelector('.volume_slider');
let curr_time=document.querySelector('.current-time');
let total_duration=document.querySelector('.total-duration');
let randomIcon=document.querySelector('.fa-random');
let curr_track=document.createElement('audio');
let track_index=0;
let isPlaying=false;
let isRandom=false;
let updateTimer;

const music_list = [
    {
        name: "Hold On (shar_dul_ remix)",
        music: "songs/HoldOn(shar_dul_remix).mp3",
        artist: 'Chord Overstreet, shar_dul_',
        image: "pics/holdonremix.png"
    },
    {
        name: 'Need You Now (edit by shar_dul_)',
        music: "songs/Need you now (shar_dul_ remix).mp3",
        artist: 'Armin van Buuren, shar_dul_',
        image: "pics/needyounow.png"
    },
    {
        name: 'Dreaming',
        music: "songs/Dreaming - shar_dul_ .mp3",
        artist: 'shar_dul_',
        image: "pics/dreaming.png"
    },
    {
        name: 'Melody',
        music: "songs/Melody- shar_dul_ .mp3",
        artist: 'shar_dul_',
        image: "pics/melody.png"
    },
    {
        name: 'Jaan Nisaar x Can We Kiss Forever? (shar_dul_ mashup)',
        music: "songs/jaan x forever.mp3",
        artist: 'Arijit Singh, Kina, shar_dul_',
        image: "pics/jaanxforever.png"
    },
    {
        name: 'All of Me (shar_dul_ remix)',
        music: "songs/All of me (shar_dul_ remix).mp3",
        artist: 'John Legend, shar_dul_',
        image: "pics/allofme.png"
    },
    {
        name: 'Somebody Else Instead (shar_dul_ remix)',
        music: "songs/somebody else instead (shar_dul_ remix).wav",
        artist: 'Mark Sixma, Jordan Shaw, shar_dul_',
        image: "pics/seiremix.png"
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    curr_track.src = music_list[track_index].music;
    curr_track.load();
    track_art.style.backgroundImage="url("+ music_list[track_index].image +")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    updateTimer=setInterval(setUpdate, 1000)
    curr_track.addEventListener('ended', nextTrack);
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom=true;
    randomIcon.classList.add('randomActive');    
}
function pauseRandom(){
    isRandom=false;
    randomIcon.classList.remove('randomActive')
}
function repeatTrack(){
    let current_index=track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying=true;
    playpause_btn.innerHTML='<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying=false;
    track_art.classList.remove();
    playpause_btn.innerHTML='<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index+=1;
    }else if(track_index < music_list.length -1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = 0;
    }else{
        track_index=0;
    }
    loadTrack(track_index);
    playTrack();
}   
function prevTrack(){
    if(track_index > 0){
        track_index-=1;
    }else{
        track_index = music_list.length-1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime/60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes*60);
        let durationMinutes = Math.floor(curr_track.duration/60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes*60);

        if (currentSeconds < 10) {currentSeconds = "0" + currentSeconds;}
        if (durationSeconds < 10) {durationSeconds = "0" +durationSeconds;}
        if (currentMinutes < 10) {currentMinutes = "0" + currentMinutes;}
        if (durationMinutes < 10) {durationMinutes = "0" + durationMinutes;}

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}