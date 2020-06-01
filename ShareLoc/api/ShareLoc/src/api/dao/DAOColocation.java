package api.dao;

import api.model.Colocation;

/**
 * Classe gérant les liaisons entre la base de donnéees et les colocations
 */
public class DAOColocation extends DAOAbstractFacade<Colocation> {
	
	public DAOColocation() {
		super(Colocation.class);
	}
	
}
