const captureBtn = document.getElementById("capture_btn"),
  overlay = document.querySelector(".overlay"),
  overlayImg = document.querySelector(".overlay img"),
  btnClose = overlay.querySelector("i");

const scrennshoot = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true,
    });
    const video = document.createElement("video");

    video.addEventListener("loadedmetadata", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      video.play();

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      stream.getVideoTracks()[0].stop();

      overlayImg.src = canvas.toDataURL();
      overlay.classList.add("show");
    });

    video.srcObject = stream;
  } catch (error) {
    alert("Fealure To Scrennshoot Tab!");
  }
};

btnClose.addEventListener("click", () => overlay.classList.remove("show"));
captureBtn.addEventListener("click", scrennshoot);
