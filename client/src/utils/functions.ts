export const styleProgress = (str: number): any => {
  if (str < 30) {
    return "danger";
  } else if (str < 60) {
    return "warning";
  } else if (str < 85) {
    return "info";
  } else {
    return "success";
  }
};

export const scorePassword = (pass: string): number => {
  let score: number = 0;
  if (!pass) return score;
  console.log("go");
  // award every unique letter until 5 repetitions
  let letters: any = {};
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1;
    score += 2.0 / letters[pass[i]];
  }

  // bonus points for mixing it up
  const variations: any = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass)
  };

  const weights: any = {
    digits: 0.7,
    lower: 0.5,
    upper: 0.75,
    nonWords: 1
  };

  let variationCount: number = 0;
  for (let check in variations) {
    if (variations[check]) {
      variationCount += weights[check];
    }
  }
  score += (variationCount - 1) * 20;
  const number = parseInt(score.toFixed(1));
  return number > 100 ? 100 : number;
};

export const generatePassword = (length: number): string => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=;,./";
  let retVal: string = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};
