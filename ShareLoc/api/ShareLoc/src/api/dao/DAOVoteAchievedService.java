package api.dao;

import api.model.VoteAchievedService;

/**
 * Classe gérant les liaisons entre la base de donnéees et les votes pour la validation d'un service effectué
 */
public class DAOVoteAchievedService extends DAOAbstractFacade<VoteAchievedService> {
	
	public DAOVoteAchievedService() {
		super(VoteAchievedService.class);
	}
	
}
