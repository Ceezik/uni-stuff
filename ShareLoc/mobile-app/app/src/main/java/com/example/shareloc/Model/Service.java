package com.example.shareloc.Model;

/**
 * La classe service représente un service d'une colocation.
 * Il est définit par un identifiant unique, un titre, un coût, une description et son état
 */
public class Service {

    /**
     * Identifiant unique
     */
    private Long id;
    /**
     * Titre
     */
    private String title;
    /**
     * Coût en points
     */
    private int cost;
    /**
     * Description du service
     */
    private String description;
    /**
     * Etat d'acceptation
     */
    private Boolean accepted;

    /**
     * Constructeur
     * @param id Id du service
     * @param title Titre du service
     * @param cost Coût en points
     * @param description Description de la tâche
     * @param accepted Etat d'acceptation
     */
    public Service(Long id, String title, int cost, String description, Boolean accepted) {
        this.id = id;
        this.title = title;
        this.cost = cost;
        this.description = description;
        this.accepted = accepted;
    }

    /**
     * Retourne l'id unique
     * @return Id du service
     */
    public Long getId() { return id; }

    /**
     * Modifie l'id du service
     * @param id Nouvel id
     */
    public void setId(Long id) { this.id = id; }

    /**
     * Retourne l'id unique
     * @return Id du service
     */
    public String getTitle() { return title; }

    /**
     * Modifie le titre du service
     * @param title Nouveau titre
     */
    public void setTitle(String title) { this.title = title; }

    /**
     * Retourne le coût du service
     * @return Coût
     */
    public int getCost() { return cost; }

    public void setCost(int cost) { this.cost = cost; }

    /**
     * Retourne la description du service
     * @return Description
     */
    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    /**
     * Retourne l'état du service
     * @return Etat
     */
    public Boolean isAccepted() { return accepted; }

    public void setAccepted(Boolean accepted) { this.accepted = accepted; }
}
