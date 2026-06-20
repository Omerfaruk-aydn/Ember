import boto3
from app.config import get_settings

settings = get_settings()


class S3Client:
    def __init__(self):
        self.client = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION,
            endpoint_url="http://localhost:9000" if not settings.AWS_ACCESS_KEY_ID else None,
        )
        self.bucket = settings.S3_BUCKET_NAME

    async def upload_file(self, file_path: str, key: str, content_type: str = "application/octet-stream") -> str:
        self.client.upload_file(file_path, self.bucket, key, ExtraArgs={"ContentType": content_type})
        return f"https://{self.bucket}.s3.{settings.AWS_REGION}.amazonaws.com/{key}"

    async def upload_bytes(self, data: bytes, key: str, content_type: str = "application/octet-stream") -> str:
        self.client.put_object(Bucket=self.bucket, Key=key, Body=data, ContentType=content_type)
        return f"https://{self.bucket}.s3.{settings.AWS_REGION}.amazonaws.com/{key}"

    async def download_file(self, key: str, file_path: str) -> str:
        self.client.download_file(self.bucket, key, file_path)
        return file_path

    async def get_presigned_url(self, key: str, expires_in: int = 3600) -> str:
        return self.client.generate_presigned_url("get_object", Params={"Bucket": self.bucket, "Key": key}, ExpiresIn=expires_in)

    async def delete_file(self, key: str) -> None:
        self.client.delete_object(Bucket=self.bucket, Key=key)
