import { EnvService } from "./env.service";

export const EnvServiceFactory = () => {
  // Create env
  const env = new EnvService() as { [key: string]: any };

  // Read environment variables from browser window
  const browserWindow = (window as { [key: string]: any }) || {};
  const browserWindowEnv = browserWindow['__env'] || {};

  // Assign environment variables from browser window to env
  // In the current implementation, properties from env.js overwrite defaults from the EnvService.
  // If needed, a deep merge can be performed here to merge properties instead of overwriting them.
  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      env[key] = (window as { [key: string]: any })['__env'][key];
    }
  }

  return env;
};

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [],
};
