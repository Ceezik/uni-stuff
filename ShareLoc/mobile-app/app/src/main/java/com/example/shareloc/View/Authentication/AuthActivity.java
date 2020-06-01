package com.example.shareloc.View.Authentication;

import android.os.Bundle;

import com.example.shareloc.R;
import com.example.shareloc.Utils.AuthPagerAdapter;
import com.google.android.material.tabs.TabLayout;

import androidx.viewpager.widget.ViewPager;
import androidx.appcompat.app.AppCompatActivity;

/**
 * Activité servant à authentifier l'utilisateur
 */
public class AuthActivity extends AppCompatActivity {

    /**
     * Layout du fragment
     */
    private TabLayout tabLayout;

    /**
     * Crée la vue associée à l'activité
     * @param savedInstanceState State de l'application
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_auth);

        // Configuration du clique sur un item du TabLayout
        tabLayout = findViewById(R.id.auth_tabs);
        ViewPager viewPager = findViewById(R.id.view_pager);
        AuthPagerAdapter pagerAdapter = new AuthPagerAdapter(getApplicationContext(), getSupportFragmentManager(), tabLayout.getTabCount());
        viewPager.setAdapter(pagerAdapter);
        tabLayout.setupWithViewPager(viewPager);
        // Affichage de la page de connexion
        selectTab(1);
    }

    /**
     * Empèche le bouton retour de fonctionner
     */
    @Override
    public void onBackPressed() {
        // Méthode vide pour ne pas pouvoir revenir à l'activité précédente
    }

    /**
     * Sélectionne une case du tableau
     * @param index Index de la case
     */
    public void selectTab(int index) {
        tabLayout.getTabAt(index).select();
    }
}