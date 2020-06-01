package api.controllers;

import java.util.Set;

import api.dao.DAOVoteDeleteService;
import api.model.Colocation;
import api.model.Membre;
import api.model.Service;
import api.model.User;
import api.model.VoteDeleteService;
import api.utils.Utils;

/**
 * Classe gérant les votes pour la suppression d'un service
 */
public class VoteDeleteServiceManager {
	/**
	 * Liaison vers la base de données
	 */
	static DAOVoteDeleteService daoVoteDeleteService = new DAOVoteDeleteService();
	
	
	/**
	 * Renvoie les votes pour la suppression d'un service
	 * 
	 * @param s
	 * 	Le service
	 * @return les votes
	 */
	public static Set<VoteDeleteService> getAll(Service s) {
		return s.getDeleteVotes();
	}
	
	/**
	 * Crée un vote pour la suppression d'un service
	 * 
	 * @param v
	 * 	Le vote
	 * @param u
	 * 	L'utilisateur ayant voté
	 * @param s
	 * 	Le service concerné
	 * @return le vote créé
	 */
	public static VoteDeleteService create(VoteDeleteService v, User u, Service s) {

			v.setUser(u);
			v.setService(s);
			daoVoteDeleteService.create(v);
			s.addDeleteVote(v);
			Set<VoteDeleteService> votes = s.getDeleteVotes();
			Set<Membre> membres = Utils.getColocationMembers(s.getColocation().getId());
			if (votes.size() > membres.size()/2) {
				int agree = 0;
				int disagree = 0;
				for (VoteDeleteService vote : votes) {
					if (vote.isAgree()) agree++;
					else disagree++;
				}
				if (agree > votes.size()/2 || disagree > votes.size()/2) {
					if (agree >= disagree) {
						Colocation c = ColocationManager.getById(s.getColocation().getId());
						c.removeService(s);
						ServiceManager.delete(s);
					}
					else s.setDeleted(false);
				}
				else if (votes.size() == membres.size() && s.getDeleted() == null) {
					s.setDeleted(false);
				}
			}
			return v;

	}
	
	/**
	 * Renvoie un vote pour la suppression d'un service à partir d'un identifiant
	 * 
	 * @param id
	 * 	L'identifiant
	 * @return le vote
	 */
	public static VoteDeleteService getById(Long id) {
		return daoVoteDeleteService.find(id);
	}

}
