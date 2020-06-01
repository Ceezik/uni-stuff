package com.example.shareloc.Model;

/**
 * La classe User représente un utilisateur de ShareLoc.
 * Il est définit par son login (une adresse mail), son nom et son prénom
 */
public class User {

    /**
     * Login de l'utilisateur (une adresse mail)
     */
    private String login;
    /**
     * Prénom de l'utilisateur
     */
    private String firstname;
    /**
     * Nom de l'utilisateur
     */
    private String lastname;

    /**
     * Constructeur
     * @param login Adresse mail de l'utilisateur
     * @param firstname Prénom de l'utilisateur
     * @param lastname Nom de l'utilisateur
     */
    public User(String login, String firstname, String lastname) {
        this.login = login;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    /**
     * Retourne le login de l'utilisateur
     * @return Login de l'utilisateur
     */
    public String getLogin() { return login; }

    /**
     * Modifie le login de l'utilisateur
     * @param login Nouveau login
     */
    public void setLogin(String login) { this.login = login; }

    /**
     * Retoune le prénom de l'utilisateur
     * @return Prénom de l'utilisateur
     */
    public String getFirstname() { return firstname; }

    /**
     * Modifie le prénom de l'utilisateur
     * @param firstname Nouveau prénom
     */
    public void setFirstname(String firstname) { this.firstname = firstname; }

    /**
     * Retourne le nom de l'utilisateur
     * @return Nom de l'utilisateur
     */
    public String getLastname() { return lastname; }

    /**
     * Modifie le nom de l'utilisateur
     * @param lastname Nom de l'utilisateur
     */
    public void setLastname(String lastname) { this.lastname = lastname; }

    /**
     * Renvoie l'utilisateur sous la forme d'une chaîne de caractère
     * @return Utilisateur sous la forme : Nom Prénom <login>
     */
    @Override
    public String toString() {
        return firstname + " " + lastname + " <" + login + ">";
    }

}
