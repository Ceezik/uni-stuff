package com.example.shareloc.View.Authentication;


import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.shareloc.Controller.AuthController;
import com.example.shareloc.Controller.InvitationController;
import com.example.shareloc.Controller.UserController;
import com.example.shareloc.R;
import com.example.shareloc.Utils.FormValidator;
import com.example.shareloc.Utils.JsonArrayRequestCallback;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.example.shareloc.Utils.SharedPreferencesManager;
import com.example.shareloc.View.MainActivity;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputLayout;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Fragment affichant le formulaire de connexion
 */
public class Signin extends Fragment {

    /**
     * Inputs login et password
     */
    private TextInputLayout login, password;
    /**
     * Bouton de connexion
     */
    private MaterialButton signinBtn;
    /**
     * Controleur des authentifications
     */
    private AuthController authController;
    /**
     * Controleur des utilisateurs
     */
    private UserController userController;
    /**
     * Controleur des invitations
     */
    private InvitationController invitationController;
    /**
     * Controleur des  préférences partagées
     */
    private SharedPreferencesManager pref;

    /**
     * Constructeur vide
     */
    public Signin() { }

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
        View v = inflater.inflate(R.layout.fragment_signin, container, false);

        authController = new AuthController(getContext());
        userController = new UserController(getContext());
        invitationController = new InvitationController(getContext());
        pref = SharedPreferencesManager.getInstance(getContext());

        login = v.findViewById(R.id.input_login);
        password = v.findViewById(R.id.input_password);
        signinBtn = v.findViewById(R.id.btn_signin);

        final JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            /***
             * Stocke le user et le token
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONObject res) {
                try {
                    String token = res.getString("token");
                    pref.storeString("token", token);
                    storeUser();
                }
                catch (JSONException error) {
                    Toast.makeText(getContext(), R.string.generic_error, Toast.LENGTH_LONG).show();
                }
            }

            /**
             * Affiche l'erreur
             * @param error Statut d'erreur
             */
            @Override
            public void onError(int error) {
                Toast.makeText(getContext(), error, Toast.LENGTH_LONG).show();
            }
        };

        signinBtn.setOnClickListener(new View.OnClickListener() {
            /**
             * Vérifie la validité du formulaire et tente de se connecter
             * @param v
             */
            @Override
            public void onClick(View v) {
                FormValidator formValidator = new FormValidator(getContext());
                if (formValidator.signinFormIsValid(login, password)) {
                    authController.signin(login.getEditText().getText().toString(),
                            password.getEditText().getText().toString(),
                            cb
                    );
                }
            }
        });

        return v;
    }

    /**
     * Stocke les infos de l'utilisateur dans les préférences
     */
    public void storeUser() {
        final JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            /**
             * Stocke les infos de l'utilisateur et ses invitations
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONObject res) {
                try {
                    pref.storeString("firstname", res.getString("firstname"));
                    pref.storeString("lastname", res.getString("lastname"));
                    pref.storeString("login", res.getString("login"));
                    storeUserInvitations();
                }
                catch (JSONException error) {
                    Toast.makeText(getContext(), R.string.generic_error, Toast.LENGTH_LONG).show();
                }
            }

            /**
             * Affiche l'erreur
             * @param error Statut d'erreur
             */
            @Override
            public void onError(int error) {
                Toast.makeText(getContext(), error, Toast.LENGTH_LONG).show();
            }
        };

        userController.getProfil(cb);
    }

    /**
     * Stocke le nombre d'invitations de l'utilisateur
     */
    public void storeUserInvitations() {

        final JsonArrayRequestCallback cb = new JsonArrayRequestCallback() {
            /**
             * Stocke le nombre d'invitations
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONArray res) {
                pref.storeInt("nbInvitations", res.length());
                Intent intent = new Intent(getContext(), MainActivity.class);
                startActivity(intent);
            }

            /**
             * Affiche l'erreur
             * @param error Statut d'erreur
             */
            @Override
            public void onError(int error) {
                Toast.makeText(getContext(), error, Toast.LENGTH_LONG).show();
            }
        };

        invitationController.getAll(cb);
    }
}
