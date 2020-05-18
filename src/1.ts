let a = {};
export default a;

// type FunctionKeys<T> = {
//   [K in keyof T]: T[K] extends (...args:Array<any>) =>any ? K : never;
// }[keyof T];
// type Pick<T, U extends keyof T> = {
//   [key in U]: T[key] extends () => infer X ? X : never;
// };

// function pick<T>(obj: T): Pick<T, FunctionKeys<T>> {
//   throw "implement smth";
// }

// const user = {
//   name: "mike",
//   age: 34,
//   say: () => "hello",
//   say2: () => "hi there"
// };

// const picked = pick(user);
// type resolved = typeof picked;

// //pick(user, ["foo"]);

// type a = {
//   say:()=> void,
//   a:4, y:45
// }
// type b = {
//   say:()=> void,
//   a:'blbla'
// }

//  function Some(arg:a | b){
//   let i = arg as b;
//  }

interface Bird {
  fly: () => void;
  layEggs: () => void;
}

interface Fish {
  swim: () => void;
  layEggs: () => void;
}

function getSmallPet(): Fish | Bird {
  return { fly: () => {}, layEggs: () => {} };
}

// let pet  = getSmallPet();
// if ('swim' in Fish ) {
//   (pet as Fish).swim();
// } else if ((pet as Bird).fly) {
//   (pet as Bird).fly();
// }

// function broken(name: string | null): string {
//   function postfix(epithet: string) {
//     return name!.charAt(0) + ".  the " + epithet; // error, 'name' is possibly null
//   }
//   name = name || "Bob";
//   return postfix("great");
// }

//   type LinkedList<T> = T & { next: LinkedList<T> };

// interface Person {
//   name: string;
// }

// var people: LinkedList<Person>;

type Alias = { num: number };
interface Interface {
  num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
