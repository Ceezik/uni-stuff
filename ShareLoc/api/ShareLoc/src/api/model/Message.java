package api.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonBackReference;

import api.utils.Utils;

@Entity
@Table(name="message")
/**
 * Représente un message
 */
public class Message {
	
	@Id
	@TableGenerator(name="message_id", allocationSize=1, initialValue=1)
    @GeneratedValue(strategy=GenerationType.TABLE, generator="message_id")
	/**
	 * Identifiant unique et auto-généré
	 */
	private Long id;
	@Column(nullable=false)
	@Temporal(TemporalType.TIMESTAMP)
	/**
	 * Date d'envoi
	 */
	private Date createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	/**
	 * Date de modification
	 */
	private Date updatedAt;
	@Lob
	@Column(nullable=false)
	/**
	 * Texte du message
	 */
	private String message;
	@ManyToOne
	@JoinColumn(nullable=false)
	/**
	 * Utilisateur ayant envoyé le message
	 */
	private User auteur;
	@ManyToOne
	@JoinColumn(nullable=false)
	@JsonBackReference
	/**
	 * Colocation dans laquelle le message a été envoyé
	 */
	private Colocation colocation;
	
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public User getAuteur() {
		return Utils.serializeUser(this.auteur);
	}
	
	public void setAuteur(User auteur) {
		this.auteur = auteur;
	}
	
	public Colocation getColocation() {
		return Utils.serializeColocation(this.colocation);
	}
	
	public void setColocation(Colocation colocation) {
		this.colocation = colocation;
	}
	
}
