package api.controllers;

import java.util.Set;

import api.dao.DAOVoteService;
import api.model.Membre;
import api.model.Service;
import api.model.User;
import api.model.VoteService;
import api.utils.Utils;

/**
 * Classe gérant les votes pour la validation d'un service
 */
public class VoteServiceManager {
	/**
	 * Liaison vers la base de données
	 */
	static DAOVoteService daoVoteService = new DAOVoteService();
	
	
	/**
	 * Renvoie les votes pour la validation d'un service
	 * 
	 * @param s
	 * 	Le service
	 * @return les votes
	 */
	public static Set<VoteService> getAll(Service s) {
		return s.getVotes();
	}
	
	/**
	 * Crée un vote pour la validation d'un service
	 * 
	 * @param v
	 * 	Le vote
	 * @param u
	 * 	L'utilisateur ayant voté
	 * @param s
	 * 	Le service
	 * @return le vote créé
	 */
	public static VoteService create(VoteService v, User u, Service s) {
		try {
			v.setUser(u);
			v.setService(s);
			daoVoteService.create(v);
			s.addVote(v);
			Set<VoteService> votes = s.getVotes();
			Set<Membre> membres = Utils.getColocationMembers(s.getColocation().getId());
			if (votes.size() > membres.size()/2) {
				int agree = 0;
				int disagree = 0;
				for (VoteService vote : votes) {
					if (vote.isAgree()) agree++;
					else disagree++;
				}
				if (agree > votes.size()/2 || disagree > votes.size()/2) {
					if (agree >= disagree) s.setAccepted(true);
					else s.setAccepted(false);
					ServiceManager.update(s);
				}
				else if (votes.size() == membres.size() && s.getAccepted() == null) {
					s.setAccepted(false);
					ServiceManager.update(s);
				}
			}
			return v;
		}
		catch(Exception e) {
			return null;
		}
	}
	
	/**
	 * Renvoie un vote pour la validation d'un service à partir d'un identifiant
	 * 
	 * @param id
	 * 	L'identifiant
	 * @return le vote
	 */
	public static VoteService getById(Long id) {
		return daoVoteService.find(id);
	}
	
}
