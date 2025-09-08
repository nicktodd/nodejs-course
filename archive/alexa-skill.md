# **Creating a Basic Alexa App**
## ***The Aim***
In this chapter you will develop a basic understanding for the workflow involved in creating a simple Alexa app. The app will ask the name of the user and speak it back to them in a greeting.

## ***Part 1 Creating the Interaction Model***

First, you will set up the Alexa app functionality -  what the user will say to invoke the app and what intents and slots will be required.

1. First go to the **Alex Skills Kit** and log in. [https://developer.amazon.com/alexa-skills-kit]
2. Then hover over **Your Alexa Consoles** in the top right and click on **Skills**
3. Click on **Create Skill** and call it something like ‘Simple Greeter’
4. Set the **Default Language** to your preference and make sure that **Custom** is the selected model
5. Click **Create Skill**
6. When asked for a template select **Start from Scratch** and click **Choose**.

Here you are shown your console for the Interaction Model. We will need to give our skill an **Invocation Name** (The name that Alexa looks for in user input to start our app) as well as some **Intents** and **Slot Types**.

7. Click on **invocation** in the left-hand-side panel
8. In the **Skill Invocation Name** box, set it to something like ‘**simple greeter**’ (There are some rules on what an invocation name can contain which are in a green box below the text box)
9. Click on **Save Model** above.
10. Click on **Intents** in the **left-hand-side** panel.
11. Click **Add Intent.**
12. Call your intent something sensible like **greet.**

Now you have to come up with some phrases that could be used to start your greet intent. For example: ‘my name is {name}’. *The value in the curly brackets signifies that the value is going to be something which belongs in the **name** slot.*

13. Add a few more phrases that could initiate your intent. The more phrases, the better.
14. If you used a value in curly brackets, then the console will have created a corresponding slot for you, but you will need to define a slot **type**. 
15. In this case our slot is **name** so our slot type will be AMAZON.GB\_FIRST\_NAME.
16. Select **AMAZON.GB\_FIRST\_NAME** in the slot type **drop-down**.
17. Now we are ready to move onto creating the logic for the app to use.

## ***Part 2 Creating the Lambda***
In this section you will create the lambda function that will be called by the Alexa app that handles all of the logic. For this app it will be fairly straight-forward.

1. Click the **Endpoint** section on the left hand side of Alexa console
2. Then selected the **AWS Lambda** radio button
3. Now head to the AWS console (https://aws.amazon.com/lambda/) 
4. Log into the console
5. Select **lambda** from the services drop down (top left)
6. Click on **create function**
7. Click on **serverless application repository**
8. Then search for the **alexa-skills-kit-nodejs-factskill**
9. Select it, then give it a name (bottom right)
10. Click **deploy**

You will not be using the code that gets automatically generated, but it is helpful to use this approach, as it generates all the roles and permissions for you. Later you will do this yourself.

11. Once your code has been deployed you will see a green box telling you that you can now use it.
12. Click on **Test App.**
13. Find your function in the list. It will be called something like: aws-serverless-repository-alexaskillskitnodejsfact-xxxxxxxxxxxxx.
Lab Instructions

Page - 1