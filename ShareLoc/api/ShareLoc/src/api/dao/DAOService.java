package api.dao;

import api.model.Service;

/**
 * Classe gérant les liaisons entre la base de donnéees et les services
 */
public class DAOService extends DAOAbstractFacade<Service> {

	public DAOService() {
		super(Service.class);
	}
	
}
