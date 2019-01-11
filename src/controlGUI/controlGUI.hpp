#pragma once

#include <GLFW/glfw3.h>

class ControlGUI {
public:
    const char* glslVersion;

    ControlGUI(GLFWwindow* window);
    ~ControlGUI();
    void render();
    void destroy();
private:
    bool showDemoWindow;
};
