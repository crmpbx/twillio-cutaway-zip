import { readFile, writeFile } from 'fs/promises';
import pg from 'pg';

export async function main(event) {

  let data = JSON.parse(await readFile("zips.json", "utf8"));

  let zip = event.digit;

  if (zip in data.ZIPS) {
    if (event.replace && event.area) {

      let old = data.ZIPS[zip];
      data.ZIPS[zip] = event.area

      let json = JSON.stringify(data);
      await writeFile('zips.json', json, 'utf8');

      let response = { "Succes": `Changed ${zip} from ${old} to ${event.area}` }

      return {
        body: response,
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }

    }
    return {
      body: {"Error": `Local storage doesn't have records for ${zip}`},
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    }

  }

  if (zip in data.ZIPS) {
    let response = { "area": data.ZIPS[zip] }
    return {
      body: response,
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }

  const client = new pg.Client({
    user: 'wefix_pg_db',
    host: '142.93.246.166',
    database: 'wefix_database',
    password: 'Gvxt*ScDY5',
    port: 5432,
  })

  await client.connect()

  const res = await client.query('SELECT area FROM "ZIP" z WHERE zip = $1', [zip])

  if (!res.rows[0]) {

    let response = { "area": "Invalid or unknown ZIP" }
    return {
      body: response,
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    }

  }

  data.ZIPS[zip] = res.rows[0]["area"]

  let json = JSON.stringify(data);
  await writeFile('zips.json', json, 'utf8');

  return {
    body: res.rows[0],
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  }
}
