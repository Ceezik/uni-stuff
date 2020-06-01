package api.model;

import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Table(name="colocation")
/**
 * Représente une colocation
 */
public class Colocation {
	
	@Id
	@TableGenerator(name="colocation_id", allocationSize=1, initialValue=1)
    @GeneratedValue(strategy=GenerationType.TABLE, generator="colocation_id")
	/**
	 * Identifiant unique et auto-généré
	 */
    private Long id;
	@Column(nullable=false)
	/**
	 * Nom
	 */
	private String name;
	@OneToMany(mappedBy="colocation", cascade=CascadeType.PERSIST, orphanRemoval=true)
	@JsonManagedReference
	/**
	 * Membres de la colocatiob
	 */
	private Set<Membre> membres;
	@OneToMany(mappedBy="colocation", cascade=CascadeType.PERSIST, orphanRemoval=true)
	@JsonManagedReference
	/**
	 * Messages envoyés dans la colocation
	 */
	private Set<Message> messages;
	@OneToMany(mappedBy="colocation", cascade=CascadeType.PERSIST, orphanRemoval=true)
	@JsonManagedReference
	/**
	 * Services
	 */
	private Set<Service> services;
	
	
	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return this.id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public Set<Membre> getMembres() {
		return membres;
	}

	public void addMembre(Membre membre) {
		this.membres.add(membre);
	}

	public Set<Message> getMessages() {
		return messages;
	}

	public void addMessage(Message message) {
		this.messages.add(message);
	}	
	
	public void removeMessage(Message message) {
		this.messages.remove(message);
	}
	
	public Set<Service> getServices() {
		return services;
	}

	public void addService(Service service) {
		this.services.add(service);
	}	
	
	public void removeService(Service service) {
		this.services.remove(service);
	}
	
}
