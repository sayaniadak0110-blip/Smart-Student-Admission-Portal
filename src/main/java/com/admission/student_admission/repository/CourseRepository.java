package com.admission.student_admission.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.admission.student_admission.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}