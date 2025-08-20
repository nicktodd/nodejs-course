Conygre IT Limited –ECMA6 Labs

# **ECMA6 Exercises**
# **Course Labs Contents**


***Software***
The following software should be installed on your operating system.

- NodeJS recent version
- A suitable editor such as Visual Studio Code, IntelliJ, or any other preferred IDE
## Chapter 1: Introduction to NodeJS
## ***Aims***
In this lab, your aim is to gain familiarity with using the NodeJS environment. We will write a simple script that will output some text to the console.
## ***Your First NodeJS Program***
1. Using a text editor like notepad, create a new file and save it as **myfirstnode.js**.
2. Now we can insert some code to print something out to the console. 

```
   console.log(“Hello from my first nodejs program!”);
```

3. Run your first nodejs program using a terminal in the same folder as your file. To do this, type the following at the command line;

   **node myfirstnode.js**

4. It should print out you’re the text that is in your console.log statement.**

## **NodeJS – The Basics**
## ***The Aims***
This lab will introduce you to using simple variables, and basic operators.

Remember – JavaScript is case sensitive!

## ***Declaring and initialising variables***
1. Within the script from the last lab exercise, you will declare some variables to represent the car you drive, or if you do not have a car – a car you would like to drive! Firstly declare two variables called **make** and **model**, then declare a variable to be the **engineSize**, and declare a variable to be the **gear** your car is in.
2. Now initialise those variables with appropriate values. Put in some code so that the program will print out the values of these variables, things like;

   The make is x
   The gear is y
   The engine size is z

   You will need to use the string concatenator (+). 
3. Fix any errors and run your script.
 

## **Looping and Branching**
## ***The Aims***
This lab will introduce you to using the various flow control constructs of the JavaScript language.

## ***Part 1 Using if / else***
1. In your previous script, firstly, put in some logic to print out either that the car is a powerful car or a weak car based on the engine size, for example, if the size is less than or equal to 1.3.
2. Now, using an if / else if construct, display to the user a suitable speed range for each gear, so for example, if the gear is 5, then display the speed should be over 45mph or something. If the gear is 1, then the speed should be less than 10mph etc.

## ***Part 2 Looping***
3. We will now need to generate a loop which loops around all the years between 1900 and the year 2000 and print out all the leap years to the command console. You can use either a for or while loop to do this.
4. Once you have done this, set it so that after 5 leap years have been displayed, it breaks out of the loop and prints ‘finished’.
## ***Part 3 Using switch / case***
5. Now re-write your code working with the gear to use a switch / case construct. It should switch on the gear and then print the suitable speed range for that gear. If you are unsure - just make it up!
## ***Part 4 (Optional)***
6. This will possibly require some research by you to find out how to do this. Create yourself an array.
7. Now modify your loop above, so that it no longer displays the first five years, but stores the first 10 in your array instead.
8. Now provide another loop to print out the values in the array. Use the length property of the array object to specify how many times to loop


## Functions
1. Create a function that converts a temperature from centigrade to farenheit and returns the new value. You will need to explore what the formula is to complete the conversion.
2. Test your function by calling it with various temperatures to check that it works.
3. Now create a function that takes in a JSON object that looks like this:

```
{
   "name": "Nick".
   "age": 30,
   "hobby": "Bus spotting"
}
```
The function should then return just the name from the object.

4. Test the function by calling it with some possible values.

## **Introduction to Objects and Classes**
## **The Aims**
This lab will introduce you to defining classes with instance methods and variables, and then instantiating and manipulating the resulting objects from a script.
## ***Defining a class***
We are going to create a new class called Account, and save it in a file called **Account.js.**

1. Create a new JavaScript file called Account.js and define a class within it.
2. Provide two properties called **balance** and **name** which you will have to set up in a constructor.
3. Define a new method called **addInterest**, which does not take in any parameters or return any value, but increases the balance by 10%. We will be using this method later.

## ***Instantiating the class***
1. Create another script called **TestAccount.js**.
2. Within this script, create a new Account object called **myAccount**, and then give it a name and a balance. Set name to be your name, and you can give yourself as much money as you like.
3. Now print out the name and balance to the screen. Place appropriate text before the values using the string concatenator (+).
4. Run your program. It should print out your name and balance variables. 
5. Call the **addInterest** method and print out the balance again. It should be different when you run it.
## **Working with Arrays**
## ***Aims***
You will now take the previous exercise a little further and modify the code to work with an array of accounts rather than single account references.

For information about working with arrays in JavaScript, you can review the documentation at:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array]()
## ***Creating an array of Accounts***

1. Within the same script that you used in the previous exercise, declare an array of accounts called **arrayOfAccounts**.
2. Create two other arrays, which contain values for the names and balances of your account objects. Do this using two array initialisers. Make up values for these two arrays. Something like:

amounts = [23,5444,2,345,34];

names = ["Picard", "Ryker", "Worf", "Troy", "Data"];

3. Using a for loop, populate the object referenced by arrayOfAccounts with account objects specifying a name and a balance using values from your predefined arrays.
4. Within the loop print out the name and balance from each account object. 
5. Finally, within the loop, call the **addInterest** on each object in the array. Print out the modified balances.

## **Working with Strings**
## ***The Aims***
This lab will introduce you to using the string methods found in JavaScript. 

Documentation referring to the String methods can be found here:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String]()

## ***Part 1 Manipulating Text***
1. Create a new script file called teststrings.js.
2. Using a variable with the value ‘example.doc’, change the text to example.bak.
3. Create two string variables that are same and test them see if they are equal. If they are not equal show which of them lexicographically further forward (in the dictionary!).
4. Find the number of times "ow" occurs in "the quick brown fox swallowed down the lazy chicken"
5. Check to see whether a given string is a palindrome (eg "Live not on evil")
## ***Part 2 Formatting Text***
6. Print today's date in various formats.

## ***Part 3 Optional Splitting Text***
7. Copy a page of news or other text from your favourite website. Split the text into sentences, count and display them. Next split each sentence into words, count and display the words. Finally split the whole text into words and count them, checking that this is consistent with the results of the previous step.
## **Inheritance**
## ***The Aims***
We all know that you cannot simply walk into a bank and open an ‘account’. It has to be a particular ‘type’ of account. We are going to modify our classes so that we have a number of subclasses of the Account class, and we will be instantiating them.

.

![](Aspose.Words.8960ffc1-fd39-40e7-8e63-83518a6be6da.001.png)

## ***Part 1: Defining the Subclasses***
We will firstly define two subclasses of our class called **Account**. One will be **SavingsAccount**, and one will be **CurrentAccount**.

1. Within your Account.js file, define a SavingsAccount class that extends Account.
2. Define a constructor that takes two arguments for name and balance.
3. In the constructor you have defined, pass the two parameters to the superclass constructor using the *super* keyword.
4. Within your Account.js file, now define another class called **CurrentAccount**, repeating the steps above.
5. Now, in your two subclasses, override the addInterest method. 
6. Multiply the balance by 1.1 in the current account and multiply the balance by 1.4 in the savings account. 


## ***Part 3: Instantiating our classes***
1. Underneath your three classes, declare an array called *accounts*, and initialise it with an Account object, a SavingsAccount object, and a CurrentAccount object. You do not need a loop for this bit.

   These objects should have balances of 2, 4, and 6 respectively. The names can be whatever you like. 
2. Now loop through the array, and call addInterest on each of the elements. Once you have called addInterest, print the balances.

3. Which addInterest methods were used? There are three in total. One in each of the subclasses, and one in Account.


## **Streams**
## ***The Aims***
In this chapter you will process a file path and check that it is a directory, and if it is, list the contents of a directory. You will then create a file copying program that will read a file and copy the contents in a different location.

## ***Part 1 Using Basic Streams***
1. Create a new script called *DirList.js*.
2. Using suitable nodejs modules and methods, check that the directory exists, and print out a message to say if it does or not.
3. Now check that the path is a directory and not just a simple file. If it is not a directory, display a message and exit.
4. Finally, list the contents of the directory on the console. 

## ***Part 2 Using the Stream Classes***

What we will do in this part of the practical is implement a file copying program, using readers and writers. 

1. Create a new script called *FileCopier.js*.
2. Create two file streams, one for reading which refers to an actual file, and one for writing which refers to an as yet non-existent file.
3. Read the input file and write it to an output file initially using a pipe.
4. Test your code and check that it works. Once you are satisfied that it works, refactor it to use event handlers and chunking to deal with the writing instead.



