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
@Table(name="invitation", uniqueConstraints={@UniqueConstraint(columnNames={"user_login", "colocation_id"})})
/**
 * Repr�sente une invitation � rejoindre une colocation
 */
public class Invitation {
	
	@Id
	@TableGenerator(name="invitation_id", allocationSize=1, initialValue=1)
    @GeneratedValue(strategy=GenerationType.TABLE, generator="invitation_id")
	/**
	 * Identifiant unique et auto-g�n�r�
	 */
	private Long id;
	@ManyToOne
	@JoinColumn(nullable=false)
	@JsonBackReference
	/**
	 * Utilisateur invit�
	 */
	private User user;
	@ManyToOne
	@JoinColumn(nullable=false)
	/**
	 * Utilisateur ayant envoy� l'invitation
	 */
	private User from;
	@ManyToOne
	@JoinColumn(nullable=false)
	/**
	 * Colocation dans laquelle l'utilisateur est invit�
	 */
	private Colocation colocation;
	/**
	 * Si l'invitation a �t� accept�e ou non
	 */
	private Boolean accepted;
	
	
	public Long getId() {
		return id;
	}
	
	public User getUser() {
		return Utils.serializeUser(user);
	}
	
	public void setUser(User user) {
		this.user = user;
	}

	public User getFrom() {
		return Utils.serializeUser(from);
	}

	public void setFrom(User from) {
		this.from = from;
	}

	public Colocation getColocation() {
		return Utils.serializeColocation(colocation);
	}

	public void setColocation(Colocation colocation) {
		this.colocation = colocation;
	}

	public Boolean getAccepted() {
		return accepted;
	}

	public void setAccepted(Boolean accepted) {
		this.accepted = accepted;
	}

}
