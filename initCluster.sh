#!/bin/bash

# Arguments
clusterName=$1
region=${2:-"eu-west-1"}         # Default region if not provided
desired=${3:-6}                  # Default desired nodes if not provided
min=${4:-3}                      # Default min nodes if not provided
max=${5:-9}                      # Default max nodes if not provided

# Check if cluster name is provided
if [ -z "$clusterName" ]; then 
    echo "Please provide a cluster name as the first argument."
    exit 1
fi

# Check if EKS cluster exists
if aws eks describe-cluster --name "$clusterName" --region "$region" >/dev/null 2>&1; then
  echo "EKS cluster '$clusterName' exists in region '$region'."
else
  echo "EKS cluster '$clusterName' does not exist. Creating cluster ..."

    # Confirm settings
    echo
    echo "Cluster Name: $clusterName"
    echo "Region: $region"
    echo "Desired Nodes: $desired"
    echo "Min Nodes: $min"
    echo "Max Nodes: $max"

    # Proceed with cluster creation
    echo "Proceeding with cluster creation..."
    eksctl create cluster --name "$clusterName" --region "$region" --node-type t2.medium --nodes "$desired" --nodes-min "$min" --nodes-max "$max"

fi

echo "Updating kubeconfig"
aws eks update-kubeconfig --region "$region" --name "$clusterName"
