package com.example.ibs;

import com.example.ibs.entity.game.Game;
import com.example.ibs.entity.game.GameRepository;
import com.example.ibs.entity.person.Person;
import com.example.ibs.entity.person.PersonRepository;
import com.example.ibs.entity.status.Status;
import com.example.ibs.entity.status.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final GameRepository gameRepository;
    private final PersonRepository personRepository;
    private final StatusRepository statusRepository;

    @Autowired
    public DatabaseLoader(GameRepository gameRepository, PersonRepository personRepository, StatusRepository statusRepository) {
        this.gameRepository = gameRepository;
        this.personRepository = personRepository;
        this.statusRepository = statusRepository;
    }

    @Override
    @SuppressWarnings("RedundantThrows")
    public void run(String... args) throws Exception {

        Person person1 = personRepository.save(new Person("Anthony", "Murillo"));
        Person person2 = personRepository.save(new Person("Debra", "Schaefer"));
        Person person3 = personRepository.save(new Person("Haniya", "Kumar"));
        Person person4 = personRepository.save(new Person("Macaulay", "Gordon"));
        Person person5 = personRepository.save(new Person("Matt", "Ballard"));

        Status active = statusRepository.save(new Status("Active", ""));
        Status borrowed = statusRepository.save(new Status("Borrowed", ""));
        Status disabled = statusRepository.save(new Status("Disabled", ""));
        Status dispute = statusRepository.save(new Status("Dispute", ""));

        gameRepository.save(new Game("Gloomhaven", person1, person2, borrowed));
        gameRepository.save(new Game("Terraforming Mars", person1, person4, borrowed));
        gameRepository.save(new Game("War of the Ring", person3, null, active));
        gameRepository.save(new Game("Eclipse", person5, null, disabled));
        gameRepository.save(new Game("Root", person5, person4, dispute));
    }
}
