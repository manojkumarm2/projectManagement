/**
 * 
 */
package com.fse.prmgmt.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fse.prmgmt.entity.ParentTask;

/**
 * @author Manojkumar
 *
 */
public interface ParentTaskRepository extends MongoRepository<ParentTask, String> {

	public ParentTask findByParentId(String parentId);
	
}
