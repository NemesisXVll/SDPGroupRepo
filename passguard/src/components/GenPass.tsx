import { X } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

export default function Modal({ open, onClose, children }: any) {
  //variables & functions needed:
  ///

  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(20);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const COPY_SUCCESS = "Password successfully copied to clipboard";
  const numbers = "0123456789";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é";

  const handleGeneratePassword = () => {
    let oneChecked = true;
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      oneChecked = false;
      notify("You must Select atleast one option", true);
    }
    let characterList = "";

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters;
    }

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters;
    }

    if (includeNumbers) {
      characterList = characterList + numbers;
    }

    if (includeSymbols) {
      characterList = characterList + specialCharacters;
    }

    const pass = setPassword(createPassword(characterList));
    //test
    console.log(pass);
    if (oneChecked == true) {
      onClose();
    }
  };
  const createPassword = (characterList: string) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };

  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
  };

  const notify = (message: string, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCopyPassword = () => {
    if (password === "") {
      notify("Nothing To Copy", true);
    } else {
      copyToClipboard();
      notify(COPY_SUCCESS);
    }
  };

  //end of variables & functions




  return (
    // backdrop
    <div
      //   onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      {
        /* modal */
        <div className="App">
          <div className="container">
            <div className="generator">
              <div className="genHeader flex justify-between items-center p-1">
                <h2 className="generator__header">Password Generator</h2>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`
          bg-white rounded-xl shadow p-5 flex items-center transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
                >
                  <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1  rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                  >
                    <X />
                  </button>
                  {/* {children} */}
                </div>
              </div>
              <div className="generator__password">
                <h3>{password}</h3>
                <button onClick={handleCopyPassword} className="copy__btn">
                  <i className="far fa-clipboard"></i>
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="password-strength">Password length</label>
                <input
                  defaultValue={passwordLength}
                  onChange={(e) => setPasswordLength(Number(e.target.value))}
                  type="number"
                  id="password-strength"
                  name="password-strength"
                  max="20"
                  min="10"
                />
              </div>

              <div className="form-group">
                <label htmlFor="uppercase-letters">
                  Include Uppercase Letters
                </label>
                <input
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  type="checkbox"
                  id="uppercase-letters"
                  name="uppercase-letters"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lowercase-letters">
                  Include Lowercase Letters
                </label>
                <input
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  type="checkbox"
                  id="lowercase-letters"
                  name="lowercase-letters"
                />
              </div>

              <div className="form-group">
                <label htmlFor="include-numbers">Include Numbers</label>
                <input
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  type="checkbox"
                  id="include-numbers"
                  name="include-numbers"
                />
              </div>

              <div className="form-group">
                <label htmlFor="include-symbols">Include Symbols</label>
                <input
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  type="checkbox"
                  id="include-symbols"
                  name="include-symbols"
                />
              </div>

              <button
                onClick={handleGeneratePassword}
                className="generator__btn"
              >
                Generate Password
              </button>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </div>
        </div>
      }
    </div>
  );
}
