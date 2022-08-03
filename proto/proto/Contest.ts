// Original file: proto/platformData.proto


export interface Contest {
  'contestName'?: (string);
  'rank'?: (number | string);
  'oldRating'?: (number | string);
  'newRating'?: (number | string);
  'ratingUpdateTimeSeconds'?: (number | string);
  'contestId'?: (number | string);
}

export interface Contest__Output {
  'contestName'?: (string);
  'rank'?: (number);
  'oldRating'?: (number);
  'newRating'?: (number);
  'ratingUpdateTimeSeconds'?: (number);
  'contestId'?: (number);
}
