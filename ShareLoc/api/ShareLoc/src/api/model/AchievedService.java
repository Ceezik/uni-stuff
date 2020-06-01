package api.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.TableGenerator;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="achieved_service", uniqueConstraints={@UniqueConstraint(columnNames={"service_id"})})
/**
 * Représente un service effectué
 */
public class AchievedService {

	@Id
	@TableGenerator(name="achieved_service_id", allocationSize=1, initialValue=1)
    @GeneratedValue(strategy=GenerationType.TABLE, generator="achieved_service_id")
	/**
	 * Identifiant unique et auto-généré
	 */
	private Long id;
	@ManyToOne
	@JoinColumn(nullable=false)
	/**
	 * Le service effectué
	 */
	private Service service;
	@ManyToOne
	@JoinColumn(nullable=false)
	/**
	 * Le membre ayant effectué le service
	 */
	private Membre from;
	@OneToMany(cascade=CascadeType.PERSIST)
	/**
	 * La liste des bénéficiaires
	 */
	private Set<Membre> to;
	@OneToMany(mappedBy="service", cascade=CascadeType.PERSIST, orphanRemoval=true)
	@JsonManagedReference
	/**
	 * Les votes pour la validation
	 */
	private Set<VoteAchievedService> votes;
	/**
	 * S'il est validé ou non
	 */
	private Boolean valid;
	@Column(nullable=false)
	@Temporal(TemporalType.TIMESTAMP)
	/**
	 * La date à laquelle il a été effectué
	 */
	private Date doneAt;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Service getService() {
		return service;
	}
	
	public void setService(Service service) {
		this.service = service;
	}
	
	public Membre getFrom() {
		return from;
	}
	
	public void setFrom(Membre from) {
		this.from = from;
	}
	
	public Set<Membre> getTo() {
		return to;
	}
	
	public void setTo(Set<Membre> to) {
		this.to = to;
	}
	
	public Set<VoteAchievedService> getVotes() {
		return votes;
	}
	
	public void addVote(VoteAchievedService vote) {
		this.votes.add(vote);
	}
	
	public Boolean getValid() {
		return valid;
	}
	
	public void setValid(Boolean valid) {
		this.valid = valid;
	}
	
	public Date getDoneAt() {
		return doneAt;
	}
	
	public void setDoneAt(Date doneAt) {
		this.doneAt = doneAt;
	}
	
}
