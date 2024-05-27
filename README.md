In the backend, make the following changes in .env file:




MONGO_URL=mongodb://localhost:27017/rentify

JWT_SECRET=YOUR_SECRET_KEY



Enter your JWT secret key and replace it with YOUR_SECRET_KEY and change MONGO_URL with your URL


# REGISTER PAGE
- user can switch from login to register and vice-versa also
- This form is completely validated, as you can see in the login page below this
- there's a single login and register page for both seller and buyer, the user can select as per their role:
![image](https://github.com/Moumita2002/rentify-project/assets/102172188/2483ebca-eeea-4652-9aaf-ba1dfcc01528

# Login Page

![image](https://github.com/Moumita2002/rentify-project/assets/102172188/86f7c9bf-919e-43f8-b78e-2f9d93a27273)


# Seller
- This is the look of the website, the user can see their role beside their name.
- They can logout by clicking on logout button after filling out all the details.
- It is very user friendly as I have enabled toast notification.
- The seller can even update and delete the property details from the database.
- After filling up the property details, as soon as the seller clicks on submit button the property details is posted the seller can view his property details, it will get stacked one by one
![image](https://github.com/Moumita2002/rentify-project/assets/102172188/973fbebb-34c4-490a-8b46-e3d77e247f9f)

![image](https://github.com/Moumita2002/rentify-project/assets/102172188/45dd6951-03e0-4354-b4ba-dd4347856d3b)


# Buyer
- The header functions are same as seller, they can see their role beside their name, they can logout by clicking logout.
- The buyer can filter the property details based on location, max price and bedrooms.
- The buyer can view the property details here also.
![image](https://github.com/Moumita2002/rentify-project/assets/102172188/f58d385b-a4aa-49b9-be71-7e2e6b515edf)

After applying filters:
![image](https://github.com/Moumita2002/rentify-project/assets/102172188/d67e985c-5567-43c5-9f91-b81e0f226dda)


This is how my database looks like:
![image](https://github.com/Moumita2002/rentify-project/assets/102172188/8be01e07-24a3-44af-a2ac-d7e4ff509c5e)

  


