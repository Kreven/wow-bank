import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./spinner";

export default function Item({ data }) {
  const [icon, setIcon] = useState(0);

  const itemId = data[1];
  const count = data[2];

  useEffect(() => {
    axios
      .get(`https://classic.wowhead.com/tooltip/item/${itemId}`)
      .then(response => setIcon(response.data.icon));
  }, [itemId]);

  return (
    <a
      className="item"
      target="_blank"
      href={`https://classic.wowhead.com/item=${itemId}`}
      data-wh-icon-size="small"
    >
      {icon ? (
        <img
          alt=""
          src={`https://wow.zamimg.com/images/wow/icons/large/${icon}.jpg`}
        />
      ) : (
        <Spinner />
      )}

      {count > 1 && <i>{count}</i>}
    </a>
  );
}
