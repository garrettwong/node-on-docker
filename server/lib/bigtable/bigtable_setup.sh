#!/bin/sh

# npm install --save @google-cloud/bigtable

PROJECT_ID=testproject-garrett
INSTANCE=my-bigtable-instance
CLUSTER_ID=
CLUSTER_ZONE=us-west2-a
DISPLAY_NAME=
CLUSTER_NUM_NODES=1
CLUSTER_STORAGE_TYPE=
INSTANCE_TYPE=

echo project = $PROJECT_ID > ~/.cbtrc
echo instance = $INSTANCE >> ~/.cbtrc

# create instance
gcloud beta bigtable instances create $INSTANCE \
    --cluster=$CLUSTER_ID \
    --cluster-zone=$CLUSTER_ZONE \
    --display-name=$DISPLAY_NAME \
    [--cluster-num-nodes=$CLUSTER_NUM_NODES] \
    [--cluster-storage-type=$CLUSTER_STORAGE_TYPE] \
    [--instance-type=$INSTANCE_TYPE]

cbt createtable my-table

# the example does not seem to work, unless you create a column family:
# - via cbt: cbt createfamily my-table2 cf1
# - i have added code in node.js to auto-create the cf


# to run
# node bigtable-tests.js
