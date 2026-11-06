package com.admission.student_admission.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admission.student_admission.entity.Application;
import com.admission.student_admission.service.ApplicationService;

@RestController
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // Create application
    @PostMapping
    public ResponseEntity<Application> createApplication(
            @RequestBody Application application) {

        return ResponseEntity.ok(
                applicationService.createApplication(application)
        );
    }

    // Get all applications
    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {

        return ResponseEntity.ok(
                applicationService.getAllApplications()
        );
    }

    // Get application by ID
    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(
            @PathVariable Long id) {

        Application application =
                applicationService.getApplicationById(id);

        if (application == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(application);
    }

    // Update application status
    @PutMapping("/{id}/status")
    public ResponseEntity<Application> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        String status = request.get("status");

        if (status == null || status.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        Application application =
                applicationService.updateApplicationStatus(
                        id,
                        status
                );

        if (application == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(application);
    }

    // Delete application
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(
            @PathVariable Long id) {

        Application application =
                applicationService.getApplicationById(id);

        if (application == null) {
            return ResponseEntity.notFound().build();
        }

        applicationService.deleteApplication(id);

        return ResponseEntity.noContent().build();
    }
}