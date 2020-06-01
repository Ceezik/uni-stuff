package api.dao;

import api.model.Invitation;

/**
 * Classe gérant les liaisons entre la base de donnéees et les invitations
 */
public class DAOInvitation extends DAOAbstractFacade<Invitation> {
	
	public DAOInvitation() {
		super(Invitation.class);
	}

}
