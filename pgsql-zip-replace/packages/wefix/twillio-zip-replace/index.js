import { readFile } from 'fs/promises';

export async function main(event) {

    let data = JSON.parse(await readFile("zips.json", "utf8"));

    let zip = event.digit;

    let response = {"area": data.ZIPS[zip]}

    return {
        body: response,
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
}
