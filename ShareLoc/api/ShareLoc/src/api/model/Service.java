package api.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import api.utils.Utils;

@Entity
@Table(name="service")
/**
 * Représente un service
 */
public class Service {

	@Id
	@TableGenerator(name="service_id", allocationSize=1, initialValue=1)
    @GeneratedValue(strategy=GenerationType.TABLE, generator="service_id")
	/**
	 * Identifiant unique et et auto-généré
	 */
	private Long id;
	@ManyToOne
	@JoinColumn(nullable=false)
	@JsonBackReference
	/**
	 * Colocation
	 */
	private Colocation colocation;
	@Column(nullable=false)
	/**
	 * Titre
	 */
	private String title;
	@Lob
	/**
	 * Description
	 */
	private String description;
	@Column(nullable=false)
	/**
	 * Coût
	 */
	private int cost;
	/**
	 * Si le service a été accepté ou non
	 */
	private Boolean accepted;
	/**
	 * Si le service va être supprimé ou non
	 */
	private Boolean deleted;
	@OneToMany(mappedBy="service", cascade=CascadeType.PERSIST, orphanRemoval=true)
	@JsonManagedReference
	/**
	 * Votes pour la validation
	 */
	private Set<VoteService> votes;
	@OneToMany(mappedBy="service", cascade=CascadeType.PERSIST, orphanRemoval=true)
	@JsonManagedReference
	/**
	 * Votes pour la suppression
	 */
	private Set<VoteDeleteService> deleteVotes;
	/**
	 * S'il a été effectué ou non
	 */
	private Boolean achieved;
	
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return id;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public int getCost() {
		return cost;
	}
	
	public void setCost(int cost) {
		this.cost = cost;
	}
	
	public Boolean getAccepted() {
		return accepted;
	}
	
	public void setAccepted(Boolean accepted) {
		this.accepted = accepted;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public Set<VoteService> getVotes() {
		return votes;
	}

	public void addVote(VoteService vote) {
		this.votes.add(vote);
	}
	
	public Set<VoteDeleteService> getDeleteVotes() {
		return deleteVotes;
	}
	
	public void addDeleteVote(VoteDeleteService vote) {
		this.deleteVotes.add(vote);
	}

	public Colocation getColocation() {
		return Utils.serializeColocation(colocation);
	}

	public void setColocation(Colocation colocation) {
		this.colocation = colocation;
	}

	public Boolean getAchieved() {
		return achieved;
	}

	public void setAchieved(Boolean achieved) {
		this.achieved = achieved;
	}
	
}
