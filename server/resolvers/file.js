import AWS from "aws-sdk";
import uuid from "uuid";
import { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID } from "../keys";

export default {
    Mutation: {
        async uploadFile(parent, { file }) {
            console.log("Mutation:uploadFile");
            const { stream, filename, mimetype, encoding } = await file;

            //Configuring the SDK & S3
            const albumBucketName = "digitalconcierge";
            const region = "ap-southeast-2";

            AWS.config.update({
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
                accessKeyId: AWS_ACCESS_KEY_ID,
                region
            });

            const s3 = new AWS.S3({
                apiVersion: "2006-03-01",
                params: { Bucket: albumBucketName }
            });

            //Upload to S3 Bucket
            s3.upload(
                {
                    Key: `${uuid.v4()}-${filename}`,
                    Body: stream,
                    ACL: "public-read"
                },
                (err, data) => {
                    if (err) {
                        console.log(
                            `There was an error uploading your photo: ${
                                err.message
                            }`
                        );
                    }
                    console.log(data);

                    //View list of objects in S3 Bucket
                    s3.listObjects({ Delimiter: "/" }, (err, data) => {
                        if (err) {
                            console.log(err.message);
                        } else {
                            console.log(data);
                        }
                    });
                }
            );

            return { stream, filename, mimetype, encoding };
        }
    }
};
