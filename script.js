const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
let isPlaying = false;
let currentSongIndex = 0;

// Music
const songs = [
    {
        name: 'mirel-1',
        displayName: 'Euphonic Vibes',
        artist: 'LunaNova'
    },
    {
        name: 'mirel-2',
        displayName: 'Melodic Dreamscape',
        artist: 'EchoVerse'
    },
    {
        name: 'mirel-3',
        displayName: 'Rhythmic Reveire',
        artist: 'Solaris Beats'
    },
    {
        name: 'mirel-4',
        displayName: 'Sonic Serenity',
        artist: 'Aurora Soundscapes'
    },
    {
        name: 'mirel-5',
        displayName: 'Harmony Haven',
        artist: 'Midnight Muse'
    },
]


function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('Title', 'Pause')
    music.play()
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('Title', 'Play')
    music.pause()
}

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

loadSong(songs[currentSongIndex])

function prevSong() {
   currentSongIndex--;
   if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
   }
   loadSong(songs[currentSongIndex])
   playSong()
}

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
       }
    loadSong(songs[currentSongIndex])
    playSong()
 }

function updateProgressBar(e) {
   if(isPlaying) {
     const {duration, currentTime} = e.srcElement;
    //  update progress bar width
     const progressProcent = (currentTime / duration) * 100;
     progress.style.width = `${progressProcent}%`
    // calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`
    }
    // delay switching duration element to avoid NaN
    if(durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
     }
    //  Calculate display for current
     const currentMinutes = Math.floor(currentTime / 60);
     let currentSeconds = Math.floor(currentTime % 60);
     if(currentSeconds < 10) {
         currentSeconds = `0${currentSeconds}`
     }
     currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
   }
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateProgressBar)