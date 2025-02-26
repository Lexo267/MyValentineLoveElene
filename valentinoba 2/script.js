const songs = [
    { src: "./you fell in love.  a playlist.mp3", title: "you fell in love" },
    { src: "./Ed Sheeran - Perfect (Official Music Video).mp3", title: "Ed Sheeran - Perfect" },
    { src: "./Ed Sheeran - Thinking Out Loud (Official Music Video).mp3", title: "Ed Sheeran - Thinking Out Loud" }
];

let currentSongIndex = 0;
const backgroundMusic = document.getElementById('backgroundMusic');
const playPauseButton = document.getElementById('playPauseButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const currentSongDisplay = document.getElementById('currentSong');
const progressBar = document.getElementById('progressBar');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const volumeControl = document.getElementById('volumeControl');
const songTitle = document.getElementById('songTitle');

// მუსიკის დაკვრა/პაუზა
playPauseButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        playPauseButton.textContent = "⏸️";
    } else {
        backgroundMusic.pause();
        playPauseButton.textContent = "▶️";
    }
});

// წინა მუსიკაზე გადასვლა
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

// შემდეგ მუსიკაზე გადასვლა
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

// მუსიკის ჩატვირთვა
function loadSong(index) {
    backgroundMusic.src = songs[index].src;
    backgroundMusic.play();
    playPauseButton.textContent = "⏸️";
    currentSongDisplay.textContent = `მუსიკა: ${index + 1}/${songs.length}`;
    songTitle.textContent = songs[index].title;
}

// პროგრესის ზოლის განახლება
backgroundMusic.addEventListener('timeupdate', () => {
    const progress = (backgroundMusic.currentTime / backgroundMusic.duration) * 100;
    progressBar.value = progress;
    currentTime.textContent = formatTime(backgroundMusic.currentTime);
});

// მუსიკის ხანგრძლივობის ჩვენება
backgroundMusic.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(backgroundMusic.duration);
});

// პროგრესის ზოლით მუსიკის გადახვევა
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * backgroundMusic.duration;
    backgroundMusic.currentTime = seekTime;
});

// მოცულობის კონტროლი
volumeControl.addEventListener('input', () => {
    backgroundMusic.volume = volumeControl.value;
});

// დროის ფორმატირება (წუთები:წამები)
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// კლავიატურის ისრებით კონტროლი
document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowLeft") {
        prevButton.click(); // წინა მუსიკა
    } else if (event.key === "ArrowRight") {
        nextButton.click(); // შემდეგი მუსიკა
    } else if (event.key === " ") {
        playPauseButton.click(); // დაკვრა/პაუზა (Space)
    }
});

// დავიწყოთ პირველი მუსიკა
loadSong(currentSongIndex);