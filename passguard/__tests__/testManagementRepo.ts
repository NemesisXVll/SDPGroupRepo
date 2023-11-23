import UserManagementService from "../repositories/UserManagementService";
import { prismaMock } from "../singleton";

const userManagementService = new UserManagementService();

beforeEach(() => {
  jest.useFakeTimers({ now: new Date() });
});

afterEach(() => {
  jest.useRealTimers();
});

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
