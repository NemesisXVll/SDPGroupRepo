import UserQueryService from "../repositories/UserQueryService";
import { prismaMock } from "../singleton";

const userQueryService = new UserQueryService();

test("Should Properly Find a User By Id", async () => {
  const userIdToFind = 3;

  const existingUser = {
    userId: userIdToFind,
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

  prismaMock.user.findUnique.mockResolvedValue(existingUser);

  const foundUser = await userQueryService.findUserById(userIdToFind);

  expect(foundUser).toMatchObject({
    userId: userIdToFind,
    data: existingUser.data,
    salt: existingUser.salt,
    dateCreated: expect.any(Date),
    dateUpdated: expect.any(Date),
    picture: existingUser.picture,
  });
});
