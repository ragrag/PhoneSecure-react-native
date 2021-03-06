package com.phonesecurern;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rhaker.reactnativesmsandroid.RNSmsAndroidPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.fnp.reactnativesyncadapter.SyncAdapterPackage;
import eu.sigrlami.rnsimdata.RNSimDataReactPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // <-- Add this line

import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import codes.simen.IMEI.IMEI;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSmsAndroidPackage(),
            new RNSoundPackage(),
            new SyncAdapterPackage(),
            new RNSimDataReactPackage(),
            new RNFirebasePackage(),
            new RNFirebaseMessagingPackage() ,
            new RNExitAppPackage(),
            new RNDeviceInfo(),
            new IMEI()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
