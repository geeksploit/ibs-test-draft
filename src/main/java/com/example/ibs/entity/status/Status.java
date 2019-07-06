package com.example.ibs.entity.status;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Status {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String description;

    private Status() {
    }

    public Status(String name, String description) {
        this.name = name;
        this.description = description;
    }

}
