import { getText } from './localization';

export async function getItem(id: number): Promise<any> {
  try {
    return await get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
  } catch (err) {
    throw new Error(err);
  }
}

export async function get(url: string): Promise<any> {
  try {
    const response: Response = await fetch(url);
    return await response.json();
  } catch (err) {
    throw new Error(err);
  }
}

export function markupHTML(text: string): { __html: string } {
  return { __html: text };
}

export function handleDefaultError(err: Error, errorCb: any): void {
  if (errorCb) {
    errorCb(err ? err.message : getText('error_unknown'));
  }
}
