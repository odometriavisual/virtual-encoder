const VIDEO_URL = process.env.NODE_ENV === "production" ? "/video_feed" : "http://localhost:5000/video_feed";

async function retry_video() {
  window.video_frame.src = VIDEO_URL + "?t=" + new Date().getTime();
}

export function init_video_feed() {
  window.video_frame = document.querySelector(".video-frame");
  window.video_frame.style = "filter: brightness(1.0)";
  window.video_frame.src = VIDEO_URL;

  setInterval(retry_video, 3*1000);
}
