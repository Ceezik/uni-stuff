package api.utils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.ws.rs.core.SecurityContext;

import api.controllers.AchievedServiceManager;
import api.controllers.ColocationManager;
import api.controllers.UserManager;
import api.model.AchievedService;
import api.model.Colocation;
import api.model.Invitation;
import api.model.Membre;
import api.model.Message;
import api.model.Service;
import api.model.User;


/**
 * Classe contenant diverses fonctions utilitaires
 */
public class Utils {

	/**
	 * Renvoie l'utilisateur connecté
	 * 
	 * @param security
	 * @return l'utilisateur connecté
	 */
	public static User getLoggedUser(SecurityContext security) {
		return UserManager.getByLogin(security.getUserPrincipal().getName());
	}
	
	/**
	 * Sérialise un utilisateur
	 * 
	 * @param user
	 * 	L'utilisateur
	 * @return l'utilisateur sérialisé
	 */
	public static User serializeUser(User user) {
		User u = new User();
		u.setFirstname(user.getFirstname());
		u.setLastname(user.getLastname());
		u.setLogin(user.getLogin());
		return u;
	}
	
	/**
	 * Vérifie qu'un utilisateur est le gestionnaire d'une colocation
	 * 
	 * @param c
	 * 	La colocation
	 * @param u
	 * 	L'utilisateur
	 * @return 
	 */
	public static boolean isColocationOwner(Colocation c, User u) {
		for (Membre membre : c.getMembres()) {
			if (membre.getEstGestionnaire()) {
				return membre.getMembre().getLogin().equals(u.getLogin());
			}
		}
		return false;
	}
	
	/**
	 * Sérialise une colocation
	 * 
	 * @param colocation
	 * 	La colocation
	 * @return la colocation sérialisée
	 */
	public static Colocation serializeColocation(Colocation colocation) {
		Colocation c = new Colocation();
		c.setId(colocation.getId());
		c.setName(colocation.getName());
		return c;
	}
	
	/**
	 * Vérifie qu'un utilisateur fait partie d'une colocation
	 * 
	 * @param u
	 * 	L'utilisateur
	 * @param c
	 * 	La colocation
	 * @return vrai si le membre fait partie de la colocation, faux sinon
	 */
	public static boolean userIsInColocation(User u, Colocation c) {
		for (Membre membre : c.getMembres()) {
			if (membre.getMembre().getLogin().equals(u.getLogin())) {
				return true;
			}
		}
		return false;
	}
	
	/**
	 * Renvoie la liaison entre un utilisateur et une colocation
	 * 
	 * @param u
	 * 	L'utilisateur
	 * @param c	
	 * 	La colocation
	 * @return le membre qui lie un utilsateur et une colocation
	 */
	public static Membre getMemberInColocation(User u, Colocation c) {
		for (Membre membre : c.getMembres()) {
			if (membre.getMembre().getLogin().equals(u.getLogin())) {
				return membre;
			}
		}
		return null;
	}
	
	/**
	 * Renvoie les membres d'une colocation à partir de son identifiant
	 * 
	 * @param colocationId
	 * 	L'identifiant d'une colocation
	 * @return la liste des membres
	 */
	public static Set<Membre> getColocationMembers(Long colocationId) {
		Colocation c = ColocationManager.getById(colocationId);
		if (c != null) {
			return c.getMembres();
		}
		return new HashSet<Membre>();
	}


	
	/**
	 * Renvoie les services non effectués d'une colocation
	 * 
	 * @param c
	 * 	La colocation
	 * @return les services non effectués
	 */
	public static ArrayList<Service> getColocationUnachievedServices(Colocation c) {
		ArrayList<Service> services = new ArrayList<Service>();
		for (Service s : c.getServices()) {
			if (!s.getAchieved()) services.add(s);
		}
		return services;
	}
	
	
	/**
	 * Vérifie que l'utilisateur qui a envoyé l'inivtation est celui passé en paramètre
	 * 
	 * @param u
	 * 	L'utilisateur
	 * @param i
	 * 	L'invitation
	 * @return vrai si l'utilisateur a envoyé l'invitation, faux sinon
	 */
	public static boolean isInvitationOwner(User u, Invitation i) {
		return i.getUser().getLogin().equals(u.getLogin());
	}
	
	/**
	 * Vérifie que l'utilisateur a reçu une invitation à rejoindre la colocation
	 * 
	 * @param u
	 * 	L'utilisateur
	 * @param c
	 * 	La colocation
	 * @return vrai si l'utilisateur a reçu une invitation à rejoindre la colocation, faux sinon
	 */
	public static boolean userIsInvitedInColocation(User u, Colocation c) {
		for(Invitation i : u.getInvitations()) {
			if (i.getColocation().getId() == c.getId()) {
				return true;
			}
		}
		return false;
	}
	
	/**
	 * Vérifie que l'utilisateur a envoyé le message
	 * 
	 * @param u
	 * 	L'utilisateur
	 * @param m
	 * 	Le message
	 * @return vrai si l'utilisateur a envoyé le message, faux sinon
	 */
	public static boolean isMessageOwner(User u, Message m) {
		return m.getAuteur().getLogin().equals(u.getLogin());
	}
	
	
	/**
	 * Sérialise un service
	 * 
	 * @param service
	 * 	Le service
	 * @return le service sérialisé
	 */
	public static Service serializeService(Service service) {
		Service s = new Service();
		s.setId(service.getId());
		s.setTitle(service.getTitle());
		s.setDescription(service.getDescription());
		s.setCost(service.getCost());
		s.setAccepted(service.getAccepted());
		s.setColocation(Utils.serializeColocation(s.getColocation()));
		return s;
	}
	
	/**
	 * Vérifie que l'utilisateur est un bénficiaire du service effectué
	 * 
	 * @param u
	 * 	L'utilisateur
	 * @param as
	 * 	Le service effectué
	 * @return vrai si l'utilisateur est un bénficiaire du service effectué, faux sinon
	 */
	public static boolean userIsBeneficiary(User u, AchievedService as) {
		for (Membre beneficiary : as.getTo()) {
			if (beneficiary.getMembre().getLogin().equals(u.getLogin())) {
				return true;
			}
		}
		return false;
	}
	
	
	/**
	 * Renvoie la liste des services effectués dans une colocation
	 * 
	 * @param c
	 * 	La colocation
	 * @return les services effectués dans la colocation
	 */
	public static List<AchievedService> getColocationAchievedServices(Colocation c) {
		List<AchievedService> achievedServices = AchievedServiceManager.getAll();
		List<AchievedService> res = new ArrayList<AchievedService>();
		
		for (AchievedService as : achievedServices) {
			if (as.getService().getColocation().getId() == c.getId()) {
				res.add(as);
			}
		}
		
		return res;
	}
}
