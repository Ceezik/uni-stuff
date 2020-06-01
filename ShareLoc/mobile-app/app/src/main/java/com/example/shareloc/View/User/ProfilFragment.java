package com.example.shareloc.View.User;


import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.shareloc.Controller.UserController;
import com.example.shareloc.R;
import com.example.shareloc.Utils.FormValidator;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.example.shareloc.Utils.SharedPreferencesManager;
import com.example.shareloc.View.Authentication.AuthActivity;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputLayout;

import org.json.JSONObject;

/**
 * Fragment affichant le profil de l'utilisateur
 */
public class ProfilFragment extends Fragment {

    /**
     * TextView de nom, prénom et login
     */
    private TextView firstname, lastname, login;
    /**
     * Bouton de déconnexion
     */
    private ImageView btnLogout;
    /**
     * Inputs ancienet nouveau mot de passe
     */
    private TextInputLayout oldPassword, newPassword;
    /**
     * Bouton de changement de mot de passe
     */
    private MaterialButton btnChangePassword;
    /**
     * Gestionnaire des préférences partagées
     */
    private SharedPreferencesManager pref;
    /**
     * Controleur des utilisateurs
     */
    private UserController userController;

    /**
     * Constructeur vide
     */
    public ProfilFragment() { }

    /**
     * Crée la vue associée au fragment
     * @param inflater Inflater de l'application
     * @param container Conteneur de la vue
     * @param savedInstanceState Etat de l'application
     * @return Vue du fragment
     */
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_profil, container, false);

        pref = SharedPreferencesManager.getInstance(getContext());
        userController = new UserController(getContext());

        firstname = v.findViewById(R.id.firstname_txt);
        lastname = v.findViewById(R.id.lastname_txt);
        login = v.findViewById(R.id.login_txt);
        btnLogout = v.findViewById(R.id.btn_logout);
        oldPassword = v.findViewById(R.id.input_old_password);
        newPassword = v.findViewById(R.id.input_new_password);
        btnChangePassword = v.findViewById(R.id.btn_change_password);

        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                logout();
            }
        });

        btnChangePassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FormValidator formValidator = new FormValidator(getContext());
                if (formValidator.changePasswordFormIsValid(oldPassword, newPassword)) {
                    changePassword();
                }
            }
        });

        getProfil();

        return v;
    }

    /**
     * Récupère le profil de l'utilisateur
     */
    public void getProfil() {
        firstname.setText(pref.retrieveString("firstname"));
        lastname.setText(pref.retrieveString("lastname"));
        login.setText(pref.retrieveString("login"));
    }

    /**
     * Déconnecte l'utilisateur
     */
    public void logout() {
        pref.clear();
        Toast.makeText(getContext(), R.string.successful_logout, Toast.LENGTH_LONG).show();
        Intent intent = new Intent(getContext(), AuthActivity.class);
        startActivity(intent);
    }

    /**
     * Modifie le mot de passe
     */
    public void changePassword() {

        JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            /**
             * Notifie de la modification du mot de passe
             */
            @Override
            public void onSuccess(JSONObject res) {
                oldPassword.getEditText().setText("");
                newPassword.getEditText().setText("");
                Toast.makeText(getContext(), R.string.successful_change_password, Toast.LENGTH_LONG).show();
            }

            /**
             * Affiche l'erreur
             * @param error Statut d'erreur
             */
            @Override
            public void onError(int error) {
                if (error == 1) oldPassword.setError(getResources().getString(R.string.wrong_password));
                else Toast.makeText(getContext(), R.string.generic_error, Toast.LENGTH_LONG).show();
            }
        };

        userController.changePassword(
                cb,
                oldPassword.getEditText().getText().toString(),
                newPassword.getEditText().getText().toString()
        );
    }

}
