package api.dao;

import api.model.User;

/**
 * Classe g�rant les liaisons entre la base de donn�ees et les utilisateurs
 */
public class DAOUser extends DAOAbstractFacade<User> {

	public DAOUser() {
		super(User.class);
	}

}
