package com.fse.prmgmt.application;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.fse.prmgmt.application.ServicesBootApplication;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { ServicesBootApplication.class })
public class ServicesBootApplicationTest {

	@Test
	public void contextLoads() {
	}

	@Test
	public void testMain() {
		ServicesBootApplication.main(new String[] { "--spring.main.web-environment=false" });
	}

}
