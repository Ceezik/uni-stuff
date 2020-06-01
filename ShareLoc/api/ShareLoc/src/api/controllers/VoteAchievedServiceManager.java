package api.controllers;

import java.util.Set;

import api.dao.DAOVoteAchievedService;
import api.model.AchievedService;
import api.model.Membre;
import api.model.User;
import api.model.VoteAchievedService;

/**
 * Classe g�rant les votes pour la validation d'un service effectu�
 */
public class VoteAchievedServiceManager {
	/**
	 * Liaison vers la base de donn�es
	 */
	static DAOVoteAchievedService daoVoteAchievedService = new DAOVoteAchievedService();
	
	/**
	 * Renvoie les votes pour la validation d'un service effectu�
	 * 
	 * @param as
	 * 	Le service effectu�
	 * @return les votes
	 */
	public static Set<VoteAchievedService> getAll(AchievedService as) {
		return as.getVotes();
	}
	
	/**
	 * Cr�e un vote pour la validation d'un service effectu�
	 * 
	 * @param vote
	 * 	Le vote
	 * @param u
	 * 	L'utilisateur ayant vot�
	 * @param as
	 * 	Le service effectu� concern�
	 * @return le vote cr��
	 */
	public static VoteAchievedService create(VoteAchievedService vote, User u, AchievedService as) {
		try {
			vote.setUser(u);
			vote.setService(as);
			daoVoteAchievedService.create(vote);
			as.addVote(vote);
			Set<VoteAchievedService> votes = as.getVotes();
			Set<Membre> beneficiaires = as.getTo();
			if (votes.size() > beneficiaires.size()/2) {
				int agree = 0;
				int disagree = 0;
				for (VoteAchievedService v : votes) {
					if (v.isAgree()) agree++;
					else disagree++;
				}
				if (agree > votes.size()/2 || disagree > votes.size()/2) {
					if (agree >= disagree) {
						as.setValid(true);
						int cost = as.getService().getCost();
						as.getFrom().addPoints(cost);
						MembreManager.update(as.getFrom());
						for (Membre m : beneficiaires) {
							m.addPoints((int)cost/beneficiaires.size()*-1);
							MembreManager.update(m);
						}
					}
					else as.setValid(false);
					AchievedServiceManager.update(as);
				}
				else if (votes.size() == beneficiaires.size() && as.getValid() == null) {
					as.setValid(false);
					AchievedServiceManager.update(as);
				}
			}
			return vote;
		}
		catch (Exception e) {
			return null;
		}
	}
	
	/**
	 * Renvoie un vote pour la validation d'un service effectu� � partir d'un identifiant
	 * 
	 * @param id
	 * 	L'identifiant
	 * @return le vote
	 */
	public static VoteAchievedService getById(Long id) {
		return daoVoteAchievedService.find(id);
	}
}
