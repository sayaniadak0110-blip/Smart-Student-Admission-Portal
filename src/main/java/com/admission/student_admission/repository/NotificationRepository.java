package com.admission.student_admission.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.admission.student_admission.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}