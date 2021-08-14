package api.dao;

import api.model.Service;

/**
 * Classe g�rant les liaisons entre la base de donn�ees et les services
 */
public class DAOService extends DAOAbstractFacade<Service> {

	public DAOService() {
		super(Service.class);
	}
	
}
