#!/usr/bin/env node

/**
 * 프로젝트 초기화 스크립트
 * 사용법: pnpm init:app --name myapp
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';

const OLD_NAME = 'ait-nextjs-starter';

function parseArgs(): { name?: string } {
  const args = process.argv.slice(2);
  const result: { name?: string } = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--name' && args[i + 1]) {
      result.name = args[i + 1];
      i++;
    }
  }

  return result;
}

function validateName(name: string): boolean {
  // npm 패키지 이름 규칙: 소문자, 숫자, 하이픈, 언더스코어만 허용
  return /^[a-z0-9_-]+$/.test(name);
}

function replaceInFile(
  filePath: string,
  oldValue: string,
  newValue: string
): void {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const newContent = content.replace(new RegExp(oldValue, 'g'), newValue);
    writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ ${filePath} 업데이트 완료`);
  } catch (error) {
    console.error(`❌ ${filePath} 업데이트 실패:`, error);
  }
}

function updatePackageJson(newName: string): void {
  const filePath = join(process.cwd(), 'package.json');
  const content = JSON.parse(readFileSync(filePath, 'utf-8'));
  content.name = newName;
  writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
  console.log(`✅ package.json 업데이트 완료`);
}

function updateGraniteConfig(newName: string): void {
  const filePath = join(process.cwd(), 'granite.config.ts');
  replaceInFile(filePath, `appName: '${OLD_NAME}'`, `appName: '${newName}'`);
}

function updateEnvExample(newName: string): void {
  const filePath = join(process.cwd(), '.env.example');
  const content = readFileSync(filePath, 'utf-8');
  const newContent = content.replace(
    /# NEXT_PUBLIC_APP_NAME=.*/,
    `NEXT_PUBLIC_APP_NAME=${newName}`
  );
  writeFileSync(filePath, newContent, 'utf-8');
  console.log(`✅ .env.example 업데이트 완료`);
}

function updateReadme(newName: string): void {
  const filePath = join(process.cwd(), 'README.md');
  const content = readFileSync(filePath, 'utf-8');
  // 제목 변경
  const newContent = content
    .replace(/^# AIT Next.js Starter/, `# ${newName}`)
    .replace(new RegExp(OLD_NAME, 'g'), newName);
  writeFileSync(filePath, newContent, 'utf-8');
  console.log(`✅ README.md 업데이트 완료`);
}

function main(): void {
  const { name } = parseArgs();

  if (!name) {
    console.error('❌ 오류: --name 옵션이 필요합니다.');
    console.log('사용법: pnpm init:app --name <프로젝트이름>');
    console.log('예시: pnpm init:app --name my-awesome-app');
    process.exit(1);
  }

  if (!validateName(name)) {
    console.error(
      '❌ 오류: 프로젝트 이름은 소문자, 숫자, 하이픈(-), 언더스코어(_)만 사용할 수 있습니다.'
    );
    process.exit(1);
  }

  const newName: string = name;

  console.log(`\n🚀 프로젝트 초기화 시작...`);
  console.log(`   '${OLD_NAME}' -> '${newName}'\n`);

  // 파일 업데이트
  updatePackageJson(newName);
  updateGraniteConfig(newName);
  updateEnvExample(newName);
  updateReadme(newName);

  // 모든 텍스트 파일에서 문자열 치환 (node_modules, .git 등 제외)
  console.log(`\n📝 다른 파일들에서 이름 치환 중...`);
  const excludeDirs = new Set([
    'node_modules',
    '.git',
    '.next',
    'dist',
    'out',
    '.turbo',
    'scripts',
  ]);
  const excludeFiles = new Set([
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
  ]);

  function shouldExclude(filePath: string): boolean {
    const parts = filePath.split('/');
    return (
      parts.some((part) => excludeDirs.has(part)) ||
      excludeFiles.has(basename(filePath))
    );
  }

  function replaceInDirectory(dir: string, replacement: string): void {
    try {
      const entries = readdirSync(dir);
      for (const entry of entries) {
        const fullPath = join(dir, entry);
        if (shouldExclude(fullPath)) continue;

        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
          replaceInDirectory(fullPath, replacement);
        } else if (stat.isFile()) {
          try {
            const content = readFileSync(fullPath, 'utf-8');
            if (content.includes(OLD_NAME)) {
              const newContent = content.replace(
                new RegExp(OLD_NAME, 'g'),
                replacement
              );
              writeFileSync(fullPath, newContent, 'utf-8');
            }
          } catch {
            // 바이너리 파일이거나 읽을 수 없는 파일은 건너뛰기
          }
        }
      }
    } catch {
      // 권한 문제 등으로 접근할 수 없는 디렉터리는 건너뛰기
    }
  }

  replaceInDirectory(process.cwd(), newName);
  console.log(`✅ 파일 내용 치환 완료`);

  console.log(`\n✅ 프로젝트 초기화가 완료되었습니다!`);
  console.log(`\n다음 단계:`);
  console.log(`  1. .env.example을 참고하여 .env.local 파일 생성`);
  console.log(
    `  2. granite.config.ts에서 brand.displayName, primaryColor, icon 설정`
  );
  console.log(`  3. pnpm install 실행`);
  console.log(`  4. pnpm dev로 개발 서버 시작\n`);
}

main();
