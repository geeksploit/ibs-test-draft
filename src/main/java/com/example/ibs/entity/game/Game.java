package com.example.ibs.entity.game;

import com.example.ibs.entity.person.Person;
import com.example.ibs.entity.status.Status;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Data
@Entity
public class Game {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    @ManyToOne
    private Person owner;

    @ManyToOne
    private Person borrower;

    @ManyToOne
    private Status status;

    private Game() {
    }

    public Game(String title, Person owner, Person borrower, Status status) {
        this.title = title;
        this.owner = owner;
        this.borrower = borrower;
        this.status = status;
    }
}
