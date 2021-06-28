
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const isNumeric = (str) => {
  if (typeof str != 'string') return false;
  return !isNaN(str) &&
         !isNaN(parseFloat(str));
};

export const sanitize = (value) => {
  return isNumeric(value) ? toCurrency(value) : value;
};

export const removeDecimal = (value) =>{
  value = parseFloat(value);
  return Math.round(value).toString();
};

export const toCurrency = (value) => {
  return numberWithCommas(removeDecimal(value));
};
