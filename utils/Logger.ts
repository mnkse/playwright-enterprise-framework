export class Logger {
  static info(message: string, data?: unknown): void {
    this.write('INFO', message, data);
  }

  static warn(message: string, data?: unknown): void {
    this.write('WARN', message, data);
  }

  static error(message: string, data?: unknown): void {
    this.write('ERROR', message, data);
  }

  static debug(message: string, data?: unknown): void {
    if (process.env.LOG_LEVEL === 'debug') {
      this.write('DEBUG', message, data);
    }
  }

  private static write(
    level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG',
    message: string,
    data?: unknown,
  ): void {
    const timestamp = new Date().toISOString();

    const logMessage = {
      timestamp,
      level,
      message,
      ...(data !== undefined && { data }),
    };

    console.log(JSON.stringify(logMessage, null, 2));
  }
}