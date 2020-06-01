package api.dao;

import api.model.Message;

/**
 * Classe gérant les liaisons entre la base de donnéees et les messages
 */
public class DAOMessage extends DAOAbstractFacade<Message> {
	
	public DAOMessage() {
		super(Message.class);
	}

}
