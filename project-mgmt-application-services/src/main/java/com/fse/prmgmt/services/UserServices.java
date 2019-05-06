/**
 * 
 */
package com.fse.prmgmt.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fse.prmgmt.entity.Project;
import com.fse.prmgmt.entity.Task;
import com.fse.prmgmt.entity.User;
import com.fse.prmgmt.repository.ProjectRepository;
import com.fse.prmgmt.repository.TaskRepository;
import com.fse.prmgmt.repository.UserRepository;

/**
 * @author Manojkumar
 *
 */
@RestController
@RequestMapping("/users")
public class UserServices {

	private static final Logger logger = LoggerFactory.getLogger(UserServices.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TaskRepository taskRepository;

	@Autowired
	private ProjectRepository projectRepository;

	/**
	 * @return
	 */
	@RequestMapping("/getAllUsers")
	public List<User> getAllUsers() {
		logger.info("Method getAllUsers() executed");
		return userRepository.findAll();
	}

	/**
	 * @param user
	 * @return
	 */
	@RequestMapping("/addUpdate")
	public List<User> addUpdateUser(@RequestBody User user) {
		logger.info("Method addUpdateUser() executed");
		userRepository.save(user);
		return userRepository.findAll();
	}

	/**
	 * @param user
	 * @return
	 */
	@RequestMapping("/deleteUser")
	public List<User> deleteUser(@RequestBody User user) {
		logger.info("Method deleteUser() executed");
		userRepository.delete(user);
		List<Task> tasks = taskRepository.findByUserId(user.getId());
		for (Task task : tasks) {
			task.setUserId("");
			taskRepository.save(task);
		}
		List<Project> projects = projectRepository.findByManagerId(user.getId());
		for (Project project : projects) {
			project.setManagerId("");
			project.setManagerName("");
			projectRepository.save(project);
		}
		return userRepository.findAll();
	}

}
