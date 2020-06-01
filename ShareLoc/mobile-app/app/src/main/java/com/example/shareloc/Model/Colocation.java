package com.example.shareloc.Model;

/**
 * La classe Colocation représente une colocation dans l'application.
 * Elle est définit par un id attribué automatiquement, un nom et un nombre de membres.
 */
public class Colocation {

    /**
     * Identifiant unique de la colocation
     */
    private Long id;

    /**
     * Nom de la colocation
     */
    private String name;

    /**
     * Nombre de membres dans la colocation
     */
    private int nbMembers;

    /**
     * Constructeur
     * @param id Identifiant de la colocation
     * @param name Nom de la colocation
     * @param nbMembers Nombre de membres actuellement dans la colocation
     */
    public Colocation(Long id, String name, int nbMembers) {
        this.id = id;
        this.name = name;
        this.nbMembers = nbMembers;
    }

    /**
     * Retourne l'id de la colocation
     * @return Id de la colocation
     */
    public Long getId() {
        return id;
    }

    /**
     * Modifie l'id de la colocation
     * @param id Nouvel id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Retourne le nom de la colocation
     * @return Nom de la colocation
     */
    public String getName() {
        return name;
    }

    /**
     * Modifie le nom de la colocation
     * @param name Nouveau nom
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Retourne le nombre de membres
     * @return Nombre de membres de la colocation
     */
    public int getNbMembers() {
        return nbMembers;
    }

    public void setNbMembers(int nbMembers) {
        this.nbMembers = nbMembers;
    }
}
