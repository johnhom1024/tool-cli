import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import { stopSpinner } from './spinner';

const format = (label: string, msg: string) => {
  return msg
    .split('\n')
    .map((line, i) => {
      return i === 0
        ? `${label} ${line}`
        : line.padStart(stripAnsi(label).length + line.length + 1);
    })
    .join('\n');
};

const chalkTag = (msg: string) => chalk.bgBlackBright.white.dim(` ${msg} `);

export const log = (msg = '', tag = null) => {
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg);
};

export const info = (msg: string, tag = null) => {
  console.log(
    format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg)
  );
};

export const done = (msg: string, tag = null) => {
  console.log(
    format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), msg)
  );
};

export const warn = (msg: string, tag = null) => {
  console.warn(
    format(
      chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''),
      chalk.yellow(msg)
    )
  );
};

export const error = (msg: string | Error, tag = null) => {
  stopSpinner();
  console.error(
    format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(msg))
  );
  if (msg instanceof Error) {
    console.error(msg.stack);
  }
};
