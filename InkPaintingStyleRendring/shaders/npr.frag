#version 330 core
out vec4 FragColor;

in vec3 WorldPos;
in vec3 Normal;

uniform vec3 lightPos;
uniform vec3 viewPos;

void main()
{
	vec3 Normal=normalize(Normal);	
	vec3 lightDir=normalize(lightPos-WorldPos); 
	vec3 viewDir=normalize(viewPos-WorldPos);	


	float NdotL=max(dot(lightDir,Normal),0);
	float factor=NdotL*4;
	vec3 result;

	if(factor>3.1)
	{
		result=vec3(0.1);
	}
	else if(factor>2.9)
	{
		float lerp=(factor-2.9)*5;
		result=(1-lerp)*vec3(0.4)+lerp*vec3(0.1);
	}
	else if(factor>2.1)
	{
		result=vec3(0.4);
	}
	else if(factor>1.9)
	{
		float lerp=(factor-1.9)*5;
		result=(1-lerp)*vec3(0.7)+lerp*vec3(0.4);
	}
	else if(factor>1.1)
	{
		result=vec3(0.7);
	}
	else if(factor>0.9)
	{
		float lerp=(factor-0.9)*5;
		result=(1-lerp)*vec3(1.0)+lerp*vec3(0.7);
	}
	else
	{
		result=vec3(1.0);
	}

	if(max(dot(Normal,viewDir),0)<0.35)
		FragColor=vec4(0.1,0.1,0.1,1.0);
	else
		FragColor=vec4(result,1.0);
}

