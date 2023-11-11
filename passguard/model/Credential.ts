export default class CredentialClass {
  private CREDENTIAL_SERVICENAME: string;
  private CREDENTIAL_TITLE: string;
  private CREDENTIAL_DATA: object; // Username, Password
  private CREDENTIAL_URL: string;
  private CREDENTIAL_ISWEAK: boolean;
  private CREDENTIAL_SERVICETYPE: string;
  private CREDENTIAL_PICTURE: string; // Change In DB
  private CREDENTIAL_ISFAVOURITE: boolean;

  constructor(credentialData: {
    CREDENTIAL_SERVICENAME: string;
    CREDENTIAL_TITLE: string;
    CREDENTIAL_DATA: object;
    CREDENTIAL_URL: string;
    CREDENTIAL_ISWEAK: boolean;
    CREDENTIAL_SERVICETYPE: string;
    CREDENTIAL_PICTURE: string;
    CREDENTIAL_ISFAVOURITE: boolean;
  }) {
    this.CREDENTIAL_SERVICENAME = credentialData.CREDENTIAL_SERVICENAME;
    this.CREDENTIAL_TITLE = credentialData.CREDENTIAL_TITLE;
    this.CREDENTIAL_DATA = credentialData.CREDENTIAL_DATA;
    this.CREDENTIAL_URL = credentialData.CREDENTIAL_URL;
    this.CREDENTIAL_ISWEAK = credentialData.CREDENTIAL_ISWEAK;
    this.CREDENTIAL_SERVICETYPE = credentialData.CREDENTIAL_SERVICETYPE;
    this.CREDENTIAL_PICTURE = credentialData.CREDENTIAL_PICTURE;
    this.CREDENTIAL_ISFAVOURITE = credentialData.CREDENTIAL_ISFAVOURITE;
  }

  // toString method
  toString(): string {
    return `Credential:
    Service Name: ${this.CREDENTIAL_SERVICENAME}
    Title: ${this.CREDENTIAL_TITLE}
    Data: ${JSON.stringify(this.CREDENTIAL_DATA)}
    URL: ${this.CREDENTIAL_URL}
    Is Weak: ${this.CREDENTIAL_ISWEAK}
    Service Type: ${this.CREDENTIAL_SERVICETYPE}
    Picture: ${this.CREDENTIAL_PICTURE}
    Is Favourite: ${this.CREDENTIAL_ISFAVOURITE}`;
  }
}