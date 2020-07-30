const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //time display
  const timeDisplay = document.querySelector(".time-display");
  //time select
  const timeSelect = document.querySelectorAll(".time-select button");
  //play button outline length
  const outlineLength = outline.getTotalLength();
  //duration
  let defaultDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //choose song
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      isPlaying(song);
    });
  });

  //play sound section
  play.addEventListener("click", () => {
    isPlaying(song);
  });

  //choose song duration
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      defaultDuration = this.getAttribute("data-time");
      console.log(defaultDuration);
      timeDisplay.textContent = `${Math.floor(defaultDuration / 60)}:${
        Math.floor(defaultDuration % 60) + "" + 0
      }`;
    });
  });

  //play song function
  const isPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  //animate circle outline
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsedTime = defaultDuration - currentTime;
    let seconds = Math.floor(elapsedTime % 60);
    let minutes = Math.floor(elapsedTime / 60);

    //animate circle
    let progress =
      outlineLength - (currentTime / defaultDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //animate time display
    timeDisplay.textContent = `${minutes}:${seconds}`;

    //if duration is stop
    if (currentTime >= defaultDuration) {
      song.pause();
      video.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
    }
  };
};

app();
