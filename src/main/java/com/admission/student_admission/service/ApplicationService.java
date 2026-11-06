package com.admission.student_admission.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.admission.student_admission.entity.Application;
import com.admission.student_admission.repository.ApplicationRepository;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final NotificationService notificationService;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            NotificationService notificationService) {

        this.applicationRepository = applicationRepository;
        this.notificationService = notificationService;
    }

    public Application createApplication(Application application) {

        if (application.getStatus() == null
                || application.getStatus().isBlank()) {

            application.setStatus("PENDING");
        }

        if (application.getAppliedAt() == null) {
            application.setAppliedAt(LocalDateTime.now());
        }

        if (application.getApplicationNumber() == null
                || application.getApplicationNumber().isBlank()) {

            long count = applicationRepository.count() + 1;

            application.setApplicationNumber(
                    String.format("APP%03d", count)
            );
        }

        Application savedApplication =
                applicationRepository.save(application);

        // Create notification after application submission
            String message =
                    "Your application "
                    + savedApplication.getApplicationNumber()
                    + " has been submitted successfully.";

            notificationService.createNotification(
                    savedApplication,
                    message
            );

        return savedApplication;
    }

    public List<Application> getAllApplications() {

        return applicationRepository.findAll();
    }

    public Application getApplicationById(Long id) {

        return applicationRepository
                .findById(id)
                .orElse(null);
    }

    public Application updateApplication(
            Application application) {

        return applicationRepository.save(application);
    }

    public Application updateApplicationStatus(
            Long id,
            String status) {

        Application application =
                applicationRepository
                        .findById(id)
                        .orElse(null);

        if (application == null) {
            return null;
        }

        application.setStatus(status);

        Application updatedApplication =
                applicationRepository.save(application);

        if (application.getStudent() != null) {

            String message =
                    "Your application "
                    + application.getApplicationNumber()
                    + " has been "
                    + status;

            notificationService.createNotification(
                    application,
                    message
            );
        }

        return updatedApplication;
    }

    public void deleteApplication(Long id) {

        applicationRepository.deleteById(id);
    }
}