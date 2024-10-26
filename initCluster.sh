#!/bin/bash
# Usage: ./script.sh <clusterName> [region] [desired] [min] [max] [-y]

# Initialize variables with defaults
# skip_confirmation=false

# # Process the optional -y flag
# while getopts ":y" opt; do
#   case $opt in
#     y) skip_confirmation=true ;;
#     \?) echo "Invalid option: -$OPTARG" >&2; exit 1 ;;
#   esac
# done

# # Shift arguments to exclude flags from positional parameters
# shift $((OPTIND - 1))

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
  
    # Process optional -y flag for skipping confirmation
    # for arg in "$@"; do
    #     if [[ "$arg" == "-y" ]]; then
    #         skip_confirmation=true
    #         break
    #     fi
    # done

    # Confirm settings
    echo
    echo "Cluster Name: $clusterName"
    echo "Region: $region"
    echo "Desired Nodes: $desired"
    echo "Min Nodes: $min"
    echo "Max Nodes: $max"

    # # Prompt for confirmation if -y flag not set
    # if [ "$skip_confirmation" = false ]; then
    #     read -p "Do you want to continue with these settings? (yes/no): " confirmation
    #     if [[ "$confirmation" != "yes" ]]; then
    #         echo "Cluster creation cancelled."
    #         exit 0
    #     fi
    # fi

    # Proceed with cluster creation
    echo "Proceeding with cluster creation..."
    eksctl create cluster --name "$clusterName" --region "$region" --node-type t2.medium --nodes "$desired" --nodes-min "$min" --nodes-max "$max"

    echo "Updating kubeconfig"
    aws eks update-kubeconfig --region "$region" --name "$clusterName"
fi

