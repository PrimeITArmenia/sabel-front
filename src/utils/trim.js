const trim = (str = "") => {
  const arr = str.trim().split(" ");

  return arr.filter((n, i) => !!n && arr.indexOf(n) === i).join(" ");
};

export default trim;
