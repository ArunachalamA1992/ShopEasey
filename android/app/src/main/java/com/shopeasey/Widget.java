package com.shopeasey;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.widget.RemoteViews;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Random;
import com.squareup.picasso.Picasso;

public class Widget extends AppWidgetProvider {
    private static final String API_URL = "https://api.shopeasey.com/api/products";
    private static final String ACTION_REFRESH = "com.shopeasey.ACTION_REFRESH";
    private static final String ACTION_OPEN_PRODUCT = "com.shopeasey.ACTION_OPEN_PRODUCT";

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if (ACTION_REFRESH.equals(intent.getAction())) {
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            ComponentName thisWidget = new ComponentName(context, Widget.class);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(thisWidget);
            for (int appWidgetId : appWidgetIds) {
                updateWidget(context, appWidgetManager, appWidgetId);
            }
        } else if (ACTION_OPEN_PRODUCT.equals(intent.getAction())) {
            String productId = intent.getStringExtra("product_id");
            Intent productIntent = new Intent(context, MainActivity.class);
            productIntent.putExtra("product_id", productId);
            productIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(productIntent);
        }
    }

    private static void updateWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget);

        // Set up the refresh button intent
        Intent refreshIntent = new Intent(context, Widget.class);
        refreshIntent.setAction(ACTION_REFRESH);
        PendingIntent refreshPendingIntent = PendingIntent.getBroadcast(context, 0, refreshIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.widgetRefresh, refreshPendingIntent);

        // Fetch data and update widget
        new FetchDataTask(context, appWidgetManager, appWidgetId, views).execute(API_URL);

        // Update the widget
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    private static class FetchDataTask extends AsyncTask<String, Void, String> {
        private Context context;
        private AppWidgetManager appWidgetManager;
        private int appWidgetId;
        private RemoteViews views;

        FetchDataTask(Context context, AppWidgetManager appWidgetManager, int appWidgetId, RemoteViews views) {
            this.context = context;
            this.appWidgetManager = appWidgetManager;
            this.appWidgetId = appWidgetId;
            this.views = views;
        }

        @Override
        protected String doInBackground(String... urls) {
            try {
                URL url = new URL(urls[0]);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");

                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                reader.close();
                return result.toString();
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }

        @Override
        protected void onPostExecute(String result) {
            if (result != null) {
                try {
                    JSONObject jsonResponse = new JSONObject(result);
                    JSONArray data = jsonResponse.getJSONArray("data");

                    if (data.length() > 0) {
                        Random random = new Random();
                        JSONObject product = data.getJSONObject(random.nextInt(data.length()));
                        String productId = product.getString("id");
                        String productName = product.getString("product_name");
                        String productPrice = product.getJSONArray("variants").getJSONObject(0).getString("price");
                        String imageUrl = product.getJSONArray("main_images").getJSONObject(0).getString("image");

                        views.setTextViewText(R.id.widgetTitle, "Top picks for you");
                        views.setTextViewText(R.id.widgetPrice, "₹" + productPrice);
                        views.setTextViewText(R.id.widgetProductName, productName);

                        // Set the image using Picasso
                        Picasso.get().load(imageUrl).into(views, R.id.widgetImage, new int[] { appWidgetId });

                        // Set up the intent to open product details
                        Intent openProductIntent = new Intent(context, Widget.class);
                        openProductIntent.setAction(ACTION_OPEN_PRODUCT);
                        openProductIntent.putExtra("product_id", productId);
                        PendingIntent openProductPendingIntent = PendingIntent.getBroadcast(context, 0, openProductIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
                        views.setOnClickPendingIntent(R.id.widgetLayout, openProductPendingIntent);

                        appWidgetManager.updateAppWidget(appWidgetId, views);
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
