package com.example.shareloc.View.AchievedService;


import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.shareloc.Adapter.AchievedServiceAdapter;
import com.example.shareloc.Controller.AchievedServiceController;
import com.example.shareloc.Model.AchievedService;
import com.example.shareloc.Model.User;
import com.example.shareloc.R;
import com.example.shareloc.Utils.EmptyRecyclerView;
import com.example.shareloc.Utils.JsonArrayRequestCallback;
import com.example.shareloc.Utils.RecyclerItemClickListener;
import com.example.shareloc.View.Colocation.ColocationDetails;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;

/**
 * Fragment affichant la liste des services effectués
 */
public class AchievedServicesList extends Fragment {

    private static EmptyRecyclerView rv;
    private static AchievedServiceAdapter adapter;
    private RecyclerView.LayoutManager lm;
    private static ArrayList<AchievedService> services = new ArrayList<>();
    private AchievedServiceController achievedServiceController;
    private Long colocationId;


    public AchievedServicesList() {  }


    @Override
    public void onResume() {
        super.onResume();
        getAll();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_achieved_services_list, container, false);

        colocationId = ColocationDetails.getColocationId();

        achievedServiceController = new AchievedServiceController(getContext());

        rv = v.findViewById(R.id.achieved_services_recycler_view);
        lm = new LinearLayoutManager(getContext());
        rv.setLayoutManager(lm);
        View emptyView = v.findViewById(R.id.empty_achieved_services_list);
        rv.setEmptyView(emptyView);
        adapter = new AchievedServiceAdapter(services, getContext());
        rv.setAdapter(adapter);

        getAll();
        configureOnClickRecyclerView();

        return v;
    }

    protected void configureOnClickRecyclerView(){
        RecyclerItemClickListener.addTo(rv, R.layout.fragment_achieved_services_list)
                .setOnItemClickListener(new RecyclerItemClickListener.OnItemClickListener() {
                    @Override
                    public void onItemClicked(RecyclerView recyclerView, int position, View v) {
                        Intent intent = new Intent(getContext(), AchievedServiceDetails.class);
                        intent.putExtra("colocationId", colocationId);
                        intent.putExtra("achievedServiceId", adapter.getAchievedService(position).getId());
                        startActivity(intent);
                    }
                });
    }

    public void getAll() {

        JsonArrayRequestCallback cb = new JsonArrayRequestCallback() {
            @Override
            public void onSuccess(JSONArray res) {
                services.clear();

                try {
                    for (int i = 0; i < res.length(); i++) {
                        JSONObject as = res.getJSONObject(i);
                        JSONObject from = as.getJSONObject("from").getJSONObject("membre");

                        Boolean valid = null;
                        if (as.has("valid")) valid = as.getBoolean("valid");

                        AchievedService achievedService = new AchievedService(
                                as.getLong("id"),
                                as.getJSONObject("service").getString("title"),
                                valid,
                                getDate(as.getString("doneAt")),
                                from.getString("firstname") + " " + from.getString("lastname"),
                                getTo(as.getJSONArray("to"))
                        );
                        services.add(achievedService);
                    }
                    sortAchievedServicesByTitle();
                    adapter.notifyDataSetChanged();
                }
                catch (JSONException e) {
                    Toast.makeText(getContext(), R.string.get_achieved_services_error, Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onError(int error) {
                Toast.makeText(getContext(), error, Toast.LENGTH_LONG).show();
            }
        };

        achievedServiceController.getAll(cb, colocationId);
    }

    public void sortAchievedServicesByTitle() {
        Collections.sort(services, new Comparator<AchievedService>() {
            @Override
            public int compare(AchievedService a, AchievedService b) {
                return a.getTitle().toLowerCase().compareTo(b.getTitle().toLowerCase());
            }
        });
    }

    public static Date getDate(String date) {
        SimpleDateFormat formater1 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        SimpleDateFormat formater2 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");

        try {
            if (date.contains(".")) {
                return formater1.parse(date);
            }
            else {
                return formater2.parse(date);
            }
        }
        catch (ParseException e) {
            return new Date();
        }
    }

    public static ArrayList<User> getTo(JSONArray to) {
        ArrayList<User> res = new ArrayList<>();

        try {
            for (int i = 0; i < to.length(); i++) {
                JSONObject user = to.getJSONObject(i).getJSONObject("membre");
                res.add(new User(
                        user.getString("login"),
                        user.getString("firstname"),
                        user.getString("lastname")
                ));
            }
        }
        catch (JSONException e) {  }

        return res;
    }

}
