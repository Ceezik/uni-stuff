package api.controllers;

import java.util.List;

import api.dao.DAOService;
import api.model.Colocation;
import api.model.Service;

/**
 * Classe gérant les services
 */
public class ServiceManager {
	/**
	 * Liaison vers la base de données
	 */
	static DAOService daoService = new DAOService();
	
	/**
	 * Renvoie tous les services
	 * 
	 * @return tous les services
	 */
	public static List<Service> getAll() {
		return daoService.findAll();
	}
	
	/**
	 * Crée un service
	 * 
	 * @param s
	 * 	Le service
	 * @param c
	 * 	La colocation à laquelle il appartient
	 * @return le service créé
	 */
	public static Service create(Service s, Colocation c) {
		s.setAccepted(null);
		s.setDeleted(null);
		s.setAchieved(false);
		s.setColocation(c);
		c.addService(s);
		daoService.create(s);
		return s;
	}
	
	/**
	 * Renvoie un service à partir d'un identifiant
	 * 
	 * @param id
	 *	L'identifiant
	 * @return le service
	 */
	public static Service getById(Long id) {
		return daoService.find(id);
	}
	
	/**
	 * Modifie un service
	 * 
	 * @param s
	 * 	Le service à modifier
	 * @param service
	 * 	Le service modifié
	 */
	public static void update(Service s, Service service) {
		s.setCost(service.getCost());
		s.setDescription(service.getDescription());
		s.setTitle(service.getTitle());
		daoService.edit(s);
	}
	
	/**
	 * Modifie un service
	 * 
	 * @param s
	 * 	Le service
	 */
	public static void update(Service s) {
		daoService.edit(s);
	}
	
	/**
	 * Supprime un service
	 * 
	 * @param s
	 * 	Le service
	 */
	public static void delete(Service s) {
		daoService.remove(s);
	}
	
}
