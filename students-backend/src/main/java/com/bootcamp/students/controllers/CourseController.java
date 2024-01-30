package com.bootcamp.students.controllers;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.students.models.Course;

@RestController
@CrossOrigin
public class CourseController {
    
    private List<Course> courses = Arrays.asList(new Course(1, "Angular"), 
                                                 new Course(2, "Java"), 
                                                 new Course(3, "Spring")
    );

    @GetMapping("courses")
    public List<Course> getCourses() {
        
        return courses;
    }
}
