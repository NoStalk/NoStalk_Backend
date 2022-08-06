import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../../proto/platformData";
import path from "path";

const  makeUnaryRequest = () => {
  const PORT = 5003;
  const PROTO_FILE = "../../proto/platformData.proto";
  const packageDefinition = protoLoader.loadSync(
    path.resolve(__dirname, PROTO_FILE)
  );
  const grpcObject = grpc.loadPackageDefinition(
    packageDefinition
  ) as unknown as ProtoGrpcType;
  const grpcClient = new grpcObject.proto.FetchPlatformData(
    `0.0.0.0:${PORT}`,
    grpc.credentials.createInsecure()
  );
  const deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 5);
  grpcClient.waitForReady(deadline, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log("Connected to Codeforces microservice");
    onClientready();
  });
  const onClientready = () => {
    console.log("Client ready");
    grpcClient.getUserSubmissions(
      { userHandle: "zeus_codes" },
      (err, response) => {
        if (err) {
          console.error(err);
        }
        console.log(response?.submissions);
      }
    );
    grpcClient.getUserContests(
      { userHandle: "zeus_codes" },
      (err, response) => {
        if (err) {
          console.log(err);
        }
        console.log(response?.contests);
      }
    );
  };
}


export default makeUnaryRequest;