package com.shopeasey;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;

public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "ShopEasey";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        Intent intent = getIntent();
        if (intent != null && intent.hasExtra("product_id")) {
            String productId = intent.getStringExtra("product_id");

            // Ensure React context is initialized
            ReactInstanceManager reactInstanceManager = getReactNativeHost().getReactInstanceManager();
            ReactContext reactContext = reactInstanceManager.getCurrentReactContext();

            if (reactContext != null) {
                navigateToProductDetails(reactContext, productId);
            } else {
                // If the React context is not ready, add a listener to navigate once it is initialized
                reactInstanceManager.addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
                    @Override
                    public void onReactContextInitialized(ReactContext context) {
                        navigateToProductDetails(context, productId);
                        reactInstanceManager.removeReactInstanceEventListener(this);
                    }
                });
                if (!reactInstanceManager.hasStartedCreatingInitialContext()) {
                    reactInstanceManager.createReactContextInBackground();
                }
            }
        }
    }

    private void navigateToProductDetails(ReactContext reactContext, String productId) {
        Log.d("MainActivity", "Navigating to product details with ID: " + productId);
        Intent productIntent = new Intent("OPEN_PRODUCT_DETAILS");
        productIntent.putExtra("product_id", productId);
        reactContext.sendBroadcast(productIntent);
    }
}
