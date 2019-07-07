#version 330 core
layout (location = 0) out vec3 FragColor;
layout (location = 1) out vec3 depthTex;

in vec3 WorldPos;
in vec3 Normal;
in vec2 TexCoords;

uniform vec3 lightPos;
uniform vec3 viewPos;

uniform float near=0.1f;
uniform float far=100.0f;

uniform sampler2D strokes[6];

float LinearizeDepth(float depth) 
{
    float z = depth * 2.0 - 1.0;
    return (2.0 * near * far) / (far + near - z * (far - near));    
}
void main()
{
	vec3 Normal=normalize(Normal);
	vec3 lightDir=normalize(lightPos-WorldPos); 
	vec3 viewDir=normalize(viewPos-WorldPos); 
	float NdotL=max(dot(lightDir,Normal),0);
	float NdotV=max(dot(viewDir,Normal),0);
	
	float factor=(NdotL*(3.0f/4.0f)+NdotV/4.0f)*7.0f;

	if(factor>6.5f)
	{
		FragColor=vec3(1.0,1.0,1.0);
	}
	else if(factor>5.0f)
	{
		float temp=factor-5.0f;
		FragColor=(1-temp)*texture(strokes[0],TexCoords).rgb+temp*vec3(1.0,1.0,1.0);
	}
	else if(factor>4.0f)
	{
		float temp=factor-4.0f;
		FragColor=(1-temp)*texture(strokes[1],TexCoords).rgb+temp*texture(strokes[0],TexCoords).rgb;
	}
	else if(factor>3.0f)
	{
		float temp=factor-3.0f;
		FragColor=(1-temp)*texture(strokes[2],TexCoords).rgb+temp*texture(strokes[1],TexCoords).rgb;
	}
	else if(factor>2.0f)
	{
		float temp=factor-2.0f;
		FragColor=(1-temp)*texture(strokes[3],TexCoords).rgb+temp*texture(strokes[2],TexCoords).rgb;
	}
	else if(factor>1.0f)
	{
		float temp=factor-1.0f;
		FragColor=(1-temp)*texture(strokes[4],TexCoords).rgb+temp*texture(strokes[3],TexCoords).rgb;
	}
	else{
	FragColor=(1-factor)*texture(strokes[5],TexCoords).rgb+factor*texture(strokes[4],TexCoords).rgb;
	}
	float depth = LinearizeDepth(gl_FragCoord.z); 
	depthTex=vec3(depth);//

}

