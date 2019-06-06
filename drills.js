const LinkedList = require('./linkedlist');
const _Node = require('./linkedlist');

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function bubbleSort(array) {
  let swaps = 0;
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      swap(array, i, i + 1);
      swaps++;
    }
  }

  if (swaps > 0) {
    return bubbleSort(array);
  }
  return array;
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mergeSort(left);
  right = mergeSort(right);
  return merge(left, right, array);
}

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    } else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}

function quickSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
}

function partition(array, start, end) {
  const pivot = array[end - 1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end - 1, j);
  return j;
}

//1.
// a. [21, 1] will be the the list after only 3 recursive calls.
// b. After 16, the array will be completely sorted in ascending order after being divided and merged.
// c. 21 then 1 will be the first two.
// d. 43 and 34

//2.
// 1) The pivot could have been either 14 or 17 since all the other values are either
//    less than 14 or greater than 17.
// 2) a. [ 3, 9, 10, 12, 19, 14, 17, 16, 13, 15 ];
//    b. [ 14, 13, 10, 3, 9, 12, 15, 16, 19, 17 ];
// let array1 = [14, 17, 13, 15, 19, 10, 3, 16, 9, 12];
// console.log(quickSort(array1));

//3.
const data =
  '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5';
const dataset = data.split(' ').map(num => Number(num));

function qSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = qSort(array, start, middle);
  array = qSort(array, middle + 1, end);
  return array;
}

//console.log(qSort(dataset));

//4.
function mSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mSort(left);
  right = mSort(right);
  return merge2(left, right, array);
}

function merge2(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    } else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}

//5.
function sortedLinkedList(head) {
  //base case
  if (head === null || head.next !== null) {
    return head;
  }

  let prev = null;
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    prev = slow;
    slow = slow.next;
  }

  prev.next = null;
  const list1 = sortedLinkedList(head);
  const list2 = sortedLinkedList(slow);

  return mergeLinkedList(list1, list2);
}

function mergeLinkedList(link1, link2) {
  const head = new _Node();
  let current = head;

  while (link1 !== null && link2 !== null) {
    if (link1.val < link2.val) {
      current.next = link1;
      link1 = link1.next;
    } else {
      current.next = link2;
      link2 = link2.next;
    }
    current = current.next;
  }
  current.next = link1 === null ? link2 : link1;

  return head.next;
}

function main() {
  let sortll = new LinkedList();

  sortll.insertFirst(1);
  sortll.insertLast(5);
  sortll.insertLast(4);
  sortll.insertLast(3);
  sortll.insertLast(2);

  console.log(JSON.stringify(sortedLinkedList(sortll.head), null, 2));
}

//main();

//6.

function bucketSort(array, low, high) {
  const newArr = [];
  for (let i = 0; i < high; i++) {
    newArr[i] = '';
  }

  for (let i = 0; i < array.length; i++) {
    newArr[array[i] - low] = array[i];
  }
  return newArr;
}

// let bucketData = [1, 3, 2, 5, 4, 7, 6, 9, 8, 10];
// console.log(bucketSort(bucketData, 1, 10));

//7.

function shuffleArray(array, counter = 0) {
  while (counter < array.length) {
    let randomIdx = Math.floor(Math.random() * array.length);
    swap(array, counter, randomIdx);
    counter++;
    return shuffleArray(array, counter);
  }
  return array;
}

let shuffleData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(shuffleArray(shuffleData));

//8.
function SortBooks(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle, arr.length);

  left = SortBooks(left);
  right = SortBooks(right);
  return merge(left, right, arr);
}

const books = [
  'The Great Gatsby',
  'Catch-22',
  'Lolita',
  'Beloved',
  'Harry Potter',
  'To Kill a Mocking Bird',
  '1984',
  'Brave New World',
  'A Brief History of Time',
  'All the Presidents Men',
  'Fahrenheit 451'
];

console.log(SortBooks(books));
