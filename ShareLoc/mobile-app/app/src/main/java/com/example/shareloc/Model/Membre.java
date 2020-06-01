package com.example.shareloc.Model;

/**
 * La classe Membre représente un membre d'une colocation.
 * Il est définit par un identifiant unique, le login et le nom complet de l'utilisateur, le nombre de points qu'il possède et un booléen
 * permettant de savoir s'il est le gestionnaire ou non de la colocation
 */
public class Membre {

    /**
     * Identifiant unique du membre
     */
    private Long id;
    /**
     * Login de l'utilisateur
     */
    private String login;
    /**
     * Nom complet de l'utilisateur
     */
    private String fullname;
    /**
     * Nombre de points que l'utilisateur possède dans la colocation
     */
    private int points;
    /**
     * false si le membre est un membre classique, true s'il est le gestionnaire
     */
    private boolean estGestionnaire;

    /**
     * Constructeur
     * @param id Identifiant unique du membre
     * @param login Login de l'utilisateur
     * @param fullname Nom complet de l'utilisateur
     * @param points Nombre de points de l'utilisateur
     * @param estGestionnaire Est gestionnaire ou non
     */
    public Membre(Long id, String login, String fullname, int points, boolean estGestionnaire) {
        this.id = id;
        this.login = login;
        this.fullname = fullname;
        this.points = points;
        this.estGestionnaire = estGestionnaire;
    }

    /**
     * Retourne l'id du membre
     * @return Id du membre
     */
    public Long getId() { return id; }

    /**
     * Modifie l'id du membre
     * @param id Nouvel id
     */
    public void setId(Long id) { this.id = id; }

    /**
     * Retourne le login du membre
     * @return Login du membre
     */
    public String getLogin() { return login; }

    /**
     * Modifie le login du membre
     * @param login nouveau login
     */
    public void setLogin(String login) { this.login = login; }

    /**
     * Retourne le nom complet du membre
     * @return Nom complet du membre
     */
    public String getFullname() { return fullname; }

    public void setFullname(String fullname) { this.fullname = fullname; }

    /**
     * Retourne les points du membre
     * @return Nombre de points
     */
    public int getPoints() { return points; }

    public void setPoints(int points) { this.points = points; }

    /**
     * Retourne true si le membre est le gestionnaire
     * @return true si gestionnaire, false sinon
     */
    public boolean estGestionnaire() { return estGestionnaire; }

    public void setEstGestionnaire(boolean estGestionnaire) { this.estGestionnaire = estGestionnaire; }

    @Override
    public String toString() {
        return fullname + " <" + login + ">";
    }

}
