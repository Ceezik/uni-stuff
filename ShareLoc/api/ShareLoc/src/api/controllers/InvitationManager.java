package api.controllers;

import java.util.Set;

import api.dao.DAOInvitation;
import api.model.Colocation;
import api.model.Invitation;
import api.model.User;

/**
 * Classe gérant les invitations
 */
public class InvitationManager {
	/**
	 * Liaison vers la base de données
	 */
	static DAOInvitation daoInvitation = new DAOInvitation();
	
	/**
	 * Renvoie toutes les invitations d'un utilisateur
	 * @param u
	 * 	L'utilisateur
	 * @return les invitations
	 */
	public static Set<Invitation> getAll(User u) {
		return u.getInvitations();
	}

	/**
	 * Crée une invitation
	 * 
	 * @param c
	 * 	La colocation concernée
	 * @param u
	 * 	L'utilisateur invité
	 * @param from
	 * 	L'utilisateur envoyant l'invitation
	 * @return l'invitation créée
	 */
	public static Invitation create(Colocation c, User u, User from) {
		Invitation i = new Invitation();
		i.setAccepted(null);
		i.setColocation(c);
		i.setUser(u);
		i.setFrom(from);
		daoInvitation.create(i);
		u.addInvitation(i);
		UserManager.update(u);
		return i;
	}
	
	/**
	 * Renvoie une invitation à partir d'un identifiant
	 * 
	 * @param id
	 * 	L'identifiant
	 * @return l'invitation
	 */
	public static Invitation getById(Long id) {
		return daoInvitation.find(id);
	}
	
	/**
	 * Accepte ou refuse une invitation
	 * 
	 * @param i
	 * 	L'invitation
	 * @param accepted
	 * 	Si elle a été acceptée ou non
	 */
	public static void update(Invitation i, boolean accepted) {
		User u = UserManager.getByLogin(i.getUser().getLogin());
		Colocation c = ColocationManager.getById(i.getColocation().getId());
		if (accepted) {
			MembreManager.create(c, u, false);
		}
	
		u.removeInivtation(i);
		InvitationManager.delete(i);
	}
	
	/**
	 * Supprime une invitation
	 * 
	 * @param i
	 * 	L'invitation
	 */
	public static void delete(Invitation i) {
		daoInvitation.remove(i);
	}
	
}
