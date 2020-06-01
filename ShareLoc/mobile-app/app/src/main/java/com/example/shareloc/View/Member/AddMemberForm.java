package com.example.shareloc.View.Member;


import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Toast;

import com.example.shareloc.Controller.InvitationController;
import com.example.shareloc.Controller.UserController;
import com.example.shareloc.Model.User;
import com.example.shareloc.R;
import com.example.shareloc.Utils.JsonArrayRequestCallback;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.example.shareloc.View.Colocation.ColocationDetails;
import com.google.android.material.button.MaterialButton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * Fragment affichant le formulaire d'ajout de membres
 */
public class AddMemberForm extends Fragment {

    /**
     * Controleur des utilisateurs
     */
    private UserController userController;
    /**
     * Controleur des invitations
     */
    private InvitationController invitationController;
    /**
     * TextView de recherche d'utilisateurs
     */
    private AutoCompleteTextView typeahead;
    /**
     * Bouton d'invitation
     */
    private MaterialButton btnAdd;
    /**
     * Liste des membres
     */
    private ArrayList<User> users = new ArrayList<>();
    /**
     * Id de la colocation
     */
    private Long colocationId;

    /**
     * Constructeur vide
     */
    public AddMemberForm() {  }

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
        View v = inflater.inflate(R.layout.fragment_add_member_form, container, false);

        userController = new UserController(getContext());
        invitationController = new InvitationController(getContext());

        colocationId = ColocationDetails.getColocationId();

        btnAdd = v.findViewById(R.id.btn_add);
        typeahead = v.findViewById(R.id.typeahead_member);

        btnAdd.setOnClickListener(new View.OnClickListener() {
            /**
             * Crée l'invitation
             * @param v Vue
             */
            @Override
            public void onClick(View v) {
                String login = typeahead.getText().toString();
                if (!login.isEmpty()) {
                    if (login.contains("<")) {
                        login = login.split("<")[1].split(">")[0];
                    }
                    create(login);
                }
            }
        });

            getAll();

        return v;
    }

    /**
     * Renvoie tous les utilisateurs de ShareLoc
     */
    public void getAll() {

        final JsonArrayRequestCallback cb = new JsonArrayRequestCallback() {
            /**
             * Ajoute les users à la liste des utilisateurs
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONArray res) {
                users.clear();

                try {
                    for (int i = 0; i < res.length(); i++) {
                        JSONObject u = res.getJSONObject(i);

                        User user = new User(
                          u.getString("login"),
                          u.getString("firstname"),
                          u.getString("lastname")
                        );

                        users.add(user);
                    }

                    ArrayAdapter<User> adapter = new ArrayAdapter<>(getContext(), android.R.layout.simple_list_item_1, users);
                    typeahead.setAdapter(adapter);
                    typeahead.setThreshold(2);
                }
                catch (JSONException e) {
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

        userController.getAll(cb, colocationId);
    }

    /**
     * Crée une invitation
     * @param login Login de l'invité
     */
    public void create(String login) {

        final JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            /**
             * Vide le textView de recherche
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONObject res) {
                Toast.makeText(getContext(), R.string.invitation_send, Toast.LENGTH_LONG).show();
                typeahead.setText("");
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

        invitationController.create(cb, login, colocationId);
    }

}
