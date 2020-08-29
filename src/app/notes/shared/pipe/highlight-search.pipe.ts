import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearchPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: string, args: string): any {
    if (args && value) {
        value = String(value); // make sure its a string
        const startIndex = value.toLowerCase().indexOf(args.toLowerCase());
        if (startIndex != -1) {
            const endLength = args.length;
            const matchingString = value.substr(startIndex, endLength);
            return value.replace(matchingString, '<mark>' + matchingString + '</mark>');
            // "<mark>$&</mark>"
        }

    }
    return value;
}

}
