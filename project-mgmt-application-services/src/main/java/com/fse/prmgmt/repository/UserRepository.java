/**
 * 
 */
package com.fse.prmgmt.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fse.prmgmt.entity.User;

/**
 * @author Manojkumar
 *
 */
public interface UserRepository extends MongoRepository<User, String> {

}
