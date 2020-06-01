package com.example.shareloc.View.Message;


import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.Toast;

import com.example.shareloc.Controller.MessageController;
import com.example.shareloc.Model.Message;
import com.example.shareloc.Model.User;
import com.example.shareloc.R;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.example.shareloc.View.Colocation.ColocationDetails;
import com.google.android.material.textfield.TextInputLayout;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Fragment affichant le formulaire d'ajout de messages
 */
public class AddMessageForm extends Fragment {

    private TextInputLayout message;
    private ImageView btnSend;
    private MessageController messageController;
    /**
     * Id de la colocation
     */
    private Long colocationId;

    /**
     * Constructeur vide
     */
    public AddMessageForm() {  }

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
        View v = inflater.inflate(R.layout.fragment_add_message_form, container, false);

        messageController = new MessageController(getContext());

        colocationId = ColocationDetails.getColocationId();

        message = v.findViewById(R.id.input_message);
        btnSend = v.findViewById(R.id.btn_send);

        btnSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (message.getEditText().getText().toString().length() > 0) {
                    create();
                }
            }
        });

        return v;
    }

    /**
     * Crée un nouveau message
     */
    public void create() {

        JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            /**
             * Ajoute le message à la liste des messages
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONObject res) {
                message.getEditText().setText("");

                try {
                    JSONObject u = res.getJSONObject("auteur");
                    User user = new User(
                        u.getString("login"),
                        u.getString("firstname"),
                        u.getString("lastname")
                    );

                    Message message = new Message(
                        res.getLong("id"),
                        res.getString("message"),
                        user,
                        MessagesList.getDate(res.getString("createdAt"))
                    );
                    MessagesList.addMessage(message);
                }
                catch (JSONException e) {
                    Toast.makeText(getContext(), R.string.send_message_error, Toast.LENGTH_LONG).show();
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

        messageController.create(cb, colocationId, message.getEditText().getText().toString());
    }

}
