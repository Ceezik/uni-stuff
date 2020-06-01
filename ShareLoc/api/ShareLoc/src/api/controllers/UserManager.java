package api.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import api.dao.DAOUser;
import api.model.User;
import api.security.Password;

/**
 * Classe gérant les utilisateurs
 */
public class UserManager {
	/**
	 * Liaison vers la base de données
	 */
	static DAOUser daoUser = new DAOUser();

	/**
	 * Renvoie tous les utilisateurs
	 * 
	 * @return tous les utilisateurs
	 */
	public static List<User> getAll() {
		return daoUser.findAll();
	}

	/**
	 * Renvoie un utilisateur à partir d'une adresse mail
	 * 
	 * @param login
	 * 	L'adresse mail
	 * @return l'utilisateur
	 */
	public static User getByLogin(String login) {		
		return daoUser.find(login);
	}
	
	/**
	 * Crée un utilisateur
	 * 
	 * @param u
	 * 	L'utilisateur
	 * @return vrai si l'utilisateur a bien été créé, faux sinon
	 */
	public static boolean create(User u) {
		User user = daoUser.find(u.getLogin());
		if (user == null) {
			try {
				String hashPassword = Password.hashPassword(u.getPassword()).get();
				u.setPassword(hashPassword);
				daoUser.create(u);
				return true;
			} catch (NoSuchElementException e) {
				return false;
			}
		}
		return false;
	}
	
	/**
	 * Modifie un utilisateur
	 * 
	 * @param u
	 * 	L'utilisateur
	 */
	public static void update(User u) {		
		daoUser.edit(u);
	}
	
	/**
	 * Vérifie si un utilisateur peut se connecter
	 * 
	 * @param u
	 * 	L'utilisateur
	 * @return l'utilisateur
	 */
	public static User login(User u) {		
		User user = daoUser.find(u.getLogin());
		if(user != null && Password.verifyPassword(u.getPassword(), user.getPassword()))
			return user;
		return null;
	}
	
	public static List<String> findUserRoles(String login) {
		return null;
	}

}
