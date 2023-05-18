
import { BlobServiceClient } from "@azure/storage-blob";
import getStream from "into-stream";
import getBlobName from "../upload/blob_name.util.js";

const companyImages = async (request) => {
  var company_images = [];
  for(var i=0; i<request.files.length; i++){

    // 
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_CONNECTION_STRING
    );
    const containerName = "images";
  
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = getBlobName(request.files[i].originalname);
  
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
    const stream = getStream(request.files[i].buffer);
    const streamLength = request.files[i].buffer.length;
  
    const blobOptions = {
      blobHTTPHeaders: { blobContentType: request.files[i].mimetype },
    };
    await blockBlobClient.uploadStream(
      stream,
      streamLength,
      undefined,
      blobOptions
    );

    company_images.push({
      filename: blobName,
      url: blockBlobClient.url      
    })
  }
  return company_images
};


export default companyImages