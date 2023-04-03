import ora from 'ora';
import chalk from 'chalk';

interface Msg {
  symbol: string;
  text: string;
}

const spinner = ora();
let lastMsg: Msg | null = null;
let isPaused = false;

export function logWithSpinner(symbol: string, msg: string) {
  if (!msg) {
    msg = symbol;
    symbol = chalk.green('✔');
  }
  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  }
  spinner.text = ' ' + msg;
  lastMsg = {
    symbol: symbol + ' ',
    text: msg,
  };
  spinner.start();
}

/**
 * @description: 停止转圈
 * @param {boolean} persist 是否保持原本的文本
 * @return {*}
 */
export function stopSpinner (persist?: boolean) {
  if (!spinner.isSpinning) {
    return;
  }

  if (lastMsg && persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  } else {
    spinner.stop();
  }
  lastMsg = null;
};

export function failSpinner (text: string) {
  spinner.fail(text)
}