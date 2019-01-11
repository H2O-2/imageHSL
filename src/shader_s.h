#ifndef SHADER_S_H
#define SHADER_S_H

#include <glad/glad.h>
#include <string>
#include <fstream>
#include <sstream>
#include <iostream>
#include <string>

#include <glm/gtc/type_ptr.hpp>
#include <glm/glm.hpp>

using std::string;

class Shader {
public:
    unsigned int shaderProgram;

    Shader();
    Shader(const GLchar* vertexPath, const GLchar* fragmentPath, const GLchar* geometryPath = nullptr);
    void use();
    void setBool(const string &name, bool value) const;
    void setInt(const string &name, int value) const;
    void setFloat(const string &name, float value) const;
    void setVec2(const string &name, const glm::vec2 &value) const;
    void setVec2(const string &name, float x, float y) const;
    void setVec3(const std::string &name, const glm::vec3 &value) const;
    void setVec3(const std::string &name, float x, float y, float z) const;
    void setVec4(const std::string &name, const glm::vec4 &value) const;
    void setVec4(const std::string &name, float x, float y, float z, float w) const;
    void setMat2(const std::string &name, const glm::mat2 &mat) const;
    void setMat3(const std::string &name, const glm::mat3 &mat) const;
    void setMat4(const std::string &name, const glm::mat4 &mat) const;
private:
    void checkCompileErrors(unsigned int shader, string type);
    void debug(const string s) const;
};

#endif
