export default function videoUrlToEmbedUrl(videoUrl) {

	const type = videoUrl.match(/(vimeo|youtube)/)[0];

	if (type === 'vimeo') return videoUrl.replace('https://vimeo.com/', 'https://player.vimeo.com/video/');
	if (type === 'youtube') return videoUrl.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
}