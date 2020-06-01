package com.example.shareloc.Model;

/**
 * La classe Invitation représente une invitation à rejoindre une colocation envoyée par un gestionnaire à un utilisateur de l'appli.
 * Elle est définit par un id automatique, le username de l'invité et la colocation à laquelle il est invité.
 */
public class Invitation {

    /**
     * Identifiant unique de l'invitation
     */
    private Long id;
    /**
     * Username de l'invité
     */
    private String userName;
    /**
     * Nom de la colocation à laquelle l'invitation est ratachée
     */
    private String colocationName;

    /**
     * Constructeur
     * @param id Identifiant de l'invitation
     * @param userName Username de l'invité
     * @param colocationName Nom de la colocation
     */
    public Invitation(Long id, String userName, String colocationName) {
        this.id = id;
        this.userName = userName;
        this.colocationName = colocationName;
    }

    /**
     * Retourne l'id de l'invitation
     * @return Id de l'invitation
     */
    public Long getId() { return id; }

    /**
     * Modifie l'id de l'invitation
     * @param id Nouvel id
     */
    public void setId(Long id) { this.id = id; }

    /**
     * Retourne le username de l'invité
     * @return Username de l'invité
     */
    public String getUserName() { return userName; }

    public void setUserName(String userName) { this.userName = userName; }

    /**
     * Retourne le nom de la colocation
     * @return Nom de la colocation
     */
    public String getColocationName() { return colocationName; }

    public void setColocationName(String colocationName) { this.colocationName = colocationName; }

}
