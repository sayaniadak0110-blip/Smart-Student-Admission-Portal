package com.admission.student_admission.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.admission.student_admission.entity.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {

}