package com.example.shareloc.View;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import com.example.shareloc.Controller.InvitationController;
import com.example.shareloc.Controller.UserController;
import com.example.shareloc.R;
import com.example.shareloc.Utils.JsonArrayRequestCallback;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.example.shareloc.Utils.SharedPreferencesManager;
import com.example.shareloc.View.Authentication.AuthActivity;

import org.json.JSONArray;
import org.json.JSONObject;

public class SplashScreen extends AppCompatActivity {

    private SharedPreferencesManager pref;
    private UserController userController;
    private InvitationController invitationController;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.splash_screen);

        pref = SharedPreferencesManager.getInstance(getApplicationContext());
        userController = new UserController(getApplicationContext());
        invitationController = new InvitationController(getApplicationContext());

        // Redirection vers la page de connexion si aucun utilisateur n'est connecté
        checkUserIsConnected();
    }

    public void checkUserIsConnected() {

        final JsonObjectRequestCallback cb = new JsonObjectRequestCallback() {
            @Override
            public void onSuccess(JSONObject res) {
                getUserInvitations();
            }

            @Override
            public void onError(int error) {
                Intent intent = new Intent(getApplicationContext(), AuthActivity.class);
                startActivity(intent);
            }
        };

        userController.getProfil(cb);
    }

    public void getUserInvitations() {

        final JsonArrayRequestCallback cb = new JsonArrayRequestCallback() {
            @Override
            public void onSuccess(JSONArray res) {
                pref.storeInt("nbInvitations", res.length());
                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(intent);
            }

            @Override
            public void onError(int error) {
                Intent intent = new Intent(getApplicationContext(), AuthActivity.class);
                startActivity(intent);
            }
        };

        invitationController.getAll(cb);
    }
}
