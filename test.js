const template = `

<template>
<div>{{something.wow}}</div>
</template>
`;

const result = template.matchAll(
  /(?<!<template>\_.*){{(.*?)}}(?!\_.*<\/template>)/g
);

for (const match of result) {
  console.log(match[1]);
}
