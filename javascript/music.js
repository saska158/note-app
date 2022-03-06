const soundButton = document.querySelector('#sound-button');
const audio = document.querySelector('#audio');

soundButton.addEventListener('click', event => {
    if(audio.paused) {
        audio.play()
        soundButton.src = 'img/sound.png'
    }    
    else {
        audio.pause()
        soundButton.src = 'img/nosound.png'
    }
})