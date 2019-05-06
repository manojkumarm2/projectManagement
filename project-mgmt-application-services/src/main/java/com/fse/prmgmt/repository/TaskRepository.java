/**
 * 
 */
package com.fse.prmgmt.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fse.prmgmt.entity.Task;

/**
 * @author Manojkumar
 *
 */
public interface TaskRepository extends MongoRepository<Task, String> {

	public Task findByTaskId(String taskId);

	public List<Task> findByUserId(String id);
		
	public List<Task> findByProjectId(String projectId);

}
