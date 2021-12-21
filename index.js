// console.log('hello world')
// object Literals
 // the object in Js is essentially a collections of  a key value pairs 

 const circle = {
    radius : 1, 
    location : {
        x : 1,
        y : 1
    },
    draw : function (){
        console.log('draw');
    }
    
};
circle.draw();// i can reach its members using dot notation 

// if i want another circle i have to duplicate the whole previous object, if one of the methods have bugs I have to go and fix it in all places so => literal object syntax not effective if i will create an object and duplicate it and it has at least one method 
// refactoring (two ways to create objects)
// a. factory function
function createCircle (radius){
    return {
        radius: radius,
        draw : function (){
            console.log('draw')
        }
    };
}

const circle1 = createCircle(1);
circle1.draw();

//b.  constructor function 
//  the naming convention for constructor functions is deferent (the name should be in upper case )
// this -> by default reference  to the global object in the browser which is "window object"
// this ->  reference  to the object that executing this piece of code because of using "new " operator 


function Circle (radius){
    this.radius = radius;
    this.draw = function (){
        console.log("draw")
    }
}
const another = new Circle(1) 
 // we use the "new" operator to call circle function and pass 1 as the argument  => the "new" operator will: 1. create new empty object {} to that function and 2. sit (this) to refer to that object so i can add methods and props to that object and 3. it will return these methods automatically no need for use  "return"
////////////
//every object in Js has property called "constructor" and that reference to the function that was used to construct of create an object [go to browser console and type -> another.constructor] 
/* another.constructor
ƒ Circle (radius){
    this.radius = radius;
    this.draw = function (){
        console.log("draw")
    }
}

 when we create an object using "literal object" syntax, internally the js engine uses this constructor function , let me show you ->

let x = {}; // i used object literal => js engine will translate that to this : 
 let x = new Object (); 
 circle object created and returned form a refectory function 
 circle.constructor
ƒ Object() { [native code] }
 */
///////////// 
//in Js its either objects(functions,arrays) or Primitives(nums,booleans,strings..)
// values types 
// let x = 10;
// let y = x; // x & y are two independent variables 
// x = 20 
// reference value 
let x = {value : 10} 
let y = x 
x.value = 20
console.log(x,y) // 20 20

 // this object stored some where in memory and the address for that memory location is stored inside the variable x so when we copy x into y (the address or the reference copied ) in other words the both variables x & y are pointing to the same reference in the memory .. so when we either modify the object using x or y the changes are immediately visible to the other variable 

/* conclusion 
primitives--> are copied by their value. 
objects  ---> are copied by their reference.
*/
let number = 10; 
function increase (number){
    number++
    console.log(number)
}
increase(number)
console.log(number)//10

/* when we call increase and pass number to the function so the number value is copied to the parameter in the function so "number" inside the function is completely independent than "number" in the global 
 */

let obj ={value : 10} ; 
function increase2 (obj){
    obj.value++;
    console.log(obj)//11
}
increase2(obj)
console.log(obj)//11

/* when we call increase and pass obj, this obj was passed by its reference, so the local parameter "obj" will point to the same object that created in the global scope (any change will be made to this object will be visible to the other value )
*/

// adding removing properties 
/* in constructor function we can create objects and these objects in js are dynamic, that means after create them you can add or remove some properties, in other languages like c# and Java every time you want to edit them you have to go back and change classes 
*/

// function Circle (radius){
//     this.radius = radius;
//     this.draw = function (){
//         console.log("draw")
//     }
// }
const circle2 = new Circle(10)
// add new property 
circle2.location = { x: 1} ;
// we have another notation to access properties called "bracket location"
circle2['location'] = {x : 1}

// Enumerating properties 
/* some times we need to iterate over  or enumerate properties in an object 
we can do that using 1- for in loop :
*/
for (let key in circle){
    console.log('key',key)
}// iterate throw all elements 
// if i want to get the value for each element I can use bracket notation :
// for (let key in circle){
//     console.log(key,circle[key])
// }
// if i want to get only the properties without methods 
for (let key in circle){
    if (typeof circle[key] !=='function')
        console.log(key,circle[key])
}
// 2- using .keys object method 
const keys = Object.keys(circle)
console.log(keys)
// it will shows me all the object element but i cant separate the props form methods
// if i want to check for existence of a property or method I can do the following : 
if ('radius' in circle){
    console.log('circle has a radius')


}
    
//Abstraction  (hide the details and complicity and just show the essential  

function Circle (radius){
    this.radius = radius;
    this.defaultLocation= {x:0,y=0};
    this.computeOptimumLocation = function(){
        // ..
    }
    this.draw = function (){
        this.computeOptimumLocation();


        console.log("draw")
    }
}
const circle3 = new Circle(10)
// in this example we should hide computeOptimalLocation and defaultLocation methods  from the consumer of this object (to reduce complexity ) and only show the essentials radius and draw method (remember the DVD example)

//Private Properties and Methods 
function Circle (radius){
    let color  = 'red' // local var this will not be a part of the created object because we didn't set it as property of that object (this.color = color)
    this.radius = radius;
  let defaultLocation = {x:0,y=0}; // private property 
  let computeOptimumLocation = function(){// private method
        // ..
    }
    this.draw = function (){
        computeOptimumLocation();


        console.log("draw")
    }
}
const circle3 = new Circle(10)

// to convert an object property or method to private i have to convert it to local variable or function inside the function constructor 

// getter-setter 
// if you noticed we cant reach the private methods from the outside of the function, so what is the way that allows me to reach them ?
function Circle (radius){
  
    this.radius = radius;
    let defaultLocation = {x:0,y=0}; 
    this.getDefaultLocation = function(){// getter is function used to read a property 
        return defaultLocation
    };


    this.draw = function (){
      console.log("draw")
    }
}
const circle3 = new Circle(10)
circle3.getDefaultLocation() // i created an object method that returns the private method 


//Exercise : design a stop watch object 


function Stopwatch(){
    let startTime, endTime, running, duration = 0; //private vars

    this.start = function (){
        if (running)
            throw new Error ('Stopwatch has already started');
        running =true;
        startTime = new Date(); // built in object calculates the current time     
    };

    this.stop = function (){
        if (!running)// validation check 
            throw new Error ('Stopwatch is not started');
        running = false;

        endTime = new Date();

        const seconds = (endTime.getTime() - startTime.getTime()) / 1000; // ms between these two date objects (endtime & starttime) and * with 1000 to convert it to seconds 
        duration += seconds;
    };

    this.reset = function (){// set all vars to its initial values 
        startTime = null;
        endTime = null; 
        running = false;
        duration = 0; 
    };

    Object.defineProperty(this, 'duration',{
        get : function (){return duration;}//getter will return the local variable
    });//read only property


}