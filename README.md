#### Create a README file to answer the following question- ####-

##------------------------------------------------------------##

#### 1) What is the difference between var, let, and const?

Answer:

**Scope**:
var হলো function-scoped, মানে function-এর ভেতরে ডিফাইন করলে শুধু সেই function-এর ভেতরেই কাজ করবে।
let এবং const হলো block-scoped, মানে { } এর ভেতরেই সীমাবদ্ধ থাকে।

**Hoisting**:
var hoist হয় এবং শুরুতে undefined হয়ে যায়।
let এবং const ও hoist হয়, কিন্তু Temporal Dead Zone (TDZ)-এ থাকে, তাই ডিক্লেয়ার করার আগে ব্যবহার করলে error দেয়।

**Re-declaration**:
var একই scope-এ আবার declare করা যায়।
let এবং const একই scope-এ পুনরায় declare করা যায় না।

**Re-assignment**:
var এবং let এর মান পরিবর্তন করা যায়।
const এর মান পরিবর্তন করা যায় না (constant থাকে)।

**Use Cases**:
var সাধারণত পুরোনো (ES5) কোডে ব্যবহৃত হয়।
let ব্যবহার করা হয় যখন variable-এর মান পরে পরিবর্তন করার দরকার হবে।
const ব্যবহার করা হয় যখন মান একবার সেট করে আর পরিবর্তন করার দরকার নেই।

#### 2) What is the difference between map(), forEach(), and filter()?

Answer:

**Purpose**:
forEach() → শুধু array-এর প্রতিটি element-এর উপর কাজ চালায়, কিন্তু নতুন array return করে না।
map() → প্রতিটি element-এর উপর কাজ চালায় এবং নতুন array return করে।
filter() → শর্ত অনুযায়ী element বেছে নেয় এবং নতুন array return করে।

**Use Case**:
forEach() → যখন শুধু side-effect দরকার (যেমন: console.log, calculation)।
map() → যখন array transform করতে হবে (যেমন: element \* 2 করা)।
filter() → যখন কিছু element বাদ দিয়ে বাকি element রাখতে হবে।

#### 3) What are arrow functions in ES6?

Answer:

**Definition**:
Arrow function হলো ES6 (ECMAScript 2015)-এ introduce করা একটি নতুন syntax, যা দিয়ে function আরও ছোট ও সংক্ষিপ্তভাবে লেখা যায়।

#### 4) How does destructuring assignment work in ES6?

Answer:

**Definition**:
Destructuring assignment হলো ES6-এর একটি ফিচার, যা দিয়ে array বা object-এর ভেতর থেকে মান (value) আলাদা ভ্যারিয়েবলে সহজে বের করে নেওয়া যায়। এতে কোড ছোট ও readable হয়।

**Example**:
const numbers = [10, 20, 30];
const a = numbers[0];
const b = numbers[1];

const [x, y, z] = numbers;
console.log(x, y, z);

**Use Cases**:
Array বা object থেকে দ্রুত মান নেওয়ার জন্য।
Function parameter handle করার সময়।
কোডকে ছোট ও readable করার জন্য।

#### 5) Explain template literals in ES6. How are they different from string concatenation?

Answer:

**Definition**:
Template literals হলো ES6-এর একটি ফিচার, যা দিয়ে string তৈরি করার সময় backtick ( ` ` ) ব্যবহার করা হয়। এতে multiline string লেখা যায় এবং ${ } ব্যবহার করে variable বা expression string-এর ভেতরে বসানো যায়।
