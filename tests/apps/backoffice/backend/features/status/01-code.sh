#!/bin/bash

<<com
-s silent mode dont output any kind of progress bar like
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                      Dload  Upload   Total   Spent    Left  Speed
      100    27  100    27    0     0  13500      0 --:--:-- --:--:-- --:--:-- 13500

-o output file. Redirect output body (not headers) into /dev/null file its not necessary

-w write format. curl flag that enables to output specific data into stdout base on variables
com

echo -e "\tchecking status code..."
echo -e "\texpected to be 200"

status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/status)

if [ "$status" -eq 200 ]; then
  echo -e "\t✅ Status OK ($status)"
else
  echo -e "\t❌ Unexpected status: $status"
  exit 1
fi
