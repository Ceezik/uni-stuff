package com.example.shareloc.View;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;

import com.example.shareloc.Controller.UserController;
import com.example.shareloc.R;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.example.shareloc.Utils.SharedPreferencesManager;
import com.example.shareloc.View.Authentication.AuthActivity;
import com.example.shareloc.View.Colocation.ColocationsList;
import com.example.shareloc.View.Invitation.InvitationsList;
import com.example.shareloc.View.Message.MessagesList;
import com.example.shareloc.View.User.ProfilFragment;
import com.google.android.material.badge.BadgeDrawable;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import org.json.JSONObject;

/**
 * Activité pricipale de ShareLoc
 */
public class MainActivity extends AppCompatActivity {

    /**
     * Gestionnaire des préférences partagées
     */
    private static SharedPreferencesManager pref;
    /**
     * Controleur des utilisateurs
     */
    private UserController userController;
    /**
     * Barre de navigation
     */
    private static BottomNavigationView bottomNavbar;

    /**
     * Crée la vue associée à l'activité
     * @param savedInstanceState State de l'application
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        pref = SharedPreferencesManager.getInstance(getApplicationContext());
        userController = new UserController(getApplicationContext());

        // Affiche la page des colocations au lancement de l'application
        bottomNavbar = findViewById(R.id.bottom_navbar);
        bottomNavbar.setSelectedItemId(R.id.nav_colocations);
        switchFragment(new ColocationsList());

        // Affiche le nombre d'invitations
        getInvitations();

        // Change de fragment selon l'item de la navbar sélectionné
        bottomNavbar.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            /**
             * Redirige vers la bonne activité selon le bouton du menu cliqué
             * @param item Item choisit
             * @return true
             */
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch(item.getItemId()) {
                    case R.id.nav_invitations:
                        switchFragment(new InvitationsList());
                        break;
                    case R.id.nav_colocations:
                        switchFragment(new ColocationsList());
                        break;
                    case R.id.nav_profil:
                        switchFragment(new ProfilFragment());
                        break;
                }
                return true;
            }
        });
    }

    /**
     * Au redémarrage, vérifie si un utilisateur est connecté
     */
    @Override
    protected void onRestart() {
        super.onRestart();
        checkUserIsConnected();
    }

    /**
     * Empèche le bouton retour de fonctionner
     */
    @Override
    public void onBackPressed() {
        // Méthode vide pour ne pas pouvoir revenir à l'activité précédente
    }

    /**
     * Vérifie si l'utilisateur est connecté
     */
    public void checkUserIsConnected() {

        final JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            @Override
            public void onSuccess(JSONObject res) { }

            @Override
            public void onError(int error) {
                Intent intent = new Intent(getApplicationContext(), AuthActivity.class);
                startActivity(intent);
            }
        };

        userController.getProfil(cb);
    }

    /**
     * Récupère le nombre d'invitations dans les préférences
     */
    public void getInvitations() {
        int nbInvitations = pref.retrieveInt("nbInvitations");
        if (nbInvitations > 0) {
            int menuItemId = bottomNavbar.getMenu().getItem(0).getItemId();
            BadgeDrawable badge = bottomNavbar.getOrCreateBadge(menuItemId);
            badge.setNumber(nbInvitations);
        }
    }

    /**
     * Supprime une invitation dans les préférences
     */
    public static void removeInvitation() {
        int nbInvitations = pref.retrieveInt("nbInvitations");
        int menuItemId = bottomNavbar.getMenu().getItem(0).getItemId();
        BadgeDrawable badge = bottomNavbar.getOrCreateBadge(menuItemId);
        if (nbInvitations > 1) {
            badge.setNumber(nbInvitations - 1);
        }
        else {
            bottomNavbar.removeBadge(menuItemId);
        }
        pref.storeInt("nbInvitations", nbInvitations - 1);
    }

    /**
     * Démarre une transaction pour changer de fragment
     * @param fragment Fragment à afficher
     */
    protected void switchFragment(Fragment fragment) {
        FragmentManager manager = getSupportFragmentManager();
        FragmentTransaction transaction = manager.beginTransaction();
        transaction.replace(R.id.app_container, fragment);
        transaction.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_FADE);
        transaction.commit();
    }
}