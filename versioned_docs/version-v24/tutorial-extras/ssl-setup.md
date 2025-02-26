---
sidebar_position: 3
---

# Setting up SSL for OpenLM

This is a quick guide that describes how to set up the SSL connection for the OpenLM components v2x.   
**Important**: it is mandatory that the certificates used for Server also be installed and present in the Trusted Certificate Store of the machine with the component connecting to OpenLM Server (e.g. Agent, Broker, Router etc.). On Linux, for the Java-based components (Broker, Applications Manager, Router and Reports Scheduler), a self-signed certificate must be added to the local JDK keystore. This can be done using the Java-supplied *keytool* utility.

Once SSL is enabled for Server, it is necessary to update the hostname/IP of all components that connect to it to use the http**s** protocol. As with the Server configuration, make sure that the exact FQDN is used when specifying the host.


## 1. Setting up SSL for Identity Service {#1.-setting-up-ssl-for-identity-service}

1. Go to **C:\\Program Files\\OpenLM\\OpenLM/OpenLM IdentityService/SecurityService/cert** and place here the certificate with a digital signature from a certificate authority (CA).  
      
   Attention\! Do not delete any existing certificates\!  
     
2. Open the appsettings.json file located at  **C:\\Program Files\\OpenLM\\OpenLM Identity Service\\SecurityService** with a convenient text  editor and administrator privileges.  
3. Locate the **Settings** node and change the “**IssuerUri**” parameter from HTTP to HTTPS:  
     
```
   },  
     "Settings": {  
       "UseDb": true,  
       "IssuerUri": "https://Server FQDN Name:5000",  
       "DbType": "MariaDB"  
     },  
 ```


4. Edit the **Kestrel node**. Provide the data for the certificate: path to the Certificate and password then change the URL parameter from HTTP to HTTPS:  

```
   },  
     "Kestrel": {  
       "Endpoints": {  
         "Http": {  
           "Url": "https://Server FQDN Name:5000"  
             "Certificate": {  
             "Path": "./cert/cert.pfx",  
             "Password": "Cert Password"  
           }  
         },  
         "Https": {  
           "Url": "http://\*:5001"  
      }  
       }  
     },  
```

* **Certificate Name \- The certificate name should be ‘cert.pfx’**  
* **Path** – the path to the certificate file. Make sure the Windows paths use double backslashes instead of forward slashes.  
* **Password** – the password for the private key of the certificate.  
    
  *Note: make sure the curly braces { } are properly closed at all times.*

5. Save the changes.  
6. Restart the Identity Service:   
     
     
     
7. To verify whether the SSL connection is successful, open up the EasyAdmin and refresh the page. Click on the “Lock” icon as portrayed below:


## 2. Setting up SSL for OpenLM Server

1. Go to C:\\Program Files\\OpenLM\\OpenLM/Server/bin and create a folder called “**Cert**”, then paste the certificate with a digital signature from a certificate authority (CA) to this folder.

2.Open up the **appsettings.json** located at C:\\Program Files\\OpenLM\\OpenLM Server\\bin\\ in a text editor with administrator privileges.

3. Locate and edit the Kestrel node configurations and update the URL for the Kestrel endpoint, i.e the the full path to EasyAdmin: `https://path.domain:port`

```
},  
  "Kestrel": {  
    "Endpoints": {  
      "Http": {  
        "Url": "https://WIN10MARIAG:5015"  
      },
```
4. Locate and edit the **Certificates** node. Provide the following details:

* **Path** – the path to the certificate file. Make sure the Windows paths use double backslashes instead of forward slashes.  
* **Password** – the password for the private key of the certificate.  
    
  *Note: make sure the curly braces { } are properly closed at all times.*

```
},  
    "Certificates": {  
      "Default": {  
        "Path": "./cert/cert.pfx",  
        "Password": "12345"  
      }  
    },
```

4.Save the changes (Ctrl+S).  
5. Now it is the time to change the OpenLM Server URL  declared in the Identity Service Settings. Login to the  OpenLM **Identity Service**→**Security Configuration** tab and declare the updated  OpenLM (SLM) Sever’s address (HTTPS) and click **Save**:



5. Restart the OpenLM Server Service.  


7. To verify the connection type in the address bar the updated EasyAdmin address:  `https://path.domain:port`
 


