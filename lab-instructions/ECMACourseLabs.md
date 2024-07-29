Conygre IT Limited –ECMA6 Labs

# <a name="_toc524545504"></a>**ECMA6 Exercises**
# <a name="_toc492455595"></a><a name="_toc524545505"></a>**Course Labs Contents**

[ECMA6 Exercises	1]()

[Course Labs Contents	1]()

[Introduction to your computer	2]()

[Software	2]()

[Chapter 1: Introduction to NodeJS	3]()

[Aims	3]()

[Your First NodeJS Program	3]()

[NodeJS – The Basics	3]()

[The Aims	3]()

[Declaring and initialising variables	3]()

[Looping and Branching	4]()

[The Aims	4]()

[Part 1 Using if / else	4]()

[Part 2 Looping	4]()

[Part 3 Using switch / case	4]()

[Part 4 (Optional)	4]()

[Introduction to Objects and Classes	5]()

[The Aims	5]()

[Defining a class	5]()

[Instantiating the class	5]()

[Working with Arrays	6]()

[Aims	6]()

[Creating an array of Accounts	6]()

[Working with Strings	7]()

[The Aims	7]()

[Part 1 Manipulating Text	7]()

[Part 2 Formatting Text	7]()

[Part 3 Optional Splitting Text	7]()

[Inheritance	8]()

[The Aims	8]()

[Part 1: Defining the Subclasses	8]()

[Part 3: Instantiating our classes	8]()

[Lambda Expressions	10]()

[Aims	10]()

[Creating a Lambda	10]()

[Streams	11]()

[The Aims	11]()

[Part 1 Using the java.io.File class	11]()

[Part 2 Using the Stream Classes	11]()
# <a name="_toc492455596"></a>**<a name="_toc524545506"></a>Introduction to your computer**
## <a name="_toc492455597"></a><a name="_toc524545507"></a>***Software***
The following software should be installed on your operating system.

- NodeJS recent version
- A suitable editor such as Visual Studio Code, IntelliJ, or any other preferred IDE
# <a name="_toc492455598"></a>**<a name="_toc524545508"></a>Chapter 1: Introduction to NodeJS**
## <a name="_toc524545509"></a>***Aims***
In this lab, your aim is to gain familiarity with using the NodeJS environment. We will write a simple script that will output some text to the console.
## <a name="_toc524545510"></a>***Your First NodeJS Program***
1. Using a text editor like notepad, create a new file and save it as **myfirstnode.js**.
1. Now we can insert some code to print something out to the console. 


   console.log(“Hello from my first nodejs program!”);

1. Run your first nodejs program using a terminal in the same folder as your file. To do this, type the following at the command line;

   **node myfirstnode.js**

1. It should print out you’re the text that is in your console.log statement.**

# <a name="_toc524545511"></a>**NodeJS – The Basics**
## <a name="_toc524545512"></a>***The Aims***
This lab will introduce you to using simple variables, and basic operators.

Remember – JavaScript is case sensitive!

## <a name="_toc524545513"></a>***Declaring and initialising variables***
1. Within the script from the last lab exercise, you will declare some variables to represent the car you drive, or if you do not have a car – a car you would like to drive! Firstly declare two variables called **make** and **model**, then declare a variable to be the **engineSize**, and declare a variable to be the **gear** your car is in.
1. Now initialise those variables with appropriate values. Put in some code so that the program will print out the values of these variables, things like;

   The make is x
   The gear is y
   The engine size is z

   You will need to use the string concatenator (+). 
1. Fix any errors and run your script.
 

# **<a name="_toc524545514"></a>Looping and Branching**
## <a name="_toc524545515"></a>***The Aims***
This lab will introduce you to using the various flow control constructs of the JavaScript language.

## <a name="_toc524545516"></a>***Part 1 Using if / else***
1. In your previous script, firstly, put in some logic to print out either that the car is a powerful car or a weak car based on the engine size, for example, if the size is less than or equal to 1.3.
1. Now, using an if / else if construct, display to the user a suitable speed range for each gear, so for example, if the gear is 5, then display the speed should be over 45mph or something. If the gear is 1, then the speed should be less than 10mph etc.

## <a name="_toc524545517"></a>***Part 2 Looping***
1. We will now need to generate a loop which loops around all the years between 1900 and the year 2000 and print out all the leap years to the command console. You can use either a for or while loop to do this.
1. Once you have done this, set it so that after 5 leap years have been displayed, it breaks out of the loop and prints ‘finished’.
## <a name="_toc524545518"></a>***Part 3 Using switch / case***
1. Now re-write part 1 to use a switch / case construct. It should do exactly the same thing as the if / else if construct. Don’t forget to use break.
## <a name="_toc524545519"></a>***Part 4 (Optional)***
1. This will possibly require some research by you to find out how to do this. Create yourself an array.
1. Now modify your loop above, so that it no longer displays the first five years, but stores the first 10 in your array instead.
1. Now provide another loop to print out the values in the array. Use the length property of the array object to specify how many times to loop

# **<a name="_toc524545520"></a>Introduction to Objects and Classes**
# <a name="_toc524545521"></a>**The Aims**
This lab will introduce you to defining classes with instance methods and variables, and then instantiating and manipulating the resulting objects from a script.
## <a name="_toc524545522"></a>***Defining a class***
We are going to create a new class called Account, and save it in a file called **Account.js.**

1. Create a new JavaScript file called Account.js and define a class within it.
1. Provide two properties called \_**balance** and \_**name** which you will have to set up in a constructor.
1. Now provide get and set blocks for your properties. 
1. Define a new method called **addInterest**, which does not take in any parameters or return any value, but increases the balance by 10%. We will be using this method later.

## <a name="_toc524545523"></a>***Instantiating the class***
1. Create another script called **TestAccount.js**.
1. Within this script, create a new Account object called **myAccount**, and then give it a name and a balance. Set name to be your name, and you can give yourself as much money as you like.
1. Now print out the name and balance to the screen using the get methods. Place appropriate text before the values using the string concatenator (+).
1. Run your program. It should print out your name and balance variables. 
1. Call the **addInterest** method and print out the balance again. It should be different when you run it.
# **<a name="_toc524545524"></a>Working with Arrays**
## <a name="_toc524545525"></a>***Aims***
You will now take the previous exercise a little further and modify the code to work with an array of accounts rather than single account references.

For information about working with arrays in JavaScript, you can review the documentation at:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array]()
## <a name="_toc524545526"></a>***Creating an array of Accounts***

1. Within the same script that you used in the previous exercise, declare an array of accounts called **arrayOfAccounts**.
1. Create two other arrays, which contain values for the names and balances of your account objects. Do this using two array initialisers. Make up values for these two arrays. Something like:

amounts = [23,5444,2,345,34];

names = ["Picard", "Ryker", "Worf", "Troy", "Data"];

1. Using a for loop, populate the object referenced by arrayOfAccounts with account objects specifying a name and a balance using values from your predefined arrays.
1. Within the loop print out the name and balance from each account object. 
1. Finally, within the loop, call the **addInterest** on each object in the array. Print out the modified balances.

# **<a name="_toc524545527"></a>Working with Strings**
## <a name="_toc524545528"></a>***The Aims***
This lab will introduce you to using the string methods found in JavaScript. 

Documentation referring to the String methods can be found here:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String]()

## <a name="_toc524545529"></a>***Part 1 Manipulating Text***
1. Create a new script file called teststrings.js.
1. Using a variable with the value ‘example.doc’, change the text to example.bak.
1. Create two string variables that are same and test them see if they are equal. If they are not equal show which of them lexicographically further forward (in the dictionary!).
1. Find the number of times "ow" occurs in "the quick brown fox swallowed down the lazy chicken"
1. Check to see whether a given string is a palindrome (eg "Live not on evil")
## <a name="_toc524545530"></a>***Part 2 Formatting Text***
1. Print today's date in various formats.

## <a name="_toc524545531"></a>***Part 3 Optional Splitting Text***
1. Copy a page of news or other text from your favourite website. Split the text into sentences, count and display them. Next split each sentence into words, count and display the words. Finally split the whole text into words and count them, checking that this is consistent with the results of the previous step.
# **<a name="_toc524545532"></a>Inheritance**
## <a name="_toc524545533"></a>***The Aims***
We all know that you cannot simply walk into a bank and open an ‘account’. It has to be a particular ‘type’ of account. We are going to modify our classes so that we have a number of subclasses of the Account class, and we will be instantiating them.

.

![](Aspose.Words.8960ffc1-fd39-40e7-8e63-83518a6be6da.001.png)

## <a name="_toc524545534"></a>***Part 1: Defining the Subclasses***
We will firstly define two subclasses of our class called **Account**. One will be **SavingsAccount**, and one will be **CurrentAccount**.

1. Define a new Javascript file called **SavingsAccount.js** and define a SavingsAccount that extends Account.
1. Define a constructor that takes two arguments for name and balance.
1. In the constructor you have defined, pass the two parameters to the superclass constructor using the *super* keyword.
1. Define a second class called **CurrentAccount**, in a new file repeating the steps above.
1. Now, in your two subclasses, override the addInterest method. 
1. Multiply the balance by 1.1 in the current account and multiply the balance by 1.4 in the savings account. 


## <a name="_toc524545535"></a>***Part 3: Instantiating our classes***
1. Define a new javascript file called *TestInheritance.js*.
1. Declare an array called *accounts*, and initialise it with an Account object, a SavingsAccount object, and a CurrentAccount object. You do not need a loop for this bit.

   These objects should have balances of 2, 4, and 6 respectively. The names can be whatever you like. 
1. Now loop through the array, and call addInterest on each of the elements. Which addInterest will be called? There are three in total. One in each of the subclasses, and one in Account.
# **<a name="_toc524545539"></a>Streams**
## <a name="_toc524545540"></a>***The Aims***
In this chapter you will process a file path and check that it is a directory, and if it is, list the contents of a directory. You will then create a file copying program that will read a file and copy the contents in a different location.

## <a name="_toc524545541"></a>***Part 1 Using Basic Streams***
1. Create a new script called *DirList.js*.
1. Using suitable nodejs modules and methods, check that the directory exists, and print out a message to say if it does or not.
1. Now check that the path is a directory and not just a simple file. If it is not a directory, display a message and exit.
1. Finally, list the contents of the directory on the console. 

## <a name="_toc524545542"></a>***Part 2 Using the Stream Classes***

What we will do in this part of the practical is implement a file copying program, using readers and writers. 

1. Create a new script called *FileCopier.js*.
1. Create two file streams, one for reading which refers to an actual file, and one for writing which refers to an as yet non-existent file.
1. Read the input file and write it to an output file initially using a pipe.
1. Test your code and check that it works. Once you are satisfied that it works, refactor it to use event handlers and chunking to deal with the writing instead.


# **Creating a Basic Alexa App**
## ***The Aim***
In this chapter you will develop a basic understanding for the workflow involved in creating a simple Alexa app. The app will ask the name of the user and speak it back to them in a greeting.

## ***Part 1 Creating the Interaction Model***

First, you will set up the Alexa app functionality -  what the user will say to invoke the app and what intents and slots will be required.

1. First go to the **Alex Skills Kit** and log in. [https://developer.amazon.com/alexa-skills-kit]
1. Then hover over **Your Alexa Consoles** in the top right and click on **Skills**
1. Click on **Create Skill** and call it something like ‘Simple Greeter’
1. Set the **Default Language** to your preference and make sure that **Custom** is the selected model
1. Click **Create Skill**
1. When asked for a template select **Start from Scratch** and click **Choose**.

Here you are shown your console for the Interaction Model. We will need to give our skill an **Invocation Name** (The name that Alexa looks for in user input to start our app) as well as some **Intents** and **Slot Types**.

1. Click on **invocation** in the left-hand-side panel
1. In the **Skill Invocation Name** box, set it to something like ‘**simple greeter**’ (There are some rules on what an invocation name can contain which are in a green box below the text box)
1. Click on **Save Model** above.
1. Click on **Intents** in the **left-hand-side** panel.
1. Click **Add Intent.**
1. Call your intent something sensible like **greet.**

Now you have to come up with some phrases that could be used to start your greet intent. For example: ‘my name is {name}’. *The value in the curly brackets signifies that the value is going to be something which belongs in the **name** slot.*

1. Add a few more phrases that could initiate your intent. The more phrases, the better.
1. If you used a value in curly brackets, then the console will have created a corresponding slot for you, but you will need to define a slot **type**. 
1. In this case our slot is **name** so our slot type will be AMAZON.GB\_FIRST\_NAME.
1. Select **AMAZON.GB\_FIRST\_NAME** in the slot type **drop-down**.
1. Now we are ready to move onto creating the logic for the app to use.

## ***Part 2 Creating the Lambda***
In this section you will create the lambda function that will be called by the Alexa app that handles all of the logic. For this app it will be fairly straight-forward.

1. Click the **Endpoint** section on the left hand side of Alexa console
1. Then selected the **AWS Lambda** radio button
1. Now head to the AWS console (https://aws.amazon.com/lambda/) 
1. Log into the console
1. Select **lambda** from the services drop down (top left)
1. Click on **create function**
1. Click on **serverless application repository**
1. Then search for the **alexa-skills-kit-nodejs-factskill**
1. Select it, then give it a name (bottom right)
1. Click **deploy**

You will not be using the code that gets automatically generated, but it is helpful to use this approach, as it generates all the roles and permissions for you. Later you will do this yourself.

1. Once your code has been deployed you will see a green box telling you that you can now use it.
1. Click on **Test App.**
1. Find your function in the list. It will be called something like: aws-serverless-repository-alexaskillskitnodejsfact-xxxxxxxxxxxxx.
Lab Instructions

Page - 1
