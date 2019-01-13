#version 330 core

in vec2 texCoords;

out vec4 fragColor;

uniform sampler2D image;
uniform int deltaHue;
uniform float deltaSaturation;
uniform float deltaLightness;

void main() {
    fragColor = texture(image, texCoords);
    // float avg = (fragColor.r + fragColor.g + fragColor.b) / 3;
    // float a = 0;
    // fragColor = vec4(a * fragColor.r + (1-a) * avg, a * fragColor.g + (1-a) * avg, a * fragColor.b + (1-a) * avg, 1.0);
    // float l = 1.8;
    // fragColor = l < 1.0 ? l * fragColor : (l - 1.0) * vec4(1.0) + (2.0 - l) * fragColor;

    // RGB to HSL
    float cMax = max(max(fragColor.r, fragColor.g), fragColor.b);
    float cMin = min(min(fragColor.r, fragColor.g), fragColor.b);
    float chroma = cMax - cMin;

    // https://stackoverflow.com/a/39147465
    float hue = 0; // Hue in the range of 0 to 360 degrees
    if (chroma > 0) {
        if (cMax == fragColor.r) {
            hue = 60 * ((fragColor.g - fragColor.b) / chroma);
        } else if (cMax == fragColor.g) {
            hue = 60 * ((fragColor.b - fragColor.r) / chroma + 2);
        } else {
            hue = 60 * ((fragColor.r - fragColor.g) / chroma + 4);
        }
    }

    float lightness = (cMax + cMin) / 2; // Lightiness in the range of 0 to 1;

    float saturation = 0;
    if (cMax == 0 || cMin == 1) {
        saturation = 0;
    } else {
        saturation = (cMax - lightness) / min(lightness, 1 - lightness);
    }


    // Modify hue and (possibly) saturation values
    hue += deltaHue;
    if (hue < 0) {
        hue += 360;
    } else if (hue > 360) {
        hue -= 360;
    }

    // Solely for over saturation modification
    if (deltaSaturation >= 0) {
        saturation += deltaSaturation;
    }
    if (saturation < 0 || (fragColor.r == fragColor.g && fragColor.g == fragColor.b)) {
        saturation = 0;
    } else if (saturation > 1) {
        saturation = 1;
    }

    // HSL to RGB
    vec3 rgb = vec3(0.0);
    if (saturation == 0) {
        rgb = vec3(lightness);
        fragColor = vec4(rgb, 1.0);
    } else {
        chroma = (1 - abs(2 * lightness - 1)) * saturation;
        float x = chroma * (1 - abs(mod((hue / 60), 2) - 1));
        if (hue <= 60) {
            rgb = vec3(chroma, x, 0);
        } else if (hue <= 120) {
            rgb = vec3(x, chroma, 0);
        } else if (hue <= 180) {
            rgb = vec3(0, chroma, x);
        } else if (hue <= 240) {
            rgb = vec3(0, x, chroma);
        } else if (hue <= 300) {
            rgb = vec3(x, 0, chroma);
        } else {
            rgb = vec3(chroma, 0, x);
        }

        float m = lightness - chroma / 2;
        rgb += m;
    }

    // Modify saturation by computing the luma if we are desaturating the image
    // Referenced from https://stackoverflow.com/a/20820649
    if (deltaSaturation < 0) {
        float L = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
        rgb = vec3(rgb.r + (-deltaSaturation * (L - rgb.r)), rgb.g + (-deltaSaturation * (L - rgb.g)), rgb.b + (-deltaSaturation * (L - rgb.b)));
    }

    // Modify lightness
    rgb = deltaLightness < 1.0 ? deltaLightness * rgb : (deltaLightness - 1.0) * vec3(1.0) + (2.0 - deltaLightness) * rgb;
    fragColor = vec4(rgb, 1.0);
}
