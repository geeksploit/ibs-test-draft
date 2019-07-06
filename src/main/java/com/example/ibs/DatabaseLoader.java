package com.example.ibs;

import com.example.ibs.entity.status.Status;
import com.example.ibs.entity.status.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final StatusRepository statusRepository;

    @Autowired
    public DatabaseLoader(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    @Override
    @SuppressWarnings("RedundantThrows")
    public void run(String... args) throws Exception {
        this.statusRepository.save(new Status("Active", ""));
        this.statusRepository.save(new Status("Borrowed", ""));
        this.statusRepository.save(new Status("Disabled", ""));
        this.statusRepository.save(new Status("Dispute", ""));
    }
}
