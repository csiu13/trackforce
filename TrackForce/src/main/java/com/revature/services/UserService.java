package com.revature.services;

import static com.revature.utils.LogUtil.logger;

import java.io.IOException;
import java.util.List;

import static com.revature.utils.LogUtil.logger;

import com.revature.request.model.CreateAssociateModel;
import com.revature.utils.LogUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.revature.dao.UserDAO;
import com.revature.daoimpl.UserDaoImpl;
import com.revature.entity.TfRole;
import com.revature.entity.TfUser;
import com.revature.utils.LogUtil;
import com.revature.utils.PasswordStorage;
import com.revature.utils.PasswordStorage.CannotPerformOperationException;
import com.revature.utils.PasswordStorage.InvalidHashException;

import ch.qos.logback.classic.Logger;

/**
 * @author Adam L. 
 * <p> </p>
 * @version.date v06.2018.06.13
 *
 */
public class UserService {

	private UserDAO dao = new UserDaoImpl();
	
	// public so it can be used for testing 
	public UserService() {};
	
	// used in the submitCredentials 
	private JWTService jwtService;

	
	/**
	 * @author Adam L. 
	 * <p> </p>
	 * @version.date v06.2018.06.13
	 * 
	 * @return
	 */
    public List<TfUser> getAllUsers(){
    	return dao.getAllUsers();
    }
    
   /**
    * @author Adam L. 
    * <p> </p>
    * @version.date v06.2018.06.13
    * 
    * @param username
    * @return
    */
    public TfUser getUser(String username) {
    	return dao.getUser(username);
    }
    
   /**
    * @author Adam L. 
    * <p> </p>
    * @version.date v06.2018.06.13
    * 
    * @param newUser
    * @return
    */
	public boolean insertUser(TfUser newUser) {
		return dao.insertUser(newUser);
	}
	
	/**
	 * @author Adam L. 
	 * <p>Allows verification that a given user exists, and has the correct password.</p>
	 * 
	 * <p>Given the TfUser with only the username and password, find that user by the username.
	 * If it exists, retrieve it from the database.
	 * Given their hashed passwords match, return the user from the database.</p>
	 * @version.date v06.2018.06.13
	 * 
	 * @param loginUser
	 * @return foundUser 
	 */
	public TfUser submitCredentials(TfUser loginUser){
		LogUtil.logger.info("creating query in hibernate..");
		TfUser foundUser = getUser(loginUser.getUsername());
		LogUtil.logger.info("The found user was " + foundUser.toString());
		if(foundUser != null) {
			try {
				if(PasswordStorage.verifyPassword(loginUser.getPassword(), foundUser.getPassword())) {
					System.out.println("The found user is " + foundUser.getUsername());
					TfRole role = foundUser.getTfRole();
					foundUser.setToken(jwtService.createToken(foundUser.getUsername(), foundUser.getTfRole().getTfRoleId()));
					foundUser.setRole(foundUser.getTfRole().getTfRoleId());
				}
			} catch (CannotPerformOperationException e) {
				LogUtil.logger.warn(e.getMessage());
			} catch (InvalidHashException e) {
				LogUtil.logger.warn(e.getMessage());
			}
		}
		
		return foundUser;
		
	}

}
