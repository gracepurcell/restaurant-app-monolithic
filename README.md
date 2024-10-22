For this repo, in order for you to run it locally, you have to run postgres in a container:

```
docker run --name postgres-container -e POSTGRES_USER=your_user -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=flor_de_sal -p 5432:5432 -d postgres
```

---

To connect to your own database on DBeaver:

1. Create a New PostgreSQL Connection
2. Click on Database > New Database Connection.

3. Choose PostgreSQL from the list of databases.

4. Enter the connection details:

Host: localhost (or the Docker container's IP if localhost doesn’t work).
Port: 5432 (default PostgreSQL port).
Database: flor_de_sal (this is the database you specified in your Docker command).
Username: your_user (the one you defined in the POSTGRES_USER).
Password: your_password (the one you defined in the POSTGRES_PASSWORD).
Click Test Connection.

5. If everything is configured correctly, you should see a successful connection message.
6. Click Finish to save the connection and start exploring your database.

---

Here are the variables you need to use:

## Back-end:

```
SECRET=MySecret1!
DATABASE_URL="postgres://your_user:your_password@localhost:5432/flor_de_sal"
CLOUD_NAME="drsjloigq"
CLOUD_API_KEY="926793658896175"
CLOUD_API_SECRET="5QhoDhOiODpETRSYUrRYDzu5tv0"
PORT=6001
```

## Front-end:

```
VITE_SERVER_URL="http://localhost:6001"
```

## UPDATES: since migrating to eks
```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"ec2:AttachVolume",
				"ec2:CreateSnapshot",
				"ec2:CreateTags",
				"ec2:CreateVolume",
				"ec2:DeleteSnapshot",
				"ec2:DeleteVolume",
				"ec2:DescribeAvailabilityZones",
				"ec2:DescribeInstances",
				"ec2:DescribeSnapshots",
				"ec2:DescribeTags",
				"ec2:DescribeVolumes",
				"ec2:DescribeVolumesModifications",
				"ec2:DetachVolume",
				"ec2:ModifyVolume"
			],
			"Resource": "*"
		}
	]
}
```

- create eks cluster
- upgraded to t2.medium
- installed csi driver "kubectl apply -k "github.com/kubernetes-sigs/aws-ebs-csi-driver/deploy/kubernetes/overlays/stable/ecr/?ref=master""
- updated user IAM role to include above policy


