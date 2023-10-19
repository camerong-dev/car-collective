## Manual Testing

### Nav Bar

- If not logged in, 'Sign In' link shows - PASS
- If not logged in, 'Create Post' link is hidden - PASS
- Car Collective link takes me back to home page - PASS
- If user logged in, 'Sign In' link is replaced with dropdown - PASS
- If user logged in, 'Create Post' link shows - PASS
- If user logged in, dropdown contains 'Logout' link - PASS
- All relevant links/buttons work - PASS

### Social Footer

- Ability to select social icons - PASS
- Ability to select my GitHub link - PASS

### Home Page

- Correct number of likes displaying - PASS
- On hover the card gets slightly larger - PASS
- Ability to click on a post - PASS

### Post View Page

- Slideshow works without interaction - PASS
- Clicking on the slideshow brings up new window for larger picture - PASS
- Ability to interact with the slideshow - PASS
- All data is populated in the given fields - PASS
- Display correct number of likes relating to the post - PASS
- Display correct amount of comments on the post - PASS
- If not logged in, hide ability to post a comment, like the post and edit or delete - PASS
- If logged in, show ability to post a comment and like the post - PASS
- If logged in, post a comment - PASS
- If logged in, like the post - PASS
- If author of post or staff, show edit and delete button - PASS
- If author of post or staff, delete functionality works - PASS

### Log In Page

- If correct details are entered, user is logged in - PASS
- If incorrect details are entered, don't alower user acces, throw error - PASS
- Login submit button functions correctly - PASS
- Register instead button redirects to sign up page - PASS

### Sign Up Page

- User cannot create account with alredy existing username - PASS
- User must input data into all fields - PASS
- Refuse email input if not valid email string - PASS
- Refuse password input if does not meet requirements - PASS
- User cannot create account with already existing email - PASS
- If all valid data is entered, allow user to regist account - PASS
- If successful, display message - PASS

### Create Post Page

- If non logged in user gets to this page, redirect them to login screen - FAIL
- If valid data is entered, allow form to be posted - PASS
- If invalid data is entered, don't allow form to be posted - PASS
- Only accept imags smaller than 5MB = PASS
- Ability to use the Add Mod button, to create new fields = PASS
- Ability to use the Add Image button, to create new image fields - PASS

### Edit Post Page

- If user is logged in and authenticated, allow access - PASS
- If valid data is entered, allow form to be posted - PASS
- If invalid data is entered, don't allow form to be posted - PASS
- Only accept imags smaller than 5MB = PASS
- Ability to use the Add Mod button, to create new fields = PASS
- Ability to use the Add Image button, to create new image fields - PASS

### Delete Page

- If user is logged in and authenticated, allow access - PASS
- Delete button works and brings up modal - PASS
- Delete confirmation works and post disappears - PASS

### Validators

This project code was chekc with the ESLint, autopep8, plugin for VSCode during development. No warnings are present for the production version.
