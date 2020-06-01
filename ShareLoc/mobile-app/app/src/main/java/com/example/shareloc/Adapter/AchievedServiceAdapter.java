package com.example.shareloc.Adapter;

import android.content.Context;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.example.shareloc.Model.AchievedService;
import com.example.shareloc.R;
import com.example.shareloc.View.AchievedService.AchievedServiceDetails;

import java.util.ArrayList;

public class AchievedServiceAdapter extends RecyclerView.Adapter<AchievedServiceAdapter.AchievedServiceViewHolder> {

    private ArrayList<AchievedService> services;
    private static Context context;


    public static class AchievedServiceViewHolder extends RecyclerView.ViewHolder {
        private TextView title, valid, details;

        AchievedServiceViewHolder(View itemView) {
            super(itemView);

            title = itemView.findViewById(R.id.achieved_service_item_title);
            valid = itemView.findViewById(R.id.achieved_service_item_valid);
            details = itemView.findViewById(R.id.achieved_service_item_details);
        }

        public void display(AchievedService as) {
            title.setText(as.getTitle());
            details.setText(context.getResources().getString(R.string.achieved_service_by) +" " + as.getFrom()
                    + " " + context.getResources().getString(R.string.for_who)
                    + " " +  TextUtils.join(", ", AchievedServiceDetails.serializeUsers(as.getTo())));

            Boolean statut = as.getValid();
            if (statut == null) {
                valid.setText(R.string.waiting_for_votes);
                valid.setTextColor(context.getResources().getColor(R.color.gold));
            }
            else if (statut == false) {
                valid.setText(R.string.refused);
                valid.setTextColor(context.getResources().getColor(R.color.red));
            }
            else {
                valid.setText(R.string.accepted);
                valid.setTextColor(context.getResources().getColor(R.color.colorPrimary));
            }
        }
    }


    public AchievedServiceAdapter(ArrayList<AchievedService> services, Context context) {
        this.services = services;
        this.context = context;
    }

    @Override
    public AchievedServiceViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view = layoutInflater.inflate(R.layout.achieved_service_item, parent, false);
        return new AchievedServiceViewHolder(view);
    }

    @Override
    public void onBindViewHolder(AchievedServiceViewHolder holder, int position) {
        holder.display(services.get(position));
    }

    @Override
    public int getItemCount() {
        return this.services.size();
    }

    public AchievedService getAchievedService(int position) { return services.get(position); }

}
