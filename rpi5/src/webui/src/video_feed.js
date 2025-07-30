export function init_video_feed() {
    window.video_frame = document.querySelector('.video-frame')
    window.video_frame.src = '/video_feed'
    window.video_frame.style = 'filter: brightness(1.0)'
    window.video_frame.addEventListener('error', async event => {
        await new Promise(resolve => setTimeout(resolve, 10000));
        console.debug('No video, reloading...')
        window.video_frame.src = '/video_feed'
    })
}