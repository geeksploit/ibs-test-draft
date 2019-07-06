package com.example.ibs;

import com.example.ibs.entity.person.Person;
import com.example.ibs.entity.person.PersonRepository;
import com.example.ibs.entity.status.Status;
import com.example.ibs.entity.status.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final PersonRepository personRepository;
    private final StatusRepository statusRepository;

    @Autowired
    public DatabaseLoader(PersonRepository personRepository, StatusRepository statusRepository) {
        this.personRepository = personRepository;
        this.statusRepository = statusRepository;
    }

    @Override
    @SuppressWarnings("RedundantThrows")
    public void run(String... args) throws Exception {
        this.personRepository.save(new Person("Anthony", "Murillo"));
        this.personRepository.save(new Person("Debra", "Schaefer"));
        this.personRepository.save(new Person("Haniya", "Kumar"));
        this.personRepository.save(new Person("Macaulay", "Gordon"));
        this.personRepository.save(new Person("Matt", "Ballard"));

        this.statusRepository.save(new Status("Active", ""));
        this.statusRepository.save(new Status("Borrowed", ""));
        this.statusRepository.save(new Status("Disabled", ""));
        this.statusRepository.save(new Status("Dispute", ""));
    }
}
