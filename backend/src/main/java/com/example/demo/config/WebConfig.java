package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Указываем путь для статических ресурсов
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:/C:/Users/Admin/Desktop/4 курс/Learning-Management-System-main/uploads/");
    }
}

