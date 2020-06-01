package api.controllers;

import api.dao.DAOMembre;
import api.model.Colocation;
import api.model.Membre;
import api.model.User;

/**
 * Classe gérant les membres
 */
public class MembreManager {
	/**
	 * Liaison vers la base de données
	 */
	static DAOMembre daoMembre = new DAOMembre();
	
	
	/**
	 * Crée un membre
	 * 
	 * @param c
	 * 	La colocation
	 * @param u
	 * 	L'utilisateur
	 * @param estGestionnaire
	 * 	S'il sera gestionnaire de la colocation ou non
	 * @return le membre créé
	 */
	public static Membre create(Colocation c, User u, boolean estGestionnaire) {
		try {
			Membre m = new Membre(c, u, estGestionnaire);
			daoMembre.create(m);
			u.addColocation(m);
			UserManager.update(u);
			c.addMembre(m);
			ColocationManager.update(c);
			return m;
		}
		catch(Exception e) {
			return null;
		}
	}
	
	/**
	 * Modifie un membre
	 * 
	 * @param m
	 * 	Le membre
	 */
	public static void update(Membre m) {
		daoMembre.edit(m);
	}
	
	/**
	 * Renvoie un membre à partir de son identifiant
	 * 
	 * @param id
	 * 	L'identifiant
	 * @return le membre
	 */
	public static Membre getById(Long id) {
		return daoMembre.find(id);
	}
}
