import { promises as fs } from 'fs';
const { writeFile } = fs;
(async () => {
  try {
    console.log('getting git sha');
    const sha = process.env.GITHUB_SHA || '';
    const tag = process.env.TAG || ''; // this is set as a workflow environment variable
    console.log('file status: ', { sha, tag });
    await writeFile(
      'dist/fcc-calculator/stats',
      JSON.stringify(
        {
          sha,
          tag
        },
        null,
        2
      )
    );
    console.log('done');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
