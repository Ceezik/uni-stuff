package com.example.shareloc.View.Service;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.example.shareloc.Controller.ServiceController;
import com.example.shareloc.R;
import com.example.shareloc.Utils.FormValidator;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputLayout;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Actvité affichant le formulaire d'ajout de service
 */
public class AddServiceForm extends AppCompatActivity {

    /**
     * Toolbar
     */
    private Toolbar toolbar;
    /**
     * Inputs titre, coût et description
     */
    private TextInputLayout title, cost, description;
    /**
     * Bouton de création
     */
    private MaterialButton btnCreate;
    /**
     * Controleur des services
     */
    private ServiceController serviceController;
    /**
     * Id de la colocation
     */
    private Long colocationId;

    /**
     * Crée la vue associée à l'activité
     * @param savedInstanceState State de l'application
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_service_form);

        Intent intent = getIntent();
        colocationId = intent.getLongExtra("colocationId", -1);

        serviceController = new ServiceController(getApplicationContext());

        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setHomeButtonEnabled(true);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        title = findViewById(R.id.input_title);
        cost = findViewById(R.id.input_cost);
        description = findViewById(R.id.input_description);
        btnCreate = findViewById(R.id.btn_create);

        btnCreate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FormValidator formValidator = new FormValidator(getApplicationContext());
                if (formValidator.addServiceFormIsValid(title, cost)) {
                    create();
                }
            }
        });
    }

    /**
     * Crée un nouveau service
     */
    public void create() {

        JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            /**
             * Affiche le nouveau service
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONObject res) {
                Intent i = new Intent();

                try {
                    i.putExtra("id", res.getLong("id"));
                    i.putExtra("title", res.getString("title"));
                    i.putExtra("cost", res.getInt("cost"));
                    if (res.has("description")) {
                        i.putExtra("description", res.getString("description"));
                    }
                    else {
                        i.putExtra("description", "");
                    }
                    setResult(Activity.RESULT_OK, i);
                }
                catch (JSONException e) {
                    setResult(Activity.RESULT_CANCELED, i);
                }

                finish();
            }

            /**
             * Affiche l'erreur
             * @param error Statut d'erreur
             */
            @Override
            public void onError(int error) {
                Toast.makeText(getApplicationContext(), error, Toast.LENGTH_LONG).show();
            }
        };

        serviceController.create(
                cb,
                colocationId,
                title.getEditText().getText().toString(),
                Integer.parseInt(cost.getEditText().getText().toString()),
                description.getEditText().getText().toString()
        );
    }
}
