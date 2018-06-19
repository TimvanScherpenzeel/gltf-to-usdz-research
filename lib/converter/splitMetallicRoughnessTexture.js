function handleTextures(metallicRoughnessTexture) {
	return new Promise((resolve, reject) => {
		console.log(metallicRoughnessTexture);

		resolve({
			metallicTexture: 'example',
			roughnessTexture: 'example',
		});
	});
}

module.exports = handleTextures;
