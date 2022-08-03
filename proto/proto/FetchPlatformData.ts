// Original file: proto/platformData.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ContestResponse as _proto_ContestResponse, ContestResponse__Output as _proto_ContestResponse__Output } from '../proto/ContestResponse';
import type { OperationStatus as _proto_OperationStatus, OperationStatus__Output as _proto_OperationStatus__Output } from '../proto/OperationStatus';
import type { Request as _proto_Request, Request__Output as _proto_Request__Output } from '../proto/Request';
import type { SubmissionResponse as _proto_SubmissionResponse, SubmissionResponse__Output as _proto_SubmissionResponse__Output } from '../proto/SubmissionResponse';

export interface FetchPlatformDataClient extends grpc.Client {
  getAllUserSubmissions(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_proto_Request, _proto_OperationStatus__Output>;
  getAllUserSubmissions(options?: grpc.CallOptions): grpc.ClientDuplexStream<_proto_Request, _proto_OperationStatus__Output>;
  getAllUserSubmissions(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_proto_Request, _proto_OperationStatus__Output>;
  getAllUserSubmissions(options?: grpc.CallOptions): grpc.ClientDuplexStream<_proto_Request, _proto_OperationStatus__Output>;
  
  getUserContests(argument: _proto_Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_proto_ContestResponse__Output>): grpc.ClientUnaryCall;
  getUserContests(argument: _proto_Request, metadata: grpc.Metadata, callback: grpc.requestCallback<_proto_ContestResponse__Output>): grpc.ClientUnaryCall;
  getUserContests(argument: _proto_Request, options: grpc.CallOptions, callback: grpc.requestCallback<_proto_ContestResponse__Output>): grpc.ClientUnaryCall;
  getUserContests(argument: _proto_Request, callback: grpc.requestCallback<_proto_ContestResponse__Output>): grpc.ClientUnaryCall;
  getUserContests(argument: _proto_Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_proto_ContestResponse__Output>): grpc.ClientUnaryCall;
  getUserContests(argument: _proto_Request, metadata: grpc.Metadata, callback: grpc.requestCallback<_proto_ContestResponse__Output>): grpc.ClientUnaryCall;
  getUserContests(argument: _proto_Request, options: grpc.CallOptions, callback: grpc.requestCallback<_proto_ContestResponse__Output>): grpc.ClientUnaryCall;
  getUserContests(argument: _proto_Request, callback: grpc.requestCallback<_proto_ContestResponse__Output>): grpc.ClientUnaryCall;
  
  getUserSubmissions(argument: _proto_Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_proto_SubmissionResponse__Output>): grpc.ClientUnaryCall;
  getUserSubmissions(argument: _proto_Request, metadata: grpc.Metadata, callback: grpc.requestCallback<_proto_SubmissionResponse__Output>): grpc.ClientUnaryCall;
  getUserSubmissions(argument: _proto_Request, options: grpc.CallOptions, callback: grpc.requestCallback<_proto_SubmissionResponse__Output>): grpc.ClientUnaryCall;
  getUserSubmissions(argument: _proto_Request, callback: grpc.requestCallback<_proto_SubmissionResponse__Output>): grpc.ClientUnaryCall;
  getUserSubmissions(argument: _proto_Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_proto_SubmissionResponse__Output>): grpc.ClientUnaryCall;
  getUserSubmissions(argument: _proto_Request, metadata: grpc.Metadata, callback: grpc.requestCallback<_proto_SubmissionResponse__Output>): grpc.ClientUnaryCall;
  getUserSubmissions(argument: _proto_Request, options: grpc.CallOptions, callback: grpc.requestCallback<_proto_SubmissionResponse__Output>): grpc.ClientUnaryCall;
  getUserSubmissions(argument: _proto_Request, callback: grpc.requestCallback<_proto_SubmissionResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface FetchPlatformDataHandlers extends grpc.UntypedServiceImplementation {
  getAllUserSubmissions: grpc.handleBidiStreamingCall<_proto_Request__Output, _proto_OperationStatus>;
  
  getUserContests: grpc.handleUnaryCall<_proto_Request__Output, _proto_ContestResponse>;
  
  getUserSubmissions: grpc.handleUnaryCall<_proto_Request__Output, _proto_SubmissionResponse>;
  
}

export interface FetchPlatformDataDefinition extends grpc.ServiceDefinition {
  getAllUserSubmissions: MethodDefinition<_proto_Request, _proto_OperationStatus, _proto_Request__Output, _proto_OperationStatus__Output>
  getUserContests: MethodDefinition<_proto_Request, _proto_ContestResponse, _proto_Request__Output, _proto_ContestResponse__Output>
  getUserSubmissions: MethodDefinition<_proto_Request, _proto_SubmissionResponse, _proto_Request__Output, _proto_SubmissionResponse__Output>
}
