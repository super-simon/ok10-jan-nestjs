export class TransformHelper {
  public static trim({ value }: { value: string }): string {
    return typeof value === 'string' ? value.trim() : value;
  }

  public static toLowerCase({ value }: { value: string }): string {
    return typeof value === 'string' ? value.toLowerCase() : value;
  }
}
