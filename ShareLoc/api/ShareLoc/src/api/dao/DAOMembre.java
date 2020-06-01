package api.dao;

import api.model.Membre;

/**
 * Classe g�rant les liaisons entre la base de donn�ees et les membres
 */
public class DAOMembre extends DAOAbstractFacade<Membre> {
	
	public DAOMembre() {
		super(Membre.class);
	}
	
}
