package com.example.shareloc.Utils;

import android.content.Context;

import com.example.shareloc.R;
import com.google.android.material.textfield.TextInputLayout;

/**
 * La classe FormValidator regroupe toutes les méthodes de vérification de bon remplissage des formulaires
 */
public class FormValidator {
    /**
     * Contexte d'utilisation
     */
    private final Context mContext;

    /**
     * Constructeur
     * @param context Contexte d'utilisation
     */
    public FormValidator(Context context) {
        this.mContext = context;
    }

    /**
     * Vérifie si le formulaire de connexion est bien rempli.
     * @param login Login  de l'utilisateur
     * @param password Mot de passe utilisé
     * @return True si le formulaire est bien rempli, faux sinon
     */
    public boolean signinFormIsValid(TextInputLayout login, TextInputLayout password) {
        boolean isValid = true;

        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(login.getEditText().getText()).matches()) {
            login.setError(mContext.getResources().getString(R.string.input_login_error));
            isValid = false;
        } else {
            login.setError(null);
        }

        if (password.getEditText().getText().length() < 6) {
            password.setError(mContext.getResources().getString(R.string.input_password_error));
            isValid = false;
        } else {
            password.setError(null);
        }

        return isValid;
    }

    /**
     * Vérifie si le formulaire de création d'un compte est bien rempli
     * @param firstname Prénom de l'utilisateur
     * @param lastname Nom de l'utilisateur
     * @param login Login de l'utilisateur (mail)
     * @param password Mot de passe au choix
     * @return True si le formulaire est bien rempli, faux sinon
     */
    public boolean signupFormIsValid(TextInputLayout firstname, TextInputLayout lastname,
                                     TextInputLayout login, TextInputLayout password) {
        boolean isValid = true;

        if (firstname.getEditText().getText().length() < 3) {
            firstname.setError(mContext.getResources().getString(R.string.input_firstname_error));
            isValid = false;
        } else {
            firstname.setError(null);
        }

        if (lastname.getEditText().getText().length() < 3) {
            lastname.setError(mContext.getResources().getString(R.string.input_lastname_error));
            isValid = false;
        } else {
            lastname.setError(null);
        }

        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(login.getEditText().getText()).matches()) {
            login.setError(mContext.getResources().getString(R.string.input_login_error));
            isValid = false;
        } else {
            login.setError(null);
        }

        if (password.getEditText().getText().length() < 6) {
            password.setError(mContext.getResources().getString(R.string.input_password_error));
            isValid = false;
        } else {
            password.setError(null);
        }

        return isValid;
    }

    /**
     * Vérifie si le formulaire de création de colocation est bien rempli
     * @param name Nom de la colocation à créer
     * @return True si le formulaire est bien rempli, faux sinon
     */
    public boolean createColocationFormIsValid(TextInputLayout name) {
        boolean isValid = true;

        if (name.getEditText().getText().length() < 2) {
            name.setError(mContext.getResources().getString(R.string.input_name_error));
            isValid = false;
        } else {
            name.setError(null);
        }

        return isValid;
    }

    /**
     * Vérifie si le formulaire de changement de mot de passe est bien rempli
     * @param oldPassword Ancien mot de passe
     * @param newPassword Nouveau mot de passe
     * @return True si le formulaire est bien rempli, faux sinon
     */
    public boolean changePasswordFormIsValid(TextInputLayout oldPassword, TextInputLayout newPassword) {
        boolean isValid = true;

        if (oldPassword.getEditText().getText().length() < 6) {
            oldPassword.setError(mContext.getResources().getString(R.string.input_password_error));
            isValid = false;
        } else {
            oldPassword.setError(null);
        }

        if (newPassword.getEditText().getText().length() < 6) {
            newPassword.setError(mContext.getResources().getString(R.string.input_password_error));
            isValid = false;
        } else {
            newPassword.setError(null);
        }

        return isValid;
    }

    public boolean addServiceFormIsValid(TextInputLayout title, TextInputLayout cost) {
        boolean isValid = true;

        if (title.getEditText().getText().length() < 2) {
            title.setError(mContext.getResources().getString(R.string.input_title_error));
            isValid = false;
        } else {
            title.setError("");
        }

        if (cost.getEditText().getText().length() < 1) {
            cost.setError(mContext.getResources().getString(R.string.input_cost_error));
            isValid = false;
        } else {
            cost.setError("");
        }

        return isValid;
    }
}
