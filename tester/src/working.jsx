import React, { useState } from "react";
import axios from "axios";
import logo from "./assets/i.webp";

const Working = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [Body, setBody] = useState("JSON");
  const [Auth, setAuth] = useState("No Auth");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bearerToken, setBearerToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiKeyName, setApiKeyName] = useState("");
  const [customHeaderKey, setCustomHeaderKey] = useState("");
  const [customHeaderValue, setCustomHeaderValue] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [thirdPart, setThirdPart] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleRequest = async () => {
    try {
      const headers = {};

      if (Auth === "Bearer Token") {
        headers["Authorization"] = `Bearer ${bearerToken}`;
      } else if (Auth === "Api Key") {
        headers[apiKeyName] = apiKey;
      } else if (Auth === "Custom Header") {
        headers[customHeaderKey] = customHeaderValue;
      }

      const authConfig =
        Auth === "Basic Auth" ? { auth: { username, password } } : {};

      let data = undefined;
      if (method !== "GET" && method !== "DELETE") {
        if (Body === "JSON") {
          data = { sample: "your data here" };
          headers["Content-Type"] = "application/json";
        }
      }

      const response = await axios({
        method,
        url,
        headers,
        data,
        ...authConfig,
      });

      console.log("Response:", response.data);
      setResponseData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div id="Header">
        <div id="lona">
          <img src={logo} alt="" />
          <h3>Mr API</h3>
        </div>
        <p className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </p>
      </div>

      <div id="page">
        <div id="request">
          <div id="frst">
            <h3>Request Configuration</h3>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>

            <input
              type="text"
              value={url}
              placeholder="Enter URL"
              onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={handleRequest}>
              <i className="fa-solid fa-play"></i> Run
            </button>
          </div>

          <div id="second">
            <button onClick={() => setThirdPart(1)}>
              <i className="fa-solid fa-atom"></i> Auth
            </button>
            <button onClick={() => setThirdPart(2)}> Head </button>
            <button onClick={() => setThirdPart(3)}> Body </button>
          </div>

          <div id="conditions">
            <div
              id="head-type"
              style={{ display: thirdPart === 2 ? "block" : "none" }}
            >
              <h3>Head values</h3>
              <input type="text" placeholder="KEY" />
              <input type="text" placeholder="VALUE" />
            </div>

            <div
              id="Body-Type"
              style={{ display: thirdPart === 3 ? "block" : "none" }}
            >
              <h3>Body type</h3>
              <select value={Body} onChange={(e) => setBody(e.target.value)}>
                <option value="JSON">JSON</option>
                <option value="Form URL Encoded">Form URL Encoded</option>
                <option value="Multipart Form Data">Multipart Form Data</option>
                <option value="RAW">RAW</option>
                <option value="Binary">Binary</option>
              </select>
            </div>

            <div
              id="Auth"
              style={{ display: thirdPart === 1 ? "block" : "none" }}
            >
              <h3>Authentication type</h3>
              <select value={Auth} onChange={(e) => setAuth(e.target.value)}>
                <option value="No Auth">No Auth</option>
                <option value="Basic Auth">Basic Auth</option>
                <option value="Api Key">Api Key</option>
                <option value="Bearer Token">Bearer Token</option>
                <option value="Custom Header">Custom Header</option>
              </select>

              {Auth === "Basic Auth" && (
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              )}

              {Auth === "Bearer Token" && (
                <input
                  type="text"
                  placeholder="Bearer Token"
                  value={bearerToken}
                  onChange={(e) => setBearerToken(e.target.value)}
                />
              )}

              {Auth === "Api Key" && (
                <>
                  <input
                    type="text"
                    placeholder="API Key Name"
                    value={apiKeyName}
                    onChange={(e) => setApiKeyName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="API Key Value"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </>
              )}

              {Auth === "Custom Header" && (
                <>
                  <input
                    type="text"
                    placeholder="Header Key"
                    value={customHeaderKey}
                    onChange={(e) => setCustomHeaderKey(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Header Value"
                    value={customHeaderValue}
                    onChange={(e) => setCustomHeaderValue(e.target.value)}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div id="output">
          <pre>
            {responseData ? JSON.stringify(responseData, null, 2) : ""}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Working;
