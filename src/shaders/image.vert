#version 330 core

layout (location = 0) in vec2 quadPosn;
layout (location = 1) in vec2 imageCoords;

out vec2 texCoords;

uniform mat4 model;
uniform mat4 projection;

void main() {
    texCoords = imageCoords;
    gl_Position = projection * model * vec4(quadPosn, 0.0, 1.0);
}
