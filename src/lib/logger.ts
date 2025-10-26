import * as Sentry from '@sentry/nextjs';

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private context: LogContext = {};

  setContext(context: LogContext) {
    this.context = { ...this.context, ...context };
  }

  clearContext() {
    this.context = {};
  }

  private log(level: LogLevel, message: string, data?: LogContext) {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      message,
      ...this.context,
      ...data,
    };

    // Console logging
    if (process.env.NODE_ENV === 'development') {
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
        `[${level.toUpperCase()}]`,
        message,
        data
      );
    }

    // Send to external logging service if configured
    if (process.env.AXIOM_TOKEN || process.env.LOGTAIL_TOKEN) {
      this.sendToExternalLogger(logData);
    }

    // Send errors to Sentry
    if (level === 'error') {
      Sentry.captureException(new Error(message), {
        level: 'error',
        extra: data,
      });
    }
  }

  private async sendToExternalLogger(logData: unknown) {
    try {
      // Axiom integration
      if (process.env.AXIOM_TOKEN && process.env.AXIOM_DATASET) {
        await fetch(`https://api.axiom.co/v1/datasets/${process.env.AXIOM_DATASET}/ingest`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.AXIOM_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([logData]),
        });
      }

      // Logtail integration
      if (process.env.LOGTAIL_TOKEN) {
        await fetch('https://in.logtail.com', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.LOGTAIL_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(logData),
        });
      }
    } catch (error) {
      console.error('Failed to send logs to external service:', error);
    }
  }

  info(message: string, data?: LogContext) {
    this.log('info', message, data);
  }

  warn(message: string, data?: LogContext) {
    this.log('warn', message, data);
  }

  error(message: string, data?: LogContext) {
    this.log('error', message, data);
  }

  debug(message: string, data?: LogContext) {
    this.log('debug', message, data);
  }
}

export const logger = new Logger();
