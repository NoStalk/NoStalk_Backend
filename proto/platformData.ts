import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { FetchPlatformDataClient as _proto_FetchPlatformDataClient, FetchPlatformDataDefinition as _proto_FetchPlatformDataDefinition } from './proto/FetchPlatformData';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  proto: {
    Contest: MessageTypeDefinition
    ContestResponse: MessageTypeDefinition
    FetchPlatformData: SubtypeConstructor<typeof grpc.Client, _proto_FetchPlatformDataClient> & { service: _proto_FetchPlatformDataDefinition }
    OperationStatus: MessageTypeDefinition
    Request: MessageTypeDefinition
    Submission: MessageTypeDefinition
    SubmissionResponse: MessageTypeDefinition
  }
}

