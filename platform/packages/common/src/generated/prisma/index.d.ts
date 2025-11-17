
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Team
 * 
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>
/**
 * Model TeamMembership
 * 
 */
export type TeamMembership = $Result.DefaultSelection<Prisma.$TeamMembershipPayload>
/**
 * Model CreditWallet
 * 
 */
export type CreditWallet = $Result.DefaultSelection<Prisma.$CreditWalletPayload>
/**
 * Model CreditTransaction
 * 
 */
export type CreditTransaction = $Result.DefaultSelection<Prisma.$CreditTransactionPayload>
/**
 * Model BurnTable
 * 
 */
export type BurnTable = $Result.DefaultSelection<Prisma.$BurnTablePayload>
/**
 * Model ProviderCost
 * 
 */
export type ProviderCost = $Result.DefaultSelection<Prisma.$ProviderCostPayload>
/**
 * Model UsageEvent
 * 
 */
export type UsageEvent = $Result.DefaultSelection<Prisma.$UsageEventPayload>
/**
 * Model Plan
 * 
 */
export type Plan = $Result.DefaultSelection<Prisma.$PlanPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model Entitlement
 * 
 */
export type Entitlement = $Result.DefaultSelection<Prisma.$EntitlementPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CustomerTier: {
  STARTER: 'STARTER',
  GROWTH: 'GROWTH',
  ENTERPRISE: 'ENTERPRISE'
};

export type CustomerTier = (typeof CustomerTier)[keyof typeof CustomerTier]


export const CustomerStatus: {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  CHURNED: 'CHURNED'
};

export type CustomerStatus = (typeof CustomerStatus)[keyof typeof CustomerStatus]


export const TeamRole: {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER'
};

export type TeamRole = (typeof TeamRole)[keyof typeof TeamRole]


export const TransactionType: {
  PURCHASE: 'PURCHASE',
  BURN: 'BURN',
  REFUND: 'REFUND',
  EXPIRATION: 'EXPIRATION',
  GRANT: 'GRANT'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const ProviderName: {
  OPENAI: 'OPENAI',
  ANTHROPIC: 'ANTHROPIC',
  GOOGLE: 'GOOGLE',
  COHERE: 'COHERE',
  MISTRAL: 'MISTRAL'
};

export type ProviderName = (typeof ProviderName)[keyof typeof ProviderName]


export const CostType: {
  INPUT_TOKEN: 'INPUT_TOKEN',
  OUTPUT_TOKEN: 'OUTPUT_TOKEN',
  REQUEST: 'REQUEST',
  IMAGE: 'IMAGE',
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO'
};

export type CostType = (typeof CostType)[keyof typeof CostType]


export const EventType: {
  TOKEN_USAGE: 'TOKEN_USAGE',
  API_CALL: 'API_CALL',
  IMAGE_GENERATION: 'IMAGE_GENERATION',
  AUDIO_PROCESSING: 'AUDIO_PROCESSING',
  CUSTOM: 'CUSTOM'
};

export type EventType = (typeof EventType)[keyof typeof EventType]


export const SubscriptionStatus: {
  ACTIVE: 'ACTIVE',
  CANCELED: 'CANCELED',
  PAST_DUE: 'PAST_DUE',
  TRIALING: 'TRIALING'
};

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]


export const BillingPeriod: {
  MONTHLY: 'MONTHLY',
  ANNUAL: 'ANNUAL'
};

export type BillingPeriod = (typeof BillingPeriod)[keyof typeof BillingPeriod]


export const LimitType: {
  HARD: 'HARD',
  SOFT: 'SOFT',
  NONE: 'NONE'
};

export type LimitType = (typeof LimitType)[keyof typeof LimitType]


export const LimitPeriod: {
  DAILY: 'DAILY',
  MONTHLY: 'MONTHLY',
  TOTAL: 'TOTAL'
};

export type LimitPeriod = (typeof LimitPeriod)[keyof typeof LimitPeriod]

}

export type CustomerTier = $Enums.CustomerTier

export const CustomerTier: typeof $Enums.CustomerTier

export type CustomerStatus = $Enums.CustomerStatus

export const CustomerStatus: typeof $Enums.CustomerStatus

export type TeamRole = $Enums.TeamRole

export const TeamRole: typeof $Enums.TeamRole

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type ProviderName = $Enums.ProviderName

export const ProviderName: typeof $Enums.ProviderName

export type CostType = $Enums.CostType

export const CostType: typeof $Enums.CostType

export type EventType = $Enums.EventType

export const EventType: typeof $Enums.EventType

export type SubscriptionStatus = $Enums.SubscriptionStatus

export const SubscriptionStatus: typeof $Enums.SubscriptionStatus

export type BillingPeriod = $Enums.BillingPeriod

export const BillingPeriod: typeof $Enums.BillingPeriod

export type LimitType = $Enums.LimitType

export const LimitType: typeof $Enums.LimitType

export type LimitPeriod = $Enums.LimitPeriod

export const LimitPeriod: typeof $Enums.LimitPeriod

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Customers
 * const customers = await prisma.customer.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Customers
   * const customers = await prisma.customer.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teamMembership`: Exposes CRUD operations for the **TeamMembership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamMemberships
    * const teamMemberships = await prisma.teamMembership.findMany()
    * ```
    */
  get teamMembership(): Prisma.TeamMembershipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creditWallet`: Exposes CRUD operations for the **CreditWallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreditWallets
    * const creditWallets = await prisma.creditWallet.findMany()
    * ```
    */
  get creditWallet(): Prisma.CreditWalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creditTransaction`: Exposes CRUD operations for the **CreditTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreditTransactions
    * const creditTransactions = await prisma.creditTransaction.findMany()
    * ```
    */
  get creditTransaction(): Prisma.CreditTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.burnTable`: Exposes CRUD operations for the **BurnTable** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BurnTables
    * const burnTables = await prisma.burnTable.findMany()
    * ```
    */
  get burnTable(): Prisma.BurnTableDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.providerCost`: Exposes CRUD operations for the **ProviderCost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProviderCosts
    * const providerCosts = await prisma.providerCost.findMany()
    * ```
    */
  get providerCost(): Prisma.ProviderCostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usageEvent`: Exposes CRUD operations for the **UsageEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsageEvents
    * const usageEvents = await prisma.usageEvent.findMany()
    * ```
    */
  get usageEvent(): Prisma.UsageEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.plan`: Exposes CRUD operations for the **Plan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Plans
    * const plans = await prisma.plan.findMany()
    * ```
    */
  get plan(): Prisma.PlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.entitlement`: Exposes CRUD operations for the **Entitlement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Entitlements
    * const entitlements = await prisma.entitlement.findMany()
    * ```
    */
  get entitlement(): Prisma.EntitlementDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Customer: 'Customer',
    User: 'User',
    Team: 'Team',
    TeamMembership: 'TeamMembership',
    CreditWallet: 'CreditWallet',
    CreditTransaction: 'CreditTransaction',
    BurnTable: 'BurnTable',
    ProviderCost: 'ProviderCost',
    UsageEvent: 'UsageEvent',
    Plan: 'Plan',
    Subscription: 'Subscription',
    Entitlement: 'Entitlement'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "customer" | "user" | "team" | "teamMembership" | "creditWallet" | "creditTransaction" | "burnTable" | "providerCost" | "usageEvent" | "plan" | "subscription" | "entitlement"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>
        fields: Prisma.TeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam>
          }
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>
            result: $Utils.Optional<TeamCountAggregateOutputType> | number
          }
        }
      }
      TeamMembership: {
        payload: Prisma.$TeamMembershipPayload<ExtArgs>
        fields: Prisma.TeamMembershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamMembershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamMembershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>
          }
          findFirst: {
            args: Prisma.TeamMembershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamMembershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>
          }
          findMany: {
            args: Prisma.TeamMembershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>[]
          }
          create: {
            args: Prisma.TeamMembershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>
          }
          createMany: {
            args: Prisma.TeamMembershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamMembershipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>[]
          }
          delete: {
            args: Prisma.TeamMembershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>
          }
          update: {
            args: Prisma.TeamMembershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>
          }
          deleteMany: {
            args: Prisma.TeamMembershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamMembershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamMembershipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>[]
          }
          upsert: {
            args: Prisma.TeamMembershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>
          }
          aggregate: {
            args: Prisma.TeamMembershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamMembership>
          }
          groupBy: {
            args: Prisma.TeamMembershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamMembershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamMembershipCountArgs<ExtArgs>
            result: $Utils.Optional<TeamMembershipCountAggregateOutputType> | number
          }
        }
      }
      CreditWallet: {
        payload: Prisma.$CreditWalletPayload<ExtArgs>
        fields: Prisma.CreditWalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreditWalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreditWalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>
          }
          findFirst: {
            args: Prisma.CreditWalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreditWalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>
          }
          findMany: {
            args: Prisma.CreditWalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>[]
          }
          create: {
            args: Prisma.CreditWalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>
          }
          createMany: {
            args: Prisma.CreditWalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreditWalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>[]
          }
          delete: {
            args: Prisma.CreditWalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>
          }
          update: {
            args: Prisma.CreditWalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>
          }
          deleteMany: {
            args: Prisma.CreditWalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreditWalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreditWalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>[]
          }
          upsert: {
            args: Prisma.CreditWalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>
          }
          aggregate: {
            args: Prisma.CreditWalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreditWallet>
          }
          groupBy: {
            args: Prisma.CreditWalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreditWalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreditWalletCountArgs<ExtArgs>
            result: $Utils.Optional<CreditWalletCountAggregateOutputType> | number
          }
        }
      }
      CreditTransaction: {
        payload: Prisma.$CreditTransactionPayload<ExtArgs>
        fields: Prisma.CreditTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreditTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreditTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          findFirst: {
            args: Prisma.CreditTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreditTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          findMany: {
            args: Prisma.CreditTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>[]
          }
          create: {
            args: Prisma.CreditTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          createMany: {
            args: Prisma.CreditTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreditTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>[]
          }
          delete: {
            args: Prisma.CreditTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          update: {
            args: Prisma.CreditTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          deleteMany: {
            args: Prisma.CreditTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreditTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreditTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>[]
          }
          upsert: {
            args: Prisma.CreditTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          aggregate: {
            args: Prisma.CreditTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreditTransaction>
          }
          groupBy: {
            args: Prisma.CreditTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreditTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreditTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<CreditTransactionCountAggregateOutputType> | number
          }
        }
      }
      BurnTable: {
        payload: Prisma.$BurnTablePayload<ExtArgs>
        fields: Prisma.BurnTableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BurnTableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BurnTablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BurnTableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BurnTablePayload>
          }
          findFirst: {
            args: Prisma.BurnTableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BurnTablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BurnTableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BurnTablePayload>
          }
          findMany: {
            args: Prisma.BurnTableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BurnTablePayload>[]
          }
          create: {
            args: Prisma.BurnTableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BurnTablePayload>
          }
          createMany: {
            args: Prisma.BurnTableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BurnTableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BurnTablePayload>[]
          }
          delete: {
            args: Prisma.BurnTableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BurnTablePayload>
          }
          update: {
            args: Prisma.BurnTableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BurnTablePayload>
          }
          deleteMany: {
            args: Prisma.BurnTableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BurnTableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BurnTableUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BurnTablePayload>[]
          }
          upsert: {
            args: Prisma.BurnTableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BurnTablePayload>
          }
          aggregate: {
            args: Prisma.BurnTableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBurnTable>
          }
          groupBy: {
            args: Prisma.BurnTableGroupByArgs<ExtArgs>
            result: $Utils.Optional<BurnTableGroupByOutputType>[]
          }
          count: {
            args: Prisma.BurnTableCountArgs<ExtArgs>
            result: $Utils.Optional<BurnTableCountAggregateOutputType> | number
          }
        }
      }
      ProviderCost: {
        payload: Prisma.$ProviderCostPayload<ExtArgs>
        fields: Prisma.ProviderCostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProviderCostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderCostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProviderCostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderCostPayload>
          }
          findFirst: {
            args: Prisma.ProviderCostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderCostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProviderCostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderCostPayload>
          }
          findMany: {
            args: Prisma.ProviderCostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderCostPayload>[]
          }
          create: {
            args: Prisma.ProviderCostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderCostPayload>
          }
          createMany: {
            args: Prisma.ProviderCostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProviderCostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderCostPayload>[]
          }
          delete: {
            args: Prisma.ProviderCostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderCostPayload>
          }
          update: {
            args: Prisma.ProviderCostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderCostPayload>
          }
          deleteMany: {
            args: Prisma.ProviderCostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProviderCostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProviderCostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderCostPayload>[]
          }
          upsert: {
            args: Prisma.ProviderCostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderCostPayload>
          }
          aggregate: {
            args: Prisma.ProviderCostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProviderCost>
          }
          groupBy: {
            args: Prisma.ProviderCostGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProviderCostGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProviderCostCountArgs<ExtArgs>
            result: $Utils.Optional<ProviderCostCountAggregateOutputType> | number
          }
        }
      }
      UsageEvent: {
        payload: Prisma.$UsageEventPayload<ExtArgs>
        fields: Prisma.UsageEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsageEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsageEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageEventPayload>
          }
          findFirst: {
            args: Prisma.UsageEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsageEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageEventPayload>
          }
          findMany: {
            args: Prisma.UsageEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageEventPayload>[]
          }
          create: {
            args: Prisma.UsageEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageEventPayload>
          }
          createMany: {
            args: Prisma.UsageEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsageEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageEventPayload>[]
          }
          delete: {
            args: Prisma.UsageEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageEventPayload>
          }
          update: {
            args: Prisma.UsageEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageEventPayload>
          }
          deleteMany: {
            args: Prisma.UsageEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsageEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsageEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageEventPayload>[]
          }
          upsert: {
            args: Prisma.UsageEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageEventPayload>
          }
          aggregate: {
            args: Prisma.UsageEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsageEvent>
          }
          groupBy: {
            args: Prisma.UsageEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsageEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsageEventCountArgs<ExtArgs>
            result: $Utils.Optional<UsageEventCountAggregateOutputType> | number
          }
        }
      }
      Plan: {
        payload: Prisma.$PlanPayload<ExtArgs>
        fields: Prisma.PlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findFirst: {
            args: Prisma.PlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findMany: {
            args: Prisma.PlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          create: {
            args: Prisma.PlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          createMany: {
            args: Prisma.PlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          delete: {
            args: Prisma.PlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          update: {
            args: Prisma.PlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          deleteMany: {
            args: Prisma.PlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          upsert: {
            args: Prisma.PlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          aggregate: {
            args: Prisma.PlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlan>
          }
          groupBy: {
            args: Prisma.PlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanCountArgs<ExtArgs>
            result: $Utils.Optional<PlanCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      Entitlement: {
        payload: Prisma.$EntitlementPayload<ExtArgs>
        fields: Prisma.EntitlementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EntitlementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntitlementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EntitlementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntitlementPayload>
          }
          findFirst: {
            args: Prisma.EntitlementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntitlementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EntitlementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntitlementPayload>
          }
          findMany: {
            args: Prisma.EntitlementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntitlementPayload>[]
          }
          create: {
            args: Prisma.EntitlementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntitlementPayload>
          }
          createMany: {
            args: Prisma.EntitlementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EntitlementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntitlementPayload>[]
          }
          delete: {
            args: Prisma.EntitlementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntitlementPayload>
          }
          update: {
            args: Prisma.EntitlementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntitlementPayload>
          }
          deleteMany: {
            args: Prisma.EntitlementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EntitlementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EntitlementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntitlementPayload>[]
          }
          upsert: {
            args: Prisma.EntitlementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntitlementPayload>
          }
          aggregate: {
            args: Prisma.EntitlementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEntitlement>
          }
          groupBy: {
            args: Prisma.EntitlementGroupByArgs<ExtArgs>
            result: $Utils.Optional<EntitlementGroupByOutputType>[]
          }
          count: {
            args: Prisma.EntitlementCountArgs<ExtArgs>
            result: $Utils.Optional<EntitlementCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    customer?: CustomerOmit
    user?: UserOmit
    team?: TeamOmit
    teamMembership?: TeamMembershipOmit
    creditWallet?: CreditWalletOmit
    creditTransaction?: CreditTransactionOmit
    burnTable?: BurnTableOmit
    providerCost?: ProviderCostOmit
    usageEvent?: UsageEventOmit
    plan?: PlanOmit
    subscription?: SubscriptionOmit
    entitlement?: EntitlementOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    users: number
    teams: number
    creditWallets: number
    creditTransactions: number
    subscriptions: number
    usageEvents: number
    burnTables: number
    entitlements: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | CustomerCountOutputTypeCountUsersArgs
    teams?: boolean | CustomerCountOutputTypeCountTeamsArgs
    creditWallets?: boolean | CustomerCountOutputTypeCountCreditWalletsArgs
    creditTransactions?: boolean | CustomerCountOutputTypeCountCreditTransactionsArgs
    subscriptions?: boolean | CustomerCountOutputTypeCountSubscriptionsArgs
    usageEvents?: boolean | CustomerCountOutputTypeCountUsageEventsArgs
    burnTables?: boolean | CustomerCountOutputTypeCountBurnTablesArgs
    entitlements?: boolean | CustomerCountOutputTypeCountEntitlementsArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountCreditWalletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditWalletWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountCreditTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditTransactionWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountUsageEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageEventWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountBurnTablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BurnTableWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountEntitlementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntitlementWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    creditWallets: number
    teamMemberships: number
    entitlements: number
    usageEvents: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creditWallets?: boolean | UserCountOutputTypeCountCreditWalletsArgs
    teamMemberships?: boolean | UserCountOutputTypeCountTeamMembershipsArgs
    entitlements?: boolean | UserCountOutputTypeCountEntitlementsArgs
    usageEvents?: boolean | UserCountOutputTypeCountUsageEventsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreditWalletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditWalletWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTeamMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMembershipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEntitlementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntitlementWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUsageEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageEventWhereInput
  }


  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    creditWallets: number
    memberships: number
    usageEvents: number
  }

  export type TeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creditWallets?: boolean | TeamCountOutputTypeCountCreditWalletsArgs
    memberships?: boolean | TeamCountOutputTypeCountMembershipsArgs
    usageEvents?: boolean | TeamCountOutputTypeCountUsageEventsArgs
  }

  // Custom InputTypes
  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountCreditWalletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditWalletWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMembershipWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountUsageEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageEventWhereInput
  }


  /**
   * Count Type CreditWalletCountOutputType
   */

  export type CreditWalletCountOutputType = {
    transactions: number
  }

  export type CreditWalletCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | CreditWalletCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * CreditWalletCountOutputType without action
   */
  export type CreditWalletCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWalletCountOutputType
     */
    select?: CreditWalletCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CreditWalletCountOutputType without action
   */
  export type CreditWalletCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditTransactionWhereInput
  }


  /**
   * Count Type PlanCountOutputType
   */

  export type PlanCountOutputType = {
    subscriptions: number
  }

  export type PlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | PlanCountOutputTypeCountSubscriptionsArgs
  }

  // Custom InputTypes
  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCountOutputType
     */
    select?: PlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    apiKeyHash: string | null
    tier: $Enums.CustomerTier | null
    status: $Enums.CustomerStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    apiKeyHash: string | null
    tier: $Enums.CustomerTier | null
    status: $Enums.CustomerStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    name: number
    email: number
    apiKeyHash: number
    tier: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    apiKeyHash?: true
    tier?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    apiKeyHash?: true
    tier?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    apiKeyHash?: true
    tier?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    name: string
    email: string
    apiKeyHash: string
    tier: $Enums.CustomerTier
    status: $Enums.CustomerStatus
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    apiKeyHash?: boolean
    tier?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Customer$usersArgs<ExtArgs>
    teams?: boolean | Customer$teamsArgs<ExtArgs>
    creditWallets?: boolean | Customer$creditWalletsArgs<ExtArgs>
    creditTransactions?: boolean | Customer$creditTransactionsArgs<ExtArgs>
    subscriptions?: boolean | Customer$subscriptionsArgs<ExtArgs>
    usageEvents?: boolean | Customer$usageEventsArgs<ExtArgs>
    burnTables?: boolean | Customer$burnTablesArgs<ExtArgs>
    entitlements?: boolean | Customer$entitlementsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    apiKeyHash?: boolean
    tier?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    apiKeyHash?: boolean
    tier?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    apiKeyHash?: boolean
    tier?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "apiKeyHash" | "tier" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Customer$usersArgs<ExtArgs>
    teams?: boolean | Customer$teamsArgs<ExtArgs>
    creditWallets?: boolean | Customer$creditWalletsArgs<ExtArgs>
    creditTransactions?: boolean | Customer$creditTransactionsArgs<ExtArgs>
    subscriptions?: boolean | Customer$subscriptionsArgs<ExtArgs>
    usageEvents?: boolean | Customer$usageEventsArgs<ExtArgs>
    burnTables?: boolean | Customer$burnTablesArgs<ExtArgs>
    entitlements?: boolean | Customer$entitlementsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      teams: Prisma.$TeamPayload<ExtArgs>[]
      creditWallets: Prisma.$CreditWalletPayload<ExtArgs>[]
      creditTransactions: Prisma.$CreditTransactionPayload<ExtArgs>[]
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
      usageEvents: Prisma.$UsageEventPayload<ExtArgs>[]
      burnTables: Prisma.$BurnTablePayload<ExtArgs>[]
      entitlements: Prisma.$EntitlementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      apiKeyHash: string
      tier: $Enums.CustomerTier
      status: $Enums.CustomerStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Customer$usersArgs<ExtArgs> = {}>(args?: Subset<T, Customer$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teams<T extends Customer$teamsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$teamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    creditWallets<T extends Customer$creditWalletsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$creditWalletsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    creditTransactions<T extends Customer$creditTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$creditTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscriptions<T extends Customer$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usageEvents<T extends Customer$usageEventsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$usageEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    burnTables<T extends Customer$burnTablesArgs<ExtArgs> = {}>(args?: Subset<T, Customer$burnTablesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BurnTablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    entitlements<T extends Customer$entitlementsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$entitlementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntitlementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly apiKeyHash: FieldRef<"Customer", 'String'>
    readonly tier: FieldRef<"Customer", 'CustomerTier'>
    readonly status: FieldRef<"Customer", 'CustomerStatus'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.users
   */
  export type Customer$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Customer.teams
   */
  export type Customer$teamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    cursor?: TeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Customer.creditWallets
   */
  export type Customer$creditWalletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    where?: CreditWalletWhereInput
    orderBy?: CreditWalletOrderByWithRelationInput | CreditWalletOrderByWithRelationInput[]
    cursor?: CreditWalletWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditWalletScalarFieldEnum | CreditWalletScalarFieldEnum[]
  }

  /**
   * Customer.creditTransactions
   */
  export type Customer$creditTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    where?: CreditTransactionWhereInput
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    cursor?: CreditTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * Customer.subscriptions
   */
  export type Customer$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Customer.usageEvents
   */
  export type Customer$usageEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventInclude<ExtArgs> | null
    where?: UsageEventWhereInput
    orderBy?: UsageEventOrderByWithRelationInput | UsageEventOrderByWithRelationInput[]
    cursor?: UsageEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageEventScalarFieldEnum | UsageEventScalarFieldEnum[]
  }

  /**
   * Customer.burnTables
   */
  export type Customer$burnTablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BurnTable
     */
    select?: BurnTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BurnTable
     */
    omit?: BurnTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BurnTableInclude<ExtArgs> | null
    where?: BurnTableWhereInput
    orderBy?: BurnTableOrderByWithRelationInput | BurnTableOrderByWithRelationInput[]
    cursor?: BurnTableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BurnTableScalarFieldEnum | BurnTableScalarFieldEnum[]
  }

  /**
   * Customer.entitlements
   */
  export type Customer$entitlementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entitlement
     */
    select?: EntitlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entitlement
     */
    omit?: EntitlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntitlementInclude<ExtArgs> | null
    where?: EntitlementWhereInput
    orderBy?: EntitlementOrderByWithRelationInput | EntitlementOrderByWithRelationInput[]
    cursor?: EntitlementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntitlementScalarFieldEnum | EntitlementScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    externalUserId: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    externalUserId: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    customerId: number
    externalUserId: number
    email: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    customerId?: true
    externalUserId?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    customerId?: true
    externalUserId?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    customerId?: true
    externalUserId?: true
    email?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    customerId: string
    externalUserId: string
    email: string | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    externalUserId?: boolean
    email?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creditWallets?: boolean | User$creditWalletsArgs<ExtArgs>
    teamMemberships?: boolean | User$teamMembershipsArgs<ExtArgs>
    entitlements?: boolean | User$entitlementsArgs<ExtArgs>
    usageEvents?: boolean | User$usageEventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    externalUserId?: boolean
    email?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    externalUserId?: boolean
    email?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    customerId?: boolean
    externalUserId?: boolean
    email?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "externalUserId" | "email" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creditWallets?: boolean | User$creditWalletsArgs<ExtArgs>
    teamMemberships?: boolean | User$teamMembershipsArgs<ExtArgs>
    entitlements?: boolean | User$entitlementsArgs<ExtArgs>
    usageEvents?: boolean | User$usageEventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      creditWallets: Prisma.$CreditWalletPayload<ExtArgs>[]
      teamMemberships: Prisma.$TeamMembershipPayload<ExtArgs>[]
      entitlements: Prisma.$EntitlementPayload<ExtArgs>[]
      usageEvents: Prisma.$UsageEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      externalUserId: string
      email: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    creditWallets<T extends User$creditWalletsArgs<ExtArgs> = {}>(args?: Subset<T, User$creditWalletsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teamMemberships<T extends User$teamMembershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$teamMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    entitlements<T extends User$entitlementsArgs<ExtArgs> = {}>(args?: Subset<T, User$entitlementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntitlementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usageEvents<T extends User$usageEventsArgs<ExtArgs> = {}>(args?: Subset<T, User$usageEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly customerId: FieldRef<"User", 'String'>
    readonly externalUserId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly metadata: FieldRef<"User", 'Json'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.creditWallets
   */
  export type User$creditWalletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    where?: CreditWalletWhereInput
    orderBy?: CreditWalletOrderByWithRelationInput | CreditWalletOrderByWithRelationInput[]
    cursor?: CreditWalletWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditWalletScalarFieldEnum | CreditWalletScalarFieldEnum[]
  }

  /**
   * User.teamMemberships
   */
  export type User$teamMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    where?: TeamMembershipWhereInput
    orderBy?: TeamMembershipOrderByWithRelationInput | TeamMembershipOrderByWithRelationInput[]
    cursor?: TeamMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMembershipScalarFieldEnum | TeamMembershipScalarFieldEnum[]
  }

  /**
   * User.entitlements
   */
  export type User$entitlementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entitlement
     */
    select?: EntitlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entitlement
     */
    omit?: EntitlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntitlementInclude<ExtArgs> | null
    where?: EntitlementWhereInput
    orderBy?: EntitlementOrderByWithRelationInput | EntitlementOrderByWithRelationInput[]
    cursor?: EntitlementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntitlementScalarFieldEnum | EntitlementScalarFieldEnum[]
  }

  /**
   * User.usageEvents
   */
  export type User$usageEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventInclude<ExtArgs> | null
    where?: UsageEventWhereInput
    orderBy?: UsageEventOrderByWithRelationInput | UsageEventOrderByWithRelationInput[]
    cursor?: UsageEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageEventScalarFieldEnum | UsageEventScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamCountAggregateOutputType = {
    id: number
    customerId: number
    name: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeamMinAggregateInputType = {
    id?: true
    customerId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamMaxAggregateInputType = {
    id?: true
    customerId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamCountAggregateInputType = {
    id?: true
    customerId?: true
    name?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithAggregationInput | TeamOrderByWithAggregationInput[]
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }

  export type TeamGroupByOutputType = {
    id: string
    customerId: string
    name: string
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    name?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creditWallets?: boolean | Team$creditWalletsArgs<ExtArgs>
    memberships?: boolean | Team$membershipsArgs<ExtArgs>
    usageEvents?: boolean | Team$usageEventsArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    name?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    name?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectScalar = {
    id?: boolean
    customerId?: boolean
    name?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "name" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["team"]>
  export type TeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creditWallets?: boolean | Team$creditWalletsArgs<ExtArgs>
    memberships?: boolean | Team$membershipsArgs<ExtArgs>
    usageEvents?: boolean | Team$usageEventsArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type TeamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $TeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Team"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      creditWallets: Prisma.$CreditWalletPayload<ExtArgs>[]
      memberships: Prisma.$TeamMembershipPayload<ExtArgs>[]
      usageEvents: Prisma.$UsageEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      name: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["team"]>
    composites: {}
  }

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = $Result.GetResult<Prisma.$TeamPayload, S>

  type TeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Team'], meta: { name: 'Team' } }
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamFindUniqueArgs>(args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Team that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamFindFirstArgs>(args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamFindManyArgs>(args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
     */
    create<T extends TeamCreateArgs>(args: SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teams.
     * @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamCreateManyArgs>(args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teams and returns the data saved in the database.
     * @param {TeamCreateManyAndReturnArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
     */
    delete<T extends TeamDeleteArgs>(args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamUpdateArgs>(args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamDeleteManyArgs>(args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamUpdateManyArgs>(args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams and returns the data updated in the database.
     * @param {TeamUpdateManyAndReturnArgs} args - Arguments to update many Teams.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     */
    upsert<T extends TeamUpsertArgs>(args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Team model
   */
  readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    creditWallets<T extends Team$creditWalletsArgs<ExtArgs> = {}>(args?: Subset<T, Team$creditWalletsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    memberships<T extends Team$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, Team$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usageEvents<T extends Team$usageEventsArgs<ExtArgs> = {}>(args?: Subset<T, Team$usageEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Team model
   */
  interface TeamFieldRefs {
    readonly id: FieldRef<"Team", 'String'>
    readonly customerId: FieldRef<"Team", 'String'>
    readonly name: FieldRef<"Team", 'String'>
    readonly metadata: FieldRef<"Team", 'Json'>
    readonly createdAt: FieldRef<"Team", 'DateTime'>
    readonly updatedAt: FieldRef<"Team", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team create
   */
  export type TeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team createManyAndReturn
   */
  export type TeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team update
   */
  export type TeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
  }

  /**
   * Team updateManyAndReturn
   */
  export type TeamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }

  /**
   * Team delete
   */
  export type TeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to delete.
     */
    limit?: number
  }

  /**
   * Team.creditWallets
   */
  export type Team$creditWalletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    where?: CreditWalletWhereInput
    orderBy?: CreditWalletOrderByWithRelationInput | CreditWalletOrderByWithRelationInput[]
    cursor?: CreditWalletWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditWalletScalarFieldEnum | CreditWalletScalarFieldEnum[]
  }

  /**
   * Team.memberships
   */
  export type Team$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    where?: TeamMembershipWhereInput
    orderBy?: TeamMembershipOrderByWithRelationInput | TeamMembershipOrderByWithRelationInput[]
    cursor?: TeamMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMembershipScalarFieldEnum | TeamMembershipScalarFieldEnum[]
  }

  /**
   * Team.usageEvents
   */
  export type Team$usageEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventInclude<ExtArgs> | null
    where?: UsageEventWhereInput
    orderBy?: UsageEventOrderByWithRelationInput | UsageEventOrderByWithRelationInput[]
    cursor?: UsageEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageEventScalarFieldEnum | UsageEventScalarFieldEnum[]
  }

  /**
   * Team without action
   */
  export type TeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
  }


  /**
   * Model TeamMembership
   */

  export type AggregateTeamMembership = {
    _count: TeamMembershipCountAggregateOutputType | null
    _min: TeamMembershipMinAggregateOutputType | null
    _max: TeamMembershipMaxAggregateOutputType | null
  }

  export type TeamMembershipMinAggregateOutputType = {
    id: string | null
    teamId: string | null
    userId: string | null
    role: $Enums.TeamRole | null
    createdAt: Date | null
  }

  export type TeamMembershipMaxAggregateOutputType = {
    id: string | null
    teamId: string | null
    userId: string | null
    role: $Enums.TeamRole | null
    createdAt: Date | null
  }

  export type TeamMembershipCountAggregateOutputType = {
    id: number
    teamId: number
    userId: number
    role: number
    createdAt: number
    _all: number
  }


  export type TeamMembershipMinAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    createdAt?: true
  }

  export type TeamMembershipMaxAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    createdAt?: true
  }

  export type TeamMembershipCountAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type TeamMembershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMembership to aggregate.
     */
    where?: TeamMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMemberships to fetch.
     */
    orderBy?: TeamMembershipOrderByWithRelationInput | TeamMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamMemberships
    **/
    _count?: true | TeamMembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMembershipMaxAggregateInputType
  }

  export type GetTeamMembershipAggregateType<T extends TeamMembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamMembership[P]>
      : GetScalarType<T[P], AggregateTeamMembership[P]>
  }




  export type TeamMembershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMembershipWhereInput
    orderBy?: TeamMembershipOrderByWithAggregationInput | TeamMembershipOrderByWithAggregationInput[]
    by: TeamMembershipScalarFieldEnum[] | TeamMembershipScalarFieldEnum
    having?: TeamMembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamMembershipCountAggregateInputType | true
    _min?: TeamMembershipMinAggregateInputType
    _max?: TeamMembershipMaxAggregateInputType
  }

  export type TeamMembershipGroupByOutputType = {
    id: string
    teamId: string
    userId: string
    role: $Enums.TeamRole
    createdAt: Date
    _count: TeamMembershipCountAggregateOutputType | null
    _min: TeamMembershipMinAggregateOutputType | null
    _max: TeamMembershipMaxAggregateOutputType | null
  }

  type GetTeamMembershipGroupByPayload<T extends TeamMembershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamMembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamMembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamMembershipGroupByOutputType[P]>
            : GetScalarType<T[P], TeamMembershipGroupByOutputType[P]>
        }
      >
    >


  export type TeamMembershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMembership"]>

  export type TeamMembershipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMembership"]>

  export type TeamMembershipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMembership"]>

  export type TeamMembershipSelectScalar = {
    id?: boolean
    teamId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type TeamMembershipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teamId" | "userId" | "role" | "createdAt", ExtArgs["result"]["teamMembership"]>
  export type TeamMembershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TeamMembershipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TeamMembershipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TeamMembershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamMembership"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teamId: string
      userId: string
      role: $Enums.TeamRole
      createdAt: Date
    }, ExtArgs["result"]["teamMembership"]>
    composites: {}
  }

  type TeamMembershipGetPayload<S extends boolean | null | undefined | TeamMembershipDefaultArgs> = $Result.GetResult<Prisma.$TeamMembershipPayload, S>

  type TeamMembershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamMembershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamMembershipCountAggregateInputType | true
    }

  export interface TeamMembershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamMembership'], meta: { name: 'TeamMembership' } }
    /**
     * Find zero or one TeamMembership that matches the filter.
     * @param {TeamMembershipFindUniqueArgs} args - Arguments to find a TeamMembership
     * @example
     * // Get one TeamMembership
     * const teamMembership = await prisma.teamMembership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamMembershipFindUniqueArgs>(args: SelectSubset<T, TeamMembershipFindUniqueArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TeamMembership that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamMembershipFindUniqueOrThrowArgs} args - Arguments to find a TeamMembership
     * @example
     * // Get one TeamMembership
     * const teamMembership = await prisma.teamMembership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamMembershipFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamMembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMembership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMembershipFindFirstArgs} args - Arguments to find a TeamMembership
     * @example
     * // Get one TeamMembership
     * const teamMembership = await prisma.teamMembership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamMembershipFindFirstArgs>(args?: SelectSubset<T, TeamMembershipFindFirstArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMembership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMembershipFindFirstOrThrowArgs} args - Arguments to find a TeamMembership
     * @example
     * // Get one TeamMembership
     * const teamMembership = await prisma.teamMembership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamMembershipFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamMembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TeamMemberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMembershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamMemberships
     * const teamMemberships = await prisma.teamMembership.findMany()
     * 
     * // Get first 10 TeamMemberships
     * const teamMemberships = await prisma.teamMembership.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamMembershipWithIdOnly = await prisma.teamMembership.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamMembershipFindManyArgs>(args?: SelectSubset<T, TeamMembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TeamMembership.
     * @param {TeamMembershipCreateArgs} args - Arguments to create a TeamMembership.
     * @example
     * // Create one TeamMembership
     * const TeamMembership = await prisma.teamMembership.create({
     *   data: {
     *     // ... data to create a TeamMembership
     *   }
     * })
     * 
     */
    create<T extends TeamMembershipCreateArgs>(args: SelectSubset<T, TeamMembershipCreateArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TeamMemberships.
     * @param {TeamMembershipCreateManyArgs} args - Arguments to create many TeamMemberships.
     * @example
     * // Create many TeamMemberships
     * const teamMembership = await prisma.teamMembership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamMembershipCreateManyArgs>(args?: SelectSubset<T, TeamMembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TeamMemberships and returns the data saved in the database.
     * @param {TeamMembershipCreateManyAndReturnArgs} args - Arguments to create many TeamMemberships.
     * @example
     * // Create many TeamMemberships
     * const teamMembership = await prisma.teamMembership.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TeamMemberships and only return the `id`
     * const teamMembershipWithIdOnly = await prisma.teamMembership.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamMembershipCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamMembershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TeamMembership.
     * @param {TeamMembershipDeleteArgs} args - Arguments to delete one TeamMembership.
     * @example
     * // Delete one TeamMembership
     * const TeamMembership = await prisma.teamMembership.delete({
     *   where: {
     *     // ... filter to delete one TeamMembership
     *   }
     * })
     * 
     */
    delete<T extends TeamMembershipDeleteArgs>(args: SelectSubset<T, TeamMembershipDeleteArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TeamMembership.
     * @param {TeamMembershipUpdateArgs} args - Arguments to update one TeamMembership.
     * @example
     * // Update one TeamMembership
     * const teamMembership = await prisma.teamMembership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamMembershipUpdateArgs>(args: SelectSubset<T, TeamMembershipUpdateArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TeamMemberships.
     * @param {TeamMembershipDeleteManyArgs} args - Arguments to filter TeamMemberships to delete.
     * @example
     * // Delete a few TeamMemberships
     * const { count } = await prisma.teamMembership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamMembershipDeleteManyArgs>(args?: SelectSubset<T, TeamMembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamMemberships
     * const teamMembership = await prisma.teamMembership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamMembershipUpdateManyArgs>(args: SelectSubset<T, TeamMembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMemberships and returns the data updated in the database.
     * @param {TeamMembershipUpdateManyAndReturnArgs} args - Arguments to update many TeamMemberships.
     * @example
     * // Update many TeamMemberships
     * const teamMembership = await prisma.teamMembership.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TeamMemberships and only return the `id`
     * const teamMembershipWithIdOnly = await prisma.teamMembership.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamMembershipUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamMembershipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TeamMembership.
     * @param {TeamMembershipUpsertArgs} args - Arguments to update or create a TeamMembership.
     * @example
     * // Update or create a TeamMembership
     * const teamMembership = await prisma.teamMembership.upsert({
     *   create: {
     *     // ... data to create a TeamMembership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamMembership we want to update
     *   }
     * })
     */
    upsert<T extends TeamMembershipUpsertArgs>(args: SelectSubset<T, TeamMembershipUpsertArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TeamMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMembershipCountArgs} args - Arguments to filter TeamMemberships to count.
     * @example
     * // Count the number of TeamMemberships
     * const count = await prisma.teamMembership.count({
     *   where: {
     *     // ... the filter for the TeamMemberships we want to count
     *   }
     * })
    **/
    count<T extends TeamMembershipCountArgs>(
      args?: Subset<T, TeamMembershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamMembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamMembershipAggregateArgs>(args: Subset<T, TeamMembershipAggregateArgs>): Prisma.PrismaPromise<GetTeamMembershipAggregateType<T>>

    /**
     * Group by TeamMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMembershipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamMembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamMembershipGroupByArgs['orderBy'] }
        : { orderBy?: TeamMembershipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamMembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamMembership model
   */
  readonly fields: TeamMembershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamMembership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamMembershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeamMembership model
   */
  interface TeamMembershipFieldRefs {
    readonly id: FieldRef<"TeamMembership", 'String'>
    readonly teamId: FieldRef<"TeamMembership", 'String'>
    readonly userId: FieldRef<"TeamMembership", 'String'>
    readonly role: FieldRef<"TeamMembership", 'TeamRole'>
    readonly createdAt: FieldRef<"TeamMembership", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TeamMembership findUnique
   */
  export type TeamMembershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * Filter, which TeamMembership to fetch.
     */
    where: TeamMembershipWhereUniqueInput
  }

  /**
   * TeamMembership findUniqueOrThrow
   */
  export type TeamMembershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * Filter, which TeamMembership to fetch.
     */
    where: TeamMembershipWhereUniqueInput
  }

  /**
   * TeamMembership findFirst
   */
  export type TeamMembershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * Filter, which TeamMembership to fetch.
     */
    where?: TeamMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMemberships to fetch.
     */
    orderBy?: TeamMembershipOrderByWithRelationInput | TeamMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMemberships.
     */
    cursor?: TeamMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMemberships.
     */
    distinct?: TeamMembershipScalarFieldEnum | TeamMembershipScalarFieldEnum[]
  }

  /**
   * TeamMembership findFirstOrThrow
   */
  export type TeamMembershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * Filter, which TeamMembership to fetch.
     */
    where?: TeamMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMemberships to fetch.
     */
    orderBy?: TeamMembershipOrderByWithRelationInput | TeamMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMemberships.
     */
    cursor?: TeamMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMemberships.
     */
    distinct?: TeamMembershipScalarFieldEnum | TeamMembershipScalarFieldEnum[]
  }

  /**
   * TeamMembership findMany
   */
  export type TeamMembershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * Filter, which TeamMemberships to fetch.
     */
    where?: TeamMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMemberships to fetch.
     */
    orderBy?: TeamMembershipOrderByWithRelationInput | TeamMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamMemberships.
     */
    cursor?: TeamMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMemberships.
     */
    skip?: number
    distinct?: TeamMembershipScalarFieldEnum | TeamMembershipScalarFieldEnum[]
  }

  /**
   * TeamMembership create
   */
  export type TeamMembershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * The data needed to create a TeamMembership.
     */
    data: XOR<TeamMembershipCreateInput, TeamMembershipUncheckedCreateInput>
  }

  /**
   * TeamMembership createMany
   */
  export type TeamMembershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamMemberships.
     */
    data: TeamMembershipCreateManyInput | TeamMembershipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamMembership createManyAndReturn
   */
  export type TeamMembershipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * The data used to create many TeamMemberships.
     */
    data: TeamMembershipCreateManyInput | TeamMembershipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeamMembership update
   */
  export type TeamMembershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * The data needed to update a TeamMembership.
     */
    data: XOR<TeamMembershipUpdateInput, TeamMembershipUncheckedUpdateInput>
    /**
     * Choose, which TeamMembership to update.
     */
    where: TeamMembershipWhereUniqueInput
  }

  /**
   * TeamMembership updateMany
   */
  export type TeamMembershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamMemberships.
     */
    data: XOR<TeamMembershipUpdateManyMutationInput, TeamMembershipUncheckedUpdateManyInput>
    /**
     * Filter which TeamMemberships to update
     */
    where?: TeamMembershipWhereInput
    /**
     * Limit how many TeamMemberships to update.
     */
    limit?: number
  }

  /**
   * TeamMembership updateManyAndReturn
   */
  export type TeamMembershipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * The data used to update TeamMemberships.
     */
    data: XOR<TeamMembershipUpdateManyMutationInput, TeamMembershipUncheckedUpdateManyInput>
    /**
     * Filter which TeamMemberships to update
     */
    where?: TeamMembershipWhereInput
    /**
     * Limit how many TeamMemberships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeamMembership upsert
   */
  export type TeamMembershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * The filter to search for the TeamMembership to update in case it exists.
     */
    where: TeamMembershipWhereUniqueInput
    /**
     * In case the TeamMembership found by the `where` argument doesn't exist, create a new TeamMembership with this data.
     */
    create: XOR<TeamMembershipCreateInput, TeamMembershipUncheckedCreateInput>
    /**
     * In case the TeamMembership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamMembershipUpdateInput, TeamMembershipUncheckedUpdateInput>
  }

  /**
   * TeamMembership delete
   */
  export type TeamMembershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * Filter which TeamMembership to delete.
     */
    where: TeamMembershipWhereUniqueInput
  }

  /**
   * TeamMembership deleteMany
   */
  export type TeamMembershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMemberships to delete
     */
    where?: TeamMembershipWhereInput
    /**
     * Limit how many TeamMemberships to delete.
     */
    limit?: number
  }

  /**
   * TeamMembership without action
   */
  export type TeamMembershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
  }


  /**
   * Model CreditWallet
   */

  export type AggregateCreditWallet = {
    _count: CreditWalletCountAggregateOutputType | null
    _avg: CreditWalletAvgAggregateOutputType | null
    _sum: CreditWalletSumAggregateOutputType | null
    _min: CreditWalletMinAggregateOutputType | null
    _max: CreditWalletMaxAggregateOutputType | null
  }

  export type CreditWalletAvgAggregateOutputType = {
    balance: number | null
    reservedBalance: number | null
  }

  export type CreditWalletSumAggregateOutputType = {
    balance: bigint | null
    reservedBalance: bigint | null
  }

  export type CreditWalletMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    userId: string | null
    teamId: string | null
    balance: bigint | null
    reservedBalance: bigint | null
    currency: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreditWalletMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    userId: string | null
    teamId: string | null
    balance: bigint | null
    reservedBalance: bigint | null
    currency: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreditWalletCountAggregateOutputType = {
    id: number
    customerId: number
    userId: number
    teamId: number
    balance: number
    reservedBalance: number
    currency: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CreditWalletAvgAggregateInputType = {
    balance?: true
    reservedBalance?: true
  }

  export type CreditWalletSumAggregateInputType = {
    balance?: true
    reservedBalance?: true
  }

  export type CreditWalletMinAggregateInputType = {
    id?: true
    customerId?: true
    userId?: true
    teamId?: true
    balance?: true
    reservedBalance?: true
    currency?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreditWalletMaxAggregateInputType = {
    id?: true
    customerId?: true
    userId?: true
    teamId?: true
    balance?: true
    reservedBalance?: true
    currency?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreditWalletCountAggregateInputType = {
    id?: true
    customerId?: true
    userId?: true
    teamId?: true
    balance?: true
    reservedBalance?: true
    currency?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CreditWalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditWallet to aggregate.
     */
    where?: CreditWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditWallets to fetch.
     */
    orderBy?: CreditWalletOrderByWithRelationInput | CreditWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreditWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreditWallets
    **/
    _count?: true | CreditWalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreditWalletAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreditWalletSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreditWalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreditWalletMaxAggregateInputType
  }

  export type GetCreditWalletAggregateType<T extends CreditWalletAggregateArgs> = {
        [P in keyof T & keyof AggregateCreditWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreditWallet[P]>
      : GetScalarType<T[P], AggregateCreditWallet[P]>
  }




  export type CreditWalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditWalletWhereInput
    orderBy?: CreditWalletOrderByWithAggregationInput | CreditWalletOrderByWithAggregationInput[]
    by: CreditWalletScalarFieldEnum[] | CreditWalletScalarFieldEnum
    having?: CreditWalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreditWalletCountAggregateInputType | true
    _avg?: CreditWalletAvgAggregateInputType
    _sum?: CreditWalletSumAggregateInputType
    _min?: CreditWalletMinAggregateInputType
    _max?: CreditWalletMaxAggregateInputType
  }

  export type CreditWalletGroupByOutputType = {
    id: string
    customerId: string
    userId: string | null
    teamId: string | null
    balance: bigint
    reservedBalance: bigint
    currency: string
    expiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: CreditWalletCountAggregateOutputType | null
    _avg: CreditWalletAvgAggregateOutputType | null
    _sum: CreditWalletSumAggregateOutputType | null
    _min: CreditWalletMinAggregateOutputType | null
    _max: CreditWalletMaxAggregateOutputType | null
  }

  type GetCreditWalletGroupByPayload<T extends CreditWalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreditWalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreditWalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreditWalletGroupByOutputType[P]>
            : GetScalarType<T[P], CreditWalletGroupByOutputType[P]>
        }
      >
    >


  export type CreditWalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    userId?: boolean
    teamId?: boolean
    balance?: boolean
    reservedBalance?: boolean
    currency?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | CreditWallet$userArgs<ExtArgs>
    team?: boolean | CreditWallet$teamArgs<ExtArgs>
    transactions?: boolean | CreditWallet$transactionsArgs<ExtArgs>
    _count?: boolean | CreditWalletCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditWallet"]>

  export type CreditWalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    userId?: boolean
    teamId?: boolean
    balance?: boolean
    reservedBalance?: boolean
    currency?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | CreditWallet$userArgs<ExtArgs>
    team?: boolean | CreditWallet$teamArgs<ExtArgs>
  }, ExtArgs["result"]["creditWallet"]>

  export type CreditWalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    userId?: boolean
    teamId?: boolean
    balance?: boolean
    reservedBalance?: boolean
    currency?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | CreditWallet$userArgs<ExtArgs>
    team?: boolean | CreditWallet$teamArgs<ExtArgs>
  }, ExtArgs["result"]["creditWallet"]>

  export type CreditWalletSelectScalar = {
    id?: boolean
    customerId?: boolean
    userId?: boolean
    teamId?: boolean
    balance?: boolean
    reservedBalance?: boolean
    currency?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CreditWalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "userId" | "teamId" | "balance" | "reservedBalance" | "currency" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["creditWallet"]>
  export type CreditWalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | CreditWallet$userArgs<ExtArgs>
    team?: boolean | CreditWallet$teamArgs<ExtArgs>
    transactions?: boolean | CreditWallet$transactionsArgs<ExtArgs>
    _count?: boolean | CreditWalletCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CreditWalletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | CreditWallet$userArgs<ExtArgs>
    team?: boolean | CreditWallet$teamArgs<ExtArgs>
  }
  export type CreditWalletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | CreditWallet$userArgs<ExtArgs>
    team?: boolean | CreditWallet$teamArgs<ExtArgs>
  }

  export type $CreditWalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreditWallet"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
      team: Prisma.$TeamPayload<ExtArgs> | null
      transactions: Prisma.$CreditTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      userId: string | null
      teamId: string | null
      balance: bigint
      reservedBalance: bigint
      currency: string
      expiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["creditWallet"]>
    composites: {}
  }

  type CreditWalletGetPayload<S extends boolean | null | undefined | CreditWalletDefaultArgs> = $Result.GetResult<Prisma.$CreditWalletPayload, S>

  type CreditWalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreditWalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreditWalletCountAggregateInputType | true
    }

  export interface CreditWalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreditWallet'], meta: { name: 'CreditWallet' } }
    /**
     * Find zero or one CreditWallet that matches the filter.
     * @param {CreditWalletFindUniqueArgs} args - Arguments to find a CreditWallet
     * @example
     * // Get one CreditWallet
     * const creditWallet = await prisma.creditWallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreditWalletFindUniqueArgs>(args: SelectSubset<T, CreditWalletFindUniqueArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreditWallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreditWalletFindUniqueOrThrowArgs} args - Arguments to find a CreditWallet
     * @example
     * // Get one CreditWallet
     * const creditWallet = await prisma.creditWallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreditWalletFindUniqueOrThrowArgs>(args: SelectSubset<T, CreditWalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditWallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditWalletFindFirstArgs} args - Arguments to find a CreditWallet
     * @example
     * // Get one CreditWallet
     * const creditWallet = await prisma.creditWallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreditWalletFindFirstArgs>(args?: SelectSubset<T, CreditWalletFindFirstArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditWallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditWalletFindFirstOrThrowArgs} args - Arguments to find a CreditWallet
     * @example
     * // Get one CreditWallet
     * const creditWallet = await prisma.creditWallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreditWalletFindFirstOrThrowArgs>(args?: SelectSubset<T, CreditWalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreditWallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditWalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreditWallets
     * const creditWallets = await prisma.creditWallet.findMany()
     * 
     * // Get first 10 CreditWallets
     * const creditWallets = await prisma.creditWallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creditWalletWithIdOnly = await prisma.creditWallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreditWalletFindManyArgs>(args?: SelectSubset<T, CreditWalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreditWallet.
     * @param {CreditWalletCreateArgs} args - Arguments to create a CreditWallet.
     * @example
     * // Create one CreditWallet
     * const CreditWallet = await prisma.creditWallet.create({
     *   data: {
     *     // ... data to create a CreditWallet
     *   }
     * })
     * 
     */
    create<T extends CreditWalletCreateArgs>(args: SelectSubset<T, CreditWalletCreateArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreditWallets.
     * @param {CreditWalletCreateManyArgs} args - Arguments to create many CreditWallets.
     * @example
     * // Create many CreditWallets
     * const creditWallet = await prisma.creditWallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreditWalletCreateManyArgs>(args?: SelectSubset<T, CreditWalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreditWallets and returns the data saved in the database.
     * @param {CreditWalletCreateManyAndReturnArgs} args - Arguments to create many CreditWallets.
     * @example
     * // Create many CreditWallets
     * const creditWallet = await prisma.creditWallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreditWallets and only return the `id`
     * const creditWalletWithIdOnly = await prisma.creditWallet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreditWalletCreateManyAndReturnArgs>(args?: SelectSubset<T, CreditWalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreditWallet.
     * @param {CreditWalletDeleteArgs} args - Arguments to delete one CreditWallet.
     * @example
     * // Delete one CreditWallet
     * const CreditWallet = await prisma.creditWallet.delete({
     *   where: {
     *     // ... filter to delete one CreditWallet
     *   }
     * })
     * 
     */
    delete<T extends CreditWalletDeleteArgs>(args: SelectSubset<T, CreditWalletDeleteArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreditWallet.
     * @param {CreditWalletUpdateArgs} args - Arguments to update one CreditWallet.
     * @example
     * // Update one CreditWallet
     * const creditWallet = await prisma.creditWallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreditWalletUpdateArgs>(args: SelectSubset<T, CreditWalletUpdateArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreditWallets.
     * @param {CreditWalletDeleteManyArgs} args - Arguments to filter CreditWallets to delete.
     * @example
     * // Delete a few CreditWallets
     * const { count } = await prisma.creditWallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreditWalletDeleteManyArgs>(args?: SelectSubset<T, CreditWalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditWallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditWalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreditWallets
     * const creditWallet = await prisma.creditWallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreditWalletUpdateManyArgs>(args: SelectSubset<T, CreditWalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditWallets and returns the data updated in the database.
     * @param {CreditWalletUpdateManyAndReturnArgs} args - Arguments to update many CreditWallets.
     * @example
     * // Update many CreditWallets
     * const creditWallet = await prisma.creditWallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreditWallets and only return the `id`
     * const creditWalletWithIdOnly = await prisma.creditWallet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CreditWalletUpdateManyAndReturnArgs>(args: SelectSubset<T, CreditWalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreditWallet.
     * @param {CreditWalletUpsertArgs} args - Arguments to update or create a CreditWallet.
     * @example
     * // Update or create a CreditWallet
     * const creditWallet = await prisma.creditWallet.upsert({
     *   create: {
     *     // ... data to create a CreditWallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreditWallet we want to update
     *   }
     * })
     */
    upsert<T extends CreditWalletUpsertArgs>(args: SelectSubset<T, CreditWalletUpsertArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreditWallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditWalletCountArgs} args - Arguments to filter CreditWallets to count.
     * @example
     * // Count the number of CreditWallets
     * const count = await prisma.creditWallet.count({
     *   where: {
     *     // ... the filter for the CreditWallets we want to count
     *   }
     * })
    **/
    count<T extends CreditWalletCountArgs>(
      args?: Subset<T, CreditWalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreditWalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreditWallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditWalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreditWalletAggregateArgs>(args: Subset<T, CreditWalletAggregateArgs>): Prisma.PrismaPromise<GetCreditWalletAggregateType<T>>

    /**
     * Group by CreditWallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditWalletGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CreditWalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreditWalletGroupByArgs['orderBy'] }
        : { orderBy?: CreditWalletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CreditWalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreditWallet model
   */
  readonly fields: CreditWalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreditWallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreditWalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends CreditWallet$userArgs<ExtArgs> = {}>(args?: Subset<T, CreditWallet$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    team<T extends CreditWallet$teamArgs<ExtArgs> = {}>(args?: Subset<T, CreditWallet$teamArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    transactions<T extends CreditWallet$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, CreditWallet$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CreditWallet model
   */
  interface CreditWalletFieldRefs {
    readonly id: FieldRef<"CreditWallet", 'String'>
    readonly customerId: FieldRef<"CreditWallet", 'String'>
    readonly userId: FieldRef<"CreditWallet", 'String'>
    readonly teamId: FieldRef<"CreditWallet", 'String'>
    readonly balance: FieldRef<"CreditWallet", 'BigInt'>
    readonly reservedBalance: FieldRef<"CreditWallet", 'BigInt'>
    readonly currency: FieldRef<"CreditWallet", 'String'>
    readonly expiresAt: FieldRef<"CreditWallet", 'DateTime'>
    readonly createdAt: FieldRef<"CreditWallet", 'DateTime'>
    readonly updatedAt: FieldRef<"CreditWallet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreditWallet findUnique
   */
  export type CreditWalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * Filter, which CreditWallet to fetch.
     */
    where: CreditWalletWhereUniqueInput
  }

  /**
   * CreditWallet findUniqueOrThrow
   */
  export type CreditWalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * Filter, which CreditWallet to fetch.
     */
    where: CreditWalletWhereUniqueInput
  }

  /**
   * CreditWallet findFirst
   */
  export type CreditWalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * Filter, which CreditWallet to fetch.
     */
    where?: CreditWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditWallets to fetch.
     */
    orderBy?: CreditWalletOrderByWithRelationInput | CreditWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditWallets.
     */
    cursor?: CreditWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditWallets.
     */
    distinct?: CreditWalletScalarFieldEnum | CreditWalletScalarFieldEnum[]
  }

  /**
   * CreditWallet findFirstOrThrow
   */
  export type CreditWalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * Filter, which CreditWallet to fetch.
     */
    where?: CreditWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditWallets to fetch.
     */
    orderBy?: CreditWalletOrderByWithRelationInput | CreditWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditWallets.
     */
    cursor?: CreditWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditWallets.
     */
    distinct?: CreditWalletScalarFieldEnum | CreditWalletScalarFieldEnum[]
  }

  /**
   * CreditWallet findMany
   */
  export type CreditWalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * Filter, which CreditWallets to fetch.
     */
    where?: CreditWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditWallets to fetch.
     */
    orderBy?: CreditWalletOrderByWithRelationInput | CreditWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreditWallets.
     */
    cursor?: CreditWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditWallets.
     */
    skip?: number
    distinct?: CreditWalletScalarFieldEnum | CreditWalletScalarFieldEnum[]
  }

  /**
   * CreditWallet create
   */
  export type CreditWalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * The data needed to create a CreditWallet.
     */
    data: XOR<CreditWalletCreateInput, CreditWalletUncheckedCreateInput>
  }

  /**
   * CreditWallet createMany
   */
  export type CreditWalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreditWallets.
     */
    data: CreditWalletCreateManyInput | CreditWalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreditWallet createManyAndReturn
   */
  export type CreditWalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * The data used to create many CreditWallets.
     */
    data: CreditWalletCreateManyInput | CreditWalletCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditWallet update
   */
  export type CreditWalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * The data needed to update a CreditWallet.
     */
    data: XOR<CreditWalletUpdateInput, CreditWalletUncheckedUpdateInput>
    /**
     * Choose, which CreditWallet to update.
     */
    where: CreditWalletWhereUniqueInput
  }

  /**
   * CreditWallet updateMany
   */
  export type CreditWalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreditWallets.
     */
    data: XOR<CreditWalletUpdateManyMutationInput, CreditWalletUncheckedUpdateManyInput>
    /**
     * Filter which CreditWallets to update
     */
    where?: CreditWalletWhereInput
    /**
     * Limit how many CreditWallets to update.
     */
    limit?: number
  }

  /**
   * CreditWallet updateManyAndReturn
   */
  export type CreditWalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * The data used to update CreditWallets.
     */
    data: XOR<CreditWalletUpdateManyMutationInput, CreditWalletUncheckedUpdateManyInput>
    /**
     * Filter which CreditWallets to update
     */
    where?: CreditWalletWhereInput
    /**
     * Limit how many CreditWallets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditWallet upsert
   */
  export type CreditWalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * The filter to search for the CreditWallet to update in case it exists.
     */
    where: CreditWalletWhereUniqueInput
    /**
     * In case the CreditWallet found by the `where` argument doesn't exist, create a new CreditWallet with this data.
     */
    create: XOR<CreditWalletCreateInput, CreditWalletUncheckedCreateInput>
    /**
     * In case the CreditWallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreditWalletUpdateInput, CreditWalletUncheckedUpdateInput>
  }

  /**
   * CreditWallet delete
   */
  export type CreditWalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * Filter which CreditWallet to delete.
     */
    where: CreditWalletWhereUniqueInput
  }

  /**
   * CreditWallet deleteMany
   */
  export type CreditWalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditWallets to delete
     */
    where?: CreditWalletWhereInput
    /**
     * Limit how many CreditWallets to delete.
     */
    limit?: number
  }

  /**
   * CreditWallet.user
   */
  export type CreditWallet$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * CreditWallet.team
   */
  export type CreditWallet$teamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
  }

  /**
   * CreditWallet.transactions
   */
  export type CreditWallet$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    where?: CreditTransactionWhereInput
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    cursor?: CreditTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * CreditWallet without action
   */
  export type CreditWalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
  }


  /**
   * Model CreditTransaction
   */

  export type AggregateCreditTransaction = {
    _count: CreditTransactionCountAggregateOutputType | null
    _avg: CreditTransactionAvgAggregateOutputType | null
    _sum: CreditTransactionSumAggregateOutputType | null
    _min: CreditTransactionMinAggregateOutputType | null
    _max: CreditTransactionMaxAggregateOutputType | null
  }

  export type CreditTransactionAvgAggregateOutputType = {
    amount: number | null
    balanceBefore: number | null
    balanceAfter: number | null
  }

  export type CreditTransactionSumAggregateOutputType = {
    amount: bigint | null
    balanceBefore: bigint | null
    balanceAfter: bigint | null
  }

  export type CreditTransactionMinAggregateOutputType = {
    id: string | null
    walletId: string | null
    customerId: string | null
    transactionType: $Enums.TransactionType | null
    amount: bigint | null
    balanceBefore: bigint | null
    balanceAfter: bigint | null
    description: string | null
    idempotencyKey: string | null
    createdAt: Date | null
  }

  export type CreditTransactionMaxAggregateOutputType = {
    id: string | null
    walletId: string | null
    customerId: string | null
    transactionType: $Enums.TransactionType | null
    amount: bigint | null
    balanceBefore: bigint | null
    balanceAfter: bigint | null
    description: string | null
    idempotencyKey: string | null
    createdAt: Date | null
  }

  export type CreditTransactionCountAggregateOutputType = {
    id: number
    walletId: number
    customerId: number
    transactionType: number
    amount: number
    balanceBefore: number
    balanceAfter: number
    description: number
    metadata: number
    idempotencyKey: number
    createdAt: number
    _all: number
  }


  export type CreditTransactionAvgAggregateInputType = {
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
  }

  export type CreditTransactionSumAggregateInputType = {
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
  }

  export type CreditTransactionMinAggregateInputType = {
    id?: true
    walletId?: true
    customerId?: true
    transactionType?: true
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
    description?: true
    idempotencyKey?: true
    createdAt?: true
  }

  export type CreditTransactionMaxAggregateInputType = {
    id?: true
    walletId?: true
    customerId?: true
    transactionType?: true
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
    description?: true
    idempotencyKey?: true
    createdAt?: true
  }

  export type CreditTransactionCountAggregateInputType = {
    id?: true
    walletId?: true
    customerId?: true
    transactionType?: true
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
    description?: true
    metadata?: true
    idempotencyKey?: true
    createdAt?: true
    _all?: true
  }

  export type CreditTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditTransaction to aggregate.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreditTransactions
    **/
    _count?: true | CreditTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreditTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreditTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreditTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreditTransactionMaxAggregateInputType
  }

  export type GetCreditTransactionAggregateType<T extends CreditTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateCreditTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreditTransaction[P]>
      : GetScalarType<T[P], AggregateCreditTransaction[P]>
  }




  export type CreditTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditTransactionWhereInput
    orderBy?: CreditTransactionOrderByWithAggregationInput | CreditTransactionOrderByWithAggregationInput[]
    by: CreditTransactionScalarFieldEnum[] | CreditTransactionScalarFieldEnum
    having?: CreditTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreditTransactionCountAggregateInputType | true
    _avg?: CreditTransactionAvgAggregateInputType
    _sum?: CreditTransactionSumAggregateInputType
    _min?: CreditTransactionMinAggregateInputType
    _max?: CreditTransactionMaxAggregateInputType
  }

  export type CreditTransactionGroupByOutputType = {
    id: string
    walletId: string
    customerId: string
    transactionType: $Enums.TransactionType
    amount: bigint
    balanceBefore: bigint
    balanceAfter: bigint
    description: string | null
    metadata: JsonValue | null
    idempotencyKey: string | null
    createdAt: Date
    _count: CreditTransactionCountAggregateOutputType | null
    _avg: CreditTransactionAvgAggregateOutputType | null
    _sum: CreditTransactionSumAggregateOutputType | null
    _min: CreditTransactionMinAggregateOutputType | null
    _max: CreditTransactionMaxAggregateOutputType | null
  }

  type GetCreditTransactionGroupByPayload<T extends CreditTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreditTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreditTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreditTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], CreditTransactionGroupByOutputType[P]>
        }
      >
    >


  export type CreditTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    customerId?: boolean
    transactionType?: boolean
    amount?: boolean
    balanceBefore?: boolean
    balanceAfter?: boolean
    description?: boolean
    metadata?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditTransaction"]>

  export type CreditTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    customerId?: boolean
    transactionType?: boolean
    amount?: boolean
    balanceBefore?: boolean
    balanceAfter?: boolean
    description?: boolean
    metadata?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditTransaction"]>

  export type CreditTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    customerId?: boolean
    transactionType?: boolean
    amount?: boolean
    balanceBefore?: boolean
    balanceAfter?: boolean
    description?: boolean
    metadata?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditTransaction"]>

  export type CreditTransactionSelectScalar = {
    id?: boolean
    walletId?: boolean
    customerId?: boolean
    transactionType?: boolean
    amount?: boolean
    balanceBefore?: boolean
    balanceAfter?: boolean
    description?: boolean
    metadata?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
  }

  export type CreditTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletId" | "customerId" | "transactionType" | "amount" | "balanceBefore" | "balanceAfter" | "description" | "metadata" | "idempotencyKey" | "createdAt", ExtArgs["result"]["creditTransaction"]>
  export type CreditTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type CreditTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type CreditTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $CreditTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreditTransaction"
    objects: {
      wallet: Prisma.$CreditWalletPayload<ExtArgs>
      customer: Prisma.$CustomerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletId: string
      customerId: string
      transactionType: $Enums.TransactionType
      amount: bigint
      balanceBefore: bigint
      balanceAfter: bigint
      description: string | null
      metadata: Prisma.JsonValue | null
      idempotencyKey: string | null
      createdAt: Date
    }, ExtArgs["result"]["creditTransaction"]>
    composites: {}
  }

  type CreditTransactionGetPayload<S extends boolean | null | undefined | CreditTransactionDefaultArgs> = $Result.GetResult<Prisma.$CreditTransactionPayload, S>

  type CreditTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreditTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreditTransactionCountAggregateInputType | true
    }

  export interface CreditTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreditTransaction'], meta: { name: 'CreditTransaction' } }
    /**
     * Find zero or one CreditTransaction that matches the filter.
     * @param {CreditTransactionFindUniqueArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreditTransactionFindUniqueArgs>(args: SelectSubset<T, CreditTransactionFindUniqueArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreditTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreditTransactionFindUniqueOrThrowArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreditTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, CreditTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionFindFirstArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreditTransactionFindFirstArgs>(args?: SelectSubset<T, CreditTransactionFindFirstArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionFindFirstOrThrowArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreditTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, CreditTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreditTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreditTransactions
     * const creditTransactions = await prisma.creditTransaction.findMany()
     * 
     * // Get first 10 CreditTransactions
     * const creditTransactions = await prisma.creditTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creditTransactionWithIdOnly = await prisma.creditTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreditTransactionFindManyArgs>(args?: SelectSubset<T, CreditTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreditTransaction.
     * @param {CreditTransactionCreateArgs} args - Arguments to create a CreditTransaction.
     * @example
     * // Create one CreditTransaction
     * const CreditTransaction = await prisma.creditTransaction.create({
     *   data: {
     *     // ... data to create a CreditTransaction
     *   }
     * })
     * 
     */
    create<T extends CreditTransactionCreateArgs>(args: SelectSubset<T, CreditTransactionCreateArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreditTransactions.
     * @param {CreditTransactionCreateManyArgs} args - Arguments to create many CreditTransactions.
     * @example
     * // Create many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreditTransactionCreateManyArgs>(args?: SelectSubset<T, CreditTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreditTransactions and returns the data saved in the database.
     * @param {CreditTransactionCreateManyAndReturnArgs} args - Arguments to create many CreditTransactions.
     * @example
     * // Create many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreditTransactions and only return the `id`
     * const creditTransactionWithIdOnly = await prisma.creditTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreditTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, CreditTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreditTransaction.
     * @param {CreditTransactionDeleteArgs} args - Arguments to delete one CreditTransaction.
     * @example
     * // Delete one CreditTransaction
     * const CreditTransaction = await prisma.creditTransaction.delete({
     *   where: {
     *     // ... filter to delete one CreditTransaction
     *   }
     * })
     * 
     */
    delete<T extends CreditTransactionDeleteArgs>(args: SelectSubset<T, CreditTransactionDeleteArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreditTransaction.
     * @param {CreditTransactionUpdateArgs} args - Arguments to update one CreditTransaction.
     * @example
     * // Update one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreditTransactionUpdateArgs>(args: SelectSubset<T, CreditTransactionUpdateArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreditTransactions.
     * @param {CreditTransactionDeleteManyArgs} args - Arguments to filter CreditTransactions to delete.
     * @example
     * // Delete a few CreditTransactions
     * const { count } = await prisma.creditTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreditTransactionDeleteManyArgs>(args?: SelectSubset<T, CreditTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreditTransactionUpdateManyArgs>(args: SelectSubset<T, CreditTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditTransactions and returns the data updated in the database.
     * @param {CreditTransactionUpdateManyAndReturnArgs} args - Arguments to update many CreditTransactions.
     * @example
     * // Update many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreditTransactions and only return the `id`
     * const creditTransactionWithIdOnly = await prisma.creditTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CreditTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, CreditTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreditTransaction.
     * @param {CreditTransactionUpsertArgs} args - Arguments to update or create a CreditTransaction.
     * @example
     * // Update or create a CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.upsert({
     *   create: {
     *     // ... data to create a CreditTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreditTransaction we want to update
     *   }
     * })
     */
    upsert<T extends CreditTransactionUpsertArgs>(args: SelectSubset<T, CreditTransactionUpsertArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreditTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionCountArgs} args - Arguments to filter CreditTransactions to count.
     * @example
     * // Count the number of CreditTransactions
     * const count = await prisma.creditTransaction.count({
     *   where: {
     *     // ... the filter for the CreditTransactions we want to count
     *   }
     * })
    **/
    count<T extends CreditTransactionCountArgs>(
      args?: Subset<T, CreditTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreditTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreditTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreditTransactionAggregateArgs>(args: Subset<T, CreditTransactionAggregateArgs>): Prisma.PrismaPromise<GetCreditTransactionAggregateType<T>>

    /**
     * Group by CreditTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CreditTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreditTransactionGroupByArgs['orderBy'] }
        : { orderBy?: CreditTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CreditTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreditTransaction model
   */
  readonly fields: CreditTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreditTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreditTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallet<T extends CreditWalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CreditWalletDefaultArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CreditTransaction model
   */
  interface CreditTransactionFieldRefs {
    readonly id: FieldRef<"CreditTransaction", 'String'>
    readonly walletId: FieldRef<"CreditTransaction", 'String'>
    readonly customerId: FieldRef<"CreditTransaction", 'String'>
    readonly transactionType: FieldRef<"CreditTransaction", 'TransactionType'>
    readonly amount: FieldRef<"CreditTransaction", 'BigInt'>
    readonly balanceBefore: FieldRef<"CreditTransaction", 'BigInt'>
    readonly balanceAfter: FieldRef<"CreditTransaction", 'BigInt'>
    readonly description: FieldRef<"CreditTransaction", 'String'>
    readonly metadata: FieldRef<"CreditTransaction", 'Json'>
    readonly idempotencyKey: FieldRef<"CreditTransaction", 'String'>
    readonly createdAt: FieldRef<"CreditTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreditTransaction findUnique
   */
  export type CreditTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction findUniqueOrThrow
   */
  export type CreditTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction findFirst
   */
  export type CreditTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditTransactions.
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditTransactions.
     */
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * CreditTransaction findFirstOrThrow
   */
  export type CreditTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditTransactions.
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditTransactions.
     */
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * CreditTransaction findMany
   */
  export type CreditTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransactions to fetch.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreditTransactions.
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * CreditTransaction create
   */
  export type CreditTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a CreditTransaction.
     */
    data: XOR<CreditTransactionCreateInput, CreditTransactionUncheckedCreateInput>
  }

  /**
   * CreditTransaction createMany
   */
  export type CreditTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreditTransactions.
     */
    data: CreditTransactionCreateManyInput | CreditTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreditTransaction createManyAndReturn
   */
  export type CreditTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many CreditTransactions.
     */
    data: CreditTransactionCreateManyInput | CreditTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditTransaction update
   */
  export type CreditTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a CreditTransaction.
     */
    data: XOR<CreditTransactionUpdateInput, CreditTransactionUncheckedUpdateInput>
    /**
     * Choose, which CreditTransaction to update.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction updateMany
   */
  export type CreditTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreditTransactions.
     */
    data: XOR<CreditTransactionUpdateManyMutationInput, CreditTransactionUncheckedUpdateManyInput>
    /**
     * Filter which CreditTransactions to update
     */
    where?: CreditTransactionWhereInput
    /**
     * Limit how many CreditTransactions to update.
     */
    limit?: number
  }

  /**
   * CreditTransaction updateManyAndReturn
   */
  export type CreditTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * The data used to update CreditTransactions.
     */
    data: XOR<CreditTransactionUpdateManyMutationInput, CreditTransactionUncheckedUpdateManyInput>
    /**
     * Filter which CreditTransactions to update
     */
    where?: CreditTransactionWhereInput
    /**
     * Limit how many CreditTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditTransaction upsert
   */
  export type CreditTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the CreditTransaction to update in case it exists.
     */
    where: CreditTransactionWhereUniqueInput
    /**
     * In case the CreditTransaction found by the `where` argument doesn't exist, create a new CreditTransaction with this data.
     */
    create: XOR<CreditTransactionCreateInput, CreditTransactionUncheckedCreateInput>
    /**
     * In case the CreditTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreditTransactionUpdateInput, CreditTransactionUncheckedUpdateInput>
  }

  /**
   * CreditTransaction delete
   */
  export type CreditTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter which CreditTransaction to delete.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction deleteMany
   */
  export type CreditTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditTransactions to delete
     */
    where?: CreditTransactionWhereInput
    /**
     * Limit how many CreditTransactions to delete.
     */
    limit?: number
  }

  /**
   * CreditTransaction without action
   */
  export type CreditTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
  }


  /**
   * Model BurnTable
   */

  export type AggregateBurnTable = {
    _count: BurnTableCountAggregateOutputType | null
    _avg: BurnTableAvgAggregateOutputType | null
    _sum: BurnTableSumAggregateOutputType | null
    _min: BurnTableMinAggregateOutputType | null
    _max: BurnTableMaxAggregateOutputType | null
  }

  export type BurnTableAvgAggregateOutputType = {
    version: number | null
  }

  export type BurnTableSumAggregateOutputType = {
    version: number | null
  }

  export type BurnTableMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    name: string | null
    version: number | null
    isActive: boolean | null
    validFrom: Date | null
    validUntil: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BurnTableMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    name: string | null
    version: number | null
    isActive: boolean | null
    validFrom: Date | null
    validUntil: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BurnTableCountAggregateOutputType = {
    id: number
    customerId: number
    name: number
    version: number
    rules: number
    isActive: number
    validFrom: number
    validUntil: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BurnTableAvgAggregateInputType = {
    version?: true
  }

  export type BurnTableSumAggregateInputType = {
    version?: true
  }

  export type BurnTableMinAggregateInputType = {
    id?: true
    customerId?: true
    name?: true
    version?: true
    isActive?: true
    validFrom?: true
    validUntil?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BurnTableMaxAggregateInputType = {
    id?: true
    customerId?: true
    name?: true
    version?: true
    isActive?: true
    validFrom?: true
    validUntil?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BurnTableCountAggregateInputType = {
    id?: true
    customerId?: true
    name?: true
    version?: true
    rules?: true
    isActive?: true
    validFrom?: true
    validUntil?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BurnTableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BurnTable to aggregate.
     */
    where?: BurnTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BurnTables to fetch.
     */
    orderBy?: BurnTableOrderByWithRelationInput | BurnTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BurnTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BurnTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BurnTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BurnTables
    **/
    _count?: true | BurnTableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BurnTableAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BurnTableSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BurnTableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BurnTableMaxAggregateInputType
  }

  export type GetBurnTableAggregateType<T extends BurnTableAggregateArgs> = {
        [P in keyof T & keyof AggregateBurnTable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBurnTable[P]>
      : GetScalarType<T[P], AggregateBurnTable[P]>
  }




  export type BurnTableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BurnTableWhereInput
    orderBy?: BurnTableOrderByWithAggregationInput | BurnTableOrderByWithAggregationInput[]
    by: BurnTableScalarFieldEnum[] | BurnTableScalarFieldEnum
    having?: BurnTableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BurnTableCountAggregateInputType | true
    _avg?: BurnTableAvgAggregateInputType
    _sum?: BurnTableSumAggregateInputType
    _min?: BurnTableMinAggregateInputType
    _max?: BurnTableMaxAggregateInputType
  }

  export type BurnTableGroupByOutputType = {
    id: string
    customerId: string | null
    name: string
    version: number
    rules: JsonValue
    isActive: boolean
    validFrom: Date
    validUntil: Date | null
    createdAt: Date
    updatedAt: Date
    _count: BurnTableCountAggregateOutputType | null
    _avg: BurnTableAvgAggregateOutputType | null
    _sum: BurnTableSumAggregateOutputType | null
    _min: BurnTableMinAggregateOutputType | null
    _max: BurnTableMaxAggregateOutputType | null
  }

  type GetBurnTableGroupByPayload<T extends BurnTableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BurnTableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BurnTableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BurnTableGroupByOutputType[P]>
            : GetScalarType<T[P], BurnTableGroupByOutputType[P]>
        }
      >
    >


  export type BurnTableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    name?: boolean
    version?: boolean
    rules?: boolean
    isActive?: boolean
    validFrom?: boolean
    validUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | BurnTable$customerArgs<ExtArgs>
  }, ExtArgs["result"]["burnTable"]>

  export type BurnTableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    name?: boolean
    version?: boolean
    rules?: boolean
    isActive?: boolean
    validFrom?: boolean
    validUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | BurnTable$customerArgs<ExtArgs>
  }, ExtArgs["result"]["burnTable"]>

  export type BurnTableSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    name?: boolean
    version?: boolean
    rules?: boolean
    isActive?: boolean
    validFrom?: boolean
    validUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | BurnTable$customerArgs<ExtArgs>
  }, ExtArgs["result"]["burnTable"]>

  export type BurnTableSelectScalar = {
    id?: boolean
    customerId?: boolean
    name?: boolean
    version?: boolean
    rules?: boolean
    isActive?: boolean
    validFrom?: boolean
    validUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BurnTableOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "name" | "version" | "rules" | "isActive" | "validFrom" | "validUntil" | "createdAt" | "updatedAt", ExtArgs["result"]["burnTable"]>
  export type BurnTableInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | BurnTable$customerArgs<ExtArgs>
  }
  export type BurnTableIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | BurnTable$customerArgs<ExtArgs>
  }
  export type BurnTableIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | BurnTable$customerArgs<ExtArgs>
  }

  export type $BurnTablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BurnTable"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string | null
      name: string
      version: number
      rules: Prisma.JsonValue
      isActive: boolean
      validFrom: Date
      validUntil: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["burnTable"]>
    composites: {}
  }

  type BurnTableGetPayload<S extends boolean | null | undefined | BurnTableDefaultArgs> = $Result.GetResult<Prisma.$BurnTablePayload, S>

  type BurnTableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BurnTableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BurnTableCountAggregateInputType | true
    }

  export interface BurnTableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BurnTable'], meta: { name: 'BurnTable' } }
    /**
     * Find zero or one BurnTable that matches the filter.
     * @param {BurnTableFindUniqueArgs} args - Arguments to find a BurnTable
     * @example
     * // Get one BurnTable
     * const burnTable = await prisma.burnTable.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BurnTableFindUniqueArgs>(args: SelectSubset<T, BurnTableFindUniqueArgs<ExtArgs>>): Prisma__BurnTableClient<$Result.GetResult<Prisma.$BurnTablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BurnTable that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BurnTableFindUniqueOrThrowArgs} args - Arguments to find a BurnTable
     * @example
     * // Get one BurnTable
     * const burnTable = await prisma.burnTable.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BurnTableFindUniqueOrThrowArgs>(args: SelectSubset<T, BurnTableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BurnTableClient<$Result.GetResult<Prisma.$BurnTablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BurnTable that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BurnTableFindFirstArgs} args - Arguments to find a BurnTable
     * @example
     * // Get one BurnTable
     * const burnTable = await prisma.burnTable.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BurnTableFindFirstArgs>(args?: SelectSubset<T, BurnTableFindFirstArgs<ExtArgs>>): Prisma__BurnTableClient<$Result.GetResult<Prisma.$BurnTablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BurnTable that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BurnTableFindFirstOrThrowArgs} args - Arguments to find a BurnTable
     * @example
     * // Get one BurnTable
     * const burnTable = await prisma.burnTable.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BurnTableFindFirstOrThrowArgs>(args?: SelectSubset<T, BurnTableFindFirstOrThrowArgs<ExtArgs>>): Prisma__BurnTableClient<$Result.GetResult<Prisma.$BurnTablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BurnTables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BurnTableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BurnTables
     * const burnTables = await prisma.burnTable.findMany()
     * 
     * // Get first 10 BurnTables
     * const burnTables = await prisma.burnTable.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const burnTableWithIdOnly = await prisma.burnTable.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BurnTableFindManyArgs>(args?: SelectSubset<T, BurnTableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BurnTablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BurnTable.
     * @param {BurnTableCreateArgs} args - Arguments to create a BurnTable.
     * @example
     * // Create one BurnTable
     * const BurnTable = await prisma.burnTable.create({
     *   data: {
     *     // ... data to create a BurnTable
     *   }
     * })
     * 
     */
    create<T extends BurnTableCreateArgs>(args: SelectSubset<T, BurnTableCreateArgs<ExtArgs>>): Prisma__BurnTableClient<$Result.GetResult<Prisma.$BurnTablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BurnTables.
     * @param {BurnTableCreateManyArgs} args - Arguments to create many BurnTables.
     * @example
     * // Create many BurnTables
     * const burnTable = await prisma.burnTable.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BurnTableCreateManyArgs>(args?: SelectSubset<T, BurnTableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BurnTables and returns the data saved in the database.
     * @param {BurnTableCreateManyAndReturnArgs} args - Arguments to create many BurnTables.
     * @example
     * // Create many BurnTables
     * const burnTable = await prisma.burnTable.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BurnTables and only return the `id`
     * const burnTableWithIdOnly = await prisma.burnTable.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BurnTableCreateManyAndReturnArgs>(args?: SelectSubset<T, BurnTableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BurnTablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BurnTable.
     * @param {BurnTableDeleteArgs} args - Arguments to delete one BurnTable.
     * @example
     * // Delete one BurnTable
     * const BurnTable = await prisma.burnTable.delete({
     *   where: {
     *     // ... filter to delete one BurnTable
     *   }
     * })
     * 
     */
    delete<T extends BurnTableDeleteArgs>(args: SelectSubset<T, BurnTableDeleteArgs<ExtArgs>>): Prisma__BurnTableClient<$Result.GetResult<Prisma.$BurnTablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BurnTable.
     * @param {BurnTableUpdateArgs} args - Arguments to update one BurnTable.
     * @example
     * // Update one BurnTable
     * const burnTable = await prisma.burnTable.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BurnTableUpdateArgs>(args: SelectSubset<T, BurnTableUpdateArgs<ExtArgs>>): Prisma__BurnTableClient<$Result.GetResult<Prisma.$BurnTablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BurnTables.
     * @param {BurnTableDeleteManyArgs} args - Arguments to filter BurnTables to delete.
     * @example
     * // Delete a few BurnTables
     * const { count } = await prisma.burnTable.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BurnTableDeleteManyArgs>(args?: SelectSubset<T, BurnTableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BurnTables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BurnTableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BurnTables
     * const burnTable = await prisma.burnTable.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BurnTableUpdateManyArgs>(args: SelectSubset<T, BurnTableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BurnTables and returns the data updated in the database.
     * @param {BurnTableUpdateManyAndReturnArgs} args - Arguments to update many BurnTables.
     * @example
     * // Update many BurnTables
     * const burnTable = await prisma.burnTable.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BurnTables and only return the `id`
     * const burnTableWithIdOnly = await prisma.burnTable.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BurnTableUpdateManyAndReturnArgs>(args: SelectSubset<T, BurnTableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BurnTablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BurnTable.
     * @param {BurnTableUpsertArgs} args - Arguments to update or create a BurnTable.
     * @example
     * // Update or create a BurnTable
     * const burnTable = await prisma.burnTable.upsert({
     *   create: {
     *     // ... data to create a BurnTable
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BurnTable we want to update
     *   }
     * })
     */
    upsert<T extends BurnTableUpsertArgs>(args: SelectSubset<T, BurnTableUpsertArgs<ExtArgs>>): Prisma__BurnTableClient<$Result.GetResult<Prisma.$BurnTablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BurnTables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BurnTableCountArgs} args - Arguments to filter BurnTables to count.
     * @example
     * // Count the number of BurnTables
     * const count = await prisma.burnTable.count({
     *   where: {
     *     // ... the filter for the BurnTables we want to count
     *   }
     * })
    **/
    count<T extends BurnTableCountArgs>(
      args?: Subset<T, BurnTableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BurnTableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BurnTable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BurnTableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BurnTableAggregateArgs>(args: Subset<T, BurnTableAggregateArgs>): Prisma.PrismaPromise<GetBurnTableAggregateType<T>>

    /**
     * Group by BurnTable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BurnTableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BurnTableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BurnTableGroupByArgs['orderBy'] }
        : { orderBy?: BurnTableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BurnTableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBurnTableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BurnTable model
   */
  readonly fields: BurnTableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BurnTable.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BurnTableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends BurnTable$customerArgs<ExtArgs> = {}>(args?: Subset<T, BurnTable$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BurnTable model
   */
  interface BurnTableFieldRefs {
    readonly id: FieldRef<"BurnTable", 'String'>
    readonly customerId: FieldRef<"BurnTable", 'String'>
    readonly name: FieldRef<"BurnTable", 'String'>
    readonly version: FieldRef<"BurnTable", 'Int'>
    readonly rules: FieldRef<"BurnTable", 'Json'>
    readonly isActive: FieldRef<"BurnTable", 'Boolean'>
    readonly validFrom: FieldRef<"BurnTable", 'DateTime'>
    readonly validUntil: FieldRef<"BurnTable", 'DateTime'>
    readonly createdAt: FieldRef<"BurnTable", 'DateTime'>
    readonly updatedAt: FieldRef<"BurnTable", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BurnTable findUnique
   */
  export type BurnTableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BurnTable
     */
    select?: BurnTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BurnTable
     */
    omit?: BurnTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BurnTableInclude<ExtArgs> | null
    /**
     * Filter, which BurnTable to fetch.
     */
    where: BurnTableWhereUniqueInput
  }

  /**
   * BurnTable findUniqueOrThrow
   */
  export type BurnTableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BurnTable
     */
    select?: BurnTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BurnTable
     */
    omit?: BurnTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BurnTableInclude<ExtArgs> | null
    /**
     * Filter, which BurnTable to fetch.
     */
    where: BurnTableWhereUniqueInput
  }

  /**
   * BurnTable findFirst
   */
  export type BurnTableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BurnTable
     */
    select?: BurnTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BurnTable
     */
    omit?: BurnTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BurnTableInclude<ExtArgs> | null
    /**
     * Filter, which BurnTable to fetch.
     */
    where?: BurnTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BurnTables to fetch.
     */
    orderBy?: BurnTableOrderByWithRelationInput | BurnTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BurnTables.
     */
    cursor?: BurnTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BurnTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BurnTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BurnTables.
     */
    distinct?: BurnTableScalarFieldEnum | BurnTableScalarFieldEnum[]
  }

  /**
   * BurnTable findFirstOrThrow
   */
  export type BurnTableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BurnTable
     */
    select?: BurnTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BurnTable
     */
    omit?: BurnTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BurnTableInclude<ExtArgs> | null
    /**
     * Filter, which BurnTable to fetch.
     */
    where?: BurnTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BurnTables to fetch.
     */
    orderBy?: BurnTableOrderByWithRelationInput | BurnTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BurnTables.
     */
    cursor?: BurnTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BurnTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BurnTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BurnTables.
     */
    distinct?: BurnTableScalarFieldEnum | BurnTableScalarFieldEnum[]
  }

  /**
   * BurnTable findMany
   */
  export type BurnTableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BurnTable
     */
    select?: BurnTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BurnTable
     */
    omit?: BurnTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BurnTableInclude<ExtArgs> | null
    /**
     * Filter, which BurnTables to fetch.
     */
    where?: BurnTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BurnTables to fetch.
     */
    orderBy?: BurnTableOrderByWithRelationInput | BurnTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BurnTables.
     */
    cursor?: BurnTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BurnTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BurnTables.
     */
    skip?: number
    distinct?: BurnTableScalarFieldEnum | BurnTableScalarFieldEnum[]
  }

  /**
   * BurnTable create
   */
  export type BurnTableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BurnTable
     */
    select?: BurnTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BurnTable
     */
    omit?: BurnTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BurnTableInclude<ExtArgs> | null
    /**
     * The data needed to create a BurnTable.
     */
    data: XOR<BurnTableCreateInput, BurnTableUncheckedCreateInput>
  }

  /**
   * BurnTable createMany
   */
  export type BurnTableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BurnTables.
     */
    data: BurnTableCreateManyInput | BurnTableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BurnTable createManyAndReturn
   */
  export type BurnTableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BurnTable
     */
    select?: BurnTableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BurnTable
     */
    omit?: BurnTableOmit<ExtArgs> | null
    /**
     * The data used to create many BurnTables.
     */
    data: BurnTableCreateManyInput | BurnTableCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BurnTableIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BurnTable update
   */
  export type BurnTableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BurnTable
     */
    select?: BurnTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BurnTable
     */
    omit?: BurnTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BurnTableInclude<ExtArgs> | null
    /**
     * The data needed to update a BurnTable.
     */
    data: XOR<BurnTableUpdateInput, BurnTableUncheckedUpdateInput>
    /**
     * Choose, which BurnTable to update.
     */
    where: BurnTableWhereUniqueInput
  }

  /**
   * BurnTable updateMany
   */
  export type BurnTableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BurnTables.
     */
    data: XOR<BurnTableUpdateManyMutationInput, BurnTableUncheckedUpdateManyInput>
    /**
     * Filter which BurnTables to update
     */
    where?: BurnTableWhereInput
    /**
     * Limit how many BurnTables to update.
     */
    limit?: number
  }

  /**
   * BurnTable updateManyAndReturn
   */
  export type BurnTableUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BurnTable
     */
    select?: BurnTableSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BurnTable
     */
    omit?: BurnTableOmit<ExtArgs> | null
    /**
     * The data used to update BurnTables.
     */
    data: XOR<BurnTableUpdateManyMutationInput, BurnTableUncheckedUpdateManyInput>
    /**
     * Filter which BurnTables to update
     */
    where?: BurnTableWhereInput
    /**
     * Limit how many BurnTables to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BurnTableIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BurnTable upsert
   */
  export type BurnTableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BurnTable
     */
    select?: BurnTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BurnTable
     */
    omit?: BurnTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BurnTableInclude<ExtArgs> | null
    /**
     * The filter to search for the BurnTable to update in case it exists.
     */
    where: BurnTableWhereUniqueInput
    /**
     * In case the BurnTable found by the `where` argument doesn't exist, create a new BurnTable with this data.
     */
    create: XOR<BurnTableCreateInput, BurnTableUncheckedCreateInput>
    /**
     * In case the BurnTable was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BurnTableUpdateInput, BurnTableUncheckedUpdateInput>
  }

  /**
   * BurnTable delete
   */
  export type BurnTableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BurnTable
     */
    select?: BurnTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BurnTable
     */
    omit?: BurnTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BurnTableInclude<ExtArgs> | null
    /**
     * Filter which BurnTable to delete.
     */
    where: BurnTableWhereUniqueInput
  }

  /**
   * BurnTable deleteMany
   */
  export type BurnTableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BurnTables to delete
     */
    where?: BurnTableWhereInput
    /**
     * Limit how many BurnTables to delete.
     */
    limit?: number
  }

  /**
   * BurnTable.customer
   */
  export type BurnTable$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * BurnTable without action
   */
  export type BurnTableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BurnTable
     */
    select?: BurnTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BurnTable
     */
    omit?: BurnTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BurnTableInclude<ExtArgs> | null
  }


  /**
   * Model ProviderCost
   */

  export type AggregateProviderCost = {
    _count: ProviderCostCountAggregateOutputType | null
    _avg: ProviderCostAvgAggregateOutputType | null
    _sum: ProviderCostSumAggregateOutputType | null
    _min: ProviderCostMinAggregateOutputType | null
    _max: ProviderCostMaxAggregateOutputType | null
  }

  export type ProviderCostAvgAggregateOutputType = {
    costPerUnit: Decimal | null
    unitSize: number | null
  }

  export type ProviderCostSumAggregateOutputType = {
    costPerUnit: Decimal | null
    unitSize: number | null
  }

  export type ProviderCostMinAggregateOutputType = {
    id: string | null
    provider: $Enums.ProviderName | null
    model: string | null
    costType: $Enums.CostType | null
    costPerUnit: Decimal | null
    unitSize: number | null
    currency: string | null
    validFrom: Date | null
    validUntil: Date | null
    createdAt: Date | null
  }

  export type ProviderCostMaxAggregateOutputType = {
    id: string | null
    provider: $Enums.ProviderName | null
    model: string | null
    costType: $Enums.CostType | null
    costPerUnit: Decimal | null
    unitSize: number | null
    currency: string | null
    validFrom: Date | null
    validUntil: Date | null
    createdAt: Date | null
  }

  export type ProviderCostCountAggregateOutputType = {
    id: number
    provider: number
    model: number
    costType: number
    costPerUnit: number
    unitSize: number
    currency: number
    validFrom: number
    validUntil: number
    createdAt: number
    _all: number
  }


  export type ProviderCostAvgAggregateInputType = {
    costPerUnit?: true
    unitSize?: true
  }

  export type ProviderCostSumAggregateInputType = {
    costPerUnit?: true
    unitSize?: true
  }

  export type ProviderCostMinAggregateInputType = {
    id?: true
    provider?: true
    model?: true
    costType?: true
    costPerUnit?: true
    unitSize?: true
    currency?: true
    validFrom?: true
    validUntil?: true
    createdAt?: true
  }

  export type ProviderCostMaxAggregateInputType = {
    id?: true
    provider?: true
    model?: true
    costType?: true
    costPerUnit?: true
    unitSize?: true
    currency?: true
    validFrom?: true
    validUntil?: true
    createdAt?: true
  }

  export type ProviderCostCountAggregateInputType = {
    id?: true
    provider?: true
    model?: true
    costType?: true
    costPerUnit?: true
    unitSize?: true
    currency?: true
    validFrom?: true
    validUntil?: true
    createdAt?: true
    _all?: true
  }

  export type ProviderCostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProviderCost to aggregate.
     */
    where?: ProviderCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProviderCosts to fetch.
     */
    orderBy?: ProviderCostOrderByWithRelationInput | ProviderCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProviderCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProviderCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProviderCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProviderCosts
    **/
    _count?: true | ProviderCostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProviderCostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProviderCostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProviderCostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProviderCostMaxAggregateInputType
  }

  export type GetProviderCostAggregateType<T extends ProviderCostAggregateArgs> = {
        [P in keyof T & keyof AggregateProviderCost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProviderCost[P]>
      : GetScalarType<T[P], AggregateProviderCost[P]>
  }




  export type ProviderCostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProviderCostWhereInput
    orderBy?: ProviderCostOrderByWithAggregationInput | ProviderCostOrderByWithAggregationInput[]
    by: ProviderCostScalarFieldEnum[] | ProviderCostScalarFieldEnum
    having?: ProviderCostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProviderCostCountAggregateInputType | true
    _avg?: ProviderCostAvgAggregateInputType
    _sum?: ProviderCostSumAggregateInputType
    _min?: ProviderCostMinAggregateInputType
    _max?: ProviderCostMaxAggregateInputType
  }

  export type ProviderCostGroupByOutputType = {
    id: string
    provider: $Enums.ProviderName
    model: string
    costType: $Enums.CostType
    costPerUnit: Decimal
    unitSize: number
    currency: string
    validFrom: Date
    validUntil: Date | null
    createdAt: Date
    _count: ProviderCostCountAggregateOutputType | null
    _avg: ProviderCostAvgAggregateOutputType | null
    _sum: ProviderCostSumAggregateOutputType | null
    _min: ProviderCostMinAggregateOutputType | null
    _max: ProviderCostMaxAggregateOutputType | null
  }

  type GetProviderCostGroupByPayload<T extends ProviderCostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProviderCostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProviderCostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProviderCostGroupByOutputType[P]>
            : GetScalarType<T[P], ProviderCostGroupByOutputType[P]>
        }
      >
    >


  export type ProviderCostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    model?: boolean
    costType?: boolean
    costPerUnit?: boolean
    unitSize?: boolean
    currency?: boolean
    validFrom?: boolean
    validUntil?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["providerCost"]>

  export type ProviderCostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    model?: boolean
    costType?: boolean
    costPerUnit?: boolean
    unitSize?: boolean
    currency?: boolean
    validFrom?: boolean
    validUntil?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["providerCost"]>

  export type ProviderCostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    model?: boolean
    costType?: boolean
    costPerUnit?: boolean
    unitSize?: boolean
    currency?: boolean
    validFrom?: boolean
    validUntil?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["providerCost"]>

  export type ProviderCostSelectScalar = {
    id?: boolean
    provider?: boolean
    model?: boolean
    costType?: boolean
    costPerUnit?: boolean
    unitSize?: boolean
    currency?: boolean
    validFrom?: boolean
    validUntil?: boolean
    createdAt?: boolean
  }

  export type ProviderCostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "model" | "costType" | "costPerUnit" | "unitSize" | "currency" | "validFrom" | "validUntil" | "createdAt", ExtArgs["result"]["providerCost"]>

  export type $ProviderCostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProviderCost"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: $Enums.ProviderName
      model: string
      costType: $Enums.CostType
      costPerUnit: Prisma.Decimal
      unitSize: number
      currency: string
      validFrom: Date
      validUntil: Date | null
      createdAt: Date
    }, ExtArgs["result"]["providerCost"]>
    composites: {}
  }

  type ProviderCostGetPayload<S extends boolean | null | undefined | ProviderCostDefaultArgs> = $Result.GetResult<Prisma.$ProviderCostPayload, S>

  type ProviderCostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProviderCostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProviderCostCountAggregateInputType | true
    }

  export interface ProviderCostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProviderCost'], meta: { name: 'ProviderCost' } }
    /**
     * Find zero or one ProviderCost that matches the filter.
     * @param {ProviderCostFindUniqueArgs} args - Arguments to find a ProviderCost
     * @example
     * // Get one ProviderCost
     * const providerCost = await prisma.providerCost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProviderCostFindUniqueArgs>(args: SelectSubset<T, ProviderCostFindUniqueArgs<ExtArgs>>): Prisma__ProviderCostClient<$Result.GetResult<Prisma.$ProviderCostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProviderCost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProviderCostFindUniqueOrThrowArgs} args - Arguments to find a ProviderCost
     * @example
     * // Get one ProviderCost
     * const providerCost = await prisma.providerCost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProviderCostFindUniqueOrThrowArgs>(args: SelectSubset<T, ProviderCostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProviderCostClient<$Result.GetResult<Prisma.$ProviderCostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProviderCost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderCostFindFirstArgs} args - Arguments to find a ProviderCost
     * @example
     * // Get one ProviderCost
     * const providerCost = await prisma.providerCost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProviderCostFindFirstArgs>(args?: SelectSubset<T, ProviderCostFindFirstArgs<ExtArgs>>): Prisma__ProviderCostClient<$Result.GetResult<Prisma.$ProviderCostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProviderCost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderCostFindFirstOrThrowArgs} args - Arguments to find a ProviderCost
     * @example
     * // Get one ProviderCost
     * const providerCost = await prisma.providerCost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProviderCostFindFirstOrThrowArgs>(args?: SelectSubset<T, ProviderCostFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProviderCostClient<$Result.GetResult<Prisma.$ProviderCostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProviderCosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderCostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProviderCosts
     * const providerCosts = await prisma.providerCost.findMany()
     * 
     * // Get first 10 ProviderCosts
     * const providerCosts = await prisma.providerCost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const providerCostWithIdOnly = await prisma.providerCost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProviderCostFindManyArgs>(args?: SelectSubset<T, ProviderCostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderCostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProviderCost.
     * @param {ProviderCostCreateArgs} args - Arguments to create a ProviderCost.
     * @example
     * // Create one ProviderCost
     * const ProviderCost = await prisma.providerCost.create({
     *   data: {
     *     // ... data to create a ProviderCost
     *   }
     * })
     * 
     */
    create<T extends ProviderCostCreateArgs>(args: SelectSubset<T, ProviderCostCreateArgs<ExtArgs>>): Prisma__ProviderCostClient<$Result.GetResult<Prisma.$ProviderCostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProviderCosts.
     * @param {ProviderCostCreateManyArgs} args - Arguments to create many ProviderCosts.
     * @example
     * // Create many ProviderCosts
     * const providerCost = await prisma.providerCost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProviderCostCreateManyArgs>(args?: SelectSubset<T, ProviderCostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProviderCosts and returns the data saved in the database.
     * @param {ProviderCostCreateManyAndReturnArgs} args - Arguments to create many ProviderCosts.
     * @example
     * // Create many ProviderCosts
     * const providerCost = await prisma.providerCost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProviderCosts and only return the `id`
     * const providerCostWithIdOnly = await prisma.providerCost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProviderCostCreateManyAndReturnArgs>(args?: SelectSubset<T, ProviderCostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderCostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProviderCost.
     * @param {ProviderCostDeleteArgs} args - Arguments to delete one ProviderCost.
     * @example
     * // Delete one ProviderCost
     * const ProviderCost = await prisma.providerCost.delete({
     *   where: {
     *     // ... filter to delete one ProviderCost
     *   }
     * })
     * 
     */
    delete<T extends ProviderCostDeleteArgs>(args: SelectSubset<T, ProviderCostDeleteArgs<ExtArgs>>): Prisma__ProviderCostClient<$Result.GetResult<Prisma.$ProviderCostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProviderCost.
     * @param {ProviderCostUpdateArgs} args - Arguments to update one ProviderCost.
     * @example
     * // Update one ProviderCost
     * const providerCost = await prisma.providerCost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProviderCostUpdateArgs>(args: SelectSubset<T, ProviderCostUpdateArgs<ExtArgs>>): Prisma__ProviderCostClient<$Result.GetResult<Prisma.$ProviderCostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProviderCosts.
     * @param {ProviderCostDeleteManyArgs} args - Arguments to filter ProviderCosts to delete.
     * @example
     * // Delete a few ProviderCosts
     * const { count } = await prisma.providerCost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProviderCostDeleteManyArgs>(args?: SelectSubset<T, ProviderCostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProviderCosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderCostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProviderCosts
     * const providerCost = await prisma.providerCost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProviderCostUpdateManyArgs>(args: SelectSubset<T, ProviderCostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProviderCosts and returns the data updated in the database.
     * @param {ProviderCostUpdateManyAndReturnArgs} args - Arguments to update many ProviderCosts.
     * @example
     * // Update many ProviderCosts
     * const providerCost = await prisma.providerCost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProviderCosts and only return the `id`
     * const providerCostWithIdOnly = await prisma.providerCost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProviderCostUpdateManyAndReturnArgs>(args: SelectSubset<T, ProviderCostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderCostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProviderCost.
     * @param {ProviderCostUpsertArgs} args - Arguments to update or create a ProviderCost.
     * @example
     * // Update or create a ProviderCost
     * const providerCost = await prisma.providerCost.upsert({
     *   create: {
     *     // ... data to create a ProviderCost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProviderCost we want to update
     *   }
     * })
     */
    upsert<T extends ProviderCostUpsertArgs>(args: SelectSubset<T, ProviderCostUpsertArgs<ExtArgs>>): Prisma__ProviderCostClient<$Result.GetResult<Prisma.$ProviderCostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProviderCosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderCostCountArgs} args - Arguments to filter ProviderCosts to count.
     * @example
     * // Count the number of ProviderCosts
     * const count = await prisma.providerCost.count({
     *   where: {
     *     // ... the filter for the ProviderCosts we want to count
     *   }
     * })
    **/
    count<T extends ProviderCostCountArgs>(
      args?: Subset<T, ProviderCostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProviderCostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProviderCost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderCostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProviderCostAggregateArgs>(args: Subset<T, ProviderCostAggregateArgs>): Prisma.PrismaPromise<GetProviderCostAggregateType<T>>

    /**
     * Group by ProviderCost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderCostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProviderCostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProviderCostGroupByArgs['orderBy'] }
        : { orderBy?: ProviderCostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProviderCostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProviderCostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProviderCost model
   */
  readonly fields: ProviderCostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProviderCost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProviderCostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProviderCost model
   */
  interface ProviderCostFieldRefs {
    readonly id: FieldRef<"ProviderCost", 'String'>
    readonly provider: FieldRef<"ProviderCost", 'ProviderName'>
    readonly model: FieldRef<"ProviderCost", 'String'>
    readonly costType: FieldRef<"ProviderCost", 'CostType'>
    readonly costPerUnit: FieldRef<"ProviderCost", 'Decimal'>
    readonly unitSize: FieldRef<"ProviderCost", 'Int'>
    readonly currency: FieldRef<"ProviderCost", 'String'>
    readonly validFrom: FieldRef<"ProviderCost", 'DateTime'>
    readonly validUntil: FieldRef<"ProviderCost", 'DateTime'>
    readonly createdAt: FieldRef<"ProviderCost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProviderCost findUnique
   */
  export type ProviderCostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCost
     */
    select?: ProviderCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderCost
     */
    omit?: ProviderCostOmit<ExtArgs> | null
    /**
     * Filter, which ProviderCost to fetch.
     */
    where: ProviderCostWhereUniqueInput
  }

  /**
   * ProviderCost findUniqueOrThrow
   */
  export type ProviderCostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCost
     */
    select?: ProviderCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderCost
     */
    omit?: ProviderCostOmit<ExtArgs> | null
    /**
     * Filter, which ProviderCost to fetch.
     */
    where: ProviderCostWhereUniqueInput
  }

  /**
   * ProviderCost findFirst
   */
  export type ProviderCostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCost
     */
    select?: ProviderCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderCost
     */
    omit?: ProviderCostOmit<ExtArgs> | null
    /**
     * Filter, which ProviderCost to fetch.
     */
    where?: ProviderCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProviderCosts to fetch.
     */
    orderBy?: ProviderCostOrderByWithRelationInput | ProviderCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProviderCosts.
     */
    cursor?: ProviderCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProviderCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProviderCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProviderCosts.
     */
    distinct?: ProviderCostScalarFieldEnum | ProviderCostScalarFieldEnum[]
  }

  /**
   * ProviderCost findFirstOrThrow
   */
  export type ProviderCostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCost
     */
    select?: ProviderCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderCost
     */
    omit?: ProviderCostOmit<ExtArgs> | null
    /**
     * Filter, which ProviderCost to fetch.
     */
    where?: ProviderCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProviderCosts to fetch.
     */
    orderBy?: ProviderCostOrderByWithRelationInput | ProviderCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProviderCosts.
     */
    cursor?: ProviderCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProviderCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProviderCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProviderCosts.
     */
    distinct?: ProviderCostScalarFieldEnum | ProviderCostScalarFieldEnum[]
  }

  /**
   * ProviderCost findMany
   */
  export type ProviderCostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCost
     */
    select?: ProviderCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderCost
     */
    omit?: ProviderCostOmit<ExtArgs> | null
    /**
     * Filter, which ProviderCosts to fetch.
     */
    where?: ProviderCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProviderCosts to fetch.
     */
    orderBy?: ProviderCostOrderByWithRelationInput | ProviderCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProviderCosts.
     */
    cursor?: ProviderCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProviderCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProviderCosts.
     */
    skip?: number
    distinct?: ProviderCostScalarFieldEnum | ProviderCostScalarFieldEnum[]
  }

  /**
   * ProviderCost create
   */
  export type ProviderCostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCost
     */
    select?: ProviderCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderCost
     */
    omit?: ProviderCostOmit<ExtArgs> | null
    /**
     * The data needed to create a ProviderCost.
     */
    data: XOR<ProviderCostCreateInput, ProviderCostUncheckedCreateInput>
  }

  /**
   * ProviderCost createMany
   */
  export type ProviderCostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProviderCosts.
     */
    data: ProviderCostCreateManyInput | ProviderCostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProviderCost createManyAndReturn
   */
  export type ProviderCostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCost
     */
    select?: ProviderCostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderCost
     */
    omit?: ProviderCostOmit<ExtArgs> | null
    /**
     * The data used to create many ProviderCosts.
     */
    data: ProviderCostCreateManyInput | ProviderCostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProviderCost update
   */
  export type ProviderCostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCost
     */
    select?: ProviderCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderCost
     */
    omit?: ProviderCostOmit<ExtArgs> | null
    /**
     * The data needed to update a ProviderCost.
     */
    data: XOR<ProviderCostUpdateInput, ProviderCostUncheckedUpdateInput>
    /**
     * Choose, which ProviderCost to update.
     */
    where: ProviderCostWhereUniqueInput
  }

  /**
   * ProviderCost updateMany
   */
  export type ProviderCostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProviderCosts.
     */
    data: XOR<ProviderCostUpdateManyMutationInput, ProviderCostUncheckedUpdateManyInput>
    /**
     * Filter which ProviderCosts to update
     */
    where?: ProviderCostWhereInput
    /**
     * Limit how many ProviderCosts to update.
     */
    limit?: number
  }

  /**
   * ProviderCost updateManyAndReturn
   */
  export type ProviderCostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCost
     */
    select?: ProviderCostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderCost
     */
    omit?: ProviderCostOmit<ExtArgs> | null
    /**
     * The data used to update ProviderCosts.
     */
    data: XOR<ProviderCostUpdateManyMutationInput, ProviderCostUncheckedUpdateManyInput>
    /**
     * Filter which ProviderCosts to update
     */
    where?: ProviderCostWhereInput
    /**
     * Limit how many ProviderCosts to update.
     */
    limit?: number
  }

  /**
   * ProviderCost upsert
   */
  export type ProviderCostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCost
     */
    select?: ProviderCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderCost
     */
    omit?: ProviderCostOmit<ExtArgs> | null
    /**
     * The filter to search for the ProviderCost to update in case it exists.
     */
    where: ProviderCostWhereUniqueInput
    /**
     * In case the ProviderCost found by the `where` argument doesn't exist, create a new ProviderCost with this data.
     */
    create: XOR<ProviderCostCreateInput, ProviderCostUncheckedCreateInput>
    /**
     * In case the ProviderCost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProviderCostUpdateInput, ProviderCostUncheckedUpdateInput>
  }

  /**
   * ProviderCost delete
   */
  export type ProviderCostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCost
     */
    select?: ProviderCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderCost
     */
    omit?: ProviderCostOmit<ExtArgs> | null
    /**
     * Filter which ProviderCost to delete.
     */
    where: ProviderCostWhereUniqueInput
  }

  /**
   * ProviderCost deleteMany
   */
  export type ProviderCostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProviderCosts to delete
     */
    where?: ProviderCostWhereInput
    /**
     * Limit how many ProviderCosts to delete.
     */
    limit?: number
  }

  /**
   * ProviderCost without action
   */
  export type ProviderCostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCost
     */
    select?: ProviderCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderCost
     */
    omit?: ProviderCostOmit<ExtArgs> | null
  }


  /**
   * Model UsageEvent
   */

  export type AggregateUsageEvent = {
    _count: UsageEventCountAggregateOutputType | null
    _avg: UsageEventAvgAggregateOutputType | null
    _sum: UsageEventSumAggregateOutputType | null
    _min: UsageEventMinAggregateOutputType | null
    _max: UsageEventMaxAggregateOutputType | null
  }

  export type UsageEventAvgAggregateOutputType = {
    inputTokens: number | null
    outputTokens: number | null
    creditsBurned: number | null
    costUsd: Decimal | null
  }

  export type UsageEventSumAggregateOutputType = {
    inputTokens: bigint | null
    outputTokens: bigint | null
    creditsBurned: bigint | null
    costUsd: Decimal | null
  }

  export type UsageEventMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    userId: string | null
    teamId: string | null
    eventType: $Enums.EventType | null
    featureId: string | null
    provider: $Enums.ProviderName | null
    model: string | null
    inputTokens: bigint | null
    outputTokens: bigint | null
    creditsBurned: bigint | null
    costUsd: Decimal | null
    idempotencyKey: string | null
    timestamp: Date | null
    createdAt: Date | null
  }

  export type UsageEventMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    userId: string | null
    teamId: string | null
    eventType: $Enums.EventType | null
    featureId: string | null
    provider: $Enums.ProviderName | null
    model: string | null
    inputTokens: bigint | null
    outputTokens: bigint | null
    creditsBurned: bigint | null
    costUsd: Decimal | null
    idempotencyKey: string | null
    timestamp: Date | null
    createdAt: Date | null
  }

  export type UsageEventCountAggregateOutputType = {
    id: number
    customerId: number
    userId: number
    teamId: number
    eventType: number
    featureId: number
    provider: number
    model: number
    inputTokens: number
    outputTokens: number
    creditsBurned: number
    costUsd: number
    metadata: number
    idempotencyKey: number
    timestamp: number
    createdAt: number
    _all: number
  }


  export type UsageEventAvgAggregateInputType = {
    inputTokens?: true
    outputTokens?: true
    creditsBurned?: true
    costUsd?: true
  }

  export type UsageEventSumAggregateInputType = {
    inputTokens?: true
    outputTokens?: true
    creditsBurned?: true
    costUsd?: true
  }

  export type UsageEventMinAggregateInputType = {
    id?: true
    customerId?: true
    userId?: true
    teamId?: true
    eventType?: true
    featureId?: true
    provider?: true
    model?: true
    inputTokens?: true
    outputTokens?: true
    creditsBurned?: true
    costUsd?: true
    idempotencyKey?: true
    timestamp?: true
    createdAt?: true
  }

  export type UsageEventMaxAggregateInputType = {
    id?: true
    customerId?: true
    userId?: true
    teamId?: true
    eventType?: true
    featureId?: true
    provider?: true
    model?: true
    inputTokens?: true
    outputTokens?: true
    creditsBurned?: true
    costUsd?: true
    idempotencyKey?: true
    timestamp?: true
    createdAt?: true
  }

  export type UsageEventCountAggregateInputType = {
    id?: true
    customerId?: true
    userId?: true
    teamId?: true
    eventType?: true
    featureId?: true
    provider?: true
    model?: true
    inputTokens?: true
    outputTokens?: true
    creditsBurned?: true
    costUsd?: true
    metadata?: true
    idempotencyKey?: true
    timestamp?: true
    createdAt?: true
    _all?: true
  }

  export type UsageEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageEvent to aggregate.
     */
    where?: UsageEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageEvents to fetch.
     */
    orderBy?: UsageEventOrderByWithRelationInput | UsageEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsageEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsageEvents
    **/
    _count?: true | UsageEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsageEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsageEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsageEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsageEventMaxAggregateInputType
  }

  export type GetUsageEventAggregateType<T extends UsageEventAggregateArgs> = {
        [P in keyof T & keyof AggregateUsageEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsageEvent[P]>
      : GetScalarType<T[P], AggregateUsageEvent[P]>
  }




  export type UsageEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageEventWhereInput
    orderBy?: UsageEventOrderByWithAggregationInput | UsageEventOrderByWithAggregationInput[]
    by: UsageEventScalarFieldEnum[] | UsageEventScalarFieldEnum
    having?: UsageEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsageEventCountAggregateInputType | true
    _avg?: UsageEventAvgAggregateInputType
    _sum?: UsageEventSumAggregateInputType
    _min?: UsageEventMinAggregateInputType
    _max?: UsageEventMaxAggregateInputType
  }

  export type UsageEventGroupByOutputType = {
    id: string
    customerId: string
    userId: string | null
    teamId: string | null
    eventType: $Enums.EventType
    featureId: string
    provider: $Enums.ProviderName | null
    model: string | null
    inputTokens: bigint | null
    outputTokens: bigint | null
    creditsBurned: bigint
    costUsd: Decimal | null
    metadata: JsonValue | null
    idempotencyKey: string | null
    timestamp: Date
    createdAt: Date
    _count: UsageEventCountAggregateOutputType | null
    _avg: UsageEventAvgAggregateOutputType | null
    _sum: UsageEventSumAggregateOutputType | null
    _min: UsageEventMinAggregateOutputType | null
    _max: UsageEventMaxAggregateOutputType | null
  }

  type GetUsageEventGroupByPayload<T extends UsageEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsageEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsageEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsageEventGroupByOutputType[P]>
            : GetScalarType<T[P], UsageEventGroupByOutputType[P]>
        }
      >
    >


  export type UsageEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    userId?: boolean
    teamId?: boolean
    eventType?: boolean
    featureId?: boolean
    provider?: boolean
    model?: boolean
    inputTokens?: boolean
    outputTokens?: boolean
    creditsBurned?: boolean
    costUsd?: boolean
    metadata?: boolean
    idempotencyKey?: boolean
    timestamp?: boolean
    createdAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | UsageEvent$userArgs<ExtArgs>
    team?: boolean | UsageEvent$teamArgs<ExtArgs>
  }, ExtArgs["result"]["usageEvent"]>

  export type UsageEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    userId?: boolean
    teamId?: boolean
    eventType?: boolean
    featureId?: boolean
    provider?: boolean
    model?: boolean
    inputTokens?: boolean
    outputTokens?: boolean
    creditsBurned?: boolean
    costUsd?: boolean
    metadata?: boolean
    idempotencyKey?: boolean
    timestamp?: boolean
    createdAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | UsageEvent$userArgs<ExtArgs>
    team?: boolean | UsageEvent$teamArgs<ExtArgs>
  }, ExtArgs["result"]["usageEvent"]>

  export type UsageEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    userId?: boolean
    teamId?: boolean
    eventType?: boolean
    featureId?: boolean
    provider?: boolean
    model?: boolean
    inputTokens?: boolean
    outputTokens?: boolean
    creditsBurned?: boolean
    costUsd?: boolean
    metadata?: boolean
    idempotencyKey?: boolean
    timestamp?: boolean
    createdAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | UsageEvent$userArgs<ExtArgs>
    team?: boolean | UsageEvent$teamArgs<ExtArgs>
  }, ExtArgs["result"]["usageEvent"]>

  export type UsageEventSelectScalar = {
    id?: boolean
    customerId?: boolean
    userId?: boolean
    teamId?: boolean
    eventType?: boolean
    featureId?: boolean
    provider?: boolean
    model?: boolean
    inputTokens?: boolean
    outputTokens?: boolean
    creditsBurned?: boolean
    costUsd?: boolean
    metadata?: boolean
    idempotencyKey?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }

  export type UsageEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "userId" | "teamId" | "eventType" | "featureId" | "provider" | "model" | "inputTokens" | "outputTokens" | "creditsBurned" | "costUsd" | "metadata" | "idempotencyKey" | "timestamp" | "createdAt", ExtArgs["result"]["usageEvent"]>
  export type UsageEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | UsageEvent$userArgs<ExtArgs>
    team?: boolean | UsageEvent$teamArgs<ExtArgs>
  }
  export type UsageEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | UsageEvent$userArgs<ExtArgs>
    team?: boolean | UsageEvent$teamArgs<ExtArgs>
  }
  export type UsageEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | UsageEvent$userArgs<ExtArgs>
    team?: boolean | UsageEvent$teamArgs<ExtArgs>
  }

  export type $UsageEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsageEvent"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
      team: Prisma.$TeamPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      userId: string | null
      teamId: string | null
      eventType: $Enums.EventType
      featureId: string
      provider: $Enums.ProviderName | null
      model: string | null
      inputTokens: bigint | null
      outputTokens: bigint | null
      creditsBurned: bigint
      costUsd: Prisma.Decimal | null
      metadata: Prisma.JsonValue | null
      idempotencyKey: string | null
      timestamp: Date
      createdAt: Date
    }, ExtArgs["result"]["usageEvent"]>
    composites: {}
  }

  type UsageEventGetPayload<S extends boolean | null | undefined | UsageEventDefaultArgs> = $Result.GetResult<Prisma.$UsageEventPayload, S>

  type UsageEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsageEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsageEventCountAggregateInputType | true
    }

  export interface UsageEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsageEvent'], meta: { name: 'UsageEvent' } }
    /**
     * Find zero or one UsageEvent that matches the filter.
     * @param {UsageEventFindUniqueArgs} args - Arguments to find a UsageEvent
     * @example
     * // Get one UsageEvent
     * const usageEvent = await prisma.usageEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsageEventFindUniqueArgs>(args: SelectSubset<T, UsageEventFindUniqueArgs<ExtArgs>>): Prisma__UsageEventClient<$Result.GetResult<Prisma.$UsageEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UsageEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsageEventFindUniqueOrThrowArgs} args - Arguments to find a UsageEvent
     * @example
     * // Get one UsageEvent
     * const usageEvent = await prisma.usageEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsageEventFindUniqueOrThrowArgs>(args: SelectSubset<T, UsageEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsageEventClient<$Result.GetResult<Prisma.$UsageEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageEventFindFirstArgs} args - Arguments to find a UsageEvent
     * @example
     * // Get one UsageEvent
     * const usageEvent = await prisma.usageEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsageEventFindFirstArgs>(args?: SelectSubset<T, UsageEventFindFirstArgs<ExtArgs>>): Prisma__UsageEventClient<$Result.GetResult<Prisma.$UsageEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageEventFindFirstOrThrowArgs} args - Arguments to find a UsageEvent
     * @example
     * // Get one UsageEvent
     * const usageEvent = await prisma.usageEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsageEventFindFirstOrThrowArgs>(args?: SelectSubset<T, UsageEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsageEventClient<$Result.GetResult<Prisma.$UsageEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UsageEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsageEvents
     * const usageEvents = await prisma.usageEvent.findMany()
     * 
     * // Get first 10 UsageEvents
     * const usageEvents = await prisma.usageEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usageEventWithIdOnly = await prisma.usageEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsageEventFindManyArgs>(args?: SelectSubset<T, UsageEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UsageEvent.
     * @param {UsageEventCreateArgs} args - Arguments to create a UsageEvent.
     * @example
     * // Create one UsageEvent
     * const UsageEvent = await prisma.usageEvent.create({
     *   data: {
     *     // ... data to create a UsageEvent
     *   }
     * })
     * 
     */
    create<T extends UsageEventCreateArgs>(args: SelectSubset<T, UsageEventCreateArgs<ExtArgs>>): Prisma__UsageEventClient<$Result.GetResult<Prisma.$UsageEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UsageEvents.
     * @param {UsageEventCreateManyArgs} args - Arguments to create many UsageEvents.
     * @example
     * // Create many UsageEvents
     * const usageEvent = await prisma.usageEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsageEventCreateManyArgs>(args?: SelectSubset<T, UsageEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsageEvents and returns the data saved in the database.
     * @param {UsageEventCreateManyAndReturnArgs} args - Arguments to create many UsageEvents.
     * @example
     * // Create many UsageEvents
     * const usageEvent = await prisma.usageEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsageEvents and only return the `id`
     * const usageEventWithIdOnly = await prisma.usageEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsageEventCreateManyAndReturnArgs>(args?: SelectSubset<T, UsageEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UsageEvent.
     * @param {UsageEventDeleteArgs} args - Arguments to delete one UsageEvent.
     * @example
     * // Delete one UsageEvent
     * const UsageEvent = await prisma.usageEvent.delete({
     *   where: {
     *     // ... filter to delete one UsageEvent
     *   }
     * })
     * 
     */
    delete<T extends UsageEventDeleteArgs>(args: SelectSubset<T, UsageEventDeleteArgs<ExtArgs>>): Prisma__UsageEventClient<$Result.GetResult<Prisma.$UsageEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UsageEvent.
     * @param {UsageEventUpdateArgs} args - Arguments to update one UsageEvent.
     * @example
     * // Update one UsageEvent
     * const usageEvent = await prisma.usageEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsageEventUpdateArgs>(args: SelectSubset<T, UsageEventUpdateArgs<ExtArgs>>): Prisma__UsageEventClient<$Result.GetResult<Prisma.$UsageEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UsageEvents.
     * @param {UsageEventDeleteManyArgs} args - Arguments to filter UsageEvents to delete.
     * @example
     * // Delete a few UsageEvents
     * const { count } = await prisma.usageEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsageEventDeleteManyArgs>(args?: SelectSubset<T, UsageEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsageEvents
     * const usageEvent = await prisma.usageEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsageEventUpdateManyArgs>(args: SelectSubset<T, UsageEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageEvents and returns the data updated in the database.
     * @param {UsageEventUpdateManyAndReturnArgs} args - Arguments to update many UsageEvents.
     * @example
     * // Update many UsageEvents
     * const usageEvent = await prisma.usageEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UsageEvents and only return the `id`
     * const usageEventWithIdOnly = await prisma.usageEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsageEventUpdateManyAndReturnArgs>(args: SelectSubset<T, UsageEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UsageEvent.
     * @param {UsageEventUpsertArgs} args - Arguments to update or create a UsageEvent.
     * @example
     * // Update or create a UsageEvent
     * const usageEvent = await prisma.usageEvent.upsert({
     *   create: {
     *     // ... data to create a UsageEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsageEvent we want to update
     *   }
     * })
     */
    upsert<T extends UsageEventUpsertArgs>(args: SelectSubset<T, UsageEventUpsertArgs<ExtArgs>>): Prisma__UsageEventClient<$Result.GetResult<Prisma.$UsageEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UsageEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageEventCountArgs} args - Arguments to filter UsageEvents to count.
     * @example
     * // Count the number of UsageEvents
     * const count = await prisma.usageEvent.count({
     *   where: {
     *     // ... the filter for the UsageEvents we want to count
     *   }
     * })
    **/
    count<T extends UsageEventCountArgs>(
      args?: Subset<T, UsageEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsageEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsageEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsageEventAggregateArgs>(args: Subset<T, UsageEventAggregateArgs>): Prisma.PrismaPromise<GetUsageEventAggregateType<T>>

    /**
     * Group by UsageEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsageEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsageEventGroupByArgs['orderBy'] }
        : { orderBy?: UsageEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsageEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsageEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsageEvent model
   */
  readonly fields: UsageEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsageEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsageEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UsageEvent$userArgs<ExtArgs> = {}>(args?: Subset<T, UsageEvent$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    team<T extends UsageEvent$teamArgs<ExtArgs> = {}>(args?: Subset<T, UsageEvent$teamArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsageEvent model
   */
  interface UsageEventFieldRefs {
    readonly id: FieldRef<"UsageEvent", 'String'>
    readonly customerId: FieldRef<"UsageEvent", 'String'>
    readonly userId: FieldRef<"UsageEvent", 'String'>
    readonly teamId: FieldRef<"UsageEvent", 'String'>
    readonly eventType: FieldRef<"UsageEvent", 'EventType'>
    readonly featureId: FieldRef<"UsageEvent", 'String'>
    readonly provider: FieldRef<"UsageEvent", 'ProviderName'>
    readonly model: FieldRef<"UsageEvent", 'String'>
    readonly inputTokens: FieldRef<"UsageEvent", 'BigInt'>
    readonly outputTokens: FieldRef<"UsageEvent", 'BigInt'>
    readonly creditsBurned: FieldRef<"UsageEvent", 'BigInt'>
    readonly costUsd: FieldRef<"UsageEvent", 'Decimal'>
    readonly metadata: FieldRef<"UsageEvent", 'Json'>
    readonly idempotencyKey: FieldRef<"UsageEvent", 'String'>
    readonly timestamp: FieldRef<"UsageEvent", 'DateTime'>
    readonly createdAt: FieldRef<"UsageEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UsageEvent findUnique
   */
  export type UsageEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventInclude<ExtArgs> | null
    /**
     * Filter, which UsageEvent to fetch.
     */
    where: UsageEventWhereUniqueInput
  }

  /**
   * UsageEvent findUniqueOrThrow
   */
  export type UsageEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventInclude<ExtArgs> | null
    /**
     * Filter, which UsageEvent to fetch.
     */
    where: UsageEventWhereUniqueInput
  }

  /**
   * UsageEvent findFirst
   */
  export type UsageEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventInclude<ExtArgs> | null
    /**
     * Filter, which UsageEvent to fetch.
     */
    where?: UsageEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageEvents to fetch.
     */
    orderBy?: UsageEventOrderByWithRelationInput | UsageEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageEvents.
     */
    cursor?: UsageEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageEvents.
     */
    distinct?: UsageEventScalarFieldEnum | UsageEventScalarFieldEnum[]
  }

  /**
   * UsageEvent findFirstOrThrow
   */
  export type UsageEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventInclude<ExtArgs> | null
    /**
     * Filter, which UsageEvent to fetch.
     */
    where?: UsageEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageEvents to fetch.
     */
    orderBy?: UsageEventOrderByWithRelationInput | UsageEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageEvents.
     */
    cursor?: UsageEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageEvents.
     */
    distinct?: UsageEventScalarFieldEnum | UsageEventScalarFieldEnum[]
  }

  /**
   * UsageEvent findMany
   */
  export type UsageEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventInclude<ExtArgs> | null
    /**
     * Filter, which UsageEvents to fetch.
     */
    where?: UsageEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageEvents to fetch.
     */
    orderBy?: UsageEventOrderByWithRelationInput | UsageEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsageEvents.
     */
    cursor?: UsageEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageEvents.
     */
    skip?: number
    distinct?: UsageEventScalarFieldEnum | UsageEventScalarFieldEnum[]
  }

  /**
   * UsageEvent create
   */
  export type UsageEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventInclude<ExtArgs> | null
    /**
     * The data needed to create a UsageEvent.
     */
    data: XOR<UsageEventCreateInput, UsageEventUncheckedCreateInput>
  }

  /**
   * UsageEvent createMany
   */
  export type UsageEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsageEvents.
     */
    data: UsageEventCreateManyInput | UsageEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsageEvent createManyAndReturn
   */
  export type UsageEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * The data used to create many UsageEvents.
     */
    data: UsageEventCreateManyInput | UsageEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageEvent update
   */
  export type UsageEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventInclude<ExtArgs> | null
    /**
     * The data needed to update a UsageEvent.
     */
    data: XOR<UsageEventUpdateInput, UsageEventUncheckedUpdateInput>
    /**
     * Choose, which UsageEvent to update.
     */
    where: UsageEventWhereUniqueInput
  }

  /**
   * UsageEvent updateMany
   */
  export type UsageEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsageEvents.
     */
    data: XOR<UsageEventUpdateManyMutationInput, UsageEventUncheckedUpdateManyInput>
    /**
     * Filter which UsageEvents to update
     */
    where?: UsageEventWhereInput
    /**
     * Limit how many UsageEvents to update.
     */
    limit?: number
  }

  /**
   * UsageEvent updateManyAndReturn
   */
  export type UsageEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * The data used to update UsageEvents.
     */
    data: XOR<UsageEventUpdateManyMutationInput, UsageEventUncheckedUpdateManyInput>
    /**
     * Filter which UsageEvents to update
     */
    where?: UsageEventWhereInput
    /**
     * Limit how many UsageEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageEvent upsert
   */
  export type UsageEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventInclude<ExtArgs> | null
    /**
     * The filter to search for the UsageEvent to update in case it exists.
     */
    where: UsageEventWhereUniqueInput
    /**
     * In case the UsageEvent found by the `where` argument doesn't exist, create a new UsageEvent with this data.
     */
    create: XOR<UsageEventCreateInput, UsageEventUncheckedCreateInput>
    /**
     * In case the UsageEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsageEventUpdateInput, UsageEventUncheckedUpdateInput>
  }

  /**
   * UsageEvent delete
   */
  export type UsageEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventInclude<ExtArgs> | null
    /**
     * Filter which UsageEvent to delete.
     */
    where: UsageEventWhereUniqueInput
  }

  /**
   * UsageEvent deleteMany
   */
  export type UsageEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageEvents to delete
     */
    where?: UsageEventWhereInput
    /**
     * Limit how many UsageEvents to delete.
     */
    limit?: number
  }

  /**
   * UsageEvent.user
   */
  export type UsageEvent$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * UsageEvent.team
   */
  export type UsageEvent$teamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
  }

  /**
   * UsageEvent without action
   */
  export type UsageEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageEvent
     */
    select?: UsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageEvent
     */
    omit?: UsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageEventInclude<ExtArgs> | null
  }


  /**
   * Model Plan
   */

  export type AggregatePlan = {
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  export type PlanAvgAggregateOutputType = {
    basePriceCents: number | null
    includedCredits: number | null
  }

  export type PlanSumAggregateOutputType = {
    basePriceCents: bigint | null
    includedCredits: bigint | null
  }

  export type PlanMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    basePriceCents: bigint | null
    includedCredits: bigint | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    basePriceCents: bigint | null
    includedCredits: bigint | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanCountAggregateOutputType = {
    id: number
    name: number
    description: number
    basePriceCents: number
    includedCredits: number
    features: number
    metadata: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlanAvgAggregateInputType = {
    basePriceCents?: true
    includedCredits?: true
  }

  export type PlanSumAggregateInputType = {
    basePriceCents?: true
    includedCredits?: true
  }

  export type PlanMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    basePriceCents?: true
    includedCredits?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    basePriceCents?: true
    includedCredits?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    basePriceCents?: true
    includedCredits?: true
    features?: true
    metadata?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plan to aggregate.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Plans
    **/
    _count?: true | PlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanMaxAggregateInputType
  }

  export type GetPlanAggregateType<T extends PlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlan[P]>
      : GetScalarType<T[P], AggregatePlan[P]>
  }




  export type PlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithAggregationInput | PlanOrderByWithAggregationInput[]
    by: PlanScalarFieldEnum[] | PlanScalarFieldEnum
    having?: PlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanCountAggregateInputType | true
    _avg?: PlanAvgAggregateInputType
    _sum?: PlanSumAggregateInputType
    _min?: PlanMinAggregateInputType
    _max?: PlanMaxAggregateInputType
  }

  export type PlanGroupByOutputType = {
    id: string
    name: string
    description: string | null
    basePriceCents: bigint | null
    includedCredits: bigint | null
    features: JsonValue | null
    metadata: JsonValue | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  type GetPlanGroupByPayload<T extends PlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanGroupByOutputType[P]>
            : GetScalarType<T[P], PlanGroupByOutputType[P]>
        }
      >
    >


  export type PlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    basePriceCents?: boolean
    includedCredits?: boolean
    features?: boolean
    metadata?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscriptions?: boolean | Plan$subscriptionsArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    basePriceCents?: boolean
    includedCredits?: boolean
    features?: boolean
    metadata?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    basePriceCents?: boolean
    includedCredits?: boolean
    features?: boolean
    metadata?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    basePriceCents?: boolean
    includedCredits?: boolean
    features?: boolean
    metadata?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "basePriceCents" | "includedCredits" | "features" | "metadata" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["plan"]>
  export type PlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | Plan$subscriptionsArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plan"
    objects: {
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      basePriceCents: bigint | null
      includedCredits: bigint | null
      features: Prisma.JsonValue | null
      metadata: Prisma.JsonValue | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["plan"]>
    composites: {}
  }

  type PlanGetPayload<S extends boolean | null | undefined | PlanDefaultArgs> = $Result.GetResult<Prisma.$PlanPayload, S>

  type PlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanCountAggregateInputType | true
    }

  export interface PlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plan'], meta: { name: 'Plan' } }
    /**
     * Find zero or one Plan that matches the filter.
     * @param {PlanFindUniqueArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFindUniqueArgs>(args: SelectSubset<T, PlanFindUniqueArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Plan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanFindUniqueOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFindFirstArgs>(args?: SelectSubset<T, PlanFindFirstArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Plans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Plans
     * const plans = await prisma.plan.findMany()
     * 
     * // Get first 10 Plans
     * const plans = await prisma.plan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planWithIdOnly = await prisma.plan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFindManyArgs>(args?: SelectSubset<T, PlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Plan.
     * @param {PlanCreateArgs} args - Arguments to create a Plan.
     * @example
     * // Create one Plan
     * const Plan = await prisma.plan.create({
     *   data: {
     *     // ... data to create a Plan
     *   }
     * })
     * 
     */
    create<T extends PlanCreateArgs>(args: SelectSubset<T, PlanCreateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Plans.
     * @param {PlanCreateManyArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanCreateManyArgs>(args?: SelectSubset<T, PlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Plans and returns the data saved in the database.
     * @param {PlanCreateManyAndReturnArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Plan.
     * @param {PlanDeleteArgs} args - Arguments to delete one Plan.
     * @example
     * // Delete one Plan
     * const Plan = await prisma.plan.delete({
     *   where: {
     *     // ... filter to delete one Plan
     *   }
     * })
     * 
     */
    delete<T extends PlanDeleteArgs>(args: SelectSubset<T, PlanDeleteArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Plan.
     * @param {PlanUpdateArgs} args - Arguments to update one Plan.
     * @example
     * // Update one Plan
     * const plan = await prisma.plan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanUpdateArgs>(args: SelectSubset<T, PlanUpdateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Plans.
     * @param {PlanDeleteManyArgs} args - Arguments to filter Plans to delete.
     * @example
     * // Delete a few Plans
     * const { count } = await prisma.plan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanDeleteManyArgs>(args?: SelectSubset<T, PlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanUpdateManyArgs>(args: SelectSubset<T, PlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans and returns the data updated in the database.
     * @param {PlanUpdateManyAndReturnArgs} args - Arguments to update many Plans.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlanUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Plan.
     * @param {PlanUpsertArgs} args - Arguments to update or create a Plan.
     * @example
     * // Update or create a Plan
     * const plan = await prisma.plan.upsert({
     *   create: {
     *     // ... data to create a Plan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plan we want to update
     *   }
     * })
     */
    upsert<T extends PlanUpsertArgs>(args: SelectSubset<T, PlanUpsertArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCountArgs} args - Arguments to filter Plans to count.
     * @example
     * // Count the number of Plans
     * const count = await prisma.plan.count({
     *   where: {
     *     // ... the filter for the Plans we want to count
     *   }
     * })
    **/
    count<T extends PlanCountArgs>(
      args?: Subset<T, PlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanAggregateArgs>(args: Subset<T, PlanAggregateArgs>): Prisma.PrismaPromise<GetPlanAggregateType<T>>

    /**
     * Group by Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanGroupByArgs['orderBy'] }
        : { orderBy?: PlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plan model
   */
  readonly fields: PlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscriptions<T extends Plan$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Plan$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Plan model
   */
  interface PlanFieldRefs {
    readonly id: FieldRef<"Plan", 'String'>
    readonly name: FieldRef<"Plan", 'String'>
    readonly description: FieldRef<"Plan", 'String'>
    readonly basePriceCents: FieldRef<"Plan", 'BigInt'>
    readonly includedCredits: FieldRef<"Plan", 'BigInt'>
    readonly features: FieldRef<"Plan", 'Json'>
    readonly metadata: FieldRef<"Plan", 'Json'>
    readonly isActive: FieldRef<"Plan", 'Boolean'>
    readonly createdAt: FieldRef<"Plan", 'DateTime'>
    readonly updatedAt: FieldRef<"Plan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Plan findUnique
   */
  export type PlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findUniqueOrThrow
   */
  export type PlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findFirst
   */
  export type PlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findFirstOrThrow
   */
  export type PlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findMany
   */
  export type PlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plans to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan create
   */
  export type PlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to create a Plan.
     */
    data: XOR<PlanCreateInput, PlanUncheckedCreateInput>
  }

  /**
   * Plan createMany
   */
  export type PlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan createManyAndReturn
   */
  export type PlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan update
   */
  export type PlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to update a Plan.
     */
    data: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
    /**
     * Choose, which Plan to update.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan updateMany
   */
  export type PlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan updateManyAndReturn
   */
  export type PlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan upsert
   */
  export type PlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The filter to search for the Plan to update in case it exists.
     */
    where: PlanWhereUniqueInput
    /**
     * In case the Plan found by the `where` argument doesn't exist, create a new Plan with this data.
     */
    create: XOR<PlanCreateInput, PlanUncheckedCreateInput>
    /**
     * In case the Plan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
  }

  /**
   * Plan delete
   */
  export type PlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter which Plan to delete.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan deleteMany
   */
  export type PlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plans to delete
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to delete.
     */
    limit?: number
  }

  /**
   * Plan.subscriptions
   */
  export type Plan$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Plan without action
   */
  export type PlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    planId: string | null
    status: $Enums.SubscriptionStatus | null
    billingPeriod: $Enums.BillingPeriod | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    cancelAtPeriodEnd: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    planId: string | null
    status: $Enums.SubscriptionStatus | null
    billingPeriod: $Enums.BillingPeriod | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    cancelAtPeriodEnd: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    customerId: number
    planId: number
    status: number
    billingPeriod: number
    currentPeriodStart: number
    currentPeriodEnd: number
    cancelAtPeriodEnd: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionMinAggregateInputType = {
    id?: true
    customerId?: true
    planId?: true
    status?: true
    billingPeriod?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelAtPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    customerId?: true
    planId?: true
    status?: true
    billingPeriod?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelAtPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    customerId?: true
    planId?: true
    status?: true
    billingPeriod?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelAtPeriodEnd?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    customerId: string
    planId: string
    status: $Enums.SubscriptionStatus
    billingPeriod: $Enums.BillingPeriod | null
    currentPeriodStart: Date
    currentPeriodEnd: Date
    cancelAtPeriodEnd: boolean
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    planId?: boolean
    status?: boolean
    billingPeriod?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    planId?: boolean
    status?: boolean
    billingPeriod?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    planId?: boolean
    status?: boolean
    billingPeriod?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    id?: boolean
    customerId?: boolean
    planId?: boolean
    status?: boolean
    billingPeriod?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "planId" | "status" | "billingPeriod" | "currentPeriodStart" | "currentPeriodEnd" | "cancelAtPeriodEnd" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      plan: Prisma.$PlanPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      planId: string
      status: $Enums.SubscriptionStatus
      billingPeriod: $Enums.BillingPeriod | null
      currentPeriodStart: Date
      currentPeriodEnd: Date
      cancelAtPeriodEnd: boolean
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {SubscriptionUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    plan<T extends PlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanDefaultArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly customerId: FieldRef<"Subscription", 'String'>
    readonly planId: FieldRef<"Subscription", 'String'>
    readonly status: FieldRef<"Subscription", 'SubscriptionStatus'>
    readonly billingPeriod: FieldRef<"Subscription", 'BillingPeriod'>
    readonly currentPeriodStart: FieldRef<"Subscription", 'DateTime'>
    readonly currentPeriodEnd: FieldRef<"Subscription", 'DateTime'>
    readonly cancelAtPeriodEnd: FieldRef<"Subscription", 'Boolean'>
    readonly metadata: FieldRef<"Subscription", 'Json'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription updateManyAndReturn
   */
  export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Entitlement
   */

  export type AggregateEntitlement = {
    _count: EntitlementCountAggregateOutputType | null
    _avg: EntitlementAvgAggregateOutputType | null
    _sum: EntitlementSumAggregateOutputType | null
    _min: EntitlementMinAggregateOutputType | null
    _max: EntitlementMaxAggregateOutputType | null
  }

  export type EntitlementAvgAggregateOutputType = {
    limitValue: number | null
  }

  export type EntitlementSumAggregateOutputType = {
    limitValue: bigint | null
  }

  export type EntitlementMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    userId: string | null
    featureId: string | null
    limitType: $Enums.LimitType | null
    limitValue: bigint | null
    period: $Enums.LimitPeriod | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EntitlementMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    userId: string | null
    featureId: string | null
    limitType: $Enums.LimitType | null
    limitValue: bigint | null
    period: $Enums.LimitPeriod | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EntitlementCountAggregateOutputType = {
    id: number
    customerId: number
    userId: number
    featureId: number
    limitType: number
    limitValue: number
    period: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EntitlementAvgAggregateInputType = {
    limitValue?: true
  }

  export type EntitlementSumAggregateInputType = {
    limitValue?: true
  }

  export type EntitlementMinAggregateInputType = {
    id?: true
    customerId?: true
    userId?: true
    featureId?: true
    limitType?: true
    limitValue?: true
    period?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EntitlementMaxAggregateInputType = {
    id?: true
    customerId?: true
    userId?: true
    featureId?: true
    limitType?: true
    limitValue?: true
    period?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EntitlementCountAggregateInputType = {
    id?: true
    customerId?: true
    userId?: true
    featureId?: true
    limitType?: true
    limitValue?: true
    period?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EntitlementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Entitlement to aggregate.
     */
    where?: EntitlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entitlements to fetch.
     */
    orderBy?: EntitlementOrderByWithRelationInput | EntitlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EntitlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entitlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entitlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Entitlements
    **/
    _count?: true | EntitlementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EntitlementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EntitlementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EntitlementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EntitlementMaxAggregateInputType
  }

  export type GetEntitlementAggregateType<T extends EntitlementAggregateArgs> = {
        [P in keyof T & keyof AggregateEntitlement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntitlement[P]>
      : GetScalarType<T[P], AggregateEntitlement[P]>
  }




  export type EntitlementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntitlementWhereInput
    orderBy?: EntitlementOrderByWithAggregationInput | EntitlementOrderByWithAggregationInput[]
    by: EntitlementScalarFieldEnum[] | EntitlementScalarFieldEnum
    having?: EntitlementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EntitlementCountAggregateInputType | true
    _avg?: EntitlementAvgAggregateInputType
    _sum?: EntitlementSumAggregateInputType
    _min?: EntitlementMinAggregateInputType
    _max?: EntitlementMaxAggregateInputType
  }

  export type EntitlementGroupByOutputType = {
    id: string
    customerId: string
    userId: string | null
    featureId: string
    limitType: $Enums.LimitType | null
    limitValue: bigint | null
    period: $Enums.LimitPeriod | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: EntitlementCountAggregateOutputType | null
    _avg: EntitlementAvgAggregateOutputType | null
    _sum: EntitlementSumAggregateOutputType | null
    _min: EntitlementMinAggregateOutputType | null
    _max: EntitlementMaxAggregateOutputType | null
  }

  type GetEntitlementGroupByPayload<T extends EntitlementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EntitlementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EntitlementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EntitlementGroupByOutputType[P]>
            : GetScalarType<T[P], EntitlementGroupByOutputType[P]>
        }
      >
    >


  export type EntitlementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    userId?: boolean
    featureId?: boolean
    limitType?: boolean
    limitValue?: boolean
    period?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | Entitlement$userArgs<ExtArgs>
  }, ExtArgs["result"]["entitlement"]>

  export type EntitlementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    userId?: boolean
    featureId?: boolean
    limitType?: boolean
    limitValue?: boolean
    period?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | Entitlement$userArgs<ExtArgs>
  }, ExtArgs["result"]["entitlement"]>

  export type EntitlementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    userId?: boolean
    featureId?: boolean
    limitType?: boolean
    limitValue?: boolean
    period?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | Entitlement$userArgs<ExtArgs>
  }, ExtArgs["result"]["entitlement"]>

  export type EntitlementSelectScalar = {
    id?: boolean
    customerId?: boolean
    userId?: boolean
    featureId?: boolean
    limitType?: boolean
    limitValue?: boolean
    period?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EntitlementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "userId" | "featureId" | "limitType" | "limitValue" | "period" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["entitlement"]>
  export type EntitlementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | Entitlement$userArgs<ExtArgs>
  }
  export type EntitlementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | Entitlement$userArgs<ExtArgs>
  }
  export type EntitlementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | Entitlement$userArgs<ExtArgs>
  }

  export type $EntitlementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Entitlement"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      userId: string | null
      featureId: string
      limitType: $Enums.LimitType | null
      limitValue: bigint | null
      period: $Enums.LimitPeriod | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["entitlement"]>
    composites: {}
  }

  type EntitlementGetPayload<S extends boolean | null | undefined | EntitlementDefaultArgs> = $Result.GetResult<Prisma.$EntitlementPayload, S>

  type EntitlementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EntitlementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EntitlementCountAggregateInputType | true
    }

  export interface EntitlementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Entitlement'], meta: { name: 'Entitlement' } }
    /**
     * Find zero or one Entitlement that matches the filter.
     * @param {EntitlementFindUniqueArgs} args - Arguments to find a Entitlement
     * @example
     * // Get one Entitlement
     * const entitlement = await prisma.entitlement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntitlementFindUniqueArgs>(args: SelectSubset<T, EntitlementFindUniqueArgs<ExtArgs>>): Prisma__EntitlementClient<$Result.GetResult<Prisma.$EntitlementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Entitlement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EntitlementFindUniqueOrThrowArgs} args - Arguments to find a Entitlement
     * @example
     * // Get one Entitlement
     * const entitlement = await prisma.entitlement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntitlementFindUniqueOrThrowArgs>(args: SelectSubset<T, EntitlementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EntitlementClient<$Result.GetResult<Prisma.$EntitlementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Entitlement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntitlementFindFirstArgs} args - Arguments to find a Entitlement
     * @example
     * // Get one Entitlement
     * const entitlement = await prisma.entitlement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntitlementFindFirstArgs>(args?: SelectSubset<T, EntitlementFindFirstArgs<ExtArgs>>): Prisma__EntitlementClient<$Result.GetResult<Prisma.$EntitlementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Entitlement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntitlementFindFirstOrThrowArgs} args - Arguments to find a Entitlement
     * @example
     * // Get one Entitlement
     * const entitlement = await prisma.entitlement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntitlementFindFirstOrThrowArgs>(args?: SelectSubset<T, EntitlementFindFirstOrThrowArgs<ExtArgs>>): Prisma__EntitlementClient<$Result.GetResult<Prisma.$EntitlementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Entitlements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntitlementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Entitlements
     * const entitlements = await prisma.entitlement.findMany()
     * 
     * // Get first 10 Entitlements
     * const entitlements = await prisma.entitlement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const entitlementWithIdOnly = await prisma.entitlement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EntitlementFindManyArgs>(args?: SelectSubset<T, EntitlementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntitlementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Entitlement.
     * @param {EntitlementCreateArgs} args - Arguments to create a Entitlement.
     * @example
     * // Create one Entitlement
     * const Entitlement = await prisma.entitlement.create({
     *   data: {
     *     // ... data to create a Entitlement
     *   }
     * })
     * 
     */
    create<T extends EntitlementCreateArgs>(args: SelectSubset<T, EntitlementCreateArgs<ExtArgs>>): Prisma__EntitlementClient<$Result.GetResult<Prisma.$EntitlementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Entitlements.
     * @param {EntitlementCreateManyArgs} args - Arguments to create many Entitlements.
     * @example
     * // Create many Entitlements
     * const entitlement = await prisma.entitlement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EntitlementCreateManyArgs>(args?: SelectSubset<T, EntitlementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Entitlements and returns the data saved in the database.
     * @param {EntitlementCreateManyAndReturnArgs} args - Arguments to create many Entitlements.
     * @example
     * // Create many Entitlements
     * const entitlement = await prisma.entitlement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Entitlements and only return the `id`
     * const entitlementWithIdOnly = await prisma.entitlement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EntitlementCreateManyAndReturnArgs>(args?: SelectSubset<T, EntitlementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntitlementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Entitlement.
     * @param {EntitlementDeleteArgs} args - Arguments to delete one Entitlement.
     * @example
     * // Delete one Entitlement
     * const Entitlement = await prisma.entitlement.delete({
     *   where: {
     *     // ... filter to delete one Entitlement
     *   }
     * })
     * 
     */
    delete<T extends EntitlementDeleteArgs>(args: SelectSubset<T, EntitlementDeleteArgs<ExtArgs>>): Prisma__EntitlementClient<$Result.GetResult<Prisma.$EntitlementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Entitlement.
     * @param {EntitlementUpdateArgs} args - Arguments to update one Entitlement.
     * @example
     * // Update one Entitlement
     * const entitlement = await prisma.entitlement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EntitlementUpdateArgs>(args: SelectSubset<T, EntitlementUpdateArgs<ExtArgs>>): Prisma__EntitlementClient<$Result.GetResult<Prisma.$EntitlementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Entitlements.
     * @param {EntitlementDeleteManyArgs} args - Arguments to filter Entitlements to delete.
     * @example
     * // Delete a few Entitlements
     * const { count } = await prisma.entitlement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EntitlementDeleteManyArgs>(args?: SelectSubset<T, EntitlementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Entitlements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntitlementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Entitlements
     * const entitlement = await prisma.entitlement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EntitlementUpdateManyArgs>(args: SelectSubset<T, EntitlementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Entitlements and returns the data updated in the database.
     * @param {EntitlementUpdateManyAndReturnArgs} args - Arguments to update many Entitlements.
     * @example
     * // Update many Entitlements
     * const entitlement = await prisma.entitlement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Entitlements and only return the `id`
     * const entitlementWithIdOnly = await prisma.entitlement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EntitlementUpdateManyAndReturnArgs>(args: SelectSubset<T, EntitlementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntitlementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Entitlement.
     * @param {EntitlementUpsertArgs} args - Arguments to update or create a Entitlement.
     * @example
     * // Update or create a Entitlement
     * const entitlement = await prisma.entitlement.upsert({
     *   create: {
     *     // ... data to create a Entitlement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Entitlement we want to update
     *   }
     * })
     */
    upsert<T extends EntitlementUpsertArgs>(args: SelectSubset<T, EntitlementUpsertArgs<ExtArgs>>): Prisma__EntitlementClient<$Result.GetResult<Prisma.$EntitlementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Entitlements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntitlementCountArgs} args - Arguments to filter Entitlements to count.
     * @example
     * // Count the number of Entitlements
     * const count = await prisma.entitlement.count({
     *   where: {
     *     // ... the filter for the Entitlements we want to count
     *   }
     * })
    **/
    count<T extends EntitlementCountArgs>(
      args?: Subset<T, EntitlementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntitlementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Entitlement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntitlementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EntitlementAggregateArgs>(args: Subset<T, EntitlementAggregateArgs>): Prisma.PrismaPromise<GetEntitlementAggregateType<T>>

    /**
     * Group by Entitlement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntitlementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EntitlementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntitlementGroupByArgs['orderBy'] }
        : { orderBy?: EntitlementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EntitlementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntitlementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Entitlement model
   */
  readonly fields: EntitlementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Entitlement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EntitlementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends Entitlement$userArgs<ExtArgs> = {}>(args?: Subset<T, Entitlement$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Entitlement model
   */
  interface EntitlementFieldRefs {
    readonly id: FieldRef<"Entitlement", 'String'>
    readonly customerId: FieldRef<"Entitlement", 'String'>
    readonly userId: FieldRef<"Entitlement", 'String'>
    readonly featureId: FieldRef<"Entitlement", 'String'>
    readonly limitType: FieldRef<"Entitlement", 'LimitType'>
    readonly limitValue: FieldRef<"Entitlement", 'BigInt'>
    readonly period: FieldRef<"Entitlement", 'LimitPeriod'>
    readonly metadata: FieldRef<"Entitlement", 'Json'>
    readonly createdAt: FieldRef<"Entitlement", 'DateTime'>
    readonly updatedAt: FieldRef<"Entitlement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Entitlement findUnique
   */
  export type EntitlementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entitlement
     */
    select?: EntitlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entitlement
     */
    omit?: EntitlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntitlementInclude<ExtArgs> | null
    /**
     * Filter, which Entitlement to fetch.
     */
    where: EntitlementWhereUniqueInput
  }

  /**
   * Entitlement findUniqueOrThrow
   */
  export type EntitlementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entitlement
     */
    select?: EntitlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entitlement
     */
    omit?: EntitlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntitlementInclude<ExtArgs> | null
    /**
     * Filter, which Entitlement to fetch.
     */
    where: EntitlementWhereUniqueInput
  }

  /**
   * Entitlement findFirst
   */
  export type EntitlementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entitlement
     */
    select?: EntitlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entitlement
     */
    omit?: EntitlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntitlementInclude<ExtArgs> | null
    /**
     * Filter, which Entitlement to fetch.
     */
    where?: EntitlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entitlements to fetch.
     */
    orderBy?: EntitlementOrderByWithRelationInput | EntitlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Entitlements.
     */
    cursor?: EntitlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entitlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entitlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Entitlements.
     */
    distinct?: EntitlementScalarFieldEnum | EntitlementScalarFieldEnum[]
  }

  /**
   * Entitlement findFirstOrThrow
   */
  export type EntitlementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entitlement
     */
    select?: EntitlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entitlement
     */
    omit?: EntitlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntitlementInclude<ExtArgs> | null
    /**
     * Filter, which Entitlement to fetch.
     */
    where?: EntitlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entitlements to fetch.
     */
    orderBy?: EntitlementOrderByWithRelationInput | EntitlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Entitlements.
     */
    cursor?: EntitlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entitlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entitlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Entitlements.
     */
    distinct?: EntitlementScalarFieldEnum | EntitlementScalarFieldEnum[]
  }

  /**
   * Entitlement findMany
   */
  export type EntitlementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entitlement
     */
    select?: EntitlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entitlement
     */
    omit?: EntitlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntitlementInclude<ExtArgs> | null
    /**
     * Filter, which Entitlements to fetch.
     */
    where?: EntitlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entitlements to fetch.
     */
    orderBy?: EntitlementOrderByWithRelationInput | EntitlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Entitlements.
     */
    cursor?: EntitlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entitlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entitlements.
     */
    skip?: number
    distinct?: EntitlementScalarFieldEnum | EntitlementScalarFieldEnum[]
  }

  /**
   * Entitlement create
   */
  export type EntitlementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entitlement
     */
    select?: EntitlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entitlement
     */
    omit?: EntitlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntitlementInclude<ExtArgs> | null
    /**
     * The data needed to create a Entitlement.
     */
    data: XOR<EntitlementCreateInput, EntitlementUncheckedCreateInput>
  }

  /**
   * Entitlement createMany
   */
  export type EntitlementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Entitlements.
     */
    data: EntitlementCreateManyInput | EntitlementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Entitlement createManyAndReturn
   */
  export type EntitlementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entitlement
     */
    select?: EntitlementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Entitlement
     */
    omit?: EntitlementOmit<ExtArgs> | null
    /**
     * The data used to create many Entitlements.
     */
    data: EntitlementCreateManyInput | EntitlementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntitlementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Entitlement update
   */
  export type EntitlementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entitlement
     */
    select?: EntitlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entitlement
     */
    omit?: EntitlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntitlementInclude<ExtArgs> | null
    /**
     * The data needed to update a Entitlement.
     */
    data: XOR<EntitlementUpdateInput, EntitlementUncheckedUpdateInput>
    /**
     * Choose, which Entitlement to update.
     */
    where: EntitlementWhereUniqueInput
  }

  /**
   * Entitlement updateMany
   */
  export type EntitlementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Entitlements.
     */
    data: XOR<EntitlementUpdateManyMutationInput, EntitlementUncheckedUpdateManyInput>
    /**
     * Filter which Entitlements to update
     */
    where?: EntitlementWhereInput
    /**
     * Limit how many Entitlements to update.
     */
    limit?: number
  }

  /**
   * Entitlement updateManyAndReturn
   */
  export type EntitlementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entitlement
     */
    select?: EntitlementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Entitlement
     */
    omit?: EntitlementOmit<ExtArgs> | null
    /**
     * The data used to update Entitlements.
     */
    data: XOR<EntitlementUpdateManyMutationInput, EntitlementUncheckedUpdateManyInput>
    /**
     * Filter which Entitlements to update
     */
    where?: EntitlementWhereInput
    /**
     * Limit how many Entitlements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntitlementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Entitlement upsert
   */
  export type EntitlementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entitlement
     */
    select?: EntitlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entitlement
     */
    omit?: EntitlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntitlementInclude<ExtArgs> | null
    /**
     * The filter to search for the Entitlement to update in case it exists.
     */
    where: EntitlementWhereUniqueInput
    /**
     * In case the Entitlement found by the `where` argument doesn't exist, create a new Entitlement with this data.
     */
    create: XOR<EntitlementCreateInput, EntitlementUncheckedCreateInput>
    /**
     * In case the Entitlement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EntitlementUpdateInput, EntitlementUncheckedUpdateInput>
  }

  /**
   * Entitlement delete
   */
  export type EntitlementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entitlement
     */
    select?: EntitlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entitlement
     */
    omit?: EntitlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntitlementInclude<ExtArgs> | null
    /**
     * Filter which Entitlement to delete.
     */
    where: EntitlementWhereUniqueInput
  }

  /**
   * Entitlement deleteMany
   */
  export type EntitlementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Entitlements to delete
     */
    where?: EntitlementWhereInput
    /**
     * Limit how many Entitlements to delete.
     */
    limit?: number
  }

  /**
   * Entitlement.user
   */
  export type Entitlement$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Entitlement without action
   */
  export type EntitlementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entitlement
     */
    select?: EntitlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entitlement
     */
    omit?: EntitlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntitlementInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    apiKeyHash: 'apiKeyHash',
    tier: 'tier',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    externalUserId: 'externalUserId',
    email: 'email',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TeamScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    name: 'name',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const TeamMembershipScalarFieldEnum: {
    id: 'id',
    teamId: 'teamId',
    userId: 'userId',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type TeamMembershipScalarFieldEnum = (typeof TeamMembershipScalarFieldEnum)[keyof typeof TeamMembershipScalarFieldEnum]


  export const CreditWalletScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    userId: 'userId',
    teamId: 'teamId',
    balance: 'balance',
    reservedBalance: 'reservedBalance',
    currency: 'currency',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CreditWalletScalarFieldEnum = (typeof CreditWalletScalarFieldEnum)[keyof typeof CreditWalletScalarFieldEnum]


  export const CreditTransactionScalarFieldEnum: {
    id: 'id',
    walletId: 'walletId',
    customerId: 'customerId',
    transactionType: 'transactionType',
    amount: 'amount',
    balanceBefore: 'balanceBefore',
    balanceAfter: 'balanceAfter',
    description: 'description',
    metadata: 'metadata',
    idempotencyKey: 'idempotencyKey',
    createdAt: 'createdAt'
  };

  export type CreditTransactionScalarFieldEnum = (typeof CreditTransactionScalarFieldEnum)[keyof typeof CreditTransactionScalarFieldEnum]


  export const BurnTableScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    name: 'name',
    version: 'version',
    rules: 'rules',
    isActive: 'isActive',
    validFrom: 'validFrom',
    validUntil: 'validUntil',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BurnTableScalarFieldEnum = (typeof BurnTableScalarFieldEnum)[keyof typeof BurnTableScalarFieldEnum]


  export const ProviderCostScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    model: 'model',
    costType: 'costType',
    costPerUnit: 'costPerUnit',
    unitSize: 'unitSize',
    currency: 'currency',
    validFrom: 'validFrom',
    validUntil: 'validUntil',
    createdAt: 'createdAt'
  };

  export type ProviderCostScalarFieldEnum = (typeof ProviderCostScalarFieldEnum)[keyof typeof ProviderCostScalarFieldEnum]


  export const UsageEventScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    userId: 'userId',
    teamId: 'teamId',
    eventType: 'eventType',
    featureId: 'featureId',
    provider: 'provider',
    model: 'model',
    inputTokens: 'inputTokens',
    outputTokens: 'outputTokens',
    creditsBurned: 'creditsBurned',
    costUsd: 'costUsd',
    metadata: 'metadata',
    idempotencyKey: 'idempotencyKey',
    timestamp: 'timestamp',
    createdAt: 'createdAt'
  };

  export type UsageEventScalarFieldEnum = (typeof UsageEventScalarFieldEnum)[keyof typeof UsageEventScalarFieldEnum]


  export const PlanScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    basePriceCents: 'basePriceCents',
    includedCredits: 'includedCredits',
    features: 'features',
    metadata: 'metadata',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlanScalarFieldEnum = (typeof PlanScalarFieldEnum)[keyof typeof PlanScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    planId: 'planId',
    status: 'status',
    billingPeriod: 'billingPeriod',
    currentPeriodStart: 'currentPeriodStart',
    currentPeriodEnd: 'currentPeriodEnd',
    cancelAtPeriodEnd: 'cancelAtPeriodEnd',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const EntitlementScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    userId: 'userId',
    featureId: 'featureId',
    limitType: 'limitType',
    limitValue: 'limitValue',
    period: 'period',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EntitlementScalarFieldEnum = (typeof EntitlementScalarFieldEnum)[keyof typeof EntitlementScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'CustomerTier'
   */
  export type EnumCustomerTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CustomerTier'>
    


  /**
   * Reference to a field of type 'CustomerTier[]'
   */
  export type ListEnumCustomerTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CustomerTier[]'>
    


  /**
   * Reference to a field of type 'CustomerStatus'
   */
  export type EnumCustomerStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CustomerStatus'>
    


  /**
   * Reference to a field of type 'CustomerStatus[]'
   */
  export type ListEnumCustomerStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CustomerStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'TeamRole'
   */
  export type EnumTeamRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TeamRole'>
    


  /**
   * Reference to a field of type 'TeamRole[]'
   */
  export type ListEnumTeamRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TeamRole[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ProviderName'
   */
  export type EnumProviderNameFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProviderName'>
    


  /**
   * Reference to a field of type 'ProviderName[]'
   */
  export type ListEnumProviderNameFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProviderName[]'>
    


  /**
   * Reference to a field of type 'CostType'
   */
  export type EnumCostTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CostType'>
    


  /**
   * Reference to a field of type 'CostType[]'
   */
  export type ListEnumCostTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CostType[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'EventType'
   */
  export type EnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType'>
    


  /**
   * Reference to a field of type 'EventType[]'
   */
  export type ListEnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType[]'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus'
   */
  export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus[]'
   */
  export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>
    


  /**
   * Reference to a field of type 'BillingPeriod'
   */
  export type EnumBillingPeriodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BillingPeriod'>
    


  /**
   * Reference to a field of type 'BillingPeriod[]'
   */
  export type ListEnumBillingPeriodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BillingPeriod[]'>
    


  /**
   * Reference to a field of type 'LimitType'
   */
  export type EnumLimitTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LimitType'>
    


  /**
   * Reference to a field of type 'LimitType[]'
   */
  export type ListEnumLimitTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LimitType[]'>
    


  /**
   * Reference to a field of type 'LimitPeriod'
   */
  export type EnumLimitPeriodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LimitPeriod'>
    


  /**
   * Reference to a field of type 'LimitPeriod[]'
   */
  export type ListEnumLimitPeriodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LimitPeriod[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    email?: StringFilter<"Customer"> | string
    apiKeyHash?: StringFilter<"Customer"> | string
    tier?: EnumCustomerTierFilter<"Customer"> | $Enums.CustomerTier
    status?: EnumCustomerStatusFilter<"Customer"> | $Enums.CustomerStatus
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    users?: UserListRelationFilter
    teams?: TeamListRelationFilter
    creditWallets?: CreditWalletListRelationFilter
    creditTransactions?: CreditTransactionListRelationFilter
    subscriptions?: SubscriptionListRelationFilter
    usageEvents?: UsageEventListRelationFilter
    burnTables?: BurnTableListRelationFilter
    entitlements?: EntitlementListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    apiKeyHash?: SortOrder
    tier?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    teams?: TeamOrderByRelationAggregateInput
    creditWallets?: CreditWalletOrderByRelationAggregateInput
    creditTransactions?: CreditTransactionOrderByRelationAggregateInput
    subscriptions?: SubscriptionOrderByRelationAggregateInput
    usageEvents?: UsageEventOrderByRelationAggregateInput
    burnTables?: BurnTableOrderByRelationAggregateInput
    entitlements?: EntitlementOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    name?: StringFilter<"Customer"> | string
    apiKeyHash?: StringFilter<"Customer"> | string
    tier?: EnumCustomerTierFilter<"Customer"> | $Enums.CustomerTier
    status?: EnumCustomerStatusFilter<"Customer"> | $Enums.CustomerStatus
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    users?: UserListRelationFilter
    teams?: TeamListRelationFilter
    creditWallets?: CreditWalletListRelationFilter
    creditTransactions?: CreditTransactionListRelationFilter
    subscriptions?: SubscriptionListRelationFilter
    usageEvents?: UsageEventListRelationFilter
    burnTables?: BurnTableListRelationFilter
    entitlements?: EntitlementListRelationFilter
  }, "id" | "email">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    apiKeyHash?: SortOrder
    tier?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    name?: StringWithAggregatesFilter<"Customer"> | string
    email?: StringWithAggregatesFilter<"Customer"> | string
    apiKeyHash?: StringWithAggregatesFilter<"Customer"> | string
    tier?: EnumCustomerTierWithAggregatesFilter<"Customer"> | $Enums.CustomerTier
    status?: EnumCustomerStatusWithAggregatesFilter<"Customer"> | $Enums.CustomerStatus
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    customerId?: StringFilter<"User"> | string
    externalUserId?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    metadata?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    creditWallets?: CreditWalletListRelationFilter
    teamMemberships?: TeamMembershipListRelationFilter
    entitlements?: EntitlementListRelationFilter
    usageEvents?: UsageEventListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    externalUserId?: SortOrder
    email?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    creditWallets?: CreditWalletOrderByRelationAggregateInput
    teamMemberships?: TeamMembershipOrderByRelationAggregateInput
    entitlements?: EntitlementOrderByRelationAggregateInput
    usageEvents?: UsageEventOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    customerId_externalUserId?: UserCustomerIdExternalUserIdCompoundUniqueInput
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    customerId?: StringFilter<"User"> | string
    externalUserId?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    metadata?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    creditWallets?: CreditWalletListRelationFilter
    teamMemberships?: TeamMembershipListRelationFilter
    entitlements?: EntitlementListRelationFilter
    usageEvents?: UsageEventListRelationFilter
  }, "id" | "customerId_externalUserId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    externalUserId?: SortOrder
    email?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    customerId?: StringWithAggregatesFilter<"User"> | string
    externalUserId?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"User">
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    id?: StringFilter<"Team"> | string
    customerId?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    metadata?: JsonNullableFilter<"Team">
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    creditWallets?: CreditWalletListRelationFilter
    memberships?: TeamMembershipListRelationFilter
    usageEvents?: UsageEventListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    name?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    creditWallets?: CreditWalletOrderByRelationAggregateInput
    memberships?: TeamMembershipOrderByRelationAggregateInput
    usageEvents?: UsageEventOrderByRelationAggregateInput
  }

  export type TeamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    customerId?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    metadata?: JsonNullableFilter<"Team">
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    creditWallets?: CreditWalletListRelationFilter
    memberships?: TeamMembershipListRelationFilter
    usageEvents?: UsageEventListRelationFilter
  }, "id">

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    name?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeamCountOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    OR?: TeamScalarWhereWithAggregatesInput[]
    NOT?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Team"> | string
    customerId?: StringWithAggregatesFilter<"Team"> | string
    name?: StringWithAggregatesFilter<"Team"> | string
    metadata?: JsonNullableWithAggregatesFilter<"Team">
    createdAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
  }

  export type TeamMembershipWhereInput = {
    AND?: TeamMembershipWhereInput | TeamMembershipWhereInput[]
    OR?: TeamMembershipWhereInput[]
    NOT?: TeamMembershipWhereInput | TeamMembershipWhereInput[]
    id?: StringFilter<"TeamMembership"> | string
    teamId?: StringFilter<"TeamMembership"> | string
    userId?: StringFilter<"TeamMembership"> | string
    role?: EnumTeamRoleFilter<"TeamMembership"> | $Enums.TeamRole
    createdAt?: DateTimeFilter<"TeamMembership"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TeamMembershipOrderByWithRelationInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    team?: TeamOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TeamMembershipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    teamId_userId?: TeamMembershipTeamIdUserIdCompoundUniqueInput
    AND?: TeamMembershipWhereInput | TeamMembershipWhereInput[]
    OR?: TeamMembershipWhereInput[]
    NOT?: TeamMembershipWhereInput | TeamMembershipWhereInput[]
    teamId?: StringFilter<"TeamMembership"> | string
    userId?: StringFilter<"TeamMembership"> | string
    role?: EnumTeamRoleFilter<"TeamMembership"> | $Enums.TeamRole
    createdAt?: DateTimeFilter<"TeamMembership"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "teamId_userId">

  export type TeamMembershipOrderByWithAggregationInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: TeamMembershipCountOrderByAggregateInput
    _max?: TeamMembershipMaxOrderByAggregateInput
    _min?: TeamMembershipMinOrderByAggregateInput
  }

  export type TeamMembershipScalarWhereWithAggregatesInput = {
    AND?: TeamMembershipScalarWhereWithAggregatesInput | TeamMembershipScalarWhereWithAggregatesInput[]
    OR?: TeamMembershipScalarWhereWithAggregatesInput[]
    NOT?: TeamMembershipScalarWhereWithAggregatesInput | TeamMembershipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TeamMembership"> | string
    teamId?: StringWithAggregatesFilter<"TeamMembership"> | string
    userId?: StringWithAggregatesFilter<"TeamMembership"> | string
    role?: EnumTeamRoleWithAggregatesFilter<"TeamMembership"> | $Enums.TeamRole
    createdAt?: DateTimeWithAggregatesFilter<"TeamMembership"> | Date | string
  }

  export type CreditWalletWhereInput = {
    AND?: CreditWalletWhereInput | CreditWalletWhereInput[]
    OR?: CreditWalletWhereInput[]
    NOT?: CreditWalletWhereInput | CreditWalletWhereInput[]
    id?: StringFilter<"CreditWallet"> | string
    customerId?: StringFilter<"CreditWallet"> | string
    userId?: StringNullableFilter<"CreditWallet"> | string | null
    teamId?: StringNullableFilter<"CreditWallet"> | string | null
    balance?: BigIntFilter<"CreditWallet"> | bigint | number
    reservedBalance?: BigIntFilter<"CreditWallet"> | bigint | number
    currency?: StringFilter<"CreditWallet"> | string
    expiresAt?: DateTimeNullableFilter<"CreditWallet"> | Date | string | null
    createdAt?: DateTimeFilter<"CreditWallet"> | Date | string
    updatedAt?: DateTimeFilter<"CreditWallet"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    transactions?: CreditTransactionListRelationFilter
  }

  export type CreditWalletOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrderInput | SortOrder
    teamId?: SortOrderInput | SortOrder
    balance?: SortOrder
    reservedBalance?: SortOrder
    currency?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    team?: TeamOrderByWithRelationInput
    transactions?: CreditTransactionOrderByRelationAggregateInput
  }

  export type CreditWalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CreditWalletWhereInput | CreditWalletWhereInput[]
    OR?: CreditWalletWhereInput[]
    NOT?: CreditWalletWhereInput | CreditWalletWhereInput[]
    customerId?: StringFilter<"CreditWallet"> | string
    userId?: StringNullableFilter<"CreditWallet"> | string | null
    teamId?: StringNullableFilter<"CreditWallet"> | string | null
    balance?: BigIntFilter<"CreditWallet"> | bigint | number
    reservedBalance?: BigIntFilter<"CreditWallet"> | bigint | number
    currency?: StringFilter<"CreditWallet"> | string
    expiresAt?: DateTimeNullableFilter<"CreditWallet"> | Date | string | null
    createdAt?: DateTimeFilter<"CreditWallet"> | Date | string
    updatedAt?: DateTimeFilter<"CreditWallet"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    transactions?: CreditTransactionListRelationFilter
  }, "id">

  export type CreditWalletOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrderInput | SortOrder
    teamId?: SortOrderInput | SortOrder
    balance?: SortOrder
    reservedBalance?: SortOrder
    currency?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CreditWalletCountOrderByAggregateInput
    _avg?: CreditWalletAvgOrderByAggregateInput
    _max?: CreditWalletMaxOrderByAggregateInput
    _min?: CreditWalletMinOrderByAggregateInput
    _sum?: CreditWalletSumOrderByAggregateInput
  }

  export type CreditWalletScalarWhereWithAggregatesInput = {
    AND?: CreditWalletScalarWhereWithAggregatesInput | CreditWalletScalarWhereWithAggregatesInput[]
    OR?: CreditWalletScalarWhereWithAggregatesInput[]
    NOT?: CreditWalletScalarWhereWithAggregatesInput | CreditWalletScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreditWallet"> | string
    customerId?: StringWithAggregatesFilter<"CreditWallet"> | string
    userId?: StringNullableWithAggregatesFilter<"CreditWallet"> | string | null
    teamId?: StringNullableWithAggregatesFilter<"CreditWallet"> | string | null
    balance?: BigIntWithAggregatesFilter<"CreditWallet"> | bigint | number
    reservedBalance?: BigIntWithAggregatesFilter<"CreditWallet"> | bigint | number
    currency?: StringWithAggregatesFilter<"CreditWallet"> | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"CreditWallet"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CreditWallet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CreditWallet"> | Date | string
  }

  export type CreditTransactionWhereInput = {
    AND?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    OR?: CreditTransactionWhereInput[]
    NOT?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    id?: StringFilter<"CreditTransaction"> | string
    walletId?: StringFilter<"CreditTransaction"> | string
    customerId?: StringFilter<"CreditTransaction"> | string
    transactionType?: EnumTransactionTypeFilter<"CreditTransaction"> | $Enums.TransactionType
    amount?: BigIntFilter<"CreditTransaction"> | bigint | number
    balanceBefore?: BigIntFilter<"CreditTransaction"> | bigint | number
    balanceAfter?: BigIntFilter<"CreditTransaction"> | bigint | number
    description?: StringNullableFilter<"CreditTransaction"> | string | null
    metadata?: JsonNullableFilter<"CreditTransaction">
    idempotencyKey?: StringNullableFilter<"CreditTransaction"> | string | null
    createdAt?: DateTimeFilter<"CreditTransaction"> | Date | string
    wallet?: XOR<CreditWalletScalarRelationFilter, CreditWalletWhereInput>
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }

  export type CreditTransactionOrderByWithRelationInput = {
    id?: SortOrder
    walletId?: SortOrder
    customerId?: SortOrder
    transactionType?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    wallet?: CreditWalletOrderByWithRelationInput
    customer?: CustomerOrderByWithRelationInput
  }

  export type CreditTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    AND?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    OR?: CreditTransactionWhereInput[]
    NOT?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    walletId?: StringFilter<"CreditTransaction"> | string
    customerId?: StringFilter<"CreditTransaction"> | string
    transactionType?: EnumTransactionTypeFilter<"CreditTransaction"> | $Enums.TransactionType
    amount?: BigIntFilter<"CreditTransaction"> | bigint | number
    balanceBefore?: BigIntFilter<"CreditTransaction"> | bigint | number
    balanceAfter?: BigIntFilter<"CreditTransaction"> | bigint | number
    description?: StringNullableFilter<"CreditTransaction"> | string | null
    metadata?: JsonNullableFilter<"CreditTransaction">
    createdAt?: DateTimeFilter<"CreditTransaction"> | Date | string
    wallet?: XOR<CreditWalletScalarRelationFilter, CreditWalletWhereInput>
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }, "id" | "idempotencyKey">

  export type CreditTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    walletId?: SortOrder
    customerId?: SortOrder
    transactionType?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CreditTransactionCountOrderByAggregateInput
    _avg?: CreditTransactionAvgOrderByAggregateInput
    _max?: CreditTransactionMaxOrderByAggregateInput
    _min?: CreditTransactionMinOrderByAggregateInput
    _sum?: CreditTransactionSumOrderByAggregateInput
  }

  export type CreditTransactionScalarWhereWithAggregatesInput = {
    AND?: CreditTransactionScalarWhereWithAggregatesInput | CreditTransactionScalarWhereWithAggregatesInput[]
    OR?: CreditTransactionScalarWhereWithAggregatesInput[]
    NOT?: CreditTransactionScalarWhereWithAggregatesInput | CreditTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreditTransaction"> | string
    walletId?: StringWithAggregatesFilter<"CreditTransaction"> | string
    customerId?: StringWithAggregatesFilter<"CreditTransaction"> | string
    transactionType?: EnumTransactionTypeWithAggregatesFilter<"CreditTransaction"> | $Enums.TransactionType
    amount?: BigIntWithAggregatesFilter<"CreditTransaction"> | bigint | number
    balanceBefore?: BigIntWithAggregatesFilter<"CreditTransaction"> | bigint | number
    balanceAfter?: BigIntWithAggregatesFilter<"CreditTransaction"> | bigint | number
    description?: StringNullableWithAggregatesFilter<"CreditTransaction"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"CreditTransaction">
    idempotencyKey?: StringNullableWithAggregatesFilter<"CreditTransaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CreditTransaction"> | Date | string
  }

  export type BurnTableWhereInput = {
    AND?: BurnTableWhereInput | BurnTableWhereInput[]
    OR?: BurnTableWhereInput[]
    NOT?: BurnTableWhereInput | BurnTableWhereInput[]
    id?: StringFilter<"BurnTable"> | string
    customerId?: StringNullableFilter<"BurnTable"> | string | null
    name?: StringFilter<"BurnTable"> | string
    version?: IntFilter<"BurnTable"> | number
    rules?: JsonFilter<"BurnTable">
    isActive?: BoolFilter<"BurnTable"> | boolean
    validFrom?: DateTimeFilter<"BurnTable"> | Date | string
    validUntil?: DateTimeNullableFilter<"BurnTable"> | Date | string | null
    createdAt?: DateTimeFilter<"BurnTable"> | Date | string
    updatedAt?: DateTimeFilter<"BurnTable"> | Date | string
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }

  export type BurnTableOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    name?: SortOrder
    version?: SortOrder
    rules?: SortOrder
    isActive?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type BurnTableWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BurnTableWhereInput | BurnTableWhereInput[]
    OR?: BurnTableWhereInput[]
    NOT?: BurnTableWhereInput | BurnTableWhereInput[]
    customerId?: StringNullableFilter<"BurnTable"> | string | null
    name?: StringFilter<"BurnTable"> | string
    version?: IntFilter<"BurnTable"> | number
    rules?: JsonFilter<"BurnTable">
    isActive?: BoolFilter<"BurnTable"> | boolean
    validFrom?: DateTimeFilter<"BurnTable"> | Date | string
    validUntil?: DateTimeNullableFilter<"BurnTable"> | Date | string | null
    createdAt?: DateTimeFilter<"BurnTable"> | Date | string
    updatedAt?: DateTimeFilter<"BurnTable"> | Date | string
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }, "id">

  export type BurnTableOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    name?: SortOrder
    version?: SortOrder
    rules?: SortOrder
    isActive?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BurnTableCountOrderByAggregateInput
    _avg?: BurnTableAvgOrderByAggregateInput
    _max?: BurnTableMaxOrderByAggregateInput
    _min?: BurnTableMinOrderByAggregateInput
    _sum?: BurnTableSumOrderByAggregateInput
  }

  export type BurnTableScalarWhereWithAggregatesInput = {
    AND?: BurnTableScalarWhereWithAggregatesInput | BurnTableScalarWhereWithAggregatesInput[]
    OR?: BurnTableScalarWhereWithAggregatesInput[]
    NOT?: BurnTableScalarWhereWithAggregatesInput | BurnTableScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BurnTable"> | string
    customerId?: StringNullableWithAggregatesFilter<"BurnTable"> | string | null
    name?: StringWithAggregatesFilter<"BurnTable"> | string
    version?: IntWithAggregatesFilter<"BurnTable"> | number
    rules?: JsonWithAggregatesFilter<"BurnTable">
    isActive?: BoolWithAggregatesFilter<"BurnTable"> | boolean
    validFrom?: DateTimeWithAggregatesFilter<"BurnTable"> | Date | string
    validUntil?: DateTimeNullableWithAggregatesFilter<"BurnTable"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BurnTable"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BurnTable"> | Date | string
  }

  export type ProviderCostWhereInput = {
    AND?: ProviderCostWhereInput | ProviderCostWhereInput[]
    OR?: ProviderCostWhereInput[]
    NOT?: ProviderCostWhereInput | ProviderCostWhereInput[]
    id?: StringFilter<"ProviderCost"> | string
    provider?: EnumProviderNameFilter<"ProviderCost"> | $Enums.ProviderName
    model?: StringFilter<"ProviderCost"> | string
    costType?: EnumCostTypeFilter<"ProviderCost"> | $Enums.CostType
    costPerUnit?: DecimalFilter<"ProviderCost"> | Decimal | DecimalJsLike | number | string
    unitSize?: IntFilter<"ProviderCost"> | number
    currency?: StringFilter<"ProviderCost"> | string
    validFrom?: DateTimeFilter<"ProviderCost"> | Date | string
    validUntil?: DateTimeNullableFilter<"ProviderCost"> | Date | string | null
    createdAt?: DateTimeFilter<"ProviderCost"> | Date | string
  }

  export type ProviderCostOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    costType?: SortOrder
    costPerUnit?: SortOrder
    unitSize?: SortOrder
    currency?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type ProviderCostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProviderCostWhereInput | ProviderCostWhereInput[]
    OR?: ProviderCostWhereInput[]
    NOT?: ProviderCostWhereInput | ProviderCostWhereInput[]
    provider?: EnumProviderNameFilter<"ProviderCost"> | $Enums.ProviderName
    model?: StringFilter<"ProviderCost"> | string
    costType?: EnumCostTypeFilter<"ProviderCost"> | $Enums.CostType
    costPerUnit?: DecimalFilter<"ProviderCost"> | Decimal | DecimalJsLike | number | string
    unitSize?: IntFilter<"ProviderCost"> | number
    currency?: StringFilter<"ProviderCost"> | string
    validFrom?: DateTimeFilter<"ProviderCost"> | Date | string
    validUntil?: DateTimeNullableFilter<"ProviderCost"> | Date | string | null
    createdAt?: DateTimeFilter<"ProviderCost"> | Date | string
  }, "id">

  export type ProviderCostOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    costType?: SortOrder
    costPerUnit?: SortOrder
    unitSize?: SortOrder
    currency?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ProviderCostCountOrderByAggregateInput
    _avg?: ProviderCostAvgOrderByAggregateInput
    _max?: ProviderCostMaxOrderByAggregateInput
    _min?: ProviderCostMinOrderByAggregateInput
    _sum?: ProviderCostSumOrderByAggregateInput
  }

  export type ProviderCostScalarWhereWithAggregatesInput = {
    AND?: ProviderCostScalarWhereWithAggregatesInput | ProviderCostScalarWhereWithAggregatesInput[]
    OR?: ProviderCostScalarWhereWithAggregatesInput[]
    NOT?: ProviderCostScalarWhereWithAggregatesInput | ProviderCostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProviderCost"> | string
    provider?: EnumProviderNameWithAggregatesFilter<"ProviderCost"> | $Enums.ProviderName
    model?: StringWithAggregatesFilter<"ProviderCost"> | string
    costType?: EnumCostTypeWithAggregatesFilter<"ProviderCost"> | $Enums.CostType
    costPerUnit?: DecimalWithAggregatesFilter<"ProviderCost"> | Decimal | DecimalJsLike | number | string
    unitSize?: IntWithAggregatesFilter<"ProviderCost"> | number
    currency?: StringWithAggregatesFilter<"ProviderCost"> | string
    validFrom?: DateTimeWithAggregatesFilter<"ProviderCost"> | Date | string
    validUntil?: DateTimeNullableWithAggregatesFilter<"ProviderCost"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProviderCost"> | Date | string
  }

  export type UsageEventWhereInput = {
    AND?: UsageEventWhereInput | UsageEventWhereInput[]
    OR?: UsageEventWhereInput[]
    NOT?: UsageEventWhereInput | UsageEventWhereInput[]
    id?: StringFilter<"UsageEvent"> | string
    customerId?: StringFilter<"UsageEvent"> | string
    userId?: StringNullableFilter<"UsageEvent"> | string | null
    teamId?: StringNullableFilter<"UsageEvent"> | string | null
    eventType?: EnumEventTypeFilter<"UsageEvent"> | $Enums.EventType
    featureId?: StringFilter<"UsageEvent"> | string
    provider?: EnumProviderNameNullableFilter<"UsageEvent"> | $Enums.ProviderName | null
    model?: StringNullableFilter<"UsageEvent"> | string | null
    inputTokens?: BigIntNullableFilter<"UsageEvent"> | bigint | number | null
    outputTokens?: BigIntNullableFilter<"UsageEvent"> | bigint | number | null
    creditsBurned?: BigIntFilter<"UsageEvent"> | bigint | number
    costUsd?: DecimalNullableFilter<"UsageEvent"> | Decimal | DecimalJsLike | number | string | null
    metadata?: JsonNullableFilter<"UsageEvent">
    idempotencyKey?: StringNullableFilter<"UsageEvent"> | string | null
    timestamp?: DateTimeFilter<"UsageEvent"> | Date | string
    createdAt?: DateTimeFilter<"UsageEvent"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
  }

  export type UsageEventOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrderInput | SortOrder
    teamId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    featureId?: SortOrder
    provider?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    inputTokens?: SortOrderInput | SortOrder
    outputTokens?: SortOrderInput | SortOrder
    creditsBurned?: SortOrder
    costUsd?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    team?: TeamOrderByWithRelationInput
  }

  export type UsageEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    AND?: UsageEventWhereInput | UsageEventWhereInput[]
    OR?: UsageEventWhereInput[]
    NOT?: UsageEventWhereInput | UsageEventWhereInput[]
    customerId?: StringFilter<"UsageEvent"> | string
    userId?: StringNullableFilter<"UsageEvent"> | string | null
    teamId?: StringNullableFilter<"UsageEvent"> | string | null
    eventType?: EnumEventTypeFilter<"UsageEvent"> | $Enums.EventType
    featureId?: StringFilter<"UsageEvent"> | string
    provider?: EnumProviderNameNullableFilter<"UsageEvent"> | $Enums.ProviderName | null
    model?: StringNullableFilter<"UsageEvent"> | string | null
    inputTokens?: BigIntNullableFilter<"UsageEvent"> | bigint | number | null
    outputTokens?: BigIntNullableFilter<"UsageEvent"> | bigint | number | null
    creditsBurned?: BigIntFilter<"UsageEvent"> | bigint | number
    costUsd?: DecimalNullableFilter<"UsageEvent"> | Decimal | DecimalJsLike | number | string | null
    metadata?: JsonNullableFilter<"UsageEvent">
    timestamp?: DateTimeFilter<"UsageEvent"> | Date | string
    createdAt?: DateTimeFilter<"UsageEvent"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
  }, "id" | "idempotencyKey">

  export type UsageEventOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrderInput | SortOrder
    teamId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    featureId?: SortOrder
    provider?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    inputTokens?: SortOrderInput | SortOrder
    outputTokens?: SortOrderInput | SortOrder
    creditsBurned?: SortOrder
    costUsd?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    _count?: UsageEventCountOrderByAggregateInput
    _avg?: UsageEventAvgOrderByAggregateInput
    _max?: UsageEventMaxOrderByAggregateInput
    _min?: UsageEventMinOrderByAggregateInput
    _sum?: UsageEventSumOrderByAggregateInput
  }

  export type UsageEventScalarWhereWithAggregatesInput = {
    AND?: UsageEventScalarWhereWithAggregatesInput | UsageEventScalarWhereWithAggregatesInput[]
    OR?: UsageEventScalarWhereWithAggregatesInput[]
    NOT?: UsageEventScalarWhereWithAggregatesInput | UsageEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UsageEvent"> | string
    customerId?: StringWithAggregatesFilter<"UsageEvent"> | string
    userId?: StringNullableWithAggregatesFilter<"UsageEvent"> | string | null
    teamId?: StringNullableWithAggregatesFilter<"UsageEvent"> | string | null
    eventType?: EnumEventTypeWithAggregatesFilter<"UsageEvent"> | $Enums.EventType
    featureId?: StringWithAggregatesFilter<"UsageEvent"> | string
    provider?: EnumProviderNameNullableWithAggregatesFilter<"UsageEvent"> | $Enums.ProviderName | null
    model?: StringNullableWithAggregatesFilter<"UsageEvent"> | string | null
    inputTokens?: BigIntNullableWithAggregatesFilter<"UsageEvent"> | bigint | number | null
    outputTokens?: BigIntNullableWithAggregatesFilter<"UsageEvent"> | bigint | number | null
    creditsBurned?: BigIntWithAggregatesFilter<"UsageEvent"> | bigint | number
    costUsd?: DecimalNullableWithAggregatesFilter<"UsageEvent"> | Decimal | DecimalJsLike | number | string | null
    metadata?: JsonNullableWithAggregatesFilter<"UsageEvent">
    idempotencyKey?: StringNullableWithAggregatesFilter<"UsageEvent"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"UsageEvent"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"UsageEvent"> | Date | string
  }

  export type PlanWhereInput = {
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    id?: StringFilter<"Plan"> | string
    name?: StringFilter<"Plan"> | string
    description?: StringNullableFilter<"Plan"> | string | null
    basePriceCents?: BigIntNullableFilter<"Plan"> | bigint | number | null
    includedCredits?: BigIntNullableFilter<"Plan"> | bigint | number | null
    features?: JsonNullableFilter<"Plan">
    metadata?: JsonNullableFilter<"Plan">
    isActive?: BoolFilter<"Plan"> | boolean
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    subscriptions?: SubscriptionListRelationFilter
  }

  export type PlanOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    basePriceCents?: SortOrderInput | SortOrder
    includedCredits?: SortOrderInput | SortOrder
    features?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptions?: SubscriptionOrderByRelationAggregateInput
  }

  export type PlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    name?: StringFilter<"Plan"> | string
    description?: StringNullableFilter<"Plan"> | string | null
    basePriceCents?: BigIntNullableFilter<"Plan"> | bigint | number | null
    includedCredits?: BigIntNullableFilter<"Plan"> | bigint | number | null
    features?: JsonNullableFilter<"Plan">
    metadata?: JsonNullableFilter<"Plan">
    isActive?: BoolFilter<"Plan"> | boolean
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    subscriptions?: SubscriptionListRelationFilter
  }, "id">

  export type PlanOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    basePriceCents?: SortOrderInput | SortOrder
    includedCredits?: SortOrderInput | SortOrder
    features?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlanCountOrderByAggregateInput
    _avg?: PlanAvgOrderByAggregateInput
    _max?: PlanMaxOrderByAggregateInput
    _min?: PlanMinOrderByAggregateInput
    _sum?: PlanSumOrderByAggregateInput
  }

  export type PlanScalarWhereWithAggregatesInput = {
    AND?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    OR?: PlanScalarWhereWithAggregatesInput[]
    NOT?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Plan"> | string
    name?: StringWithAggregatesFilter<"Plan"> | string
    description?: StringNullableWithAggregatesFilter<"Plan"> | string | null
    basePriceCents?: BigIntNullableWithAggregatesFilter<"Plan"> | bigint | number | null
    includedCredits?: BigIntNullableWithAggregatesFilter<"Plan"> | bigint | number | null
    features?: JsonNullableWithAggregatesFilter<"Plan">
    metadata?: JsonNullableWithAggregatesFilter<"Plan">
    isActive?: BoolWithAggregatesFilter<"Plan"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    customerId?: StringFilter<"Subscription"> | string
    planId?: StringFilter<"Subscription"> | string
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    billingPeriod?: EnumBillingPeriodNullableFilter<"Subscription"> | $Enums.BillingPeriod | null
    currentPeriodStart?: DateTimeFilter<"Subscription"> | Date | string
    currentPeriodEnd?: DateTimeFilter<"Subscription"> | Date | string
    cancelAtPeriodEnd?: BoolFilter<"Subscription"> | boolean
    metadata?: JsonNullableFilter<"Subscription">
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    planId?: SortOrder
    status?: SortOrder
    billingPeriod?: SortOrderInput | SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    plan?: PlanOrderByWithRelationInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    customerId?: StringFilter<"Subscription"> | string
    planId?: StringFilter<"Subscription"> | string
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    billingPeriod?: EnumBillingPeriodNullableFilter<"Subscription"> | $Enums.BillingPeriod | null
    currentPeriodStart?: DateTimeFilter<"Subscription"> | Date | string
    currentPeriodEnd?: DateTimeFilter<"Subscription"> | Date | string
    cancelAtPeriodEnd?: BoolFilter<"Subscription"> | boolean
    metadata?: JsonNullableFilter<"Subscription">
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
  }, "id">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    planId?: SortOrder
    status?: SortOrder
    billingPeriod?: SortOrderInput | SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscription"> | string
    customerId?: StringWithAggregatesFilter<"Subscription"> | string
    planId?: StringWithAggregatesFilter<"Subscription"> | string
    status?: EnumSubscriptionStatusWithAggregatesFilter<"Subscription"> | $Enums.SubscriptionStatus
    billingPeriod?: EnumBillingPeriodNullableWithAggregatesFilter<"Subscription"> | $Enums.BillingPeriod | null
    currentPeriodStart?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    currentPeriodEnd?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    cancelAtPeriodEnd?: BoolWithAggregatesFilter<"Subscription"> | boolean
    metadata?: JsonNullableWithAggregatesFilter<"Subscription">
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
  }

  export type EntitlementWhereInput = {
    AND?: EntitlementWhereInput | EntitlementWhereInput[]
    OR?: EntitlementWhereInput[]
    NOT?: EntitlementWhereInput | EntitlementWhereInput[]
    id?: StringFilter<"Entitlement"> | string
    customerId?: StringFilter<"Entitlement"> | string
    userId?: StringNullableFilter<"Entitlement"> | string | null
    featureId?: StringFilter<"Entitlement"> | string
    limitType?: EnumLimitTypeNullableFilter<"Entitlement"> | $Enums.LimitType | null
    limitValue?: BigIntNullableFilter<"Entitlement"> | bigint | number | null
    period?: EnumLimitPeriodNullableFilter<"Entitlement"> | $Enums.LimitPeriod | null
    metadata?: JsonNullableFilter<"Entitlement">
    createdAt?: DateTimeFilter<"Entitlement"> | Date | string
    updatedAt?: DateTimeFilter<"Entitlement"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type EntitlementOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrderInput | SortOrder
    featureId?: SortOrder
    limitType?: SortOrderInput | SortOrder
    limitValue?: SortOrderInput | SortOrder
    period?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type EntitlementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EntitlementWhereInput | EntitlementWhereInput[]
    OR?: EntitlementWhereInput[]
    NOT?: EntitlementWhereInput | EntitlementWhereInput[]
    customerId?: StringFilter<"Entitlement"> | string
    userId?: StringNullableFilter<"Entitlement"> | string | null
    featureId?: StringFilter<"Entitlement"> | string
    limitType?: EnumLimitTypeNullableFilter<"Entitlement"> | $Enums.LimitType | null
    limitValue?: BigIntNullableFilter<"Entitlement"> | bigint | number | null
    period?: EnumLimitPeriodNullableFilter<"Entitlement"> | $Enums.LimitPeriod | null
    metadata?: JsonNullableFilter<"Entitlement">
    createdAt?: DateTimeFilter<"Entitlement"> | Date | string
    updatedAt?: DateTimeFilter<"Entitlement"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type EntitlementOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrderInput | SortOrder
    featureId?: SortOrder
    limitType?: SortOrderInput | SortOrder
    limitValue?: SortOrderInput | SortOrder
    period?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EntitlementCountOrderByAggregateInput
    _avg?: EntitlementAvgOrderByAggregateInput
    _max?: EntitlementMaxOrderByAggregateInput
    _min?: EntitlementMinOrderByAggregateInput
    _sum?: EntitlementSumOrderByAggregateInput
  }

  export type EntitlementScalarWhereWithAggregatesInput = {
    AND?: EntitlementScalarWhereWithAggregatesInput | EntitlementScalarWhereWithAggregatesInput[]
    OR?: EntitlementScalarWhereWithAggregatesInput[]
    NOT?: EntitlementScalarWhereWithAggregatesInput | EntitlementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Entitlement"> | string
    customerId?: StringWithAggregatesFilter<"Entitlement"> | string
    userId?: StringNullableWithAggregatesFilter<"Entitlement"> | string | null
    featureId?: StringWithAggregatesFilter<"Entitlement"> | string
    limitType?: EnumLimitTypeNullableWithAggregatesFilter<"Entitlement"> | $Enums.LimitType | null
    limitValue?: BigIntNullableWithAggregatesFilter<"Entitlement"> | bigint | number | null
    period?: EnumLimitPeriodNullableWithAggregatesFilter<"Entitlement"> | $Enums.LimitPeriod | null
    metadata?: JsonNullableWithAggregatesFilter<"Entitlement">
    createdAt?: DateTimeWithAggregatesFilter<"Entitlement"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Entitlement"> | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCustomerInput
    teams?: TeamCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCustomerInput
    teams?: TeamUncheckedCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableUncheckedCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCustomerNestedInput
    teams?: TeamUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCustomerNestedInput
    teams?: TeamUncheckedUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUncheckedUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    externalUserId: string
    email?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutUsersInput
    creditWallets?: CreditWalletCreateNestedManyWithoutUserInput
    teamMemberships?: TeamMembershipCreateNestedManyWithoutUserInput
    entitlements?: EntitlementCreateNestedManyWithoutUserInput
    usageEvents?: UsageEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    customerId: string
    externalUserId: string
    email?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutUserInput
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutUserInput
    entitlements?: EntitlementUncheckedCreateNestedManyWithoutUserInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutUsersNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutUserNestedInput
    teamMemberships?: TeamMembershipUpdateManyWithoutUserNestedInput
    entitlements?: EntitlementUpdateManyWithoutUserNestedInput
    usageEvents?: UsageEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutUserNestedInput
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutUserNestedInput
    entitlements?: EntitlementUncheckedUpdateManyWithoutUserNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    customerId: string
    externalUserId: string
    email?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamCreateInput = {
    id?: string
    name: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutTeamsInput
    creditWallets?: CreditWalletCreateNestedManyWithoutTeamInput
    memberships?: TeamMembershipCreateNestedManyWithoutTeamInput
    usageEvents?: UsageEventCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateInput = {
    id?: string
    customerId: string
    name: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutTeamInput
    memberships?: TeamMembershipUncheckedCreateNestedManyWithoutTeamInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutTeamsNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutTeamNestedInput
    memberships?: TeamMembershipUpdateManyWithoutTeamNestedInput
    usageEvents?: UsageEventUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutTeamNestedInput
    memberships?: TeamMembershipUncheckedUpdateManyWithoutTeamNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamCreateManyInput = {
    id?: string
    customerId: string
    name: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMembershipCreateInput = {
    id?: string
    role?: $Enums.TeamRole
    createdAt?: Date | string
    team: TeamCreateNestedOneWithoutMembershipsInput
    user: UserCreateNestedOneWithoutTeamMembershipsInput
  }

  export type TeamMembershipUncheckedCreateInput = {
    id?: string
    teamId: string
    userId: string
    role?: $Enums.TeamRole
    createdAt?: Date | string
  }

  export type TeamMembershipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutMembershipsNestedInput
    user?: UserUpdateOneRequiredWithoutTeamMembershipsNestedInput
  }

  export type TeamMembershipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMembershipCreateManyInput = {
    id?: string
    teamId: string
    userId: string
    role?: $Enums.TeamRole
    createdAt?: Date | string
  }

  export type TeamMembershipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMembershipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditWalletCreateInput = {
    id?: string
    balance?: bigint | number
    reservedBalance?: bigint | number
    currency?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCreditWalletsInput
    user?: UserCreateNestedOneWithoutCreditWalletsInput
    team?: TeamCreateNestedOneWithoutCreditWalletsInput
    transactions?: CreditTransactionCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletUncheckedCreateInput = {
    id?: string
    customerId: string
    userId?: string | null
    teamId?: string | null
    balance?: bigint | number
    reservedBalance?: bigint | number
    currency?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: CreditTransactionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCreditWalletsNestedInput
    user?: UserUpdateOneWithoutCreditWalletsNestedInput
    team?: TeamUpdateOneWithoutCreditWalletsNestedInput
    transactions?: CreditTransactionUpdateManyWithoutWalletNestedInput
  }

  export type CreditWalletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: CreditTransactionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type CreditWalletCreateManyInput = {
    id?: string
    customerId: string
    userId?: string | null
    teamId?: string | null
    balance?: bigint | number
    reservedBalance?: bigint | number
    currency?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditWalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditWalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionCreateInput = {
    id?: string
    transactionType: $Enums.TransactionType
    amount: bigint | number
    balanceBefore: bigint | number
    balanceAfter: bigint | number
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    createdAt?: Date | string
    wallet: CreditWalletCreateNestedOneWithoutTransactionsInput
    customer: CustomerCreateNestedOneWithoutCreditTransactionsInput
  }

  export type CreditTransactionUncheckedCreateInput = {
    id?: string
    walletId: string
    customerId: string
    transactionType: $Enums.TransactionType
    amount: bigint | number
    balanceBefore: bigint | number
    balanceAfter: bigint | number
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    createdAt?: Date | string
  }

  export type CreditTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionType?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBefore?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfter?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: CreditWalletUpdateOneRequiredWithoutTransactionsNestedInput
    customer?: CustomerUpdateOneRequiredWithoutCreditTransactionsNestedInput
  }

  export type CreditTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    transactionType?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBefore?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfter?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionCreateManyInput = {
    id?: string
    walletId: string
    customerId: string
    transactionType: $Enums.TransactionType
    amount: bigint | number
    balanceBefore: bigint | number
    balanceAfter: bigint | number
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    createdAt?: Date | string
  }

  export type CreditTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionType?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBefore?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfter?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    transactionType?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBefore?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfter?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BurnTableCreateInput = {
    id?: string
    name: string
    version?: number
    rules: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    validFrom?: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutBurnTablesInput
  }

  export type BurnTableUncheckedCreateInput = {
    id?: string
    customerId?: string | null
    name: string
    version?: number
    rules: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    validFrom?: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BurnTableUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    rules?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutBurnTablesNestedInput
  }

  export type BurnTableUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    rules?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BurnTableCreateManyInput = {
    id?: string
    customerId?: string | null
    name: string
    version?: number
    rules: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    validFrom?: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BurnTableUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    rules?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BurnTableUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    rules?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderCostCreateInput = {
    id?: string
    provider: $Enums.ProviderName
    model: string
    costType: $Enums.CostType
    costPerUnit: Decimal | DecimalJsLike | number | string
    unitSize?: number
    currency?: string
    validFrom?: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
  }

  export type ProviderCostUncheckedCreateInput = {
    id?: string
    provider: $Enums.ProviderName
    model: string
    costType: $Enums.CostType
    costPerUnit: Decimal | DecimalJsLike | number | string
    unitSize?: number
    currency?: string
    validFrom?: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
  }

  export type ProviderCostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName
    model?: StringFieldUpdateOperationsInput | string
    costType?: EnumCostTypeFieldUpdateOperationsInput | $Enums.CostType
    costPerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitSize?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderCostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName
    model?: StringFieldUpdateOperationsInput | string
    costType?: EnumCostTypeFieldUpdateOperationsInput | $Enums.CostType
    costPerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitSize?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderCostCreateManyInput = {
    id?: string
    provider: $Enums.ProviderName
    model: string
    costType: $Enums.CostType
    costPerUnit: Decimal | DecimalJsLike | number | string
    unitSize?: number
    currency?: string
    validFrom?: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
  }

  export type ProviderCostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName
    model?: StringFieldUpdateOperationsInput | string
    costType?: EnumCostTypeFieldUpdateOperationsInput | $Enums.CostType
    costPerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitSize?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderCostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName
    model?: StringFieldUpdateOperationsInput | string
    costType?: EnumCostTypeFieldUpdateOperationsInput | $Enums.CostType
    costPerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitSize?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageEventCreateInput = {
    id?: string
    eventType: $Enums.EventType
    featureId: string
    provider?: $Enums.ProviderName | null
    model?: string | null
    inputTokens?: bigint | number | null
    outputTokens?: bigint | number | null
    creditsBurned: bigint | number
    costUsd?: Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    timestamp?: Date | string
    createdAt?: Date | string
    customer: CustomerCreateNestedOneWithoutUsageEventsInput
    user?: UserCreateNestedOneWithoutUsageEventsInput
    team?: TeamCreateNestedOneWithoutUsageEventsInput
  }

  export type UsageEventUncheckedCreateInput = {
    id?: string
    customerId: string
    userId?: string | null
    teamId?: string | null
    eventType: $Enums.EventType
    featureId: string
    provider?: $Enums.ProviderName | null
    model?: string | null
    inputTokens?: bigint | number | null
    outputTokens?: bigint | number | null
    creditsBurned: bigint | number
    costUsd?: Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type UsageEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    featureId?: StringFieldUpdateOperationsInput | string
    provider?: NullableEnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    outputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creditsBurned?: BigIntFieldUpdateOperationsInput | bigint | number
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutUsageEventsNestedInput
    user?: UserUpdateOneWithoutUsageEventsNestedInput
    team?: TeamUpdateOneWithoutUsageEventsNestedInput
  }

  export type UsageEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    featureId?: StringFieldUpdateOperationsInput | string
    provider?: NullableEnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    outputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creditsBurned?: BigIntFieldUpdateOperationsInput | bigint | number
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageEventCreateManyInput = {
    id?: string
    customerId: string
    userId?: string | null
    teamId?: string | null
    eventType: $Enums.EventType
    featureId: string
    provider?: $Enums.ProviderName | null
    model?: string | null
    inputTokens?: bigint | number | null
    outputTokens?: bigint | number | null
    creditsBurned: bigint | number
    costUsd?: Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type UsageEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    featureId?: StringFieldUpdateOperationsInput | string
    provider?: NullableEnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    outputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creditsBurned?: BigIntFieldUpdateOperationsInput | bigint | number
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    featureId?: StringFieldUpdateOperationsInput | string
    provider?: NullableEnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    outputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creditsBurned?: BigIntFieldUpdateOperationsInput | bigint | number
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanCreateInput = {
    id?: string
    name: string
    description?: string | null
    basePriceCents?: bigint | number | null
    includedCredits?: bigint | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    basePriceCents?: bigint | number | null
    includedCredits?: bigint | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePriceCents?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    includedCredits?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePriceCents?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    includedCredits?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type PlanCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    basePriceCents?: bigint | number | null
    includedCredits?: bigint | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePriceCents?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    includedCredits?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePriceCents?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    includedCredits?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateInput = {
    id?: string
    status: $Enums.SubscriptionStatus
    billingPeriod?: $Enums.BillingPeriod | null
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    cancelAtPeriodEnd?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutSubscriptionsInput
    plan: PlanCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    customerId: string
    planId: string
    status: $Enums.SubscriptionStatus
    billingPeriod?: $Enums.BillingPeriod | null
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    cancelAtPeriodEnd?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    billingPeriod?: NullableEnumBillingPeriodFieldUpdateOperationsInput | $Enums.BillingPeriod | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutSubscriptionsNestedInput
    plan?: PlanUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    billingPeriod?: NullableEnumBillingPeriodFieldUpdateOperationsInput | $Enums.BillingPeriod | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    customerId: string
    planId: string
    status: $Enums.SubscriptionStatus
    billingPeriod?: $Enums.BillingPeriod | null
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    cancelAtPeriodEnd?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    billingPeriod?: NullableEnumBillingPeriodFieldUpdateOperationsInput | $Enums.BillingPeriod | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    billingPeriod?: NullableEnumBillingPeriodFieldUpdateOperationsInput | $Enums.BillingPeriod | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntitlementCreateInput = {
    id?: string
    featureId: string
    limitType?: $Enums.LimitType | null
    limitValue?: bigint | number | null
    period?: $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutEntitlementsInput
    user?: UserCreateNestedOneWithoutEntitlementsInput
  }

  export type EntitlementUncheckedCreateInput = {
    id?: string
    customerId: string
    userId?: string | null
    featureId: string
    limitType?: $Enums.LimitType | null
    limitValue?: bigint | number | null
    period?: $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntitlementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureId?: StringFieldUpdateOperationsInput | string
    limitType?: NullableEnumLimitTypeFieldUpdateOperationsInput | $Enums.LimitType | null
    limitValue?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    period?: NullableEnumLimitPeriodFieldUpdateOperationsInput | $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutEntitlementsNestedInput
    user?: UserUpdateOneWithoutEntitlementsNestedInput
  }

  export type EntitlementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    featureId?: StringFieldUpdateOperationsInput | string
    limitType?: NullableEnumLimitTypeFieldUpdateOperationsInput | $Enums.LimitType | null
    limitValue?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    period?: NullableEnumLimitPeriodFieldUpdateOperationsInput | $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntitlementCreateManyInput = {
    id?: string
    customerId: string
    userId?: string | null
    featureId: string
    limitType?: $Enums.LimitType | null
    limitValue?: bigint | number | null
    period?: $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntitlementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureId?: StringFieldUpdateOperationsInput | string
    limitType?: NullableEnumLimitTypeFieldUpdateOperationsInput | $Enums.LimitType | null
    limitValue?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    period?: NullableEnumLimitPeriodFieldUpdateOperationsInput | $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntitlementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    featureId?: StringFieldUpdateOperationsInput | string
    limitType?: NullableEnumLimitTypeFieldUpdateOperationsInput | $Enums.LimitType | null
    limitValue?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    period?: NullableEnumLimitPeriodFieldUpdateOperationsInput | $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumCustomerTierFilter<$PrismaModel = never> = {
    equals?: $Enums.CustomerTier | EnumCustomerTierFieldRefInput<$PrismaModel>
    in?: $Enums.CustomerTier[] | ListEnumCustomerTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.CustomerTier[] | ListEnumCustomerTierFieldRefInput<$PrismaModel>
    not?: NestedEnumCustomerTierFilter<$PrismaModel> | $Enums.CustomerTier
  }

  export type EnumCustomerStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CustomerStatus | EnumCustomerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CustomerStatus[] | ListEnumCustomerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CustomerStatus[] | ListEnumCustomerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCustomerStatusFilter<$PrismaModel> | $Enums.CustomerStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type TeamListRelationFilter = {
    every?: TeamWhereInput
    some?: TeamWhereInput
    none?: TeamWhereInput
  }

  export type CreditWalletListRelationFilter = {
    every?: CreditWalletWhereInput
    some?: CreditWalletWhereInput
    none?: CreditWalletWhereInput
  }

  export type CreditTransactionListRelationFilter = {
    every?: CreditTransactionWhereInput
    some?: CreditTransactionWhereInput
    none?: CreditTransactionWhereInput
  }

  export type SubscriptionListRelationFilter = {
    every?: SubscriptionWhereInput
    some?: SubscriptionWhereInput
    none?: SubscriptionWhereInput
  }

  export type UsageEventListRelationFilter = {
    every?: UsageEventWhereInput
    some?: UsageEventWhereInput
    none?: UsageEventWhereInput
  }

  export type BurnTableListRelationFilter = {
    every?: BurnTableWhereInput
    some?: BurnTableWhereInput
    none?: BurnTableWhereInput
  }

  export type EntitlementListRelationFilter = {
    every?: EntitlementWhereInput
    some?: EntitlementWhereInput
    none?: EntitlementWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreditWalletOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreditTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsageEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BurnTableOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EntitlementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    apiKeyHash?: SortOrder
    tier?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    apiKeyHash?: SortOrder
    tier?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    apiKeyHash?: SortOrder
    tier?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumCustomerTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CustomerTier | EnumCustomerTierFieldRefInput<$PrismaModel>
    in?: $Enums.CustomerTier[] | ListEnumCustomerTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.CustomerTier[] | ListEnumCustomerTierFieldRefInput<$PrismaModel>
    not?: NestedEnumCustomerTierWithAggregatesFilter<$PrismaModel> | $Enums.CustomerTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCustomerTierFilter<$PrismaModel>
    _max?: NestedEnumCustomerTierFilter<$PrismaModel>
  }

  export type EnumCustomerStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CustomerStatus | EnumCustomerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CustomerStatus[] | ListEnumCustomerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CustomerStatus[] | ListEnumCustomerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCustomerStatusWithAggregatesFilter<$PrismaModel> | $Enums.CustomerStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCustomerStatusFilter<$PrismaModel>
    _max?: NestedEnumCustomerStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type TeamMembershipListRelationFilter = {
    every?: TeamMembershipWhereInput
    some?: TeamMembershipWhereInput
    none?: TeamMembershipWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TeamMembershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCustomerIdExternalUserIdCompoundUniqueInput = {
    customerId: string
    externalUserId: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    externalUserId?: SortOrder
    email?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    externalUserId?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    externalUserId?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    name?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTeamRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamRole | EnumTeamRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumTeamRoleFilter<$PrismaModel> | $Enums.TeamRole
  }

  export type TeamScalarRelationFilter = {
    is?: TeamWhereInput
    isNot?: TeamWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TeamMembershipTeamIdUserIdCompoundUniqueInput = {
    teamId: string
    userId: string
  }

  export type TeamMembershipCountOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamMembershipMaxOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamMembershipMinOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumTeamRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamRole | EnumTeamRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumTeamRoleWithAggregatesFilter<$PrismaModel> | $Enums.TeamRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTeamRoleFilter<$PrismaModel>
    _max?: NestedEnumTeamRoleFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TeamNullableScalarRelationFilter = {
    is?: TeamWhereInput | null
    isNot?: TeamWhereInput | null
  }

  export type CreditWalletCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    balance?: SortOrder
    reservedBalance?: SortOrder
    currency?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreditWalletAvgOrderByAggregateInput = {
    balance?: SortOrder
    reservedBalance?: SortOrder
  }

  export type CreditWalletMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    balance?: SortOrder
    reservedBalance?: SortOrder
    currency?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreditWalletMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    balance?: SortOrder
    reservedBalance?: SortOrder
    currency?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreditWalletSumOrderByAggregateInput = {
    balance?: SortOrder
    reservedBalance?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type CreditWalletScalarRelationFilter = {
    is?: CreditWalletWhereInput
    isNot?: CreditWalletWhereInput
  }

  export type CreditTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    customerId?: SortOrder
    transactionType?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrder
    metadata?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditTransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
  }

  export type CreditTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    customerId?: SortOrder
    transactionType?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    customerId?: SortOrder
    transactionType?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditTransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CustomerNullableScalarRelationFilter = {
    is?: CustomerWhereInput | null
    isNot?: CustomerWhereInput | null
  }

  export type BurnTableCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    name?: SortOrder
    version?: SortOrder
    rules?: SortOrder
    isActive?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BurnTableAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type BurnTableMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    name?: SortOrder
    version?: SortOrder
    isActive?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BurnTableMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    name?: SortOrder
    version?: SortOrder
    isActive?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BurnTableSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumProviderNameFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderName | EnumProviderNameFieldRefInput<$PrismaModel>
    in?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderNameFilter<$PrismaModel> | $Enums.ProviderName
  }

  export type EnumCostTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CostType | EnumCostTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCostTypeFilter<$PrismaModel> | $Enums.CostType
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type ProviderCostCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    costType?: SortOrder
    costPerUnit?: SortOrder
    unitSize?: SortOrder
    currency?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
    createdAt?: SortOrder
  }

  export type ProviderCostAvgOrderByAggregateInput = {
    costPerUnit?: SortOrder
    unitSize?: SortOrder
  }

  export type ProviderCostMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    costType?: SortOrder
    costPerUnit?: SortOrder
    unitSize?: SortOrder
    currency?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
    createdAt?: SortOrder
  }

  export type ProviderCostMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    costType?: SortOrder
    costPerUnit?: SortOrder
    unitSize?: SortOrder
    currency?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
    createdAt?: SortOrder
  }

  export type ProviderCostSumOrderByAggregateInput = {
    costPerUnit?: SortOrder
    unitSize?: SortOrder
  }

  export type EnumProviderNameWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderName | EnumProviderNameFieldRefInput<$PrismaModel>
    in?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderNameWithAggregatesFilter<$PrismaModel> | $Enums.ProviderName
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderNameFilter<$PrismaModel>
    _max?: NestedEnumProviderNameFilter<$PrismaModel>
  }

  export type EnumCostTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CostType | EnumCostTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCostTypeWithAggregatesFilter<$PrismaModel> | $Enums.CostType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCostTypeFilter<$PrismaModel>
    _max?: NestedEnumCostTypeFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType
  }

  export type EnumProviderNameNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderName | EnumProviderNameFieldRefInput<$PrismaModel> | null
    in?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel> | null
    not?: NestedEnumProviderNameNullableFilter<$PrismaModel> | $Enums.ProviderName | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type UsageEventCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    eventType?: SortOrder
    featureId?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    creditsBurned?: SortOrder
    costUsd?: SortOrder
    metadata?: SortOrder
    idempotencyKey?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type UsageEventAvgOrderByAggregateInput = {
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    creditsBurned?: SortOrder
    costUsd?: SortOrder
  }

  export type UsageEventMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    eventType?: SortOrder
    featureId?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    creditsBurned?: SortOrder
    costUsd?: SortOrder
    idempotencyKey?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type UsageEventMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    eventType?: SortOrder
    featureId?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    creditsBurned?: SortOrder
    costUsd?: SortOrder
    idempotencyKey?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type UsageEventSumOrderByAggregateInput = {
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    creditsBurned?: SortOrder
    costUsd?: SortOrder
  }

  export type EnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventTypeFilter<$PrismaModel>
    _max?: NestedEnumEventTypeFilter<$PrismaModel>
  }

  export type EnumProviderNameNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderName | EnumProviderNameFieldRefInput<$PrismaModel> | null
    in?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel> | null
    not?: NestedEnumProviderNameNullableWithAggregatesFilter<$PrismaModel> | $Enums.ProviderName | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumProviderNameNullableFilter<$PrismaModel>
    _max?: NestedEnumProviderNameNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type PlanCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    basePriceCents?: SortOrder
    includedCredits?: SortOrder
    features?: SortOrder
    metadata?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanAvgOrderByAggregateInput = {
    basePriceCents?: SortOrder
    includedCredits?: SortOrder
  }

  export type PlanMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    basePriceCents?: SortOrder
    includedCredits?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    basePriceCents?: SortOrder
    includedCredits?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanSumOrderByAggregateInput = {
    basePriceCents?: SortOrder
    includedCredits?: SortOrder
  }

  export type EnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type EnumBillingPeriodNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.BillingPeriod | EnumBillingPeriodFieldRefInput<$PrismaModel> | null
    in?: $Enums.BillingPeriod[] | ListEnumBillingPeriodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.BillingPeriod[] | ListEnumBillingPeriodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumBillingPeriodNullableFilter<$PrismaModel> | $Enums.BillingPeriod | null
  }

  export type PlanScalarRelationFilter = {
    is?: PlanWhereInput
    isNot?: PlanWhereInput
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    planId?: SortOrder
    status?: SortOrder
    billingPeriod?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    planId?: SortOrder
    status?: SortOrder
    billingPeriod?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    planId?: SortOrder
    status?: SortOrder
    billingPeriod?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type EnumBillingPeriodNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BillingPeriod | EnumBillingPeriodFieldRefInput<$PrismaModel> | null
    in?: $Enums.BillingPeriod[] | ListEnumBillingPeriodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.BillingPeriod[] | ListEnumBillingPeriodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumBillingPeriodNullableWithAggregatesFilter<$PrismaModel> | $Enums.BillingPeriod | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumBillingPeriodNullableFilter<$PrismaModel>
    _max?: NestedEnumBillingPeriodNullableFilter<$PrismaModel>
  }

  export type EnumLimitTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.LimitType | EnumLimitTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.LimitType[] | ListEnumLimitTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LimitType[] | ListEnumLimitTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLimitTypeNullableFilter<$PrismaModel> | $Enums.LimitType | null
  }

  export type EnumLimitPeriodNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.LimitPeriod | EnumLimitPeriodFieldRefInput<$PrismaModel> | null
    in?: $Enums.LimitPeriod[] | ListEnumLimitPeriodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LimitPeriod[] | ListEnumLimitPeriodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLimitPeriodNullableFilter<$PrismaModel> | $Enums.LimitPeriod | null
  }

  export type EntitlementCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrder
    featureId?: SortOrder
    limitType?: SortOrder
    limitValue?: SortOrder
    period?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntitlementAvgOrderByAggregateInput = {
    limitValue?: SortOrder
  }

  export type EntitlementMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrder
    featureId?: SortOrder
    limitType?: SortOrder
    limitValue?: SortOrder
    period?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntitlementMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    userId?: SortOrder
    featureId?: SortOrder
    limitType?: SortOrder
    limitValue?: SortOrder
    period?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntitlementSumOrderByAggregateInput = {
    limitValue?: SortOrder
  }

  export type EnumLimitTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LimitType | EnumLimitTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.LimitType[] | ListEnumLimitTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LimitType[] | ListEnumLimitTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLimitTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.LimitType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumLimitTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumLimitTypeNullableFilter<$PrismaModel>
  }

  export type EnumLimitPeriodNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LimitPeriod | EnumLimitPeriodFieldRefInput<$PrismaModel> | null
    in?: $Enums.LimitPeriod[] | ListEnumLimitPeriodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LimitPeriod[] | ListEnumLimitPeriodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLimitPeriodNullableWithAggregatesFilter<$PrismaModel> | $Enums.LimitPeriod | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumLimitPeriodNullableFilter<$PrismaModel>
    _max?: NestedEnumLimitPeriodNullableFilter<$PrismaModel>
  }

  export type UserCreateNestedManyWithoutCustomerInput = {
    create?: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput> | UserCreateWithoutCustomerInput[] | UserUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCustomerInput | UserCreateOrConnectWithoutCustomerInput[]
    createMany?: UserCreateManyCustomerInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type TeamCreateNestedManyWithoutCustomerInput = {
    create?: XOR<TeamCreateWithoutCustomerInput, TeamUncheckedCreateWithoutCustomerInput> | TeamCreateWithoutCustomerInput[] | TeamUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCustomerInput | TeamCreateOrConnectWithoutCustomerInput[]
    createMany?: TeamCreateManyCustomerInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type CreditWalletCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CreditWalletCreateWithoutCustomerInput, CreditWalletUncheckedCreateWithoutCustomerInput> | CreditWalletCreateWithoutCustomerInput[] | CreditWalletUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CreditWalletCreateOrConnectWithoutCustomerInput | CreditWalletCreateOrConnectWithoutCustomerInput[]
    createMany?: CreditWalletCreateManyCustomerInputEnvelope
    connect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
  }

  export type CreditTransactionCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CreditTransactionCreateWithoutCustomerInput, CreditTransactionUncheckedCreateWithoutCustomerInput> | CreditTransactionCreateWithoutCustomerInput[] | CreditTransactionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutCustomerInput | CreditTransactionCreateOrConnectWithoutCustomerInput[]
    createMany?: CreditTransactionCreateManyCustomerInputEnvelope
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
  }

  export type SubscriptionCreateNestedManyWithoutCustomerInput = {
    create?: XOR<SubscriptionCreateWithoutCustomerInput, SubscriptionUncheckedCreateWithoutCustomerInput> | SubscriptionCreateWithoutCustomerInput[] | SubscriptionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCustomerInput | SubscriptionCreateOrConnectWithoutCustomerInput[]
    createMany?: SubscriptionCreateManyCustomerInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type UsageEventCreateNestedManyWithoutCustomerInput = {
    create?: XOR<UsageEventCreateWithoutCustomerInput, UsageEventUncheckedCreateWithoutCustomerInput> | UsageEventCreateWithoutCustomerInput[] | UsageEventUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: UsageEventCreateOrConnectWithoutCustomerInput | UsageEventCreateOrConnectWithoutCustomerInput[]
    createMany?: UsageEventCreateManyCustomerInputEnvelope
    connect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
  }

  export type BurnTableCreateNestedManyWithoutCustomerInput = {
    create?: XOR<BurnTableCreateWithoutCustomerInput, BurnTableUncheckedCreateWithoutCustomerInput> | BurnTableCreateWithoutCustomerInput[] | BurnTableUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BurnTableCreateOrConnectWithoutCustomerInput | BurnTableCreateOrConnectWithoutCustomerInput[]
    createMany?: BurnTableCreateManyCustomerInputEnvelope
    connect?: BurnTableWhereUniqueInput | BurnTableWhereUniqueInput[]
  }

  export type EntitlementCreateNestedManyWithoutCustomerInput = {
    create?: XOR<EntitlementCreateWithoutCustomerInput, EntitlementUncheckedCreateWithoutCustomerInput> | EntitlementCreateWithoutCustomerInput[] | EntitlementUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: EntitlementCreateOrConnectWithoutCustomerInput | EntitlementCreateOrConnectWithoutCustomerInput[]
    createMany?: EntitlementCreateManyCustomerInputEnvelope
    connect?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput> | UserCreateWithoutCustomerInput[] | UserUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCustomerInput | UserCreateOrConnectWithoutCustomerInput[]
    createMany?: UserCreateManyCustomerInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type TeamUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<TeamCreateWithoutCustomerInput, TeamUncheckedCreateWithoutCustomerInput> | TeamCreateWithoutCustomerInput[] | TeamUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCustomerInput | TeamCreateOrConnectWithoutCustomerInput[]
    createMany?: TeamCreateManyCustomerInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type CreditWalletUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CreditWalletCreateWithoutCustomerInput, CreditWalletUncheckedCreateWithoutCustomerInput> | CreditWalletCreateWithoutCustomerInput[] | CreditWalletUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CreditWalletCreateOrConnectWithoutCustomerInput | CreditWalletCreateOrConnectWithoutCustomerInput[]
    createMany?: CreditWalletCreateManyCustomerInputEnvelope
    connect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
  }

  export type CreditTransactionUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CreditTransactionCreateWithoutCustomerInput, CreditTransactionUncheckedCreateWithoutCustomerInput> | CreditTransactionCreateWithoutCustomerInput[] | CreditTransactionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutCustomerInput | CreditTransactionCreateOrConnectWithoutCustomerInput[]
    createMany?: CreditTransactionCreateManyCustomerInputEnvelope
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<SubscriptionCreateWithoutCustomerInput, SubscriptionUncheckedCreateWithoutCustomerInput> | SubscriptionCreateWithoutCustomerInput[] | SubscriptionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCustomerInput | SubscriptionCreateOrConnectWithoutCustomerInput[]
    createMany?: SubscriptionCreateManyCustomerInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type UsageEventUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<UsageEventCreateWithoutCustomerInput, UsageEventUncheckedCreateWithoutCustomerInput> | UsageEventCreateWithoutCustomerInput[] | UsageEventUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: UsageEventCreateOrConnectWithoutCustomerInput | UsageEventCreateOrConnectWithoutCustomerInput[]
    createMany?: UsageEventCreateManyCustomerInputEnvelope
    connect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
  }

  export type BurnTableUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<BurnTableCreateWithoutCustomerInput, BurnTableUncheckedCreateWithoutCustomerInput> | BurnTableCreateWithoutCustomerInput[] | BurnTableUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BurnTableCreateOrConnectWithoutCustomerInput | BurnTableCreateOrConnectWithoutCustomerInput[]
    createMany?: BurnTableCreateManyCustomerInputEnvelope
    connect?: BurnTableWhereUniqueInput | BurnTableWhereUniqueInput[]
  }

  export type EntitlementUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<EntitlementCreateWithoutCustomerInput, EntitlementUncheckedCreateWithoutCustomerInput> | EntitlementCreateWithoutCustomerInput[] | EntitlementUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: EntitlementCreateOrConnectWithoutCustomerInput | EntitlementCreateOrConnectWithoutCustomerInput[]
    createMany?: EntitlementCreateManyCustomerInputEnvelope
    connect?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumCustomerTierFieldUpdateOperationsInput = {
    set?: $Enums.CustomerTier
  }

  export type EnumCustomerStatusFieldUpdateOperationsInput = {
    set?: $Enums.CustomerStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput> | UserCreateWithoutCustomerInput[] | UserUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCustomerInput | UserCreateOrConnectWithoutCustomerInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCustomerInput | UserUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: UserCreateManyCustomerInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCustomerInput | UserUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCustomerInput | UserUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type TeamUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<TeamCreateWithoutCustomerInput, TeamUncheckedCreateWithoutCustomerInput> | TeamCreateWithoutCustomerInput[] | TeamUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCustomerInput | TeamCreateOrConnectWithoutCustomerInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutCustomerInput | TeamUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: TeamCreateManyCustomerInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutCustomerInput | TeamUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutCustomerInput | TeamUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type CreditWalletUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CreditWalletCreateWithoutCustomerInput, CreditWalletUncheckedCreateWithoutCustomerInput> | CreditWalletCreateWithoutCustomerInput[] | CreditWalletUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CreditWalletCreateOrConnectWithoutCustomerInput | CreditWalletCreateOrConnectWithoutCustomerInput[]
    upsert?: CreditWalletUpsertWithWhereUniqueWithoutCustomerInput | CreditWalletUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CreditWalletCreateManyCustomerInputEnvelope
    set?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    disconnect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    delete?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    connect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    update?: CreditWalletUpdateWithWhereUniqueWithoutCustomerInput | CreditWalletUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CreditWalletUpdateManyWithWhereWithoutCustomerInput | CreditWalletUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CreditWalletScalarWhereInput | CreditWalletScalarWhereInput[]
  }

  export type CreditTransactionUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CreditTransactionCreateWithoutCustomerInput, CreditTransactionUncheckedCreateWithoutCustomerInput> | CreditTransactionCreateWithoutCustomerInput[] | CreditTransactionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutCustomerInput | CreditTransactionCreateOrConnectWithoutCustomerInput[]
    upsert?: CreditTransactionUpsertWithWhereUniqueWithoutCustomerInput | CreditTransactionUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CreditTransactionCreateManyCustomerInputEnvelope
    set?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    disconnect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    delete?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    update?: CreditTransactionUpdateWithWhereUniqueWithoutCustomerInput | CreditTransactionUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CreditTransactionUpdateManyWithWhereWithoutCustomerInput | CreditTransactionUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
  }

  export type SubscriptionUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<SubscriptionCreateWithoutCustomerInput, SubscriptionUncheckedCreateWithoutCustomerInput> | SubscriptionCreateWithoutCustomerInput[] | SubscriptionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCustomerInput | SubscriptionCreateOrConnectWithoutCustomerInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutCustomerInput | SubscriptionUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: SubscriptionCreateManyCustomerInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutCustomerInput | SubscriptionUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutCustomerInput | SubscriptionUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type UsageEventUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<UsageEventCreateWithoutCustomerInput, UsageEventUncheckedCreateWithoutCustomerInput> | UsageEventCreateWithoutCustomerInput[] | UsageEventUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: UsageEventCreateOrConnectWithoutCustomerInput | UsageEventCreateOrConnectWithoutCustomerInput[]
    upsert?: UsageEventUpsertWithWhereUniqueWithoutCustomerInput | UsageEventUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: UsageEventCreateManyCustomerInputEnvelope
    set?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    disconnect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    delete?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    connect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    update?: UsageEventUpdateWithWhereUniqueWithoutCustomerInput | UsageEventUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: UsageEventUpdateManyWithWhereWithoutCustomerInput | UsageEventUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: UsageEventScalarWhereInput | UsageEventScalarWhereInput[]
  }

  export type BurnTableUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<BurnTableCreateWithoutCustomerInput, BurnTableUncheckedCreateWithoutCustomerInput> | BurnTableCreateWithoutCustomerInput[] | BurnTableUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BurnTableCreateOrConnectWithoutCustomerInput | BurnTableCreateOrConnectWithoutCustomerInput[]
    upsert?: BurnTableUpsertWithWhereUniqueWithoutCustomerInput | BurnTableUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: BurnTableCreateManyCustomerInputEnvelope
    set?: BurnTableWhereUniqueInput | BurnTableWhereUniqueInput[]
    disconnect?: BurnTableWhereUniqueInput | BurnTableWhereUniqueInput[]
    delete?: BurnTableWhereUniqueInput | BurnTableWhereUniqueInput[]
    connect?: BurnTableWhereUniqueInput | BurnTableWhereUniqueInput[]
    update?: BurnTableUpdateWithWhereUniqueWithoutCustomerInput | BurnTableUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: BurnTableUpdateManyWithWhereWithoutCustomerInput | BurnTableUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: BurnTableScalarWhereInput | BurnTableScalarWhereInput[]
  }

  export type EntitlementUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<EntitlementCreateWithoutCustomerInput, EntitlementUncheckedCreateWithoutCustomerInput> | EntitlementCreateWithoutCustomerInput[] | EntitlementUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: EntitlementCreateOrConnectWithoutCustomerInput | EntitlementCreateOrConnectWithoutCustomerInput[]
    upsert?: EntitlementUpsertWithWhereUniqueWithoutCustomerInput | EntitlementUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: EntitlementCreateManyCustomerInputEnvelope
    set?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    disconnect?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    delete?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    connect?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    update?: EntitlementUpdateWithWhereUniqueWithoutCustomerInput | EntitlementUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: EntitlementUpdateManyWithWhereWithoutCustomerInput | EntitlementUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: EntitlementScalarWhereInput | EntitlementScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput> | UserCreateWithoutCustomerInput[] | UserUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCustomerInput | UserCreateOrConnectWithoutCustomerInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCustomerInput | UserUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: UserCreateManyCustomerInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCustomerInput | UserUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCustomerInput | UserUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type TeamUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<TeamCreateWithoutCustomerInput, TeamUncheckedCreateWithoutCustomerInput> | TeamCreateWithoutCustomerInput[] | TeamUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCustomerInput | TeamCreateOrConnectWithoutCustomerInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutCustomerInput | TeamUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: TeamCreateManyCustomerInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutCustomerInput | TeamUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutCustomerInput | TeamUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type CreditWalletUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CreditWalletCreateWithoutCustomerInput, CreditWalletUncheckedCreateWithoutCustomerInput> | CreditWalletCreateWithoutCustomerInput[] | CreditWalletUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CreditWalletCreateOrConnectWithoutCustomerInput | CreditWalletCreateOrConnectWithoutCustomerInput[]
    upsert?: CreditWalletUpsertWithWhereUniqueWithoutCustomerInput | CreditWalletUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CreditWalletCreateManyCustomerInputEnvelope
    set?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    disconnect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    delete?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    connect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    update?: CreditWalletUpdateWithWhereUniqueWithoutCustomerInput | CreditWalletUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CreditWalletUpdateManyWithWhereWithoutCustomerInput | CreditWalletUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CreditWalletScalarWhereInput | CreditWalletScalarWhereInput[]
  }

  export type CreditTransactionUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CreditTransactionCreateWithoutCustomerInput, CreditTransactionUncheckedCreateWithoutCustomerInput> | CreditTransactionCreateWithoutCustomerInput[] | CreditTransactionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutCustomerInput | CreditTransactionCreateOrConnectWithoutCustomerInput[]
    upsert?: CreditTransactionUpsertWithWhereUniqueWithoutCustomerInput | CreditTransactionUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CreditTransactionCreateManyCustomerInputEnvelope
    set?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    disconnect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    delete?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    update?: CreditTransactionUpdateWithWhereUniqueWithoutCustomerInput | CreditTransactionUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CreditTransactionUpdateManyWithWhereWithoutCustomerInput | CreditTransactionUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<SubscriptionCreateWithoutCustomerInput, SubscriptionUncheckedCreateWithoutCustomerInput> | SubscriptionCreateWithoutCustomerInput[] | SubscriptionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCustomerInput | SubscriptionCreateOrConnectWithoutCustomerInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutCustomerInput | SubscriptionUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: SubscriptionCreateManyCustomerInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutCustomerInput | SubscriptionUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutCustomerInput | SubscriptionUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type UsageEventUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<UsageEventCreateWithoutCustomerInput, UsageEventUncheckedCreateWithoutCustomerInput> | UsageEventCreateWithoutCustomerInput[] | UsageEventUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: UsageEventCreateOrConnectWithoutCustomerInput | UsageEventCreateOrConnectWithoutCustomerInput[]
    upsert?: UsageEventUpsertWithWhereUniqueWithoutCustomerInput | UsageEventUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: UsageEventCreateManyCustomerInputEnvelope
    set?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    disconnect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    delete?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    connect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    update?: UsageEventUpdateWithWhereUniqueWithoutCustomerInput | UsageEventUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: UsageEventUpdateManyWithWhereWithoutCustomerInput | UsageEventUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: UsageEventScalarWhereInput | UsageEventScalarWhereInput[]
  }

  export type BurnTableUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<BurnTableCreateWithoutCustomerInput, BurnTableUncheckedCreateWithoutCustomerInput> | BurnTableCreateWithoutCustomerInput[] | BurnTableUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BurnTableCreateOrConnectWithoutCustomerInput | BurnTableCreateOrConnectWithoutCustomerInput[]
    upsert?: BurnTableUpsertWithWhereUniqueWithoutCustomerInput | BurnTableUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: BurnTableCreateManyCustomerInputEnvelope
    set?: BurnTableWhereUniqueInput | BurnTableWhereUniqueInput[]
    disconnect?: BurnTableWhereUniqueInput | BurnTableWhereUniqueInput[]
    delete?: BurnTableWhereUniqueInput | BurnTableWhereUniqueInput[]
    connect?: BurnTableWhereUniqueInput | BurnTableWhereUniqueInput[]
    update?: BurnTableUpdateWithWhereUniqueWithoutCustomerInput | BurnTableUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: BurnTableUpdateManyWithWhereWithoutCustomerInput | BurnTableUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: BurnTableScalarWhereInput | BurnTableScalarWhereInput[]
  }

  export type EntitlementUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<EntitlementCreateWithoutCustomerInput, EntitlementUncheckedCreateWithoutCustomerInput> | EntitlementCreateWithoutCustomerInput[] | EntitlementUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: EntitlementCreateOrConnectWithoutCustomerInput | EntitlementCreateOrConnectWithoutCustomerInput[]
    upsert?: EntitlementUpsertWithWhereUniqueWithoutCustomerInput | EntitlementUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: EntitlementCreateManyCustomerInputEnvelope
    set?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    disconnect?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    delete?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    connect?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    update?: EntitlementUpdateWithWhereUniqueWithoutCustomerInput | EntitlementUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: EntitlementUpdateManyWithWhereWithoutCustomerInput | EntitlementUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: EntitlementScalarWhereInput | EntitlementScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutUsersInput = {
    create?: XOR<CustomerCreateWithoutUsersInput, CustomerUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUsersInput
    connect?: CustomerWhereUniqueInput
  }

  export type CreditWalletCreateNestedManyWithoutUserInput = {
    create?: XOR<CreditWalletCreateWithoutUserInput, CreditWalletUncheckedCreateWithoutUserInput> | CreditWalletCreateWithoutUserInput[] | CreditWalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditWalletCreateOrConnectWithoutUserInput | CreditWalletCreateOrConnectWithoutUserInput[]
    createMany?: CreditWalletCreateManyUserInputEnvelope
    connect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
  }

  export type TeamMembershipCreateNestedManyWithoutUserInput = {
    create?: XOR<TeamMembershipCreateWithoutUserInput, TeamMembershipUncheckedCreateWithoutUserInput> | TeamMembershipCreateWithoutUserInput[] | TeamMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutUserInput | TeamMembershipCreateOrConnectWithoutUserInput[]
    createMany?: TeamMembershipCreateManyUserInputEnvelope
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
  }

  export type EntitlementCreateNestedManyWithoutUserInput = {
    create?: XOR<EntitlementCreateWithoutUserInput, EntitlementUncheckedCreateWithoutUserInput> | EntitlementCreateWithoutUserInput[] | EntitlementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EntitlementCreateOrConnectWithoutUserInput | EntitlementCreateOrConnectWithoutUserInput[]
    createMany?: EntitlementCreateManyUserInputEnvelope
    connect?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
  }

  export type UsageEventCreateNestedManyWithoutUserInput = {
    create?: XOR<UsageEventCreateWithoutUserInput, UsageEventUncheckedCreateWithoutUserInput> | UsageEventCreateWithoutUserInput[] | UsageEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageEventCreateOrConnectWithoutUserInput | UsageEventCreateOrConnectWithoutUserInput[]
    createMany?: UsageEventCreateManyUserInputEnvelope
    connect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
  }

  export type CreditWalletUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CreditWalletCreateWithoutUserInput, CreditWalletUncheckedCreateWithoutUserInput> | CreditWalletCreateWithoutUserInput[] | CreditWalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditWalletCreateOrConnectWithoutUserInput | CreditWalletCreateOrConnectWithoutUserInput[]
    createMany?: CreditWalletCreateManyUserInputEnvelope
    connect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
  }

  export type TeamMembershipUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TeamMembershipCreateWithoutUserInput, TeamMembershipUncheckedCreateWithoutUserInput> | TeamMembershipCreateWithoutUserInput[] | TeamMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutUserInput | TeamMembershipCreateOrConnectWithoutUserInput[]
    createMany?: TeamMembershipCreateManyUserInputEnvelope
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
  }

  export type EntitlementUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EntitlementCreateWithoutUserInput, EntitlementUncheckedCreateWithoutUserInput> | EntitlementCreateWithoutUserInput[] | EntitlementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EntitlementCreateOrConnectWithoutUserInput | EntitlementCreateOrConnectWithoutUserInput[]
    createMany?: EntitlementCreateManyUserInputEnvelope
    connect?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
  }

  export type UsageEventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UsageEventCreateWithoutUserInput, UsageEventUncheckedCreateWithoutUserInput> | UsageEventCreateWithoutUserInput[] | UsageEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageEventCreateOrConnectWithoutUserInput | UsageEventCreateOrConnectWithoutUserInput[]
    createMany?: UsageEventCreateManyUserInputEnvelope
    connect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CustomerUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<CustomerCreateWithoutUsersInput, CustomerUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUsersInput
    upsert?: CustomerUpsertWithoutUsersInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutUsersInput, CustomerUpdateWithoutUsersInput>, CustomerUncheckedUpdateWithoutUsersInput>
  }

  export type CreditWalletUpdateManyWithoutUserNestedInput = {
    create?: XOR<CreditWalletCreateWithoutUserInput, CreditWalletUncheckedCreateWithoutUserInput> | CreditWalletCreateWithoutUserInput[] | CreditWalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditWalletCreateOrConnectWithoutUserInput | CreditWalletCreateOrConnectWithoutUserInput[]
    upsert?: CreditWalletUpsertWithWhereUniqueWithoutUserInput | CreditWalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CreditWalletCreateManyUserInputEnvelope
    set?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    disconnect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    delete?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    connect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    update?: CreditWalletUpdateWithWhereUniqueWithoutUserInput | CreditWalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CreditWalletUpdateManyWithWhereWithoutUserInput | CreditWalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CreditWalletScalarWhereInput | CreditWalletScalarWhereInput[]
  }

  export type TeamMembershipUpdateManyWithoutUserNestedInput = {
    create?: XOR<TeamMembershipCreateWithoutUserInput, TeamMembershipUncheckedCreateWithoutUserInput> | TeamMembershipCreateWithoutUserInput[] | TeamMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutUserInput | TeamMembershipCreateOrConnectWithoutUserInput[]
    upsert?: TeamMembershipUpsertWithWhereUniqueWithoutUserInput | TeamMembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TeamMembershipCreateManyUserInputEnvelope
    set?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    disconnect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    delete?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    update?: TeamMembershipUpdateWithWhereUniqueWithoutUserInput | TeamMembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TeamMembershipUpdateManyWithWhereWithoutUserInput | TeamMembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TeamMembershipScalarWhereInput | TeamMembershipScalarWhereInput[]
  }

  export type EntitlementUpdateManyWithoutUserNestedInput = {
    create?: XOR<EntitlementCreateWithoutUserInput, EntitlementUncheckedCreateWithoutUserInput> | EntitlementCreateWithoutUserInput[] | EntitlementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EntitlementCreateOrConnectWithoutUserInput | EntitlementCreateOrConnectWithoutUserInput[]
    upsert?: EntitlementUpsertWithWhereUniqueWithoutUserInput | EntitlementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EntitlementCreateManyUserInputEnvelope
    set?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    disconnect?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    delete?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    connect?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    update?: EntitlementUpdateWithWhereUniqueWithoutUserInput | EntitlementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EntitlementUpdateManyWithWhereWithoutUserInput | EntitlementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EntitlementScalarWhereInput | EntitlementScalarWhereInput[]
  }

  export type UsageEventUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsageEventCreateWithoutUserInput, UsageEventUncheckedCreateWithoutUserInput> | UsageEventCreateWithoutUserInput[] | UsageEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageEventCreateOrConnectWithoutUserInput | UsageEventCreateOrConnectWithoutUserInput[]
    upsert?: UsageEventUpsertWithWhereUniqueWithoutUserInput | UsageEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsageEventCreateManyUserInputEnvelope
    set?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    disconnect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    delete?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    connect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    update?: UsageEventUpdateWithWhereUniqueWithoutUserInput | UsageEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsageEventUpdateManyWithWhereWithoutUserInput | UsageEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsageEventScalarWhereInput | UsageEventScalarWhereInput[]
  }

  export type CreditWalletUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CreditWalletCreateWithoutUserInput, CreditWalletUncheckedCreateWithoutUserInput> | CreditWalletCreateWithoutUserInput[] | CreditWalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditWalletCreateOrConnectWithoutUserInput | CreditWalletCreateOrConnectWithoutUserInput[]
    upsert?: CreditWalletUpsertWithWhereUniqueWithoutUserInput | CreditWalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CreditWalletCreateManyUserInputEnvelope
    set?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    disconnect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    delete?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    connect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    update?: CreditWalletUpdateWithWhereUniqueWithoutUserInput | CreditWalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CreditWalletUpdateManyWithWhereWithoutUserInput | CreditWalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CreditWalletScalarWhereInput | CreditWalletScalarWhereInput[]
  }

  export type TeamMembershipUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TeamMembershipCreateWithoutUserInput, TeamMembershipUncheckedCreateWithoutUserInput> | TeamMembershipCreateWithoutUserInput[] | TeamMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutUserInput | TeamMembershipCreateOrConnectWithoutUserInput[]
    upsert?: TeamMembershipUpsertWithWhereUniqueWithoutUserInput | TeamMembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TeamMembershipCreateManyUserInputEnvelope
    set?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    disconnect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    delete?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    update?: TeamMembershipUpdateWithWhereUniqueWithoutUserInput | TeamMembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TeamMembershipUpdateManyWithWhereWithoutUserInput | TeamMembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TeamMembershipScalarWhereInput | TeamMembershipScalarWhereInput[]
  }

  export type EntitlementUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EntitlementCreateWithoutUserInput, EntitlementUncheckedCreateWithoutUserInput> | EntitlementCreateWithoutUserInput[] | EntitlementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EntitlementCreateOrConnectWithoutUserInput | EntitlementCreateOrConnectWithoutUserInput[]
    upsert?: EntitlementUpsertWithWhereUniqueWithoutUserInput | EntitlementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EntitlementCreateManyUserInputEnvelope
    set?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    disconnect?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    delete?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    connect?: EntitlementWhereUniqueInput | EntitlementWhereUniqueInput[]
    update?: EntitlementUpdateWithWhereUniqueWithoutUserInput | EntitlementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EntitlementUpdateManyWithWhereWithoutUserInput | EntitlementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EntitlementScalarWhereInput | EntitlementScalarWhereInput[]
  }

  export type UsageEventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsageEventCreateWithoutUserInput, UsageEventUncheckedCreateWithoutUserInput> | UsageEventCreateWithoutUserInput[] | UsageEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageEventCreateOrConnectWithoutUserInput | UsageEventCreateOrConnectWithoutUserInput[]
    upsert?: UsageEventUpsertWithWhereUniqueWithoutUserInput | UsageEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsageEventCreateManyUserInputEnvelope
    set?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    disconnect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    delete?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    connect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    update?: UsageEventUpdateWithWhereUniqueWithoutUserInput | UsageEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsageEventUpdateManyWithWhereWithoutUserInput | UsageEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsageEventScalarWhereInput | UsageEventScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutTeamsInput = {
    create?: XOR<CustomerCreateWithoutTeamsInput, CustomerUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutTeamsInput
    connect?: CustomerWhereUniqueInput
  }

  export type CreditWalletCreateNestedManyWithoutTeamInput = {
    create?: XOR<CreditWalletCreateWithoutTeamInput, CreditWalletUncheckedCreateWithoutTeamInput> | CreditWalletCreateWithoutTeamInput[] | CreditWalletUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: CreditWalletCreateOrConnectWithoutTeamInput | CreditWalletCreateOrConnectWithoutTeamInput[]
    createMany?: CreditWalletCreateManyTeamInputEnvelope
    connect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
  }

  export type TeamMembershipCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamMembershipCreateWithoutTeamInput, TeamMembershipUncheckedCreateWithoutTeamInput> | TeamMembershipCreateWithoutTeamInput[] | TeamMembershipUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutTeamInput | TeamMembershipCreateOrConnectWithoutTeamInput[]
    createMany?: TeamMembershipCreateManyTeamInputEnvelope
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
  }

  export type UsageEventCreateNestedManyWithoutTeamInput = {
    create?: XOR<UsageEventCreateWithoutTeamInput, UsageEventUncheckedCreateWithoutTeamInput> | UsageEventCreateWithoutTeamInput[] | UsageEventUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: UsageEventCreateOrConnectWithoutTeamInput | UsageEventCreateOrConnectWithoutTeamInput[]
    createMany?: UsageEventCreateManyTeamInputEnvelope
    connect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
  }

  export type CreditWalletUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<CreditWalletCreateWithoutTeamInput, CreditWalletUncheckedCreateWithoutTeamInput> | CreditWalletCreateWithoutTeamInput[] | CreditWalletUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: CreditWalletCreateOrConnectWithoutTeamInput | CreditWalletCreateOrConnectWithoutTeamInput[]
    createMany?: CreditWalletCreateManyTeamInputEnvelope
    connect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
  }

  export type TeamMembershipUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamMembershipCreateWithoutTeamInput, TeamMembershipUncheckedCreateWithoutTeamInput> | TeamMembershipCreateWithoutTeamInput[] | TeamMembershipUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutTeamInput | TeamMembershipCreateOrConnectWithoutTeamInput[]
    createMany?: TeamMembershipCreateManyTeamInputEnvelope
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
  }

  export type UsageEventUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<UsageEventCreateWithoutTeamInput, UsageEventUncheckedCreateWithoutTeamInput> | UsageEventCreateWithoutTeamInput[] | UsageEventUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: UsageEventCreateOrConnectWithoutTeamInput | UsageEventCreateOrConnectWithoutTeamInput[]
    createMany?: UsageEventCreateManyTeamInputEnvelope
    connect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
  }

  export type CustomerUpdateOneRequiredWithoutTeamsNestedInput = {
    create?: XOR<CustomerCreateWithoutTeamsInput, CustomerUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutTeamsInput
    upsert?: CustomerUpsertWithoutTeamsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutTeamsInput, CustomerUpdateWithoutTeamsInput>, CustomerUncheckedUpdateWithoutTeamsInput>
  }

  export type CreditWalletUpdateManyWithoutTeamNestedInput = {
    create?: XOR<CreditWalletCreateWithoutTeamInput, CreditWalletUncheckedCreateWithoutTeamInput> | CreditWalletCreateWithoutTeamInput[] | CreditWalletUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: CreditWalletCreateOrConnectWithoutTeamInput | CreditWalletCreateOrConnectWithoutTeamInput[]
    upsert?: CreditWalletUpsertWithWhereUniqueWithoutTeamInput | CreditWalletUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: CreditWalletCreateManyTeamInputEnvelope
    set?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    disconnect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    delete?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    connect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    update?: CreditWalletUpdateWithWhereUniqueWithoutTeamInput | CreditWalletUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: CreditWalletUpdateManyWithWhereWithoutTeamInput | CreditWalletUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: CreditWalletScalarWhereInput | CreditWalletScalarWhereInput[]
  }

  export type TeamMembershipUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamMembershipCreateWithoutTeamInput, TeamMembershipUncheckedCreateWithoutTeamInput> | TeamMembershipCreateWithoutTeamInput[] | TeamMembershipUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutTeamInput | TeamMembershipCreateOrConnectWithoutTeamInput[]
    upsert?: TeamMembershipUpsertWithWhereUniqueWithoutTeamInput | TeamMembershipUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamMembershipCreateManyTeamInputEnvelope
    set?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    disconnect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    delete?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    update?: TeamMembershipUpdateWithWhereUniqueWithoutTeamInput | TeamMembershipUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamMembershipUpdateManyWithWhereWithoutTeamInput | TeamMembershipUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamMembershipScalarWhereInput | TeamMembershipScalarWhereInput[]
  }

  export type UsageEventUpdateManyWithoutTeamNestedInput = {
    create?: XOR<UsageEventCreateWithoutTeamInput, UsageEventUncheckedCreateWithoutTeamInput> | UsageEventCreateWithoutTeamInput[] | UsageEventUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: UsageEventCreateOrConnectWithoutTeamInput | UsageEventCreateOrConnectWithoutTeamInput[]
    upsert?: UsageEventUpsertWithWhereUniqueWithoutTeamInput | UsageEventUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: UsageEventCreateManyTeamInputEnvelope
    set?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    disconnect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    delete?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    connect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    update?: UsageEventUpdateWithWhereUniqueWithoutTeamInput | UsageEventUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: UsageEventUpdateManyWithWhereWithoutTeamInput | UsageEventUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: UsageEventScalarWhereInput | UsageEventScalarWhereInput[]
  }

  export type CreditWalletUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<CreditWalletCreateWithoutTeamInput, CreditWalletUncheckedCreateWithoutTeamInput> | CreditWalletCreateWithoutTeamInput[] | CreditWalletUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: CreditWalletCreateOrConnectWithoutTeamInput | CreditWalletCreateOrConnectWithoutTeamInput[]
    upsert?: CreditWalletUpsertWithWhereUniqueWithoutTeamInput | CreditWalletUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: CreditWalletCreateManyTeamInputEnvelope
    set?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    disconnect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    delete?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    connect?: CreditWalletWhereUniqueInput | CreditWalletWhereUniqueInput[]
    update?: CreditWalletUpdateWithWhereUniqueWithoutTeamInput | CreditWalletUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: CreditWalletUpdateManyWithWhereWithoutTeamInput | CreditWalletUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: CreditWalletScalarWhereInput | CreditWalletScalarWhereInput[]
  }

  export type TeamMembershipUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamMembershipCreateWithoutTeamInput, TeamMembershipUncheckedCreateWithoutTeamInput> | TeamMembershipCreateWithoutTeamInput[] | TeamMembershipUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutTeamInput | TeamMembershipCreateOrConnectWithoutTeamInput[]
    upsert?: TeamMembershipUpsertWithWhereUniqueWithoutTeamInput | TeamMembershipUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamMembershipCreateManyTeamInputEnvelope
    set?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    disconnect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    delete?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    update?: TeamMembershipUpdateWithWhereUniqueWithoutTeamInput | TeamMembershipUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamMembershipUpdateManyWithWhereWithoutTeamInput | TeamMembershipUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamMembershipScalarWhereInput | TeamMembershipScalarWhereInput[]
  }

  export type UsageEventUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<UsageEventCreateWithoutTeamInput, UsageEventUncheckedCreateWithoutTeamInput> | UsageEventCreateWithoutTeamInput[] | UsageEventUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: UsageEventCreateOrConnectWithoutTeamInput | UsageEventCreateOrConnectWithoutTeamInput[]
    upsert?: UsageEventUpsertWithWhereUniqueWithoutTeamInput | UsageEventUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: UsageEventCreateManyTeamInputEnvelope
    set?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    disconnect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    delete?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    connect?: UsageEventWhereUniqueInput | UsageEventWhereUniqueInput[]
    update?: UsageEventUpdateWithWhereUniqueWithoutTeamInput | UsageEventUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: UsageEventUpdateManyWithWhereWithoutTeamInput | UsageEventUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: UsageEventScalarWhereInput | UsageEventScalarWhereInput[]
  }

  export type TeamCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<TeamCreateWithoutMembershipsInput, TeamUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMembershipsInput
    connect?: TeamWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTeamMembershipsInput = {
    create?: XOR<UserCreateWithoutTeamMembershipsInput, UserUncheckedCreateWithoutTeamMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTeamRoleFieldUpdateOperationsInput = {
    set?: $Enums.TeamRole
  }

  export type TeamUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<TeamCreateWithoutMembershipsInput, TeamUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMembershipsInput
    upsert?: TeamUpsertWithoutMembershipsInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutMembershipsInput, TeamUpdateWithoutMembershipsInput>, TeamUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateOneRequiredWithoutTeamMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutTeamMembershipsInput, UserUncheckedCreateWithoutTeamMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamMembershipsInput
    upsert?: UserUpsertWithoutTeamMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTeamMembershipsInput, UserUpdateWithoutTeamMembershipsInput>, UserUncheckedUpdateWithoutTeamMembershipsInput>
  }

  export type CustomerCreateNestedOneWithoutCreditWalletsInput = {
    create?: XOR<CustomerCreateWithoutCreditWalletsInput, CustomerUncheckedCreateWithoutCreditWalletsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutCreditWalletsInput
    connect?: CustomerWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreditWalletsInput = {
    create?: XOR<UserCreateWithoutCreditWalletsInput, UserUncheckedCreateWithoutCreditWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditWalletsInput
    connect?: UserWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutCreditWalletsInput = {
    create?: XOR<TeamCreateWithoutCreditWalletsInput, TeamUncheckedCreateWithoutCreditWalletsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutCreditWalletsInput
    connect?: TeamWhereUniqueInput
  }

  export type CreditTransactionCreateNestedManyWithoutWalletInput = {
    create?: XOR<CreditTransactionCreateWithoutWalletInput, CreditTransactionUncheckedCreateWithoutWalletInput> | CreditTransactionCreateWithoutWalletInput[] | CreditTransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutWalletInput | CreditTransactionCreateOrConnectWithoutWalletInput[]
    createMany?: CreditTransactionCreateManyWalletInputEnvelope
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
  }

  export type CreditTransactionUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<CreditTransactionCreateWithoutWalletInput, CreditTransactionUncheckedCreateWithoutWalletInput> | CreditTransactionCreateWithoutWalletInput[] | CreditTransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutWalletInput | CreditTransactionCreateOrConnectWithoutWalletInput[]
    createMany?: CreditTransactionCreateManyWalletInputEnvelope
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CustomerUpdateOneRequiredWithoutCreditWalletsNestedInput = {
    create?: XOR<CustomerCreateWithoutCreditWalletsInput, CustomerUncheckedCreateWithoutCreditWalletsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutCreditWalletsInput
    upsert?: CustomerUpsertWithoutCreditWalletsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutCreditWalletsInput, CustomerUpdateWithoutCreditWalletsInput>, CustomerUncheckedUpdateWithoutCreditWalletsInput>
  }

  export type UserUpdateOneWithoutCreditWalletsNestedInput = {
    create?: XOR<UserCreateWithoutCreditWalletsInput, UserUncheckedCreateWithoutCreditWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditWalletsInput
    upsert?: UserUpsertWithoutCreditWalletsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreditWalletsInput, UserUpdateWithoutCreditWalletsInput>, UserUncheckedUpdateWithoutCreditWalletsInput>
  }

  export type TeamUpdateOneWithoutCreditWalletsNestedInput = {
    create?: XOR<TeamCreateWithoutCreditWalletsInput, TeamUncheckedCreateWithoutCreditWalletsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutCreditWalletsInput
    upsert?: TeamUpsertWithoutCreditWalletsInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutCreditWalletsInput, TeamUpdateWithoutCreditWalletsInput>, TeamUncheckedUpdateWithoutCreditWalletsInput>
  }

  export type CreditTransactionUpdateManyWithoutWalletNestedInput = {
    create?: XOR<CreditTransactionCreateWithoutWalletInput, CreditTransactionUncheckedCreateWithoutWalletInput> | CreditTransactionCreateWithoutWalletInput[] | CreditTransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutWalletInput | CreditTransactionCreateOrConnectWithoutWalletInput[]
    upsert?: CreditTransactionUpsertWithWhereUniqueWithoutWalletInput | CreditTransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: CreditTransactionCreateManyWalletInputEnvelope
    set?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    disconnect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    delete?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    update?: CreditTransactionUpdateWithWhereUniqueWithoutWalletInput | CreditTransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: CreditTransactionUpdateManyWithWhereWithoutWalletInput | CreditTransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
  }

  export type CreditTransactionUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<CreditTransactionCreateWithoutWalletInput, CreditTransactionUncheckedCreateWithoutWalletInput> | CreditTransactionCreateWithoutWalletInput[] | CreditTransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutWalletInput | CreditTransactionCreateOrConnectWithoutWalletInput[]
    upsert?: CreditTransactionUpsertWithWhereUniqueWithoutWalletInput | CreditTransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: CreditTransactionCreateManyWalletInputEnvelope
    set?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    disconnect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    delete?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    update?: CreditTransactionUpdateWithWhereUniqueWithoutWalletInput | CreditTransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: CreditTransactionUpdateManyWithWhereWithoutWalletInput | CreditTransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
  }

  export type CreditWalletCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<CreditWalletCreateWithoutTransactionsInput, CreditWalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CreditWalletCreateOrConnectWithoutTransactionsInput
    connect?: CreditWalletWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutCreditTransactionsInput = {
    create?: XOR<CustomerCreateWithoutCreditTransactionsInput, CustomerUncheckedCreateWithoutCreditTransactionsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutCreditTransactionsInput
    connect?: CustomerWhereUniqueInput
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type CreditWalletUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<CreditWalletCreateWithoutTransactionsInput, CreditWalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CreditWalletCreateOrConnectWithoutTransactionsInput
    upsert?: CreditWalletUpsertWithoutTransactionsInput
    connect?: CreditWalletWhereUniqueInput
    update?: XOR<XOR<CreditWalletUpdateToOneWithWhereWithoutTransactionsInput, CreditWalletUpdateWithoutTransactionsInput>, CreditWalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type CustomerUpdateOneRequiredWithoutCreditTransactionsNestedInput = {
    create?: XOR<CustomerCreateWithoutCreditTransactionsInput, CustomerUncheckedCreateWithoutCreditTransactionsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutCreditTransactionsInput
    upsert?: CustomerUpsertWithoutCreditTransactionsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutCreditTransactionsInput, CustomerUpdateWithoutCreditTransactionsInput>, CustomerUncheckedUpdateWithoutCreditTransactionsInput>
  }

  export type CustomerCreateNestedOneWithoutBurnTablesInput = {
    create?: XOR<CustomerCreateWithoutBurnTablesInput, CustomerUncheckedCreateWithoutBurnTablesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutBurnTablesInput
    connect?: CustomerWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CustomerUpdateOneWithoutBurnTablesNestedInput = {
    create?: XOR<CustomerCreateWithoutBurnTablesInput, CustomerUncheckedCreateWithoutBurnTablesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutBurnTablesInput
    upsert?: CustomerUpsertWithoutBurnTablesInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutBurnTablesInput, CustomerUpdateWithoutBurnTablesInput>, CustomerUncheckedUpdateWithoutBurnTablesInput>
  }

  export type EnumProviderNameFieldUpdateOperationsInput = {
    set?: $Enums.ProviderName
  }

  export type EnumCostTypeFieldUpdateOperationsInput = {
    set?: $Enums.CostType
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type CustomerCreateNestedOneWithoutUsageEventsInput = {
    create?: XOR<CustomerCreateWithoutUsageEventsInput, CustomerUncheckedCreateWithoutUsageEventsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUsageEventsInput
    connect?: CustomerWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUsageEventsInput = {
    create?: XOR<UserCreateWithoutUsageEventsInput, UserUncheckedCreateWithoutUsageEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUsageEventsInput
    connect?: UserWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutUsageEventsInput = {
    create?: XOR<TeamCreateWithoutUsageEventsInput, TeamUncheckedCreateWithoutUsageEventsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutUsageEventsInput
    connect?: TeamWhereUniqueInput
  }

  export type EnumEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.EventType
  }

  export type NullableEnumProviderNameFieldUpdateOperationsInput = {
    set?: $Enums.ProviderName | null
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type CustomerUpdateOneRequiredWithoutUsageEventsNestedInput = {
    create?: XOR<CustomerCreateWithoutUsageEventsInput, CustomerUncheckedCreateWithoutUsageEventsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUsageEventsInput
    upsert?: CustomerUpsertWithoutUsageEventsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutUsageEventsInput, CustomerUpdateWithoutUsageEventsInput>, CustomerUncheckedUpdateWithoutUsageEventsInput>
  }

  export type UserUpdateOneWithoutUsageEventsNestedInput = {
    create?: XOR<UserCreateWithoutUsageEventsInput, UserUncheckedCreateWithoutUsageEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUsageEventsInput
    upsert?: UserUpsertWithoutUsageEventsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUsageEventsInput, UserUpdateWithoutUsageEventsInput>, UserUncheckedUpdateWithoutUsageEventsInput>
  }

  export type TeamUpdateOneWithoutUsageEventsNestedInput = {
    create?: XOR<TeamCreateWithoutUsageEventsInput, TeamUncheckedCreateWithoutUsageEventsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutUsageEventsInput
    upsert?: TeamUpsertWithoutUsageEventsInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutUsageEventsInput, TeamUpdateWithoutUsageEventsInput>, TeamUncheckedUpdateWithoutUsageEventsInput>
  }

  export type SubscriptionCreateNestedManyWithoutPlanInput = {
    create?: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput> | SubscriptionCreateWithoutPlanInput[] | SubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPlanInput | SubscriptionCreateOrConnectWithoutPlanInput[]
    createMany?: SubscriptionCreateManyPlanInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput> | SubscriptionCreateWithoutPlanInput[] | SubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPlanInput | SubscriptionCreateOrConnectWithoutPlanInput[]
    createMany?: SubscriptionCreateManyPlanInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type SubscriptionUpdateManyWithoutPlanNestedInput = {
    create?: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput> | SubscriptionCreateWithoutPlanInput[] | SubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPlanInput | SubscriptionCreateOrConnectWithoutPlanInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutPlanInput | SubscriptionUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: SubscriptionCreateManyPlanInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutPlanInput | SubscriptionUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutPlanInput | SubscriptionUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput> | SubscriptionCreateWithoutPlanInput[] | SubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPlanInput | SubscriptionCreateOrConnectWithoutPlanInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutPlanInput | SubscriptionUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: SubscriptionCreateManyPlanInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutPlanInput | SubscriptionUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutPlanInput | SubscriptionUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<CustomerCreateWithoutSubscriptionsInput, CustomerUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutSubscriptionsInput
    connect?: CustomerWhereUniqueInput
  }

  export type PlanCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<PlanCreateWithoutSubscriptionsInput, PlanUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutSubscriptionsInput
    connect?: PlanWhereUniqueInput
  }

  export type EnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionStatus
  }

  export type NullableEnumBillingPeriodFieldUpdateOperationsInput = {
    set?: $Enums.BillingPeriod | null
  }

  export type CustomerUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<CustomerCreateWithoutSubscriptionsInput, CustomerUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutSubscriptionsInput
    upsert?: CustomerUpsertWithoutSubscriptionsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutSubscriptionsInput, CustomerUpdateWithoutSubscriptionsInput>, CustomerUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type PlanUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<PlanCreateWithoutSubscriptionsInput, PlanUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutSubscriptionsInput
    upsert?: PlanUpsertWithoutSubscriptionsInput
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutSubscriptionsInput, PlanUpdateWithoutSubscriptionsInput>, PlanUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type CustomerCreateNestedOneWithoutEntitlementsInput = {
    create?: XOR<CustomerCreateWithoutEntitlementsInput, CustomerUncheckedCreateWithoutEntitlementsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutEntitlementsInput
    connect?: CustomerWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutEntitlementsInput = {
    create?: XOR<UserCreateWithoutEntitlementsInput, UserUncheckedCreateWithoutEntitlementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEntitlementsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableEnumLimitTypeFieldUpdateOperationsInput = {
    set?: $Enums.LimitType | null
  }

  export type NullableEnumLimitPeriodFieldUpdateOperationsInput = {
    set?: $Enums.LimitPeriod | null
  }

  export type CustomerUpdateOneRequiredWithoutEntitlementsNestedInput = {
    create?: XOR<CustomerCreateWithoutEntitlementsInput, CustomerUncheckedCreateWithoutEntitlementsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutEntitlementsInput
    upsert?: CustomerUpsertWithoutEntitlementsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutEntitlementsInput, CustomerUpdateWithoutEntitlementsInput>, CustomerUncheckedUpdateWithoutEntitlementsInput>
  }

  export type UserUpdateOneWithoutEntitlementsNestedInput = {
    create?: XOR<UserCreateWithoutEntitlementsInput, UserUncheckedCreateWithoutEntitlementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEntitlementsInput
    upsert?: UserUpsertWithoutEntitlementsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEntitlementsInput, UserUpdateWithoutEntitlementsInput>, UserUncheckedUpdateWithoutEntitlementsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumCustomerTierFilter<$PrismaModel = never> = {
    equals?: $Enums.CustomerTier | EnumCustomerTierFieldRefInput<$PrismaModel>
    in?: $Enums.CustomerTier[] | ListEnumCustomerTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.CustomerTier[] | ListEnumCustomerTierFieldRefInput<$PrismaModel>
    not?: NestedEnumCustomerTierFilter<$PrismaModel> | $Enums.CustomerTier
  }

  export type NestedEnumCustomerStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CustomerStatus | EnumCustomerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CustomerStatus[] | ListEnumCustomerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CustomerStatus[] | ListEnumCustomerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCustomerStatusFilter<$PrismaModel> | $Enums.CustomerStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumCustomerTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CustomerTier | EnumCustomerTierFieldRefInput<$PrismaModel>
    in?: $Enums.CustomerTier[] | ListEnumCustomerTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.CustomerTier[] | ListEnumCustomerTierFieldRefInput<$PrismaModel>
    not?: NestedEnumCustomerTierWithAggregatesFilter<$PrismaModel> | $Enums.CustomerTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCustomerTierFilter<$PrismaModel>
    _max?: NestedEnumCustomerTierFilter<$PrismaModel>
  }

  export type NestedEnumCustomerStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CustomerStatus | EnumCustomerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CustomerStatus[] | ListEnumCustomerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CustomerStatus[] | ListEnumCustomerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCustomerStatusWithAggregatesFilter<$PrismaModel> | $Enums.CustomerStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCustomerStatusFilter<$PrismaModel>
    _max?: NestedEnumCustomerStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumTeamRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamRole | EnumTeamRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumTeamRoleFilter<$PrismaModel> | $Enums.TeamRole
  }

  export type NestedEnumTeamRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamRole | EnumTeamRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumTeamRoleWithAggregatesFilter<$PrismaModel> | $Enums.TeamRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTeamRoleFilter<$PrismaModel>
    _max?: NestedEnumTeamRoleFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumProviderNameFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderName | EnumProviderNameFieldRefInput<$PrismaModel>
    in?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderNameFilter<$PrismaModel> | $Enums.ProviderName
  }

  export type NestedEnumCostTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CostType | EnumCostTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCostTypeFilter<$PrismaModel> | $Enums.CostType
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumProviderNameWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderName | EnumProviderNameFieldRefInput<$PrismaModel>
    in?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderNameWithAggregatesFilter<$PrismaModel> | $Enums.ProviderName
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderNameFilter<$PrismaModel>
    _max?: NestedEnumProviderNameFilter<$PrismaModel>
  }

  export type NestedEnumCostTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CostType | EnumCostTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CostType[] | ListEnumCostTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCostTypeWithAggregatesFilter<$PrismaModel> | $Enums.CostType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCostTypeFilter<$PrismaModel>
    _max?: NestedEnumCostTypeFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType
  }

  export type NestedEnumProviderNameNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderName | EnumProviderNameFieldRefInput<$PrismaModel> | null
    in?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel> | null
    not?: NestedEnumProviderNameNullableFilter<$PrismaModel> | $Enums.ProviderName | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventTypeFilter<$PrismaModel>
    _max?: NestedEnumEventTypeFilter<$PrismaModel>
  }

  export type NestedEnumProviderNameNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderName | EnumProviderNameFieldRefInput<$PrismaModel> | null
    in?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ProviderName[] | ListEnumProviderNameFieldRefInput<$PrismaModel> | null
    not?: NestedEnumProviderNameNullableWithAggregatesFilter<$PrismaModel> | $Enums.ProviderName | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumProviderNameNullableFilter<$PrismaModel>
    _max?: NestedEnumProviderNameNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type NestedEnumBillingPeriodNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.BillingPeriod | EnumBillingPeriodFieldRefInput<$PrismaModel> | null
    in?: $Enums.BillingPeriod[] | ListEnumBillingPeriodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.BillingPeriod[] | ListEnumBillingPeriodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumBillingPeriodNullableFilter<$PrismaModel> | $Enums.BillingPeriod | null
  }

  export type NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type NestedEnumBillingPeriodNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BillingPeriod | EnumBillingPeriodFieldRefInput<$PrismaModel> | null
    in?: $Enums.BillingPeriod[] | ListEnumBillingPeriodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.BillingPeriod[] | ListEnumBillingPeriodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumBillingPeriodNullableWithAggregatesFilter<$PrismaModel> | $Enums.BillingPeriod | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumBillingPeriodNullableFilter<$PrismaModel>
    _max?: NestedEnumBillingPeriodNullableFilter<$PrismaModel>
  }

  export type NestedEnumLimitTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.LimitType | EnumLimitTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.LimitType[] | ListEnumLimitTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LimitType[] | ListEnumLimitTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLimitTypeNullableFilter<$PrismaModel> | $Enums.LimitType | null
  }

  export type NestedEnumLimitPeriodNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.LimitPeriod | EnumLimitPeriodFieldRefInput<$PrismaModel> | null
    in?: $Enums.LimitPeriod[] | ListEnumLimitPeriodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LimitPeriod[] | ListEnumLimitPeriodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLimitPeriodNullableFilter<$PrismaModel> | $Enums.LimitPeriod | null
  }

  export type NestedEnumLimitTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LimitType | EnumLimitTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.LimitType[] | ListEnumLimitTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LimitType[] | ListEnumLimitTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLimitTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.LimitType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumLimitTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumLimitTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumLimitPeriodNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LimitPeriod | EnumLimitPeriodFieldRefInput<$PrismaModel> | null
    in?: $Enums.LimitPeriod[] | ListEnumLimitPeriodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LimitPeriod[] | ListEnumLimitPeriodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLimitPeriodNullableWithAggregatesFilter<$PrismaModel> | $Enums.LimitPeriod | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumLimitPeriodNullableFilter<$PrismaModel>
    _max?: NestedEnumLimitPeriodNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutCustomerInput = {
    id?: string
    externalUserId: string
    email?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    creditWallets?: CreditWalletCreateNestedManyWithoutUserInput
    teamMemberships?: TeamMembershipCreateNestedManyWithoutUserInput
    entitlements?: EntitlementCreateNestedManyWithoutUserInput
    usageEvents?: UsageEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCustomerInput = {
    id?: string
    externalUserId: string
    email?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutUserInput
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutUserInput
    entitlements?: EntitlementUncheckedCreateNestedManyWithoutUserInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCustomerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
  }

  export type UserCreateManyCustomerInputEnvelope = {
    data: UserCreateManyCustomerInput | UserCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type TeamCreateWithoutCustomerInput = {
    id?: string
    name: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    creditWallets?: CreditWalletCreateNestedManyWithoutTeamInput
    memberships?: TeamMembershipCreateNestedManyWithoutTeamInput
    usageEvents?: UsageEventCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutCustomerInput = {
    id?: string
    name: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutTeamInput
    memberships?: TeamMembershipUncheckedCreateNestedManyWithoutTeamInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutCustomerInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutCustomerInput, TeamUncheckedCreateWithoutCustomerInput>
  }

  export type TeamCreateManyCustomerInputEnvelope = {
    data: TeamCreateManyCustomerInput | TeamCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CreditWalletCreateWithoutCustomerInput = {
    id?: string
    balance?: bigint | number
    reservedBalance?: bigint | number
    currency?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutCreditWalletsInput
    team?: TeamCreateNestedOneWithoutCreditWalletsInput
    transactions?: CreditTransactionCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletUncheckedCreateWithoutCustomerInput = {
    id?: string
    userId?: string | null
    teamId?: string | null
    balance?: bigint | number
    reservedBalance?: bigint | number
    currency?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: CreditTransactionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletCreateOrConnectWithoutCustomerInput = {
    where: CreditWalletWhereUniqueInput
    create: XOR<CreditWalletCreateWithoutCustomerInput, CreditWalletUncheckedCreateWithoutCustomerInput>
  }

  export type CreditWalletCreateManyCustomerInputEnvelope = {
    data: CreditWalletCreateManyCustomerInput | CreditWalletCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CreditTransactionCreateWithoutCustomerInput = {
    id?: string
    transactionType: $Enums.TransactionType
    amount: bigint | number
    balanceBefore: bigint | number
    balanceAfter: bigint | number
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    createdAt?: Date | string
    wallet: CreditWalletCreateNestedOneWithoutTransactionsInput
  }

  export type CreditTransactionUncheckedCreateWithoutCustomerInput = {
    id?: string
    walletId: string
    transactionType: $Enums.TransactionType
    amount: bigint | number
    balanceBefore: bigint | number
    balanceAfter: bigint | number
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    createdAt?: Date | string
  }

  export type CreditTransactionCreateOrConnectWithoutCustomerInput = {
    where: CreditTransactionWhereUniqueInput
    create: XOR<CreditTransactionCreateWithoutCustomerInput, CreditTransactionUncheckedCreateWithoutCustomerInput>
  }

  export type CreditTransactionCreateManyCustomerInputEnvelope = {
    data: CreditTransactionCreateManyCustomerInput | CreditTransactionCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionCreateWithoutCustomerInput = {
    id?: string
    status: $Enums.SubscriptionStatus
    billingPeriod?: $Enums.BillingPeriod | null
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    cancelAtPeriodEnd?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: PlanCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateWithoutCustomerInput = {
    id?: string
    planId: string
    status: $Enums.SubscriptionStatus
    billingPeriod?: $Enums.BillingPeriod | null
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    cancelAtPeriodEnd?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutCustomerInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutCustomerInput, SubscriptionUncheckedCreateWithoutCustomerInput>
  }

  export type SubscriptionCreateManyCustomerInputEnvelope = {
    data: SubscriptionCreateManyCustomerInput | SubscriptionCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type UsageEventCreateWithoutCustomerInput = {
    id?: string
    eventType: $Enums.EventType
    featureId: string
    provider?: $Enums.ProviderName | null
    model?: string | null
    inputTokens?: bigint | number | null
    outputTokens?: bigint | number | null
    creditsBurned: bigint | number
    costUsd?: Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    timestamp?: Date | string
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutUsageEventsInput
    team?: TeamCreateNestedOneWithoutUsageEventsInput
  }

  export type UsageEventUncheckedCreateWithoutCustomerInput = {
    id?: string
    userId?: string | null
    teamId?: string | null
    eventType: $Enums.EventType
    featureId: string
    provider?: $Enums.ProviderName | null
    model?: string | null
    inputTokens?: bigint | number | null
    outputTokens?: bigint | number | null
    creditsBurned: bigint | number
    costUsd?: Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type UsageEventCreateOrConnectWithoutCustomerInput = {
    where: UsageEventWhereUniqueInput
    create: XOR<UsageEventCreateWithoutCustomerInput, UsageEventUncheckedCreateWithoutCustomerInput>
  }

  export type UsageEventCreateManyCustomerInputEnvelope = {
    data: UsageEventCreateManyCustomerInput | UsageEventCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type BurnTableCreateWithoutCustomerInput = {
    id?: string
    name: string
    version?: number
    rules: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    validFrom?: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BurnTableUncheckedCreateWithoutCustomerInput = {
    id?: string
    name: string
    version?: number
    rules: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    validFrom?: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BurnTableCreateOrConnectWithoutCustomerInput = {
    where: BurnTableWhereUniqueInput
    create: XOR<BurnTableCreateWithoutCustomerInput, BurnTableUncheckedCreateWithoutCustomerInput>
  }

  export type BurnTableCreateManyCustomerInputEnvelope = {
    data: BurnTableCreateManyCustomerInput | BurnTableCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type EntitlementCreateWithoutCustomerInput = {
    id?: string
    featureId: string
    limitType?: $Enums.LimitType | null
    limitValue?: bigint | number | null
    period?: $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutEntitlementsInput
  }

  export type EntitlementUncheckedCreateWithoutCustomerInput = {
    id?: string
    userId?: string | null
    featureId: string
    limitType?: $Enums.LimitType | null
    limitValue?: bigint | number | null
    period?: $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntitlementCreateOrConnectWithoutCustomerInput = {
    where: EntitlementWhereUniqueInput
    create: XOR<EntitlementCreateWithoutCustomerInput, EntitlementUncheckedCreateWithoutCustomerInput>
  }

  export type EntitlementCreateManyCustomerInputEnvelope = {
    data: EntitlementCreateManyCustomerInput | EntitlementCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutCustomerInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCustomerInput, UserUncheckedUpdateWithoutCustomerInput>
    create: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCustomerInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCustomerInput, UserUncheckedUpdateWithoutCustomerInput>
  }

  export type UserUpdateManyWithWhereWithoutCustomerInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCustomerInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    customerId?: StringFilter<"User"> | string
    externalUserId?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    metadata?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type TeamUpsertWithWhereUniqueWithoutCustomerInput = {
    where: TeamWhereUniqueInput
    update: XOR<TeamUpdateWithoutCustomerInput, TeamUncheckedUpdateWithoutCustomerInput>
    create: XOR<TeamCreateWithoutCustomerInput, TeamUncheckedCreateWithoutCustomerInput>
  }

  export type TeamUpdateWithWhereUniqueWithoutCustomerInput = {
    where: TeamWhereUniqueInput
    data: XOR<TeamUpdateWithoutCustomerInput, TeamUncheckedUpdateWithoutCustomerInput>
  }

  export type TeamUpdateManyWithWhereWithoutCustomerInput = {
    where: TeamScalarWhereInput
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyWithoutCustomerInput>
  }

  export type TeamScalarWhereInput = {
    AND?: TeamScalarWhereInput | TeamScalarWhereInput[]
    OR?: TeamScalarWhereInput[]
    NOT?: TeamScalarWhereInput | TeamScalarWhereInput[]
    id?: StringFilter<"Team"> | string
    customerId?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    metadata?: JsonNullableFilter<"Team">
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
  }

  export type CreditWalletUpsertWithWhereUniqueWithoutCustomerInput = {
    where: CreditWalletWhereUniqueInput
    update: XOR<CreditWalletUpdateWithoutCustomerInput, CreditWalletUncheckedUpdateWithoutCustomerInput>
    create: XOR<CreditWalletCreateWithoutCustomerInput, CreditWalletUncheckedCreateWithoutCustomerInput>
  }

  export type CreditWalletUpdateWithWhereUniqueWithoutCustomerInput = {
    where: CreditWalletWhereUniqueInput
    data: XOR<CreditWalletUpdateWithoutCustomerInput, CreditWalletUncheckedUpdateWithoutCustomerInput>
  }

  export type CreditWalletUpdateManyWithWhereWithoutCustomerInput = {
    where: CreditWalletScalarWhereInput
    data: XOR<CreditWalletUpdateManyMutationInput, CreditWalletUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CreditWalletScalarWhereInput = {
    AND?: CreditWalletScalarWhereInput | CreditWalletScalarWhereInput[]
    OR?: CreditWalletScalarWhereInput[]
    NOT?: CreditWalletScalarWhereInput | CreditWalletScalarWhereInput[]
    id?: StringFilter<"CreditWallet"> | string
    customerId?: StringFilter<"CreditWallet"> | string
    userId?: StringNullableFilter<"CreditWallet"> | string | null
    teamId?: StringNullableFilter<"CreditWallet"> | string | null
    balance?: BigIntFilter<"CreditWallet"> | bigint | number
    reservedBalance?: BigIntFilter<"CreditWallet"> | bigint | number
    currency?: StringFilter<"CreditWallet"> | string
    expiresAt?: DateTimeNullableFilter<"CreditWallet"> | Date | string | null
    createdAt?: DateTimeFilter<"CreditWallet"> | Date | string
    updatedAt?: DateTimeFilter<"CreditWallet"> | Date | string
  }

  export type CreditTransactionUpsertWithWhereUniqueWithoutCustomerInput = {
    where: CreditTransactionWhereUniqueInput
    update: XOR<CreditTransactionUpdateWithoutCustomerInput, CreditTransactionUncheckedUpdateWithoutCustomerInput>
    create: XOR<CreditTransactionCreateWithoutCustomerInput, CreditTransactionUncheckedCreateWithoutCustomerInput>
  }

  export type CreditTransactionUpdateWithWhereUniqueWithoutCustomerInput = {
    where: CreditTransactionWhereUniqueInput
    data: XOR<CreditTransactionUpdateWithoutCustomerInput, CreditTransactionUncheckedUpdateWithoutCustomerInput>
  }

  export type CreditTransactionUpdateManyWithWhereWithoutCustomerInput = {
    where: CreditTransactionScalarWhereInput
    data: XOR<CreditTransactionUpdateManyMutationInput, CreditTransactionUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CreditTransactionScalarWhereInput = {
    AND?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
    OR?: CreditTransactionScalarWhereInput[]
    NOT?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
    id?: StringFilter<"CreditTransaction"> | string
    walletId?: StringFilter<"CreditTransaction"> | string
    customerId?: StringFilter<"CreditTransaction"> | string
    transactionType?: EnumTransactionTypeFilter<"CreditTransaction"> | $Enums.TransactionType
    amount?: BigIntFilter<"CreditTransaction"> | bigint | number
    balanceBefore?: BigIntFilter<"CreditTransaction"> | bigint | number
    balanceAfter?: BigIntFilter<"CreditTransaction"> | bigint | number
    description?: StringNullableFilter<"CreditTransaction"> | string | null
    metadata?: JsonNullableFilter<"CreditTransaction">
    idempotencyKey?: StringNullableFilter<"CreditTransaction"> | string | null
    createdAt?: DateTimeFilter<"CreditTransaction"> | Date | string
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutCustomerInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutCustomerInput, SubscriptionUncheckedUpdateWithoutCustomerInput>
    create: XOR<SubscriptionCreateWithoutCustomerInput, SubscriptionUncheckedCreateWithoutCustomerInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutCustomerInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutCustomerInput, SubscriptionUncheckedUpdateWithoutCustomerInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutCustomerInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutCustomerInput>
  }

  export type SubscriptionScalarWhereInput = {
    AND?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    OR?: SubscriptionScalarWhereInput[]
    NOT?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    id?: StringFilter<"Subscription"> | string
    customerId?: StringFilter<"Subscription"> | string
    planId?: StringFilter<"Subscription"> | string
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    billingPeriod?: EnumBillingPeriodNullableFilter<"Subscription"> | $Enums.BillingPeriod | null
    currentPeriodStart?: DateTimeFilter<"Subscription"> | Date | string
    currentPeriodEnd?: DateTimeFilter<"Subscription"> | Date | string
    cancelAtPeriodEnd?: BoolFilter<"Subscription"> | boolean
    metadata?: JsonNullableFilter<"Subscription">
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
  }

  export type UsageEventUpsertWithWhereUniqueWithoutCustomerInput = {
    where: UsageEventWhereUniqueInput
    update: XOR<UsageEventUpdateWithoutCustomerInput, UsageEventUncheckedUpdateWithoutCustomerInput>
    create: XOR<UsageEventCreateWithoutCustomerInput, UsageEventUncheckedCreateWithoutCustomerInput>
  }

  export type UsageEventUpdateWithWhereUniqueWithoutCustomerInput = {
    where: UsageEventWhereUniqueInput
    data: XOR<UsageEventUpdateWithoutCustomerInput, UsageEventUncheckedUpdateWithoutCustomerInput>
  }

  export type UsageEventUpdateManyWithWhereWithoutCustomerInput = {
    where: UsageEventScalarWhereInput
    data: XOR<UsageEventUpdateManyMutationInput, UsageEventUncheckedUpdateManyWithoutCustomerInput>
  }

  export type UsageEventScalarWhereInput = {
    AND?: UsageEventScalarWhereInput | UsageEventScalarWhereInput[]
    OR?: UsageEventScalarWhereInput[]
    NOT?: UsageEventScalarWhereInput | UsageEventScalarWhereInput[]
    id?: StringFilter<"UsageEvent"> | string
    customerId?: StringFilter<"UsageEvent"> | string
    userId?: StringNullableFilter<"UsageEvent"> | string | null
    teamId?: StringNullableFilter<"UsageEvent"> | string | null
    eventType?: EnumEventTypeFilter<"UsageEvent"> | $Enums.EventType
    featureId?: StringFilter<"UsageEvent"> | string
    provider?: EnumProviderNameNullableFilter<"UsageEvent"> | $Enums.ProviderName | null
    model?: StringNullableFilter<"UsageEvent"> | string | null
    inputTokens?: BigIntNullableFilter<"UsageEvent"> | bigint | number | null
    outputTokens?: BigIntNullableFilter<"UsageEvent"> | bigint | number | null
    creditsBurned?: BigIntFilter<"UsageEvent"> | bigint | number
    costUsd?: DecimalNullableFilter<"UsageEvent"> | Decimal | DecimalJsLike | number | string | null
    metadata?: JsonNullableFilter<"UsageEvent">
    idempotencyKey?: StringNullableFilter<"UsageEvent"> | string | null
    timestamp?: DateTimeFilter<"UsageEvent"> | Date | string
    createdAt?: DateTimeFilter<"UsageEvent"> | Date | string
  }

  export type BurnTableUpsertWithWhereUniqueWithoutCustomerInput = {
    where: BurnTableWhereUniqueInput
    update: XOR<BurnTableUpdateWithoutCustomerInput, BurnTableUncheckedUpdateWithoutCustomerInput>
    create: XOR<BurnTableCreateWithoutCustomerInput, BurnTableUncheckedCreateWithoutCustomerInput>
  }

  export type BurnTableUpdateWithWhereUniqueWithoutCustomerInput = {
    where: BurnTableWhereUniqueInput
    data: XOR<BurnTableUpdateWithoutCustomerInput, BurnTableUncheckedUpdateWithoutCustomerInput>
  }

  export type BurnTableUpdateManyWithWhereWithoutCustomerInput = {
    where: BurnTableScalarWhereInput
    data: XOR<BurnTableUpdateManyMutationInput, BurnTableUncheckedUpdateManyWithoutCustomerInput>
  }

  export type BurnTableScalarWhereInput = {
    AND?: BurnTableScalarWhereInput | BurnTableScalarWhereInput[]
    OR?: BurnTableScalarWhereInput[]
    NOT?: BurnTableScalarWhereInput | BurnTableScalarWhereInput[]
    id?: StringFilter<"BurnTable"> | string
    customerId?: StringNullableFilter<"BurnTable"> | string | null
    name?: StringFilter<"BurnTable"> | string
    version?: IntFilter<"BurnTable"> | number
    rules?: JsonFilter<"BurnTable">
    isActive?: BoolFilter<"BurnTable"> | boolean
    validFrom?: DateTimeFilter<"BurnTable"> | Date | string
    validUntil?: DateTimeNullableFilter<"BurnTable"> | Date | string | null
    createdAt?: DateTimeFilter<"BurnTable"> | Date | string
    updatedAt?: DateTimeFilter<"BurnTable"> | Date | string
  }

  export type EntitlementUpsertWithWhereUniqueWithoutCustomerInput = {
    where: EntitlementWhereUniqueInput
    update: XOR<EntitlementUpdateWithoutCustomerInput, EntitlementUncheckedUpdateWithoutCustomerInput>
    create: XOR<EntitlementCreateWithoutCustomerInput, EntitlementUncheckedCreateWithoutCustomerInput>
  }

  export type EntitlementUpdateWithWhereUniqueWithoutCustomerInput = {
    where: EntitlementWhereUniqueInput
    data: XOR<EntitlementUpdateWithoutCustomerInput, EntitlementUncheckedUpdateWithoutCustomerInput>
  }

  export type EntitlementUpdateManyWithWhereWithoutCustomerInput = {
    where: EntitlementScalarWhereInput
    data: XOR<EntitlementUpdateManyMutationInput, EntitlementUncheckedUpdateManyWithoutCustomerInput>
  }

  export type EntitlementScalarWhereInput = {
    AND?: EntitlementScalarWhereInput | EntitlementScalarWhereInput[]
    OR?: EntitlementScalarWhereInput[]
    NOT?: EntitlementScalarWhereInput | EntitlementScalarWhereInput[]
    id?: StringFilter<"Entitlement"> | string
    customerId?: StringFilter<"Entitlement"> | string
    userId?: StringNullableFilter<"Entitlement"> | string | null
    featureId?: StringFilter<"Entitlement"> | string
    limitType?: EnumLimitTypeNullableFilter<"Entitlement"> | $Enums.LimitType | null
    limitValue?: BigIntNullableFilter<"Entitlement"> | bigint | number | null
    period?: EnumLimitPeriodNullableFilter<"Entitlement"> | $Enums.LimitPeriod | null
    metadata?: JsonNullableFilter<"Entitlement">
    createdAt?: DateTimeFilter<"Entitlement"> | Date | string
    updatedAt?: DateTimeFilter<"Entitlement"> | Date | string
  }

  export type CustomerCreateWithoutUsersInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    teams?: TeamCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    teams?: TeamUncheckedCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableUncheckedCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutUsersInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutUsersInput, CustomerUncheckedCreateWithoutUsersInput>
  }

  export type CreditWalletCreateWithoutUserInput = {
    id?: string
    balance?: bigint | number
    reservedBalance?: bigint | number
    currency?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCreditWalletsInput
    team?: TeamCreateNestedOneWithoutCreditWalletsInput
    transactions?: CreditTransactionCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletUncheckedCreateWithoutUserInput = {
    id?: string
    customerId: string
    teamId?: string | null
    balance?: bigint | number
    reservedBalance?: bigint | number
    currency?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: CreditTransactionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletCreateOrConnectWithoutUserInput = {
    where: CreditWalletWhereUniqueInput
    create: XOR<CreditWalletCreateWithoutUserInput, CreditWalletUncheckedCreateWithoutUserInput>
  }

  export type CreditWalletCreateManyUserInputEnvelope = {
    data: CreditWalletCreateManyUserInput | CreditWalletCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TeamMembershipCreateWithoutUserInput = {
    id?: string
    role?: $Enums.TeamRole
    createdAt?: Date | string
    team: TeamCreateNestedOneWithoutMembershipsInput
  }

  export type TeamMembershipUncheckedCreateWithoutUserInput = {
    id?: string
    teamId: string
    role?: $Enums.TeamRole
    createdAt?: Date | string
  }

  export type TeamMembershipCreateOrConnectWithoutUserInput = {
    where: TeamMembershipWhereUniqueInput
    create: XOR<TeamMembershipCreateWithoutUserInput, TeamMembershipUncheckedCreateWithoutUserInput>
  }

  export type TeamMembershipCreateManyUserInputEnvelope = {
    data: TeamMembershipCreateManyUserInput | TeamMembershipCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EntitlementCreateWithoutUserInput = {
    id?: string
    featureId: string
    limitType?: $Enums.LimitType | null
    limitValue?: bigint | number | null
    period?: $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutEntitlementsInput
  }

  export type EntitlementUncheckedCreateWithoutUserInput = {
    id?: string
    customerId: string
    featureId: string
    limitType?: $Enums.LimitType | null
    limitValue?: bigint | number | null
    period?: $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntitlementCreateOrConnectWithoutUserInput = {
    where: EntitlementWhereUniqueInput
    create: XOR<EntitlementCreateWithoutUserInput, EntitlementUncheckedCreateWithoutUserInput>
  }

  export type EntitlementCreateManyUserInputEnvelope = {
    data: EntitlementCreateManyUserInput | EntitlementCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UsageEventCreateWithoutUserInput = {
    id?: string
    eventType: $Enums.EventType
    featureId: string
    provider?: $Enums.ProviderName | null
    model?: string | null
    inputTokens?: bigint | number | null
    outputTokens?: bigint | number | null
    creditsBurned: bigint | number
    costUsd?: Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    timestamp?: Date | string
    createdAt?: Date | string
    customer: CustomerCreateNestedOneWithoutUsageEventsInput
    team?: TeamCreateNestedOneWithoutUsageEventsInput
  }

  export type UsageEventUncheckedCreateWithoutUserInput = {
    id?: string
    customerId: string
    teamId?: string | null
    eventType: $Enums.EventType
    featureId: string
    provider?: $Enums.ProviderName | null
    model?: string | null
    inputTokens?: bigint | number | null
    outputTokens?: bigint | number | null
    creditsBurned: bigint | number
    costUsd?: Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type UsageEventCreateOrConnectWithoutUserInput = {
    where: UsageEventWhereUniqueInput
    create: XOR<UsageEventCreateWithoutUserInput, UsageEventUncheckedCreateWithoutUserInput>
  }

  export type UsageEventCreateManyUserInputEnvelope = {
    data: UsageEventCreateManyUserInput | UsageEventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithoutUsersInput = {
    update: XOR<CustomerUpdateWithoutUsersInput, CustomerUncheckedUpdateWithoutUsersInput>
    create: XOR<CustomerCreateWithoutUsersInput, CustomerUncheckedCreateWithoutUsersInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutUsersInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutUsersInput, CustomerUncheckedUpdateWithoutUsersInput>
  }

  export type CustomerUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teams?: TeamUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teams?: TeamUncheckedUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUncheckedUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CreditWalletUpsertWithWhereUniqueWithoutUserInput = {
    where: CreditWalletWhereUniqueInput
    update: XOR<CreditWalletUpdateWithoutUserInput, CreditWalletUncheckedUpdateWithoutUserInput>
    create: XOR<CreditWalletCreateWithoutUserInput, CreditWalletUncheckedCreateWithoutUserInput>
  }

  export type CreditWalletUpdateWithWhereUniqueWithoutUserInput = {
    where: CreditWalletWhereUniqueInput
    data: XOR<CreditWalletUpdateWithoutUserInput, CreditWalletUncheckedUpdateWithoutUserInput>
  }

  export type CreditWalletUpdateManyWithWhereWithoutUserInput = {
    where: CreditWalletScalarWhereInput
    data: XOR<CreditWalletUpdateManyMutationInput, CreditWalletUncheckedUpdateManyWithoutUserInput>
  }

  export type TeamMembershipUpsertWithWhereUniqueWithoutUserInput = {
    where: TeamMembershipWhereUniqueInput
    update: XOR<TeamMembershipUpdateWithoutUserInput, TeamMembershipUncheckedUpdateWithoutUserInput>
    create: XOR<TeamMembershipCreateWithoutUserInput, TeamMembershipUncheckedCreateWithoutUserInput>
  }

  export type TeamMembershipUpdateWithWhereUniqueWithoutUserInput = {
    where: TeamMembershipWhereUniqueInput
    data: XOR<TeamMembershipUpdateWithoutUserInput, TeamMembershipUncheckedUpdateWithoutUserInput>
  }

  export type TeamMembershipUpdateManyWithWhereWithoutUserInput = {
    where: TeamMembershipScalarWhereInput
    data: XOR<TeamMembershipUpdateManyMutationInput, TeamMembershipUncheckedUpdateManyWithoutUserInput>
  }

  export type TeamMembershipScalarWhereInput = {
    AND?: TeamMembershipScalarWhereInput | TeamMembershipScalarWhereInput[]
    OR?: TeamMembershipScalarWhereInput[]
    NOT?: TeamMembershipScalarWhereInput | TeamMembershipScalarWhereInput[]
    id?: StringFilter<"TeamMembership"> | string
    teamId?: StringFilter<"TeamMembership"> | string
    userId?: StringFilter<"TeamMembership"> | string
    role?: EnumTeamRoleFilter<"TeamMembership"> | $Enums.TeamRole
    createdAt?: DateTimeFilter<"TeamMembership"> | Date | string
  }

  export type EntitlementUpsertWithWhereUniqueWithoutUserInput = {
    where: EntitlementWhereUniqueInput
    update: XOR<EntitlementUpdateWithoutUserInput, EntitlementUncheckedUpdateWithoutUserInput>
    create: XOR<EntitlementCreateWithoutUserInput, EntitlementUncheckedCreateWithoutUserInput>
  }

  export type EntitlementUpdateWithWhereUniqueWithoutUserInput = {
    where: EntitlementWhereUniqueInput
    data: XOR<EntitlementUpdateWithoutUserInput, EntitlementUncheckedUpdateWithoutUserInput>
  }

  export type EntitlementUpdateManyWithWhereWithoutUserInput = {
    where: EntitlementScalarWhereInput
    data: XOR<EntitlementUpdateManyMutationInput, EntitlementUncheckedUpdateManyWithoutUserInput>
  }

  export type UsageEventUpsertWithWhereUniqueWithoutUserInput = {
    where: UsageEventWhereUniqueInput
    update: XOR<UsageEventUpdateWithoutUserInput, UsageEventUncheckedUpdateWithoutUserInput>
    create: XOR<UsageEventCreateWithoutUserInput, UsageEventUncheckedCreateWithoutUserInput>
  }

  export type UsageEventUpdateWithWhereUniqueWithoutUserInput = {
    where: UsageEventWhereUniqueInput
    data: XOR<UsageEventUpdateWithoutUserInput, UsageEventUncheckedUpdateWithoutUserInput>
  }

  export type UsageEventUpdateManyWithWhereWithoutUserInput = {
    where: UsageEventScalarWhereInput
    data: XOR<UsageEventUpdateManyMutationInput, UsageEventUncheckedUpdateManyWithoutUserInput>
  }

  export type CustomerCreateWithoutTeamsInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutTeamsInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableUncheckedCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutTeamsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutTeamsInput, CustomerUncheckedCreateWithoutTeamsInput>
  }

  export type CreditWalletCreateWithoutTeamInput = {
    id?: string
    balance?: bigint | number
    reservedBalance?: bigint | number
    currency?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCreditWalletsInput
    user?: UserCreateNestedOneWithoutCreditWalletsInput
    transactions?: CreditTransactionCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletUncheckedCreateWithoutTeamInput = {
    id?: string
    customerId: string
    userId?: string | null
    balance?: bigint | number
    reservedBalance?: bigint | number
    currency?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: CreditTransactionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletCreateOrConnectWithoutTeamInput = {
    where: CreditWalletWhereUniqueInput
    create: XOR<CreditWalletCreateWithoutTeamInput, CreditWalletUncheckedCreateWithoutTeamInput>
  }

  export type CreditWalletCreateManyTeamInputEnvelope = {
    data: CreditWalletCreateManyTeamInput | CreditWalletCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type TeamMembershipCreateWithoutTeamInput = {
    id?: string
    role?: $Enums.TeamRole
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTeamMembershipsInput
  }

  export type TeamMembershipUncheckedCreateWithoutTeamInput = {
    id?: string
    userId: string
    role?: $Enums.TeamRole
    createdAt?: Date | string
  }

  export type TeamMembershipCreateOrConnectWithoutTeamInput = {
    where: TeamMembershipWhereUniqueInput
    create: XOR<TeamMembershipCreateWithoutTeamInput, TeamMembershipUncheckedCreateWithoutTeamInput>
  }

  export type TeamMembershipCreateManyTeamInputEnvelope = {
    data: TeamMembershipCreateManyTeamInput | TeamMembershipCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type UsageEventCreateWithoutTeamInput = {
    id?: string
    eventType: $Enums.EventType
    featureId: string
    provider?: $Enums.ProviderName | null
    model?: string | null
    inputTokens?: bigint | number | null
    outputTokens?: bigint | number | null
    creditsBurned: bigint | number
    costUsd?: Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    timestamp?: Date | string
    createdAt?: Date | string
    customer: CustomerCreateNestedOneWithoutUsageEventsInput
    user?: UserCreateNestedOneWithoutUsageEventsInput
  }

  export type UsageEventUncheckedCreateWithoutTeamInput = {
    id?: string
    customerId: string
    userId?: string | null
    eventType: $Enums.EventType
    featureId: string
    provider?: $Enums.ProviderName | null
    model?: string | null
    inputTokens?: bigint | number | null
    outputTokens?: bigint | number | null
    creditsBurned: bigint | number
    costUsd?: Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type UsageEventCreateOrConnectWithoutTeamInput = {
    where: UsageEventWhereUniqueInput
    create: XOR<UsageEventCreateWithoutTeamInput, UsageEventUncheckedCreateWithoutTeamInput>
  }

  export type UsageEventCreateManyTeamInputEnvelope = {
    data: UsageEventCreateManyTeamInput | UsageEventCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithoutTeamsInput = {
    update: XOR<CustomerUpdateWithoutTeamsInput, CustomerUncheckedUpdateWithoutTeamsInput>
    create: XOR<CustomerCreateWithoutTeamsInput, CustomerUncheckedCreateWithoutTeamsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutTeamsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutTeamsInput, CustomerUncheckedUpdateWithoutTeamsInput>
  }

  export type CustomerUpdateWithoutTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUncheckedUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CreditWalletUpsertWithWhereUniqueWithoutTeamInput = {
    where: CreditWalletWhereUniqueInput
    update: XOR<CreditWalletUpdateWithoutTeamInput, CreditWalletUncheckedUpdateWithoutTeamInput>
    create: XOR<CreditWalletCreateWithoutTeamInput, CreditWalletUncheckedCreateWithoutTeamInput>
  }

  export type CreditWalletUpdateWithWhereUniqueWithoutTeamInput = {
    where: CreditWalletWhereUniqueInput
    data: XOR<CreditWalletUpdateWithoutTeamInput, CreditWalletUncheckedUpdateWithoutTeamInput>
  }

  export type CreditWalletUpdateManyWithWhereWithoutTeamInput = {
    where: CreditWalletScalarWhereInput
    data: XOR<CreditWalletUpdateManyMutationInput, CreditWalletUncheckedUpdateManyWithoutTeamInput>
  }

  export type TeamMembershipUpsertWithWhereUniqueWithoutTeamInput = {
    where: TeamMembershipWhereUniqueInput
    update: XOR<TeamMembershipUpdateWithoutTeamInput, TeamMembershipUncheckedUpdateWithoutTeamInput>
    create: XOR<TeamMembershipCreateWithoutTeamInput, TeamMembershipUncheckedCreateWithoutTeamInput>
  }

  export type TeamMembershipUpdateWithWhereUniqueWithoutTeamInput = {
    where: TeamMembershipWhereUniqueInput
    data: XOR<TeamMembershipUpdateWithoutTeamInput, TeamMembershipUncheckedUpdateWithoutTeamInput>
  }

  export type TeamMembershipUpdateManyWithWhereWithoutTeamInput = {
    where: TeamMembershipScalarWhereInput
    data: XOR<TeamMembershipUpdateManyMutationInput, TeamMembershipUncheckedUpdateManyWithoutTeamInput>
  }

  export type UsageEventUpsertWithWhereUniqueWithoutTeamInput = {
    where: UsageEventWhereUniqueInput
    update: XOR<UsageEventUpdateWithoutTeamInput, UsageEventUncheckedUpdateWithoutTeamInput>
    create: XOR<UsageEventCreateWithoutTeamInput, UsageEventUncheckedCreateWithoutTeamInput>
  }

  export type UsageEventUpdateWithWhereUniqueWithoutTeamInput = {
    where: UsageEventWhereUniqueInput
    data: XOR<UsageEventUpdateWithoutTeamInput, UsageEventUncheckedUpdateWithoutTeamInput>
  }

  export type UsageEventUpdateManyWithWhereWithoutTeamInput = {
    where: UsageEventScalarWhereInput
    data: XOR<UsageEventUpdateManyMutationInput, UsageEventUncheckedUpdateManyWithoutTeamInput>
  }

  export type TeamCreateWithoutMembershipsInput = {
    id?: string
    name: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutTeamsInput
    creditWallets?: CreditWalletCreateNestedManyWithoutTeamInput
    usageEvents?: UsageEventCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutMembershipsInput = {
    id?: string
    customerId: string
    name: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutTeamInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutMembershipsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutMembershipsInput, TeamUncheckedCreateWithoutMembershipsInput>
  }

  export type UserCreateWithoutTeamMembershipsInput = {
    id?: string
    externalUserId: string
    email?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutUsersInput
    creditWallets?: CreditWalletCreateNestedManyWithoutUserInput
    entitlements?: EntitlementCreateNestedManyWithoutUserInput
    usageEvents?: UsageEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTeamMembershipsInput = {
    id?: string
    customerId: string
    externalUserId: string
    email?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutUserInput
    entitlements?: EntitlementUncheckedCreateNestedManyWithoutUserInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTeamMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTeamMembershipsInput, UserUncheckedCreateWithoutTeamMembershipsInput>
  }

  export type TeamUpsertWithoutMembershipsInput = {
    update: XOR<TeamUpdateWithoutMembershipsInput, TeamUncheckedUpdateWithoutMembershipsInput>
    create: XOR<TeamCreateWithoutMembershipsInput, TeamUncheckedCreateWithoutMembershipsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutMembershipsInput, TeamUncheckedUpdateWithoutMembershipsInput>
  }

  export type TeamUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutTeamsNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutTeamNestedInput
    usageEvents?: UsageEventUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutTeamNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type UserUpsertWithoutTeamMembershipsInput = {
    update: XOR<UserUpdateWithoutTeamMembershipsInput, UserUncheckedUpdateWithoutTeamMembershipsInput>
    create: XOR<UserCreateWithoutTeamMembershipsInput, UserUncheckedCreateWithoutTeamMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTeamMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTeamMembershipsInput, UserUncheckedUpdateWithoutTeamMembershipsInput>
  }

  export type UserUpdateWithoutTeamMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutUsersNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutUserNestedInput
    entitlements?: EntitlementUpdateManyWithoutUserNestedInput
    usageEvents?: UsageEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTeamMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutUserNestedInput
    entitlements?: EntitlementUncheckedUpdateManyWithoutUserNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CustomerCreateWithoutCreditWalletsInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCustomerInput
    teams?: TeamCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutCreditWalletsInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCustomerInput
    teams?: TeamUncheckedCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableUncheckedCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutCreditWalletsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutCreditWalletsInput, CustomerUncheckedCreateWithoutCreditWalletsInput>
  }

  export type UserCreateWithoutCreditWalletsInput = {
    id?: string
    externalUserId: string
    email?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutUsersInput
    teamMemberships?: TeamMembershipCreateNestedManyWithoutUserInput
    entitlements?: EntitlementCreateNestedManyWithoutUserInput
    usageEvents?: UsageEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreditWalletsInput = {
    id?: string
    customerId: string
    externalUserId: string
    email?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutUserInput
    entitlements?: EntitlementUncheckedCreateNestedManyWithoutUserInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreditWalletsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreditWalletsInput, UserUncheckedCreateWithoutCreditWalletsInput>
  }

  export type TeamCreateWithoutCreditWalletsInput = {
    id?: string
    name: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutTeamsInput
    memberships?: TeamMembershipCreateNestedManyWithoutTeamInput
    usageEvents?: UsageEventCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutCreditWalletsInput = {
    id?: string
    customerId: string
    name: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TeamMembershipUncheckedCreateNestedManyWithoutTeamInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutCreditWalletsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutCreditWalletsInput, TeamUncheckedCreateWithoutCreditWalletsInput>
  }

  export type CreditTransactionCreateWithoutWalletInput = {
    id?: string
    transactionType: $Enums.TransactionType
    amount: bigint | number
    balanceBefore: bigint | number
    balanceAfter: bigint | number
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    createdAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCreditTransactionsInput
  }

  export type CreditTransactionUncheckedCreateWithoutWalletInput = {
    id?: string
    customerId: string
    transactionType: $Enums.TransactionType
    amount: bigint | number
    balanceBefore: bigint | number
    balanceAfter: bigint | number
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    createdAt?: Date | string
  }

  export type CreditTransactionCreateOrConnectWithoutWalletInput = {
    where: CreditTransactionWhereUniqueInput
    create: XOR<CreditTransactionCreateWithoutWalletInput, CreditTransactionUncheckedCreateWithoutWalletInput>
  }

  export type CreditTransactionCreateManyWalletInputEnvelope = {
    data: CreditTransactionCreateManyWalletInput | CreditTransactionCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithoutCreditWalletsInput = {
    update: XOR<CustomerUpdateWithoutCreditWalletsInput, CustomerUncheckedUpdateWithoutCreditWalletsInput>
    create: XOR<CustomerCreateWithoutCreditWalletsInput, CustomerUncheckedCreateWithoutCreditWalletsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutCreditWalletsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutCreditWalletsInput, CustomerUncheckedUpdateWithoutCreditWalletsInput>
  }

  export type CustomerUpdateWithoutCreditWalletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCustomerNestedInput
    teams?: TeamUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutCreditWalletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCustomerNestedInput
    teams?: TeamUncheckedUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUncheckedUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type UserUpsertWithoutCreditWalletsInput = {
    update: XOR<UserUpdateWithoutCreditWalletsInput, UserUncheckedUpdateWithoutCreditWalletsInput>
    create: XOR<UserCreateWithoutCreditWalletsInput, UserUncheckedCreateWithoutCreditWalletsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreditWalletsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreditWalletsInput, UserUncheckedUpdateWithoutCreditWalletsInput>
  }

  export type UserUpdateWithoutCreditWalletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutUsersNestedInput
    teamMemberships?: TeamMembershipUpdateManyWithoutUserNestedInput
    entitlements?: EntitlementUpdateManyWithoutUserNestedInput
    usageEvents?: UsageEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreditWalletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutUserNestedInput
    entitlements?: EntitlementUncheckedUpdateManyWithoutUserNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TeamUpsertWithoutCreditWalletsInput = {
    update: XOR<TeamUpdateWithoutCreditWalletsInput, TeamUncheckedUpdateWithoutCreditWalletsInput>
    create: XOR<TeamCreateWithoutCreditWalletsInput, TeamUncheckedCreateWithoutCreditWalletsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutCreditWalletsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutCreditWalletsInput, TeamUncheckedUpdateWithoutCreditWalletsInput>
  }

  export type TeamUpdateWithoutCreditWalletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutTeamsNestedInput
    memberships?: TeamMembershipUpdateManyWithoutTeamNestedInput
    usageEvents?: UsageEventUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutCreditWalletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TeamMembershipUncheckedUpdateManyWithoutTeamNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type CreditTransactionUpsertWithWhereUniqueWithoutWalletInput = {
    where: CreditTransactionWhereUniqueInput
    update: XOR<CreditTransactionUpdateWithoutWalletInput, CreditTransactionUncheckedUpdateWithoutWalletInput>
    create: XOR<CreditTransactionCreateWithoutWalletInput, CreditTransactionUncheckedCreateWithoutWalletInput>
  }

  export type CreditTransactionUpdateWithWhereUniqueWithoutWalletInput = {
    where: CreditTransactionWhereUniqueInput
    data: XOR<CreditTransactionUpdateWithoutWalletInput, CreditTransactionUncheckedUpdateWithoutWalletInput>
  }

  export type CreditTransactionUpdateManyWithWhereWithoutWalletInput = {
    where: CreditTransactionScalarWhereInput
    data: XOR<CreditTransactionUpdateManyMutationInput, CreditTransactionUncheckedUpdateManyWithoutWalletInput>
  }

  export type CreditWalletCreateWithoutTransactionsInput = {
    id?: string
    balance?: bigint | number
    reservedBalance?: bigint | number
    currency?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCreditWalletsInput
    user?: UserCreateNestedOneWithoutCreditWalletsInput
    team?: TeamCreateNestedOneWithoutCreditWalletsInput
  }

  export type CreditWalletUncheckedCreateWithoutTransactionsInput = {
    id?: string
    customerId: string
    userId?: string | null
    teamId?: string | null
    balance?: bigint | number
    reservedBalance?: bigint | number
    currency?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditWalletCreateOrConnectWithoutTransactionsInput = {
    where: CreditWalletWhereUniqueInput
    create: XOR<CreditWalletCreateWithoutTransactionsInput, CreditWalletUncheckedCreateWithoutTransactionsInput>
  }

  export type CustomerCreateWithoutCreditTransactionsInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCustomerInput
    teams?: TeamCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutCreditTransactionsInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCustomerInput
    teams?: TeamUncheckedCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableUncheckedCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutCreditTransactionsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutCreditTransactionsInput, CustomerUncheckedCreateWithoutCreditTransactionsInput>
  }

  export type CreditWalletUpsertWithoutTransactionsInput = {
    update: XOR<CreditWalletUpdateWithoutTransactionsInput, CreditWalletUncheckedUpdateWithoutTransactionsInput>
    create: XOR<CreditWalletCreateWithoutTransactionsInput, CreditWalletUncheckedCreateWithoutTransactionsInput>
    where?: CreditWalletWhereInput
  }

  export type CreditWalletUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: CreditWalletWhereInput
    data: XOR<CreditWalletUpdateWithoutTransactionsInput, CreditWalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type CreditWalletUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCreditWalletsNestedInput
    user?: UserUpdateOneWithoutCreditWalletsNestedInput
    team?: TeamUpdateOneWithoutCreditWalletsNestedInput
  }

  export type CreditWalletUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUpsertWithoutCreditTransactionsInput = {
    update: XOR<CustomerUpdateWithoutCreditTransactionsInput, CustomerUncheckedUpdateWithoutCreditTransactionsInput>
    create: XOR<CustomerCreateWithoutCreditTransactionsInput, CustomerUncheckedCreateWithoutCreditTransactionsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutCreditTransactionsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutCreditTransactionsInput, CustomerUncheckedUpdateWithoutCreditTransactionsInput>
  }

  export type CustomerUpdateWithoutCreditTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCustomerNestedInput
    teams?: TeamUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutCreditTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCustomerNestedInput
    teams?: TeamUncheckedUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUncheckedUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateWithoutBurnTablesInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCustomerInput
    teams?: TeamCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutBurnTablesInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCustomerInput
    teams?: TeamUncheckedCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutBurnTablesInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutBurnTablesInput, CustomerUncheckedCreateWithoutBurnTablesInput>
  }

  export type CustomerUpsertWithoutBurnTablesInput = {
    update: XOR<CustomerUpdateWithoutBurnTablesInput, CustomerUncheckedUpdateWithoutBurnTablesInput>
    create: XOR<CustomerCreateWithoutBurnTablesInput, CustomerUncheckedCreateWithoutBurnTablesInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutBurnTablesInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutBurnTablesInput, CustomerUncheckedUpdateWithoutBurnTablesInput>
  }

  export type CustomerUpdateWithoutBurnTablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCustomerNestedInput
    teams?: TeamUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutBurnTablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCustomerNestedInput
    teams?: TeamUncheckedUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateWithoutUsageEventsInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCustomerInput
    teams?: TeamCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutUsageEventsInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCustomerInput
    teams?: TeamUncheckedCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableUncheckedCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutUsageEventsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutUsageEventsInput, CustomerUncheckedCreateWithoutUsageEventsInput>
  }

  export type UserCreateWithoutUsageEventsInput = {
    id?: string
    externalUserId: string
    email?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutUsersInput
    creditWallets?: CreditWalletCreateNestedManyWithoutUserInput
    teamMemberships?: TeamMembershipCreateNestedManyWithoutUserInput
    entitlements?: EntitlementCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUsageEventsInput = {
    id?: string
    customerId: string
    externalUserId: string
    email?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutUserInput
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutUserInput
    entitlements?: EntitlementUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUsageEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUsageEventsInput, UserUncheckedCreateWithoutUsageEventsInput>
  }

  export type TeamCreateWithoutUsageEventsInput = {
    id?: string
    name: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutTeamsInput
    creditWallets?: CreditWalletCreateNestedManyWithoutTeamInput
    memberships?: TeamMembershipCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutUsageEventsInput = {
    id?: string
    customerId: string
    name: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutTeamInput
    memberships?: TeamMembershipUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutUsageEventsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutUsageEventsInput, TeamUncheckedCreateWithoutUsageEventsInput>
  }

  export type CustomerUpsertWithoutUsageEventsInput = {
    update: XOR<CustomerUpdateWithoutUsageEventsInput, CustomerUncheckedUpdateWithoutUsageEventsInput>
    create: XOR<CustomerCreateWithoutUsageEventsInput, CustomerUncheckedCreateWithoutUsageEventsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutUsageEventsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutUsageEventsInput, CustomerUncheckedUpdateWithoutUsageEventsInput>
  }

  export type CustomerUpdateWithoutUsageEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCustomerNestedInput
    teams?: TeamUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutUsageEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCustomerNestedInput
    teams?: TeamUncheckedUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUncheckedUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type UserUpsertWithoutUsageEventsInput = {
    update: XOR<UserUpdateWithoutUsageEventsInput, UserUncheckedUpdateWithoutUsageEventsInput>
    create: XOR<UserCreateWithoutUsageEventsInput, UserUncheckedCreateWithoutUsageEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUsageEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUsageEventsInput, UserUncheckedUpdateWithoutUsageEventsInput>
  }

  export type UserUpdateWithoutUsageEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutUsersNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutUserNestedInput
    teamMemberships?: TeamMembershipUpdateManyWithoutUserNestedInput
    entitlements?: EntitlementUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUsageEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutUserNestedInput
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutUserNestedInput
    entitlements?: EntitlementUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TeamUpsertWithoutUsageEventsInput = {
    update: XOR<TeamUpdateWithoutUsageEventsInput, TeamUncheckedUpdateWithoutUsageEventsInput>
    create: XOR<TeamCreateWithoutUsageEventsInput, TeamUncheckedCreateWithoutUsageEventsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutUsageEventsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutUsageEventsInput, TeamUncheckedUpdateWithoutUsageEventsInput>
  }

  export type TeamUpdateWithoutUsageEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutTeamsNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutTeamNestedInput
    memberships?: TeamMembershipUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutUsageEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutTeamNestedInput
    memberships?: TeamMembershipUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type SubscriptionCreateWithoutPlanInput = {
    id?: string
    status: $Enums.SubscriptionStatus
    billingPeriod?: $Enums.BillingPeriod | null
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    cancelAtPeriodEnd?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateWithoutPlanInput = {
    id?: string
    customerId: string
    status: $Enums.SubscriptionStatus
    billingPeriod?: $Enums.BillingPeriod | null
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    cancelAtPeriodEnd?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutPlanInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput>
  }

  export type SubscriptionCreateManyPlanInputEnvelope = {
    data: SubscriptionCreateManyPlanInput | SubscriptionCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutPlanInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutPlanInput, SubscriptionUncheckedUpdateWithoutPlanInput>
    create: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutPlanInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutPlanInput, SubscriptionUncheckedUpdateWithoutPlanInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutPlanInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutPlanInput>
  }

  export type CustomerCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCustomerInput
    teams?: TeamCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCustomerInput
    teams?: TeamUncheckedCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableUncheckedCreateNestedManyWithoutCustomerInput
    entitlements?: EntitlementUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutSubscriptionsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutSubscriptionsInput, CustomerUncheckedCreateWithoutSubscriptionsInput>
  }

  export type PlanCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    description?: string | null
    basePriceCents?: bigint | number | null
    includedCredits?: bigint | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    description?: string | null
    basePriceCents?: bigint | number | null
    includedCredits?: bigint | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanCreateOrConnectWithoutSubscriptionsInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutSubscriptionsInput, PlanUncheckedCreateWithoutSubscriptionsInput>
  }

  export type CustomerUpsertWithoutSubscriptionsInput = {
    update: XOR<CustomerUpdateWithoutSubscriptionsInput, CustomerUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<CustomerCreateWithoutSubscriptionsInput, CustomerUncheckedCreateWithoutSubscriptionsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutSubscriptionsInput, CustomerUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type CustomerUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCustomerNestedInput
    teams?: TeamUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCustomerNestedInput
    teams?: TeamUncheckedUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUncheckedUpdateManyWithoutCustomerNestedInput
    entitlements?: EntitlementUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type PlanUpsertWithoutSubscriptionsInput = {
    update: XOR<PlanUpdateWithoutSubscriptionsInput, PlanUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<PlanCreateWithoutSubscriptionsInput, PlanUncheckedCreateWithoutSubscriptionsInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutSubscriptionsInput, PlanUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type PlanUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePriceCents?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    includedCredits?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePriceCents?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    includedCredits?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateWithoutEntitlementsInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCustomerInput
    teams?: TeamCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutEntitlementsInput = {
    id?: string
    name: string
    email: string
    apiKeyHash: string
    tier?: $Enums.CustomerTier
    status?: $Enums.CustomerStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCustomerInput
    teams?: TeamUncheckedCreateNestedManyWithoutCustomerInput
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutCustomerInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutCustomerInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCustomerInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutCustomerInput
    burnTables?: BurnTableUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutEntitlementsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutEntitlementsInput, CustomerUncheckedCreateWithoutEntitlementsInput>
  }

  export type UserCreateWithoutEntitlementsInput = {
    id?: string
    externalUserId: string
    email?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutUsersInput
    creditWallets?: CreditWalletCreateNestedManyWithoutUserInput
    teamMemberships?: TeamMembershipCreateNestedManyWithoutUserInput
    usageEvents?: UsageEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEntitlementsInput = {
    id?: string
    customerId: string
    externalUserId: string
    email?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    creditWallets?: CreditWalletUncheckedCreateNestedManyWithoutUserInput
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutUserInput
    usageEvents?: UsageEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEntitlementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEntitlementsInput, UserUncheckedCreateWithoutEntitlementsInput>
  }

  export type CustomerUpsertWithoutEntitlementsInput = {
    update: XOR<CustomerUpdateWithoutEntitlementsInput, CustomerUncheckedUpdateWithoutEntitlementsInput>
    create: XOR<CustomerCreateWithoutEntitlementsInput, CustomerUncheckedCreateWithoutEntitlementsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutEntitlementsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutEntitlementsInput, CustomerUncheckedUpdateWithoutEntitlementsInput>
  }

  export type CustomerUpdateWithoutEntitlementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCustomerNestedInput
    teams?: TeamUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutEntitlementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    tier?: EnumCustomerTierFieldUpdateOperationsInput | $Enums.CustomerTier
    status?: EnumCustomerStatusFieldUpdateOperationsInput | $Enums.CustomerStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCustomerNestedInput
    teams?: TeamUncheckedUpdateManyWithoutCustomerNestedInput
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutCustomerNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutCustomerNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutCustomerNestedInput
    burnTables?: BurnTableUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type UserUpsertWithoutEntitlementsInput = {
    update: XOR<UserUpdateWithoutEntitlementsInput, UserUncheckedUpdateWithoutEntitlementsInput>
    create: XOR<UserCreateWithoutEntitlementsInput, UserUncheckedCreateWithoutEntitlementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEntitlementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEntitlementsInput, UserUncheckedUpdateWithoutEntitlementsInput>
  }

  export type UserUpdateWithoutEntitlementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutUsersNestedInput
    creditWallets?: CreditWalletUpdateManyWithoutUserNestedInput
    teamMemberships?: TeamMembershipUpdateManyWithoutUserNestedInput
    usageEvents?: UsageEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEntitlementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutUserNestedInput
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutUserNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyCustomerInput = {
    id?: string
    externalUserId: string
    email?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamCreateManyCustomerInput = {
    id?: string
    name: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditWalletCreateManyCustomerInput = {
    id?: string
    userId?: string | null
    teamId?: string | null
    balance?: bigint | number
    reservedBalance?: bigint | number
    currency?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditTransactionCreateManyCustomerInput = {
    id?: string
    walletId: string
    transactionType: $Enums.TransactionType
    amount: bigint | number
    balanceBefore: bigint | number
    balanceAfter: bigint | number
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    createdAt?: Date | string
  }

  export type SubscriptionCreateManyCustomerInput = {
    id?: string
    planId: string
    status: $Enums.SubscriptionStatus
    billingPeriod?: $Enums.BillingPeriod | null
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    cancelAtPeriodEnd?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageEventCreateManyCustomerInput = {
    id?: string
    userId?: string | null
    teamId?: string | null
    eventType: $Enums.EventType
    featureId: string
    provider?: $Enums.ProviderName | null
    model?: string | null
    inputTokens?: bigint | number | null
    outputTokens?: bigint | number | null
    creditsBurned: bigint | number
    costUsd?: Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type BurnTableCreateManyCustomerInput = {
    id?: string
    name: string
    version?: number
    rules: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    validFrom?: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntitlementCreateManyCustomerInput = {
    id?: string
    userId?: string | null
    featureId: string
    limitType?: $Enums.LimitType | null
    limitValue?: bigint | number | null
    period?: $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditWallets?: CreditWalletUpdateManyWithoutUserNestedInput
    teamMemberships?: TeamMembershipUpdateManyWithoutUserNestedInput
    entitlements?: EntitlementUpdateManyWithoutUserNestedInput
    usageEvents?: UsageEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutUserNestedInput
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutUserNestedInput
    entitlements?: EntitlementUncheckedUpdateManyWithoutUserNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditWallets?: CreditWalletUpdateManyWithoutTeamNestedInput
    memberships?: TeamMembershipUpdateManyWithoutTeamNestedInput
    usageEvents?: UsageEventUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditWallets?: CreditWalletUncheckedUpdateManyWithoutTeamNestedInput
    memberships?: TeamMembershipUncheckedUpdateManyWithoutTeamNestedInput
    usageEvents?: UsageEventUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditWalletUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCreditWalletsNestedInput
    team?: TeamUpdateOneWithoutCreditWalletsNestedInput
    transactions?: CreditTransactionUpdateManyWithoutWalletNestedInput
  }

  export type CreditWalletUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: CreditTransactionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type CreditWalletUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionType?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBefore?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfter?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: CreditWalletUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type CreditTransactionUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    transactionType?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBefore?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfter?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    transactionType?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBefore?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfter?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    billingPeriod?: NullableEnumBillingPeriodFieldUpdateOperationsInput | $Enums.BillingPeriod | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    billingPeriod?: NullableEnumBillingPeriodFieldUpdateOperationsInput | $Enums.BillingPeriod | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    billingPeriod?: NullableEnumBillingPeriodFieldUpdateOperationsInput | $Enums.BillingPeriod | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageEventUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    featureId?: StringFieldUpdateOperationsInput | string
    provider?: NullableEnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    outputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creditsBurned?: BigIntFieldUpdateOperationsInput | bigint | number
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutUsageEventsNestedInput
    team?: TeamUpdateOneWithoutUsageEventsNestedInput
  }

  export type UsageEventUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    featureId?: StringFieldUpdateOperationsInput | string
    provider?: NullableEnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    outputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creditsBurned?: BigIntFieldUpdateOperationsInput | bigint | number
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageEventUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    featureId?: StringFieldUpdateOperationsInput | string
    provider?: NullableEnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    outputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creditsBurned?: BigIntFieldUpdateOperationsInput | bigint | number
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BurnTableUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    rules?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BurnTableUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    rules?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BurnTableUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    rules?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntitlementUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureId?: StringFieldUpdateOperationsInput | string
    limitType?: NullableEnumLimitTypeFieldUpdateOperationsInput | $Enums.LimitType | null
    limitValue?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    period?: NullableEnumLimitPeriodFieldUpdateOperationsInput | $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutEntitlementsNestedInput
  }

  export type EntitlementUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    featureId?: StringFieldUpdateOperationsInput | string
    limitType?: NullableEnumLimitTypeFieldUpdateOperationsInput | $Enums.LimitType | null
    limitValue?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    period?: NullableEnumLimitPeriodFieldUpdateOperationsInput | $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntitlementUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    featureId?: StringFieldUpdateOperationsInput | string
    limitType?: NullableEnumLimitTypeFieldUpdateOperationsInput | $Enums.LimitType | null
    limitValue?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    period?: NullableEnumLimitPeriodFieldUpdateOperationsInput | $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditWalletCreateManyUserInput = {
    id?: string
    customerId: string
    teamId?: string | null
    balance?: bigint | number
    reservedBalance?: bigint | number
    currency?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamMembershipCreateManyUserInput = {
    id?: string
    teamId: string
    role?: $Enums.TeamRole
    createdAt?: Date | string
  }

  export type EntitlementCreateManyUserInput = {
    id?: string
    customerId: string
    featureId: string
    limitType?: $Enums.LimitType | null
    limitValue?: bigint | number | null
    period?: $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageEventCreateManyUserInput = {
    id?: string
    customerId: string
    teamId?: string | null
    eventType: $Enums.EventType
    featureId: string
    provider?: $Enums.ProviderName | null
    model?: string | null
    inputTokens?: bigint | number | null
    outputTokens?: bigint | number | null
    creditsBurned: bigint | number
    costUsd?: Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type CreditWalletUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCreditWalletsNestedInput
    team?: TeamUpdateOneWithoutCreditWalletsNestedInput
    transactions?: CreditTransactionUpdateManyWithoutWalletNestedInput
  }

  export type CreditWalletUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: CreditTransactionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type CreditWalletUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMembershipUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type TeamMembershipUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMembershipUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntitlementUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureId?: StringFieldUpdateOperationsInput | string
    limitType?: NullableEnumLimitTypeFieldUpdateOperationsInput | $Enums.LimitType | null
    limitValue?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    period?: NullableEnumLimitPeriodFieldUpdateOperationsInput | $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutEntitlementsNestedInput
  }

  export type EntitlementUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    featureId?: StringFieldUpdateOperationsInput | string
    limitType?: NullableEnumLimitTypeFieldUpdateOperationsInput | $Enums.LimitType | null
    limitValue?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    period?: NullableEnumLimitPeriodFieldUpdateOperationsInput | $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntitlementUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    featureId?: StringFieldUpdateOperationsInput | string
    limitType?: NullableEnumLimitTypeFieldUpdateOperationsInput | $Enums.LimitType | null
    limitValue?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    period?: NullableEnumLimitPeriodFieldUpdateOperationsInput | $Enums.LimitPeriod | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageEventUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    featureId?: StringFieldUpdateOperationsInput | string
    provider?: NullableEnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    outputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creditsBurned?: BigIntFieldUpdateOperationsInput | bigint | number
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutUsageEventsNestedInput
    team?: TeamUpdateOneWithoutUsageEventsNestedInput
  }

  export type UsageEventUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    featureId?: StringFieldUpdateOperationsInput | string
    provider?: NullableEnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    outputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creditsBurned?: BigIntFieldUpdateOperationsInput | bigint | number
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageEventUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    featureId?: StringFieldUpdateOperationsInput | string
    provider?: NullableEnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    outputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creditsBurned?: BigIntFieldUpdateOperationsInput | bigint | number
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditWalletCreateManyTeamInput = {
    id?: string
    customerId: string
    userId?: string | null
    balance?: bigint | number
    reservedBalance?: bigint | number
    currency?: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamMembershipCreateManyTeamInput = {
    id?: string
    userId: string
    role?: $Enums.TeamRole
    createdAt?: Date | string
  }

  export type UsageEventCreateManyTeamInput = {
    id?: string
    customerId: string
    userId?: string | null
    eventType: $Enums.EventType
    featureId: string
    provider?: $Enums.ProviderName | null
    model?: string | null
    inputTokens?: bigint | number | null
    outputTokens?: bigint | number | null
    creditsBurned: bigint | number
    costUsd?: Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type CreditWalletUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCreditWalletsNestedInput
    user?: UserUpdateOneWithoutCreditWalletsNestedInput
    transactions?: CreditTransactionUpdateManyWithoutWalletNestedInput
  }

  export type CreditWalletUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: CreditTransactionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type CreditWalletUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    reservedBalance?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMembershipUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTeamMembershipsNestedInput
  }

  export type TeamMembershipUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMembershipUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageEventUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    featureId?: StringFieldUpdateOperationsInput | string
    provider?: NullableEnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    outputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creditsBurned?: BigIntFieldUpdateOperationsInput | bigint | number
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutUsageEventsNestedInput
    user?: UserUpdateOneWithoutUsageEventsNestedInput
  }

  export type UsageEventUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    featureId?: StringFieldUpdateOperationsInput | string
    provider?: NullableEnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    outputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creditsBurned?: BigIntFieldUpdateOperationsInput | bigint | number
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageEventUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    featureId?: StringFieldUpdateOperationsInput | string
    provider?: NullableEnumProviderNameFieldUpdateOperationsInput | $Enums.ProviderName | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    outputTokens?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creditsBurned?: BigIntFieldUpdateOperationsInput | bigint | number
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionCreateManyWalletInput = {
    id?: string
    customerId: string
    transactionType: $Enums.TransactionType
    amount: bigint | number
    balanceBefore: bigint | number
    balanceAfter: bigint | number
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: string | null
    createdAt?: Date | string
  }

  export type CreditTransactionUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionType?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBefore?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfter?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCreditTransactionsNestedInput
  }

  export type CreditTransactionUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    transactionType?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBefore?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfter?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    transactionType?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBefore?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfter?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyPlanInput = {
    id?: string
    customerId: string
    status: $Enums.SubscriptionStatus
    billingPeriod?: $Enums.BillingPeriod | null
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    cancelAtPeriodEnd?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    billingPeriod?: NullableEnumBillingPeriodFieldUpdateOperationsInput | $Enums.BillingPeriod | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    billingPeriod?: NullableEnumBillingPeriodFieldUpdateOperationsInput | $Enums.BillingPeriod | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    billingPeriod?: NullableEnumBillingPeriodFieldUpdateOperationsInput | $Enums.BillingPeriod | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}