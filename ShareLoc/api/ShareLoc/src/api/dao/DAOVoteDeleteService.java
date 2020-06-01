package api.dao;

import api.model.VoteDeleteService;

/**
 * Classe gérant les liaisons entre la base de donnéees et les votes pour la suppression d'un service
 */
public class DAOVoteDeleteService extends DAOAbstractFacade<VoteDeleteService> {
	
	public DAOVoteDeleteService() {
		super(VoteDeleteService.class);
	}

}
