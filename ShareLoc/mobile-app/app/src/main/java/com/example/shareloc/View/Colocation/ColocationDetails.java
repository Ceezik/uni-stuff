package com.example.shareloc.View.Colocation;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.viewpager.widget.ViewPager;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.example.shareloc.Controller.ColocationController;
import com.example.shareloc.Model.Colocation;
import com.example.shareloc.R;
import com.example.shareloc.Utils.ColocationPagerAdapter;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.google.android.material.tabs.TabLayout;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Activité affichant les détails d'une colocation
 */
public class ColocationDetails extends AppCompatActivity {
    /**
     * Barre d'outils
     */
    private Toolbar toolbar;
    /**
     * Layout tableau
     */
    private TabLayout tabLayout;
    /**
     * Controleur des colocations
     */
    private ColocationController colocationController;
    /**
     * Colocation à détailler
     */
    private Colocation colocation;
    /**
     * Id de la colccation
     */
    private static Long id;

    /**
     * Crée la vue associée à l'activité
     * @param savedInstanceState State de l'application
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_colocation_details);

        colocationController = new ColocationController(getApplicationContext());

        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setHomeButtonEnabled(true);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            /**
             * Met un terme à l'activité
             * @param v Vue
             */
            @Override
            public void onClick(View v) {
               finish();
            }
        });

        tabLayout = findViewById(R.id.colocation_tabs);
        ViewPager viewPager = findViewById(R.id.view_pager);
        ColocationPagerAdapter pagerAdapter = new ColocationPagerAdapter(getApplicationContext(), getSupportFragmentManager(), tabLayout.getTabCount());
        viewPager.setAdapter(pagerAdapter);
        tabLayout.setupWithViewPager(viewPager);

        Intent intent = getIntent();
        id = intent.getLongExtra("id", -1);

        getColocation(id);
    }

    /**
     * Rédupère la colocation d'id id
     * @param id Id de la colocation
     */
    public void getColocation(Long id) {
        final JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            /**
             * Crée une instance de la colocation récupérée
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONObject res) {
                try {
                    colocation = new Colocation(
                            res.getLong("id"),
                            res.getString("name"),
                            res.getJSONArray("membres").length()
                    );
                    toolbar.setTitle(colocation.getName());
                }
                catch(JSONException e) {
                    Toast.makeText(getApplicationContext(), R.string.generic_error, Toast.LENGTH_LONG).show();
                }
            }

            /**
             * Affiche l'erreur
             * @param error Statut d'erreur
             */
            @Override
            public void onError(int error) {
                Toast.makeText(getApplicationContext(), error, Toast.LENGTH_LONG).show();
                finish();
            }
        };

        colocationController.getById(id, cb);
    }

    /**
     * Retourne l'id de la colocation
     * @return
     */
    public static Long getColocationId() {
        return id;
    }
}
