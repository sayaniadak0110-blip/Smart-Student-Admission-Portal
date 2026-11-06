package com.admission.student_admission.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.admission.student_admission.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}