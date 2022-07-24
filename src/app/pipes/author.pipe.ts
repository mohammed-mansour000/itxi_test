import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'author'
})
export class AuthorPipe implements PipeTransform {

  transform(authorArray: string[]) : string {
    if(!authorArray.length) return "";
    let stringwithcomma = authorArray.map(element=>element).join(", ")
    return stringwithcomma;
  }
 

}
