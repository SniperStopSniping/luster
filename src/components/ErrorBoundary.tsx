'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error reporting service in production
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-canvas px-6">
          <div className="text-center max-w-md">
            {/* Japanese accent */}
            <span className="block text-[10px] uppercase tracking-[0.25em] text-ink/40 mb-6">
              予期せぬエラー
            </span>

            <h1 className="font-serif text-4xl md:text-5xl mb-4 text-ink">
              Something went wrong
            </h1>

            <p className="text-ink/60 mb-8 leading-relaxed">
              We encountered an unexpected error. Please try again or return to the home page.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center justify-center bg-ink text-canvas px-8 py-3 text-sm hover:bg-ink/90 transition-colors"
              >
                Try Again
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center border border-ink/20 text-ink px-8 py-3 text-sm hover:bg-ink/5 transition-colors"
              >
                Return Home
              </a>
            </div>

            {/* Subtle branding */}
            <p className="mt-16 font-mono text-xs text-ink/30">
              LUSTER · 構造美学
            </p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

