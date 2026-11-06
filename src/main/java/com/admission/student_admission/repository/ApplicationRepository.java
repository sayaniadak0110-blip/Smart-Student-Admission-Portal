package com.admission.student_admission.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.admission.student_admission.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

}