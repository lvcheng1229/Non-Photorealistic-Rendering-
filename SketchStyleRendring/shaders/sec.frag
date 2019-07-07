#version 330 core

in vec2 TexCoords;
out vec4 FragColor;
uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
uniform sampler2D paperTex;

void main()
{
	vec3 result=texture(colorTexture,TexCoords).rgb;
	
	if(texture(depthTexture,TexCoords).r<0.8)
		result=texture(paperTex,TexCoords).rgb;;

	for(int i=-3;i<3;i++)
	{
		for(int j=-3;j<3;j++)
		{
			vec2 texSample=vec2(TexCoords.x+i/4000.0f,TexCoords.y+j/4000.0f);
			if(abs(texture(depthTexture,TexCoords).r-texture(depthTexture,texSample).r)>0.01)
				result=vec3(0.0,0.0,0.0);
		}
	}
	FragColor=vec4(result,1.0);
}
