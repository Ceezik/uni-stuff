package api.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Table(name="user")
/**
 * Représente un utilisateur
 */
public class User {
	
	@Id
	@Column(length=50, nullable=false)
	/**
	 * Adresse mail unique
	 */
	private String login;
	@Column(nullable=false)
	/**
	 * Mot de passe
	 */
	private String password;
	/**
	 * Nom
	 */
	private String lastname;
	/**
	 * Prénom
	 */
	private String firstname;
	@OneToMany(mappedBy="membre", cascade=CascadeType.PERSIST, orphanRemoval=true)
	@JsonManagedReference
	/**
	 * Colocations dont il fait partie
	 */
	private Set<Membre> colocations;
	@OneToMany(mappedBy="user", cascade=CascadeType.PERSIST, orphanRemoval=true)
	@JsonManagedReference
	/**
	 * Invitations à rejoindre une colocation
	 */
	private Set<Invitation> invitations;


	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public Set<Membre> getColocations() {
		return colocations;
	}

	public void addColocation(Membre colocation) {
		this.colocations.add(colocation);
	}
	
	public void setColocations(Set<Membre> colocations) {
		this.colocations = colocations;
	}
	
	public Set<Invitation> getInvitations() {
		return invitations;
	}
	
	public void addInvitation(Invitation i) {
		this.invitations.add(i);
	}
	
	public void removeInivtation(Invitation i) {
		this.invitations.remove(i);
	}
}
