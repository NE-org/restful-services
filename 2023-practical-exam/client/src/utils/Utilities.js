export const formatDate = (d) => {
  const date = new Date(d);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return (d = dd + "/" + mm + "/" + yyyy);
};

export const formatTime = (d) => {
  const date = new Date(d);
  let hh = date.getHours();
  let mm = date.getMinutes();
  if (hh < 10) {
    hh = "0" + hh;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return hh + ":" + mm;
};

