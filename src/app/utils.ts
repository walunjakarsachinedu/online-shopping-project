import { PipeTransform } from "@angular/core";

export class Util {
  static getImageUrl(url: string): string {
    const id = url.match(/[-\w]{25,}/)?.[0];
    return id ? `https://drive.google.com/uc?id=${id}` : '';
  }
}