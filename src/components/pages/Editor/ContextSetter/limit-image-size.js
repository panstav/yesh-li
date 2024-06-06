export default async function limitImageSize(file, maxSize, quality = 0.8) {
	// https://gist.githubusercontent.com/mvneerven/f69f84fbfa60c78d05a216b76b44c8a3/raw/7335e59032cebe24c87da1de228b7f605844f47c/resize-image.js
	return new Promise((resolve) => {
		const img = new Image();
		const url = URL.createObjectURL(file);
		img.src = url;
		img.onerror = function () {
			URL.revokeObjectURL(this.src);
		};

		img.onload = function () {
			if (img.width <= maxSize && img.height <= maxSize) return getBase64(file).then((base64) => resolve({ base64, width: img.width, height: img.height }));
			URL.revokeObjectURL(this.src);
			const [newWidth, newHeight] = calculateSize();
			const canvas = document.createElement("canvas");
			canvas.width = newWidth;
			canvas.height = newHeight;
			const ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, newWidth, newHeight);

			const resultUrl = canvas.toDataURL(file.type, quality), result = {
				url: resultUrl,
				contentType: resultUrl.match(/^data:([^;]+);base64,/im)[1] || "",
				b64: resultUrl.replace(/^data:([^;]+);base64,/gim, "")
			};

			canvas.toBlob(
				(blob) => {
					result.size = blob.size;
					resolve({ base64: result.b64, width: newWidth, height: newHeight });
				},
				file.type,
				quality
			);
		};

		function calculateSize() {
			let w = img.width, h = img.height;
			if (w > h) {
				if (w > maxSize) {
					h = Math.round((h * maxSize) / w);
					w = maxSize;
				}
			} else {
				if (h > maxSize) {
					w = Math.round((w * maxSize) / h);
					h = maxSize;
				}
			}
			return [w, h];
		}

		function getBase64(file) {
			return new Promise((resolve, reject) => {
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(/base64,(.*)/.exec(reader.result)[1]);
				reader.onerror = reject;
			});
		}

	});
}