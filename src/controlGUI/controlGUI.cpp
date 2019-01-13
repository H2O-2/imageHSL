#include "controlGUI.hpp"
#include "imgui/imgui.h"
#include "imgui/imgui_impl_glfw.h"
#include "imgui/imgui_impl_opengl3.h"

ControlGUI::ControlGUI(GLFWwindow* window) : glslVersion("#version 330"), showDemoWindow(false) {
    IMGUI_CHECKVERSION();
    ImGui::CreateContext();
    ImGuiIO& io = ImGui::GetIO();

    ImGui::StyleColorsDark();

    ImGui_ImplGlfw_InitForOpenGL(window, true);
    ImGui_ImplOpenGL3_Init(glslVersion);
}

ControlGUI::~ControlGUI() {
    ImGui_ImplOpenGL3_Shutdown();
    ImGui_ImplGlfw_Shutdown();
    ImGui::DestroyContext();
}

void ControlGUI::render(int *hue, int *sat, int *light) {
    ImGui_ImplOpenGL3_NewFrame();
    ImGui_ImplGlfw_NewFrame();
    ImGui::NewFrame();

    ImGui::Begin("HSL Control");
    ImGui::SliderInt("Hue", hue, -180, 180);
    ImGui::SliderInt("Saturation", sat, -100, 100);
    ImGui::SliderInt("Lightness", light, -100, 100);
    ImGui::End();

    ImGui::Render();
    ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());
}
