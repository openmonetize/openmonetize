import { ZodError } from 'zod';
export declare function formatZodError(error: ZodError): Record<string, string>;
export declare function isValidUUID(uuid: string): boolean;
export declare function isValidEmail(email: string): boolean;
export declare function sanitizeString(input: string): string;
export declare function isPositiveInteger(value: unknown): boolean;
export declare function isNonNegativeInteger(value: unknown): boolean;
//# sourceMappingURL=validation.d.ts.map