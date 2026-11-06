package com.admission.student_admission.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "application_id")
    private Application application;

    private String tenthMarksheet;
    private String twelfthMarksheet;
    private String photo;
    private String signature;
    private String aadhaarCard;
    private String tenthCertificate;
    private String twelfthCertificate;
    private String diplomaMarksheet;
    private String schoolLeavingCertificate;
    private String birthCertificate;
    private String domicileCertificate;
    private String diplomaCertificate;

    public Document() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Application getApplication() {
        return application;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public String getTenthMarksheet() {
        return tenthMarksheet;
    }
    public String getAadhaarCard() {
        return aadhaarCard;
    }

    public void setAadhaarCard(String aadhaarCard) {
        this.aadhaarCard = aadhaarCard;
    }

    public void setTenthMarksheet(String tenthMarksheet) {
        this.tenthMarksheet = tenthMarksheet;
    }

    public String getTwelfthMarksheet() {
        return twelfthMarksheet;
    }

    public void setTwelfthMarksheet(String twelfthMarksheet) {
        this.twelfthMarksheet = twelfthMarksheet;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
    
    public String getTenthCertificate() {
        return tenthCertificate;
    }

    public void setTenthCertificate(String tenthCertificate) {
        this.tenthCertificate = tenthCertificate;
    }

    public String getTwelfthCertificate() {
        return twelfthCertificate;
    }

    public void setTwelfthCertificate(String twelfthCertificate) {
        this.twelfthCertificate = twelfthCertificate;
    }

    public String getDiplomaMarksheet() {
        return diplomaMarksheet;
    }

    public void setDiplomaMarksheet(String diplomaMarksheet) {
        this.diplomaMarksheet = diplomaMarksheet;
    }

    public String getSchoolLeavingCertificate() {
        return schoolLeavingCertificate;
    }

    public void setSchoolLeavingCertificate(String schoolLeavingCertificate) {
        this.schoolLeavingCertificate = schoolLeavingCertificate;
    }

    public String getBirthCertificate() {
        return birthCertificate;
    }

    public void setBirthCertificate(String birthCertificate) {
        this.birthCertificate = birthCertificate;
    }

    public String getDomicileCertificate() {
        return domicileCertificate;
    }

    public void setDomicileCertificate(String domicileCertificate) {
        this.domicileCertificate = domicileCertificate;
    }

    public String getDiplomaCertificate() {
        return diplomaCertificate;
    }
    public void setDiplomaCertificate(String diplomaCertificate) {
        this.diplomaCertificate = diplomaCertificate;
    }
}