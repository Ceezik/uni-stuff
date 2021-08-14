package api.dao;

import api.model.Message;

/**
 * Classe g�rant les liaisons entre la base de donn�ees et les messages
 */
public class DAOMessage extends DAOAbstractFacade<Message> {
	
	public DAOMessage() {
		super(Message.class);
	}

}
