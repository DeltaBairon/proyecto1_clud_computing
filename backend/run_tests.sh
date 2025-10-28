#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
npm ci --silent
npm test
echo "Tests OK"
