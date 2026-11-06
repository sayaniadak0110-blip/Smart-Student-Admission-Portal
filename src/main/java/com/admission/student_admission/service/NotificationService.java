package com.admission.student_admission.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.admission.student_admission.entity.Application;
import com.admission.student_admission.entity.Notification;
import com.admission.student_admission.repository.NotificationRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    // Create notification directly from Notification object
    public Notification createNotification(Notification notification) {

        if (notification.getCreatedAt() == null) {
            notification.setCreatedAt(LocalDateTime.now());
        }

        return notificationRepository.save(notification);
    }

    // Create notification automatically when application status changes
    public Notification createNotification(Application application, String message) {

        Notification notification = new Notification();

        notification.setUser(application.getStudent());
        notification.setMessage(message);
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        return notificationRepository.save(notification);
    }

    // Get all notifications
    public List<Notification> getAllNotifications() {

        return notificationRepository.findAll();
    }

    // Get notification by ID
    public Notification getNotificationById(Long id) {

        return notificationRepository.findById(id).orElse(null);
    }
}