import React from "react";
import { formatNumber } from "./helper";

export default function Money({ value }) {
  const silver_cooper = value.slice(-4);
  const gold = formatNumber(value.slice(0, -4));
  const silver = silver_cooper.slice(0, -2);
  const copper = silver_cooper.slice(-2);

  const G = () => (
    <>
      {gold}
      <img
        alt="gold"
        src="https://wow.zamimg.com/images/icons/money-gold.gif"
        className="coin"
      />
    </>
  );
  const S = () => (
    <>
      {silver}
      <img
        alt="silver"
        src="https://wow.zamimg.com/images/icons/money-silver.gif"
        className="coin"
      />
    </>
  );
  const C = () => (
    <>
      {copper}
      <img
        alt="copper"
        src="https://wow.zamimg.com/images/icons/money-copper.gif"
        className="coin"
      />
    </>
  );

  return (
    <>
      {gold > 0 && <G />}
      {(gold > 0 || silver > 0) && <S />}
      <C />
    </>
  );
}
