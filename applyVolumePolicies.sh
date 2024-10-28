#!/bin/bash

clusterName=$1

if [ -z "$clusterName" ]; then
    echo "Cluster Name required - exiting"
    exit 1
fi

echo "Getting account id"
accountID=$(aws sts get-caller-identity --query "Account" --output text)
echo

echo "Getting $clusterName Role name"
roleName=$(aws eks list-access-entries --cluster-name $clusterName | jq -r '.accessEntries[] | select(contains("role")) | split("/")[1]')
echo

# Check if the policy already exists
policyArn=$(aws iam list-policies --query "Policies[?PolicyName=='EC2VolumePolicy'].Arn" --output text)

if [ -z "$policyArn" ]; then
    echo "Creating EC2VolumePolicy"

    # Create the policy using AWS CLI
    policyArn=$(aws iam create-policy \
        --policy-name EC2VolumePolicy \
        --policy-document file://volumePolicy.json \
        --query 'Policy.Arn' --output text)
    
    echo "Policy EC2VolumePolicy created with ARN: $policyArn"
else
    echo "Policy EC2VolumePolicy already exists with ARN: $policyArn"
fi

# Attach the policy to the role
echo "Attaching EC2VolumePolicy to $roleName"
aws iam attach-role-policy \
    --role-name $roleName \
    --policy-arn $policyArn

echo "Policy attached successfully!"


