package com.admission.student_admission.controller;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.admission.student_admission.entity.Application;
import com.admission.student_admission.entity.Payment;
import com.admission.student_admission.service.ApplicationService;
import com.admission.student_admission.service.NotificationService;
import com.admission.student_admission.service.PaymentService;

@RestController
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final ApplicationService applicationService;
    private final NotificationService notificationService;

    public PaymentController(
            PaymentService paymentService,
            ApplicationService applicationService,
            NotificationService notificationService) {

        this.paymentService = paymentService;
        this.applicationService = applicationService;
        this.notificationService = notificationService;
    }

    // Normal payment save
    @PostMapping
    public ResponseEntity<Payment> savePayment(
            @RequestBody Payment payment) {

        return ResponseEntity.ok(
                paymentService.savePayment(payment)
        );
    }

    // Mock Payment
    @PostMapping("/mock")
    public ResponseEntity<Payment> makeMockPayment(
            @RequestBody Payment payment) {

        // Payment successful
        payment.setPaymentStatus("PAID");

        // Generate mock transaction ID
        payment.setTransactionId(
                "MOCK-" +
                UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase()
        );

        // Payment date
        payment.setPaymentDate(LocalDateTime.now());

        // Save payment
        Payment savedPayment =
                paymentService.savePayment(payment);

        // Update Application payment status
        if (payment.getApplication() != null
                && payment.getApplication().getId() != null) {

            Long applicationId =
                    payment.getApplication().getId();

            Application application =
                    applicationService
                            .getApplicationById(applicationId);

            if (application != null) {

                // Update application payment status
                application.setPaymentStatus("PAID");

                applicationService.updateApplication(application);

                // Create Payment notification
   
                    String message =
                            "Payment for application "
                            + application.getApplicationNumber()
                            + " has been completed successfully.";

                    notificationService.createNotification(
                            application,
                            message
                    );
            }
        }

        return ResponseEntity.ok(savedPayment);
    }

    // Get payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(
            @PathVariable Long id) {

        Payment payment =
                paymentService.getPaymentById(id);

        if (payment == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(payment);
    }
}