import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SVMModule } from './svm.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(SVMModule);