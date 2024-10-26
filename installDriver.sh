#!/bin/bash

# Check if the AWS EBS CSI driver is already installed
driver_check=$(kubectl get pods -A | grep ebs-csi-controller)

if [ -n "$driver_check" ]; then
    echo "AWS EBS CSI driver is already installed in the cluster."
else
    echo
    echo "Applying AWS EBS CSI driver for PVC volume in EKS"
    echo
    kubectl apply -k "github.com/kubernetes-sigs/aws-ebs-csi-driver/deploy/kubernetes/overlays/stable/ecr/?ref=master"
fi