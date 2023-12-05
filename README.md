# Project Title

## 1. Project Description
State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  
This browser based web application to help people who find recycling inconvenient and those who want to improve recycling in their community by providing a place for people to post their own recycling events or bins that they want to let others use, so that others can easily find them.

Features:
* Post a bin
* View all available bins
* View only your own bins
* Post an image when you have used a bin
* View recent image of bin to see how full it is
* View bin on map as well as your own location
* Favourite bins users want to see frequently
* Unfavorite a bin when users no longer like a bin
* Delete bins not in use or accidentally made
* Change bin status to inactive if user would like to close bin earlier than original end date


## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi, my name is Olivia! I am excited to see what we will create in this project! Yay!
* Hi, my name is Lucas! I am nervous but also excited for this project
* Hi, my name is Dongharn Yi! I am pretty nervous because I am newbie but, lets do this! 
* Hi my name is Jas! I am overjoyed to work on this project. I am scared of turtles
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Canva 2023 (all images)

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* The user should sign up for an account

* If they want to learn more about how this app functions, they can click on the FAQ section in the Hamburger menu read more about our application.

* If users want to learn more about the creative souls behind what surely will become their most favourite app of all time, they can click on the "AboutUs" button in the Hamburger menu.

* If they want to make a post about a recycling bin they are putting out, they should:

    *Click on "Post". This will direct them to the newpost.html page where they can input the title, location accepted item type, brief description, and the end date (date the recycling bin will closed). This will take them to the confirmation page that tells them that they have successfully posted their bin.

* If they want to view the post(s) they made, users should:

    *Click on "My Posts" in the hamburger dropdown or click on the logo icon to go back to the main page to click on the main page "My Posts" button. They can also click on the "See my bins" button after they create a post to go to the page with their posts.

        *On their My posts page, users can:

            * Deactivate their post (updates bin status to inactive so others cannot see the bin) Users can still see their own posts. If bin was favourited by another user, it also removes it from the users' favedbyuser array.

            * Delete their post (Delete bin so that it is deleted from user's arrays firebase). No one can view or access the bin. 

            * See the last image uploaded by another user of their bin to see how full it is by clicking on "View Recent Image Post"

            * See bin status, description, recyclable item type accepted.

* If users want to find a bin, they can click the "Find a Bin" button on the main page or in the hamburger menu which will direct the user to the available bins page. This page shows only bins with an active status. 

    * This page allows users to Filter by Item type so that users can easily find bins that accept the kind of items they want to recycle. They do not need to scroll through a long page. Clciking the "Filter by Item type" button opens up the options. For example, if they select cardboard and select "Apply Filter", only bins that accept cardboard will be displayed.

    * If the user find a bin they want to take a closer look at, they can select the "View Details" button.

        * To better visualize the location of the bin, the user can click on the "View on Map" Button. This takes the user to the map page which implements map box. There is a pin on the user's current location as well as a pin on the location of the bin.

        * If the user would like to use a bin, they can add their item and take a picture of the bin. Then they can click on the "Upload Picture" button, select the image via Choose File and hit "Post Now". This will trigger the alert letting the user know that their image has been successfully uploaded after the image is uploaded to Cloud storage and the picture URL is added to firestore. 

        * The user would like to see how full a bin is looking prior to visiting the bin, they can click on the "View Photo" button. This will diplay the last image uploaded of the bin.

        *If a user really likes the bin and see themselves using this bin often, they can favourite the bin. They can do so by clicking on the "Add to favourites" button. This will add the post id to the user's favourites array and the userid of the user is added to the post's FavedByUser Array. By clicking "Add to Favourites", the user is redirected to their favourited bins page.

* If a user wants to view their favourited bins to quickly access the information for a particular bin, they can click on "Favourites" button on the main page or in the hamburger menu.

    * If they want to view more details, they can see and access all the same features previously mentioned in the detailed bin section of find a bin (such as the map, image upload and view image).

    * If the user accidentally selected the incorrect bin to favourite or they no longer like this bin, the user can remove the bin from their favourites section via the "Remove from Favourites" button in the top right corner. Doing so will remove the useris from the post's FavedByUser Arrray and will remove the post id from the user's favourites array.

* If users want to log off of the app, they can do so by clicking the logout button in the top NavBar.
       

## 5. Known Bugs and Limitations
Here are some known bugs:
* ...
* ...
* ...

## 6. Features for Future
What we'd like to build in the future:
* Reactivate a post that has been deactivated
* Edit a post that has been created. 
* Filter available bins by more criteria such as location. For example, to see bins only in a 5km radius of user's location.
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── aboutus.html             # About us page
├── available.html           # Displays all the posts with status "Active"
├── bininfo.html             # Displays the information for a post
├── confirm_end_event.html   # Confirmation page for when a user deletes their post
├── faq.html                 # FAQ page
├── favourites.html          # Displays users favourites
├── index.html               # landing HTML file, this is what users see when you come to url
├── login.html               # Login page
├── main.html                # Main page, this is where users come once they have logged in
├── map.html                 # Map that displays users location and location of a specific bin
├── mybins.html              # Dislays all the posts the user has made
├── mybinsinfo.html          # Displays the information for a post the user has made
├── newpost.html             # Form for users to create a new post
├── README.md
└── thankyou.html            # Thank you page for when user creates a new post

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /blah.jpg                # Acknowledge source
├── scripts                  # Folder for scripts
    /aboutus.js                 # 
    /authentication.js
    /available.js
    /binExpiry.js
    /bininfo.js
    /confirm_end_event.js
    /fav.js
    /firebaseAPI_TEAM99.js
    /map.js
    /mybins.js
    /newpost.js
    /profile.js
    /script.js
    /skeleton.js
    /thankyou.js
    /username.js
    /viewmyposts.js
├── styles                   # Folder for styles
    /style.css                # 



```


