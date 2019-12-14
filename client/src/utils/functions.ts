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
  let letters: any = new Object();
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
    digits: 0.5,
    lower: 0.3,
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

  return parseInt(score.toFixed(1));
};
