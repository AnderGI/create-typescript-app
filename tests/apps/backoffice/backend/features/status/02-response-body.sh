#!/bin/bash

echo -e "\tchecking response body..."
echo -e "\texpected to be empty"

body=$(curl -s http://localhost:5000/app/status)

if [ -z "$body" ]; then
  echo -e "\t✅ Body is empty"
else
  echo -e "\t❌ Body is NOT empty: '$body'"
  exit 1
fi
