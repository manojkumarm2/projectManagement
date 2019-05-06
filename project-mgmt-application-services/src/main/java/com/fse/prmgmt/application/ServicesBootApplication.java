package com.fse.prmgmt.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = { "com.fse.prmgmt.repository" })
@ComponentScan(basePackages = { "com.fse.prmgmt" })
public class ServicesBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServicesBootApplication.class, args);
	}

}
