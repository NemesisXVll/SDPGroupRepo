export default class CredentialClass {
  private credentialServiceName: string;
  private credentialTitle: string;
  public credentialData: string;
  private credentialUrl: string;
  private credentialIsWeak: boolean | null;
  private credentialServiceType: string;
  private credentialPicture: string; // Change In DB
  private credentialIsFavourite: boolean;

  constructor(credential: {
    serviceName: string;
    credentialTitle: string;
    userName: any;
    password: any;
    loginPageUrl: string;
    isWeak: string;
    serviceType: string;
  }) {
    this.credentialServiceName = credential.serviceName;
    this.credentialTitle = credential.credentialTitle;
    this.credentialData = JSON.stringify({
      userName: credential.userName,
      password: credential.password,
    });
    this.credentialUrl = credential.loginPageUrl;
    this.credentialIsWeak = this.parseBoolean(credential.isWeak);
    this.credentialServiceType = credential.serviceType;
    this.credentialPicture = "credentialPicture";
    this.credentialIsFavourite = false;
  }

  parseBoolean(str: string): boolean | null {
    if (str.toLowerCase() === "true") {
      return true;
    } else if (str.toLowerCase() === "false") {
      return false;
    } else {
      // Handle invalid cases or return undefined
      return null;
    }
  }

  toString(): string {
    return `CredentialClass {
  Service Name: ${this.credentialServiceName},
  Credential Title: ${this.credentialTitle},
  Credential Data: ${this.credentialData},
  Credential URL: ${this.credentialUrl},
  Is Weak: ${this.credentialIsWeak},
  Service Type: ${this.credentialServiceType},
  Credential Picture: ${this.credentialPicture},
  Is Favourite: ${this.credentialIsFavourite}
}`;
  }
}
