package com.example.shareloc.View.Colocation;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.shareloc.Controller.ColocationController;
import com.example.shareloc.Model.Colocation;
import com.example.shareloc.R;
import com.example.shareloc.Utils.FormValidator;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputLayout;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Fragment affichant le formulaire d'ajout de colocations
 */
public class AddColocationForm extends Fragment {

    /**
     * Input du nom
     */
    private TextInputLayout name;
    /**
     * Boutoon de création
     */
    private MaterialButton btnCreate;
    /**
     * Controleur des colocations
     */
    private ColocationController colocationController;

    /**
     * Constructeur vide
     */
    public AddColocationForm() {  }

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
        View v = inflater.inflate(R.layout.fragment_add_colocation_form, container, false);

        colocationController = new ColocationController(getContext());

        name = v.findViewById(R.id.input_name);
        btnCreate = v.findViewById(R.id.btn_create);

        btnCreate.setOnClickListener(new View.OnClickListener() {
            /**
             * Vérifie la validité du formulaire et tente de créer la colocation
             * @param v Vue du formulaire
             */
            @Override
            public void onClick(View v) {
                FormValidator formValidator = new FormValidator(getContext());
                if (formValidator.createColocationFormIsValid(name)) {
                   create();
                }
            }
        });

        return v;
    }

    /**
     * Crée la colocation
     */
    public void create() {
        final JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            /**
             * Ajoute la colocation à la liste
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONObject res) {
                name.getEditText().setText("");

                try {
                    Colocation colocation = new Colocation(
                            res.getLong("id"),
                            res.getString("name"),
                            res.getJSONArray("membres").length()
                    );
                    ColocationsList.addColocation(colocation);
                }
                catch(JSONException e) {
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

        colocationController.create(name.getEditText().getText().toString(), cb);
    }

}
