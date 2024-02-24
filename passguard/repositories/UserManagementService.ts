import prisma from "../client";
import UserQueryService from "./UserQueryService";
import { encryptData, decryptData } from "./Security/Encryption";
let tmpUpdate = false;

const userQueryService = new UserQueryService();
export default class UserManagementService {
  //Add Methods Here for Creating, Updating, and Deleting
  //Use this example signature --> async createUser() {}

  //-------------------------User Model-------------------------//
  // async signUp(userData: any, userSalt: any) {
  //   try {
  //     // Check if a user with the provided USER_DATA already exists
  //     const existingUser = await prisma.user.findUnique({
  //       where: { data: userData },
  //     });

  //     if (existingUser) {
  //       throw new Error("User with this USER_DATA already exists");
  //     }

  //     // Create the new user with the provided USER_DATA, USER_SALT, and a default USER_PICTURE
  //     const user = await prisma.user.create({
  //       data: {
  //         data: userData,
  //         salt: userSalt,
  //         picture: null, // Replace with the actual picture data if available
  //       },
  //     });

  //     return user.userId;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async checkSecurityAnswer(userData: any, securityAnswer: any) {
    try {
      // Find the user by USER_DATA and include the SECURITYQUESTION
      const user = await prisma.user.findUnique({
        where: { data: userData },
        include: {
          securityquestions: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Check if there is a matching security answer
      const matchingSecurityAnswer = user.securityquestions.find(
        (question: { data: any }) => question.data === securityAnswer
      );

      if (!matchingSecurityAnswer) {
        throw new Error("Incorrect security question answer");
      }

      return user; // Return the user if the answer is correct
    } catch (error) {
      throw error;
    }
  }

  async login(userData: any, securityAnswer: any) {
    try {
      // Find the user by USER_DATA and include the SECURITYQUESTION
      const user = await prisma.user.findUnique({
        where: { data: userData },
        include: {
          securityquestions: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Check if there is a matching security answer
      const matchingSecurityAnswer = user.securityquestions.find(
        (question: { data: any }) => question.data === securityAnswer
      );

      if (!matchingSecurityAnswer) {
        throw new Error("Incorrect security question answer");
      }

      return user; // Return the user if the answer is correct
    } catch (error) {
      throw error;
    }
  }

  async createUser(user: any) {
    try {
      const newUser = await prisma.user.create({
        data: user,
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(userId: any) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { userId: userId },
      });
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUserById(userId: any, user: any) {
    try {
      const updatedUser = await prisma.user.update({
        where: { userId: userId },
        data: user,
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

	//-------------------------Credential Model-------------------------//
	async createCredential(credential: any) {
		await checkForReusedPasswordOnCreation(credential);
		const encryptedData = encryptData(credential.data, "password");
		try {
			const newCredential = await prisma.credential.create({
				data: {
					...credential,
					data: encryptedData,
				},
			});
			return newCredential;
		} catch (error) {
			throw error;
		}
	}
	async trashCredentialById(credentialId: number) {
		await checkForReusedPasswordOnDeletion(credentialId);
		try {
			const trashedCredential = await prisma.credential.update({
				where: { credentialId: credentialId },
				data: {
					credentialId: credentialId,
					isTrashed: true,
					dateTrashed: new Date().toISOString(),
				},
			});
			return trashedCredential;
		} catch (error) {
			throw error;
		}
	}
	async recoverCredentialById(credentialId: number) {
		const recoveredCredential = await userQueryService.getCredentialById(credentialId);
		await checkForReusedPasswordOnCreation(recoveredCredential);
		try {
			const recoveredCredential = await prisma.credential.update({
				where: { credentialId: credentialId },
				data: { isTrashed: false },
			});
			return recoveredCredential;
		} catch (error) {
			throw error;
		}
	}
	async deleteCredentialById(credentialId: number) {
		await checkForReusedPasswordOnDeletion(credentialId);
		try {
			const deletedCredential = await prisma.credential.delete({
				where: { credentialId: credentialId },
			});
			return deletedCredential;
		} catch (error) {
			throw error;
		}
	}

	async updateCredentialById(credentialId: any, credential: any) {
		try {
			const updatedCredential = await prisma.credential.update({
				where: { credentialId: credentialId },
				data: credential,
			});
			return updatedCredential;
		} catch (error) {
			throw error;
		}
	}
	async updateCredentialValidityById(credentialId: any) {
		try {
			console.log("Updating credential validity for ID:", credentialId);
			const updatedCredential = await prisma.credential.update({
				where: { credentialId: credentialId },
				data: { isOld: true },
			});
			console.log("Credential updated successfully:", updatedCredential);

			// Ensure that updatedCredential is a valid object
			if (updatedCredential && typeof updatedCredential === "object") {
				return updatedCredential;
			} else {
				console.error("Invalid response from database:", updatedCredential);
				// Handle the invalid response appropriately
			}
		} catch (error) {
			console.error("Error updating credentials' validity", error);
		}
	}

  //-------------------------Security Question Model-------------------------//
  async createSecurityQuestion(securityQuestion: any) {
    try {
      const newSecurityQuestion = await prisma.securityQuestion.create({
        data: securityQuestion,
      });
      return newSecurityQuestion;
    } catch (error) {
      throw error;
    }
  }

  async deleteSecurityQuestionById(securityQuestionId: any) {
    try {
      const deletedSecurityQuestion = await prisma.securityQuestion.delete({
        where: { securityQuestionId: securityQuestionId },
      });
      return deletedSecurityQuestion;
    } catch (error) {
      throw error;
    }
  }

  async updateSecurityQuestionById(
    securityQuestionId: any,
    securityQuestion: any
  ) {
    try {
      const updatedSecurityQuestion = await prisma.securityQuestion.update({
        where: { securityQuestionId: securityQuestionId },
        data: securityQuestion,
      });
      return updatedSecurityQuestion;
    } catch (error) {
      throw error;
    }
  }

  //-------------------------Trash Model-------------------------//
  async createTrash(trash: any) {
    try {
      const newTrash = await prisma.trash.create({
        data: trash,
      });
      return newTrash;
    } catch (error) {
      throw error;
    }
  }

  async deleteTrashById(trashId: any) {
    try {
      const deletedTrash = await prisma.trash.delete({
        where: { trashId: trashId },
      });
      return deletedTrash;
    } catch (error) {
      throw error;
    }
  }

  async updateTrashById(trashId: any, trash: any) {
    try {
      const updatedTrash = await prisma.trash.update({
        where: { trashId: trashId },
        data: trash,
      });
      return updatedTrash;
    } catch (error) {
      throw error;
    }
  }
}

const checkForReusedPasswordOnCreation = async (credential: any) => {
	console.log("checking for reused password on creation", credential);
	const password = JSON.parse(credential.data).password;
	console.log("password", password);
	const allCredentials = await userQueryService.getAllCurrentCredentials();
	const existingCredentials = allCredentials.filter((cred) => {
		const credData = JSON.parse(cred.data);
		return credData.password === password;
	});
	if (existingCredentials.length > 0) {
		for (const cred of existingCredentials) {
			await prisma.credential.update({
				where: { credentialId: cred.credentialId },
				data: { isReused: true },
			});
		}
		credential.isReused = true;
	}
};
const checkForReusedPasswordOnDeletion = async (credentialId: any) => {
	const data = await userQueryService.getDataByCredentialId(credentialId);
	if (!data) return;
	const password = JSON.parse(JSON.stringify(data.data)).password;
	const allCredentials = await userQueryService.getAllCurrentCredentials();
	const existingCredentials = allCredentials.filter((cred) => {
		const credData = JSON.parse(cred.data);
		return credData.password === password;
	});
	if (existingCredentials.length == 2) {
		// 2 because the one being deleted is also included
		for (const cred of existingCredentials) {
			await prisma.credential.update({
				where: { credentialId: cred.credentialId },
				data: { isReused: false },
			});
		}
	}
};
// prisma.$use(async (params, next) => {
// 	if (params.model == "Credential" && params.action == "create") {
// 		console.log("creating credential");
// 		const { data } = params.args;
// 		const password = JSON.parse(data.data).password;
// 		// console.log("password caught: ", (password));
// 		const allCredentials = await prisma.credential.findMany();

// 		const existingCredentials = allCredentials.filter((credential) => {
// 			const credentialData = JSON.parse(credential.data);
// 			return credentialData.password === password;
// 		});
// 		// console.log("creds with same password: ", existingCredentials);
// 		if (existingCredentials.length > 0) {
// 			for (const credential of existingCredentials) {
// 				// console.log("same password found!!!", credential.credentialId);
// 				tmpUpdate = true;
// 				await prisma.credential.update({
// 					where: { credentialId: credential.credentialId },
// 					data: { isReused: true },
// 				});
// 			}
// 			data.isReused = true;
// 		}
// 	}
// 	return await next(params);
// });
// prisma.$use(async (params, next) => {
// 	const userQueryService = new UserQueryService();
// 	if (params.model == "Credential" && params.action == "delete") {
// 		const { where } = params.args;
// 		const data = await userQueryService.getDataByCredentialId(
// 			where.credentialId
// 		);
// 		const password = JSON.parse(JSON.parse(JSON.stringify(data)).data).password;
// 		const allCredentials = await prisma.credential.findMany({
// 			where: {
// 				NOT: [{ credentialId: where.credentialId }],
// 			},
// 		});
// 		const existingCredentials = allCredentials.filter((credential) => {
// 			const credentialData = JSON.parse(credential.data);
// 			return credentialData.password === password;
// 		});
// 		if (existingCredentials.length == 1) {
// 			tmpUpdate = true;
// 			await prisma.credential.update({
// 				where: { credentialId: existingCredentials[0].credentialId },
// 				data: { isReused: false },
// 			});
// 		}
// 	}
// 	return await next(params);
// });

// prisma.$use(async (params, next) => {
// 	if (
// 		params.model == "Credential" &&
// 		params.action == "update" &&
// 		tmpUpdate != true
// 	) {
// 		console.log("updating credential");
// 		const userQueryService = new UserQueryService();
// 		const { data } = params.args;
// 		console.log(data);
// 		const newPassword = JSON.parse(data.data).password;

// 		const oldData = await userQueryService.getDataByCredentialId(
// 			data.credentialId
// 		);
// 		const oldPassword = JSON.parse(
// 			JSON.parse(JSON.stringify(oldData)).data
// 		).password;
// 		const allCredentials = await prisma.credential.findMany({
// 			where: {
// 				NOT: [{ credentialId: data.credentialId }],
// 			},
// 		});
// 		console.log("all creds:", allCredentials);

// 		if (oldPassword == newPassword || allCredentials.length == 0) {
// 			tmpUpdate = false;
// 			return next(params);
// 		}
// 		if (
// 			allCredentials.length == 1 &&
// 			JSON.parse(allCredentials[0].data).password != newPassword
// 		) {
// 			data.isReused = false;
// 			tmpUpdate = true;
// 			await prisma.credential.update({
// 				where: { credentialId: allCredentials[0].credentialId },
// 				data: { isReused: false },
// 			});
// 		} else if (
// 			allCredentials.length == 1 &&
// 			JSON.parse(allCredentials[0].data).password == newPassword
// 		) {
// 			data.isReused = true;
// 			tmpUpdate = true;
// 			await prisma.credential.update({
// 				where: { credentialId: allCredentials[0].credentialId },
// 				data: { isReused: true },
// 			});
// 		} else {
// 			const existingCredentials = allCredentials.filter((credential) => {
// 				// console.log("credential: ", credential);
// 				const credentialData = JSON.parse(credential.data);
// 				return credentialData.password === newPassword;
// 			});
// 			// console.log("creds with same password: ", existingCredentials);
// 			if (existingCredentials.length > 0) {
// 				for (const credential of existingCredentials) {
// 					// console.log("same password found!!!", credential.credentialId);
// 					tmpUpdate = true;
// 					await prisma.credential.update({
// 						where: { credentialId: credential.credentialId },
// 						data: { isReused: true },
// 					});
// 				}
// 				data.isReused = true;
// 			} else {
// 				data.isReused = false;
// 			}
// 		}
// 		// Next checking if old password had exactly one other cred with the same pass
// 		// const userQueryService = new UserQueryService();
// 		// console.log("checking for: ",data.credentialId)
// 		// const oldData = await userQueryService.getDataByCredentialId(
// 		// 	data.credentialId
// 		// );
// 		// console.log("old Data for above cred id", oldData)
// 		// const oldPassword = JSON.parse(
// 		// 	JSON.parse(JSON.stringify(oldData)).data
// 		// ).password;
// 		// console.log("old pass", oldPassword);
// 		// const otherCredentials = allCredentials.filter((credential) => {
// 		// 	console.log("error here??:", credential);
// 		// 	const credentialData = JSON.parse(credential.data);
// 		// 	console.log("is parsing good: ",credentialData.password)
// 		// 	return credentialData.password === oldPassword;
// 		// });
// 		// if (otherCredentials.length == 1) {
// 		// 	await prisma.credential.update({
// 		// 		where: { credentialId: otherCredentials[0].credentialId },
// 		// 		data: { isReused: false },
// 		// 	});
// 		// }
// 	}
// 	tmpUpdate = false;
// 	return next(params);
// });
// prisma.$use(async (params, next) => {
// 	const userQueryService = new UserQueryService();
// 	if (params.model == "Credential" && params.action == "update" && params.args.data.isTrashed == true) {
// 		const { where } = params.args;
// 		console.log("updating trash credential id: ", where.credentialId);
// 		const data = await userQueryService.getDataByCredentialId(
// 			where.credentialId
// 		);
// 		const password = JSON.parse(JSON.parse(JSON.stringify(data)).data).password;
// 		const allCredentials = await prisma.credential.findMany({
// 			where: {
// 				NOT: [{ credentialId: where.credentialId }],
// 			},
// 		});
// 		const existingCredentials = allCredentials.filter((credential) => {
// 			const credentialData = JSON.parse(credential.data);
// 			return credentialData.password === password;
// 		});
// 		if (existingCredentials.length == 1) {
// 			tmpUpdate = true;
// 			await prisma.credential.update({
// 				where: { credentialId: existingCredentials[0].credentialId },
// 				data: { isReused: false },
// 			});
// 		}
// 	}
// 	return await next(params);
// });
// prisma.$use(async (params, next) => {
// 	if (
// 		params.action == "update" &&
// 		params.args.data.isTrashed == true
// 	) {
// 		console.log("trashing credential");
// 		const { data } = params.args;
// 		const credentialId = data.credentialId;
// 		const allCredentials = await prisma.credential.findMany({
// 			where: {
// 				NOT: [{ credentialId: credentialId }],
// 			},
// 		});
// 		const oldData = await prisma.credential.findUnique({
// 			where: { credentialId: credentialId },
// 		});
// 		const oldPassword = JSON.parse(
// 			JSON.parse(JSON.stringify(oldData)).data
// 		).password;
// 		const existingCredentials = allCredentials.filter((credential) => {
// 			const credentialData = JSON.parse(credential.data);
// 			return credentialData.password === oldPassword;
// 		});
// 		if (existingCredentials.length == 1) {
// 			tmpUpdate = true;
// 			await prisma.credential.update({
// 				where: { credentialId: existingCredentials[0].credentialId },
// 				data: { isReused: false },
// 			});
// 		}
// 	}
// 	tmpUpdate = false;
// 	return next(params);
// });

//Logic and use cases
//in creation , check if password is already reused, if yes, change all creds with same pass to true else do nothing
//in delete, if password was reused, and there is only 1 other credential that has the same pass, change that credentials boolean to false else do nothing
//in update, if its reused boolean was set to true, check same pass credentials, if match keep reused to true and set other matching credentials to true
//in update, if its reused boolean was set to true, check other credentials, if no match only changed its reused to false
//in update, if its reused boolean was set to false, check other credentials, if match change all matching boolean to true
//in update, if its reused boolean was set to false, check other credentials,

//updating to a pass non existent works
//updating to a pass existent.
