package api.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

/**
 * Classe gérant les liaisons avec la base de données
 *
 * @param <T> la classe de l'objet métier
 */
public abstract class DAOAbstractFacade<T> {

	/**
	 * Factory de l'entity manager
	 */
	static EntityManagerFactory emfactory = Persistence.createEntityManagerFactory("ShareLoc");
	/**
	 * L'entity manager
	 */
	static EntityManager em = null;
	/**
	 * La classe de l'objet métier
	 */
	private Class<T> classeEntite;

	/**
	 * Constructeur
	 * 
	 * @param classeEntite
	 *            La classe de l'objet metier
	 */
	public DAOAbstractFacade(Class<T> classeEntite) {
		this.classeEntite = classeEntite;
	}

	/**
	 * Methode abstraite a definir dans chaque sous-classe qui renvoie
	 * l'EntityManager correspondant a la classe.
	 * 
	 * @return l'entity manager
	 */
	protected EntityManager getEntityManager() {
		if (em == null)
			em = emfactory.createEntityManager();
		return em;
	}
	/**
	 * Methode de creation d'un objet (ajout dans la base).
	 * 
	 * @param entite
	 */
	public T create(T entite) {
		if(!getEntityManager().getTransaction().isActive())
			getEntityManager().getTransaction().begin();
		getEntityManager().persist(entite);
		getEntityManager().flush();
		getEntityManager().getTransaction().commit();
		return entite;
	}

	/**
	 * Methode de modification d'un objet.
	 * 
	 * @param entite
	 */
	public void edit(T entite) {
		if(!getEntityManager().getTransaction().isActive())
			getEntityManager().getTransaction().begin();
		getEntityManager().merge(entite);
		getEntityManager().getTransaction().commit();
	}

	/**
	 * Methode de suppression d'un objet.
	 * 
	 * @param entite
	 */
	public void remove(T entite) {
		if(!getEntityManager().getTransaction().isActive())
			getEntityManager().getTransaction().begin();
		getEntityManager().remove(getEntityManager().merge(entite));
		getEntityManager().getTransaction().commit();
	}

	/**
	 * Methode de recherche d'un objet a partir de son identifiant.
	 * 
	 * @param id
	 * @return l'objet
	 */
	public T find(Object id) {
		return getEntityManager().find(classeEntite, id);
	}

	/**
	 * Methode recherchant tous les objets de ce type.
	 * 
	 * @return la liste des objets 
	 */
	public List<T> findAll() {
		CriteriaQuery<T> cq = getEntityManager().getCriteriaBuilder().createQuery(classeEntite);
		cq.select(cq.from(classeEntite));
		Vector<T> v = (Vector<T>) getEntityManager().createQuery(cq).getResultList();
		if (v!=null)
			return new ArrayList<T>(v);
		return null;
	}

	/**
	 * Methode renvoyant les n objets de ce type compris dans l'intervalle passée
	 * en parametre (utile pour la pagination des resultats).
	 * 
	 * @param etendue
	 * @return les n objets
	 */
	public List<T> findRange(int[] etendue) {
		CriteriaQuery<T> cq = getEntityManager().getCriteriaBuilder().createQuery(classeEntite);
		cq.select(cq.from(classeEntite));
		Query q = getEntityManager().createQuery(cq);
		q.setMaxResults(etendue[1] - etendue[0]);
		q.setFirstResult(etendue[0]);
		return q.getResultList();
	}

	/**
	 * Methode renvoyant le nombre d'objet de ce type.
	 * 
	 * @return le nombre d'objets
	 */
	public int count() {
		CriteriaQuery<Object> cq = getEntityManager().getCriteriaBuilder().createQuery();
		Root<T> rt = cq.from(classeEntite);
		cq.select(getEntityManager().getCriteriaBuilder().count(rt));
		Query q = getEntityManager().createQuery(cq);
		return ((Long) q.getSingleResult()).intValue();
	}
}
