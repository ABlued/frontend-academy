import { NewsDetail, NewsFeed } from "../types";

export class Api {
  xhr: XMLHttpRequest;
  url: string;

  constructor(url: string) {
    this.xhr = new XMLHttpRequest();
    this.url = url;
  }

  getRequestWithXHR<AjaxResponse>(
    callback: (data: AjaxResponse) => void
  ): void {
    this.xhr.open("GET", this.url);
    this.xhr.addEventListener("load", () => {
      callback(JSON.parse(this.xhr.response));
    });
    this.xhr.send();
  }
  getRequestWithPromise<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    fetch(this.url)
      .then((response) => response.json())
      .then((data) => cb(data))
      .catch((error) => console.log(error));
  }
}

export class NewsFeedApi extends Api {
  getData(callback: (data: NewsFeed[]) => void): void {
    this.getRequestWithXHR<NewsFeed[]>(callback);
  }

  getDataWithPromise(callback: (data: NewsFeed[]) => void): void {
    this.getRequestWithPromise<NewsFeed[]>(callback);
  }
}

export class NewsDetailApi extends Api {
  getData(callback: (data: NewsDetail) => void): void {
    this.getRequestWithXHR<NewsDetail>(callback);
  }

  getDataWithPromise(callback: (data: NewsDetail) => void): void {
    this.getRequestWithPromise<NewsDetail>(callback);
  }
}
