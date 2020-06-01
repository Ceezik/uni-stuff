package api.dao;

import api.model.Invitation;

/**
 * Classe g�rant les liaisons entre la base de donn�ees et les invitations
 */
public class DAOInvitation extends DAOAbstractFacade<Invitation> {
	
	public DAOInvitation() {
		super(Invitation.class);
	}

}
