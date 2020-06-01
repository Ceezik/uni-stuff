package com.example.shareloc.View.Authentication;


import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.shareloc.Controller.AuthController;
import com.example.shareloc.R;
import com.example.shareloc.Utils.FormValidator;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputLayout;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Fragment affichant le formulaire d'inscription
 */
public class Signup extends Fragment {
    /**
     * Inputs  nom, prenom et mot de passe
     */
    private TextInputLayout firstname, lastname, login, password;
    /**
     * Bouton d'inscription
     */
    private MaterialButton signupBtn;
    /**
     * Controleur des authentifications
     */
    private AuthController authController;

    /**
     * Constructeur vide
     */
    public Signup() { }

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
        View v = inflater.inflate(R.layout.fragment_signup, container, false);

        authController = new AuthController(getContext());

        firstname = v.findViewById(R.id.input_firstname);
        lastname = v.findViewById(R.id.input_lastname);
        login = v.findViewById(R.id.input_login);
        password = v.findViewById(R.id.input_password);
        signupBtn = v.findViewById(R.id.btn_signup);

        final JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            /**
             * Affiche le mesage
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONObject res) {
                try {
                    Toast.makeText(getContext(), res.getString("message"), Toast.LENGTH_LONG).show();
                    ((AuthActivity) getActivity()).selectTab(1);
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

        signupBtn.setOnClickListener(new View.OnClickListener() {
            /**
             * Vérifie la validité du formulaire et tente une inscription
             * @param v Vue d'inscription
             */
            @Override
            public void onClick(View v) {
                FormValidator formValidator = new FormValidator(getContext());
                if (formValidator.signupFormIsValid(firstname, lastname, login, password)) {
                    authController.signup(login.getEditText().getText().toString(),
                            password.getEditText().getText().toString(),
                            firstname.getEditText().getText().toString(),
                            lastname.getEditText().getText().toString(),
                            cb
                    );
                }
            }
        });

        return v;
    }

}
