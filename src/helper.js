export const formatNumber = val => {
  if (!val) return 0;

  let delimeter = " ";

  let valReturn = "";
  let place = 0;

  for (let k = 0; k <= val.length; k++) {
    if (k % 3 === 0 && k !== 0) {
      valReturn =
        val.slice(val.length - k, val.length - k + 3) + delimeter + valReturn;
      place++;
    }
  }

  if (val.length - place * 3 !== 0)
    valReturn = val.slice(0, val.length - place * 3) + delimeter + valReturn;

  valReturn = valReturn.slice(0, -1);

  return valReturn;
};

export const compare = (a, b) => JSON.stringify(a) === JSON.stringify(b);
