#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

PROXY_URL="${HTTPS_PROXY:-${https_proxy:-}}"

printf '== Network diagnostics ==\n'
if [ -n "$PROXY_URL" ]; then
  if curl -sS -I https://registry.npmjs.org/next --proxy "$PROXY_URL" --max-time 10 >/tmp/npm-proxy-head.txt 2>/tmp/npm-proxy-head.err; then
    printf 'Proxy route: '
    head -n 1 /tmp/npm-proxy-head.txt
  else
    printf 'Proxy route failed: '
    tr '\n' ' ' </tmp/npm-proxy-head.err | sed 's/  */ /g'
    printf '\n'
  fi
else
  echo 'Proxy route: HTTPS_PROXY is not set.'
fi

if env -u http_proxy -u https_proxy -u HTTP_PROXY -u HTTPS_PROXY -u ALL_PROXY -u all_proxy -u npm_config_http_proxy -u npm_config_https_proxy curl -sS -I https://registry.npmjs.org/next --max-time 10 >/tmp/npm-direct-head.txt 2>/tmp/npm-direct-head.err; then
  printf 'Direct route: '
  head -n 1 /tmp/npm-direct-head.txt
else
  printf 'Direct route failed: '
  tr '\n' ' ' </tmp/npm-direct-head.err | sed 's/  */ /g'
  printf '\n'
fi

unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY npm_config_http_proxy npm_config_https_proxy

printf '\n== Installing dependencies (direct, no proxy) ==\n'
npm install --fetch-retries=0 --fetch-timeout=10000

printf '\n== Type check ==\n'
npx tsc --noEmit

printf '\n== Build ==\n'
npm run build

printf '\n== Dev smoke (10s) ==\n'
(timeout 10s npm run dev >/tmp/next-dev.log 2>&1 || true)
if rg -q "Ready|ready - started server" /tmp/next-dev.log; then
  echo "next dev started successfully"
else
  echo "next dev did not become ready in time"
  tail -n 80 /tmp/next-dev.log || true
  exit 1
fi
