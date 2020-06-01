package api.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import api.dao.DAOAchievedService;
import api.model.AchievedService;
import api.model.Membre;
import api.model.Service;

/**
 * Classe gérant les services effectués
 */
public class AchievedServiceManager {
	/**
	 * Liaison avec la base de données
	 */
	static DAOAchievedService daoAchievedService = new DAOAchievedService();
	
	/**
	 * Renvoie tous les services effectués
	 * @return tous les services effectués
	 */
	public static List<AchievedService> getAll() {
		return daoAchievedService.findAll();
	}
	
	/**
	 * Crée un nouveau service effectué
	 * 
	 * @param to
	 * 	Liste des identifiants des bénéficiaires
	 * @param s
	 * 	Service
	 * @param from
	 * 	Utilisateur ayant réalisé le service
	 * @return le service effectué créé
	 */
	public static AchievedService create(ArrayList<BigDecimal> to, Service s, Membre from) {
		try {
			AchievedService as = new AchievedService();
			Set<Membre> beneficiaries = new HashSet<Membre>();
			for (BigDecimal beneficiaryId : to) {
				beneficiaries.add(MembreManager.getById(beneficiaryId.longValue()));
			}
			
			if (beneficiaries.isEmpty()) {
				throw new Exception();
			}
			
			as.setTo(beneficiaries);
			as.setService(s);
			s.setAchieved(true);
			as.setValid(null);
			as.setFrom(from);
			as.setDoneAt(new Date());
			daoAchievedService.create(as);
			return as;
		}
		catch(Exception e) {
			return null;
		}
	}
	
	/**
	 * Renvoie un service effectué à partir de son identifiant
	 * 
	 * @param id
	 * 	L'identifiant
	 * @return le service effectué
	 */
	public static AchievedService getById(Long id) {
		return daoAchievedService.find(id);
	}
	
	/**
	 * Modifie un service effectué
	 * 
	 * @param as
	 * 	Le service effectué
	 */
	public static void update(AchievedService as) {
		daoAchievedService.edit(as);
	}

}
