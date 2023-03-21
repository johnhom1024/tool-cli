import { execa } from 'execa';

export async function mergeBranch({ target = 'dev' }) {
  try {
    // 获取当前分支的名称
    const result = await execa('git', ['symbolic-ref', '--short', '-q', 'HEAD'])

    console.log('----------johnhomLogDebug result', result);
    
  } catch (error) {
    
  }
}
