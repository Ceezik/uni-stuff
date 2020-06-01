package com.example.shareloc.View.Service;


import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.shareloc.Model.Service;
import com.example.shareloc.R;
import com.example.shareloc.View.Colocation.ColocationDetails;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

public class ServicesWrapper extends Fragment {

    private FloatingActionButton btnAdd;
    private Long colocationId;
    private static final int ADD_SERVICE_CODE = 1;

    /**
     * Constructeur vide
     */
    public ServicesWrapper() {  }

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
        View v = inflater.inflate(R.layout.fragment_services_wrapper, container, false);

        colocationId = ColocationDetails.getColocationId();

        btnAdd = v.findViewById(R.id.btn_add);
        btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getContext(), AddServiceForm.class);
                intent.putExtra("colocationId", colocationId);
                startActivityForResult(intent, ADD_SERVICE_CODE);
            }
        });

        return v;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {

        if (requestCode == ADD_SERVICE_CODE) {
            try {
                Service service = new Service(
                    data.getLongExtra("id", -1),
                    data.getStringExtra("title"),
                    data.getIntExtra("cost", 1),
                    data.getStringExtra("description"),
                    null
                );

                ServicesList.addService(service);
            }
            catch (Exception e) {  }
        }
    }

}
