import { NewsDetail, NewsFeed } from "../types";

export class Api {
  ajax: XMLHttpRequest;
  url: string;

  constructor(url: string) {
    this.ajax = new XMLHttpRequest();
    this.url = url;
  }

  getRequest<AjaxResponse>(callback: (data: AjaxResponse) => void): void {
    this.ajax.open("GET", this.url);
    this.ajax.addEventListener("load", () => {
      callback(JSON.parse(this.ajax.response));
    });
    this.ajax.send();
  }
}

export class NewsFeedApi extends Api {
  getData(callback: (data: NewsFeed[]) => void): void {
    this.getRequest<NewsFeed[]>(callback);
  }
}

export class NewsDetailApi extends Api {
  getData(callback: (data: NewsDetail) => void): void {
    this.getRequest<NewsDetail>(callback);
  }
}
