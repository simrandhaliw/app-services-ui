export interface FeaturesConfig {
  readOnly?: boolean;
  breadcrumbs?: boolean;
  multiTenant?: boolean;
}

export interface ArtifactsConfig {
  url: string;
}

export interface UiConfig {
  contextPath?: string;
  navPrefixPath?: string;
}

export interface AuthConfig {
  type: string;
  getToken: () => Promise<string>;
}

// Used when `type=keycloakjs`
export interface KeycloakJsAuthConfig extends AuthConfig {
  options?: any;
}

// Used when `type=none`
export interface NoneAuthConfig extends AuthConfig {}

export interface ConfigType {
  artifacts: ArtifactsConfig;
  auth: KeycloakJsAuthConfig | NoneAuthConfig;
  features?: FeaturesConfig;
  ui: UiConfig;
}

const createApicurioConfig = (apiUrl: string, navPathPrefix: string, getToken: () => Promise<string>) => {
  const config: ConfigType = {
    artifacts: {
      url: `${apiUrl}/apis/registry`,
    },
    auth: {
      type: 'gettoken',
      getToken,
    },
    features: {
      readOnly: false,
      breadcrumbs: false,
      multiTenant: true,
    },
    ui: {
      navPrefixPath: navPathPrefix,
    },
  } as ConfigType;

  return config;
};

export { createApicurioConfig };
