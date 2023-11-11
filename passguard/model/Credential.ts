export default class CredentialClass {
  private credentialServiceName: string;
  private credentialTitle: string;
  private credentialData: string;
  private credentialUrl: string;
  private credentialIsWeak: boolean | null;
  private credentialServiceType: string;
  private credentialPicture: string; // Change In DB
  private credentialIsFavourite: boolean;

  constructor(credential: {
    credentialTitle: string;
    isWeak: string;
    loginPageUrl: string;
    password: string;
    serviceName: string;
    serviceType: string;
    username: string;
  }) {
    this.credentialServiceName = credential.serviceName;
    this.credentialTitle = credential.credentialTitle;
    this.credentialData = JSON.stringify({
      username: credential.username,
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
}
