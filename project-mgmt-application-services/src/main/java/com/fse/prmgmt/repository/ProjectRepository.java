/**
 * 
 */
package com.fse.prmgmt.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fse.prmgmt.entity.Project;

/**
 * @author Manojkumar
 *
 */
public interface ProjectRepository extends MongoRepository<Project, String> {

	public Project findByProjectId(String projectId);

	public List<Project> findByManagerId(String id);

}
