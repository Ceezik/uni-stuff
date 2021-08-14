package api.dao;

import api.model.VoteDeleteService;

/**
 * Classe g�rant les liaisons entre la base de donn�ees et les votes pour la suppression d'un service
 */
public class DAOVoteDeleteService extends DAOAbstractFacade<VoteDeleteService> {
	
	public DAOVoteDeleteService() {
		super(VoteDeleteService.class);
	}

}
