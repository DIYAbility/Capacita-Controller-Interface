#!/usr/bin/env node

/**
 * Takes an Illustrator SVG as input and outputs it as a stateless React
 * component. Example:
 * $ ./scripts/aiSvg2ReactSvg.js file.svg -o component.js -d
 * Options:
 *   [path/to/svg] mandatory
 *   -o|--output [path/to/output] Optional; default is to simply write a file of
 *     the same path and filename as the input but with a 'js' extension.
 *   --defs Optional; will place all content inside a <defs> element and
 *     create a <use> element, so the SVG can be used a sprite sheet.
 *   -d|--delete Optional; deletes the input file.
 * When saving the SVG from Illustrator:
 *   - Select "SVG 1.1" from "SVG Profiles"
 *   - Select "Presentation Attributes" from "CSS Properties" under
 *     "Advanced Options".
 */

const fs = require('fs');
const args = process.argv.slice(2);

function go() {
  const input = args[0];
  if (!input) {
    return exit(true);
  }
  readInput(input, onRead);
}

function readInput(input, callback) {
  fs.readFile(input, 'utf8', callback);
}

function writeOutput(data, filename, callback) {
  fs.writeFile(filename, data, callback);
}

function removeMeta(data) {
  return data
    .replace(/<\?xml.*\?>/, '')
    .replace(/<!--.*-->/, '')
    .replace(/<!DOCTYPE.*>/, '');
}

function attributeReplacer(match, p1, p2, p3, p4) {
  return `${p1}${p3.toUpperCase()}${p4}=`;
}

function removeBlankLines(data) {
  return data.replace(/^\s*[\r|\n]/, '');
}

function removeExtraLineBreaks(data) {
  return data.replace(/"\s*([\n\r])/, '" ');
}

function makeSvgDyanmic(data) {
  const x = data.match(/\sx="(\d+px)"\s/)[1];
  const y = data.match(/\sy="(\d+px)"\s/)[1];
  const w = data.match(/\swidth="(\d+px)"\s/)[1];
  const h = data.match(/\sheight="(\d+px)"\s/)[1];
  const vb = data.match(/\sviewBox="([\d|\s]+)"\s/)[1];
  return data
    .replace(/x="\d+px"/, `x={props.hasOwnProperty('svgX') ? props.svgX : '${x}'}`)
    .replace(/y="\d+px"/, `y={props.hasOwnProperty('svgY') ? props.svgY : '${y}'}`)
    .replace(/width="\d+px"/, `width={props.hasOwnProperty('svgWidth') ? props.svgWidth : '${w}'}`)
    .replace(/height="\d+px"/, `height={props.hasOwnProperty('svgHeight') ? props.svgHeight : '${h}'}`)
    .replace(/viewBox="[\d|\s]+"/, `viewBox={props.hasOwnProperty('viewBox') ? props.viewBox : '${vb}'}`)
}

function createDefs(data) {
  const indexGStart = data.indexOf('<g');
  const indexGEnd = data.lastIndexOf('/g>') + 3;
  return [
    data.substring(0, indexGStart),
    '<defs>',
    data.substring(indexGStart, indexGEnd),
    '</defs>',
    '<use x={props.x || 0} y={props.y || 0} xlinkHref={`#${props.href}`} />',
    data.substring(indexGEnd),
  ].join('\n');
}

function insertReact(data) {
  const s1 = 'import React from \'react\';\n\n';
  const s2 = 'export default (props) => {\n';
  const s3 = '  return (\n';
  const e1 = '\n  )\n';
  const e2 = '}\n';
  return `${s1}${s2}${s3}${data}${e1}${e2}`;
}

function getFilename(args) {
  const indexO = args.indexOf('-o');
  const indexOutput = args.indexOf('--output');
  if (indexO !== -1 && !!args[indexO + 1]) {
    return args[indexO + 1];
  } else if (indexOutput !== -1 && !!args[indexOutput + 1]) {
    return args[indexOutput + 1];
  }
  return args[0].replace(/\.[a-z]+$/, '.js');
}

function onRead(error, data) {
  if (error) {
    console.log(error)
    return exit(true);
  }
  data = removeMeta(data);
  data = data.replace(/\senable-background=".*"\s/g, ' ');
  data = data.replace(/([a-z]+)([:-])([a-z])([a-z]+)=/g, attributeReplacer);
  data = removeBlankLines(data);
  data = removeExtraLineBreaks(data);
  data = makeSvgDyanmic(data);
  if (args.indexOf('--defs') !== -1) {
    data = createDefs(data);
  }
  data = insertReact(data);
  data = writeOutput(data, getFilename(args), onWrite);
}

function onWrite(error) {
  if (error) {
    console.log(error)
    return exit(true);
  }
  if (args.indexOf('-d') !== -1) {
    deleteInput();
  } else {
    exit();
  }
}

function deleteInput() {
  fs.unlink(args[0], (error) => {
    if (error) {
      return exit(true);
    }
    exit();
  });
}

function exit(error) {
  if (error) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

go();
