OpenLM Cloud Portal  
**This document is for reference only and is not an official document**

We have a new OpenLM Cloud Portal screen to manage your OpenLM Cloud account  
![Cloud Portal landing](../../../static/img/legacy/kb/cloud-portal-1.png)  
You can start off by selecting Lets Go  
This will bring you into the Active Products screen which will show you what active products you have  
![][image2]  
Selecting Open in the Software License Management Cloud will bring you into the OpenLM Web interface  
![][image3]

Selecting the Gear icon will bring you into the Identity & Access Management screen  
![][image4]  
Where you can manage Users, External providers and Client Autorization Files  
![][image5]  
The Users screen will allow you to manage your User accounts to access the OpenLM Cloud  
User accounts must have a Account Role, when you register for the OpenLM Cloud your user account does not have a Role so you need to Edit the account and add the Role

Putting you curser in the user account area will display a pencil icon to edit the account  
![][image6]

From the dropdown you can give the account a role, for new registered users it will typically be the Admin Role  
![][image7]

To add other users select Invite User   
![][image8]  
The invite User you can enter the email of the user you want to give access to the OpenLM Cloud and determine their level of access either a Admin or a Viewer Role  
![][image9]  
This will create a user account on the OpenLM Cloud server also, the account will also be the email   
The user account will need to be assigned a Role in the OpenLM Cloud server from Start -> Administration -> Role  
![][image10]  
The Roles screen will appear with the available roles The most common Roles are   
admin_role - Full control of the OpenLM Cloud   
Openlm_users_role - Can see usage information and run reports but cannot make any changes to the system  
![][image11]  
You can add a user to a role by selecting the Role and picking Edit  
In the Role Details select Users  
In the Users screen select Add  
![][image12]  
A list of users will be be displayed and you can choose the user account you want to add to the Role, you can search for a user account from the search box in the bottom right hand corner  
![][image13]  
After you pick the user pick select and you will see the User name added to the Role  
![][image14]

Client Autorization Files have also moved to the OpenLM Cloud Portal where you can create the Autorization file for the different components of OpenLM like the Broker  
By selecting ADD you can add new Client Types  
![][image15]  
From the Select Client Type Dropdown you can select the component you want to create the Autorization file for and give it a description then select Save  
![][image16]  
You will get the following message please select OK  
![][image17]  
The SECRET KEY screen will show you the Autorization information for that component  
You can select Copy to just get a copy of the information that you can paste into a text editor for future reference. Selecting Download will create an authorization.json file that you can import into the OpenLM Component like the Broker  
![Secret Key authorization information](../../../static/img/legacy/kb/cloud-portal-18.png)

URLs used by the OpenLM cloud and need to be opened on your fiewall for the Broker to connect to the OpenLM Cloud Server  
cloud.openlm.com  
identity.openlm.com  
Both using https port 443  

[image1]: ../../../static/img/legacy/kb/cloud-portal-1.png
[image2]: <!-- TODO: add image2 file (cloud-portal-2.png) -->
[image3]: <!-- TODO: add image3 file (cloud-portal-3.png) -->
[image4]: <!-- TODO: add image4 file (cloud-portal-4.png) -->
[image5]: <!-- TODO: add image5 file (cloud-portal-5.png) -->
[image6]: <!-- TODO: add image6 file (cloud-portal-6.png) -->
[image7]: <!-- TODO: add image7 file (cloud-portal-7.png) -->
[image8]: <!-- TODO: add image8 file (cloud-portal-8.png) -->
[image9]: <!-- TODO: add image9 file (cloud-portal-9.png) -->
[image10]: <!-- TODO: add image10 file (cloud-portal-10.png) -->
[image11]: <!-- TODO: add image11 file (cloud-portal-11.png) -->
[image12]: <!-- TODO: add image12 file (cloud-portal-12.png) -->
[image13]: <!-- TODO: add image13 file (cloud-portal-13.png) -->
[image14]: <!-- TODO: add image14 file (cloud-portal-14.png) -->
[image15]: <!-- TODO: add image15 file (cloud-portal-15.png) -->
[image16]: <!-- TODO: add image16 file (cloud-portal-16.png) -->
[image17]: <!-- TODO: add image17 file (cloud-portal-17.png) -->
[image18]: ../../../static/img/legacy/kb/cloud-portal-18.png
