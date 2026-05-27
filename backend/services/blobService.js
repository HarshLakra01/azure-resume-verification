const { BlobServiceClient } = require("@azure/storage-blob");

const connectionString =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

const containerName =
  process.env.AZURE_CONTAINER_NAME;

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

const containerClient =
  blobServiceClient.getContainerClient(containerName);

const uploadFileToAzure = async (file) => {

  const blobName =
    `${Date.now()}-${file.originalname}`;

  const blockBlobClient =
    containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(file.buffer);

  return blockBlobClient.url;
};

module.exports = uploadFileToAzure;