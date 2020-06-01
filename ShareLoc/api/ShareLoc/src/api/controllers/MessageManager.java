package api.controllers;

import java.util.Date;
import java.util.Set;

import api.dao.DAOMessage;
import api.model.Colocation;
import api.model.Message;
import api.model.User;

/**
 * Classe gérant les messages
 */
public class MessageManager {
	/**
	 * Liaison vers la base de données
	 */
	static DAOMessage daoMessage = new DAOMessage();
	
	/**
	 * Renvoie tous les messages d'une colocation
	 * 
	 * @param c
	 * 	La colocation
	 * @return ses messages
	 */
	public static Set<Message> getAllByColocation(Colocation c) {
		return c.getMessages();
	}
	
	/**
	 * Renvoie un message à partir de son identifiant
	 * 
	 * @param id
	 * 	L'identifiant
	 * @return le message
	 */
	public static Message getById(Long id) {
		return daoMessage.find(id);
	}
	
	/**
	 * Crée un message
	 * 
	 * @param m
	 * 	Le messages
	 * @param u
	 * 	L'utilisateur l'ayant envoyé
	 * @param c
	 * 	La colocation dont il fait partie
	 * @return le message créé
	 */
	public static Message create(Message m, User u, Colocation c) {
		m.setAuteur(u);
		m.setColocation(c);
		m.setCreatedAt(new Date());
		daoMessage.create(m);
		c.addMessage(m);
		ColocationManager.update(c);
		return m;
	}
	
	/**
	 * Modifie un message
	 * 
	 * @param m
	 * 	Le message
	 * @return le message modifié
	 */
	public static Message update(Message m) {
		m.setUpdatedAt(new Date());
		daoMessage.edit(m);
		return m;
	}
	
	/**
	 * Supprime un message
	 * 
	 * @param m
	 * 	Le message
	 */
	public static void delete(Message m) {
		Colocation c = ColocationManager.getById(m.getColocation().getId());
		c.removeMessage(m);
		daoMessage.remove(m);
	}
}
