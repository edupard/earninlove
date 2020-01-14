import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify from 'aws-amplify';
Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_0vmxYiwsH",
    userPoolWebClientId: "4p09v9n0jcbvbfhkbbv469bqqv"
  }
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
