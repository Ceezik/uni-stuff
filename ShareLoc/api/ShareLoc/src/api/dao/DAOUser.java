package api.dao;

import api.model.User;

/**
 * Classe gérant les liaisons entre la base de donnéees et les utilisateurs
 */
public class DAOUser extends DAOAbstractFacade<User> {

	public DAOUser() {
		super(User.class);
	}

}
