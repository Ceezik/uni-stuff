package api.model;

import javax.persistence.Column;
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
@Table(name="membre", uniqueConstraints={@UniqueConstraint(columnNames={"membre_login", "colocation_id"})})
/**
 * Représente un utilisateur faisant partie d'une colocation
 */
public class Membre {

	@Id
	@TableGenerator(name="membre_id", allocationSize=1, initialValue=1)
    @GeneratedValue(strategy=GenerationType.TABLE, generator="membre_id")
	/**
	 * Identifiant unique et auto-généré
	 */
	private Long id;
	@ManyToOne
	@JoinColumn(nullable=false)
	@JsonBackReference
	/**
	 * L'utilisateur
	 */
	private User membre;
	@ManyToOne
	@JoinColumn(nullable=false)
	@JsonBackReference
	/**
	 * La colocation
	 */
	private Colocation colocation;
	@Column(nullable=false)
	/**
	 * Le nombre de points
	 */
	private int points;
	@Column(nullable=false)
	/**
	 * Si le membre est gestionnaire de la colocation ou non
	 */
	private boolean estGestionnaire;
	
	
	public Membre() {}
	
	public Membre(Colocation colocation, User membre, boolean estGestionnaire) {
		this.membre = membre;
		this.colocation = colocation;
		this.points = 100;
		this.estGestionnaire = estGestionnaire;
	}
	
	public Long getId() {
		return id;
	}

	public User getMembre() {
		return Utils.serializeUser(this.membre);
	}
	
	public void setMembre(User membre) {
		this.membre = membre;
	}
	
	public Colocation getColocation() {
		return Utils.serializeColocation(this.colocation);
	}
	
	public void setColocation(Colocation colocation) {
		this.colocation = colocation;
	}
	
	public int getPoints() {
		return points;
	}
	
	public void addPoints(int points) {
		if (this.points + points > 0) {
			this.points += points;
		} 
		else {
			this.points = 0;
		}
	}

	public boolean getEstGestionnaire() {
		return estGestionnaire;
	}

	public void setEstGestionnaire(boolean estGestionnaire) {
		this.estGestionnaire = estGestionnaire;
	}
}
