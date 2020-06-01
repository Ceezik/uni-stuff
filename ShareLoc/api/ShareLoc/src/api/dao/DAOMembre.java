package api.dao;

import api.model.Membre;

/**
 * Classe gérant les liaisons entre la base de donnéees et les membres
 */
public class DAOMembre extends DAOAbstractFacade<Membre> {
	
	public DAOMembre() {
		super(Membre.class);
	}
	
}
