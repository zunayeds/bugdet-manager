export abstract class StringHelper {
  static makePlural(text: string): string {
    if (text.endsWith('s')) {
      return text + 'es';
    } else if (text.endsWith('y')) {
      return text.substring(0, text.length - 1) + 'ies';
    } else {
      return text + 's';
    }
  }
}
