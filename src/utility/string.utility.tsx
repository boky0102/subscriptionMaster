export function transformToNormalCase(string: string) {
     let splitString = '';
     string.split('').forEach((letter, index) => {
          if (string.charCodeAt(index) >= 65 && string.charCodeAt(index) <= 90) {
               splitString += ' ';
          }
          splitString += letter.toUpperCase();
     });

     return splitString;
}
