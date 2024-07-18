var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_b = function (n) {
  if (n <= 0) return 0;
  return (n * (n + 1)) / 2;
};

var sum_to_n_c = function (n) {
  if (n <= 0) return 0;
  if(n%2 === 1){
    return n * Math.round(n / 2);
  }  
  return n * Math.round(n / 2) + n/2;
};
console.log(sum_to_n_a(100));
console.log(sum_to_n_b(100));
console.log(sum_to_n_c(100));
