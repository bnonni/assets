import emitSubscriptionError from './emit_subscription_error.js';
import handleRemoveListener from './handle_remove_listener.js';
import GrpcServices from './grpc_services.json' assert { type: "json" };
import { PackageTypes, ProtoFiles, ServiceTypes } from './types.js';

const protosDir = GrpcServices.protosDir;
const defaultSocket = GrpcServices.defaultSocket;
const protoFiles: ProtoFiles = GrpcServices.protoFiles;
const grpcSslCipherSuites = GrpcServices.grpcSslCipherSuites;
const packageTypes: PackageTypes = GrpcServices.packageTypes;
const serviceTypes: ServiceTypes = GrpcServices.serviceTypes;
const maxReceiveMessageLength = GrpcServices.maxReceiveMessageLength;
const unauthenticatedPackageTypes = GrpcServices.unauthenticatedPackageTypes;
const unauthenticatedServiceTypes = GrpcServices.unauthenticatedServiceTypes;

export {
  emitSubscriptionError,
  handleRemoveListener,
  defaultSocket,
  grpcSslCipherSuites,
  maxReceiveMessageLength,
  packageTypes,
  protoFiles,
  protosDir,
  serviceTypes,
  unauthenticatedPackageTypes,
  unauthenticatedServiceTypes,
};
