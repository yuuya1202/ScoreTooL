const fs = require("fs");

const sourcePath = process.argv[2]; // source.json (①から取得した最新JSON)
const masterPath = process.argv[3]; // ranking_master.json (GitHub側マスタ)

const sourceJson = JSON.parse(fs.readFileSync(sourcePath, "utf-8"));
const masterJson = JSON.parse(fs.readFileSync(masterPath, "utf-8"));

const sourceRaw = Array.isArray(sourceJson) ? sourceJson : (sourceJson.data || []);
const masterRaw = Array.isArray(masterJson) ? masterJson : (masterJson.data || []);

const key = (item) => item.music_name + "___" + item.difficulty;

const merged = {};
for (const item of masterRaw) merged[key(item)] = item;
for (const item of sourceRaw) merged[key(item)] = item; // ①(最新)の内容で上書き

const result = Object.values(merged);
fs.writeFileSync(masterPath, JSON.stringify(result));

console.log(`merged. total charts: ${result.length} (source: ${sourceRaw.length}, master before: ${masterRaw.length})`);
