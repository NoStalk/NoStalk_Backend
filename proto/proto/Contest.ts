// Original file: proto/platformData.proto

import type { Long } from '@grpc/proto-loader';

export interface Contest {
  'contestName'?: (string);
  'rank'?: (number | string | Long);
  'oldRating'?: (number | string | Long);
  'newRating'?: (number | string | Long);
  'contestId'?: (number | string | Long);
}

export interface Contest__Output {
  'contestName'?: (string);
  'rank'?: (Long);
  'oldRating'?: (Long);
  'newRating'?: (Long);
  'contestId'?: (Long);
}
