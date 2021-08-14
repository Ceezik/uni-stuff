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
 * Classe g�rant les services effectu�s
 */
public class AchievedServiceManager {
	/**
	 * Liaison avec la base de donn�es
	 */
	static DAOAchievedService daoAchievedService = new DAOAchievedService();
	
	/**
	 * Renvoie tous les services effectu�s
	 * @return tous les services effectu�s
	 */
	public static List<AchievedService> getAll() {
		return daoAchievedService.findAll();
	}
	
	/**
	 * Cr�e un nouveau service effectu�
	 * 
	 * @param to
	 * 	Liste des identifiants des b�n�ficiaires
	 * @param s
	 * 	Service
	 * @param from
	 * 	Utilisateur ayant r�alis� le service
	 * @return le service effectu� cr��
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
	 * Renvoie un service effectu� � partir de son identifiant
	 * 
	 * @param id
	 * 	L'identifiant
	 * @return le service effectu�
	 */
	public static AchievedService getById(Long id) {
		return daoAchievedService.find(id);
	}
	
	/**
	 * Modifie un service effectu�
	 * 
	 * @param as
	 * 	Le service effectu�
	 */
	public static void update(AchievedService as) {
		daoAchievedService.edit(as);
	}

}
