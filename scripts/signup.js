
import { signup } from "../apis/services/auth.service";
import { errorHandler } from "../libs/error-handler";
import { setSessionToken } from "../libs/session-manager";


const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const usernameInput = document.querySelector(".username-input input");
  const passwordInput = document.querySelector(".password-input input");
  console.log("username", usernameInput.value);
  console.log("password", passwordInput.value);

try {
   const response = await signup({
    username: usernameInput.value,
    password: passwordInput.value,
  });
  setSessionToken(response.token);
} catch (error) {
  errorHandler(error);
  
}

});

