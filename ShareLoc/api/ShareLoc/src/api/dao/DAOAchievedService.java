package api.dao;

import api.model.AchievedService;

/**
 * Classe g�rant les liaisons entre la base de donn�ees et les services effectu�s
 */
public class DAOAchievedService extends DAOAbstractFacade<AchievedService> {

	public DAOAchievedService() {
		super(AchievedService.class);
	}
	
}
