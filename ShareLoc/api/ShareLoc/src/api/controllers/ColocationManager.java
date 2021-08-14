package api.controllers;

import java.util.List;

import api.dao.DAOColocation;
import api.model.Colocation;

/**
 * Classe g�rant les colocation
 */
public class ColocationManager {
	/**
	 * Liaison vers la base de donn�es
	 */
	static DAOColocation daoColocation = new DAOColocation();
	
	/**
	 * Renvoie toutes les colocations
	 * @return toutes les colocations
	 */
	public static List<Colocation> getAll() {
		return daoColocation.findAll();
	}
	
	/**
	 * Renvoie une colocation � partir d'un identifiant 
	 * 
	 * @param id
	 * 	L'identifiant
	 * @return la colocation
	 */
	public static Colocation getById(Long id) {
		return daoColocation.find(id);
	}
	
	/**
	 * Cr�e une colocation
	 * 
	 * @param c
	 * 	La colocation
	 * @return la colocation cr��e
	 */
	public static Colocation create(Colocation c) {
		return daoColocation.create(c);
	}
	
	/**
	 * Modifie une colocation
	 * 
	 * @param c
	 * 	La colocation
	 */
	public static void update(Colocation c) {
		daoColocation.edit(c);
	}
	
	/**
	 * Supprime une colocation
	 * 
	 * @param c
	 * 	La colocation
	 */
	public static void delete(Colocation c) {
		daoColocation.remove(c);
	}
}
