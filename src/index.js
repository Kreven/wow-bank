import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/database";

import config from "./config";
import "./styles.css";
import Money from "./money";
import Item from "./item";
import Spinner from "./spinner";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

axios.defaults.headers.post["Content-Type"] = "application/json";

function App() {
  const database = firebase.database();

  const [characters, setCharacters] = useState({});
  const [error, setError] = useState("");

  var chars = database.ref("/characters");

  useEffect(() => {
    chars.once("value").then(function(data) {
      setCharacters(data.val());
    });
  }, []);

  function writeCharData(e) {
    e.preventDefault();

    const str = window.code.value;
    const showBags = window.showBags.checked;

    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

    if (!str || !base64regex.test(str)) return;

    const rawData = atob(str)
      .split(";")
      .map(item => item.split(","));

    if (!rawData || !rawData[0] || !rawData[0][0]) return;

    const name = rawData[0][0];

    if (typeof name !== "string") return;

    const money = rawData[0][1];

    const data = rawData.filter(
      (_, index) => index !== 0 && index !== rawData.length - 1
    );

    const bankSlots = JSON.stringify([-1, 5, 6, 7, 8, 9, 10, 11]);
    const bankData = data.filter(item => bankSlots.includes(item[3]));
    const bagsData =
      showBags && data.filter(item => !bankSlots.includes(item[3]));

    setCharacters({
      ...characters,
      [name]: {
        money,
        bankData,
        bagsData,
        showBags
      }
    });

    database.ref("/characters/" + name).set({
      money,
      bankData,
      bagsData,
      showBags
    });
  }

  const charData = Object.keys(characters);

  return (
    <div className="App">
      <div className="char">
        <>
          {!charData.length && <Spinner size="100px" />}
          {charData.map(item => {
            const { money, bankData, bagsData } = characters[item];
            return (
              <div key={item}>
                <h1>{item}'s wealth</h1>
                <p>
                  Money: <Money value={money} />
                </p>

                {bankData && bankData.length > 0 && (
                  <>
                    <h2>Bank</h2>
                    <div className="bag">
                      {bankData.map(item => (
                        <Item key={item[0] + item[4]} data={item} />
                      ))}
                    </div>
                  </>
                )}

                {bagsData && bagsData.length > 0 && (
                  <>
                    <h2>Bags</h2>
                    <div className="bag">
                      {bagsData.map(item => (
                        <Item key={item[0] + item[4]} data={item} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </>
      </div>

      <form onSubmit={e => writeCharData(e)} style={{ marginTop: 100 }}>
        <h3>Import data</h3>
        <div>
          <textarea ref={node => (window.code = node)} style={{ width: 300 }} />
        </div>
        <label style={{ margin: "10px 0", display: "block" }}>
          <input
            ref={node => (window.showBags = node)}
            type="checkbox"
            defaultChecked
          />
          Show bags
        </label>
        <div>
          <button onClick={writeCharData}>import</button>
        </div>
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
