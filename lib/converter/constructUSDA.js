function constructUSDA(options = {}) {
  Object.assign(this, options);

  // glTF 2.0 uses lower left corner as origin
  // USD also user lower left corner as origin
  // [(0, 0), (1, 0), (1,1), (0, 1)]
  function createMapSection(fileName, filePath) {
    return `def Shader "${fileName}"
      {
        uniform token info:id = "UsdUVTexture"
        float4 inputs:default = (0, 0, 0, 1)
        asset inputs:file = @${filePath}@
        float2 inputs:st.connect = </Materials/StingrayPBS_0/Primvar.outputs:result>
        token inputs:wrapS = "repeat"
        token inputs:wrapT = "repeat"
        float3 outputs:rgb
      }`;
  }

  return `#usda 1.0
(
  endTimeCode = 200
  startTimeCode = 1
  timeCodesPerSecond = 24
  upAxis = "Y"
)

def Scope "Materials"
{

  def Material "StingrayPBS_0"
  {
    token inputs:frame:stPrimvarName = "Texture_uv"
    token outputs:displacement.connect = </Materials/StingrayPBS_0/pbrMat1.outputs:displacement>
    token outputs:surface.connect = </Materials/StingrayPBS_0/pbrMat1.outputs:surface>

    def Shader "pbrMat1"
    {
      uniform token info:id = "UsdPreviewSurface"
      float inputs:clearcoat = 0
      float inputs:clearcoatRoughness = 0
      color3f inputs:diffuseColor.connect = </Materials/StingrayPBS_0/color_map.outputs:rgb>
      float inputs:displacement = 0
      color3f inputs:emissiveColor.connect = </Materials/StingrayPBS_0/emissive_map.outputs:rgb>
      float inputs:ior = 1.5
      float inputs:metallic.connect = </Materials/StingrayPBS_0/metallic_map.outputs:r>
      normal3f inputs:normal.connect = </Materials/StingrayPBS_0/normal_map.outputs:rgb>
      float inputs:occlusion.connect = </Materials/StingrayPBS_0/ao_map.outputs:r>
      float inputs:opacity = 1
      float inputs:roughness.connect = </Materials/StingrayPBS_0/roughness_map.outputs:r>
      color3f inputs:specularColor = (1, 1, 1)
      int inputs:useSpecularWorkflow = 0
      token outputs:displacement
      token outputs:surface
    }

    def Shader "Primvar"
    {
      uniform token info:id = "UsdPrimvarReader_float2"
      float2 inputs:default = (0, 0)
      token inputs:varname.connect = </Materials/StingrayPBS_0.inputs:frame:stPrimvarName>
      float2 outputs:result
    }

    ${this.colorTexture ? createMapSection('color_map', this.colorTexture) : ''}

    ${this.emissiveTexture ? createMapSection('emissive_map', this.emissiveTexture) : ''}

    ${this.metallicTexture ? createMapSection('metallic_map', this.metallicTexture) : ''}

    ${this.normalTexture ? createMapSection('normal_map', this.normalTexture) : ''}

    ${this.aoTexture ? createMapSection('ao_map', this.aoTexture) : ''}

    ${this.roughnessTexture ? createMapSection('roughness_map', this.roughnessTexture) : ''}
  }
}
def "Mesh_0" (
  add references = @${this.objPath}@</model>
)
{
  rel material:binding = </Materials/StingrayPBS_0>
  float3 xformOp:scale = (${this.objScale})
  uniform token[] xformOpOrder = ["xformOp:scale"]
}`;
}

module.exports = constructUSDA;
