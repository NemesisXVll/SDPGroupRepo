import UserManagementService from "../repositories/UserManagementService";
import { prismaMock } from "../singleton";

const userManagementService = new UserManagementService();

jest.useFakeTimers({ now: new Date() });
jest.setTimeout(30000);

test("Should Properly Create a New User ", async () => {
  const user = {
    userId: 3,
    data: JSON.stringify({
      masterPassword: "nonofurbusiness369",
      fName: "Essaa",
      lName: "Ahmed",
      email: "ea2004969@qu.edu.qa",
    }),
    salt: "et52ed",
    dateCreated: new Date(),
    dateUpdated: new Date(),
    picture: "C:/Users/Essa/Mypicture.png",
  };

  prismaMock.user.create.mockResolvedValue(user);

  await expect(userManagementService.createUser(user)).resolves.toEqual({
    userId: 3,
    data: JSON.stringify({
      masterPassword: "nonofurbusiness369",
      fName: "Essaa",
      lName: "Ahmed",
      email: "ea2004969@qu.edu.qa",
    }),
    salt: "et52ed",
    dateCreated: new Date(),
    dateUpdated: new Date(),
    picture: "C:/Users/Essa/Mypicture.png",
  });
});

test("Should Properly Create a New Credential", async () => {
  const credential = {
    credentialId: 1,
    serviceName: "Blackboard",
    title: "My Blackboard Account",
    data: JSON.stringify({
      userName: "ea2004969",
      password: "nonofurbusiness369",
    }),
    url: "https://elearning.qu.edu.qa/",
    isWeak: true,
    isReused: false,
    isOld: false,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    serviceType: "Education",
    picture: "C:/Users/Essa/Mypicture.png",
    isFavourite: false,
    userId: 3,
  };

  prismaMock.credential.create.mockResolvedValue(credential);

  await expect(
    userManagementService.createCredential(credential)
  ).resolves.toEqual({
    credentialId: 1,
    serviceName: "Blackboard",
    title: "My Blackboard Account",
    data: JSON.stringify({
      userName: "ea2004969",
      password: "nonofurbusiness369",
    }),
    url: "https://elearning.qu.edu.qa/",
    isWeak: true,
    isReused: false,
    isOld: false,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    serviceType: "Education",
    picture: "C:/Users/Essa/Mypicture.png",
    isFavourite: false,
    userId: 3,
  });
});

test("Should Properly Throw an Error When Trying to Create a Credential with a Non-Existing User", async () => {
  const nonExistingUserId = 100; //Non Existing User

  const credential = {
    credentialId: 10,
    serviceName: "Facebook",
    title: "My Facebook Account",
    data: JSON.stringify({
      userName: "ea2004969",
      password: "nonofurbusiness369",
    }),
    url: "https://facebook.com",
    isWeak: true,
    isReused: false,
    isOld: false,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    serviceType: "Social Media",
    picture: "C:/Users/Essa/Mypicture.png",
    isFavourite: false,
    userId: nonExistingUserId,
  };

  prismaMock.credential.create.mockResolvedValue(credential);

  await expect(
    userManagementService.createCredential(credential)
  ).rejects.toThrowError("User Doesnt Exist");
});

test("Should Properly Update an Existing Credential", async () => {
  const credentialId = 1;

  const updatedCredentialData = {
    credentialId: credentialId,
    serviceName: "Facebook",
    title: "My Facebook Account",
    data: JSON.stringify({
      userName: "ea2004969",
      password: "newpassword",
    }),
    url: "https://facebook.com",
    isWeak: true,
    isReused: true,
    isOld: false,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    serviceType: "Social Media",
    picture: "C:/Users/Essa/Mypicture.png",
    isFavourite: true,
    userId: 3,
  };

  prismaMock.credential.update.mockResolvedValue(updatedCredentialData);

  const updatedCredential = await userManagementService.updateCredentialById(
    credentialId,
    updatedCredentialData
  );

  expect(updatedCredential).toEqual(updatedCredentialData);
});

test("Should Properly Delete an Existing Credential", async () => {
  const credentialIdToDelete = 1;

  const deletedCredentialData = {
    credentialId: credentialIdToDelete,
    serviceName: "Facebook",
    title: "My Facebook Account",
    data: JSON.stringify({
      userName: "ea2004969",
      password: "newpassword",
    }),
    url: "https://facebook.com",
    isWeak: true,
    isReused: true,
    isOld: false,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    serviceType: "Social Media",
    picture: "C:/Users/Essa/Mypicture.png",
    isFavourite: true,
    userId: 3,
  };

  prismaMock.credential.delete.mockResolvedValue(deletedCredentialData);

  const deletedCredential = await userManagementService.deleteCredentialById(
    credentialIdToDelete
  );

  expect(deletedCredential).toEqual(deletedCredentialData);
});

test("Should Properly Throw an Error When Trying to Update a Non-Existing Credential", async () => {
  const nonExistingCredentialId = 100;

  const nonExistingCredential = {
    credentialId: nonExistingCredentialId,
    serviceName: "Youtube",
    title: "My Youtube Account",
    data: JSON.stringify({
      userName: "nemesisgames123",
      password: "nonofurbusiness2469",
    }),
    url: "https://youtube.com/",
    isWeak: true,
    isReused: false,
    isOld: false,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    serviceType: "Entertainment",
    picture: "C:/Users/Essa/Mypicture.png",
    isFavourite: false,
    userId: 3,
  };

  prismaMock.credential.update.mockResolvedValue(nonExistingCredential);

  await expect(
    userManagementService.updateCredentialById(
      nonExistingCredentialId,
      nonExistingCredential
    )
  ).rejects.toThrowError("Credential Doesnt Exist");
});

test("Should Properly Throw an Error When Trying to Delete a Non-Existing Credential", async () => {
  const nonExistingCredentialId = 100;

  const nonExistingCredential = {
    credentialId: nonExistingCredentialId,
    serviceName: "Youtube",
    title: "My Youtube Account",
    data: JSON.stringify({
      userName: "nemesisgames123",
      password: "nonofurbusiness2469",
    }),
    url: "https://youtube.com/",
    isWeak: true,
    isReused: false,
    isOld: false,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    serviceType: "Entertainment",
    picture: "C:/Users/Essa/Mypicture.png",
    isFavourite: false,
    userId: 3,
  };

  prismaMock.credential.delete.mockResolvedValue(nonExistingCredential);

  await expect(
    userManagementService.deleteCredentialById(nonExistingCredentialId)
  ).rejects.toThrowError("Credential Doesnt Exist");
});
