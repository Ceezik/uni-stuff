package com.example.shareloc.View.AchievedService;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.shareloc.Controller.AchievedServiceController;
import com.example.shareloc.Model.AchievedService;
import com.example.shareloc.Model.User;
import com.example.shareloc.R;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.example.shareloc.Utils.SharedPreferencesManager;
import com.google.android.material.button.MaterialButton;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;

import static com.example.shareloc.View.AchievedService.AchievedServicesList.getTo;

/**
 * Activité affichant les détails d'un service effectué
 */
public class AchievedServiceDetails extends AppCompatActivity {

    private Toolbar toolbar;
    private LinearLayout votesWrapper;
    private MaterialButton btnAccepted, btnRefused;
    private TextView statut, cost, doneAt, details;
    private AchievedService achievedService;
    private SharedPreferencesManager pref;
    private AchievedServiceController achievedServiceController;
    private Long colocationId;
    private Long achievedServiceId;

    /**
     * Crée la vue associée à l'activité
     * @param savedInstanceState State de l'application
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_achieved_service_details);

        votesWrapper = findViewById(R.id.votes_wrapper);
        statut = findViewById(R.id.statut_txt);
        cost = findViewById(R.id.cost_txt);
        doneAt = findViewById(R.id.done_at_txt);
        details = findViewById(R.id.details_txt);

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

        Intent intent = getIntent();
        colocationId = intent.getLongExtra("colocationId", -1);
        achievedServiceId = intent.getLongExtra("achievedServiceId", -1);

        pref = SharedPreferencesManager.getInstance(getApplicationContext());
        achievedServiceController = new AchievedServiceController(getApplicationContext());

        getAchievedService();
    }

    /**
     * Configure le layout et ajoute les écouteurs d'événements
     */
    public void configureLayout() {
        String login = pref.retrieveString("login");

        if (achievedService.getValid() == null && userIsBeneficiary(login, achievedService)) {
            votesWrapper.setVisibility(View.VISIBLE);

            btnAccepted = findViewById(R.id.btn_accepted);
            btnAccepted.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    edit(true);
                }
            });
            btnRefused = findViewById(R.id.btn_refused);
            btnRefused.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    edit(false);
                }
            });
        }
        else {
            votesWrapper.setVisibility(View.GONE);
        }
    }

    /**
     * Récupère le service effectué
     */
    public void getAchievedService() {

        JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            @Override
            public void onSuccess(JSONObject res) {
                try {
                    JSONObject from = res.getJSONObject("from").getJSONObject("membre");
                    JSONObject service = res.getJSONObject("service");
                    Boolean valid = null;
                    if (res.has("valid")) valid = res.getBoolean("valid");

                    achievedService = new AchievedService(
                            res.getLong("id"),
                            service.getString("title"),
                            service.getInt("cost"),
                            valid,
                            AchievedServicesList.getDate(res.getString("doneAt")),
                            from.getString("firstname") + " " + from.getString("lastname"),
                            AchievedServicesList.getTo(res.getJSONArray("to"))
                    );

                    configureLayout();
                    populateDetails();
                }
                catch (JSONException e) {
                    Toast.makeText(getApplicationContext(), R.string.get_achieved_service_error, Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onError(int error) {
                Toast.makeText(getApplicationContext(), error, Toast.LENGTH_LONG).show();
            }
        };

        achievedServiceController.getById(cb, colocationId, achievedServiceId);
    }

    /**
     * Vote pour le service achevé
     */
    public void edit(Boolean accepted) {

        JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            @Override
            public void onSuccess(JSONObject res) {
                Toast.makeText(getApplicationContext(), R.string.successful_vote, Toast.LENGTH_LONG).show();
                getAchievedService();
            }

            @Override
            public void onError(int error) {
                Toast.makeText(getApplicationContext(), error, Toast.LENGTH_LONG).show();
            }
        };

        achievedServiceController.vote(cb, colocationId, achievedServiceId, accepted);
    }

    public void populateDetails() {
        toolbar.setTitle(achievedService.getTitle());
        cost.setText(achievedService.getCost() + " points");

        Boolean s = achievedService.getValid();
        if (s == null) { statut.setText(R.string.waiting_for_votes); }
        else if (s == false) { statut.setText(R.string.refused); }
        else { statut.setText(R.string.accepted); }

        SimpleDateFormat formater = new SimpleDateFormat("dd/MM/yyyy");
        doneAt.setText(formater.format(achievedService.getDoneAt()));

        details.setText(getResources().getString(R.string.achieved_service_by) +" " + achievedService.getFrom()
                + " " + getResources().getString(R.string.for_who)
                + " " +  TextUtils.join(", ", serializeUsers(achievedService.getTo())));
    }

    /**
     * Retourne si l'utilisateur est bénéficiaire ou non
     * @param login Login de l'utilisateur
     * @param as Service effectué
     * @return True si l'utilisateur est un bénéficiaire
     */
    public boolean userIsBeneficiary(String login, AchievedService as) {
        for (User u : as.getTo()) {
            if (u.getLogin().equals(login)) return true;
        }
        return false;
    }

    /**
     * Sérialise les utilisateurs
     * @param users Utilisateurs
     * @return Liste des utilisateurs sérialisés
     */
    public static ArrayList<String> serializeUsers(ArrayList<User> users) {
        ArrayList<String> res = new ArrayList<>();

        for (User u : users) {
            res.add(u.getFirstname() + " " + u.getLastname());
        }

        return res;
    }

}
