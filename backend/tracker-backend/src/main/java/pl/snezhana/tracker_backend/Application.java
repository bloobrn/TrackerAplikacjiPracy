package pl.snezhana.tracker_backend;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "APPLICATIONS")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "COMPANY", nullable = false)
    private String company;

    @Column(name = "POSITION")
    private String position;

    @Column(name = "APPLICATION_DATE")
    private LocalDate applicationDate;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "NOTES")
    private String notes;

    @Column(name = "OFFER_LINK")
    private String offerLink;

    // Konstruktor bezargumentowy (wymagany przez JPA)
    public Application() {}

    // Gettery i settery
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }

    public LocalDate getApplicationDate() { return applicationDate; }
    public void setApplicationDate(LocalDate applicationDate) { this.applicationDate = applicationDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getOfferLink() { return offerLink; }
    public void setOfferLink(String offerLink) { this.offerLink = offerLink; }
}
