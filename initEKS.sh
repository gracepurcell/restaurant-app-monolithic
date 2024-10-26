#!/bin/bash

CLUSTER_NAME=$1                       # Replace with your EKS cluster name
REGION=${2:-"eu-west-1"}              # Replace with your AWS region, e.g., eu-west-1

# Create cluster
./initCluster.sh $CLUSTER_NAME $REGION -y

# Install Driver
./installDriver.sh

# Apply Role Policy
./applyVolumePolicies