#version 330 core
out vec4 FragColor;
in vec2 TexCoords;

uniform sampler2D paperTex;
void main()
{
	FragColor=vec4(vec3(texture(paperTex,TexCoords).rgb),1.0);
}