import { launch, Page } from "puppeteer-core";
import chromium from "@sparticuz/chromium";
let _page: Page | null;

async function getPage() {
  if (_page) return _page;
  const options = {
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  };
  const browser = await launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(url, width, height, zoom) {
  const page = await getPage();
  await page.goto(url);
  await page.setViewport({ width: Number(width) || 1280, height: Number(height) || 720, deviceScaleFactor: 2 });
  await page.evaluate((zoom) => { document.body.style.zoom = Number(zoom) || 1 }, zoom);
  const file = await page.screenshot({ fullPage: true });
  return file;
}
