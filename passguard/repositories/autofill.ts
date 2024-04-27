// import puppeteer from 'puppeteer';

// // (async () => {
// //     const browser = await puppeteer.launch({ headless: false });
// //     const page = await browser.newPage();
// //     await page.goto(
// // 			https://sts.qu.edu.qa/adfs/ls/?SAMLRequest=fVFNb4JAEP0rm7nD8iXFjWBsjamJjUSwh17MFoZKAovuLKY%2Fv9SP1F68TDKZN%2B%2FNvDeZfrcNO6GmulMxuLYDDFXRlbX6imGbL6wIpsmEZNt4BzHrzV5t8NgjGTYsKhKXSQy9VqKTVJNQskUSphDZ7G0lPNsRB92ZrugaYDMi1GaQeukU9S3qDPWpLnC7WcWwN%2BZAgnNsUGo1HGAfexvL3j5KLgdl61eLn0uWrblsakl85%2FrezgU2H06qlTTnN25MZOieo6yIN8SBLTpd4PmZGCrZEAJbzmOQvlOEQRFFuJdh5I2isKzK6sktytEoCAYMpZKoPuHfFlGPS0VGKhOD53iB5QSWO86dsfB94YW2G0YfwNKrA8%2B1ujj7yK7PC4jEa56nVrrOcmDvt4QGAFzzEGd1fR%2FEY2J5cx%2BSB15P%2BD17cm3%2Fh5%2F8AA%3D%3D&SigAlg=http%3A%2F%2Fwww.w3.org%2F2001%2F04%2Fxmldsig-more%23rsa-sha256&Signature=USI639gFjpM3D%2F8baW50hH8Vq%2FYRRdG4yXE1o4laYxvJ4c8ohE9ZHzCdCcYhXBu0opYqn4kLxpqE4DmTCBjQbc5NBXRECdvva3TldoPS5gyjUuI%2BCOIV1mjMbLOearNyeT%2BCWOoDlKVIjIF3YrcyVkR1BcMmzkrP16qf%2F%2B%2B8dHgcmftAJqy%2BcUrOBFYEQwnuwTQayyOVC8FEuwo7fsO6htQU2Ektov3YefoS5IXdQ9nkayBFcXrr2x9VXGmdTIM12g1TYIKifpctAi%2B7eCM5AmxxjKfdPUEiCBMoQ2MRY1BD3FgatyCIUdBA8VVxNLfqet6vHUaJx4eNse%2FEeuyrCg%3D%3D"
// //     );
// //     await page.type('#userNameInput', 'username');
// //     await page.type('#passwordInput', 'password');
// //     await page.waitForNavigation();
// //     await page.screenshot({ path: 'google.png' });
// // })();
// export default class Autofill{

//    async fillLoginForm(loginUrl: any, username?: any, password?: any) {
//       try {
//          const browser = await puppeteer.launch({ headless: false });
//          const page = await browser.newPage();
//          await page.goto(loginUrl);
//          await page.type('#userNameInput', username);
//          await page.type('#passwordInput', password);
//       } catch (error) {
//          console.log('ERR: ',error);
//       }
//  }
// }
import { BrowserWindow } from "electron";

export default class Autofill {
	async fillLoginForm(loginUrl: any, username: any, password: any) {
		try {
			// Create a new BrowserWindow
			const mainWindow = new BrowserWindow({
				width: 1124,
				height: 680,
				autoHideMenuBar: true,
				webPreferences: {
					// nodeIntegration: true, // Enable Node.js integration in the renderer process
				},
			});

			console.log("at electron loginUrl", loginUrl);
			console.log("at electron username", username);
			console.log("at electron password", password);

			// Load the login URL
			mainWindow.loadURL(
				"https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252Faccount%26feature%3Dredirect_login&hl=en&ifkv=ARZ0qKKkByQFDDVOtcckrHHArrkFARnFFv7ILfImaD44n4ycC6HEPLNisvb0kLwsRHh2DgbQNTTA&passive=true&service=youtube&uilel=3&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-670738750%3A1713550691197669&theme=mn&ddm=0"
			);

			// Wait for the DOM to be ready
			mainWindow.webContents.on("dom-ready", () => {
				// Inject JavaScript to fill username and password fields
				mainWindow.webContents.executeJavaScript(`
        // Function to wait for an element to be available
        const waitForElement = (selector, timeout = 10000) => {
            return new Promise((resolve, reject) => {
                const startTime = Date.now();
                const interval = setInterval(() => {
                    const element = document.querySelector(selector);
                    if (element) {
                        clearInterval(interval);
                        resolve(element);
                    } else if (Date.now() - startTime >= timeout) {
                        clearInterval(interval);
                        reject(new Error('Timeout waiting for element'));
                    }
                }, 100); // Check every 100 milliseconds
            });
        };

        // Fill in username and password fields function
        const fillLoginForm = async () => {
            try {
                // Find the username input field
                const usernameInput = document.querySelector('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="username"], input[autocomplete="username"], input[id="username"]');
                // Find the password input field
                const passwordInput = document.querySelector('input[type="password"], input[id="password"], input[name="password"]');

                // Check if there's a "Next" button
                const nextButton = document.querySelector('button[type="submit"],button[value="Next"]');
                if (nextButton && usernameInput) {
                    // Fill in the username field
					console.log("inpitting name")
                    usernameInput.value = '${username}';
                    // Dispatch input and change events
                    usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
                    usernameInput.dispatchEvent(new Event('change', { bubbles: true }));
                   
					// nextButton.click();
				

                    // Wait for the password input field to become available
                    await waitForElement('input[type="password"], input[id="password"], input[name="password"]');
                }

                // Fill in the username and password fields
                if (usernameInput.value === "" && usernameInput) {
					console.log("inpitting name")
                    usernameInput.value = '${username}';
                    // Dispatch input and change events
                    usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
                    usernameInput.dispatchEvent(new Event('change', { bubbles: true }));
                } else {
				
                    console.log('ERR: Username input not found');
                }
                if (passwordInput && passwordInput.value === "") {
					console.log("inpitting password")
					    passwordInput.setAttribute('value', '${password}');

                    passwordInput.value = '${password}';
                    // Dispatch input and change events
                    passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
                    passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
                } else {
                    console.log('ERR: Password input not found');
                }
            } catch (error) {
                console.error('Error filling login form:', error);
            }
        };

        // Call fillLoginForm function
        fillLoginForm();
    `);
			});
		} catch (error) {
			console.error("ERR: ", error);
		}
	}
}

/*Working URLs
https://linkedin.com/login
https://sts.qu.edu.qa/adfs/ls/?SAMLRequest=fZFPb8IwDMW%2FSuR7mzaFDiIKYkNoSExUtOywCwrFhUglhThF%2B%2Fjr%2BKOxC5dIVuz37N8bjL4PFTujJV2bBEI%2FAIamqLfa7BJY5VOvB6PhgNShEkc5btzeLPHUIDnWDhqS158EGmtkrUiTNOqAJF0hs%2FHHXAo%2FkEdbu7qoK2BjIrSutXqrDTUHtBnasy5wtZwnsHfuSJJzrFBZ0y7gnxoft41%2FUly1zt6vF788WbbgqtKK%2BDqMxDoENmlX0ka5yxl3JXL0qLEtiVfEgU1rW%2BDlmARKVRECm00SUFEXd71SxLsNipcoELGK4n6hI70pd5vWZEapItJn%2FBsjanBmyCnjEhCB6HhBxwv7eRjLSMig64u4%2FwUsvSF41eaK9hmvzbWJ5Huep166yHJgn%2FeI2ga4BSIv7vYxiefC6o4fhk9gD%2Fij%2BvBW%2Fk9%2F%2BAM%3D&SigAlg=http%3A%2F%2Fwww.w3.org%2F2001%2F04%2Fxmldsig-more%23rsa-sha256&Signature=gnwpGfVcSpNIQ7BEBQ4RTgmHZD4aKcjCzF%2FhGxenk7RR1MPKJU%2BQO5U%2F6daEW8rYDhOjSD4z9g9odEJhbsqKqDplqNmuXwYdgBV4O8VPRI9zxVrIv6Lw3d%2Ft5sK3TRjOK8Flro773oijYrrqhJbH1W12ICvhIpljRSbO2wp82pmfGMt%2Fh20PRh6d%2BZ8JOOZmfSZa0omxAr293h5EdDBmp3hT6CqUufW7731TZkLXzngIBqGMQkAjoh8cHoV88QJllxcxs4dl%2FSa5bJ9TRfh7Q1yZoF1XenkM810lj39OLpR5CFuXuNwmVatFkily7QmXiQJsD15Bo4MDnTafPqU%2FkA%3D%3D
https://www.facebook.com/
"https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&sgfl=gh&ru=https%3A%2F%2Fwww.ebay.com%2F"
"https://www.paypal.com/signin"


*/
