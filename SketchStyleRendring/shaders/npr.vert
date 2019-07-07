#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec2 aTexCoords;
layout (location = 2) in vec3 aNormal;

out vec3 WorldPos;
out vec3 Normal;
out vec2 TexCoords;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

uniform bool isFront;
void main()
{
	TexCoords=aTexCoords;

	Normal=mat3(transpose(inverse(model)))*aNormal;
	WorldPos=vec3(model*vec4(aPos,1.0));

    gl_Position =  projection * view * vec4(WorldPos, 1.0);
	
}