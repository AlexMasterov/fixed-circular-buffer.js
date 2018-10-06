// Type definitions for msgpuck 0.3.0
// Project: https://github.com/AlexMasterov/fixed-circular-buffer.js
// Definitions by: Alex Masterov <https://github.com/AlexMasterov>
// TypeScript Version: 3.1

declare module 'fixed-circular-buffer' {
  interface List {
    top: number;
    bottom: number;
    list: ArrayLike<any>;
    next: null | List;
  }

  class CircularBuffer {
    private head: List;
    private tail: List;
    private scale: number;

    readonly length: number;
    readonly size: number;

    public push(data: any): void;

    public shift(): any;
  }
}
