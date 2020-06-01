package api.dao;

import api.model.VoteAchievedService;

/**
 * Classe g�rant les liaisons entre la base de donn�ees et les votes pour la validation d'un service effectu�
 */
public class DAOVoteAchievedService extends DAOAbstractFacade<VoteAchievedService> {
	
	public DAOVoteAchievedService() {
		super(VoteAchievedService.class);
	}
	
}
