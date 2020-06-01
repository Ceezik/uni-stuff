package api.dao;

import api.model.AchievedService;

/**
 * Classe gérant les liaisons entre la base de donnéees et les services effectués
 */
public class DAOAchievedService extends DAOAbstractFacade<AchievedService> {

	public DAOAchievedService() {
		super(AchievedService.class);
	}
	
}
