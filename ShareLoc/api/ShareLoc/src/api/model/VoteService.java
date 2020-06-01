package api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonBackReference;

import api.utils.Utils;

@Entity
@Table(name="vote_service", uniqueConstraints={@UniqueConstraint(columnNames={"user_login", "service_id"})})
/**
 * Représente un vote pour la validation d'un service
 */
public class VoteService {

	@Id
	@TableGenerator(name="vote_service_id", allocationSize=1, initialValue=1)
    @GeneratedValue(strategy=GenerationType.TABLE, generator="vote_service_id")
	/**
	 * Identifiant unique et auto-généré
	 */
	private Long id;
	@ManyToOne
	@JoinColumn(nullable=false)
	/**
	 * Utilisateur ayant voté
	 */
	private User user;
	@ManyToOne
	@JoinColumn(nullable=false)
	@JsonBackReference
	/**
	 * Service concerné par le vote
	 */
	private Service service;
	/**
	 * Pour ou contre la validation
	 */
	private boolean agree;
	
	
	public Long getId() {
		return id;
	}
	
	public User getUser() {
		return Utils.serializeUser(user);
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public Long getService() {
		return service.getId();
	}
	
	public void setService(Service service) {
		this.service = service;
	}
	
	public boolean isAgree() {
		return agree;
	}
	
	public void setAgree(boolean agree) {
		this.agree = agree;
	}
	
}
