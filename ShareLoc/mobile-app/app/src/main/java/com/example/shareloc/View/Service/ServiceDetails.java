package com.example.shareloc.View.Service;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.MultiAutoCompleteTextView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.shareloc.Controller.AchievedServiceController;
import com.example.shareloc.Controller.MemberController;
import com.example.shareloc.Controller.ServiceController;
import com.example.shareloc.Model.Membre;
import com.example.shareloc.Model.Service;
import com.example.shareloc.R;
import com.example.shareloc.Utils.JsonArrayRequestCallback;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.example.shareloc.Utils.SharedPreferencesManager;
import com.google.android.material.button.MaterialButton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Activité affichant les détails d'un service
 */
public class ServiceDetails extends AppCompatActivity {

    private Toolbar toolbar;
    private TextView statut, cost, description;
    private LinearLayout votesWrapper, declareBeneficiaries;
    private MaterialButton btnAccepted, btnRefused, btnDeclare;
    private MultiAutoCompleteTextView typeahead;
    private ArrayList<Membre> membres = new ArrayList<>();
    private SharedPreferencesManager pref;
    private ServiceController serviceController;
    private MemberController memberController;
    private AchievedServiceController achievedServiceController;
    private Service service;
    private Long colocationId;
    private Long serviceId;

    /**
     * Crée la vue associée à l'activité
     * @param savedInstanceState State de l'application
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_service_details);

        statut = findViewById(R.id.statut_txt);
        cost = findViewById(R.id.cost_txt);
        description = findViewById(R.id.description_txt);
        votesWrapper = findViewById(R.id.votes_wrapper);
        declareBeneficiaries = findViewById(R.id.declare_beneficiaries);

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
        serviceId = intent.getLongExtra("serviceId", -1);

        pref = SharedPreferencesManager.getInstance(getApplicationContext());
        serviceController = new ServiceController(getApplicationContext());
        memberController = new MemberController(getApplicationContext());
        achievedServiceController = new AchievedServiceController(getApplicationContext());

        getService();
    }

    /**
     * Configure le layout et ajoute les écouteurs d'événements
     */
    public void configureLayouts() {
        if (service.isAccepted() == null) {
            votesWrapper.setVisibility(View.VISIBLE);
            declareBeneficiaries.setVisibility(View.GONE);

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
        else if (service.isAccepted() == true) {
            votesWrapper.setVisibility(View.GONE);
            declareBeneficiaries.setVisibility(View.VISIBLE);

            typeahead = findViewById(R.id.typeahead_beneficiaries);
            btnDeclare = findViewById(R.id.btn_declare);
            getBeneficiaries();
            btnDeclare.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    ArrayList<Long> beneficiaries = new ArrayList<>();
                    String res = typeahead.getText().toString();
                    if (!res.isEmpty()) {
                        List<String> members = Arrays.asList(res.split("\\s*,\\s*"));
                        for (String s : members) {
                            String login = s;
                            if (login.contains("<")) {
                                login = login.split("<")[1].split(">")[0];
                            }
                            for (Membre membre : membres) {
                                if (membre.getLogin().equals(login)) {
                                    beneficiaries.add(membre.getId());
                                    break;
                                }
                            }
                        }

                        createAchievedService(beneficiaries);
                    }
                }
            });
        }
        else {
            votesWrapper.setVisibility(View.GONE);
            declareBeneficiaries.setVisibility(View.GONE);
        }
    }

    /**
     * Récupère le service
     */
    public void getService() {

        final JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            @Override
            public void onSuccess(JSONObject res) {
                try {
                    String desc = "";
                    Boolean accepted = null;
                    if (res.has("description")) desc = res.getString("description");
                    if (res.has("accepted")) accepted = res.getBoolean("accepted");

                    service = new Service(
                        res.getLong("id"),
                        res.getString("title"),
                        res.getInt("cost"),
                        desc,
                        accepted
                    );

                    configureLayouts();
                    populateDetails();
                }
                catch (JSONException e) {
                    Toast.makeText(getApplicationContext(), R.string.get_service_error, Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onError(int error) {
                Toast.makeText(getApplicationContext(), error, Toast.LENGTH_LONG).show();
            }
        };

        serviceController.getById(cb, colocationId, serviceId);
    }

    /**
     * Vote pour le service
     */
    public void edit(Boolean accepted) {

        final JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            @Override
            public void onSuccess(JSONObject res) {
                Toast.makeText(getApplicationContext(), R.string.successful_vote, Toast.LENGTH_LONG).show();
                getService();
            }

            @Override
            public void onError(int error) {
                Toast.makeText(getApplicationContext(), error, Toast.LENGTH_LONG).show();
            }
        };

        serviceController.edit(cb, colocationId, serviceId, accepted);
    }

    /**
     * Récupère les bénéficiaires du service
     */
    public void getBeneficiaries() {

        final JsonArrayRequestCallback cb = new JsonArrayRequestCallback() {
            @Override
            public void onSuccess(JSONArray res) {
                membres.clear();
                String login = pref.retrieveString("login");

                try {
                    for (int i = 0; i < res.length(); i++) {
                        JSONObject m = res.getJSONObject(i);
                        JSONObject membre = m.getJSONObject("membre");
                        Membre member = new Membre(
                                m.getLong("id"),
                                membre.getString("login"),
                                membre.getString("firstname") + " " + membre.getString("lastname"),
                                m.getInt("points"),
                                m.getBoolean("estGestionnaire")
                        );

                        if (!login.equals(member.getLogin())) membres.add(member);
                    }

                    ArrayAdapter<Membre> adapter = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_list_item_1, membres);
                    typeahead.setAdapter(adapter);
                    typeahead.setThreshold(2);
                    typeahead.setTokenizer(new MultiAutoCompleteTextView.CommaTokenizer());
                }
                catch (JSONException e) {
                    Toast.makeText(getApplicationContext(), R.string.get_members_error, Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onError(int error) {
                Toast.makeText(getApplicationContext(), error, Toast.LENGTH_LONG).show();
            }
        };

        memberController.getAll(cb, colocationId);
    }

    /*
     * Crée une nouveau service effectué.
     * @param beneficiaries Bénéficiaires du service
     */
    public void createAchievedService(ArrayList<Long> beneficiaries) {

        JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            @Override
            public void onSuccess(JSONObject res) {
                finish();
            }

            @Override
            public void onError(int error) {
                Toast.makeText(getApplicationContext(), error, Toast.LENGTH_LONG).show();
            }
        };

        achievedServiceController.create(cb, colocationId, serviceId, beneficiaries);
    }

    /*
     * Affiche les informations
     */
    public void populateDetails() {
        toolbar.setTitle(service.getTitle());
        description.setText(service.getDescription());
        cost.setText(service.getCost() + " points");

        Boolean s = service.isAccepted();
        if (s == null) { statut.setText(R.string.waiting_for_votes); }
        else if (s == false) { statut.setText(R.string.refused); }
        else { statut.setText(R.string.accepted); }
    }

}
