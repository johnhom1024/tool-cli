import shell from 'shelljs';

// 命令结果不输出到终端
shell.config.silent = false;
// 设置第一次出错时退出
shell.set('-e');

async function getCurrentBranchName() {
  try {
    const result = await shell.exec('git symbolic-ref --short -q HEAD', { silent: true });
    const { stdout } = result;
    console.log('你当前的功能分支是：');
    console.log(stdout);
    return stdout;
  } catch (error) {
    throw error;
  }
}

export async function mergeBranch({ target = 'dev' }) {

  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }

  try {
    // 获取当前分支的名称
    const sourceBranch = await getCurrentBranchName();

    // 切换到目标分支
    console.log(`切换到目标分支：\n ${target}`);
    
    try {
      await shell.exec(`git checkout ${target}`);
      console.log(`已切到分支：${target}`);
         
    } catch (error) {
      // 不存在该分支
      console.error(`切换到${target}分支时出现错误，请检查是否存在该分支`);
      return;
    }


    // 判断是否有远程分支
    

    // 执行pull
    console.log('执行下拉...');
    
    await shell.exec(`git pull ${target} ${target}`);
  } catch (error) {
    console.error(error);
  }
}
