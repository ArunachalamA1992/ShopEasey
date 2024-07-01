# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
-keep class com.facebook.imagepipeline.animated.factory.AnimatedFactoryImpl { *; }
-keep class com.facebook.imagepipeline.animated.factory.AnimatedFactoryImplSupport { *; }
-keep class com.facebook.imagepipeline.animated.factory.AnimatedFactory { *; }
-keep class com.facebook.imagepipeline.animated.base.AnimatedImage { *; }
-keep class com.facebook.imagepipeline.animated.impl.AnimatedDrawableFactory { *; }
-keep class com.facebook.imagepipeline.animated.impl.AnimatedImageFactory { *; }
-keep class com.facebook.imagepipeline.animated.impl.AnimatedImageCompositor { *; }

