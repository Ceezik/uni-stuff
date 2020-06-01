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
@Table(name="vote_achieved_service", uniqueConstraints={@UniqueConstraint(columnNames={"user_login", "achieved_service_id"})})
/**
 * Représente un vote pour la validation d'un service effectué
 */
public class VoteAchievedService {
	
	@Id
	@TableGenerator(name="vote_achieved_service_id", allocationSize=1, initialValue=1)
    @GeneratedValue(strategy=GenerationType.TABLE, generator="vote_achieved_service_id")
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
	 * Service effectué concerné par le vote
	 */
	private AchievedService service;
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

	public void setService(AchievedService service) {
		this.service = service;
	}

	public boolean isAgree() {
		return agree;
	}
	
	public void setAgree(boolean agree) {
		this.agree = agree;
	}
	
}
