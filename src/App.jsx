import { useState, useCallback, useEffect, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000); // Reset after 2 seconds
  };

  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "@#$%^&*()[]<>?~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  const copyPassToClip = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.select();
      // inputRef.current.setSelectionRange(0, 10);
    }
  }, [password]);

  return (
    <>
      <div className="main">
        <h1 className="text-white text-center font-extrabold text-4xl pb-5 font-serif">
          Password Generator
        </h1>
        <div className="text-center mt-5 mb-5 w-full min-w-[200px]">
          <input
            className="w-full max-w-md bg-transparent placeholder:text-slate-900 font-bold text-lg text-white font-mono border border-slate-200 rounded-l-md px-3 py-3 transition duration-300 ease focus:outline-none shadow-lg focus:shadow"
            placeholder="Generate Password"
            type="text"
            ref={inputRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            readOnly
          />
          <CopyToClipboard text={password} onCopy={handleCopy}>
            <button
              onClick={copyPassToClip}
              className="text-white text-lg bg-slate-900 px-5 py-3 rounded-r-md"
            >
              copy
            </button>
          </CopyToClipboard>
          {isCopied && <p className="copy">Copied!</p>}
        </div>
        <div className="flex justify-center w-full">
          <div className=" flex justify-between w-6/12">
            <div className="flex justify-center items-center gap-x-1">
              <input
                className="cursor-pointer"
                type="range"
                min={8}
                max={20}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label className="text-white">Length: {length}</label>
            </div>
            <div>
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                id="numberInput"
                onChange={() => {
                  setNumAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput" className="text-white  ml-2">
                Numbers
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput" className="text-white ml-2">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
