package api.dao;

import api.model.VoteService;

/**
 * Classe g�rant les liaisons entre la base de donn�ees et les votes pour la validation d'un service
 */
public class DAOVoteService extends DAOAbstractFacade<VoteService> {
	
	public DAOVoteService() {
		super(VoteService.class);
	}

}
