package com.admission.student_admission.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.admission.student_admission.entity.Document;
import com.admission.student_admission.service.DocumentService;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    // Existing JSON save API
    @PostMapping
    public ResponseEntity<Document> saveDocument(
            @RequestBody Document document) {

        return ResponseEntity.ok(
                documentService.saveDocument(document)
        );
    }

    // Actual file upload API
    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentType) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Please select a file.");
        }

        try {
            Path uploadDirectory =
                    Paths.get("uploads/documents");

            Files.createDirectories(uploadDirectory);

            String originalFileName = file.getOriginalFilename();

            String fileName =
                    System.currentTimeMillis() + "_" + originalFileName;

            Path filePath =
                    uploadDirectory.resolve(fileName);

            Files.write(filePath, file.getBytes());

            return ResponseEntity.ok(
                    documentType + " uploaded successfully: " + fileName
            );

        } catch (IOException e) {

            return ResponseEntity.internalServerError()
                    .body("File upload failed.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocumentById(
            @PathVariable Long id) {

        Document document =
                documentService.getDocumentById(id);

        if (document == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(document);
    }
}