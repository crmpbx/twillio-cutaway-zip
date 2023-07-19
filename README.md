## Read the docs:

Setup doctl:
https://docs.digitalocean.com/products/functions/how-to/create-functions/

Node.js specific:
https://docs.digitalocean.com/products/functions/reference/runtimes/node-js/

But basically after everything:

 ```doctl serverless deploy pgsql-zip-replace```


 ## HOW:
 Looks up JSON in local storage to return AREA, if doesn't find queries DB and returns from there, then stores resutl in local storage for future use.
 

 ## Changes:
 - To replace single AREA in the local storage:
 Make POST request to function url with following body:
 ```
 {
    "digit": "34500",
    "replace": true,
    "area": "NEW AREA"
}
```

- To make big changes just redeploy with empty or updated zips.json file.