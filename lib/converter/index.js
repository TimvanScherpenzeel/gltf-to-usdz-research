// Arguments
const { scale } = require('./../argsHandler');

// Converter
const constructOBJ = require('./constructOBJ');
const constructUSDA = require('./constructUSDA');
const handleTextures = require('./handleTextures');
const parseGLTF = require('./parseGLTF');

function convert(gltf) {
  return parseGLTF(gltf)
    .then((parsedGLTF) => {
      // Extract and write to disk all textures from the glTF file
      const textures = handleTextures(parsedGLTF.textures);

      // Construct and write to disk .obj file
      const objData = constructOBJ(parsedGLTF.meshes);

      return Promise.all([textures, objData]);
    })
    .then(([textures, objData]) => {
      const {
        baseColorTexture,
        emissiveTexture,
        occlusionTexture,
        normalTexture,
        metallicTexture,
        roughnessTexture,
      } = textures;

      const { objPath } = objData;

      const usdaData = constructUSDA({
        objPath: `${objPath}`,
        objScale: `${scale}, ${scale}, ${scale}`,
        colorTexture: baseColorTexture,
        emissiveTexture,
        metallicTexture,
        normalTexture,
        aoTexture: occlusionTexture,
        roughnessTexture,
      });

      return usdaData;
    });
}

module.exports = convert;
