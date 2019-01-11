#version 330 core

in vec2 texCoords;

out vec4 fragColor;

uniform sampler2D image;

void main() {
    fragColor = texture(image, texCoords);
    float avg = (fragColor.r + fragColor.g + fragColor.b) / 3;
    float a = 0.5;
    // fragColor = vec4(a * fragColor.r + (1-a) * avg, a * fragColor.g + (1-a) * avg, a * fragColor.b + (1-a) * avg, 1.0);
    float lightness = 1.8;
    fragColor = lightness < 1.0 ? lightness * fragColor : (lightness - 1.0) * vec4(1.0) + (2.0 - lightness) * fragColor;
}
