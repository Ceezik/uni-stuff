package com.example.shareloc.Model;

import java.util.Date;

/**
 * La classe Message représente un message envoyé dans une colocation.
 * Il est définit par un identifiant unique, un message, son auteur et la date d'envoi
 */
public class Message {

    /**
     * Id unique du message
     */
    private Long id;
    /**
     * Message envoyé
     */
    private String message;
    /**
     * Auteur du message
     */
    private User sender;
    /**
     * Date et heure d'envoi
     */
    private Date createdAt;

    /**
     * Constructeur
     * @param id Identifiant unique
     * @param message Texte envoyé
     * @param sender Auteur du message
     * @param createdAt Date et heure d'envoi
     */
    public Message(Long id, String message, User sender, Date createdAt) {
        this.id = id;
        this.message = message;
        this.sender = sender;
        this.createdAt = createdAt;
    }

    /**
     * Retourne l'id du message
     * @return Id du message
     */
    public Long getId() { return id; }

    /**
     * Modifie l'id du message
     * @param id Nouvel id
     */
    public void setId(Long id) { this.id = id; }

    /**
     * Retourne le texte du message
     * @return Texte du message
     */
    public String getMessage() { return message; }

    /**
     * Modifie le texte du message
     * @param message Nouveau message
     */
    public void setMessage(String message) { this.message = message; }

    /**
     * Retourne l'auteur du message
     * @return Auteur du message
     */
    public User getSender() { return sender; }

    public void setSender(User sender) { this.sender = sender; }

    /**
     * Retourne la date et l'heure d'envoi
     * @return Date et heure d'envoi
     */
    public Date getCreatedAt() { return createdAt; }

    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

}
