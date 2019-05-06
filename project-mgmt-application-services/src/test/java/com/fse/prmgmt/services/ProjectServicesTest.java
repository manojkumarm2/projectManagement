/**
 * 
 */
package com.fse.prmgmt.services;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.fse.prmgmt.entity.Project;
import com.fse.prmgmt.services.ProjectServices;

/**
 * @author Manojkumar
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { TestConfig.class })
@ActiveProfiles("junit-tests")
public class ProjectServicesTest {

	@Autowired
	private ProjectServices testCase;

	/**
	 * Test method for
	 * {@link com.fse.prmgmt.services.ProjectServices#getProjects()}.
	 */
	@Test
	public void testGetProjects() {
		assertNotNull(testCase.getProjects());
	}

	/**
	 * Test method for
	 * {@link com.fse.prmgmt.services.ProjectServices#addUpdateProject(java.util.Map)}.
	 */
	@Test
	public void testAddUpdateProject() {
		Map<String, String> requestMap = new HashMap<>();
		requestMap.put("priority", "8");
		requestMap.put("managerId", "1JMU");
		try {
			assertNotNull(testCase.addUpdateProject(requestMap));
		} catch (ParseException e) {
			fail("Unexpected Parse error");
		}
	}
	
	@Test(expected = RuntimeException.class)
	public void testAddUpdateProject_Error() {
		Map<String, String> requestMap = new HashMap<>();
		requestMap.put("priority", "8");
		requestMap.put("managerId", "2JMU");
		try {
			assertNotNull(testCase.addUpdateProject(requestMap));
		} catch (ParseException e) {
			fail("Unexpected Parse error");
		}
	}

}
