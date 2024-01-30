package com.bootcamp.students.controllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.bootcamp.students.models.Student;

import jakarta.annotation.PostConstruct;

@RestController
@CrossOrigin
public class StudentController {

    private List<Student> students = new ArrayList<>();

    @PostConstruct
    public void init() {
        
        Student student1 = new Student(1, "Student1", "student1@gmail.com", "(11) 1111-11111", 1, 1);
        Student student2 = new Student(2, "Student2", "student2@gmail.com", "(22) 2222-22222", 2, 2);
        Student student3 = new Student(3, "Student3", "student3@gmail.com", "(33) 3333-33333", 3, 3);

        students.add(student1);
        students.add(student2);
        students.add(student3);
    }

    @GetMapping("students")
    public List<Student> getStudents() {
        
        return students;
    }
    
    @GetMapping("students/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable int id) {

        Student student = students.stream()
                .filter(s -> s.getId() == id)
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        return ResponseEntity.ok(student);
    }

    @PostMapping("students")
    public ResponseEntity<Student> save(@RequestBody Student student) {
        
        student.setId(students.size() + 1);
        students.add(student);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(student.getId())
                .toUri();

        return ResponseEntity.created(location).body(student);
    }
}
