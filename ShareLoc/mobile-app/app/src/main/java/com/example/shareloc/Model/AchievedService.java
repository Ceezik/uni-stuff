package com.example.shareloc.Model;

import java.util.ArrayList;
import java.util.Date;

/**
 * La classe service représente un service effectué d'une colocation.
 * Il est définit par un identifiant unique, un titre, un coût, son état, sa date d'exécution, son auteur et ses bénéficiaires
 */
public class AchievedService {

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
     * Etat du service effectué
     */
    private Boolean valid;
    /**
     * Date du service effectué
     */
    private Date doneAt;
    /**
     * Nom de l'auteur
     */
    private String from;
    /**
     * Bénéficiaires
     */
    private ArrayList<User> to;

    /**
     * Constructeur
     * @param id Id du service effectué
     * @param title Titre du service effectué
     * @param valid Etat du service effectué
     * @param doneAt Date du service effectué
     * @param from Auteur du service
     * @param to Beneficiaires
     */
    public AchievedService(Long id, String title, Boolean valid, Date doneAt, String from, ArrayList<User> to) {
        this.id = id;
        this.title = title;
        this.valid = valid;
        this.doneAt = doneAt;
        this.from = from;
        this.to = to;
    }

    /**
     * Constructeur
     * @param id Id du service effectué
     * @param title Titre du service effectué
     * @param cost Coût du service effectué
     * @param valid Etat du service effectué
     * @param doneAt Date du service effectué
     * @param from Auteur du service
     * @param to Beneficiaires
     */
    public AchievedService(Long id, String title, int cost, Boolean valid, Date doneAt, String from, ArrayList<User> to) {
        this.id = id;
        this.title = title;
        this.cost = cost;
        this.valid = valid;
        this.doneAt = doneAt;
        this.from = from;
        this.to = to;
    }

    /**
     * Retourne l'id unique
     * @return Id du service effectué
     */
    public Long getId() { return id; }

    /**
     * Modifie l'id du service
     * @param id Nouvel id
     */
    public void setId(Long id) { this.id = id; }

    /**
     * Retourne le titre
     * @return Titre
     */
    public String getTitle() { return title; }

    /**
     * Modifie le titre du service
     * @param id Nouveau titre
     */
    public void setTitle(String title) { this.title = title; }

    /**
     * Retourne le coût en points
     * @return Coût
     */
    public int getCost() { return cost; }

    /**
     * Modifie le coût du service
     * @param id Nouveau coût
     */
    public void setCost(int cost) { this.cost = cost; }

    /**
     * Retourne l'état du service
     * @return Etat
     */
    public Boolean getValid() { return valid; }

    /**
     * Modifie l'état du service
     * @param id Nouvel état
     */
    public void setValid(Boolean valid) { this.valid = valid; }

    /**
     * Retourne la date du service
     * @return Date du service
     */
    public Date getDoneAt() { return doneAt; }

    /**
     * Modifie la date de réalisation du service
     * @param id Nouvelle date
     */
    public void setDoneAt(Date doneAt) { this.doneAt = doneAt; }

    /**
     * Retourne l'auteur du service
     * @return Auteur
     */
    public String getFrom() { return from; }

    /**
     * Modifie l'auteur du service
     * @param id Nouvel auteur
     */
    public void setFrom(String from) { this.from = from; }

    /**
     * Retourne les bénéficiaires du service
     * @return Bénéficiaires
     */
    public ArrayList<User> getTo() { return to; }

    /**
     * Modifie les bénéficiaires du service
     * @param id Nouveaux bénéficiaries
     */
    public void setTo(ArrayList<User> to) { this.to = to; }

}
