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
	 * Renvoie l'utilisateur connect�
	 * 
	 * @param security
	 * @return l'utilisateur connect�
	 */
	public static User getLoggedUser(SecurityContext security) {
		return UserManager.getByLogin(security.getUserPrincipal().getName());
	}
	
	/**
	 * S�rialise un utilisateur
	 * 
	 * @param user
	 * 	L'utilisateur
	 * @return l'utilisateur s�rialis�
	 */
	public static User serializeUser(User user) {
		User u = new User();
		u.setFirstname(user.getFirstname());
		u.setLastname(user.getLastname());
		u.setLogin(user.getLogin());
		return u;
	}
	
	/**
	 * V�rifie qu'un utilisateur est le gestionnaire d'une colocation
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
	 * S�rialise une colocation
	 * 
	 * @param colocation
	 * 	La colocation
	 * @return la colocation s�rialis�e
	 */
	public static Colocation serializeColocation(Colocation colocation) {
		Colocation c = new Colocation();
		c.setId(colocation.getId());
		c.setName(colocation.getName());
		return c;
	}
	
	/**
	 * V�rifie qu'un utilisateur fait partie d'une colocation
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
	 * Renvoie les membres d'une colocation � partir de son identifiant
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
	 * Renvoie les services non effectu�s d'une colocation
	 * 
	 * @param c
	 * 	La colocation
	 * @return les services non effectu�s
	 */
	public static ArrayList<Service> getColocationUnachievedServices(Colocation c) {
		ArrayList<Service> services = new ArrayList<Service>();
		for (Service s : c.getServices()) {
			if (!s.getAchieved()) services.add(s);
		}
		return services;
	}
	
	
	/**
	 * V�rifie que l'utilisateur qui a envoy� l'inivtation est celui pass� en param�tre
	 * 
	 * @param u
	 * 	L'utilisateur
	 * @param i
	 * 	L'invitation
	 * @return vrai si l'utilisateur a envoy� l'invitation, faux sinon
	 */
	public static boolean isInvitationOwner(User u, Invitation i) {
		return i.getUser().getLogin().equals(u.getLogin());
	}
	
	/**
	 * V�rifie que l'utilisateur a re�u une invitation � rejoindre la colocation
	 * 
	 * @param u
	 * 	L'utilisateur
	 * @param c
	 * 	La colocation
	 * @return vrai si l'utilisateur a re�u une invitation � rejoindre la colocation, faux sinon
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
	 * V�rifie que l'utilisateur a envoy� le message
	 * 
	 * @param u
	 * 	L'utilisateur
	 * @param m
	 * 	Le message
	 * @return vrai si l'utilisateur a envoy� le message, faux sinon
	 */
	public static boolean isMessageOwner(User u, Message m) {
		return m.getAuteur().getLogin().equals(u.getLogin());
	}
	
	
	/**
	 * S�rialise un service
	 * 
	 * @param service
	 * 	Le service
	 * @return le service s�rialis�
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
	 * V�rifie que l'utilisateur est un b�nficiaire du service effectu�
	 * 
	 * @param u
	 * 	L'utilisateur
	 * @param as
	 * 	Le service effectu�
	 * @return vrai si l'utilisateur est un b�nficiaire du service effectu�, faux sinon
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
	 * Renvoie la liste des services effectu�s dans une colocation
	 * 
	 * @param c
	 * 	La colocation
	 * @return les services effectu�s dans la colocation
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
