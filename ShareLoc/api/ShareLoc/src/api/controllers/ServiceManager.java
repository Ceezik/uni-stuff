package api.controllers;

import java.util.List;

import api.dao.DAOService;
import api.model.Colocation;
import api.model.Service;

/**
 * Classe g�rant les services
 */
public class ServiceManager {
	/**
	 * Liaison vers la base de donn�es
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
	 * Cr�e un service
	 * 
	 * @param s
	 * 	Le service
	 * @param c
	 * 	La colocation � laquelle il appartient
	 * @return le service cr��
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
	 * Renvoie un service � partir d'un identifiant
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
	 * 	Le service � modifier
	 * @param service
	 * 	Le service modifi�
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
