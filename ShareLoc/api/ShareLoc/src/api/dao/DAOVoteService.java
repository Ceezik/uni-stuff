package api.dao;

import api.model.VoteService;

/**
 * Classe gérant les liaisons entre la base de donnéees et les votes pour la validation d'un service
 */
public class DAOVoteService extends DAOAbstractFacade<VoteService> {
	
	public DAOVoteService() {
		super(VoteService.class);
	}

}
