package com.shopeasey;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;
import android.content.SharedPreferences;

import org.json.JSONException;
import org.json.JSONObject;

class Widget extends AppWidgetProvider {
    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget);

            // Set the widget elements
            views.setTextViewText(R.id.widgetTitle, "Top picks for you");
            views.setTextViewText(R.id.widgetPrice, "₹285");
            views.setTextViewText(R.id.widgetProductName, "IDEAL WONDER TABLETOP WET GRINDER--------------");

            // Set an example image, you should set your own logic to load images
            // views.setImageViewResource(R.id.widgetImage, R.drawable.ic_launcher);

            // Update the widget
            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }
}
