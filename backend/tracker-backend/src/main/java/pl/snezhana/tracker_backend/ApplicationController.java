package pl.snezhana.tracker_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired
    private ApplicationRepository repository;

    // GET /api/applications - zwraca wszystkie aplikacje
    @GetMapping
    public List<Application> getAllApplications() {
        return repository.findAll();
    }

    // GET /api/applications/{id} - zwraca jedną aplikację po id
    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    // POST /api/applications - dodaje nową aplikację
    @PostMapping
    public Application createApplication(@RequestBody Application application) {
        return repository.save(application);
    }

    // PUT /api/applications/{id} - aktualizuje istniejącą aplikację
    @PutMapping("/{id}")
    public Application updateApplication(@PathVariable Long id, @RequestBody Application updatedApp) {
        updatedApp.setId(id);
        return repository.save(updatedApp);
    }

    // DELETE /api/applications/{id} - usuwa aplikację
    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
