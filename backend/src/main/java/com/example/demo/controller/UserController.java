package com.example.demo.controller;
import com.example.demo.entity.Role;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/add")
    public User createUser(@RequestBody User user) {
        // Хэширование пароля
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role defaultRole = roleRepository.findByName("employee");
        user.setRole(defaultRole);
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
    @GetMapping("/details")
    public User getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        User user = userService.authenticateUser(email, password);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        String token = generateToken(user);

        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }

    private String generateToken(User user) {
        return ("userId=" + user.getId() + ", email=" + user.getEmail() + ", role=" + user.getRole().getName());
    }



    private String uploadDir = "C:/Users/Admin/Desktop/4 курс/Learning-Management-System-main/uploads/"; // Путь для сохранения

    @PostMapping("/{id}/uploadProfileImage")
    public ResponseEntity<?> uploadProfileImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            // Проверка, что файл не пустой
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("No file uploaded");
            }

            // Генерация уникального имени файла
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

            // Путь для сохранения файла в папку uploads (указан абсолютный путь)
            Path filePath = Paths.get(uploadDir + filename);

            // Создаем директории, если их нет
            Files.createDirectories(filePath.getParent());

            // Сохраняем файл на сервере
            file.transferTo(filePath.toFile());

            // Находим пользователя по ID
            User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

            // Обновляем путь к изображению профиля в базе данных
            user.setProfile_image("/uploads/" + filename);  // Это будет путь через веб-сервер
            userRepository.save(user);

            // Возвращаем успешный ответ с именем файла
            return ResponseEntity.ok().body(new HashMap<String, String>() {{
                put("filename", filename);
            }});
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Ошибка загрузки");
        }
    }

}