#Bonus calculation


##Module expects object with schema:
```

{  
    "type": "object",  
    "properties": {  
      "members": {  
        "type": "array",  
        "items": {  
          "type": "object",  
          "properties": {  
            "name": {  
              "type": "string"  
            },  
            "salary": {  
              "type": "integer"  
            },  
            "engagement": {  
              "type": "integer"  
            }  
          },  
          "required": [  
            "name",  
            "salary",  
            "engagement"  
          ]  
        }  
      },  
      "bonusPercent": {  
        "type": "integer"  
      }  
    },  
    "required": [  
      "members",  
      "bonusPercent"  
    ]  
  }  
```
##example object :
````
{  
    "members": [  
        {"name": "Artem", "salary": 5000, "engagement": 42},  
        {"name": "Mario", "salary": 2000, "engagement": 31},  
        {"name": "Luigi", "salary": 3000, "engagement": 27}  
    ],  
    "bonusPercent": 28  
}  
````
##example usage
````
node myApp.js ./data.json  
````
##myApp.js file content:
````
var bonusCalculator = require("./bonus-calculation.js");  
var data = require(process.argv[2]);  
console.log(bonusCalculator(data));  

````   