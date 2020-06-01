package api.dao;

import api.model.Colocation;

/**
 * Classe g�rant les liaisons entre la base de donn�ees et les colocations
 */
public class DAOColocation extends DAOAbstractFacade<Colocation> {
	
	public DAOColocation() {
		super(Colocation.class);
	}
	
}
