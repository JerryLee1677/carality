
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
 * Model QuizQuestion
 * 
 */
export type QuizQuestion = $Result.DefaultSelection<Prisma.$QuizQuestionPayload>
/**
 * Model QuizOption
 * 
 */
export type QuizOption = $Result.DefaultSelection<Prisma.$QuizOptionPayload>
/**
 * Model QuizSession
 * 
 */
export type QuizSession = $Result.DefaultSelection<Prisma.$QuizSessionPayload>
/**
 * Model QuizAnswer
 * 
 */
export type QuizAnswer = $Result.DefaultSelection<Prisma.$QuizAnswerPayload>
/**
 * Model PersonalityResult
 * 
 */
export type PersonalityResult = $Result.DefaultSelection<Prisma.$PersonalityResultPayload>
/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model VehicleDimensionWeight
 * 
 */
export type VehicleDimensionWeight = $Result.DefaultSelection<Prisma.$VehicleDimensionWeightPayload>
/**
 * Model VehicleRecommendation
 * 
 */
export type VehicleRecommendation = $Result.DefaultSelection<Prisma.$VehicleRecommendationPayload>
/**
 * Model BuyingGuide
 * 
 */
export type BuyingGuide = $Result.DefaultSelection<Prisma.$BuyingGuidePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more QuizQuestions
 * const quizQuestions = await prisma.quizQuestion.findMany()
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
   * // Fetch zero or more QuizQuestions
   * const quizQuestions = await prisma.quizQuestion.findMany()
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
   * `prisma.quizQuestion`: Exposes CRUD operations for the **QuizQuestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuizQuestions
    * const quizQuestions = await prisma.quizQuestion.findMany()
    * ```
    */
  get quizQuestion(): Prisma.QuizQuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quizOption`: Exposes CRUD operations for the **QuizOption** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuizOptions
    * const quizOptions = await prisma.quizOption.findMany()
    * ```
    */
  get quizOption(): Prisma.QuizOptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quizSession`: Exposes CRUD operations for the **QuizSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuizSessions
    * const quizSessions = await prisma.quizSession.findMany()
    * ```
    */
  get quizSession(): Prisma.QuizSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quizAnswer`: Exposes CRUD operations for the **QuizAnswer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuizAnswers
    * const quizAnswers = await prisma.quizAnswer.findMany()
    * ```
    */
  get quizAnswer(): Prisma.QuizAnswerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.personalityResult`: Exposes CRUD operations for the **PersonalityResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PersonalityResults
    * const personalityResults = await prisma.personalityResult.findMany()
    * ```
    */
  get personalityResult(): Prisma.PersonalityResultDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicleDimensionWeight`: Exposes CRUD operations for the **VehicleDimensionWeight** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VehicleDimensionWeights
    * const vehicleDimensionWeights = await prisma.vehicleDimensionWeight.findMany()
    * ```
    */
  get vehicleDimensionWeight(): Prisma.VehicleDimensionWeightDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicleRecommendation`: Exposes CRUD operations for the **VehicleRecommendation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VehicleRecommendations
    * const vehicleRecommendations = await prisma.vehicleRecommendation.findMany()
    * ```
    */
  get vehicleRecommendation(): Prisma.VehicleRecommendationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.buyingGuide`: Exposes CRUD operations for the **BuyingGuide** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BuyingGuides
    * const buyingGuides = await prisma.buyingGuide.findMany()
    * ```
    */
  get buyingGuide(): Prisma.BuyingGuideDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
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
    QuizQuestion: 'QuizQuestion',
    QuizOption: 'QuizOption',
    QuizSession: 'QuizSession',
    QuizAnswer: 'QuizAnswer',
    PersonalityResult: 'PersonalityResult',
    Vehicle: 'Vehicle',
    VehicleDimensionWeight: 'VehicleDimensionWeight',
    VehicleRecommendation: 'VehicleRecommendation',
    BuyingGuide: 'BuyingGuide'
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
      modelProps: "quizQuestion" | "quizOption" | "quizSession" | "quizAnswer" | "personalityResult" | "vehicle" | "vehicleDimensionWeight" | "vehicleRecommendation" | "buyingGuide"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      QuizQuestion: {
        payload: Prisma.$QuizQuestionPayload<ExtArgs>
        fields: Prisma.QuizQuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizQuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizQuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          findFirst: {
            args: Prisma.QuizQuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizQuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          findMany: {
            args: Prisma.QuizQuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>[]
          }
          create: {
            args: Prisma.QuizQuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          createMany: {
            args: Prisma.QuizQuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizQuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>[]
          }
          delete: {
            args: Prisma.QuizQuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          update: {
            args: Prisma.QuizQuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuizQuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizQuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuizQuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>[]
          }
          upsert: {
            args: Prisma.QuizQuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          aggregate: {
            args: Prisma.QuizQuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuizQuestion>
          }
          groupBy: {
            args: Prisma.QuizQuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizQuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizQuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuizQuestionCountAggregateOutputType> | number
          }
        }
      }
      QuizOption: {
        payload: Prisma.$QuizOptionPayload<ExtArgs>
        fields: Prisma.QuizOptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizOptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizOptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizOptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizOptionPayload>
          }
          findFirst: {
            args: Prisma.QuizOptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizOptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizOptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizOptionPayload>
          }
          findMany: {
            args: Prisma.QuizOptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizOptionPayload>[]
          }
          create: {
            args: Prisma.QuizOptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizOptionPayload>
          }
          createMany: {
            args: Prisma.QuizOptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizOptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizOptionPayload>[]
          }
          delete: {
            args: Prisma.QuizOptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizOptionPayload>
          }
          update: {
            args: Prisma.QuizOptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizOptionPayload>
          }
          deleteMany: {
            args: Prisma.QuizOptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizOptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuizOptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizOptionPayload>[]
          }
          upsert: {
            args: Prisma.QuizOptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizOptionPayload>
          }
          aggregate: {
            args: Prisma.QuizOptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuizOption>
          }
          groupBy: {
            args: Prisma.QuizOptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizOptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizOptionCountArgs<ExtArgs>
            result: $Utils.Optional<QuizOptionCountAggregateOutputType> | number
          }
        }
      }
      QuizSession: {
        payload: Prisma.$QuizSessionPayload<ExtArgs>
        fields: Prisma.QuizSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>
          }
          findFirst: {
            args: Prisma.QuizSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>
          }
          findMany: {
            args: Prisma.QuizSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>[]
          }
          create: {
            args: Prisma.QuizSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>
          }
          createMany: {
            args: Prisma.QuizSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>[]
          }
          delete: {
            args: Prisma.QuizSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>
          }
          update: {
            args: Prisma.QuizSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>
          }
          deleteMany: {
            args: Prisma.QuizSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuizSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>[]
          }
          upsert: {
            args: Prisma.QuizSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>
          }
          aggregate: {
            args: Prisma.QuizSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuizSession>
          }
          groupBy: {
            args: Prisma.QuizSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizSessionCountArgs<ExtArgs>
            result: $Utils.Optional<QuizSessionCountAggregateOutputType> | number
          }
        }
      }
      QuizAnswer: {
        payload: Prisma.$QuizAnswerPayload<ExtArgs>
        fields: Prisma.QuizAnswerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizAnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizAnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAnswerPayload>
          }
          findFirst: {
            args: Prisma.QuizAnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizAnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAnswerPayload>
          }
          findMany: {
            args: Prisma.QuizAnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAnswerPayload>[]
          }
          create: {
            args: Prisma.QuizAnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAnswerPayload>
          }
          createMany: {
            args: Prisma.QuizAnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizAnswerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAnswerPayload>[]
          }
          delete: {
            args: Prisma.QuizAnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAnswerPayload>
          }
          update: {
            args: Prisma.QuizAnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAnswerPayload>
          }
          deleteMany: {
            args: Prisma.QuizAnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizAnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuizAnswerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAnswerPayload>[]
          }
          upsert: {
            args: Prisma.QuizAnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAnswerPayload>
          }
          aggregate: {
            args: Prisma.QuizAnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuizAnswer>
          }
          groupBy: {
            args: Prisma.QuizAnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizAnswerGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizAnswerCountArgs<ExtArgs>
            result: $Utils.Optional<QuizAnswerCountAggregateOutputType> | number
          }
        }
      }
      PersonalityResult: {
        payload: Prisma.$PersonalityResultPayload<ExtArgs>
        fields: Prisma.PersonalityResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonalityResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonalityResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityResultPayload>
          }
          findFirst: {
            args: Prisma.PersonalityResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonalityResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityResultPayload>
          }
          findMany: {
            args: Prisma.PersonalityResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityResultPayload>[]
          }
          create: {
            args: Prisma.PersonalityResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityResultPayload>
          }
          createMany: {
            args: Prisma.PersonalityResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonalityResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityResultPayload>[]
          }
          delete: {
            args: Prisma.PersonalityResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityResultPayload>
          }
          update: {
            args: Prisma.PersonalityResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityResultPayload>
          }
          deleteMany: {
            args: Prisma.PersonalityResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonalityResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonalityResultUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityResultPayload>[]
          }
          upsert: {
            args: Prisma.PersonalityResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityResultPayload>
          }
          aggregate: {
            args: Prisma.PersonalityResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePersonalityResult>
          }
          groupBy: {
            args: Prisma.PersonalityResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonalityResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonalityResultCountArgs<ExtArgs>
            result: $Utils.Optional<PersonalityResultCountAggregateOutputType> | number
          }
        }
      }
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      VehicleDimensionWeight: {
        payload: Prisma.$VehicleDimensionWeightPayload<ExtArgs>
        fields: Prisma.VehicleDimensionWeightFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleDimensionWeightFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleDimensionWeightPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleDimensionWeightFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleDimensionWeightPayload>
          }
          findFirst: {
            args: Prisma.VehicleDimensionWeightFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleDimensionWeightPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleDimensionWeightFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleDimensionWeightPayload>
          }
          findMany: {
            args: Prisma.VehicleDimensionWeightFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleDimensionWeightPayload>[]
          }
          create: {
            args: Prisma.VehicleDimensionWeightCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleDimensionWeightPayload>
          }
          createMany: {
            args: Prisma.VehicleDimensionWeightCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleDimensionWeightCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleDimensionWeightPayload>[]
          }
          delete: {
            args: Prisma.VehicleDimensionWeightDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleDimensionWeightPayload>
          }
          update: {
            args: Prisma.VehicleDimensionWeightUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleDimensionWeightPayload>
          }
          deleteMany: {
            args: Prisma.VehicleDimensionWeightDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleDimensionWeightUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleDimensionWeightUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleDimensionWeightPayload>[]
          }
          upsert: {
            args: Prisma.VehicleDimensionWeightUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleDimensionWeightPayload>
          }
          aggregate: {
            args: Prisma.VehicleDimensionWeightAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicleDimensionWeight>
          }
          groupBy: {
            args: Prisma.VehicleDimensionWeightGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleDimensionWeightGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleDimensionWeightCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleDimensionWeightCountAggregateOutputType> | number
          }
        }
      }
      VehicleRecommendation: {
        payload: Prisma.$VehicleRecommendationPayload<ExtArgs>
        fields: Prisma.VehicleRecommendationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleRecommendationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleRecommendationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleRecommendationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleRecommendationPayload>
          }
          findFirst: {
            args: Prisma.VehicleRecommendationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleRecommendationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleRecommendationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleRecommendationPayload>
          }
          findMany: {
            args: Prisma.VehicleRecommendationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleRecommendationPayload>[]
          }
          create: {
            args: Prisma.VehicleRecommendationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleRecommendationPayload>
          }
          createMany: {
            args: Prisma.VehicleRecommendationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleRecommendationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleRecommendationPayload>[]
          }
          delete: {
            args: Prisma.VehicleRecommendationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleRecommendationPayload>
          }
          update: {
            args: Prisma.VehicleRecommendationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleRecommendationPayload>
          }
          deleteMany: {
            args: Prisma.VehicleRecommendationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleRecommendationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleRecommendationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleRecommendationPayload>[]
          }
          upsert: {
            args: Prisma.VehicleRecommendationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleRecommendationPayload>
          }
          aggregate: {
            args: Prisma.VehicleRecommendationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicleRecommendation>
          }
          groupBy: {
            args: Prisma.VehicleRecommendationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleRecommendationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleRecommendationCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleRecommendationCountAggregateOutputType> | number
          }
        }
      }
      BuyingGuide: {
        payload: Prisma.$BuyingGuidePayload<ExtArgs>
        fields: Prisma.BuyingGuideFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BuyingGuideFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyingGuidePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BuyingGuideFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyingGuidePayload>
          }
          findFirst: {
            args: Prisma.BuyingGuideFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyingGuidePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BuyingGuideFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyingGuidePayload>
          }
          findMany: {
            args: Prisma.BuyingGuideFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyingGuidePayload>[]
          }
          create: {
            args: Prisma.BuyingGuideCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyingGuidePayload>
          }
          createMany: {
            args: Prisma.BuyingGuideCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BuyingGuideCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyingGuidePayload>[]
          }
          delete: {
            args: Prisma.BuyingGuideDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyingGuidePayload>
          }
          update: {
            args: Prisma.BuyingGuideUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyingGuidePayload>
          }
          deleteMany: {
            args: Prisma.BuyingGuideDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BuyingGuideUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BuyingGuideUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyingGuidePayload>[]
          }
          upsert: {
            args: Prisma.BuyingGuideUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyingGuidePayload>
          }
          aggregate: {
            args: Prisma.BuyingGuideAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBuyingGuide>
          }
          groupBy: {
            args: Prisma.BuyingGuideGroupByArgs<ExtArgs>
            result: $Utils.Optional<BuyingGuideGroupByOutputType>[]
          }
          count: {
            args: Prisma.BuyingGuideCountArgs<ExtArgs>
            result: $Utils.Optional<BuyingGuideCountAggregateOutputType> | number
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
    quizQuestion?: QuizQuestionOmit
    quizOption?: QuizOptionOmit
    quizSession?: QuizSessionOmit
    quizAnswer?: QuizAnswerOmit
    personalityResult?: PersonalityResultOmit
    vehicle?: VehicleOmit
    vehicleDimensionWeight?: VehicleDimensionWeightOmit
    vehicleRecommendation?: VehicleRecommendationOmit
    buyingGuide?: BuyingGuideOmit
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
   * Count Type QuizQuestionCountOutputType
   */

  export type QuizQuestionCountOutputType = {
    options: number
  }

  export type QuizQuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    options?: boolean | QuizQuestionCountOutputTypeCountOptionsArgs
  }

  // Custom InputTypes
  /**
   * QuizQuestionCountOutputType without action
   */
  export type QuizQuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestionCountOutputType
     */
    select?: QuizQuestionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuizQuestionCountOutputType without action
   */
  export type QuizQuestionCountOutputTypeCountOptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizOptionWhereInput
  }


  /**
   * Count Type QuizSessionCountOutputType
   */

  export type QuizSessionCountOutputType = {
    answers: number
  }

  export type QuizSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | QuizSessionCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * QuizSessionCountOutputType without action
   */
  export type QuizSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSessionCountOutputType
     */
    select?: QuizSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuizSessionCountOutputType without action
   */
  export type QuizSessionCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizAnswerWhereInput
  }


  /**
   * Count Type PersonalityResultCountOutputType
   */

  export type PersonalityResultCountOutputType = {
    recommendations: number
  }

  export type PersonalityResultCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recommendations?: boolean | PersonalityResultCountOutputTypeCountRecommendationsArgs
  }

  // Custom InputTypes
  /**
   * PersonalityResultCountOutputType without action
   */
  export type PersonalityResultCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalityResultCountOutputType
     */
    select?: PersonalityResultCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PersonalityResultCountOutputType without action
   */
  export type PersonalityResultCountOutputTypeCountRecommendationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleRecommendationWhereInput
  }


  /**
   * Count Type VehicleCountOutputType
   */

  export type VehicleCountOutputType = {
    recommendations: number
  }

  export type VehicleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recommendations?: boolean | VehicleCountOutputTypeCountRecommendationsArgs
  }

  // Custom InputTypes
  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleCountOutputType
     */
    select?: VehicleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountRecommendationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleRecommendationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model QuizQuestion
   */

  export type AggregateQuizQuestion = {
    _count: QuizQuestionCountAggregateOutputType | null
    _avg: QuizQuestionAvgAggregateOutputType | null
    _sum: QuizQuestionSumAggregateOutputType | null
    _min: QuizQuestionMinAggregateOutputType | null
    _max: QuizQuestionMaxAggregateOutputType | null
  }

  export type QuizQuestionAvgAggregateOutputType = {
    order: number | null
  }

  export type QuizQuestionSumAggregateOutputType = {
    order: number | null
  }

  export type QuizQuestionMinAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    description: string | null
    order: number | null
  }

  export type QuizQuestionMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    description: string | null
    order: number | null
  }

  export type QuizQuestionCountAggregateOutputType = {
    id: number
    slug: number
    title: number
    description: number
    order: number
    _all: number
  }


  export type QuizQuestionAvgAggregateInputType = {
    order?: true
  }

  export type QuizQuestionSumAggregateInputType = {
    order?: true
  }

  export type QuizQuestionMinAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    order?: true
  }

  export type QuizQuestionMaxAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    order?: true
  }

  export type QuizQuestionCountAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    order?: true
    _all?: true
  }

  export type QuizQuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizQuestion to aggregate.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuizQuestions
    **/
    _count?: true | QuizQuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuizQuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuizQuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizQuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizQuestionMaxAggregateInputType
  }

  export type GetQuizQuestionAggregateType<T extends QuizQuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuizQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuizQuestion[P]>
      : GetScalarType<T[P], AggregateQuizQuestion[P]>
  }




  export type QuizQuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizQuestionWhereInput
    orderBy?: QuizQuestionOrderByWithAggregationInput | QuizQuestionOrderByWithAggregationInput[]
    by: QuizQuestionScalarFieldEnum[] | QuizQuestionScalarFieldEnum
    having?: QuizQuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizQuestionCountAggregateInputType | true
    _avg?: QuizQuestionAvgAggregateInputType
    _sum?: QuizQuestionSumAggregateInputType
    _min?: QuizQuestionMinAggregateInputType
    _max?: QuizQuestionMaxAggregateInputType
  }

  export type QuizQuestionGroupByOutputType = {
    id: string
    slug: string
    title: string
    description: string | null
    order: number
    _count: QuizQuestionCountAggregateOutputType | null
    _avg: QuizQuestionAvgAggregateOutputType | null
    _sum: QuizQuestionSumAggregateOutputType | null
    _min: QuizQuestionMinAggregateOutputType | null
    _max: QuizQuestionMaxAggregateOutputType | null
  }

  type GetQuizQuestionGroupByPayload<T extends QuizQuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizQuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizQuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizQuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuizQuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuizQuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    order?: boolean
    options?: boolean | QuizQuestion$optionsArgs<ExtArgs>
    _count?: boolean | QuizQuestionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizQuestion"]>

  export type QuizQuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    order?: boolean
  }, ExtArgs["result"]["quizQuestion"]>

  export type QuizQuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    order?: boolean
  }, ExtArgs["result"]["quizQuestion"]>

  export type QuizQuestionSelectScalar = {
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    order?: boolean
  }

  export type QuizQuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "title" | "description" | "order", ExtArgs["result"]["quizQuestion"]>
  export type QuizQuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    options?: boolean | QuizQuestion$optionsArgs<ExtArgs>
    _count?: boolean | QuizQuestionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuizQuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type QuizQuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $QuizQuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuizQuestion"
    objects: {
      options: Prisma.$QuizOptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      title: string
      description: string | null
      order: number
    }, ExtArgs["result"]["quizQuestion"]>
    composites: {}
  }

  type QuizQuestionGetPayload<S extends boolean | null | undefined | QuizQuestionDefaultArgs> = $Result.GetResult<Prisma.$QuizQuestionPayload, S>

  type QuizQuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuizQuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizQuestionCountAggregateInputType | true
    }

  export interface QuizQuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuizQuestion'], meta: { name: 'QuizQuestion' } }
    /**
     * Find zero or one QuizQuestion that matches the filter.
     * @param {QuizQuestionFindUniqueArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizQuestionFindUniqueArgs>(args: SelectSubset<T, QuizQuestionFindUniqueArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuizQuestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuizQuestionFindUniqueOrThrowArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizQuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizQuestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionFindFirstArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizQuestionFindFirstArgs>(args?: SelectSubset<T, QuizQuestionFindFirstArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizQuestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionFindFirstOrThrowArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizQuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuizQuestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuizQuestions
     * const quizQuestions = await prisma.quizQuestion.findMany()
     * 
     * // Get first 10 QuizQuestions
     * const quizQuestions = await prisma.quizQuestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizQuestionWithIdOnly = await prisma.quizQuestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizQuestionFindManyArgs>(args?: SelectSubset<T, QuizQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuizQuestion.
     * @param {QuizQuestionCreateArgs} args - Arguments to create a QuizQuestion.
     * @example
     * // Create one QuizQuestion
     * const QuizQuestion = await prisma.quizQuestion.create({
     *   data: {
     *     // ... data to create a QuizQuestion
     *   }
     * })
     * 
     */
    create<T extends QuizQuestionCreateArgs>(args: SelectSubset<T, QuizQuestionCreateArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuizQuestions.
     * @param {QuizQuestionCreateManyArgs} args - Arguments to create many QuizQuestions.
     * @example
     * // Create many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizQuestionCreateManyArgs>(args?: SelectSubset<T, QuizQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuizQuestions and returns the data saved in the database.
     * @param {QuizQuestionCreateManyAndReturnArgs} args - Arguments to create many QuizQuestions.
     * @example
     * // Create many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuizQuestions and only return the `id`
     * const quizQuestionWithIdOnly = await prisma.quizQuestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizQuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizQuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuizQuestion.
     * @param {QuizQuestionDeleteArgs} args - Arguments to delete one QuizQuestion.
     * @example
     * // Delete one QuizQuestion
     * const QuizQuestion = await prisma.quizQuestion.delete({
     *   where: {
     *     // ... filter to delete one QuizQuestion
     *   }
     * })
     * 
     */
    delete<T extends QuizQuestionDeleteArgs>(args: SelectSubset<T, QuizQuestionDeleteArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuizQuestion.
     * @param {QuizQuestionUpdateArgs} args - Arguments to update one QuizQuestion.
     * @example
     * // Update one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizQuestionUpdateArgs>(args: SelectSubset<T, QuizQuestionUpdateArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuizQuestions.
     * @param {QuizQuestionDeleteManyArgs} args - Arguments to filter QuizQuestions to delete.
     * @example
     * // Delete a few QuizQuestions
     * const { count } = await prisma.quizQuestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizQuestionDeleteManyArgs>(args?: SelectSubset<T, QuizQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizQuestionUpdateManyArgs>(args: SelectSubset<T, QuizQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizQuestions and returns the data updated in the database.
     * @param {QuizQuestionUpdateManyAndReturnArgs} args - Arguments to update many QuizQuestions.
     * @example
     * // Update many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuizQuestions and only return the `id`
     * const quizQuestionWithIdOnly = await prisma.quizQuestion.updateManyAndReturn({
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
    updateManyAndReturn<T extends QuizQuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuizQuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuizQuestion.
     * @param {QuizQuestionUpsertArgs} args - Arguments to update or create a QuizQuestion.
     * @example
     * // Update or create a QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.upsert({
     *   create: {
     *     // ... data to create a QuizQuestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuizQuestion we want to update
     *   }
     * })
     */
    upsert<T extends QuizQuestionUpsertArgs>(args: SelectSubset<T, QuizQuestionUpsertArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuizQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionCountArgs} args - Arguments to filter QuizQuestions to count.
     * @example
     * // Count the number of QuizQuestions
     * const count = await prisma.quizQuestion.count({
     *   where: {
     *     // ... the filter for the QuizQuestions we want to count
     *   }
     * })
    **/
    count<T extends QuizQuestionCountArgs>(
      args?: Subset<T, QuizQuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizQuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuizQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QuizQuestionAggregateArgs>(args: Subset<T, QuizQuestionAggregateArgs>): Prisma.PrismaPromise<GetQuizQuestionAggregateType<T>>

    /**
     * Group by QuizQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionGroupByArgs} args - Group by arguments.
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
      T extends QuizQuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizQuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuizQuestionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QuizQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuizQuestion model
   */
  readonly fields: QuizQuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuizQuestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizQuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    options<T extends QuizQuestion$optionsArgs<ExtArgs> = {}>(args?: Subset<T, QuizQuestion$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the QuizQuestion model
   */
  interface QuizQuestionFieldRefs {
    readonly id: FieldRef<"QuizQuestion", 'String'>
    readonly slug: FieldRef<"QuizQuestion", 'String'>
    readonly title: FieldRef<"QuizQuestion", 'String'>
    readonly description: FieldRef<"QuizQuestion", 'String'>
    readonly order: FieldRef<"QuizQuestion", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * QuizQuestion findUnique
   */
  export type QuizQuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion findUniqueOrThrow
   */
  export type QuizQuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion findFirst
   */
  export type QuizQuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizQuestions.
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizQuestions.
     */
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * QuizQuestion findFirstOrThrow
   */
  export type QuizQuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizQuestions.
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizQuestions.
     */
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * QuizQuestion findMany
   */
  export type QuizQuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestions to fetch.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuizQuestions.
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * QuizQuestion create
   */
  export type QuizQuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a QuizQuestion.
     */
    data: XOR<QuizQuestionCreateInput, QuizQuestionUncheckedCreateInput>
  }

  /**
   * QuizQuestion createMany
   */
  export type QuizQuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuizQuestions.
     */
    data: QuizQuestionCreateManyInput | QuizQuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuizQuestion createManyAndReturn
   */
  export type QuizQuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * The data used to create many QuizQuestions.
     */
    data: QuizQuestionCreateManyInput | QuizQuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuizQuestion update
   */
  export type QuizQuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a QuizQuestion.
     */
    data: XOR<QuizQuestionUpdateInput, QuizQuestionUncheckedUpdateInput>
    /**
     * Choose, which QuizQuestion to update.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion updateMany
   */
  export type QuizQuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuizQuestions.
     */
    data: XOR<QuizQuestionUpdateManyMutationInput, QuizQuestionUncheckedUpdateManyInput>
    /**
     * Filter which QuizQuestions to update
     */
    where?: QuizQuestionWhereInput
    /**
     * Limit how many QuizQuestions to update.
     */
    limit?: number
  }

  /**
   * QuizQuestion updateManyAndReturn
   */
  export type QuizQuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * The data used to update QuizQuestions.
     */
    data: XOR<QuizQuestionUpdateManyMutationInput, QuizQuestionUncheckedUpdateManyInput>
    /**
     * Filter which QuizQuestions to update
     */
    where?: QuizQuestionWhereInput
    /**
     * Limit how many QuizQuestions to update.
     */
    limit?: number
  }

  /**
   * QuizQuestion upsert
   */
  export type QuizQuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the QuizQuestion to update in case it exists.
     */
    where: QuizQuestionWhereUniqueInput
    /**
     * In case the QuizQuestion found by the `where` argument doesn't exist, create a new QuizQuestion with this data.
     */
    create: XOR<QuizQuestionCreateInput, QuizQuestionUncheckedCreateInput>
    /**
     * In case the QuizQuestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizQuestionUpdateInput, QuizQuestionUncheckedUpdateInput>
  }

  /**
   * QuizQuestion delete
   */
  export type QuizQuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter which QuizQuestion to delete.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion deleteMany
   */
  export type QuizQuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizQuestions to delete
     */
    where?: QuizQuestionWhereInput
    /**
     * Limit how many QuizQuestions to delete.
     */
    limit?: number
  }

  /**
   * QuizQuestion.options
   */
  export type QuizQuestion$optionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizOption
     */
    select?: QuizOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizOption
     */
    omit?: QuizOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizOptionInclude<ExtArgs> | null
    where?: QuizOptionWhereInput
    orderBy?: QuizOptionOrderByWithRelationInput | QuizOptionOrderByWithRelationInput[]
    cursor?: QuizOptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizOptionScalarFieldEnum | QuizOptionScalarFieldEnum[]
  }

  /**
   * QuizQuestion without action
   */
  export type QuizQuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
  }


  /**
   * Model QuizOption
   */

  export type AggregateQuizOption = {
    _count: QuizOptionCountAggregateOutputType | null
    _avg: QuizOptionAvgAggregateOutputType | null
    _sum: QuizOptionSumAggregateOutputType | null
    _min: QuizOptionMinAggregateOutputType | null
    _max: QuizOptionMaxAggregateOutputType | null
  }

  export type QuizOptionAvgAggregateOutputType = {
    order: number | null
  }

  export type QuizOptionSumAggregateOutputType = {
    order: number | null
  }

  export type QuizOptionMinAggregateOutputType = {
    id: string | null
    questionId: string | null
    label: string | null
    order: number | null
  }

  export type QuizOptionMaxAggregateOutputType = {
    id: string | null
    questionId: string | null
    label: string | null
    order: number | null
  }

  export type QuizOptionCountAggregateOutputType = {
    id: number
    questionId: number
    label: number
    order: number
    weights: number
    _all: number
  }


  export type QuizOptionAvgAggregateInputType = {
    order?: true
  }

  export type QuizOptionSumAggregateInputType = {
    order?: true
  }

  export type QuizOptionMinAggregateInputType = {
    id?: true
    questionId?: true
    label?: true
    order?: true
  }

  export type QuizOptionMaxAggregateInputType = {
    id?: true
    questionId?: true
    label?: true
    order?: true
  }

  export type QuizOptionCountAggregateInputType = {
    id?: true
    questionId?: true
    label?: true
    order?: true
    weights?: true
    _all?: true
  }

  export type QuizOptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizOption to aggregate.
     */
    where?: QuizOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizOptions to fetch.
     */
    orderBy?: QuizOptionOrderByWithRelationInput | QuizOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuizOptions
    **/
    _count?: true | QuizOptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuizOptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuizOptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizOptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizOptionMaxAggregateInputType
  }

  export type GetQuizOptionAggregateType<T extends QuizOptionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuizOption]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuizOption[P]>
      : GetScalarType<T[P], AggregateQuizOption[P]>
  }




  export type QuizOptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizOptionWhereInput
    orderBy?: QuizOptionOrderByWithAggregationInput | QuizOptionOrderByWithAggregationInput[]
    by: QuizOptionScalarFieldEnum[] | QuizOptionScalarFieldEnum
    having?: QuizOptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizOptionCountAggregateInputType | true
    _avg?: QuizOptionAvgAggregateInputType
    _sum?: QuizOptionSumAggregateInputType
    _min?: QuizOptionMinAggregateInputType
    _max?: QuizOptionMaxAggregateInputType
  }

  export type QuizOptionGroupByOutputType = {
    id: string
    questionId: string
    label: string
    order: number
    weights: JsonValue
    _count: QuizOptionCountAggregateOutputType | null
    _avg: QuizOptionAvgAggregateOutputType | null
    _sum: QuizOptionSumAggregateOutputType | null
    _min: QuizOptionMinAggregateOutputType | null
    _max: QuizOptionMaxAggregateOutputType | null
  }

  type GetQuizOptionGroupByPayload<T extends QuizOptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizOptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizOptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizOptionGroupByOutputType[P]>
            : GetScalarType<T[P], QuizOptionGroupByOutputType[P]>
        }
      >
    >


  export type QuizOptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    label?: boolean
    order?: boolean
    weights?: boolean
    question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizOption"]>

  export type QuizOptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    label?: boolean
    order?: boolean
    weights?: boolean
    question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizOption"]>

  export type QuizOptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    label?: boolean
    order?: boolean
    weights?: boolean
    question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizOption"]>

  export type QuizOptionSelectScalar = {
    id?: boolean
    questionId?: boolean
    label?: boolean
    order?: boolean
    weights?: boolean
  }

  export type QuizOptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "questionId" | "label" | "order" | "weights", ExtArgs["result"]["quizOption"]>
  export type QuizOptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
  }
  export type QuizOptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
  }
  export type QuizOptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
  }

  export type $QuizOptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuizOption"
    objects: {
      question: Prisma.$QuizQuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      questionId: string
      label: string
      order: number
      weights: Prisma.JsonValue
    }, ExtArgs["result"]["quizOption"]>
    composites: {}
  }

  type QuizOptionGetPayload<S extends boolean | null | undefined | QuizOptionDefaultArgs> = $Result.GetResult<Prisma.$QuizOptionPayload, S>

  type QuizOptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuizOptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizOptionCountAggregateInputType | true
    }

  export interface QuizOptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuizOption'], meta: { name: 'QuizOption' } }
    /**
     * Find zero or one QuizOption that matches the filter.
     * @param {QuizOptionFindUniqueArgs} args - Arguments to find a QuizOption
     * @example
     * // Get one QuizOption
     * const quizOption = await prisma.quizOption.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizOptionFindUniqueArgs>(args: SelectSubset<T, QuizOptionFindUniqueArgs<ExtArgs>>): Prisma__QuizOptionClient<$Result.GetResult<Prisma.$QuizOptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuizOption that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuizOptionFindUniqueOrThrowArgs} args - Arguments to find a QuizOption
     * @example
     * // Get one QuizOption
     * const quizOption = await prisma.quizOption.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizOptionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizOptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizOptionClient<$Result.GetResult<Prisma.$QuizOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizOption that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizOptionFindFirstArgs} args - Arguments to find a QuizOption
     * @example
     * // Get one QuizOption
     * const quizOption = await prisma.quizOption.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizOptionFindFirstArgs>(args?: SelectSubset<T, QuizOptionFindFirstArgs<ExtArgs>>): Prisma__QuizOptionClient<$Result.GetResult<Prisma.$QuizOptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizOption that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizOptionFindFirstOrThrowArgs} args - Arguments to find a QuizOption
     * @example
     * // Get one QuizOption
     * const quizOption = await prisma.quizOption.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizOptionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizOptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizOptionClient<$Result.GetResult<Prisma.$QuizOptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuizOptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizOptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuizOptions
     * const quizOptions = await prisma.quizOption.findMany()
     * 
     * // Get first 10 QuizOptions
     * const quizOptions = await prisma.quizOption.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizOptionWithIdOnly = await prisma.quizOption.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizOptionFindManyArgs>(args?: SelectSubset<T, QuizOptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuizOption.
     * @param {QuizOptionCreateArgs} args - Arguments to create a QuizOption.
     * @example
     * // Create one QuizOption
     * const QuizOption = await prisma.quizOption.create({
     *   data: {
     *     // ... data to create a QuizOption
     *   }
     * })
     * 
     */
    create<T extends QuizOptionCreateArgs>(args: SelectSubset<T, QuizOptionCreateArgs<ExtArgs>>): Prisma__QuizOptionClient<$Result.GetResult<Prisma.$QuizOptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuizOptions.
     * @param {QuizOptionCreateManyArgs} args - Arguments to create many QuizOptions.
     * @example
     * // Create many QuizOptions
     * const quizOption = await prisma.quizOption.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizOptionCreateManyArgs>(args?: SelectSubset<T, QuizOptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuizOptions and returns the data saved in the database.
     * @param {QuizOptionCreateManyAndReturnArgs} args - Arguments to create many QuizOptions.
     * @example
     * // Create many QuizOptions
     * const quizOption = await prisma.quizOption.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuizOptions and only return the `id`
     * const quizOptionWithIdOnly = await prisma.quizOption.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizOptionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizOptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizOptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuizOption.
     * @param {QuizOptionDeleteArgs} args - Arguments to delete one QuizOption.
     * @example
     * // Delete one QuizOption
     * const QuizOption = await prisma.quizOption.delete({
     *   where: {
     *     // ... filter to delete one QuizOption
     *   }
     * })
     * 
     */
    delete<T extends QuizOptionDeleteArgs>(args: SelectSubset<T, QuizOptionDeleteArgs<ExtArgs>>): Prisma__QuizOptionClient<$Result.GetResult<Prisma.$QuizOptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuizOption.
     * @param {QuizOptionUpdateArgs} args - Arguments to update one QuizOption.
     * @example
     * // Update one QuizOption
     * const quizOption = await prisma.quizOption.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizOptionUpdateArgs>(args: SelectSubset<T, QuizOptionUpdateArgs<ExtArgs>>): Prisma__QuizOptionClient<$Result.GetResult<Prisma.$QuizOptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuizOptions.
     * @param {QuizOptionDeleteManyArgs} args - Arguments to filter QuizOptions to delete.
     * @example
     * // Delete a few QuizOptions
     * const { count } = await prisma.quizOption.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizOptionDeleteManyArgs>(args?: SelectSubset<T, QuizOptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizOptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuizOptions
     * const quizOption = await prisma.quizOption.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizOptionUpdateManyArgs>(args: SelectSubset<T, QuizOptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizOptions and returns the data updated in the database.
     * @param {QuizOptionUpdateManyAndReturnArgs} args - Arguments to update many QuizOptions.
     * @example
     * // Update many QuizOptions
     * const quizOption = await prisma.quizOption.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuizOptions and only return the `id`
     * const quizOptionWithIdOnly = await prisma.quizOption.updateManyAndReturn({
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
    updateManyAndReturn<T extends QuizOptionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuizOptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizOptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuizOption.
     * @param {QuizOptionUpsertArgs} args - Arguments to update or create a QuizOption.
     * @example
     * // Update or create a QuizOption
     * const quizOption = await prisma.quizOption.upsert({
     *   create: {
     *     // ... data to create a QuizOption
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuizOption we want to update
     *   }
     * })
     */
    upsert<T extends QuizOptionUpsertArgs>(args: SelectSubset<T, QuizOptionUpsertArgs<ExtArgs>>): Prisma__QuizOptionClient<$Result.GetResult<Prisma.$QuizOptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuizOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizOptionCountArgs} args - Arguments to filter QuizOptions to count.
     * @example
     * // Count the number of QuizOptions
     * const count = await prisma.quizOption.count({
     *   where: {
     *     // ... the filter for the QuizOptions we want to count
     *   }
     * })
    **/
    count<T extends QuizOptionCountArgs>(
      args?: Subset<T, QuizOptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizOptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuizOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizOptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QuizOptionAggregateArgs>(args: Subset<T, QuizOptionAggregateArgs>): Prisma.PrismaPromise<GetQuizOptionAggregateType<T>>

    /**
     * Group by QuizOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizOptionGroupByArgs} args - Group by arguments.
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
      T extends QuizOptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizOptionGroupByArgs['orderBy'] }
        : { orderBy?: QuizOptionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QuizOptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuizOption model
   */
  readonly fields: QuizOptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuizOption.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizOptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    question<T extends QuizQuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuizQuestionDefaultArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the QuizOption model
   */
  interface QuizOptionFieldRefs {
    readonly id: FieldRef<"QuizOption", 'String'>
    readonly questionId: FieldRef<"QuizOption", 'String'>
    readonly label: FieldRef<"QuizOption", 'String'>
    readonly order: FieldRef<"QuizOption", 'Int'>
    readonly weights: FieldRef<"QuizOption", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * QuizOption findUnique
   */
  export type QuizOptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizOption
     */
    select?: QuizOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizOption
     */
    omit?: QuizOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuizOption to fetch.
     */
    where: QuizOptionWhereUniqueInput
  }

  /**
   * QuizOption findUniqueOrThrow
   */
  export type QuizOptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizOption
     */
    select?: QuizOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizOption
     */
    omit?: QuizOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuizOption to fetch.
     */
    where: QuizOptionWhereUniqueInput
  }

  /**
   * QuizOption findFirst
   */
  export type QuizOptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizOption
     */
    select?: QuizOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizOption
     */
    omit?: QuizOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuizOption to fetch.
     */
    where?: QuizOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizOptions to fetch.
     */
    orderBy?: QuizOptionOrderByWithRelationInput | QuizOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizOptions.
     */
    cursor?: QuizOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizOptions.
     */
    distinct?: QuizOptionScalarFieldEnum | QuizOptionScalarFieldEnum[]
  }

  /**
   * QuizOption findFirstOrThrow
   */
  export type QuizOptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizOption
     */
    select?: QuizOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizOption
     */
    omit?: QuizOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuizOption to fetch.
     */
    where?: QuizOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizOptions to fetch.
     */
    orderBy?: QuizOptionOrderByWithRelationInput | QuizOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizOptions.
     */
    cursor?: QuizOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizOptions.
     */
    distinct?: QuizOptionScalarFieldEnum | QuizOptionScalarFieldEnum[]
  }

  /**
   * QuizOption findMany
   */
  export type QuizOptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizOption
     */
    select?: QuizOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizOption
     */
    omit?: QuizOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuizOptions to fetch.
     */
    where?: QuizOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizOptions to fetch.
     */
    orderBy?: QuizOptionOrderByWithRelationInput | QuizOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuizOptions.
     */
    cursor?: QuizOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizOptions.
     */
    skip?: number
    distinct?: QuizOptionScalarFieldEnum | QuizOptionScalarFieldEnum[]
  }

  /**
   * QuizOption create
   */
  export type QuizOptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizOption
     */
    select?: QuizOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizOption
     */
    omit?: QuizOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizOptionInclude<ExtArgs> | null
    /**
     * The data needed to create a QuizOption.
     */
    data: XOR<QuizOptionCreateInput, QuizOptionUncheckedCreateInput>
  }

  /**
   * QuizOption createMany
   */
  export type QuizOptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuizOptions.
     */
    data: QuizOptionCreateManyInput | QuizOptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuizOption createManyAndReturn
   */
  export type QuizOptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizOption
     */
    select?: QuizOptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizOption
     */
    omit?: QuizOptionOmit<ExtArgs> | null
    /**
     * The data used to create many QuizOptions.
     */
    data: QuizOptionCreateManyInput | QuizOptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizOptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizOption update
   */
  export type QuizOptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizOption
     */
    select?: QuizOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizOption
     */
    omit?: QuizOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizOptionInclude<ExtArgs> | null
    /**
     * The data needed to update a QuizOption.
     */
    data: XOR<QuizOptionUpdateInput, QuizOptionUncheckedUpdateInput>
    /**
     * Choose, which QuizOption to update.
     */
    where: QuizOptionWhereUniqueInput
  }

  /**
   * QuizOption updateMany
   */
  export type QuizOptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuizOptions.
     */
    data: XOR<QuizOptionUpdateManyMutationInput, QuizOptionUncheckedUpdateManyInput>
    /**
     * Filter which QuizOptions to update
     */
    where?: QuizOptionWhereInput
    /**
     * Limit how many QuizOptions to update.
     */
    limit?: number
  }

  /**
   * QuizOption updateManyAndReturn
   */
  export type QuizOptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizOption
     */
    select?: QuizOptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizOption
     */
    omit?: QuizOptionOmit<ExtArgs> | null
    /**
     * The data used to update QuizOptions.
     */
    data: XOR<QuizOptionUpdateManyMutationInput, QuizOptionUncheckedUpdateManyInput>
    /**
     * Filter which QuizOptions to update
     */
    where?: QuizOptionWhereInput
    /**
     * Limit how many QuizOptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizOptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizOption upsert
   */
  export type QuizOptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizOption
     */
    select?: QuizOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizOption
     */
    omit?: QuizOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizOptionInclude<ExtArgs> | null
    /**
     * The filter to search for the QuizOption to update in case it exists.
     */
    where: QuizOptionWhereUniqueInput
    /**
     * In case the QuizOption found by the `where` argument doesn't exist, create a new QuizOption with this data.
     */
    create: XOR<QuizOptionCreateInput, QuizOptionUncheckedCreateInput>
    /**
     * In case the QuizOption was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizOptionUpdateInput, QuizOptionUncheckedUpdateInput>
  }

  /**
   * QuizOption delete
   */
  export type QuizOptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizOption
     */
    select?: QuizOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizOption
     */
    omit?: QuizOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizOptionInclude<ExtArgs> | null
    /**
     * Filter which QuizOption to delete.
     */
    where: QuizOptionWhereUniqueInput
  }

  /**
   * QuizOption deleteMany
   */
  export type QuizOptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizOptions to delete
     */
    where?: QuizOptionWhereInput
    /**
     * Limit how many QuizOptions to delete.
     */
    limit?: number
  }

  /**
   * QuizOption without action
   */
  export type QuizOptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizOption
     */
    select?: QuizOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizOption
     */
    omit?: QuizOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizOptionInclude<ExtArgs> | null
  }


  /**
   * Model QuizSession
   */

  export type AggregateQuizSession = {
    _count: QuizSessionCountAggregateOutputType | null
    _avg: QuizSessionAvgAggregateOutputType | null
    _sum: QuizSessionSumAggregateOutputType | null
    _min: QuizSessionMinAggregateOutputType | null
    _max: QuizSessionMaxAggregateOutputType | null
  }

  export type QuizSessionAvgAggregateOutputType = {
    currentQuestion: number | null
  }

  export type QuizSessionSumAggregateOutputType = {
    currentQuestion: number | null
  }

  export type QuizSessionMinAggregateOutputType = {
    id: string | null
    status: string | null
    currentQuestion: number | null
    personalityCode: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type QuizSessionMaxAggregateOutputType = {
    id: string | null
    status: string | null
    currentQuestion: number | null
    personalityCode: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type QuizSessionCountAggregateOutputType = {
    id: number
    status: number
    currentQuestion: number
    personalityCode: number
    createdAt: number
    completedAt: number
    _all: number
  }


  export type QuizSessionAvgAggregateInputType = {
    currentQuestion?: true
  }

  export type QuizSessionSumAggregateInputType = {
    currentQuestion?: true
  }

  export type QuizSessionMinAggregateInputType = {
    id?: true
    status?: true
    currentQuestion?: true
    personalityCode?: true
    createdAt?: true
    completedAt?: true
  }

  export type QuizSessionMaxAggregateInputType = {
    id?: true
    status?: true
    currentQuestion?: true
    personalityCode?: true
    createdAt?: true
    completedAt?: true
  }

  export type QuizSessionCountAggregateInputType = {
    id?: true
    status?: true
    currentQuestion?: true
    personalityCode?: true
    createdAt?: true
    completedAt?: true
    _all?: true
  }

  export type QuizSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizSession to aggregate.
     */
    where?: QuizSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizSessions to fetch.
     */
    orderBy?: QuizSessionOrderByWithRelationInput | QuizSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuizSessions
    **/
    _count?: true | QuizSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuizSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuizSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizSessionMaxAggregateInputType
  }

  export type GetQuizSessionAggregateType<T extends QuizSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuizSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuizSession[P]>
      : GetScalarType<T[P], AggregateQuizSession[P]>
  }




  export type QuizSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizSessionWhereInput
    orderBy?: QuizSessionOrderByWithAggregationInput | QuizSessionOrderByWithAggregationInput[]
    by: QuizSessionScalarFieldEnum[] | QuizSessionScalarFieldEnum
    having?: QuizSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizSessionCountAggregateInputType | true
    _avg?: QuizSessionAvgAggregateInputType
    _sum?: QuizSessionSumAggregateInputType
    _min?: QuizSessionMinAggregateInputType
    _max?: QuizSessionMaxAggregateInputType
  }

  export type QuizSessionGroupByOutputType = {
    id: string
    status: string
    currentQuestion: number
    personalityCode: string | null
    createdAt: Date
    completedAt: Date | null
    _count: QuizSessionCountAggregateOutputType | null
    _avg: QuizSessionAvgAggregateOutputType | null
    _sum: QuizSessionSumAggregateOutputType | null
    _min: QuizSessionMinAggregateOutputType | null
    _max: QuizSessionMaxAggregateOutputType | null
  }

  type GetQuizSessionGroupByPayload<T extends QuizSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizSessionGroupByOutputType[P]>
            : GetScalarType<T[P], QuizSessionGroupByOutputType[P]>
        }
      >
    >


  export type QuizSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    currentQuestion?: boolean
    personalityCode?: boolean
    createdAt?: boolean
    completedAt?: boolean
    result?: boolean | QuizSession$resultArgs<ExtArgs>
    answers?: boolean | QuizSession$answersArgs<ExtArgs>
    _count?: boolean | QuizSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizSession"]>

  export type QuizSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    currentQuestion?: boolean
    personalityCode?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["quizSession"]>

  export type QuizSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    currentQuestion?: boolean
    personalityCode?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["quizSession"]>

  export type QuizSessionSelectScalar = {
    id?: boolean
    status?: boolean
    currentQuestion?: boolean
    personalityCode?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }

  export type QuizSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "currentQuestion" | "personalityCode" | "createdAt" | "completedAt", ExtArgs["result"]["quizSession"]>
  export type QuizSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    result?: boolean | QuizSession$resultArgs<ExtArgs>
    answers?: boolean | QuizSession$answersArgs<ExtArgs>
    _count?: boolean | QuizSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuizSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type QuizSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $QuizSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuizSession"
    objects: {
      result: Prisma.$PersonalityResultPayload<ExtArgs> | null
      answers: Prisma.$QuizAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: string
      currentQuestion: number
      personalityCode: string | null
      createdAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["quizSession"]>
    composites: {}
  }

  type QuizSessionGetPayload<S extends boolean | null | undefined | QuizSessionDefaultArgs> = $Result.GetResult<Prisma.$QuizSessionPayload, S>

  type QuizSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuizSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizSessionCountAggregateInputType | true
    }

  export interface QuizSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuizSession'], meta: { name: 'QuizSession' } }
    /**
     * Find zero or one QuizSession that matches the filter.
     * @param {QuizSessionFindUniqueArgs} args - Arguments to find a QuizSession
     * @example
     * // Get one QuizSession
     * const quizSession = await prisma.quizSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizSessionFindUniqueArgs>(args: SelectSubset<T, QuizSessionFindUniqueArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuizSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuizSessionFindUniqueOrThrowArgs} args - Arguments to find a QuizSession
     * @example
     * // Get one QuizSession
     * const quizSession = await prisma.quizSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizSessionFindFirstArgs} args - Arguments to find a QuizSession
     * @example
     * // Get one QuizSession
     * const quizSession = await prisma.quizSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizSessionFindFirstArgs>(args?: SelectSubset<T, QuizSessionFindFirstArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizSessionFindFirstOrThrowArgs} args - Arguments to find a QuizSession
     * @example
     * // Get one QuizSession
     * const quizSession = await prisma.quizSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuizSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuizSessions
     * const quizSessions = await prisma.quizSession.findMany()
     * 
     * // Get first 10 QuizSessions
     * const quizSessions = await prisma.quizSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizSessionWithIdOnly = await prisma.quizSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizSessionFindManyArgs>(args?: SelectSubset<T, QuizSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuizSession.
     * @param {QuizSessionCreateArgs} args - Arguments to create a QuizSession.
     * @example
     * // Create one QuizSession
     * const QuizSession = await prisma.quizSession.create({
     *   data: {
     *     // ... data to create a QuizSession
     *   }
     * })
     * 
     */
    create<T extends QuizSessionCreateArgs>(args: SelectSubset<T, QuizSessionCreateArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuizSessions.
     * @param {QuizSessionCreateManyArgs} args - Arguments to create many QuizSessions.
     * @example
     * // Create many QuizSessions
     * const quizSession = await prisma.quizSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizSessionCreateManyArgs>(args?: SelectSubset<T, QuizSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuizSessions and returns the data saved in the database.
     * @param {QuizSessionCreateManyAndReturnArgs} args - Arguments to create many QuizSessions.
     * @example
     * // Create many QuizSessions
     * const quizSession = await prisma.quizSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuizSessions and only return the `id`
     * const quizSessionWithIdOnly = await prisma.quizSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuizSession.
     * @param {QuizSessionDeleteArgs} args - Arguments to delete one QuizSession.
     * @example
     * // Delete one QuizSession
     * const QuizSession = await prisma.quizSession.delete({
     *   where: {
     *     // ... filter to delete one QuizSession
     *   }
     * })
     * 
     */
    delete<T extends QuizSessionDeleteArgs>(args: SelectSubset<T, QuizSessionDeleteArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuizSession.
     * @param {QuizSessionUpdateArgs} args - Arguments to update one QuizSession.
     * @example
     * // Update one QuizSession
     * const quizSession = await prisma.quizSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizSessionUpdateArgs>(args: SelectSubset<T, QuizSessionUpdateArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuizSessions.
     * @param {QuizSessionDeleteManyArgs} args - Arguments to filter QuizSessions to delete.
     * @example
     * // Delete a few QuizSessions
     * const { count } = await prisma.quizSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizSessionDeleteManyArgs>(args?: SelectSubset<T, QuizSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuizSessions
     * const quizSession = await prisma.quizSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizSessionUpdateManyArgs>(args: SelectSubset<T, QuizSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizSessions and returns the data updated in the database.
     * @param {QuizSessionUpdateManyAndReturnArgs} args - Arguments to update many QuizSessions.
     * @example
     * // Update many QuizSessions
     * const quizSession = await prisma.quizSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuizSessions and only return the `id`
     * const quizSessionWithIdOnly = await prisma.quizSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends QuizSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuizSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuizSession.
     * @param {QuizSessionUpsertArgs} args - Arguments to update or create a QuizSession.
     * @example
     * // Update or create a QuizSession
     * const quizSession = await prisma.quizSession.upsert({
     *   create: {
     *     // ... data to create a QuizSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuizSession we want to update
     *   }
     * })
     */
    upsert<T extends QuizSessionUpsertArgs>(args: SelectSubset<T, QuizSessionUpsertArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuizSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizSessionCountArgs} args - Arguments to filter QuizSessions to count.
     * @example
     * // Count the number of QuizSessions
     * const count = await prisma.quizSession.count({
     *   where: {
     *     // ... the filter for the QuizSessions we want to count
     *   }
     * })
    **/
    count<T extends QuizSessionCountArgs>(
      args?: Subset<T, QuizSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuizSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QuizSessionAggregateArgs>(args: Subset<T, QuizSessionAggregateArgs>): Prisma.PrismaPromise<GetQuizSessionAggregateType<T>>

    /**
     * Group by QuizSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizSessionGroupByArgs} args - Group by arguments.
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
      T extends QuizSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizSessionGroupByArgs['orderBy'] }
        : { orderBy?: QuizSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QuizSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuizSession model
   */
  readonly fields: QuizSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuizSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    result<T extends QuizSession$resultArgs<ExtArgs> = {}>(args?: Subset<T, QuizSession$resultArgs<ExtArgs>>): Prisma__PersonalityResultClient<$Result.GetResult<Prisma.$PersonalityResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    answers<T extends QuizSession$answersArgs<ExtArgs> = {}>(args?: Subset<T, QuizSession$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the QuizSession model
   */
  interface QuizSessionFieldRefs {
    readonly id: FieldRef<"QuizSession", 'String'>
    readonly status: FieldRef<"QuizSession", 'String'>
    readonly currentQuestion: FieldRef<"QuizSession", 'Int'>
    readonly personalityCode: FieldRef<"QuizSession", 'String'>
    readonly createdAt: FieldRef<"QuizSession", 'DateTime'>
    readonly completedAt: FieldRef<"QuizSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuizSession findUnique
   */
  export type QuizSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * Filter, which QuizSession to fetch.
     */
    where: QuizSessionWhereUniqueInput
  }

  /**
   * QuizSession findUniqueOrThrow
   */
  export type QuizSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * Filter, which QuizSession to fetch.
     */
    where: QuizSessionWhereUniqueInput
  }

  /**
   * QuizSession findFirst
   */
  export type QuizSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * Filter, which QuizSession to fetch.
     */
    where?: QuizSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizSessions to fetch.
     */
    orderBy?: QuizSessionOrderByWithRelationInput | QuizSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizSessions.
     */
    cursor?: QuizSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizSessions.
     */
    distinct?: QuizSessionScalarFieldEnum | QuizSessionScalarFieldEnum[]
  }

  /**
   * QuizSession findFirstOrThrow
   */
  export type QuizSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * Filter, which QuizSession to fetch.
     */
    where?: QuizSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizSessions to fetch.
     */
    orderBy?: QuizSessionOrderByWithRelationInput | QuizSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizSessions.
     */
    cursor?: QuizSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizSessions.
     */
    distinct?: QuizSessionScalarFieldEnum | QuizSessionScalarFieldEnum[]
  }

  /**
   * QuizSession findMany
   */
  export type QuizSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * Filter, which QuizSessions to fetch.
     */
    where?: QuizSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizSessions to fetch.
     */
    orderBy?: QuizSessionOrderByWithRelationInput | QuizSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuizSessions.
     */
    cursor?: QuizSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizSessions.
     */
    skip?: number
    distinct?: QuizSessionScalarFieldEnum | QuizSessionScalarFieldEnum[]
  }

  /**
   * QuizSession create
   */
  export type QuizSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a QuizSession.
     */
    data: XOR<QuizSessionCreateInput, QuizSessionUncheckedCreateInput>
  }

  /**
   * QuizSession createMany
   */
  export type QuizSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuizSessions.
     */
    data: QuizSessionCreateManyInput | QuizSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuizSession createManyAndReturn
   */
  export type QuizSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * The data used to create many QuizSessions.
     */
    data: QuizSessionCreateManyInput | QuizSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuizSession update
   */
  export type QuizSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a QuizSession.
     */
    data: XOR<QuizSessionUpdateInput, QuizSessionUncheckedUpdateInput>
    /**
     * Choose, which QuizSession to update.
     */
    where: QuizSessionWhereUniqueInput
  }

  /**
   * QuizSession updateMany
   */
  export type QuizSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuizSessions.
     */
    data: XOR<QuizSessionUpdateManyMutationInput, QuizSessionUncheckedUpdateManyInput>
    /**
     * Filter which QuizSessions to update
     */
    where?: QuizSessionWhereInput
    /**
     * Limit how many QuizSessions to update.
     */
    limit?: number
  }

  /**
   * QuizSession updateManyAndReturn
   */
  export type QuizSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * The data used to update QuizSessions.
     */
    data: XOR<QuizSessionUpdateManyMutationInput, QuizSessionUncheckedUpdateManyInput>
    /**
     * Filter which QuizSessions to update
     */
    where?: QuizSessionWhereInput
    /**
     * Limit how many QuizSessions to update.
     */
    limit?: number
  }

  /**
   * QuizSession upsert
   */
  export type QuizSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the QuizSession to update in case it exists.
     */
    where: QuizSessionWhereUniqueInput
    /**
     * In case the QuizSession found by the `where` argument doesn't exist, create a new QuizSession with this data.
     */
    create: XOR<QuizSessionCreateInput, QuizSessionUncheckedCreateInput>
    /**
     * In case the QuizSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizSessionUpdateInput, QuizSessionUncheckedUpdateInput>
  }

  /**
   * QuizSession delete
   */
  export type QuizSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * Filter which QuizSession to delete.
     */
    where: QuizSessionWhereUniqueInput
  }

  /**
   * QuizSession deleteMany
   */
  export type QuizSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizSessions to delete
     */
    where?: QuizSessionWhereInput
    /**
     * Limit how many QuizSessions to delete.
     */
    limit?: number
  }

  /**
   * QuizSession.result
   */
  export type QuizSession$resultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalityResult
     */
    select?: PersonalityResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalityResult
     */
    omit?: PersonalityResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityResultInclude<ExtArgs> | null
    where?: PersonalityResultWhereInput
  }

  /**
   * QuizSession.answers
   */
  export type QuizSession$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAnswer
     */
    select?: QuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAnswer
     */
    omit?: QuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAnswerInclude<ExtArgs> | null
    where?: QuizAnswerWhereInput
    orderBy?: QuizAnswerOrderByWithRelationInput | QuizAnswerOrderByWithRelationInput[]
    cursor?: QuizAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizAnswerScalarFieldEnum | QuizAnswerScalarFieldEnum[]
  }

  /**
   * QuizSession without action
   */
  export type QuizSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
  }


  /**
   * Model QuizAnswer
   */

  export type AggregateQuizAnswer = {
    _count: QuizAnswerCountAggregateOutputType | null
    _min: QuizAnswerMinAggregateOutputType | null
    _max: QuizAnswerMaxAggregateOutputType | null
  }

  export type QuizAnswerMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    questionId: string | null
    optionId: string | null
    createdAt: Date | null
  }

  export type QuizAnswerMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    questionId: string | null
    optionId: string | null
    createdAt: Date | null
  }

  export type QuizAnswerCountAggregateOutputType = {
    id: number
    sessionId: number
    questionId: number
    optionId: number
    createdAt: number
    _all: number
  }


  export type QuizAnswerMinAggregateInputType = {
    id?: true
    sessionId?: true
    questionId?: true
    optionId?: true
    createdAt?: true
  }

  export type QuizAnswerMaxAggregateInputType = {
    id?: true
    sessionId?: true
    questionId?: true
    optionId?: true
    createdAt?: true
  }

  export type QuizAnswerCountAggregateInputType = {
    id?: true
    sessionId?: true
    questionId?: true
    optionId?: true
    createdAt?: true
    _all?: true
  }

  export type QuizAnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizAnswer to aggregate.
     */
    where?: QuizAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAnswers to fetch.
     */
    orderBy?: QuizAnswerOrderByWithRelationInput | QuizAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuizAnswers
    **/
    _count?: true | QuizAnswerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizAnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizAnswerMaxAggregateInputType
  }

  export type GetQuizAnswerAggregateType<T extends QuizAnswerAggregateArgs> = {
        [P in keyof T & keyof AggregateQuizAnswer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuizAnswer[P]>
      : GetScalarType<T[P], AggregateQuizAnswer[P]>
  }




  export type QuizAnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizAnswerWhereInput
    orderBy?: QuizAnswerOrderByWithAggregationInput | QuizAnswerOrderByWithAggregationInput[]
    by: QuizAnswerScalarFieldEnum[] | QuizAnswerScalarFieldEnum
    having?: QuizAnswerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizAnswerCountAggregateInputType | true
    _min?: QuizAnswerMinAggregateInputType
    _max?: QuizAnswerMaxAggregateInputType
  }

  export type QuizAnswerGroupByOutputType = {
    id: string
    sessionId: string
    questionId: string
    optionId: string
    createdAt: Date
    _count: QuizAnswerCountAggregateOutputType | null
    _min: QuizAnswerMinAggregateOutputType | null
    _max: QuizAnswerMaxAggregateOutputType | null
  }

  type GetQuizAnswerGroupByPayload<T extends QuizAnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizAnswerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizAnswerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizAnswerGroupByOutputType[P]>
            : GetScalarType<T[P], QuizAnswerGroupByOutputType[P]>
        }
      >
    >


  export type QuizAnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    questionId?: boolean
    optionId?: boolean
    createdAt?: boolean
    session?: boolean | QuizSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizAnswer"]>

  export type QuizAnswerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    questionId?: boolean
    optionId?: boolean
    createdAt?: boolean
    session?: boolean | QuizSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizAnswer"]>

  export type QuizAnswerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    questionId?: boolean
    optionId?: boolean
    createdAt?: boolean
    session?: boolean | QuizSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizAnswer"]>

  export type QuizAnswerSelectScalar = {
    id?: boolean
    sessionId?: boolean
    questionId?: boolean
    optionId?: boolean
    createdAt?: boolean
  }

  export type QuizAnswerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "questionId" | "optionId" | "createdAt", ExtArgs["result"]["quizAnswer"]>
  export type QuizAnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | QuizSessionDefaultArgs<ExtArgs>
  }
  export type QuizAnswerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | QuizSessionDefaultArgs<ExtArgs>
  }
  export type QuizAnswerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | QuizSessionDefaultArgs<ExtArgs>
  }

  export type $QuizAnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuizAnswer"
    objects: {
      session: Prisma.$QuizSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      questionId: string
      optionId: string
      createdAt: Date
    }, ExtArgs["result"]["quizAnswer"]>
    composites: {}
  }

  type QuizAnswerGetPayload<S extends boolean | null | undefined | QuizAnswerDefaultArgs> = $Result.GetResult<Prisma.$QuizAnswerPayload, S>

  type QuizAnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuizAnswerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizAnswerCountAggregateInputType | true
    }

  export interface QuizAnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuizAnswer'], meta: { name: 'QuizAnswer' } }
    /**
     * Find zero or one QuizAnswer that matches the filter.
     * @param {QuizAnswerFindUniqueArgs} args - Arguments to find a QuizAnswer
     * @example
     * // Get one QuizAnswer
     * const quizAnswer = await prisma.quizAnswer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizAnswerFindUniqueArgs>(args: SelectSubset<T, QuizAnswerFindUniqueArgs<ExtArgs>>): Prisma__QuizAnswerClient<$Result.GetResult<Prisma.$QuizAnswerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuizAnswer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuizAnswerFindUniqueOrThrowArgs} args - Arguments to find a QuizAnswer
     * @example
     * // Get one QuizAnswer
     * const quizAnswer = await prisma.quizAnswer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizAnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizAnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizAnswerClient<$Result.GetResult<Prisma.$QuizAnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizAnswer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAnswerFindFirstArgs} args - Arguments to find a QuizAnswer
     * @example
     * // Get one QuizAnswer
     * const quizAnswer = await prisma.quizAnswer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizAnswerFindFirstArgs>(args?: SelectSubset<T, QuizAnswerFindFirstArgs<ExtArgs>>): Prisma__QuizAnswerClient<$Result.GetResult<Prisma.$QuizAnswerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizAnswer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAnswerFindFirstOrThrowArgs} args - Arguments to find a QuizAnswer
     * @example
     * // Get one QuizAnswer
     * const quizAnswer = await prisma.quizAnswer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizAnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizAnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizAnswerClient<$Result.GetResult<Prisma.$QuizAnswerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuizAnswers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuizAnswers
     * const quizAnswers = await prisma.quizAnswer.findMany()
     * 
     * // Get first 10 QuizAnswers
     * const quizAnswers = await prisma.quizAnswer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizAnswerWithIdOnly = await prisma.quizAnswer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizAnswerFindManyArgs>(args?: SelectSubset<T, QuizAnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuizAnswer.
     * @param {QuizAnswerCreateArgs} args - Arguments to create a QuizAnswer.
     * @example
     * // Create one QuizAnswer
     * const QuizAnswer = await prisma.quizAnswer.create({
     *   data: {
     *     // ... data to create a QuizAnswer
     *   }
     * })
     * 
     */
    create<T extends QuizAnswerCreateArgs>(args: SelectSubset<T, QuizAnswerCreateArgs<ExtArgs>>): Prisma__QuizAnswerClient<$Result.GetResult<Prisma.$QuizAnswerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuizAnswers.
     * @param {QuizAnswerCreateManyArgs} args - Arguments to create many QuizAnswers.
     * @example
     * // Create many QuizAnswers
     * const quizAnswer = await prisma.quizAnswer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizAnswerCreateManyArgs>(args?: SelectSubset<T, QuizAnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuizAnswers and returns the data saved in the database.
     * @param {QuizAnswerCreateManyAndReturnArgs} args - Arguments to create many QuizAnswers.
     * @example
     * // Create many QuizAnswers
     * const quizAnswer = await prisma.quizAnswer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuizAnswers and only return the `id`
     * const quizAnswerWithIdOnly = await prisma.quizAnswer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizAnswerCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizAnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAnswerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuizAnswer.
     * @param {QuizAnswerDeleteArgs} args - Arguments to delete one QuizAnswer.
     * @example
     * // Delete one QuizAnswer
     * const QuizAnswer = await prisma.quizAnswer.delete({
     *   where: {
     *     // ... filter to delete one QuizAnswer
     *   }
     * })
     * 
     */
    delete<T extends QuizAnswerDeleteArgs>(args: SelectSubset<T, QuizAnswerDeleteArgs<ExtArgs>>): Prisma__QuizAnswerClient<$Result.GetResult<Prisma.$QuizAnswerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuizAnswer.
     * @param {QuizAnswerUpdateArgs} args - Arguments to update one QuizAnswer.
     * @example
     * // Update one QuizAnswer
     * const quizAnswer = await prisma.quizAnswer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizAnswerUpdateArgs>(args: SelectSubset<T, QuizAnswerUpdateArgs<ExtArgs>>): Prisma__QuizAnswerClient<$Result.GetResult<Prisma.$QuizAnswerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuizAnswers.
     * @param {QuizAnswerDeleteManyArgs} args - Arguments to filter QuizAnswers to delete.
     * @example
     * // Delete a few QuizAnswers
     * const { count } = await prisma.quizAnswer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizAnswerDeleteManyArgs>(args?: SelectSubset<T, QuizAnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuizAnswers
     * const quizAnswer = await prisma.quizAnswer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizAnswerUpdateManyArgs>(args: SelectSubset<T, QuizAnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizAnswers and returns the data updated in the database.
     * @param {QuizAnswerUpdateManyAndReturnArgs} args - Arguments to update many QuizAnswers.
     * @example
     * // Update many QuizAnswers
     * const quizAnswer = await prisma.quizAnswer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuizAnswers and only return the `id`
     * const quizAnswerWithIdOnly = await prisma.quizAnswer.updateManyAndReturn({
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
    updateManyAndReturn<T extends QuizAnswerUpdateManyAndReturnArgs>(args: SelectSubset<T, QuizAnswerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAnswerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuizAnswer.
     * @param {QuizAnswerUpsertArgs} args - Arguments to update or create a QuizAnswer.
     * @example
     * // Update or create a QuizAnswer
     * const quizAnswer = await prisma.quizAnswer.upsert({
     *   create: {
     *     // ... data to create a QuizAnswer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuizAnswer we want to update
     *   }
     * })
     */
    upsert<T extends QuizAnswerUpsertArgs>(args: SelectSubset<T, QuizAnswerUpsertArgs<ExtArgs>>): Prisma__QuizAnswerClient<$Result.GetResult<Prisma.$QuizAnswerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuizAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAnswerCountArgs} args - Arguments to filter QuizAnswers to count.
     * @example
     * // Count the number of QuizAnswers
     * const count = await prisma.quizAnswer.count({
     *   where: {
     *     // ... the filter for the QuizAnswers we want to count
     *   }
     * })
    **/
    count<T extends QuizAnswerCountArgs>(
      args?: Subset<T, QuizAnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizAnswerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuizAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QuizAnswerAggregateArgs>(args: Subset<T, QuizAnswerAggregateArgs>): Prisma.PrismaPromise<GetQuizAnswerAggregateType<T>>

    /**
     * Group by QuizAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAnswerGroupByArgs} args - Group by arguments.
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
      T extends QuizAnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizAnswerGroupByArgs['orderBy'] }
        : { orderBy?: QuizAnswerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QuizAnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuizAnswer model
   */
  readonly fields: QuizAnswerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuizAnswer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizAnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends QuizSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuizSessionDefaultArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the QuizAnswer model
   */
  interface QuizAnswerFieldRefs {
    readonly id: FieldRef<"QuizAnswer", 'String'>
    readonly sessionId: FieldRef<"QuizAnswer", 'String'>
    readonly questionId: FieldRef<"QuizAnswer", 'String'>
    readonly optionId: FieldRef<"QuizAnswer", 'String'>
    readonly createdAt: FieldRef<"QuizAnswer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuizAnswer findUnique
   */
  export type QuizAnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAnswer
     */
    select?: QuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAnswer
     */
    omit?: QuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAnswerInclude<ExtArgs> | null
    /**
     * Filter, which QuizAnswer to fetch.
     */
    where: QuizAnswerWhereUniqueInput
  }

  /**
   * QuizAnswer findUniqueOrThrow
   */
  export type QuizAnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAnswer
     */
    select?: QuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAnswer
     */
    omit?: QuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAnswerInclude<ExtArgs> | null
    /**
     * Filter, which QuizAnswer to fetch.
     */
    where: QuizAnswerWhereUniqueInput
  }

  /**
   * QuizAnswer findFirst
   */
  export type QuizAnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAnswer
     */
    select?: QuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAnswer
     */
    omit?: QuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAnswerInclude<ExtArgs> | null
    /**
     * Filter, which QuizAnswer to fetch.
     */
    where?: QuizAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAnswers to fetch.
     */
    orderBy?: QuizAnswerOrderByWithRelationInput | QuizAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizAnswers.
     */
    cursor?: QuizAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizAnswers.
     */
    distinct?: QuizAnswerScalarFieldEnum | QuizAnswerScalarFieldEnum[]
  }

  /**
   * QuizAnswer findFirstOrThrow
   */
  export type QuizAnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAnswer
     */
    select?: QuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAnswer
     */
    omit?: QuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAnswerInclude<ExtArgs> | null
    /**
     * Filter, which QuizAnswer to fetch.
     */
    where?: QuizAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAnswers to fetch.
     */
    orderBy?: QuizAnswerOrderByWithRelationInput | QuizAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizAnswers.
     */
    cursor?: QuizAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizAnswers.
     */
    distinct?: QuizAnswerScalarFieldEnum | QuizAnswerScalarFieldEnum[]
  }

  /**
   * QuizAnswer findMany
   */
  export type QuizAnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAnswer
     */
    select?: QuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAnswer
     */
    omit?: QuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAnswerInclude<ExtArgs> | null
    /**
     * Filter, which QuizAnswers to fetch.
     */
    where?: QuizAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAnswers to fetch.
     */
    orderBy?: QuizAnswerOrderByWithRelationInput | QuizAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuizAnswers.
     */
    cursor?: QuizAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAnswers.
     */
    skip?: number
    distinct?: QuizAnswerScalarFieldEnum | QuizAnswerScalarFieldEnum[]
  }

  /**
   * QuizAnswer create
   */
  export type QuizAnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAnswer
     */
    select?: QuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAnswer
     */
    omit?: QuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAnswerInclude<ExtArgs> | null
    /**
     * The data needed to create a QuizAnswer.
     */
    data: XOR<QuizAnswerCreateInput, QuizAnswerUncheckedCreateInput>
  }

  /**
   * QuizAnswer createMany
   */
  export type QuizAnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuizAnswers.
     */
    data: QuizAnswerCreateManyInput | QuizAnswerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuizAnswer createManyAndReturn
   */
  export type QuizAnswerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAnswer
     */
    select?: QuizAnswerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAnswer
     */
    omit?: QuizAnswerOmit<ExtArgs> | null
    /**
     * The data used to create many QuizAnswers.
     */
    data: QuizAnswerCreateManyInput | QuizAnswerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAnswerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizAnswer update
   */
  export type QuizAnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAnswer
     */
    select?: QuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAnswer
     */
    omit?: QuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAnswerInclude<ExtArgs> | null
    /**
     * The data needed to update a QuizAnswer.
     */
    data: XOR<QuizAnswerUpdateInput, QuizAnswerUncheckedUpdateInput>
    /**
     * Choose, which QuizAnswer to update.
     */
    where: QuizAnswerWhereUniqueInput
  }

  /**
   * QuizAnswer updateMany
   */
  export type QuizAnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuizAnswers.
     */
    data: XOR<QuizAnswerUpdateManyMutationInput, QuizAnswerUncheckedUpdateManyInput>
    /**
     * Filter which QuizAnswers to update
     */
    where?: QuizAnswerWhereInput
    /**
     * Limit how many QuizAnswers to update.
     */
    limit?: number
  }

  /**
   * QuizAnswer updateManyAndReturn
   */
  export type QuizAnswerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAnswer
     */
    select?: QuizAnswerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAnswer
     */
    omit?: QuizAnswerOmit<ExtArgs> | null
    /**
     * The data used to update QuizAnswers.
     */
    data: XOR<QuizAnswerUpdateManyMutationInput, QuizAnswerUncheckedUpdateManyInput>
    /**
     * Filter which QuizAnswers to update
     */
    where?: QuizAnswerWhereInput
    /**
     * Limit how many QuizAnswers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAnswerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizAnswer upsert
   */
  export type QuizAnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAnswer
     */
    select?: QuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAnswer
     */
    omit?: QuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAnswerInclude<ExtArgs> | null
    /**
     * The filter to search for the QuizAnswer to update in case it exists.
     */
    where: QuizAnswerWhereUniqueInput
    /**
     * In case the QuizAnswer found by the `where` argument doesn't exist, create a new QuizAnswer with this data.
     */
    create: XOR<QuizAnswerCreateInput, QuizAnswerUncheckedCreateInput>
    /**
     * In case the QuizAnswer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizAnswerUpdateInput, QuizAnswerUncheckedUpdateInput>
  }

  /**
   * QuizAnswer delete
   */
  export type QuizAnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAnswer
     */
    select?: QuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAnswer
     */
    omit?: QuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAnswerInclude<ExtArgs> | null
    /**
     * Filter which QuizAnswer to delete.
     */
    where: QuizAnswerWhereUniqueInput
  }

  /**
   * QuizAnswer deleteMany
   */
  export type QuizAnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizAnswers to delete
     */
    where?: QuizAnswerWhereInput
    /**
     * Limit how many QuizAnswers to delete.
     */
    limit?: number
  }

  /**
   * QuizAnswer without action
   */
  export type QuizAnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAnswer
     */
    select?: QuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAnswer
     */
    omit?: QuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAnswerInclude<ExtArgs> | null
  }


  /**
   * Model PersonalityResult
   */

  export type AggregatePersonalityResult = {
    _count: PersonalityResultCountAggregateOutputType | null
    _avg: PersonalityResultAvgAggregateOutputType | null
    _sum: PersonalityResultSumAggregateOutputType | null
    _min: PersonalityResultMinAggregateOutputType | null
    _max: PersonalityResultMaxAggregateOutputType | null
  }

  export type PersonalityResultAvgAggregateOutputType = {
    practicalScore: number | null
    emotionalScore: number | null
    savingScore: number | null
    qualityScore: number | null
    comfortScore: number | null
    drivingScore: number | null
    brandScore: number | null
    valueScore: number | null
  }

  export type PersonalityResultSumAggregateOutputType = {
    practicalScore: number | null
    emotionalScore: number | null
    savingScore: number | null
    qualityScore: number | null
    comfortScore: number | null
    drivingScore: number | null
    brandScore: number | null
    valueScore: number | null
  }

  export type PersonalityResultMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    personalityCode: string | null
    practicalScore: number | null
    emotionalScore: number | null
    savingScore: number | null
    qualityScore: number | null
    comfortScore: number | null
    drivingScore: number | null
    brandScore: number | null
    valueScore: number | null
  }

  export type PersonalityResultMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    personalityCode: string | null
    practicalScore: number | null
    emotionalScore: number | null
    savingScore: number | null
    qualityScore: number | null
    comfortScore: number | null
    drivingScore: number | null
    brandScore: number | null
    valueScore: number | null
  }

  export type PersonalityResultCountAggregateOutputType = {
    id: number
    sessionId: number
    personalityCode: number
    practicalScore: number
    emotionalScore: number
    savingScore: number
    qualityScore: number
    comfortScore: number
    drivingScore: number
    brandScore: number
    valueScore: number
    _all: number
  }


  export type PersonalityResultAvgAggregateInputType = {
    practicalScore?: true
    emotionalScore?: true
    savingScore?: true
    qualityScore?: true
    comfortScore?: true
    drivingScore?: true
    brandScore?: true
    valueScore?: true
  }

  export type PersonalityResultSumAggregateInputType = {
    practicalScore?: true
    emotionalScore?: true
    savingScore?: true
    qualityScore?: true
    comfortScore?: true
    drivingScore?: true
    brandScore?: true
    valueScore?: true
  }

  export type PersonalityResultMinAggregateInputType = {
    id?: true
    sessionId?: true
    personalityCode?: true
    practicalScore?: true
    emotionalScore?: true
    savingScore?: true
    qualityScore?: true
    comfortScore?: true
    drivingScore?: true
    brandScore?: true
    valueScore?: true
  }

  export type PersonalityResultMaxAggregateInputType = {
    id?: true
    sessionId?: true
    personalityCode?: true
    practicalScore?: true
    emotionalScore?: true
    savingScore?: true
    qualityScore?: true
    comfortScore?: true
    drivingScore?: true
    brandScore?: true
    valueScore?: true
  }

  export type PersonalityResultCountAggregateInputType = {
    id?: true
    sessionId?: true
    personalityCode?: true
    practicalScore?: true
    emotionalScore?: true
    savingScore?: true
    qualityScore?: true
    comfortScore?: true
    drivingScore?: true
    brandScore?: true
    valueScore?: true
    _all?: true
  }

  export type PersonalityResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PersonalityResult to aggregate.
     */
    where?: PersonalityResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalityResults to fetch.
     */
    orderBy?: PersonalityResultOrderByWithRelationInput | PersonalityResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonalityResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalityResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalityResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PersonalityResults
    **/
    _count?: true | PersonalityResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PersonalityResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PersonalityResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonalityResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonalityResultMaxAggregateInputType
  }

  export type GetPersonalityResultAggregateType<T extends PersonalityResultAggregateArgs> = {
        [P in keyof T & keyof AggregatePersonalityResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePersonalityResult[P]>
      : GetScalarType<T[P], AggregatePersonalityResult[P]>
  }




  export type PersonalityResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonalityResultWhereInput
    orderBy?: PersonalityResultOrderByWithAggregationInput | PersonalityResultOrderByWithAggregationInput[]
    by: PersonalityResultScalarFieldEnum[] | PersonalityResultScalarFieldEnum
    having?: PersonalityResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonalityResultCountAggregateInputType | true
    _avg?: PersonalityResultAvgAggregateInputType
    _sum?: PersonalityResultSumAggregateInputType
    _min?: PersonalityResultMinAggregateInputType
    _max?: PersonalityResultMaxAggregateInputType
  }

  export type PersonalityResultGroupByOutputType = {
    id: string
    sessionId: string
    personalityCode: string
    practicalScore: number
    emotionalScore: number
    savingScore: number
    qualityScore: number
    comfortScore: number
    drivingScore: number
    brandScore: number
    valueScore: number
    _count: PersonalityResultCountAggregateOutputType | null
    _avg: PersonalityResultAvgAggregateOutputType | null
    _sum: PersonalityResultSumAggregateOutputType | null
    _min: PersonalityResultMinAggregateOutputType | null
    _max: PersonalityResultMaxAggregateOutputType | null
  }

  type GetPersonalityResultGroupByPayload<T extends PersonalityResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonalityResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonalityResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonalityResultGroupByOutputType[P]>
            : GetScalarType<T[P], PersonalityResultGroupByOutputType[P]>
        }
      >
    >


  export type PersonalityResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    personalityCode?: boolean
    practicalScore?: boolean
    emotionalScore?: boolean
    savingScore?: boolean
    qualityScore?: boolean
    comfortScore?: boolean
    drivingScore?: boolean
    brandScore?: boolean
    valueScore?: boolean
    session?: boolean | QuizSessionDefaultArgs<ExtArgs>
    recommendations?: boolean | PersonalityResult$recommendationsArgs<ExtArgs>
    _count?: boolean | PersonalityResultCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personalityResult"]>

  export type PersonalityResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    personalityCode?: boolean
    practicalScore?: boolean
    emotionalScore?: boolean
    savingScore?: boolean
    qualityScore?: boolean
    comfortScore?: boolean
    drivingScore?: boolean
    brandScore?: boolean
    valueScore?: boolean
    session?: boolean | QuizSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personalityResult"]>

  export type PersonalityResultSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    personalityCode?: boolean
    practicalScore?: boolean
    emotionalScore?: boolean
    savingScore?: boolean
    qualityScore?: boolean
    comfortScore?: boolean
    drivingScore?: boolean
    brandScore?: boolean
    valueScore?: boolean
    session?: boolean | QuizSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personalityResult"]>

  export type PersonalityResultSelectScalar = {
    id?: boolean
    sessionId?: boolean
    personalityCode?: boolean
    practicalScore?: boolean
    emotionalScore?: boolean
    savingScore?: boolean
    qualityScore?: boolean
    comfortScore?: boolean
    drivingScore?: boolean
    brandScore?: boolean
    valueScore?: boolean
  }

  export type PersonalityResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "personalityCode" | "practicalScore" | "emotionalScore" | "savingScore" | "qualityScore" | "comfortScore" | "drivingScore" | "brandScore" | "valueScore", ExtArgs["result"]["personalityResult"]>
  export type PersonalityResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | QuizSessionDefaultArgs<ExtArgs>
    recommendations?: boolean | PersonalityResult$recommendationsArgs<ExtArgs>
    _count?: boolean | PersonalityResultCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PersonalityResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | QuizSessionDefaultArgs<ExtArgs>
  }
  export type PersonalityResultIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | QuizSessionDefaultArgs<ExtArgs>
  }

  export type $PersonalityResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PersonalityResult"
    objects: {
      session: Prisma.$QuizSessionPayload<ExtArgs>
      recommendations: Prisma.$VehicleRecommendationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      personalityCode: string
      practicalScore: number
      emotionalScore: number
      savingScore: number
      qualityScore: number
      comfortScore: number
      drivingScore: number
      brandScore: number
      valueScore: number
    }, ExtArgs["result"]["personalityResult"]>
    composites: {}
  }

  type PersonalityResultGetPayload<S extends boolean | null | undefined | PersonalityResultDefaultArgs> = $Result.GetResult<Prisma.$PersonalityResultPayload, S>

  type PersonalityResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonalityResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonalityResultCountAggregateInputType | true
    }

  export interface PersonalityResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PersonalityResult'], meta: { name: 'PersonalityResult' } }
    /**
     * Find zero or one PersonalityResult that matches the filter.
     * @param {PersonalityResultFindUniqueArgs} args - Arguments to find a PersonalityResult
     * @example
     * // Get one PersonalityResult
     * const personalityResult = await prisma.personalityResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonalityResultFindUniqueArgs>(args: SelectSubset<T, PersonalityResultFindUniqueArgs<ExtArgs>>): Prisma__PersonalityResultClient<$Result.GetResult<Prisma.$PersonalityResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PersonalityResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonalityResultFindUniqueOrThrowArgs} args - Arguments to find a PersonalityResult
     * @example
     * // Get one PersonalityResult
     * const personalityResult = await prisma.personalityResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonalityResultFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonalityResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonalityResultClient<$Result.GetResult<Prisma.$PersonalityResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PersonalityResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalityResultFindFirstArgs} args - Arguments to find a PersonalityResult
     * @example
     * // Get one PersonalityResult
     * const personalityResult = await prisma.personalityResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonalityResultFindFirstArgs>(args?: SelectSubset<T, PersonalityResultFindFirstArgs<ExtArgs>>): Prisma__PersonalityResultClient<$Result.GetResult<Prisma.$PersonalityResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PersonalityResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalityResultFindFirstOrThrowArgs} args - Arguments to find a PersonalityResult
     * @example
     * // Get one PersonalityResult
     * const personalityResult = await prisma.personalityResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonalityResultFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonalityResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonalityResultClient<$Result.GetResult<Prisma.$PersonalityResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PersonalityResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalityResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PersonalityResults
     * const personalityResults = await prisma.personalityResult.findMany()
     * 
     * // Get first 10 PersonalityResults
     * const personalityResults = await prisma.personalityResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personalityResultWithIdOnly = await prisma.personalityResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PersonalityResultFindManyArgs>(args?: SelectSubset<T, PersonalityResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalityResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PersonalityResult.
     * @param {PersonalityResultCreateArgs} args - Arguments to create a PersonalityResult.
     * @example
     * // Create one PersonalityResult
     * const PersonalityResult = await prisma.personalityResult.create({
     *   data: {
     *     // ... data to create a PersonalityResult
     *   }
     * })
     * 
     */
    create<T extends PersonalityResultCreateArgs>(args: SelectSubset<T, PersonalityResultCreateArgs<ExtArgs>>): Prisma__PersonalityResultClient<$Result.GetResult<Prisma.$PersonalityResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PersonalityResults.
     * @param {PersonalityResultCreateManyArgs} args - Arguments to create many PersonalityResults.
     * @example
     * // Create many PersonalityResults
     * const personalityResult = await prisma.personalityResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonalityResultCreateManyArgs>(args?: SelectSubset<T, PersonalityResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PersonalityResults and returns the data saved in the database.
     * @param {PersonalityResultCreateManyAndReturnArgs} args - Arguments to create many PersonalityResults.
     * @example
     * // Create many PersonalityResults
     * const personalityResult = await prisma.personalityResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PersonalityResults and only return the `id`
     * const personalityResultWithIdOnly = await prisma.personalityResult.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonalityResultCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonalityResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalityResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PersonalityResult.
     * @param {PersonalityResultDeleteArgs} args - Arguments to delete one PersonalityResult.
     * @example
     * // Delete one PersonalityResult
     * const PersonalityResult = await prisma.personalityResult.delete({
     *   where: {
     *     // ... filter to delete one PersonalityResult
     *   }
     * })
     * 
     */
    delete<T extends PersonalityResultDeleteArgs>(args: SelectSubset<T, PersonalityResultDeleteArgs<ExtArgs>>): Prisma__PersonalityResultClient<$Result.GetResult<Prisma.$PersonalityResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PersonalityResult.
     * @param {PersonalityResultUpdateArgs} args - Arguments to update one PersonalityResult.
     * @example
     * // Update one PersonalityResult
     * const personalityResult = await prisma.personalityResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonalityResultUpdateArgs>(args: SelectSubset<T, PersonalityResultUpdateArgs<ExtArgs>>): Prisma__PersonalityResultClient<$Result.GetResult<Prisma.$PersonalityResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PersonalityResults.
     * @param {PersonalityResultDeleteManyArgs} args - Arguments to filter PersonalityResults to delete.
     * @example
     * // Delete a few PersonalityResults
     * const { count } = await prisma.personalityResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonalityResultDeleteManyArgs>(args?: SelectSubset<T, PersonalityResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PersonalityResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalityResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PersonalityResults
     * const personalityResult = await prisma.personalityResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonalityResultUpdateManyArgs>(args: SelectSubset<T, PersonalityResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PersonalityResults and returns the data updated in the database.
     * @param {PersonalityResultUpdateManyAndReturnArgs} args - Arguments to update many PersonalityResults.
     * @example
     * // Update many PersonalityResults
     * const personalityResult = await prisma.personalityResult.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PersonalityResults and only return the `id`
     * const personalityResultWithIdOnly = await prisma.personalityResult.updateManyAndReturn({
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
    updateManyAndReturn<T extends PersonalityResultUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonalityResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalityResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PersonalityResult.
     * @param {PersonalityResultUpsertArgs} args - Arguments to update or create a PersonalityResult.
     * @example
     * // Update or create a PersonalityResult
     * const personalityResult = await prisma.personalityResult.upsert({
     *   create: {
     *     // ... data to create a PersonalityResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PersonalityResult we want to update
     *   }
     * })
     */
    upsert<T extends PersonalityResultUpsertArgs>(args: SelectSubset<T, PersonalityResultUpsertArgs<ExtArgs>>): Prisma__PersonalityResultClient<$Result.GetResult<Prisma.$PersonalityResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PersonalityResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalityResultCountArgs} args - Arguments to filter PersonalityResults to count.
     * @example
     * // Count the number of PersonalityResults
     * const count = await prisma.personalityResult.count({
     *   where: {
     *     // ... the filter for the PersonalityResults we want to count
     *   }
     * })
    **/
    count<T extends PersonalityResultCountArgs>(
      args?: Subset<T, PersonalityResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonalityResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PersonalityResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalityResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PersonalityResultAggregateArgs>(args: Subset<T, PersonalityResultAggregateArgs>): Prisma.PrismaPromise<GetPersonalityResultAggregateType<T>>

    /**
     * Group by PersonalityResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalityResultGroupByArgs} args - Group by arguments.
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
      T extends PersonalityResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonalityResultGroupByArgs['orderBy'] }
        : { orderBy?: PersonalityResultGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PersonalityResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonalityResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PersonalityResult model
   */
  readonly fields: PersonalityResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PersonalityResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonalityResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends QuizSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuizSessionDefaultArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recommendations<T extends PersonalityResult$recommendationsArgs<ExtArgs> = {}>(args?: Subset<T, PersonalityResult$recommendationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleRecommendationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the PersonalityResult model
   */
  interface PersonalityResultFieldRefs {
    readonly id: FieldRef<"PersonalityResult", 'String'>
    readonly sessionId: FieldRef<"PersonalityResult", 'String'>
    readonly personalityCode: FieldRef<"PersonalityResult", 'String'>
    readonly practicalScore: FieldRef<"PersonalityResult", 'Int'>
    readonly emotionalScore: FieldRef<"PersonalityResult", 'Int'>
    readonly savingScore: FieldRef<"PersonalityResult", 'Int'>
    readonly qualityScore: FieldRef<"PersonalityResult", 'Int'>
    readonly comfortScore: FieldRef<"PersonalityResult", 'Int'>
    readonly drivingScore: FieldRef<"PersonalityResult", 'Int'>
    readonly brandScore: FieldRef<"PersonalityResult", 'Int'>
    readonly valueScore: FieldRef<"PersonalityResult", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PersonalityResult findUnique
   */
  export type PersonalityResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalityResult
     */
    select?: PersonalityResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalityResult
     */
    omit?: PersonalityResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityResultInclude<ExtArgs> | null
    /**
     * Filter, which PersonalityResult to fetch.
     */
    where: PersonalityResultWhereUniqueInput
  }

  /**
   * PersonalityResult findUniqueOrThrow
   */
  export type PersonalityResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalityResult
     */
    select?: PersonalityResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalityResult
     */
    omit?: PersonalityResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityResultInclude<ExtArgs> | null
    /**
     * Filter, which PersonalityResult to fetch.
     */
    where: PersonalityResultWhereUniqueInput
  }

  /**
   * PersonalityResult findFirst
   */
  export type PersonalityResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalityResult
     */
    select?: PersonalityResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalityResult
     */
    omit?: PersonalityResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityResultInclude<ExtArgs> | null
    /**
     * Filter, which PersonalityResult to fetch.
     */
    where?: PersonalityResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalityResults to fetch.
     */
    orderBy?: PersonalityResultOrderByWithRelationInput | PersonalityResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PersonalityResults.
     */
    cursor?: PersonalityResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalityResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalityResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonalityResults.
     */
    distinct?: PersonalityResultScalarFieldEnum | PersonalityResultScalarFieldEnum[]
  }

  /**
   * PersonalityResult findFirstOrThrow
   */
  export type PersonalityResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalityResult
     */
    select?: PersonalityResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalityResult
     */
    omit?: PersonalityResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityResultInclude<ExtArgs> | null
    /**
     * Filter, which PersonalityResult to fetch.
     */
    where?: PersonalityResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalityResults to fetch.
     */
    orderBy?: PersonalityResultOrderByWithRelationInput | PersonalityResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PersonalityResults.
     */
    cursor?: PersonalityResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalityResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalityResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonalityResults.
     */
    distinct?: PersonalityResultScalarFieldEnum | PersonalityResultScalarFieldEnum[]
  }

  /**
   * PersonalityResult findMany
   */
  export type PersonalityResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalityResult
     */
    select?: PersonalityResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalityResult
     */
    omit?: PersonalityResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityResultInclude<ExtArgs> | null
    /**
     * Filter, which PersonalityResults to fetch.
     */
    where?: PersonalityResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalityResults to fetch.
     */
    orderBy?: PersonalityResultOrderByWithRelationInput | PersonalityResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PersonalityResults.
     */
    cursor?: PersonalityResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalityResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalityResults.
     */
    skip?: number
    distinct?: PersonalityResultScalarFieldEnum | PersonalityResultScalarFieldEnum[]
  }

  /**
   * PersonalityResult create
   */
  export type PersonalityResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalityResult
     */
    select?: PersonalityResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalityResult
     */
    omit?: PersonalityResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityResultInclude<ExtArgs> | null
    /**
     * The data needed to create a PersonalityResult.
     */
    data: XOR<PersonalityResultCreateInput, PersonalityResultUncheckedCreateInput>
  }

  /**
   * PersonalityResult createMany
   */
  export type PersonalityResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PersonalityResults.
     */
    data: PersonalityResultCreateManyInput | PersonalityResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PersonalityResult createManyAndReturn
   */
  export type PersonalityResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalityResult
     */
    select?: PersonalityResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalityResult
     */
    omit?: PersonalityResultOmit<ExtArgs> | null
    /**
     * The data used to create many PersonalityResults.
     */
    data: PersonalityResultCreateManyInput | PersonalityResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PersonalityResult update
   */
  export type PersonalityResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalityResult
     */
    select?: PersonalityResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalityResult
     */
    omit?: PersonalityResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityResultInclude<ExtArgs> | null
    /**
     * The data needed to update a PersonalityResult.
     */
    data: XOR<PersonalityResultUpdateInput, PersonalityResultUncheckedUpdateInput>
    /**
     * Choose, which PersonalityResult to update.
     */
    where: PersonalityResultWhereUniqueInput
  }

  /**
   * PersonalityResult updateMany
   */
  export type PersonalityResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PersonalityResults.
     */
    data: XOR<PersonalityResultUpdateManyMutationInput, PersonalityResultUncheckedUpdateManyInput>
    /**
     * Filter which PersonalityResults to update
     */
    where?: PersonalityResultWhereInput
    /**
     * Limit how many PersonalityResults to update.
     */
    limit?: number
  }

  /**
   * PersonalityResult updateManyAndReturn
   */
  export type PersonalityResultUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalityResult
     */
    select?: PersonalityResultSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalityResult
     */
    omit?: PersonalityResultOmit<ExtArgs> | null
    /**
     * The data used to update PersonalityResults.
     */
    data: XOR<PersonalityResultUpdateManyMutationInput, PersonalityResultUncheckedUpdateManyInput>
    /**
     * Filter which PersonalityResults to update
     */
    where?: PersonalityResultWhereInput
    /**
     * Limit how many PersonalityResults to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityResultIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PersonalityResult upsert
   */
  export type PersonalityResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalityResult
     */
    select?: PersonalityResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalityResult
     */
    omit?: PersonalityResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityResultInclude<ExtArgs> | null
    /**
     * The filter to search for the PersonalityResult to update in case it exists.
     */
    where: PersonalityResultWhereUniqueInput
    /**
     * In case the PersonalityResult found by the `where` argument doesn't exist, create a new PersonalityResult with this data.
     */
    create: XOR<PersonalityResultCreateInput, PersonalityResultUncheckedCreateInput>
    /**
     * In case the PersonalityResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonalityResultUpdateInput, PersonalityResultUncheckedUpdateInput>
  }

  /**
   * PersonalityResult delete
   */
  export type PersonalityResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalityResult
     */
    select?: PersonalityResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalityResult
     */
    omit?: PersonalityResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityResultInclude<ExtArgs> | null
    /**
     * Filter which PersonalityResult to delete.
     */
    where: PersonalityResultWhereUniqueInput
  }

  /**
   * PersonalityResult deleteMany
   */
  export type PersonalityResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PersonalityResults to delete
     */
    where?: PersonalityResultWhereInput
    /**
     * Limit how many PersonalityResults to delete.
     */
    limit?: number
  }

  /**
   * PersonalityResult.recommendations
   */
  export type PersonalityResult$recommendationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleRecommendation
     */
    select?: VehicleRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleRecommendation
     */
    omit?: VehicleRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleRecommendationInclude<ExtArgs> | null
    where?: VehicleRecommendationWhereInput
    orderBy?: VehicleRecommendationOrderByWithRelationInput | VehicleRecommendationOrderByWithRelationInput[]
    cursor?: VehicleRecommendationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehicleRecommendationScalarFieldEnum | VehicleRecommendationScalarFieldEnum[]
  }

  /**
   * PersonalityResult without action
   */
  export type PersonalityResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalityResult
     */
    select?: PersonalityResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalityResult
     */
    omit?: PersonalityResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityResultInclude<ExtArgs> | null
  }


  /**
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleAvgAggregateOutputType = {
    priceMin: number | null
    priceMax: number | null
  }

  export type VehicleSumAggregateOutputType = {
    priceMin: number | null
    priceMax: number | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    slug: string | null
    brand: string | null
    series: string | null
    modelName: string | null
    priceMin: number | null
    priceMax: number | null
    energyType: string | null
    bodyType: string | null
    heroImage: string | null
    summary: string | null
    recommendation: string | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    brand: string | null
    series: string | null
    modelName: string | null
    priceMin: number | null
    priceMax: number | null
    energyType: string | null
    bodyType: string | null
    heroImage: string | null
    summary: string | null
    recommendation: string | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    slug: number
    brand: number
    series: number
    modelName: number
    priceMin: number
    priceMax: number
    energyType: number
    bodyType: number
    heroImage: number
    summary: number
    recommendation: number
    _all: number
  }


  export type VehicleAvgAggregateInputType = {
    priceMin?: true
    priceMax?: true
  }

  export type VehicleSumAggregateInputType = {
    priceMin?: true
    priceMax?: true
  }

  export type VehicleMinAggregateInputType = {
    id?: true
    slug?: true
    brand?: true
    series?: true
    modelName?: true
    priceMin?: true
    priceMax?: true
    energyType?: true
    bodyType?: true
    heroImage?: true
    summary?: true
    recommendation?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    slug?: true
    brand?: true
    series?: true
    modelName?: true
    priceMin?: true
    priceMax?: true
    energyType?: true
    bodyType?: true
    heroImage?: true
    summary?: true
    recommendation?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    slug?: true
    brand?: true
    series?: true
    modelName?: true
    priceMin?: true
    priceMax?: true
    energyType?: true
    bodyType?: true
    heroImage?: true
    summary?: true
    recommendation?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _avg?: VehicleAvgAggregateInputType
    _sum?: VehicleSumAggregateInputType
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    slug: string
    brand: string
    series: string
    modelName: string
    priceMin: number
    priceMax: number
    energyType: string
    bodyType: string
    heroImage: string
    summary: string
    recommendation: string
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    brand?: boolean
    series?: boolean
    modelName?: boolean
    priceMin?: boolean
    priceMax?: boolean
    energyType?: boolean
    bodyType?: boolean
    heroImage?: boolean
    summary?: boolean
    recommendation?: boolean
    dimensionWeights?: boolean | Vehicle$dimensionWeightsArgs<ExtArgs>
    recommendations?: boolean | Vehicle$recommendationsArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    brand?: boolean
    series?: boolean
    modelName?: boolean
    priceMin?: boolean
    priceMax?: boolean
    energyType?: boolean
    bodyType?: boolean
    heroImage?: boolean
    summary?: boolean
    recommendation?: boolean
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    brand?: boolean
    series?: boolean
    modelName?: boolean
    priceMin?: boolean
    priceMax?: boolean
    energyType?: boolean
    bodyType?: boolean
    heroImage?: boolean
    summary?: boolean
    recommendation?: boolean
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    slug?: boolean
    brand?: boolean
    series?: boolean
    modelName?: boolean
    priceMin?: boolean
    priceMax?: boolean
    energyType?: boolean
    bodyType?: boolean
    heroImage?: boolean
    summary?: boolean
    recommendation?: boolean
  }

  export type VehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "brand" | "series" | "modelName" | "priceMin" | "priceMax" | "energyType" | "bodyType" | "heroImage" | "summary" | "recommendation", ExtArgs["result"]["vehicle"]>
  export type VehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dimensionWeights?: boolean | Vehicle$dimensionWeightsArgs<ExtArgs>
    recommendations?: boolean | Vehicle$recommendationsArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VehicleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {
      dimensionWeights: Prisma.$VehicleDimensionWeightPayload<ExtArgs> | null
      recommendations: Prisma.$VehicleRecommendationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      brand: string
      series: string
      modelName: string
      priceMin: number
      priceMax: number
      energyType: string
      bodyType: string
      heroImage: string
      summary: string
      recommendation: string
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles and returns the data updated in the database.
     * @param {VehicleUpdateManyAndReturnArgs} args - Arguments to update many Vehicles.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.updateManyAndReturn({
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
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
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
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dimensionWeights<T extends Vehicle$dimensionWeightsArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$dimensionWeightsArgs<ExtArgs>>): Prisma__VehicleDimensionWeightClient<$Result.GetResult<Prisma.$VehicleDimensionWeightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    recommendations<T extends Vehicle$recommendationsArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$recommendationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleRecommendationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Vehicle model
   */
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly slug: FieldRef<"Vehicle", 'String'>
    readonly brand: FieldRef<"Vehicle", 'String'>
    readonly series: FieldRef<"Vehicle", 'String'>
    readonly modelName: FieldRef<"Vehicle", 'String'>
    readonly priceMin: FieldRef<"Vehicle", 'Int'>
    readonly priceMax: FieldRef<"Vehicle", 'Int'>
    readonly energyType: FieldRef<"Vehicle", 'String'>
    readonly bodyType: FieldRef<"Vehicle", 'String'>
    readonly heroImage: FieldRef<"Vehicle", 'String'>
    readonly summary: FieldRef<"Vehicle", 'String'>
    readonly recommendation: FieldRef<"Vehicle", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle updateManyAndReturn
   */
  export type VehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to delete.
     */
    limit?: number
  }

  /**
   * Vehicle.dimensionWeights
   */
  export type Vehicle$dimensionWeightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleDimensionWeight
     */
    select?: VehicleDimensionWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleDimensionWeight
     */
    omit?: VehicleDimensionWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleDimensionWeightInclude<ExtArgs> | null
    where?: VehicleDimensionWeightWhereInput
  }

  /**
   * Vehicle.recommendations
   */
  export type Vehicle$recommendationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleRecommendation
     */
    select?: VehicleRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleRecommendation
     */
    omit?: VehicleRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleRecommendationInclude<ExtArgs> | null
    where?: VehicleRecommendationWhereInput
    orderBy?: VehicleRecommendationOrderByWithRelationInput | VehicleRecommendationOrderByWithRelationInput[]
    cursor?: VehicleRecommendationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehicleRecommendationScalarFieldEnum | VehicleRecommendationScalarFieldEnum[]
  }

  /**
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
  }


  /**
   * Model VehicleDimensionWeight
   */

  export type AggregateVehicleDimensionWeight = {
    _count: VehicleDimensionWeightCountAggregateOutputType | null
    _avg: VehicleDimensionWeightAvgAggregateOutputType | null
    _sum: VehicleDimensionWeightSumAggregateOutputType | null
    _min: VehicleDimensionWeightMinAggregateOutputType | null
    _max: VehicleDimensionWeightMaxAggregateOutputType | null
  }

  export type VehicleDimensionWeightAvgAggregateOutputType = {
    practical: number | null
    emotional: number | null
    saving: number | null
    quality: number | null
    comfort: number | null
    driving: number | null
    brand: number | null
    value: number | null
  }

  export type VehicleDimensionWeightSumAggregateOutputType = {
    practical: number | null
    emotional: number | null
    saving: number | null
    quality: number | null
    comfort: number | null
    driving: number | null
    brand: number | null
    value: number | null
  }

  export type VehicleDimensionWeightMinAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    practical: number | null
    emotional: number | null
    saving: number | null
    quality: number | null
    comfort: number | null
    driving: number | null
    brand: number | null
    value: number | null
  }

  export type VehicleDimensionWeightMaxAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    practical: number | null
    emotional: number | null
    saving: number | null
    quality: number | null
    comfort: number | null
    driving: number | null
    brand: number | null
    value: number | null
  }

  export type VehicleDimensionWeightCountAggregateOutputType = {
    id: number
    vehicleId: number
    practical: number
    emotional: number
    saving: number
    quality: number
    comfort: number
    driving: number
    brand: number
    value: number
    _all: number
  }


  export type VehicleDimensionWeightAvgAggregateInputType = {
    practical?: true
    emotional?: true
    saving?: true
    quality?: true
    comfort?: true
    driving?: true
    brand?: true
    value?: true
  }

  export type VehicleDimensionWeightSumAggregateInputType = {
    practical?: true
    emotional?: true
    saving?: true
    quality?: true
    comfort?: true
    driving?: true
    brand?: true
    value?: true
  }

  export type VehicleDimensionWeightMinAggregateInputType = {
    id?: true
    vehicleId?: true
    practical?: true
    emotional?: true
    saving?: true
    quality?: true
    comfort?: true
    driving?: true
    brand?: true
    value?: true
  }

  export type VehicleDimensionWeightMaxAggregateInputType = {
    id?: true
    vehicleId?: true
    practical?: true
    emotional?: true
    saving?: true
    quality?: true
    comfort?: true
    driving?: true
    brand?: true
    value?: true
  }

  export type VehicleDimensionWeightCountAggregateInputType = {
    id?: true
    vehicleId?: true
    practical?: true
    emotional?: true
    saving?: true
    quality?: true
    comfort?: true
    driving?: true
    brand?: true
    value?: true
    _all?: true
  }

  export type VehicleDimensionWeightAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleDimensionWeight to aggregate.
     */
    where?: VehicleDimensionWeightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleDimensionWeights to fetch.
     */
    orderBy?: VehicleDimensionWeightOrderByWithRelationInput | VehicleDimensionWeightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleDimensionWeightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleDimensionWeights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleDimensionWeights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VehicleDimensionWeights
    **/
    _count?: true | VehicleDimensionWeightCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleDimensionWeightAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleDimensionWeightSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleDimensionWeightMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleDimensionWeightMaxAggregateInputType
  }

  export type GetVehicleDimensionWeightAggregateType<T extends VehicleDimensionWeightAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicleDimensionWeight]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicleDimensionWeight[P]>
      : GetScalarType<T[P], AggregateVehicleDimensionWeight[P]>
  }




  export type VehicleDimensionWeightGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleDimensionWeightWhereInput
    orderBy?: VehicleDimensionWeightOrderByWithAggregationInput | VehicleDimensionWeightOrderByWithAggregationInput[]
    by: VehicleDimensionWeightScalarFieldEnum[] | VehicleDimensionWeightScalarFieldEnum
    having?: VehicleDimensionWeightScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleDimensionWeightCountAggregateInputType | true
    _avg?: VehicleDimensionWeightAvgAggregateInputType
    _sum?: VehicleDimensionWeightSumAggregateInputType
    _min?: VehicleDimensionWeightMinAggregateInputType
    _max?: VehicleDimensionWeightMaxAggregateInputType
  }

  export type VehicleDimensionWeightGroupByOutputType = {
    id: string
    vehicleId: string
    practical: number
    emotional: number
    saving: number
    quality: number
    comfort: number
    driving: number
    brand: number
    value: number
    _count: VehicleDimensionWeightCountAggregateOutputType | null
    _avg: VehicleDimensionWeightAvgAggregateOutputType | null
    _sum: VehicleDimensionWeightSumAggregateOutputType | null
    _min: VehicleDimensionWeightMinAggregateOutputType | null
    _max: VehicleDimensionWeightMaxAggregateOutputType | null
  }

  type GetVehicleDimensionWeightGroupByPayload<T extends VehicleDimensionWeightGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleDimensionWeightGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleDimensionWeightGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleDimensionWeightGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleDimensionWeightGroupByOutputType[P]>
        }
      >
    >


  export type VehicleDimensionWeightSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    practical?: boolean
    emotional?: boolean
    saving?: boolean
    quality?: boolean
    comfort?: boolean
    driving?: boolean
    brand?: boolean
    value?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleDimensionWeight"]>

  export type VehicleDimensionWeightSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    practical?: boolean
    emotional?: boolean
    saving?: boolean
    quality?: boolean
    comfort?: boolean
    driving?: boolean
    brand?: boolean
    value?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleDimensionWeight"]>

  export type VehicleDimensionWeightSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    practical?: boolean
    emotional?: boolean
    saving?: boolean
    quality?: boolean
    comfort?: boolean
    driving?: boolean
    brand?: boolean
    value?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleDimensionWeight"]>

  export type VehicleDimensionWeightSelectScalar = {
    id?: boolean
    vehicleId?: boolean
    practical?: boolean
    emotional?: boolean
    saving?: boolean
    quality?: boolean
    comfort?: boolean
    driving?: boolean
    brand?: boolean
    value?: boolean
  }

  export type VehicleDimensionWeightOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vehicleId" | "practical" | "emotional" | "saving" | "quality" | "comfort" | "driving" | "brand" | "value", ExtArgs["result"]["vehicleDimensionWeight"]>
  export type VehicleDimensionWeightInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type VehicleDimensionWeightIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type VehicleDimensionWeightIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }

  export type $VehicleDimensionWeightPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VehicleDimensionWeight"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vehicleId: string
      practical: number
      emotional: number
      saving: number
      quality: number
      comfort: number
      driving: number
      brand: number
      value: number
    }, ExtArgs["result"]["vehicleDimensionWeight"]>
    composites: {}
  }

  type VehicleDimensionWeightGetPayload<S extends boolean | null | undefined | VehicleDimensionWeightDefaultArgs> = $Result.GetResult<Prisma.$VehicleDimensionWeightPayload, S>

  type VehicleDimensionWeightCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleDimensionWeightFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleDimensionWeightCountAggregateInputType | true
    }

  export interface VehicleDimensionWeightDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VehicleDimensionWeight'], meta: { name: 'VehicleDimensionWeight' } }
    /**
     * Find zero or one VehicleDimensionWeight that matches the filter.
     * @param {VehicleDimensionWeightFindUniqueArgs} args - Arguments to find a VehicleDimensionWeight
     * @example
     * // Get one VehicleDimensionWeight
     * const vehicleDimensionWeight = await prisma.vehicleDimensionWeight.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleDimensionWeightFindUniqueArgs>(args: SelectSubset<T, VehicleDimensionWeightFindUniqueArgs<ExtArgs>>): Prisma__VehicleDimensionWeightClient<$Result.GetResult<Prisma.$VehicleDimensionWeightPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VehicleDimensionWeight that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleDimensionWeightFindUniqueOrThrowArgs} args - Arguments to find a VehicleDimensionWeight
     * @example
     * // Get one VehicleDimensionWeight
     * const vehicleDimensionWeight = await prisma.vehicleDimensionWeight.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleDimensionWeightFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleDimensionWeightFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleDimensionWeightClient<$Result.GetResult<Prisma.$VehicleDimensionWeightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleDimensionWeight that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleDimensionWeightFindFirstArgs} args - Arguments to find a VehicleDimensionWeight
     * @example
     * // Get one VehicleDimensionWeight
     * const vehicleDimensionWeight = await prisma.vehicleDimensionWeight.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleDimensionWeightFindFirstArgs>(args?: SelectSubset<T, VehicleDimensionWeightFindFirstArgs<ExtArgs>>): Prisma__VehicleDimensionWeightClient<$Result.GetResult<Prisma.$VehicleDimensionWeightPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleDimensionWeight that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleDimensionWeightFindFirstOrThrowArgs} args - Arguments to find a VehicleDimensionWeight
     * @example
     * // Get one VehicleDimensionWeight
     * const vehicleDimensionWeight = await prisma.vehicleDimensionWeight.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleDimensionWeightFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleDimensionWeightFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleDimensionWeightClient<$Result.GetResult<Prisma.$VehicleDimensionWeightPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VehicleDimensionWeights that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleDimensionWeightFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VehicleDimensionWeights
     * const vehicleDimensionWeights = await prisma.vehicleDimensionWeight.findMany()
     * 
     * // Get first 10 VehicleDimensionWeights
     * const vehicleDimensionWeights = await prisma.vehicleDimensionWeight.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleDimensionWeightWithIdOnly = await prisma.vehicleDimensionWeight.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleDimensionWeightFindManyArgs>(args?: SelectSubset<T, VehicleDimensionWeightFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleDimensionWeightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VehicleDimensionWeight.
     * @param {VehicleDimensionWeightCreateArgs} args - Arguments to create a VehicleDimensionWeight.
     * @example
     * // Create one VehicleDimensionWeight
     * const VehicleDimensionWeight = await prisma.vehicleDimensionWeight.create({
     *   data: {
     *     // ... data to create a VehicleDimensionWeight
     *   }
     * })
     * 
     */
    create<T extends VehicleDimensionWeightCreateArgs>(args: SelectSubset<T, VehicleDimensionWeightCreateArgs<ExtArgs>>): Prisma__VehicleDimensionWeightClient<$Result.GetResult<Prisma.$VehicleDimensionWeightPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VehicleDimensionWeights.
     * @param {VehicleDimensionWeightCreateManyArgs} args - Arguments to create many VehicleDimensionWeights.
     * @example
     * // Create many VehicleDimensionWeights
     * const vehicleDimensionWeight = await prisma.vehicleDimensionWeight.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleDimensionWeightCreateManyArgs>(args?: SelectSubset<T, VehicleDimensionWeightCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VehicleDimensionWeights and returns the data saved in the database.
     * @param {VehicleDimensionWeightCreateManyAndReturnArgs} args - Arguments to create many VehicleDimensionWeights.
     * @example
     * // Create many VehicleDimensionWeights
     * const vehicleDimensionWeight = await prisma.vehicleDimensionWeight.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VehicleDimensionWeights and only return the `id`
     * const vehicleDimensionWeightWithIdOnly = await prisma.vehicleDimensionWeight.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleDimensionWeightCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleDimensionWeightCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleDimensionWeightPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VehicleDimensionWeight.
     * @param {VehicleDimensionWeightDeleteArgs} args - Arguments to delete one VehicleDimensionWeight.
     * @example
     * // Delete one VehicleDimensionWeight
     * const VehicleDimensionWeight = await prisma.vehicleDimensionWeight.delete({
     *   where: {
     *     // ... filter to delete one VehicleDimensionWeight
     *   }
     * })
     * 
     */
    delete<T extends VehicleDimensionWeightDeleteArgs>(args: SelectSubset<T, VehicleDimensionWeightDeleteArgs<ExtArgs>>): Prisma__VehicleDimensionWeightClient<$Result.GetResult<Prisma.$VehicleDimensionWeightPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VehicleDimensionWeight.
     * @param {VehicleDimensionWeightUpdateArgs} args - Arguments to update one VehicleDimensionWeight.
     * @example
     * // Update one VehicleDimensionWeight
     * const vehicleDimensionWeight = await prisma.vehicleDimensionWeight.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleDimensionWeightUpdateArgs>(args: SelectSubset<T, VehicleDimensionWeightUpdateArgs<ExtArgs>>): Prisma__VehicleDimensionWeightClient<$Result.GetResult<Prisma.$VehicleDimensionWeightPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VehicleDimensionWeights.
     * @param {VehicleDimensionWeightDeleteManyArgs} args - Arguments to filter VehicleDimensionWeights to delete.
     * @example
     * // Delete a few VehicleDimensionWeights
     * const { count } = await prisma.vehicleDimensionWeight.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDimensionWeightDeleteManyArgs>(args?: SelectSubset<T, VehicleDimensionWeightDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleDimensionWeights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleDimensionWeightUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VehicleDimensionWeights
     * const vehicleDimensionWeight = await prisma.vehicleDimensionWeight.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleDimensionWeightUpdateManyArgs>(args: SelectSubset<T, VehicleDimensionWeightUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleDimensionWeights and returns the data updated in the database.
     * @param {VehicleDimensionWeightUpdateManyAndReturnArgs} args - Arguments to update many VehicleDimensionWeights.
     * @example
     * // Update many VehicleDimensionWeights
     * const vehicleDimensionWeight = await prisma.vehicleDimensionWeight.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VehicleDimensionWeights and only return the `id`
     * const vehicleDimensionWeightWithIdOnly = await prisma.vehicleDimensionWeight.updateManyAndReturn({
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
    updateManyAndReturn<T extends VehicleDimensionWeightUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleDimensionWeightUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleDimensionWeightPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VehicleDimensionWeight.
     * @param {VehicleDimensionWeightUpsertArgs} args - Arguments to update or create a VehicleDimensionWeight.
     * @example
     * // Update or create a VehicleDimensionWeight
     * const vehicleDimensionWeight = await prisma.vehicleDimensionWeight.upsert({
     *   create: {
     *     // ... data to create a VehicleDimensionWeight
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VehicleDimensionWeight we want to update
     *   }
     * })
     */
    upsert<T extends VehicleDimensionWeightUpsertArgs>(args: SelectSubset<T, VehicleDimensionWeightUpsertArgs<ExtArgs>>): Prisma__VehicleDimensionWeightClient<$Result.GetResult<Prisma.$VehicleDimensionWeightPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VehicleDimensionWeights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleDimensionWeightCountArgs} args - Arguments to filter VehicleDimensionWeights to count.
     * @example
     * // Count the number of VehicleDimensionWeights
     * const count = await prisma.vehicleDimensionWeight.count({
     *   where: {
     *     // ... the filter for the VehicleDimensionWeights we want to count
     *   }
     * })
    **/
    count<T extends VehicleDimensionWeightCountArgs>(
      args?: Subset<T, VehicleDimensionWeightCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleDimensionWeightCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VehicleDimensionWeight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleDimensionWeightAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VehicleDimensionWeightAggregateArgs>(args: Subset<T, VehicleDimensionWeightAggregateArgs>): Prisma.PrismaPromise<GetVehicleDimensionWeightAggregateType<T>>

    /**
     * Group by VehicleDimensionWeight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleDimensionWeightGroupByArgs} args - Group by arguments.
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
      T extends VehicleDimensionWeightGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleDimensionWeightGroupByArgs['orderBy'] }
        : { orderBy?: VehicleDimensionWeightGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VehicleDimensionWeightGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleDimensionWeightGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VehicleDimensionWeight model
   */
  readonly fields: VehicleDimensionWeightFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VehicleDimensionWeight.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleDimensionWeightClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the VehicleDimensionWeight model
   */
  interface VehicleDimensionWeightFieldRefs {
    readonly id: FieldRef<"VehicleDimensionWeight", 'String'>
    readonly vehicleId: FieldRef<"VehicleDimensionWeight", 'String'>
    readonly practical: FieldRef<"VehicleDimensionWeight", 'Int'>
    readonly emotional: FieldRef<"VehicleDimensionWeight", 'Int'>
    readonly saving: FieldRef<"VehicleDimensionWeight", 'Int'>
    readonly quality: FieldRef<"VehicleDimensionWeight", 'Int'>
    readonly comfort: FieldRef<"VehicleDimensionWeight", 'Int'>
    readonly driving: FieldRef<"VehicleDimensionWeight", 'Int'>
    readonly brand: FieldRef<"VehicleDimensionWeight", 'Int'>
    readonly value: FieldRef<"VehicleDimensionWeight", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * VehicleDimensionWeight findUnique
   */
  export type VehicleDimensionWeightFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleDimensionWeight
     */
    select?: VehicleDimensionWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleDimensionWeight
     */
    omit?: VehicleDimensionWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleDimensionWeightInclude<ExtArgs> | null
    /**
     * Filter, which VehicleDimensionWeight to fetch.
     */
    where: VehicleDimensionWeightWhereUniqueInput
  }

  /**
   * VehicleDimensionWeight findUniqueOrThrow
   */
  export type VehicleDimensionWeightFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleDimensionWeight
     */
    select?: VehicleDimensionWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleDimensionWeight
     */
    omit?: VehicleDimensionWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleDimensionWeightInclude<ExtArgs> | null
    /**
     * Filter, which VehicleDimensionWeight to fetch.
     */
    where: VehicleDimensionWeightWhereUniqueInput
  }

  /**
   * VehicleDimensionWeight findFirst
   */
  export type VehicleDimensionWeightFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleDimensionWeight
     */
    select?: VehicleDimensionWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleDimensionWeight
     */
    omit?: VehicleDimensionWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleDimensionWeightInclude<ExtArgs> | null
    /**
     * Filter, which VehicleDimensionWeight to fetch.
     */
    where?: VehicleDimensionWeightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleDimensionWeights to fetch.
     */
    orderBy?: VehicleDimensionWeightOrderByWithRelationInput | VehicleDimensionWeightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleDimensionWeights.
     */
    cursor?: VehicleDimensionWeightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleDimensionWeights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleDimensionWeights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleDimensionWeights.
     */
    distinct?: VehicleDimensionWeightScalarFieldEnum | VehicleDimensionWeightScalarFieldEnum[]
  }

  /**
   * VehicleDimensionWeight findFirstOrThrow
   */
  export type VehicleDimensionWeightFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleDimensionWeight
     */
    select?: VehicleDimensionWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleDimensionWeight
     */
    omit?: VehicleDimensionWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleDimensionWeightInclude<ExtArgs> | null
    /**
     * Filter, which VehicleDimensionWeight to fetch.
     */
    where?: VehicleDimensionWeightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleDimensionWeights to fetch.
     */
    orderBy?: VehicleDimensionWeightOrderByWithRelationInput | VehicleDimensionWeightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleDimensionWeights.
     */
    cursor?: VehicleDimensionWeightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleDimensionWeights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleDimensionWeights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleDimensionWeights.
     */
    distinct?: VehicleDimensionWeightScalarFieldEnum | VehicleDimensionWeightScalarFieldEnum[]
  }

  /**
   * VehicleDimensionWeight findMany
   */
  export type VehicleDimensionWeightFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleDimensionWeight
     */
    select?: VehicleDimensionWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleDimensionWeight
     */
    omit?: VehicleDimensionWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleDimensionWeightInclude<ExtArgs> | null
    /**
     * Filter, which VehicleDimensionWeights to fetch.
     */
    where?: VehicleDimensionWeightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleDimensionWeights to fetch.
     */
    orderBy?: VehicleDimensionWeightOrderByWithRelationInput | VehicleDimensionWeightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VehicleDimensionWeights.
     */
    cursor?: VehicleDimensionWeightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleDimensionWeights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleDimensionWeights.
     */
    skip?: number
    distinct?: VehicleDimensionWeightScalarFieldEnum | VehicleDimensionWeightScalarFieldEnum[]
  }

  /**
   * VehicleDimensionWeight create
   */
  export type VehicleDimensionWeightCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleDimensionWeight
     */
    select?: VehicleDimensionWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleDimensionWeight
     */
    omit?: VehicleDimensionWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleDimensionWeightInclude<ExtArgs> | null
    /**
     * The data needed to create a VehicleDimensionWeight.
     */
    data: XOR<VehicleDimensionWeightCreateInput, VehicleDimensionWeightUncheckedCreateInput>
  }

  /**
   * VehicleDimensionWeight createMany
   */
  export type VehicleDimensionWeightCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VehicleDimensionWeights.
     */
    data: VehicleDimensionWeightCreateManyInput | VehicleDimensionWeightCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VehicleDimensionWeight createManyAndReturn
   */
  export type VehicleDimensionWeightCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleDimensionWeight
     */
    select?: VehicleDimensionWeightSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleDimensionWeight
     */
    omit?: VehicleDimensionWeightOmit<ExtArgs> | null
    /**
     * The data used to create many VehicleDimensionWeights.
     */
    data: VehicleDimensionWeightCreateManyInput | VehicleDimensionWeightCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleDimensionWeightIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VehicleDimensionWeight update
   */
  export type VehicleDimensionWeightUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleDimensionWeight
     */
    select?: VehicleDimensionWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleDimensionWeight
     */
    omit?: VehicleDimensionWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleDimensionWeightInclude<ExtArgs> | null
    /**
     * The data needed to update a VehicleDimensionWeight.
     */
    data: XOR<VehicleDimensionWeightUpdateInput, VehicleDimensionWeightUncheckedUpdateInput>
    /**
     * Choose, which VehicleDimensionWeight to update.
     */
    where: VehicleDimensionWeightWhereUniqueInput
  }

  /**
   * VehicleDimensionWeight updateMany
   */
  export type VehicleDimensionWeightUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VehicleDimensionWeights.
     */
    data: XOR<VehicleDimensionWeightUpdateManyMutationInput, VehicleDimensionWeightUncheckedUpdateManyInput>
    /**
     * Filter which VehicleDimensionWeights to update
     */
    where?: VehicleDimensionWeightWhereInput
    /**
     * Limit how many VehicleDimensionWeights to update.
     */
    limit?: number
  }

  /**
   * VehicleDimensionWeight updateManyAndReturn
   */
  export type VehicleDimensionWeightUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleDimensionWeight
     */
    select?: VehicleDimensionWeightSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleDimensionWeight
     */
    omit?: VehicleDimensionWeightOmit<ExtArgs> | null
    /**
     * The data used to update VehicleDimensionWeights.
     */
    data: XOR<VehicleDimensionWeightUpdateManyMutationInput, VehicleDimensionWeightUncheckedUpdateManyInput>
    /**
     * Filter which VehicleDimensionWeights to update
     */
    where?: VehicleDimensionWeightWhereInput
    /**
     * Limit how many VehicleDimensionWeights to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleDimensionWeightIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VehicleDimensionWeight upsert
   */
  export type VehicleDimensionWeightUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleDimensionWeight
     */
    select?: VehicleDimensionWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleDimensionWeight
     */
    omit?: VehicleDimensionWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleDimensionWeightInclude<ExtArgs> | null
    /**
     * The filter to search for the VehicleDimensionWeight to update in case it exists.
     */
    where: VehicleDimensionWeightWhereUniqueInput
    /**
     * In case the VehicleDimensionWeight found by the `where` argument doesn't exist, create a new VehicleDimensionWeight with this data.
     */
    create: XOR<VehicleDimensionWeightCreateInput, VehicleDimensionWeightUncheckedCreateInput>
    /**
     * In case the VehicleDimensionWeight was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleDimensionWeightUpdateInput, VehicleDimensionWeightUncheckedUpdateInput>
  }

  /**
   * VehicleDimensionWeight delete
   */
  export type VehicleDimensionWeightDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleDimensionWeight
     */
    select?: VehicleDimensionWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleDimensionWeight
     */
    omit?: VehicleDimensionWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleDimensionWeightInclude<ExtArgs> | null
    /**
     * Filter which VehicleDimensionWeight to delete.
     */
    where: VehicleDimensionWeightWhereUniqueInput
  }

  /**
   * VehicleDimensionWeight deleteMany
   */
  export type VehicleDimensionWeightDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleDimensionWeights to delete
     */
    where?: VehicleDimensionWeightWhereInput
    /**
     * Limit how many VehicleDimensionWeights to delete.
     */
    limit?: number
  }

  /**
   * VehicleDimensionWeight without action
   */
  export type VehicleDimensionWeightDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleDimensionWeight
     */
    select?: VehicleDimensionWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleDimensionWeight
     */
    omit?: VehicleDimensionWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleDimensionWeightInclude<ExtArgs> | null
  }


  /**
   * Model VehicleRecommendation
   */

  export type AggregateVehicleRecommendation = {
    _count: VehicleRecommendationCountAggregateOutputType | null
    _avg: VehicleRecommendationAvgAggregateOutputType | null
    _sum: VehicleRecommendationSumAggregateOutputType | null
    _min: VehicleRecommendationMinAggregateOutputType | null
    _max: VehicleRecommendationMaxAggregateOutputType | null
  }

  export type VehicleRecommendationAvgAggregateOutputType = {
    rank: number | null
    score: number | null
  }

  export type VehicleRecommendationSumAggregateOutputType = {
    rank: number | null
    score: number | null
  }

  export type VehicleRecommendationMinAggregateOutputType = {
    id: string | null
    resultId: string | null
    vehicleId: string | null
    rank: number | null
    score: number | null
    reason: string | null
  }

  export type VehicleRecommendationMaxAggregateOutputType = {
    id: string | null
    resultId: string | null
    vehicleId: string | null
    rank: number | null
    score: number | null
    reason: string | null
  }

  export type VehicleRecommendationCountAggregateOutputType = {
    id: number
    resultId: number
    vehicleId: number
    rank: number
    score: number
    reason: number
    _all: number
  }


  export type VehicleRecommendationAvgAggregateInputType = {
    rank?: true
    score?: true
  }

  export type VehicleRecommendationSumAggregateInputType = {
    rank?: true
    score?: true
  }

  export type VehicleRecommendationMinAggregateInputType = {
    id?: true
    resultId?: true
    vehicleId?: true
    rank?: true
    score?: true
    reason?: true
  }

  export type VehicleRecommendationMaxAggregateInputType = {
    id?: true
    resultId?: true
    vehicleId?: true
    rank?: true
    score?: true
    reason?: true
  }

  export type VehicleRecommendationCountAggregateInputType = {
    id?: true
    resultId?: true
    vehicleId?: true
    rank?: true
    score?: true
    reason?: true
    _all?: true
  }

  export type VehicleRecommendationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleRecommendation to aggregate.
     */
    where?: VehicleRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleRecommendations to fetch.
     */
    orderBy?: VehicleRecommendationOrderByWithRelationInput | VehicleRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleRecommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VehicleRecommendations
    **/
    _count?: true | VehicleRecommendationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleRecommendationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleRecommendationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleRecommendationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleRecommendationMaxAggregateInputType
  }

  export type GetVehicleRecommendationAggregateType<T extends VehicleRecommendationAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicleRecommendation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicleRecommendation[P]>
      : GetScalarType<T[P], AggregateVehicleRecommendation[P]>
  }




  export type VehicleRecommendationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleRecommendationWhereInput
    orderBy?: VehicleRecommendationOrderByWithAggregationInput | VehicleRecommendationOrderByWithAggregationInput[]
    by: VehicleRecommendationScalarFieldEnum[] | VehicleRecommendationScalarFieldEnum
    having?: VehicleRecommendationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleRecommendationCountAggregateInputType | true
    _avg?: VehicleRecommendationAvgAggregateInputType
    _sum?: VehicleRecommendationSumAggregateInputType
    _min?: VehicleRecommendationMinAggregateInputType
    _max?: VehicleRecommendationMaxAggregateInputType
  }

  export type VehicleRecommendationGroupByOutputType = {
    id: string
    resultId: string
    vehicleId: string
    rank: number
    score: number
    reason: string
    _count: VehicleRecommendationCountAggregateOutputType | null
    _avg: VehicleRecommendationAvgAggregateOutputType | null
    _sum: VehicleRecommendationSumAggregateOutputType | null
    _min: VehicleRecommendationMinAggregateOutputType | null
    _max: VehicleRecommendationMaxAggregateOutputType | null
  }

  type GetVehicleRecommendationGroupByPayload<T extends VehicleRecommendationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleRecommendationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleRecommendationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleRecommendationGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleRecommendationGroupByOutputType[P]>
        }
      >
    >


  export type VehicleRecommendationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resultId?: boolean
    vehicleId?: boolean
    rank?: boolean
    score?: boolean
    reason?: boolean
    result?: boolean | PersonalityResultDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleRecommendation"]>

  export type VehicleRecommendationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resultId?: boolean
    vehicleId?: boolean
    rank?: boolean
    score?: boolean
    reason?: boolean
    result?: boolean | PersonalityResultDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleRecommendation"]>

  export type VehicleRecommendationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resultId?: boolean
    vehicleId?: boolean
    rank?: boolean
    score?: boolean
    reason?: boolean
    result?: boolean | PersonalityResultDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleRecommendation"]>

  export type VehicleRecommendationSelectScalar = {
    id?: boolean
    resultId?: boolean
    vehicleId?: boolean
    rank?: boolean
    score?: boolean
    reason?: boolean
  }

  export type VehicleRecommendationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "resultId" | "vehicleId" | "rank" | "score" | "reason", ExtArgs["result"]["vehicleRecommendation"]>
  export type VehicleRecommendationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    result?: boolean | PersonalityResultDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type VehicleRecommendationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    result?: boolean | PersonalityResultDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type VehicleRecommendationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    result?: boolean | PersonalityResultDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }

  export type $VehicleRecommendationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VehicleRecommendation"
    objects: {
      result: Prisma.$PersonalityResultPayload<ExtArgs>
      vehicle: Prisma.$VehiclePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      resultId: string
      vehicleId: string
      rank: number
      score: number
      reason: string
    }, ExtArgs["result"]["vehicleRecommendation"]>
    composites: {}
  }

  type VehicleRecommendationGetPayload<S extends boolean | null | undefined | VehicleRecommendationDefaultArgs> = $Result.GetResult<Prisma.$VehicleRecommendationPayload, S>

  type VehicleRecommendationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleRecommendationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleRecommendationCountAggregateInputType | true
    }

  export interface VehicleRecommendationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VehicleRecommendation'], meta: { name: 'VehicleRecommendation' } }
    /**
     * Find zero or one VehicleRecommendation that matches the filter.
     * @param {VehicleRecommendationFindUniqueArgs} args - Arguments to find a VehicleRecommendation
     * @example
     * // Get one VehicleRecommendation
     * const vehicleRecommendation = await prisma.vehicleRecommendation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleRecommendationFindUniqueArgs>(args: SelectSubset<T, VehicleRecommendationFindUniqueArgs<ExtArgs>>): Prisma__VehicleRecommendationClient<$Result.GetResult<Prisma.$VehicleRecommendationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VehicleRecommendation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleRecommendationFindUniqueOrThrowArgs} args - Arguments to find a VehicleRecommendation
     * @example
     * // Get one VehicleRecommendation
     * const vehicleRecommendation = await prisma.vehicleRecommendation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleRecommendationFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleRecommendationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleRecommendationClient<$Result.GetResult<Prisma.$VehicleRecommendationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleRecommendation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleRecommendationFindFirstArgs} args - Arguments to find a VehicleRecommendation
     * @example
     * // Get one VehicleRecommendation
     * const vehicleRecommendation = await prisma.vehicleRecommendation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleRecommendationFindFirstArgs>(args?: SelectSubset<T, VehicleRecommendationFindFirstArgs<ExtArgs>>): Prisma__VehicleRecommendationClient<$Result.GetResult<Prisma.$VehicleRecommendationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleRecommendation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleRecommendationFindFirstOrThrowArgs} args - Arguments to find a VehicleRecommendation
     * @example
     * // Get one VehicleRecommendation
     * const vehicleRecommendation = await prisma.vehicleRecommendation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleRecommendationFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleRecommendationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleRecommendationClient<$Result.GetResult<Prisma.$VehicleRecommendationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VehicleRecommendations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleRecommendationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VehicleRecommendations
     * const vehicleRecommendations = await prisma.vehicleRecommendation.findMany()
     * 
     * // Get first 10 VehicleRecommendations
     * const vehicleRecommendations = await prisma.vehicleRecommendation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleRecommendationWithIdOnly = await prisma.vehicleRecommendation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleRecommendationFindManyArgs>(args?: SelectSubset<T, VehicleRecommendationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleRecommendationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VehicleRecommendation.
     * @param {VehicleRecommendationCreateArgs} args - Arguments to create a VehicleRecommendation.
     * @example
     * // Create one VehicleRecommendation
     * const VehicleRecommendation = await prisma.vehicleRecommendation.create({
     *   data: {
     *     // ... data to create a VehicleRecommendation
     *   }
     * })
     * 
     */
    create<T extends VehicleRecommendationCreateArgs>(args: SelectSubset<T, VehicleRecommendationCreateArgs<ExtArgs>>): Prisma__VehicleRecommendationClient<$Result.GetResult<Prisma.$VehicleRecommendationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VehicleRecommendations.
     * @param {VehicleRecommendationCreateManyArgs} args - Arguments to create many VehicleRecommendations.
     * @example
     * // Create many VehicleRecommendations
     * const vehicleRecommendation = await prisma.vehicleRecommendation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleRecommendationCreateManyArgs>(args?: SelectSubset<T, VehicleRecommendationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VehicleRecommendations and returns the data saved in the database.
     * @param {VehicleRecommendationCreateManyAndReturnArgs} args - Arguments to create many VehicleRecommendations.
     * @example
     * // Create many VehicleRecommendations
     * const vehicleRecommendation = await prisma.vehicleRecommendation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VehicleRecommendations and only return the `id`
     * const vehicleRecommendationWithIdOnly = await prisma.vehicleRecommendation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleRecommendationCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleRecommendationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleRecommendationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VehicleRecommendation.
     * @param {VehicleRecommendationDeleteArgs} args - Arguments to delete one VehicleRecommendation.
     * @example
     * // Delete one VehicleRecommendation
     * const VehicleRecommendation = await prisma.vehicleRecommendation.delete({
     *   where: {
     *     // ... filter to delete one VehicleRecommendation
     *   }
     * })
     * 
     */
    delete<T extends VehicleRecommendationDeleteArgs>(args: SelectSubset<T, VehicleRecommendationDeleteArgs<ExtArgs>>): Prisma__VehicleRecommendationClient<$Result.GetResult<Prisma.$VehicleRecommendationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VehicleRecommendation.
     * @param {VehicleRecommendationUpdateArgs} args - Arguments to update one VehicleRecommendation.
     * @example
     * // Update one VehicleRecommendation
     * const vehicleRecommendation = await prisma.vehicleRecommendation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleRecommendationUpdateArgs>(args: SelectSubset<T, VehicleRecommendationUpdateArgs<ExtArgs>>): Prisma__VehicleRecommendationClient<$Result.GetResult<Prisma.$VehicleRecommendationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VehicleRecommendations.
     * @param {VehicleRecommendationDeleteManyArgs} args - Arguments to filter VehicleRecommendations to delete.
     * @example
     * // Delete a few VehicleRecommendations
     * const { count } = await prisma.vehicleRecommendation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleRecommendationDeleteManyArgs>(args?: SelectSubset<T, VehicleRecommendationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleRecommendations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleRecommendationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VehicleRecommendations
     * const vehicleRecommendation = await prisma.vehicleRecommendation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleRecommendationUpdateManyArgs>(args: SelectSubset<T, VehicleRecommendationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleRecommendations and returns the data updated in the database.
     * @param {VehicleRecommendationUpdateManyAndReturnArgs} args - Arguments to update many VehicleRecommendations.
     * @example
     * // Update many VehicleRecommendations
     * const vehicleRecommendation = await prisma.vehicleRecommendation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VehicleRecommendations and only return the `id`
     * const vehicleRecommendationWithIdOnly = await prisma.vehicleRecommendation.updateManyAndReturn({
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
    updateManyAndReturn<T extends VehicleRecommendationUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleRecommendationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleRecommendationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VehicleRecommendation.
     * @param {VehicleRecommendationUpsertArgs} args - Arguments to update or create a VehicleRecommendation.
     * @example
     * // Update or create a VehicleRecommendation
     * const vehicleRecommendation = await prisma.vehicleRecommendation.upsert({
     *   create: {
     *     // ... data to create a VehicleRecommendation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VehicleRecommendation we want to update
     *   }
     * })
     */
    upsert<T extends VehicleRecommendationUpsertArgs>(args: SelectSubset<T, VehicleRecommendationUpsertArgs<ExtArgs>>): Prisma__VehicleRecommendationClient<$Result.GetResult<Prisma.$VehicleRecommendationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VehicleRecommendations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleRecommendationCountArgs} args - Arguments to filter VehicleRecommendations to count.
     * @example
     * // Count the number of VehicleRecommendations
     * const count = await prisma.vehicleRecommendation.count({
     *   where: {
     *     // ... the filter for the VehicleRecommendations we want to count
     *   }
     * })
    **/
    count<T extends VehicleRecommendationCountArgs>(
      args?: Subset<T, VehicleRecommendationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleRecommendationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VehicleRecommendation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleRecommendationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VehicleRecommendationAggregateArgs>(args: Subset<T, VehicleRecommendationAggregateArgs>): Prisma.PrismaPromise<GetVehicleRecommendationAggregateType<T>>

    /**
     * Group by VehicleRecommendation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleRecommendationGroupByArgs} args - Group by arguments.
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
      T extends VehicleRecommendationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleRecommendationGroupByArgs['orderBy'] }
        : { orderBy?: VehicleRecommendationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VehicleRecommendationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleRecommendationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VehicleRecommendation model
   */
  readonly fields: VehicleRecommendationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VehicleRecommendation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleRecommendationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    result<T extends PersonalityResultDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PersonalityResultDefaultArgs<ExtArgs>>): Prisma__PersonalityResultClient<$Result.GetResult<Prisma.$PersonalityResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the VehicleRecommendation model
   */
  interface VehicleRecommendationFieldRefs {
    readonly id: FieldRef<"VehicleRecommendation", 'String'>
    readonly resultId: FieldRef<"VehicleRecommendation", 'String'>
    readonly vehicleId: FieldRef<"VehicleRecommendation", 'String'>
    readonly rank: FieldRef<"VehicleRecommendation", 'Int'>
    readonly score: FieldRef<"VehicleRecommendation", 'Int'>
    readonly reason: FieldRef<"VehicleRecommendation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * VehicleRecommendation findUnique
   */
  export type VehicleRecommendationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleRecommendation
     */
    select?: VehicleRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleRecommendation
     */
    omit?: VehicleRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleRecommendation to fetch.
     */
    where: VehicleRecommendationWhereUniqueInput
  }

  /**
   * VehicleRecommendation findUniqueOrThrow
   */
  export type VehicleRecommendationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleRecommendation
     */
    select?: VehicleRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleRecommendation
     */
    omit?: VehicleRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleRecommendation to fetch.
     */
    where: VehicleRecommendationWhereUniqueInput
  }

  /**
   * VehicleRecommendation findFirst
   */
  export type VehicleRecommendationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleRecommendation
     */
    select?: VehicleRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleRecommendation
     */
    omit?: VehicleRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleRecommendation to fetch.
     */
    where?: VehicleRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleRecommendations to fetch.
     */
    orderBy?: VehicleRecommendationOrderByWithRelationInput | VehicleRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleRecommendations.
     */
    cursor?: VehicleRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleRecommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleRecommendations.
     */
    distinct?: VehicleRecommendationScalarFieldEnum | VehicleRecommendationScalarFieldEnum[]
  }

  /**
   * VehicleRecommendation findFirstOrThrow
   */
  export type VehicleRecommendationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleRecommendation
     */
    select?: VehicleRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleRecommendation
     */
    omit?: VehicleRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleRecommendation to fetch.
     */
    where?: VehicleRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleRecommendations to fetch.
     */
    orderBy?: VehicleRecommendationOrderByWithRelationInput | VehicleRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleRecommendations.
     */
    cursor?: VehicleRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleRecommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleRecommendations.
     */
    distinct?: VehicleRecommendationScalarFieldEnum | VehicleRecommendationScalarFieldEnum[]
  }

  /**
   * VehicleRecommendation findMany
   */
  export type VehicleRecommendationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleRecommendation
     */
    select?: VehicleRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleRecommendation
     */
    omit?: VehicleRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleRecommendations to fetch.
     */
    where?: VehicleRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleRecommendations to fetch.
     */
    orderBy?: VehicleRecommendationOrderByWithRelationInput | VehicleRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VehicleRecommendations.
     */
    cursor?: VehicleRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleRecommendations.
     */
    skip?: number
    distinct?: VehicleRecommendationScalarFieldEnum | VehicleRecommendationScalarFieldEnum[]
  }

  /**
   * VehicleRecommendation create
   */
  export type VehicleRecommendationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleRecommendation
     */
    select?: VehicleRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleRecommendation
     */
    omit?: VehicleRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleRecommendationInclude<ExtArgs> | null
    /**
     * The data needed to create a VehicleRecommendation.
     */
    data: XOR<VehicleRecommendationCreateInput, VehicleRecommendationUncheckedCreateInput>
  }

  /**
   * VehicleRecommendation createMany
   */
  export type VehicleRecommendationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VehicleRecommendations.
     */
    data: VehicleRecommendationCreateManyInput | VehicleRecommendationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VehicleRecommendation createManyAndReturn
   */
  export type VehicleRecommendationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleRecommendation
     */
    select?: VehicleRecommendationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleRecommendation
     */
    omit?: VehicleRecommendationOmit<ExtArgs> | null
    /**
     * The data used to create many VehicleRecommendations.
     */
    data: VehicleRecommendationCreateManyInput | VehicleRecommendationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleRecommendationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VehicleRecommendation update
   */
  export type VehicleRecommendationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleRecommendation
     */
    select?: VehicleRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleRecommendation
     */
    omit?: VehicleRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleRecommendationInclude<ExtArgs> | null
    /**
     * The data needed to update a VehicleRecommendation.
     */
    data: XOR<VehicleRecommendationUpdateInput, VehicleRecommendationUncheckedUpdateInput>
    /**
     * Choose, which VehicleRecommendation to update.
     */
    where: VehicleRecommendationWhereUniqueInput
  }

  /**
   * VehicleRecommendation updateMany
   */
  export type VehicleRecommendationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VehicleRecommendations.
     */
    data: XOR<VehicleRecommendationUpdateManyMutationInput, VehicleRecommendationUncheckedUpdateManyInput>
    /**
     * Filter which VehicleRecommendations to update
     */
    where?: VehicleRecommendationWhereInput
    /**
     * Limit how many VehicleRecommendations to update.
     */
    limit?: number
  }

  /**
   * VehicleRecommendation updateManyAndReturn
   */
  export type VehicleRecommendationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleRecommendation
     */
    select?: VehicleRecommendationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleRecommendation
     */
    omit?: VehicleRecommendationOmit<ExtArgs> | null
    /**
     * The data used to update VehicleRecommendations.
     */
    data: XOR<VehicleRecommendationUpdateManyMutationInput, VehicleRecommendationUncheckedUpdateManyInput>
    /**
     * Filter which VehicleRecommendations to update
     */
    where?: VehicleRecommendationWhereInput
    /**
     * Limit how many VehicleRecommendations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleRecommendationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VehicleRecommendation upsert
   */
  export type VehicleRecommendationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleRecommendation
     */
    select?: VehicleRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleRecommendation
     */
    omit?: VehicleRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleRecommendationInclude<ExtArgs> | null
    /**
     * The filter to search for the VehicleRecommendation to update in case it exists.
     */
    where: VehicleRecommendationWhereUniqueInput
    /**
     * In case the VehicleRecommendation found by the `where` argument doesn't exist, create a new VehicleRecommendation with this data.
     */
    create: XOR<VehicleRecommendationCreateInput, VehicleRecommendationUncheckedCreateInput>
    /**
     * In case the VehicleRecommendation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleRecommendationUpdateInput, VehicleRecommendationUncheckedUpdateInput>
  }

  /**
   * VehicleRecommendation delete
   */
  export type VehicleRecommendationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleRecommendation
     */
    select?: VehicleRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleRecommendation
     */
    omit?: VehicleRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleRecommendationInclude<ExtArgs> | null
    /**
     * Filter which VehicleRecommendation to delete.
     */
    where: VehicleRecommendationWhereUniqueInput
  }

  /**
   * VehicleRecommendation deleteMany
   */
  export type VehicleRecommendationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleRecommendations to delete
     */
    where?: VehicleRecommendationWhereInput
    /**
     * Limit how many VehicleRecommendations to delete.
     */
    limit?: number
  }

  /**
   * VehicleRecommendation without action
   */
  export type VehicleRecommendationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleRecommendation
     */
    select?: VehicleRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleRecommendation
     */
    omit?: VehicleRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleRecommendationInclude<ExtArgs> | null
  }


  /**
   * Model BuyingGuide
   */

  export type AggregateBuyingGuide = {
    _count: BuyingGuideCountAggregateOutputType | null
    _min: BuyingGuideMinAggregateOutputType | null
    _max: BuyingGuideMaxAggregateOutputType | null
  }

  export type BuyingGuideMinAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    excerpt: string | null
    body: string | null
  }

  export type BuyingGuideMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    excerpt: string | null
    body: string | null
  }

  export type BuyingGuideCountAggregateOutputType = {
    id: number
    slug: number
    title: number
    excerpt: number
    body: number
    relatedVehicleSlugs: number
    _all: number
  }


  export type BuyingGuideMinAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    excerpt?: true
    body?: true
  }

  export type BuyingGuideMaxAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    excerpt?: true
    body?: true
  }

  export type BuyingGuideCountAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    excerpt?: true
    body?: true
    relatedVehicleSlugs?: true
    _all?: true
  }

  export type BuyingGuideAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BuyingGuide to aggregate.
     */
    where?: BuyingGuideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuyingGuides to fetch.
     */
    orderBy?: BuyingGuideOrderByWithRelationInput | BuyingGuideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BuyingGuideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuyingGuides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuyingGuides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BuyingGuides
    **/
    _count?: true | BuyingGuideCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BuyingGuideMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BuyingGuideMaxAggregateInputType
  }

  export type GetBuyingGuideAggregateType<T extends BuyingGuideAggregateArgs> = {
        [P in keyof T & keyof AggregateBuyingGuide]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBuyingGuide[P]>
      : GetScalarType<T[P], AggregateBuyingGuide[P]>
  }




  export type BuyingGuideGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BuyingGuideWhereInput
    orderBy?: BuyingGuideOrderByWithAggregationInput | BuyingGuideOrderByWithAggregationInput[]
    by: BuyingGuideScalarFieldEnum[] | BuyingGuideScalarFieldEnum
    having?: BuyingGuideScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BuyingGuideCountAggregateInputType | true
    _min?: BuyingGuideMinAggregateInputType
    _max?: BuyingGuideMaxAggregateInputType
  }

  export type BuyingGuideGroupByOutputType = {
    id: string
    slug: string
    title: string
    excerpt: string
    body: string
    relatedVehicleSlugs: string[]
    _count: BuyingGuideCountAggregateOutputType | null
    _min: BuyingGuideMinAggregateOutputType | null
    _max: BuyingGuideMaxAggregateOutputType | null
  }

  type GetBuyingGuideGroupByPayload<T extends BuyingGuideGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BuyingGuideGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BuyingGuideGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BuyingGuideGroupByOutputType[P]>
            : GetScalarType<T[P], BuyingGuideGroupByOutputType[P]>
        }
      >
    >


  export type BuyingGuideSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    excerpt?: boolean
    body?: boolean
    relatedVehicleSlugs?: boolean
  }, ExtArgs["result"]["buyingGuide"]>

  export type BuyingGuideSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    excerpt?: boolean
    body?: boolean
    relatedVehicleSlugs?: boolean
  }, ExtArgs["result"]["buyingGuide"]>

  export type BuyingGuideSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    excerpt?: boolean
    body?: boolean
    relatedVehicleSlugs?: boolean
  }, ExtArgs["result"]["buyingGuide"]>

  export type BuyingGuideSelectScalar = {
    id?: boolean
    slug?: boolean
    title?: boolean
    excerpt?: boolean
    body?: boolean
    relatedVehicleSlugs?: boolean
  }

  export type BuyingGuideOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "title" | "excerpt" | "body" | "relatedVehicleSlugs", ExtArgs["result"]["buyingGuide"]>

  export type $BuyingGuidePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BuyingGuide"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      title: string
      excerpt: string
      body: string
      relatedVehicleSlugs: string[]
    }, ExtArgs["result"]["buyingGuide"]>
    composites: {}
  }

  type BuyingGuideGetPayload<S extends boolean | null | undefined | BuyingGuideDefaultArgs> = $Result.GetResult<Prisma.$BuyingGuidePayload, S>

  type BuyingGuideCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BuyingGuideFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BuyingGuideCountAggregateInputType | true
    }

  export interface BuyingGuideDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BuyingGuide'], meta: { name: 'BuyingGuide' } }
    /**
     * Find zero or one BuyingGuide that matches the filter.
     * @param {BuyingGuideFindUniqueArgs} args - Arguments to find a BuyingGuide
     * @example
     * // Get one BuyingGuide
     * const buyingGuide = await prisma.buyingGuide.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BuyingGuideFindUniqueArgs>(args: SelectSubset<T, BuyingGuideFindUniqueArgs<ExtArgs>>): Prisma__BuyingGuideClient<$Result.GetResult<Prisma.$BuyingGuidePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BuyingGuide that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BuyingGuideFindUniqueOrThrowArgs} args - Arguments to find a BuyingGuide
     * @example
     * // Get one BuyingGuide
     * const buyingGuide = await prisma.buyingGuide.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BuyingGuideFindUniqueOrThrowArgs>(args: SelectSubset<T, BuyingGuideFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BuyingGuideClient<$Result.GetResult<Prisma.$BuyingGuidePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BuyingGuide that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuyingGuideFindFirstArgs} args - Arguments to find a BuyingGuide
     * @example
     * // Get one BuyingGuide
     * const buyingGuide = await prisma.buyingGuide.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BuyingGuideFindFirstArgs>(args?: SelectSubset<T, BuyingGuideFindFirstArgs<ExtArgs>>): Prisma__BuyingGuideClient<$Result.GetResult<Prisma.$BuyingGuidePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BuyingGuide that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuyingGuideFindFirstOrThrowArgs} args - Arguments to find a BuyingGuide
     * @example
     * // Get one BuyingGuide
     * const buyingGuide = await prisma.buyingGuide.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BuyingGuideFindFirstOrThrowArgs>(args?: SelectSubset<T, BuyingGuideFindFirstOrThrowArgs<ExtArgs>>): Prisma__BuyingGuideClient<$Result.GetResult<Prisma.$BuyingGuidePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BuyingGuides that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuyingGuideFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BuyingGuides
     * const buyingGuides = await prisma.buyingGuide.findMany()
     * 
     * // Get first 10 BuyingGuides
     * const buyingGuides = await prisma.buyingGuide.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const buyingGuideWithIdOnly = await prisma.buyingGuide.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BuyingGuideFindManyArgs>(args?: SelectSubset<T, BuyingGuideFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuyingGuidePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BuyingGuide.
     * @param {BuyingGuideCreateArgs} args - Arguments to create a BuyingGuide.
     * @example
     * // Create one BuyingGuide
     * const BuyingGuide = await prisma.buyingGuide.create({
     *   data: {
     *     // ... data to create a BuyingGuide
     *   }
     * })
     * 
     */
    create<T extends BuyingGuideCreateArgs>(args: SelectSubset<T, BuyingGuideCreateArgs<ExtArgs>>): Prisma__BuyingGuideClient<$Result.GetResult<Prisma.$BuyingGuidePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BuyingGuides.
     * @param {BuyingGuideCreateManyArgs} args - Arguments to create many BuyingGuides.
     * @example
     * // Create many BuyingGuides
     * const buyingGuide = await prisma.buyingGuide.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BuyingGuideCreateManyArgs>(args?: SelectSubset<T, BuyingGuideCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BuyingGuides and returns the data saved in the database.
     * @param {BuyingGuideCreateManyAndReturnArgs} args - Arguments to create many BuyingGuides.
     * @example
     * // Create many BuyingGuides
     * const buyingGuide = await prisma.buyingGuide.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BuyingGuides and only return the `id`
     * const buyingGuideWithIdOnly = await prisma.buyingGuide.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BuyingGuideCreateManyAndReturnArgs>(args?: SelectSubset<T, BuyingGuideCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuyingGuidePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BuyingGuide.
     * @param {BuyingGuideDeleteArgs} args - Arguments to delete one BuyingGuide.
     * @example
     * // Delete one BuyingGuide
     * const BuyingGuide = await prisma.buyingGuide.delete({
     *   where: {
     *     // ... filter to delete one BuyingGuide
     *   }
     * })
     * 
     */
    delete<T extends BuyingGuideDeleteArgs>(args: SelectSubset<T, BuyingGuideDeleteArgs<ExtArgs>>): Prisma__BuyingGuideClient<$Result.GetResult<Prisma.$BuyingGuidePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BuyingGuide.
     * @param {BuyingGuideUpdateArgs} args - Arguments to update one BuyingGuide.
     * @example
     * // Update one BuyingGuide
     * const buyingGuide = await prisma.buyingGuide.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BuyingGuideUpdateArgs>(args: SelectSubset<T, BuyingGuideUpdateArgs<ExtArgs>>): Prisma__BuyingGuideClient<$Result.GetResult<Prisma.$BuyingGuidePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BuyingGuides.
     * @param {BuyingGuideDeleteManyArgs} args - Arguments to filter BuyingGuides to delete.
     * @example
     * // Delete a few BuyingGuides
     * const { count } = await prisma.buyingGuide.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BuyingGuideDeleteManyArgs>(args?: SelectSubset<T, BuyingGuideDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BuyingGuides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuyingGuideUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BuyingGuides
     * const buyingGuide = await prisma.buyingGuide.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BuyingGuideUpdateManyArgs>(args: SelectSubset<T, BuyingGuideUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BuyingGuides and returns the data updated in the database.
     * @param {BuyingGuideUpdateManyAndReturnArgs} args - Arguments to update many BuyingGuides.
     * @example
     * // Update many BuyingGuides
     * const buyingGuide = await prisma.buyingGuide.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BuyingGuides and only return the `id`
     * const buyingGuideWithIdOnly = await prisma.buyingGuide.updateManyAndReturn({
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
    updateManyAndReturn<T extends BuyingGuideUpdateManyAndReturnArgs>(args: SelectSubset<T, BuyingGuideUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuyingGuidePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BuyingGuide.
     * @param {BuyingGuideUpsertArgs} args - Arguments to update or create a BuyingGuide.
     * @example
     * // Update or create a BuyingGuide
     * const buyingGuide = await prisma.buyingGuide.upsert({
     *   create: {
     *     // ... data to create a BuyingGuide
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BuyingGuide we want to update
     *   }
     * })
     */
    upsert<T extends BuyingGuideUpsertArgs>(args: SelectSubset<T, BuyingGuideUpsertArgs<ExtArgs>>): Prisma__BuyingGuideClient<$Result.GetResult<Prisma.$BuyingGuidePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BuyingGuides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuyingGuideCountArgs} args - Arguments to filter BuyingGuides to count.
     * @example
     * // Count the number of BuyingGuides
     * const count = await prisma.buyingGuide.count({
     *   where: {
     *     // ... the filter for the BuyingGuides we want to count
     *   }
     * })
    **/
    count<T extends BuyingGuideCountArgs>(
      args?: Subset<T, BuyingGuideCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BuyingGuideCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BuyingGuide.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuyingGuideAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BuyingGuideAggregateArgs>(args: Subset<T, BuyingGuideAggregateArgs>): Prisma.PrismaPromise<GetBuyingGuideAggregateType<T>>

    /**
     * Group by BuyingGuide.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuyingGuideGroupByArgs} args - Group by arguments.
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
      T extends BuyingGuideGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BuyingGuideGroupByArgs['orderBy'] }
        : { orderBy?: BuyingGuideGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BuyingGuideGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBuyingGuideGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BuyingGuide model
   */
  readonly fields: BuyingGuideFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BuyingGuide.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BuyingGuideClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the BuyingGuide model
   */
  interface BuyingGuideFieldRefs {
    readonly id: FieldRef<"BuyingGuide", 'String'>
    readonly slug: FieldRef<"BuyingGuide", 'String'>
    readonly title: FieldRef<"BuyingGuide", 'String'>
    readonly excerpt: FieldRef<"BuyingGuide", 'String'>
    readonly body: FieldRef<"BuyingGuide", 'String'>
    readonly relatedVehicleSlugs: FieldRef<"BuyingGuide", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * BuyingGuide findUnique
   */
  export type BuyingGuideFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuyingGuide
     */
    select?: BuyingGuideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuyingGuide
     */
    omit?: BuyingGuideOmit<ExtArgs> | null
    /**
     * Filter, which BuyingGuide to fetch.
     */
    where: BuyingGuideWhereUniqueInput
  }

  /**
   * BuyingGuide findUniqueOrThrow
   */
  export type BuyingGuideFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuyingGuide
     */
    select?: BuyingGuideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuyingGuide
     */
    omit?: BuyingGuideOmit<ExtArgs> | null
    /**
     * Filter, which BuyingGuide to fetch.
     */
    where: BuyingGuideWhereUniqueInput
  }

  /**
   * BuyingGuide findFirst
   */
  export type BuyingGuideFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuyingGuide
     */
    select?: BuyingGuideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuyingGuide
     */
    omit?: BuyingGuideOmit<ExtArgs> | null
    /**
     * Filter, which BuyingGuide to fetch.
     */
    where?: BuyingGuideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuyingGuides to fetch.
     */
    orderBy?: BuyingGuideOrderByWithRelationInput | BuyingGuideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BuyingGuides.
     */
    cursor?: BuyingGuideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuyingGuides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuyingGuides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BuyingGuides.
     */
    distinct?: BuyingGuideScalarFieldEnum | BuyingGuideScalarFieldEnum[]
  }

  /**
   * BuyingGuide findFirstOrThrow
   */
  export type BuyingGuideFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuyingGuide
     */
    select?: BuyingGuideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuyingGuide
     */
    omit?: BuyingGuideOmit<ExtArgs> | null
    /**
     * Filter, which BuyingGuide to fetch.
     */
    where?: BuyingGuideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuyingGuides to fetch.
     */
    orderBy?: BuyingGuideOrderByWithRelationInput | BuyingGuideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BuyingGuides.
     */
    cursor?: BuyingGuideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuyingGuides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuyingGuides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BuyingGuides.
     */
    distinct?: BuyingGuideScalarFieldEnum | BuyingGuideScalarFieldEnum[]
  }

  /**
   * BuyingGuide findMany
   */
  export type BuyingGuideFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuyingGuide
     */
    select?: BuyingGuideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuyingGuide
     */
    omit?: BuyingGuideOmit<ExtArgs> | null
    /**
     * Filter, which BuyingGuides to fetch.
     */
    where?: BuyingGuideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuyingGuides to fetch.
     */
    orderBy?: BuyingGuideOrderByWithRelationInput | BuyingGuideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BuyingGuides.
     */
    cursor?: BuyingGuideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuyingGuides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuyingGuides.
     */
    skip?: number
    distinct?: BuyingGuideScalarFieldEnum | BuyingGuideScalarFieldEnum[]
  }

  /**
   * BuyingGuide create
   */
  export type BuyingGuideCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuyingGuide
     */
    select?: BuyingGuideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuyingGuide
     */
    omit?: BuyingGuideOmit<ExtArgs> | null
    /**
     * The data needed to create a BuyingGuide.
     */
    data: XOR<BuyingGuideCreateInput, BuyingGuideUncheckedCreateInput>
  }

  /**
   * BuyingGuide createMany
   */
  export type BuyingGuideCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BuyingGuides.
     */
    data: BuyingGuideCreateManyInput | BuyingGuideCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BuyingGuide createManyAndReturn
   */
  export type BuyingGuideCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuyingGuide
     */
    select?: BuyingGuideSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BuyingGuide
     */
    omit?: BuyingGuideOmit<ExtArgs> | null
    /**
     * The data used to create many BuyingGuides.
     */
    data: BuyingGuideCreateManyInput | BuyingGuideCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BuyingGuide update
   */
  export type BuyingGuideUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuyingGuide
     */
    select?: BuyingGuideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuyingGuide
     */
    omit?: BuyingGuideOmit<ExtArgs> | null
    /**
     * The data needed to update a BuyingGuide.
     */
    data: XOR<BuyingGuideUpdateInput, BuyingGuideUncheckedUpdateInput>
    /**
     * Choose, which BuyingGuide to update.
     */
    where: BuyingGuideWhereUniqueInput
  }

  /**
   * BuyingGuide updateMany
   */
  export type BuyingGuideUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BuyingGuides.
     */
    data: XOR<BuyingGuideUpdateManyMutationInput, BuyingGuideUncheckedUpdateManyInput>
    /**
     * Filter which BuyingGuides to update
     */
    where?: BuyingGuideWhereInput
    /**
     * Limit how many BuyingGuides to update.
     */
    limit?: number
  }

  /**
   * BuyingGuide updateManyAndReturn
   */
  export type BuyingGuideUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuyingGuide
     */
    select?: BuyingGuideSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BuyingGuide
     */
    omit?: BuyingGuideOmit<ExtArgs> | null
    /**
     * The data used to update BuyingGuides.
     */
    data: XOR<BuyingGuideUpdateManyMutationInput, BuyingGuideUncheckedUpdateManyInput>
    /**
     * Filter which BuyingGuides to update
     */
    where?: BuyingGuideWhereInput
    /**
     * Limit how many BuyingGuides to update.
     */
    limit?: number
  }

  /**
   * BuyingGuide upsert
   */
  export type BuyingGuideUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuyingGuide
     */
    select?: BuyingGuideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuyingGuide
     */
    omit?: BuyingGuideOmit<ExtArgs> | null
    /**
     * The filter to search for the BuyingGuide to update in case it exists.
     */
    where: BuyingGuideWhereUniqueInput
    /**
     * In case the BuyingGuide found by the `where` argument doesn't exist, create a new BuyingGuide with this data.
     */
    create: XOR<BuyingGuideCreateInput, BuyingGuideUncheckedCreateInput>
    /**
     * In case the BuyingGuide was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BuyingGuideUpdateInput, BuyingGuideUncheckedUpdateInput>
  }

  /**
   * BuyingGuide delete
   */
  export type BuyingGuideDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuyingGuide
     */
    select?: BuyingGuideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuyingGuide
     */
    omit?: BuyingGuideOmit<ExtArgs> | null
    /**
     * Filter which BuyingGuide to delete.
     */
    where: BuyingGuideWhereUniqueInput
  }

  /**
   * BuyingGuide deleteMany
   */
  export type BuyingGuideDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BuyingGuides to delete
     */
    where?: BuyingGuideWhereInput
    /**
     * Limit how many BuyingGuides to delete.
     */
    limit?: number
  }

  /**
   * BuyingGuide without action
   */
  export type BuyingGuideDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuyingGuide
     */
    select?: BuyingGuideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuyingGuide
     */
    omit?: BuyingGuideOmit<ExtArgs> | null
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


  export const QuizQuestionScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    title: 'title',
    description: 'description',
    order: 'order'
  };

  export type QuizQuestionScalarFieldEnum = (typeof QuizQuestionScalarFieldEnum)[keyof typeof QuizQuestionScalarFieldEnum]


  export const QuizOptionScalarFieldEnum: {
    id: 'id',
    questionId: 'questionId',
    label: 'label',
    order: 'order',
    weights: 'weights'
  };

  export type QuizOptionScalarFieldEnum = (typeof QuizOptionScalarFieldEnum)[keyof typeof QuizOptionScalarFieldEnum]


  export const QuizSessionScalarFieldEnum: {
    id: 'id',
    status: 'status',
    currentQuestion: 'currentQuestion',
    personalityCode: 'personalityCode',
    createdAt: 'createdAt',
    completedAt: 'completedAt'
  };

  export type QuizSessionScalarFieldEnum = (typeof QuizSessionScalarFieldEnum)[keyof typeof QuizSessionScalarFieldEnum]


  export const QuizAnswerScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    questionId: 'questionId',
    optionId: 'optionId',
    createdAt: 'createdAt'
  };

  export type QuizAnswerScalarFieldEnum = (typeof QuizAnswerScalarFieldEnum)[keyof typeof QuizAnswerScalarFieldEnum]


  export const PersonalityResultScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    personalityCode: 'personalityCode',
    practicalScore: 'practicalScore',
    emotionalScore: 'emotionalScore',
    savingScore: 'savingScore',
    qualityScore: 'qualityScore',
    comfortScore: 'comfortScore',
    drivingScore: 'drivingScore',
    brandScore: 'brandScore',
    valueScore: 'valueScore'
  };

  export type PersonalityResultScalarFieldEnum = (typeof PersonalityResultScalarFieldEnum)[keyof typeof PersonalityResultScalarFieldEnum]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    brand: 'brand',
    series: 'series',
    modelName: 'modelName',
    priceMin: 'priceMin',
    priceMax: 'priceMax',
    energyType: 'energyType',
    bodyType: 'bodyType',
    heroImage: 'heroImage',
    summary: 'summary',
    recommendation: 'recommendation'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const VehicleDimensionWeightScalarFieldEnum: {
    id: 'id',
    vehicleId: 'vehicleId',
    practical: 'practical',
    emotional: 'emotional',
    saving: 'saving',
    quality: 'quality',
    comfort: 'comfort',
    driving: 'driving',
    brand: 'brand',
    value: 'value'
  };

  export type VehicleDimensionWeightScalarFieldEnum = (typeof VehicleDimensionWeightScalarFieldEnum)[keyof typeof VehicleDimensionWeightScalarFieldEnum]


  export const VehicleRecommendationScalarFieldEnum: {
    id: 'id',
    resultId: 'resultId',
    vehicleId: 'vehicleId',
    rank: 'rank',
    score: 'score',
    reason: 'reason'
  };

  export type VehicleRecommendationScalarFieldEnum = (typeof VehicleRecommendationScalarFieldEnum)[keyof typeof VehicleRecommendationScalarFieldEnum]


  export const BuyingGuideScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    title: 'title',
    excerpt: 'excerpt',
    body: 'body',
    relatedVehicleSlugs: 'relatedVehicleSlugs'
  };

  export type BuyingGuideScalarFieldEnum = (typeof BuyingGuideScalarFieldEnum)[keyof typeof BuyingGuideScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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


  export type QuizQuestionWhereInput = {
    AND?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    OR?: QuizQuestionWhereInput[]
    NOT?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    id?: StringFilter<"QuizQuestion"> | string
    slug?: StringFilter<"QuizQuestion"> | string
    title?: StringFilter<"QuizQuestion"> | string
    description?: StringNullableFilter<"QuizQuestion"> | string | null
    order?: IntFilter<"QuizQuestion"> | number
    options?: QuizOptionListRelationFilter
  }

  export type QuizQuestionOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    order?: SortOrder
    options?: QuizOptionOrderByRelationAggregateInput
  }

  export type QuizQuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    OR?: QuizQuestionWhereInput[]
    NOT?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    title?: StringFilter<"QuizQuestion"> | string
    description?: StringNullableFilter<"QuizQuestion"> | string | null
    order?: IntFilter<"QuizQuestion"> | number
    options?: QuizOptionListRelationFilter
  }, "id" | "slug">

  export type QuizQuestionOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    order?: SortOrder
    _count?: QuizQuestionCountOrderByAggregateInput
    _avg?: QuizQuestionAvgOrderByAggregateInput
    _max?: QuizQuestionMaxOrderByAggregateInput
    _min?: QuizQuestionMinOrderByAggregateInput
    _sum?: QuizQuestionSumOrderByAggregateInput
  }

  export type QuizQuestionScalarWhereWithAggregatesInput = {
    AND?: QuizQuestionScalarWhereWithAggregatesInput | QuizQuestionScalarWhereWithAggregatesInput[]
    OR?: QuizQuestionScalarWhereWithAggregatesInput[]
    NOT?: QuizQuestionScalarWhereWithAggregatesInput | QuizQuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuizQuestion"> | string
    slug?: StringWithAggregatesFilter<"QuizQuestion"> | string
    title?: StringWithAggregatesFilter<"QuizQuestion"> | string
    description?: StringNullableWithAggregatesFilter<"QuizQuestion"> | string | null
    order?: IntWithAggregatesFilter<"QuizQuestion"> | number
  }

  export type QuizOptionWhereInput = {
    AND?: QuizOptionWhereInput | QuizOptionWhereInput[]
    OR?: QuizOptionWhereInput[]
    NOT?: QuizOptionWhereInput | QuizOptionWhereInput[]
    id?: StringFilter<"QuizOption"> | string
    questionId?: StringFilter<"QuizOption"> | string
    label?: StringFilter<"QuizOption"> | string
    order?: IntFilter<"QuizOption"> | number
    weights?: JsonFilter<"QuizOption">
    question?: XOR<QuizQuestionScalarRelationFilter, QuizQuestionWhereInput>
  }

  export type QuizOptionOrderByWithRelationInput = {
    id?: SortOrder
    questionId?: SortOrder
    label?: SortOrder
    order?: SortOrder
    weights?: SortOrder
    question?: QuizQuestionOrderByWithRelationInput
  }

  export type QuizOptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuizOptionWhereInput | QuizOptionWhereInput[]
    OR?: QuizOptionWhereInput[]
    NOT?: QuizOptionWhereInput | QuizOptionWhereInput[]
    questionId?: StringFilter<"QuizOption"> | string
    label?: StringFilter<"QuizOption"> | string
    order?: IntFilter<"QuizOption"> | number
    weights?: JsonFilter<"QuizOption">
    question?: XOR<QuizQuestionScalarRelationFilter, QuizQuestionWhereInput>
  }, "id">

  export type QuizOptionOrderByWithAggregationInput = {
    id?: SortOrder
    questionId?: SortOrder
    label?: SortOrder
    order?: SortOrder
    weights?: SortOrder
    _count?: QuizOptionCountOrderByAggregateInput
    _avg?: QuizOptionAvgOrderByAggregateInput
    _max?: QuizOptionMaxOrderByAggregateInput
    _min?: QuizOptionMinOrderByAggregateInput
    _sum?: QuizOptionSumOrderByAggregateInput
  }

  export type QuizOptionScalarWhereWithAggregatesInput = {
    AND?: QuizOptionScalarWhereWithAggregatesInput | QuizOptionScalarWhereWithAggregatesInput[]
    OR?: QuizOptionScalarWhereWithAggregatesInput[]
    NOT?: QuizOptionScalarWhereWithAggregatesInput | QuizOptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuizOption"> | string
    questionId?: StringWithAggregatesFilter<"QuizOption"> | string
    label?: StringWithAggregatesFilter<"QuizOption"> | string
    order?: IntWithAggregatesFilter<"QuizOption"> | number
    weights?: JsonWithAggregatesFilter<"QuizOption">
  }

  export type QuizSessionWhereInput = {
    AND?: QuizSessionWhereInput | QuizSessionWhereInput[]
    OR?: QuizSessionWhereInput[]
    NOT?: QuizSessionWhereInput | QuizSessionWhereInput[]
    id?: StringFilter<"QuizSession"> | string
    status?: StringFilter<"QuizSession"> | string
    currentQuestion?: IntFilter<"QuizSession"> | number
    personalityCode?: StringNullableFilter<"QuizSession"> | string | null
    createdAt?: DateTimeFilter<"QuizSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"QuizSession"> | Date | string | null
    result?: XOR<PersonalityResultNullableScalarRelationFilter, PersonalityResultWhereInput> | null
    answers?: QuizAnswerListRelationFilter
  }

  export type QuizSessionOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    currentQuestion?: SortOrder
    personalityCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    result?: PersonalityResultOrderByWithRelationInput
    answers?: QuizAnswerOrderByRelationAggregateInput
  }

  export type QuizSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuizSessionWhereInput | QuizSessionWhereInput[]
    OR?: QuizSessionWhereInput[]
    NOT?: QuizSessionWhereInput | QuizSessionWhereInput[]
    status?: StringFilter<"QuizSession"> | string
    currentQuestion?: IntFilter<"QuizSession"> | number
    personalityCode?: StringNullableFilter<"QuizSession"> | string | null
    createdAt?: DateTimeFilter<"QuizSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"QuizSession"> | Date | string | null
    result?: XOR<PersonalityResultNullableScalarRelationFilter, PersonalityResultWhereInput> | null
    answers?: QuizAnswerListRelationFilter
  }, "id">

  export type QuizSessionOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    currentQuestion?: SortOrder
    personalityCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: QuizSessionCountOrderByAggregateInput
    _avg?: QuizSessionAvgOrderByAggregateInput
    _max?: QuizSessionMaxOrderByAggregateInput
    _min?: QuizSessionMinOrderByAggregateInput
    _sum?: QuizSessionSumOrderByAggregateInput
  }

  export type QuizSessionScalarWhereWithAggregatesInput = {
    AND?: QuizSessionScalarWhereWithAggregatesInput | QuizSessionScalarWhereWithAggregatesInput[]
    OR?: QuizSessionScalarWhereWithAggregatesInput[]
    NOT?: QuizSessionScalarWhereWithAggregatesInput | QuizSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuizSession"> | string
    status?: StringWithAggregatesFilter<"QuizSession"> | string
    currentQuestion?: IntWithAggregatesFilter<"QuizSession"> | number
    personalityCode?: StringNullableWithAggregatesFilter<"QuizSession"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"QuizSession"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"QuizSession"> | Date | string | null
  }

  export type QuizAnswerWhereInput = {
    AND?: QuizAnswerWhereInput | QuizAnswerWhereInput[]
    OR?: QuizAnswerWhereInput[]
    NOT?: QuizAnswerWhereInput | QuizAnswerWhereInput[]
    id?: StringFilter<"QuizAnswer"> | string
    sessionId?: StringFilter<"QuizAnswer"> | string
    questionId?: StringFilter<"QuizAnswer"> | string
    optionId?: StringFilter<"QuizAnswer"> | string
    createdAt?: DateTimeFilter<"QuizAnswer"> | Date | string
    session?: XOR<QuizSessionScalarRelationFilter, QuizSessionWhereInput>
  }

  export type QuizAnswerOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    optionId?: SortOrder
    createdAt?: SortOrder
    session?: QuizSessionOrderByWithRelationInput
  }

  export type QuizAnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuizAnswerWhereInput | QuizAnswerWhereInput[]
    OR?: QuizAnswerWhereInput[]
    NOT?: QuizAnswerWhereInput | QuizAnswerWhereInput[]
    sessionId?: StringFilter<"QuizAnswer"> | string
    questionId?: StringFilter<"QuizAnswer"> | string
    optionId?: StringFilter<"QuizAnswer"> | string
    createdAt?: DateTimeFilter<"QuizAnswer"> | Date | string
    session?: XOR<QuizSessionScalarRelationFilter, QuizSessionWhereInput>
  }, "id">

  export type QuizAnswerOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    optionId?: SortOrder
    createdAt?: SortOrder
    _count?: QuizAnswerCountOrderByAggregateInput
    _max?: QuizAnswerMaxOrderByAggregateInput
    _min?: QuizAnswerMinOrderByAggregateInput
  }

  export type QuizAnswerScalarWhereWithAggregatesInput = {
    AND?: QuizAnswerScalarWhereWithAggregatesInput | QuizAnswerScalarWhereWithAggregatesInput[]
    OR?: QuizAnswerScalarWhereWithAggregatesInput[]
    NOT?: QuizAnswerScalarWhereWithAggregatesInput | QuizAnswerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuizAnswer"> | string
    sessionId?: StringWithAggregatesFilter<"QuizAnswer"> | string
    questionId?: StringWithAggregatesFilter<"QuizAnswer"> | string
    optionId?: StringWithAggregatesFilter<"QuizAnswer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"QuizAnswer"> | Date | string
  }

  export type PersonalityResultWhereInput = {
    AND?: PersonalityResultWhereInput | PersonalityResultWhereInput[]
    OR?: PersonalityResultWhereInput[]
    NOT?: PersonalityResultWhereInput | PersonalityResultWhereInput[]
    id?: StringFilter<"PersonalityResult"> | string
    sessionId?: StringFilter<"PersonalityResult"> | string
    personalityCode?: StringFilter<"PersonalityResult"> | string
    practicalScore?: IntFilter<"PersonalityResult"> | number
    emotionalScore?: IntFilter<"PersonalityResult"> | number
    savingScore?: IntFilter<"PersonalityResult"> | number
    qualityScore?: IntFilter<"PersonalityResult"> | number
    comfortScore?: IntFilter<"PersonalityResult"> | number
    drivingScore?: IntFilter<"PersonalityResult"> | number
    brandScore?: IntFilter<"PersonalityResult"> | number
    valueScore?: IntFilter<"PersonalityResult"> | number
    session?: XOR<QuizSessionScalarRelationFilter, QuizSessionWhereInput>
    recommendations?: VehicleRecommendationListRelationFilter
  }

  export type PersonalityResultOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    personalityCode?: SortOrder
    practicalScore?: SortOrder
    emotionalScore?: SortOrder
    savingScore?: SortOrder
    qualityScore?: SortOrder
    comfortScore?: SortOrder
    drivingScore?: SortOrder
    brandScore?: SortOrder
    valueScore?: SortOrder
    session?: QuizSessionOrderByWithRelationInput
    recommendations?: VehicleRecommendationOrderByRelationAggregateInput
  }

  export type PersonalityResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId?: string
    AND?: PersonalityResultWhereInput | PersonalityResultWhereInput[]
    OR?: PersonalityResultWhereInput[]
    NOT?: PersonalityResultWhereInput | PersonalityResultWhereInput[]
    personalityCode?: StringFilter<"PersonalityResult"> | string
    practicalScore?: IntFilter<"PersonalityResult"> | number
    emotionalScore?: IntFilter<"PersonalityResult"> | number
    savingScore?: IntFilter<"PersonalityResult"> | number
    qualityScore?: IntFilter<"PersonalityResult"> | number
    comfortScore?: IntFilter<"PersonalityResult"> | number
    drivingScore?: IntFilter<"PersonalityResult"> | number
    brandScore?: IntFilter<"PersonalityResult"> | number
    valueScore?: IntFilter<"PersonalityResult"> | number
    session?: XOR<QuizSessionScalarRelationFilter, QuizSessionWhereInput>
    recommendations?: VehicleRecommendationListRelationFilter
  }, "id" | "sessionId">

  export type PersonalityResultOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    personalityCode?: SortOrder
    practicalScore?: SortOrder
    emotionalScore?: SortOrder
    savingScore?: SortOrder
    qualityScore?: SortOrder
    comfortScore?: SortOrder
    drivingScore?: SortOrder
    brandScore?: SortOrder
    valueScore?: SortOrder
    _count?: PersonalityResultCountOrderByAggregateInput
    _avg?: PersonalityResultAvgOrderByAggregateInput
    _max?: PersonalityResultMaxOrderByAggregateInput
    _min?: PersonalityResultMinOrderByAggregateInput
    _sum?: PersonalityResultSumOrderByAggregateInput
  }

  export type PersonalityResultScalarWhereWithAggregatesInput = {
    AND?: PersonalityResultScalarWhereWithAggregatesInput | PersonalityResultScalarWhereWithAggregatesInput[]
    OR?: PersonalityResultScalarWhereWithAggregatesInput[]
    NOT?: PersonalityResultScalarWhereWithAggregatesInput | PersonalityResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PersonalityResult"> | string
    sessionId?: StringWithAggregatesFilter<"PersonalityResult"> | string
    personalityCode?: StringWithAggregatesFilter<"PersonalityResult"> | string
    practicalScore?: IntWithAggregatesFilter<"PersonalityResult"> | number
    emotionalScore?: IntWithAggregatesFilter<"PersonalityResult"> | number
    savingScore?: IntWithAggregatesFilter<"PersonalityResult"> | number
    qualityScore?: IntWithAggregatesFilter<"PersonalityResult"> | number
    comfortScore?: IntWithAggregatesFilter<"PersonalityResult"> | number
    drivingScore?: IntWithAggregatesFilter<"PersonalityResult"> | number
    brandScore?: IntWithAggregatesFilter<"PersonalityResult"> | number
    valueScore?: IntWithAggregatesFilter<"PersonalityResult"> | number
  }

  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    slug?: StringFilter<"Vehicle"> | string
    brand?: StringFilter<"Vehicle"> | string
    series?: StringFilter<"Vehicle"> | string
    modelName?: StringFilter<"Vehicle"> | string
    priceMin?: IntFilter<"Vehicle"> | number
    priceMax?: IntFilter<"Vehicle"> | number
    energyType?: StringFilter<"Vehicle"> | string
    bodyType?: StringFilter<"Vehicle"> | string
    heroImage?: StringFilter<"Vehicle"> | string
    summary?: StringFilter<"Vehicle"> | string
    recommendation?: StringFilter<"Vehicle"> | string
    dimensionWeights?: XOR<VehicleDimensionWeightNullableScalarRelationFilter, VehicleDimensionWeightWhereInput> | null
    recommendations?: VehicleRecommendationListRelationFilter
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    brand?: SortOrder
    series?: SortOrder
    modelName?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
    energyType?: SortOrder
    bodyType?: SortOrder
    heroImage?: SortOrder
    summary?: SortOrder
    recommendation?: SortOrder
    dimensionWeights?: VehicleDimensionWeightOrderByWithRelationInput
    recommendations?: VehicleRecommendationOrderByRelationAggregateInput
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    brand?: StringFilter<"Vehicle"> | string
    series?: StringFilter<"Vehicle"> | string
    modelName?: StringFilter<"Vehicle"> | string
    priceMin?: IntFilter<"Vehicle"> | number
    priceMax?: IntFilter<"Vehicle"> | number
    energyType?: StringFilter<"Vehicle"> | string
    bodyType?: StringFilter<"Vehicle"> | string
    heroImage?: StringFilter<"Vehicle"> | string
    summary?: StringFilter<"Vehicle"> | string
    recommendation?: StringFilter<"Vehicle"> | string
    dimensionWeights?: XOR<VehicleDimensionWeightNullableScalarRelationFilter, VehicleDimensionWeightWhereInput> | null
    recommendations?: VehicleRecommendationListRelationFilter
  }, "id" | "slug">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    brand?: SortOrder
    series?: SortOrder
    modelName?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
    energyType?: SortOrder
    bodyType?: SortOrder
    heroImage?: SortOrder
    summary?: SortOrder
    recommendation?: SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _avg?: VehicleAvgOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
    _sum?: VehicleSumOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vehicle"> | string
    slug?: StringWithAggregatesFilter<"Vehicle"> | string
    brand?: StringWithAggregatesFilter<"Vehicle"> | string
    series?: StringWithAggregatesFilter<"Vehicle"> | string
    modelName?: StringWithAggregatesFilter<"Vehicle"> | string
    priceMin?: IntWithAggregatesFilter<"Vehicle"> | number
    priceMax?: IntWithAggregatesFilter<"Vehicle"> | number
    energyType?: StringWithAggregatesFilter<"Vehicle"> | string
    bodyType?: StringWithAggregatesFilter<"Vehicle"> | string
    heroImage?: StringWithAggregatesFilter<"Vehicle"> | string
    summary?: StringWithAggregatesFilter<"Vehicle"> | string
    recommendation?: StringWithAggregatesFilter<"Vehicle"> | string
  }

  export type VehicleDimensionWeightWhereInput = {
    AND?: VehicleDimensionWeightWhereInput | VehicleDimensionWeightWhereInput[]
    OR?: VehicleDimensionWeightWhereInput[]
    NOT?: VehicleDimensionWeightWhereInput | VehicleDimensionWeightWhereInput[]
    id?: StringFilter<"VehicleDimensionWeight"> | string
    vehicleId?: StringFilter<"VehicleDimensionWeight"> | string
    practical?: IntFilter<"VehicleDimensionWeight"> | number
    emotional?: IntFilter<"VehicleDimensionWeight"> | number
    saving?: IntFilter<"VehicleDimensionWeight"> | number
    quality?: IntFilter<"VehicleDimensionWeight"> | number
    comfort?: IntFilter<"VehicleDimensionWeight"> | number
    driving?: IntFilter<"VehicleDimensionWeight"> | number
    brand?: IntFilter<"VehicleDimensionWeight"> | number
    value?: IntFilter<"VehicleDimensionWeight"> | number
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }

  export type VehicleDimensionWeightOrderByWithRelationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    practical?: SortOrder
    emotional?: SortOrder
    saving?: SortOrder
    quality?: SortOrder
    comfort?: SortOrder
    driving?: SortOrder
    brand?: SortOrder
    value?: SortOrder
    vehicle?: VehicleOrderByWithRelationInput
  }

  export type VehicleDimensionWeightWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    vehicleId?: string
    AND?: VehicleDimensionWeightWhereInput | VehicleDimensionWeightWhereInput[]
    OR?: VehicleDimensionWeightWhereInput[]
    NOT?: VehicleDimensionWeightWhereInput | VehicleDimensionWeightWhereInput[]
    practical?: IntFilter<"VehicleDimensionWeight"> | number
    emotional?: IntFilter<"VehicleDimensionWeight"> | number
    saving?: IntFilter<"VehicleDimensionWeight"> | number
    quality?: IntFilter<"VehicleDimensionWeight"> | number
    comfort?: IntFilter<"VehicleDimensionWeight"> | number
    driving?: IntFilter<"VehicleDimensionWeight"> | number
    brand?: IntFilter<"VehicleDimensionWeight"> | number
    value?: IntFilter<"VehicleDimensionWeight"> | number
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }, "id" | "vehicleId">

  export type VehicleDimensionWeightOrderByWithAggregationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    practical?: SortOrder
    emotional?: SortOrder
    saving?: SortOrder
    quality?: SortOrder
    comfort?: SortOrder
    driving?: SortOrder
    brand?: SortOrder
    value?: SortOrder
    _count?: VehicleDimensionWeightCountOrderByAggregateInput
    _avg?: VehicleDimensionWeightAvgOrderByAggregateInput
    _max?: VehicleDimensionWeightMaxOrderByAggregateInput
    _min?: VehicleDimensionWeightMinOrderByAggregateInput
    _sum?: VehicleDimensionWeightSumOrderByAggregateInput
  }

  export type VehicleDimensionWeightScalarWhereWithAggregatesInput = {
    AND?: VehicleDimensionWeightScalarWhereWithAggregatesInput | VehicleDimensionWeightScalarWhereWithAggregatesInput[]
    OR?: VehicleDimensionWeightScalarWhereWithAggregatesInput[]
    NOT?: VehicleDimensionWeightScalarWhereWithAggregatesInput | VehicleDimensionWeightScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VehicleDimensionWeight"> | string
    vehicleId?: StringWithAggregatesFilter<"VehicleDimensionWeight"> | string
    practical?: IntWithAggregatesFilter<"VehicleDimensionWeight"> | number
    emotional?: IntWithAggregatesFilter<"VehicleDimensionWeight"> | number
    saving?: IntWithAggregatesFilter<"VehicleDimensionWeight"> | number
    quality?: IntWithAggregatesFilter<"VehicleDimensionWeight"> | number
    comfort?: IntWithAggregatesFilter<"VehicleDimensionWeight"> | number
    driving?: IntWithAggregatesFilter<"VehicleDimensionWeight"> | number
    brand?: IntWithAggregatesFilter<"VehicleDimensionWeight"> | number
    value?: IntWithAggregatesFilter<"VehicleDimensionWeight"> | number
  }

  export type VehicleRecommendationWhereInput = {
    AND?: VehicleRecommendationWhereInput | VehicleRecommendationWhereInput[]
    OR?: VehicleRecommendationWhereInput[]
    NOT?: VehicleRecommendationWhereInput | VehicleRecommendationWhereInput[]
    id?: StringFilter<"VehicleRecommendation"> | string
    resultId?: StringFilter<"VehicleRecommendation"> | string
    vehicleId?: StringFilter<"VehicleRecommendation"> | string
    rank?: IntFilter<"VehicleRecommendation"> | number
    score?: IntFilter<"VehicleRecommendation"> | number
    reason?: StringFilter<"VehicleRecommendation"> | string
    result?: XOR<PersonalityResultScalarRelationFilter, PersonalityResultWhereInput>
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }

  export type VehicleRecommendationOrderByWithRelationInput = {
    id?: SortOrder
    resultId?: SortOrder
    vehicleId?: SortOrder
    rank?: SortOrder
    score?: SortOrder
    reason?: SortOrder
    result?: PersonalityResultOrderByWithRelationInput
    vehicle?: VehicleOrderByWithRelationInput
  }

  export type VehicleRecommendationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VehicleRecommendationWhereInput | VehicleRecommendationWhereInput[]
    OR?: VehicleRecommendationWhereInput[]
    NOT?: VehicleRecommendationWhereInput | VehicleRecommendationWhereInput[]
    resultId?: StringFilter<"VehicleRecommendation"> | string
    vehicleId?: StringFilter<"VehicleRecommendation"> | string
    rank?: IntFilter<"VehicleRecommendation"> | number
    score?: IntFilter<"VehicleRecommendation"> | number
    reason?: StringFilter<"VehicleRecommendation"> | string
    result?: XOR<PersonalityResultScalarRelationFilter, PersonalityResultWhereInput>
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }, "id">

  export type VehicleRecommendationOrderByWithAggregationInput = {
    id?: SortOrder
    resultId?: SortOrder
    vehicleId?: SortOrder
    rank?: SortOrder
    score?: SortOrder
    reason?: SortOrder
    _count?: VehicleRecommendationCountOrderByAggregateInput
    _avg?: VehicleRecommendationAvgOrderByAggregateInput
    _max?: VehicleRecommendationMaxOrderByAggregateInput
    _min?: VehicleRecommendationMinOrderByAggregateInput
    _sum?: VehicleRecommendationSumOrderByAggregateInput
  }

  export type VehicleRecommendationScalarWhereWithAggregatesInput = {
    AND?: VehicleRecommendationScalarWhereWithAggregatesInput | VehicleRecommendationScalarWhereWithAggregatesInput[]
    OR?: VehicleRecommendationScalarWhereWithAggregatesInput[]
    NOT?: VehicleRecommendationScalarWhereWithAggregatesInput | VehicleRecommendationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VehicleRecommendation"> | string
    resultId?: StringWithAggregatesFilter<"VehicleRecommendation"> | string
    vehicleId?: StringWithAggregatesFilter<"VehicleRecommendation"> | string
    rank?: IntWithAggregatesFilter<"VehicleRecommendation"> | number
    score?: IntWithAggregatesFilter<"VehicleRecommendation"> | number
    reason?: StringWithAggregatesFilter<"VehicleRecommendation"> | string
  }

  export type BuyingGuideWhereInput = {
    AND?: BuyingGuideWhereInput | BuyingGuideWhereInput[]
    OR?: BuyingGuideWhereInput[]
    NOT?: BuyingGuideWhereInput | BuyingGuideWhereInput[]
    id?: StringFilter<"BuyingGuide"> | string
    slug?: StringFilter<"BuyingGuide"> | string
    title?: StringFilter<"BuyingGuide"> | string
    excerpt?: StringFilter<"BuyingGuide"> | string
    body?: StringFilter<"BuyingGuide"> | string
    relatedVehicleSlugs?: StringNullableListFilter<"BuyingGuide">
  }

  export type BuyingGuideOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    body?: SortOrder
    relatedVehicleSlugs?: SortOrder
  }

  export type BuyingGuideWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: BuyingGuideWhereInput | BuyingGuideWhereInput[]
    OR?: BuyingGuideWhereInput[]
    NOT?: BuyingGuideWhereInput | BuyingGuideWhereInput[]
    title?: StringFilter<"BuyingGuide"> | string
    excerpt?: StringFilter<"BuyingGuide"> | string
    body?: StringFilter<"BuyingGuide"> | string
    relatedVehicleSlugs?: StringNullableListFilter<"BuyingGuide">
  }, "id" | "slug">

  export type BuyingGuideOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    body?: SortOrder
    relatedVehicleSlugs?: SortOrder
    _count?: BuyingGuideCountOrderByAggregateInput
    _max?: BuyingGuideMaxOrderByAggregateInput
    _min?: BuyingGuideMinOrderByAggregateInput
  }

  export type BuyingGuideScalarWhereWithAggregatesInput = {
    AND?: BuyingGuideScalarWhereWithAggregatesInput | BuyingGuideScalarWhereWithAggregatesInput[]
    OR?: BuyingGuideScalarWhereWithAggregatesInput[]
    NOT?: BuyingGuideScalarWhereWithAggregatesInput | BuyingGuideScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BuyingGuide"> | string
    slug?: StringWithAggregatesFilter<"BuyingGuide"> | string
    title?: StringWithAggregatesFilter<"BuyingGuide"> | string
    excerpt?: StringWithAggregatesFilter<"BuyingGuide"> | string
    body?: StringWithAggregatesFilter<"BuyingGuide"> | string
    relatedVehicleSlugs?: StringNullableListFilter<"BuyingGuide">
  }

  export type QuizQuestionCreateInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    order: number
    options?: QuizOptionCreateNestedManyWithoutQuestionInput
  }

  export type QuizQuestionUncheckedCreateInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    order: number
    options?: QuizOptionUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuizQuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    options?: QuizOptionUpdateManyWithoutQuestionNestedInput
  }

  export type QuizQuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    options?: QuizOptionUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuizQuestionCreateManyInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    order: number
  }

  export type QuizQuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }

  export type QuizQuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }

  export type QuizOptionCreateInput = {
    id?: string
    label: string
    order: number
    weights: JsonNullValueInput | InputJsonValue
    question: QuizQuestionCreateNestedOneWithoutOptionsInput
  }

  export type QuizOptionUncheckedCreateInput = {
    id?: string
    questionId: string
    label: string
    order: number
    weights: JsonNullValueInput | InputJsonValue
  }

  export type QuizOptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    weights?: JsonNullValueInput | InputJsonValue
    question?: QuizQuestionUpdateOneRequiredWithoutOptionsNestedInput
  }

  export type QuizOptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    weights?: JsonNullValueInput | InputJsonValue
  }

  export type QuizOptionCreateManyInput = {
    id?: string
    questionId: string
    label: string
    order: number
    weights: JsonNullValueInput | InputJsonValue
  }

  export type QuizOptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    weights?: JsonNullValueInput | InputJsonValue
  }

  export type QuizOptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    weights?: JsonNullValueInput | InputJsonValue
  }

  export type QuizSessionCreateInput = {
    id?: string
    status: string
    currentQuestion?: number
    personalityCode?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    result?: PersonalityResultCreateNestedOneWithoutSessionInput
    answers?: QuizAnswerCreateNestedManyWithoutSessionInput
  }

  export type QuizSessionUncheckedCreateInput = {
    id?: string
    status: string
    currentQuestion?: number
    personalityCode?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    result?: PersonalityResultUncheckedCreateNestedOneWithoutSessionInput
    answers?: QuizAnswerUncheckedCreateNestedManyWithoutSessionInput
  }

  export type QuizSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentQuestion?: IntFieldUpdateOperationsInput | number
    personalityCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: PersonalityResultUpdateOneWithoutSessionNestedInput
    answers?: QuizAnswerUpdateManyWithoutSessionNestedInput
  }

  export type QuizSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentQuestion?: IntFieldUpdateOperationsInput | number
    personalityCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: PersonalityResultUncheckedUpdateOneWithoutSessionNestedInput
    answers?: QuizAnswerUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type QuizSessionCreateManyInput = {
    id?: string
    status: string
    currentQuestion?: number
    personalityCode?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type QuizSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentQuestion?: IntFieldUpdateOperationsInput | number
    personalityCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QuizSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentQuestion?: IntFieldUpdateOperationsInput | number
    personalityCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QuizAnswerCreateInput = {
    id?: string
    questionId: string
    optionId: string
    createdAt?: Date | string
    session: QuizSessionCreateNestedOneWithoutAnswersInput
  }

  export type QuizAnswerUncheckedCreateInput = {
    id?: string
    sessionId: string
    questionId: string
    optionId: string
    createdAt?: Date | string
  }

  export type QuizAnswerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    optionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: QuizSessionUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type QuizAnswerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    optionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAnswerCreateManyInput = {
    id?: string
    sessionId: string
    questionId: string
    optionId: string
    createdAt?: Date | string
  }

  export type QuizAnswerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    optionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAnswerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    optionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalityResultCreateInput = {
    id?: string
    personalityCode: string
    practicalScore: number
    emotionalScore: number
    savingScore: number
    qualityScore: number
    comfortScore: number
    drivingScore: number
    brandScore: number
    valueScore: number
    session: QuizSessionCreateNestedOneWithoutResultInput
    recommendations?: VehicleRecommendationCreateNestedManyWithoutResultInput
  }

  export type PersonalityResultUncheckedCreateInput = {
    id?: string
    sessionId: string
    personalityCode: string
    practicalScore: number
    emotionalScore: number
    savingScore: number
    qualityScore: number
    comfortScore: number
    drivingScore: number
    brandScore: number
    valueScore: number
    recommendations?: VehicleRecommendationUncheckedCreateNestedManyWithoutResultInput
  }

  export type PersonalityResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    personalityCode?: StringFieldUpdateOperationsInput | string
    practicalScore?: IntFieldUpdateOperationsInput | number
    emotionalScore?: IntFieldUpdateOperationsInput | number
    savingScore?: IntFieldUpdateOperationsInput | number
    qualityScore?: IntFieldUpdateOperationsInput | number
    comfortScore?: IntFieldUpdateOperationsInput | number
    drivingScore?: IntFieldUpdateOperationsInput | number
    brandScore?: IntFieldUpdateOperationsInput | number
    valueScore?: IntFieldUpdateOperationsInput | number
    session?: QuizSessionUpdateOneRequiredWithoutResultNestedInput
    recommendations?: VehicleRecommendationUpdateManyWithoutResultNestedInput
  }

  export type PersonalityResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    personalityCode?: StringFieldUpdateOperationsInput | string
    practicalScore?: IntFieldUpdateOperationsInput | number
    emotionalScore?: IntFieldUpdateOperationsInput | number
    savingScore?: IntFieldUpdateOperationsInput | number
    qualityScore?: IntFieldUpdateOperationsInput | number
    comfortScore?: IntFieldUpdateOperationsInput | number
    drivingScore?: IntFieldUpdateOperationsInput | number
    brandScore?: IntFieldUpdateOperationsInput | number
    valueScore?: IntFieldUpdateOperationsInput | number
    recommendations?: VehicleRecommendationUncheckedUpdateManyWithoutResultNestedInput
  }

  export type PersonalityResultCreateManyInput = {
    id?: string
    sessionId: string
    personalityCode: string
    practicalScore: number
    emotionalScore: number
    savingScore: number
    qualityScore: number
    comfortScore: number
    drivingScore: number
    brandScore: number
    valueScore: number
  }

  export type PersonalityResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    personalityCode?: StringFieldUpdateOperationsInput | string
    practicalScore?: IntFieldUpdateOperationsInput | number
    emotionalScore?: IntFieldUpdateOperationsInput | number
    savingScore?: IntFieldUpdateOperationsInput | number
    qualityScore?: IntFieldUpdateOperationsInput | number
    comfortScore?: IntFieldUpdateOperationsInput | number
    drivingScore?: IntFieldUpdateOperationsInput | number
    brandScore?: IntFieldUpdateOperationsInput | number
    valueScore?: IntFieldUpdateOperationsInput | number
  }

  export type PersonalityResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    personalityCode?: StringFieldUpdateOperationsInput | string
    practicalScore?: IntFieldUpdateOperationsInput | number
    emotionalScore?: IntFieldUpdateOperationsInput | number
    savingScore?: IntFieldUpdateOperationsInput | number
    qualityScore?: IntFieldUpdateOperationsInput | number
    comfortScore?: IntFieldUpdateOperationsInput | number
    drivingScore?: IntFieldUpdateOperationsInput | number
    brandScore?: IntFieldUpdateOperationsInput | number
    valueScore?: IntFieldUpdateOperationsInput | number
  }

  export type VehicleCreateInput = {
    id?: string
    slug: string
    brand: string
    series: string
    modelName: string
    priceMin: number
    priceMax: number
    energyType: string
    bodyType: string
    heroImage: string
    summary: string
    recommendation: string
    dimensionWeights?: VehicleDimensionWeightCreateNestedOneWithoutVehicleInput
    recommendations?: VehicleRecommendationCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateInput = {
    id?: string
    slug: string
    brand: string
    series: string
    modelName: string
    priceMin: number
    priceMax: number
    energyType: string
    bodyType: string
    heroImage: string
    summary: string
    recommendation: string
    dimensionWeights?: VehicleDimensionWeightUncheckedCreateNestedOneWithoutVehicleInput
    recommendations?: VehicleRecommendationUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    series?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    priceMin?: IntFieldUpdateOperationsInput | number
    priceMax?: IntFieldUpdateOperationsInput | number
    energyType?: StringFieldUpdateOperationsInput | string
    bodyType?: StringFieldUpdateOperationsInput | string
    heroImage?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    dimensionWeights?: VehicleDimensionWeightUpdateOneWithoutVehicleNestedInput
    recommendations?: VehicleRecommendationUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    series?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    priceMin?: IntFieldUpdateOperationsInput | number
    priceMax?: IntFieldUpdateOperationsInput | number
    energyType?: StringFieldUpdateOperationsInput | string
    bodyType?: StringFieldUpdateOperationsInput | string
    heroImage?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    dimensionWeights?: VehicleDimensionWeightUncheckedUpdateOneWithoutVehicleNestedInput
    recommendations?: VehicleRecommendationUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleCreateManyInput = {
    id?: string
    slug: string
    brand: string
    series: string
    modelName: string
    priceMin: number
    priceMax: number
    energyType: string
    bodyType: string
    heroImage: string
    summary: string
    recommendation: string
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    series?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    priceMin?: IntFieldUpdateOperationsInput | number
    priceMax?: IntFieldUpdateOperationsInput | number
    energyType?: StringFieldUpdateOperationsInput | string
    bodyType?: StringFieldUpdateOperationsInput | string
    heroImage?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    series?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    priceMin?: IntFieldUpdateOperationsInput | number
    priceMax?: IntFieldUpdateOperationsInput | number
    energyType?: StringFieldUpdateOperationsInput | string
    bodyType?: StringFieldUpdateOperationsInput | string
    heroImage?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleDimensionWeightCreateInput = {
    id?: string
    practical: number
    emotional: number
    saving: number
    quality: number
    comfort: number
    driving: number
    brand: number
    value: number
    vehicle: VehicleCreateNestedOneWithoutDimensionWeightsInput
  }

  export type VehicleDimensionWeightUncheckedCreateInput = {
    id?: string
    vehicleId: string
    practical: number
    emotional: number
    saving: number
    quality: number
    comfort: number
    driving: number
    brand: number
    value: number
  }

  export type VehicleDimensionWeightUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    practical?: IntFieldUpdateOperationsInput | number
    emotional?: IntFieldUpdateOperationsInput | number
    saving?: IntFieldUpdateOperationsInput | number
    quality?: IntFieldUpdateOperationsInput | number
    comfort?: IntFieldUpdateOperationsInput | number
    driving?: IntFieldUpdateOperationsInput | number
    brand?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
    vehicle?: VehicleUpdateOneRequiredWithoutDimensionWeightsNestedInput
  }

  export type VehicleDimensionWeightUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    practical?: IntFieldUpdateOperationsInput | number
    emotional?: IntFieldUpdateOperationsInput | number
    saving?: IntFieldUpdateOperationsInput | number
    quality?: IntFieldUpdateOperationsInput | number
    comfort?: IntFieldUpdateOperationsInput | number
    driving?: IntFieldUpdateOperationsInput | number
    brand?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
  }

  export type VehicleDimensionWeightCreateManyInput = {
    id?: string
    vehicleId: string
    practical: number
    emotional: number
    saving: number
    quality: number
    comfort: number
    driving: number
    brand: number
    value: number
  }

  export type VehicleDimensionWeightUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    practical?: IntFieldUpdateOperationsInput | number
    emotional?: IntFieldUpdateOperationsInput | number
    saving?: IntFieldUpdateOperationsInput | number
    quality?: IntFieldUpdateOperationsInput | number
    comfort?: IntFieldUpdateOperationsInput | number
    driving?: IntFieldUpdateOperationsInput | number
    brand?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
  }

  export type VehicleDimensionWeightUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    practical?: IntFieldUpdateOperationsInput | number
    emotional?: IntFieldUpdateOperationsInput | number
    saving?: IntFieldUpdateOperationsInput | number
    quality?: IntFieldUpdateOperationsInput | number
    comfort?: IntFieldUpdateOperationsInput | number
    driving?: IntFieldUpdateOperationsInput | number
    brand?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
  }

  export type VehicleRecommendationCreateInput = {
    id?: string
    rank: number
    score: number
    reason: string
    result: PersonalityResultCreateNestedOneWithoutRecommendationsInput
    vehicle: VehicleCreateNestedOneWithoutRecommendationsInput
  }

  export type VehicleRecommendationUncheckedCreateInput = {
    id?: string
    resultId: string
    vehicleId: string
    rank: number
    score: number
    reason: string
  }

  export type VehicleRecommendationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    result?: PersonalityResultUpdateOneRequiredWithoutRecommendationsNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutRecommendationsNestedInput
  }

  export type VehicleRecommendationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    resultId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleRecommendationCreateManyInput = {
    id?: string
    resultId: string
    vehicleId: string
    rank: number
    score: number
    reason: string
  }

  export type VehicleRecommendationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleRecommendationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    resultId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
  }

  export type BuyingGuideCreateInput = {
    id?: string
    slug: string
    title: string
    excerpt: string
    body: string
    relatedVehicleSlugs?: BuyingGuideCreaterelatedVehicleSlugsInput | string[]
  }

  export type BuyingGuideUncheckedCreateInput = {
    id?: string
    slug: string
    title: string
    excerpt: string
    body: string
    relatedVehicleSlugs?: BuyingGuideCreaterelatedVehicleSlugsInput | string[]
  }

  export type BuyingGuideUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    relatedVehicleSlugs?: BuyingGuideUpdaterelatedVehicleSlugsInput | string[]
  }

  export type BuyingGuideUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    relatedVehicleSlugs?: BuyingGuideUpdaterelatedVehicleSlugsInput | string[]
  }

  export type BuyingGuideCreateManyInput = {
    id?: string
    slug: string
    title: string
    excerpt: string
    body: string
    relatedVehicleSlugs?: BuyingGuideCreaterelatedVehicleSlugsInput | string[]
  }

  export type BuyingGuideUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    relatedVehicleSlugs?: BuyingGuideUpdaterelatedVehicleSlugsInput | string[]
  }

  export type BuyingGuideUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    relatedVehicleSlugs?: BuyingGuideUpdaterelatedVehicleSlugsInput | string[]
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

  export type QuizOptionListRelationFilter = {
    every?: QuizOptionWhereInput
    some?: QuizOptionWhereInput
    none?: QuizOptionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type QuizOptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuizQuestionCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    order?: SortOrder
  }

  export type QuizQuestionAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type QuizQuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    order?: SortOrder
  }

  export type QuizQuestionMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    order?: SortOrder
  }

  export type QuizQuestionSumOrderByAggregateInput = {
    order?: SortOrder
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

  export type QuizQuestionScalarRelationFilter = {
    is?: QuizQuestionWhereInput
    isNot?: QuizQuestionWhereInput
  }

  export type QuizOptionCountOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    label?: SortOrder
    order?: SortOrder
    weights?: SortOrder
  }

  export type QuizOptionAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type QuizOptionMaxOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    label?: SortOrder
    order?: SortOrder
  }

  export type QuizOptionMinOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    label?: SortOrder
    order?: SortOrder
  }

  export type QuizOptionSumOrderByAggregateInput = {
    order?: SortOrder
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

  export type PersonalityResultNullableScalarRelationFilter = {
    is?: PersonalityResultWhereInput | null
    isNot?: PersonalityResultWhereInput | null
  }

  export type QuizAnswerListRelationFilter = {
    every?: QuizAnswerWhereInput
    some?: QuizAnswerWhereInput
    none?: QuizAnswerWhereInput
  }

  export type QuizAnswerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuizSessionCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    currentQuestion?: SortOrder
    personalityCode?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type QuizSessionAvgOrderByAggregateInput = {
    currentQuestion?: SortOrder
  }

  export type QuizSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    currentQuestion?: SortOrder
    personalityCode?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type QuizSessionMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    currentQuestion?: SortOrder
    personalityCode?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type QuizSessionSumOrderByAggregateInput = {
    currentQuestion?: SortOrder
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

  export type QuizSessionScalarRelationFilter = {
    is?: QuizSessionWhereInput
    isNot?: QuizSessionWhereInput
  }

  export type QuizAnswerCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    optionId?: SortOrder
    createdAt?: SortOrder
  }

  export type QuizAnswerMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    optionId?: SortOrder
    createdAt?: SortOrder
  }

  export type QuizAnswerMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    optionId?: SortOrder
    createdAt?: SortOrder
  }

  export type VehicleRecommendationListRelationFilter = {
    every?: VehicleRecommendationWhereInput
    some?: VehicleRecommendationWhereInput
    none?: VehicleRecommendationWhereInput
  }

  export type VehicleRecommendationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PersonalityResultCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    personalityCode?: SortOrder
    practicalScore?: SortOrder
    emotionalScore?: SortOrder
    savingScore?: SortOrder
    qualityScore?: SortOrder
    comfortScore?: SortOrder
    drivingScore?: SortOrder
    brandScore?: SortOrder
    valueScore?: SortOrder
  }

  export type PersonalityResultAvgOrderByAggregateInput = {
    practicalScore?: SortOrder
    emotionalScore?: SortOrder
    savingScore?: SortOrder
    qualityScore?: SortOrder
    comfortScore?: SortOrder
    drivingScore?: SortOrder
    brandScore?: SortOrder
    valueScore?: SortOrder
  }

  export type PersonalityResultMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    personalityCode?: SortOrder
    practicalScore?: SortOrder
    emotionalScore?: SortOrder
    savingScore?: SortOrder
    qualityScore?: SortOrder
    comfortScore?: SortOrder
    drivingScore?: SortOrder
    brandScore?: SortOrder
    valueScore?: SortOrder
  }

  export type PersonalityResultMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    personalityCode?: SortOrder
    practicalScore?: SortOrder
    emotionalScore?: SortOrder
    savingScore?: SortOrder
    qualityScore?: SortOrder
    comfortScore?: SortOrder
    drivingScore?: SortOrder
    brandScore?: SortOrder
    valueScore?: SortOrder
  }

  export type PersonalityResultSumOrderByAggregateInput = {
    practicalScore?: SortOrder
    emotionalScore?: SortOrder
    savingScore?: SortOrder
    qualityScore?: SortOrder
    comfortScore?: SortOrder
    drivingScore?: SortOrder
    brandScore?: SortOrder
    valueScore?: SortOrder
  }

  export type VehicleDimensionWeightNullableScalarRelationFilter = {
    is?: VehicleDimensionWeightWhereInput | null
    isNot?: VehicleDimensionWeightWhereInput | null
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    brand?: SortOrder
    series?: SortOrder
    modelName?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
    energyType?: SortOrder
    bodyType?: SortOrder
    heroImage?: SortOrder
    summary?: SortOrder
    recommendation?: SortOrder
  }

  export type VehicleAvgOrderByAggregateInput = {
    priceMin?: SortOrder
    priceMax?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    brand?: SortOrder
    series?: SortOrder
    modelName?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
    energyType?: SortOrder
    bodyType?: SortOrder
    heroImage?: SortOrder
    summary?: SortOrder
    recommendation?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    brand?: SortOrder
    series?: SortOrder
    modelName?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
    energyType?: SortOrder
    bodyType?: SortOrder
    heroImage?: SortOrder
    summary?: SortOrder
    recommendation?: SortOrder
  }

  export type VehicleSumOrderByAggregateInput = {
    priceMin?: SortOrder
    priceMax?: SortOrder
  }

  export type VehicleScalarRelationFilter = {
    is?: VehicleWhereInput
    isNot?: VehicleWhereInput
  }

  export type VehicleDimensionWeightCountOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    practical?: SortOrder
    emotional?: SortOrder
    saving?: SortOrder
    quality?: SortOrder
    comfort?: SortOrder
    driving?: SortOrder
    brand?: SortOrder
    value?: SortOrder
  }

  export type VehicleDimensionWeightAvgOrderByAggregateInput = {
    practical?: SortOrder
    emotional?: SortOrder
    saving?: SortOrder
    quality?: SortOrder
    comfort?: SortOrder
    driving?: SortOrder
    brand?: SortOrder
    value?: SortOrder
  }

  export type VehicleDimensionWeightMaxOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    practical?: SortOrder
    emotional?: SortOrder
    saving?: SortOrder
    quality?: SortOrder
    comfort?: SortOrder
    driving?: SortOrder
    brand?: SortOrder
    value?: SortOrder
  }

  export type VehicleDimensionWeightMinOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    practical?: SortOrder
    emotional?: SortOrder
    saving?: SortOrder
    quality?: SortOrder
    comfort?: SortOrder
    driving?: SortOrder
    brand?: SortOrder
    value?: SortOrder
  }

  export type VehicleDimensionWeightSumOrderByAggregateInput = {
    practical?: SortOrder
    emotional?: SortOrder
    saving?: SortOrder
    quality?: SortOrder
    comfort?: SortOrder
    driving?: SortOrder
    brand?: SortOrder
    value?: SortOrder
  }

  export type PersonalityResultScalarRelationFilter = {
    is?: PersonalityResultWhereInput
    isNot?: PersonalityResultWhereInput
  }

  export type VehicleRecommendationCountOrderByAggregateInput = {
    id?: SortOrder
    resultId?: SortOrder
    vehicleId?: SortOrder
    rank?: SortOrder
    score?: SortOrder
    reason?: SortOrder
  }

  export type VehicleRecommendationAvgOrderByAggregateInput = {
    rank?: SortOrder
    score?: SortOrder
  }

  export type VehicleRecommendationMaxOrderByAggregateInput = {
    id?: SortOrder
    resultId?: SortOrder
    vehicleId?: SortOrder
    rank?: SortOrder
    score?: SortOrder
    reason?: SortOrder
  }

  export type VehicleRecommendationMinOrderByAggregateInput = {
    id?: SortOrder
    resultId?: SortOrder
    vehicleId?: SortOrder
    rank?: SortOrder
    score?: SortOrder
    reason?: SortOrder
  }

  export type VehicleRecommendationSumOrderByAggregateInput = {
    rank?: SortOrder
    score?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BuyingGuideCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    body?: SortOrder
    relatedVehicleSlugs?: SortOrder
  }

  export type BuyingGuideMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    body?: SortOrder
  }

  export type BuyingGuideMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    body?: SortOrder
  }

  export type QuizOptionCreateNestedManyWithoutQuestionInput = {
    create?: XOR<QuizOptionCreateWithoutQuestionInput, QuizOptionUncheckedCreateWithoutQuestionInput> | QuizOptionCreateWithoutQuestionInput[] | QuizOptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: QuizOptionCreateOrConnectWithoutQuestionInput | QuizOptionCreateOrConnectWithoutQuestionInput[]
    createMany?: QuizOptionCreateManyQuestionInputEnvelope
    connect?: QuizOptionWhereUniqueInput | QuizOptionWhereUniqueInput[]
  }

  export type QuizOptionUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<QuizOptionCreateWithoutQuestionInput, QuizOptionUncheckedCreateWithoutQuestionInput> | QuizOptionCreateWithoutQuestionInput[] | QuizOptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: QuizOptionCreateOrConnectWithoutQuestionInput | QuizOptionCreateOrConnectWithoutQuestionInput[]
    createMany?: QuizOptionCreateManyQuestionInputEnvelope
    connect?: QuizOptionWhereUniqueInput | QuizOptionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type QuizOptionUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<QuizOptionCreateWithoutQuestionInput, QuizOptionUncheckedCreateWithoutQuestionInput> | QuizOptionCreateWithoutQuestionInput[] | QuizOptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: QuizOptionCreateOrConnectWithoutQuestionInput | QuizOptionCreateOrConnectWithoutQuestionInput[]
    upsert?: QuizOptionUpsertWithWhereUniqueWithoutQuestionInput | QuizOptionUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: QuizOptionCreateManyQuestionInputEnvelope
    set?: QuizOptionWhereUniqueInput | QuizOptionWhereUniqueInput[]
    disconnect?: QuizOptionWhereUniqueInput | QuizOptionWhereUniqueInput[]
    delete?: QuizOptionWhereUniqueInput | QuizOptionWhereUniqueInput[]
    connect?: QuizOptionWhereUniqueInput | QuizOptionWhereUniqueInput[]
    update?: QuizOptionUpdateWithWhereUniqueWithoutQuestionInput | QuizOptionUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: QuizOptionUpdateManyWithWhereWithoutQuestionInput | QuizOptionUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: QuizOptionScalarWhereInput | QuizOptionScalarWhereInput[]
  }

  export type QuizOptionUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<QuizOptionCreateWithoutQuestionInput, QuizOptionUncheckedCreateWithoutQuestionInput> | QuizOptionCreateWithoutQuestionInput[] | QuizOptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: QuizOptionCreateOrConnectWithoutQuestionInput | QuizOptionCreateOrConnectWithoutQuestionInput[]
    upsert?: QuizOptionUpsertWithWhereUniqueWithoutQuestionInput | QuizOptionUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: QuizOptionCreateManyQuestionInputEnvelope
    set?: QuizOptionWhereUniqueInput | QuizOptionWhereUniqueInput[]
    disconnect?: QuizOptionWhereUniqueInput | QuizOptionWhereUniqueInput[]
    delete?: QuizOptionWhereUniqueInput | QuizOptionWhereUniqueInput[]
    connect?: QuizOptionWhereUniqueInput | QuizOptionWhereUniqueInput[]
    update?: QuizOptionUpdateWithWhereUniqueWithoutQuestionInput | QuizOptionUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: QuizOptionUpdateManyWithWhereWithoutQuestionInput | QuizOptionUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: QuizOptionScalarWhereInput | QuizOptionScalarWhereInput[]
  }

  export type QuizQuestionCreateNestedOneWithoutOptionsInput = {
    create?: XOR<QuizQuestionCreateWithoutOptionsInput, QuizQuestionUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutOptionsInput
    connect?: QuizQuestionWhereUniqueInput
  }

  export type QuizQuestionUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: XOR<QuizQuestionCreateWithoutOptionsInput, QuizQuestionUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutOptionsInput
    upsert?: QuizQuestionUpsertWithoutOptionsInput
    connect?: QuizQuestionWhereUniqueInput
    update?: XOR<XOR<QuizQuestionUpdateToOneWithWhereWithoutOptionsInput, QuizQuestionUpdateWithoutOptionsInput>, QuizQuestionUncheckedUpdateWithoutOptionsInput>
  }

  export type PersonalityResultCreateNestedOneWithoutSessionInput = {
    create?: XOR<PersonalityResultCreateWithoutSessionInput, PersonalityResultUncheckedCreateWithoutSessionInput>
    connectOrCreate?: PersonalityResultCreateOrConnectWithoutSessionInput
    connect?: PersonalityResultWhereUniqueInput
  }

  export type QuizAnswerCreateNestedManyWithoutSessionInput = {
    create?: XOR<QuizAnswerCreateWithoutSessionInput, QuizAnswerUncheckedCreateWithoutSessionInput> | QuizAnswerCreateWithoutSessionInput[] | QuizAnswerUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: QuizAnswerCreateOrConnectWithoutSessionInput | QuizAnswerCreateOrConnectWithoutSessionInput[]
    createMany?: QuizAnswerCreateManySessionInputEnvelope
    connect?: QuizAnswerWhereUniqueInput | QuizAnswerWhereUniqueInput[]
  }

  export type PersonalityResultUncheckedCreateNestedOneWithoutSessionInput = {
    create?: XOR<PersonalityResultCreateWithoutSessionInput, PersonalityResultUncheckedCreateWithoutSessionInput>
    connectOrCreate?: PersonalityResultCreateOrConnectWithoutSessionInput
    connect?: PersonalityResultWhereUniqueInput
  }

  export type QuizAnswerUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<QuizAnswerCreateWithoutSessionInput, QuizAnswerUncheckedCreateWithoutSessionInput> | QuizAnswerCreateWithoutSessionInput[] | QuizAnswerUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: QuizAnswerCreateOrConnectWithoutSessionInput | QuizAnswerCreateOrConnectWithoutSessionInput[]
    createMany?: QuizAnswerCreateManySessionInputEnvelope
    connect?: QuizAnswerWhereUniqueInput | QuizAnswerWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PersonalityResultUpdateOneWithoutSessionNestedInput = {
    create?: XOR<PersonalityResultCreateWithoutSessionInput, PersonalityResultUncheckedCreateWithoutSessionInput>
    connectOrCreate?: PersonalityResultCreateOrConnectWithoutSessionInput
    upsert?: PersonalityResultUpsertWithoutSessionInput
    disconnect?: PersonalityResultWhereInput | boolean
    delete?: PersonalityResultWhereInput | boolean
    connect?: PersonalityResultWhereUniqueInput
    update?: XOR<XOR<PersonalityResultUpdateToOneWithWhereWithoutSessionInput, PersonalityResultUpdateWithoutSessionInput>, PersonalityResultUncheckedUpdateWithoutSessionInput>
  }

  export type QuizAnswerUpdateManyWithoutSessionNestedInput = {
    create?: XOR<QuizAnswerCreateWithoutSessionInput, QuizAnswerUncheckedCreateWithoutSessionInput> | QuizAnswerCreateWithoutSessionInput[] | QuizAnswerUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: QuizAnswerCreateOrConnectWithoutSessionInput | QuizAnswerCreateOrConnectWithoutSessionInput[]
    upsert?: QuizAnswerUpsertWithWhereUniqueWithoutSessionInput | QuizAnswerUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: QuizAnswerCreateManySessionInputEnvelope
    set?: QuizAnswerWhereUniqueInput | QuizAnswerWhereUniqueInput[]
    disconnect?: QuizAnswerWhereUniqueInput | QuizAnswerWhereUniqueInput[]
    delete?: QuizAnswerWhereUniqueInput | QuizAnswerWhereUniqueInput[]
    connect?: QuizAnswerWhereUniqueInput | QuizAnswerWhereUniqueInput[]
    update?: QuizAnswerUpdateWithWhereUniqueWithoutSessionInput | QuizAnswerUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: QuizAnswerUpdateManyWithWhereWithoutSessionInput | QuizAnswerUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: QuizAnswerScalarWhereInput | QuizAnswerScalarWhereInput[]
  }

  export type PersonalityResultUncheckedUpdateOneWithoutSessionNestedInput = {
    create?: XOR<PersonalityResultCreateWithoutSessionInput, PersonalityResultUncheckedCreateWithoutSessionInput>
    connectOrCreate?: PersonalityResultCreateOrConnectWithoutSessionInput
    upsert?: PersonalityResultUpsertWithoutSessionInput
    disconnect?: PersonalityResultWhereInput | boolean
    delete?: PersonalityResultWhereInput | boolean
    connect?: PersonalityResultWhereUniqueInput
    update?: XOR<XOR<PersonalityResultUpdateToOneWithWhereWithoutSessionInput, PersonalityResultUpdateWithoutSessionInput>, PersonalityResultUncheckedUpdateWithoutSessionInput>
  }

  export type QuizAnswerUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<QuizAnswerCreateWithoutSessionInput, QuizAnswerUncheckedCreateWithoutSessionInput> | QuizAnswerCreateWithoutSessionInput[] | QuizAnswerUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: QuizAnswerCreateOrConnectWithoutSessionInput | QuizAnswerCreateOrConnectWithoutSessionInput[]
    upsert?: QuizAnswerUpsertWithWhereUniqueWithoutSessionInput | QuizAnswerUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: QuizAnswerCreateManySessionInputEnvelope
    set?: QuizAnswerWhereUniqueInput | QuizAnswerWhereUniqueInput[]
    disconnect?: QuizAnswerWhereUniqueInput | QuizAnswerWhereUniqueInput[]
    delete?: QuizAnswerWhereUniqueInput | QuizAnswerWhereUniqueInput[]
    connect?: QuizAnswerWhereUniqueInput | QuizAnswerWhereUniqueInput[]
    update?: QuizAnswerUpdateWithWhereUniqueWithoutSessionInput | QuizAnswerUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: QuizAnswerUpdateManyWithWhereWithoutSessionInput | QuizAnswerUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: QuizAnswerScalarWhereInput | QuizAnswerScalarWhereInput[]
  }

  export type QuizSessionCreateNestedOneWithoutAnswersInput = {
    create?: XOR<QuizSessionCreateWithoutAnswersInput, QuizSessionUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuizSessionCreateOrConnectWithoutAnswersInput
    connect?: QuizSessionWhereUniqueInput
  }

  export type QuizSessionUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<QuizSessionCreateWithoutAnswersInput, QuizSessionUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuizSessionCreateOrConnectWithoutAnswersInput
    upsert?: QuizSessionUpsertWithoutAnswersInput
    connect?: QuizSessionWhereUniqueInput
    update?: XOR<XOR<QuizSessionUpdateToOneWithWhereWithoutAnswersInput, QuizSessionUpdateWithoutAnswersInput>, QuizSessionUncheckedUpdateWithoutAnswersInput>
  }

  export type QuizSessionCreateNestedOneWithoutResultInput = {
    create?: XOR<QuizSessionCreateWithoutResultInput, QuizSessionUncheckedCreateWithoutResultInput>
    connectOrCreate?: QuizSessionCreateOrConnectWithoutResultInput
    connect?: QuizSessionWhereUniqueInput
  }

  export type VehicleRecommendationCreateNestedManyWithoutResultInput = {
    create?: XOR<VehicleRecommendationCreateWithoutResultInput, VehicleRecommendationUncheckedCreateWithoutResultInput> | VehicleRecommendationCreateWithoutResultInput[] | VehicleRecommendationUncheckedCreateWithoutResultInput[]
    connectOrCreate?: VehicleRecommendationCreateOrConnectWithoutResultInput | VehicleRecommendationCreateOrConnectWithoutResultInput[]
    createMany?: VehicleRecommendationCreateManyResultInputEnvelope
    connect?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
  }

  export type VehicleRecommendationUncheckedCreateNestedManyWithoutResultInput = {
    create?: XOR<VehicleRecommendationCreateWithoutResultInput, VehicleRecommendationUncheckedCreateWithoutResultInput> | VehicleRecommendationCreateWithoutResultInput[] | VehicleRecommendationUncheckedCreateWithoutResultInput[]
    connectOrCreate?: VehicleRecommendationCreateOrConnectWithoutResultInput | VehicleRecommendationCreateOrConnectWithoutResultInput[]
    createMany?: VehicleRecommendationCreateManyResultInputEnvelope
    connect?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
  }

  export type QuizSessionUpdateOneRequiredWithoutResultNestedInput = {
    create?: XOR<QuizSessionCreateWithoutResultInput, QuizSessionUncheckedCreateWithoutResultInput>
    connectOrCreate?: QuizSessionCreateOrConnectWithoutResultInput
    upsert?: QuizSessionUpsertWithoutResultInput
    connect?: QuizSessionWhereUniqueInput
    update?: XOR<XOR<QuizSessionUpdateToOneWithWhereWithoutResultInput, QuizSessionUpdateWithoutResultInput>, QuizSessionUncheckedUpdateWithoutResultInput>
  }

  export type VehicleRecommendationUpdateManyWithoutResultNestedInput = {
    create?: XOR<VehicleRecommendationCreateWithoutResultInput, VehicleRecommendationUncheckedCreateWithoutResultInput> | VehicleRecommendationCreateWithoutResultInput[] | VehicleRecommendationUncheckedCreateWithoutResultInput[]
    connectOrCreate?: VehicleRecommendationCreateOrConnectWithoutResultInput | VehicleRecommendationCreateOrConnectWithoutResultInput[]
    upsert?: VehicleRecommendationUpsertWithWhereUniqueWithoutResultInput | VehicleRecommendationUpsertWithWhereUniqueWithoutResultInput[]
    createMany?: VehicleRecommendationCreateManyResultInputEnvelope
    set?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    disconnect?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    delete?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    connect?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    update?: VehicleRecommendationUpdateWithWhereUniqueWithoutResultInput | VehicleRecommendationUpdateWithWhereUniqueWithoutResultInput[]
    updateMany?: VehicleRecommendationUpdateManyWithWhereWithoutResultInput | VehicleRecommendationUpdateManyWithWhereWithoutResultInput[]
    deleteMany?: VehicleRecommendationScalarWhereInput | VehicleRecommendationScalarWhereInput[]
  }

  export type VehicleRecommendationUncheckedUpdateManyWithoutResultNestedInput = {
    create?: XOR<VehicleRecommendationCreateWithoutResultInput, VehicleRecommendationUncheckedCreateWithoutResultInput> | VehicleRecommendationCreateWithoutResultInput[] | VehicleRecommendationUncheckedCreateWithoutResultInput[]
    connectOrCreate?: VehicleRecommendationCreateOrConnectWithoutResultInput | VehicleRecommendationCreateOrConnectWithoutResultInput[]
    upsert?: VehicleRecommendationUpsertWithWhereUniqueWithoutResultInput | VehicleRecommendationUpsertWithWhereUniqueWithoutResultInput[]
    createMany?: VehicleRecommendationCreateManyResultInputEnvelope
    set?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    disconnect?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    delete?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    connect?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    update?: VehicleRecommendationUpdateWithWhereUniqueWithoutResultInput | VehicleRecommendationUpdateWithWhereUniqueWithoutResultInput[]
    updateMany?: VehicleRecommendationUpdateManyWithWhereWithoutResultInput | VehicleRecommendationUpdateManyWithWhereWithoutResultInput[]
    deleteMany?: VehicleRecommendationScalarWhereInput | VehicleRecommendationScalarWhereInput[]
  }

  export type VehicleDimensionWeightCreateNestedOneWithoutVehicleInput = {
    create?: XOR<VehicleDimensionWeightCreateWithoutVehicleInput, VehicleDimensionWeightUncheckedCreateWithoutVehicleInput>
    connectOrCreate?: VehicleDimensionWeightCreateOrConnectWithoutVehicleInput
    connect?: VehicleDimensionWeightWhereUniqueInput
  }

  export type VehicleRecommendationCreateNestedManyWithoutVehicleInput = {
    create?: XOR<VehicleRecommendationCreateWithoutVehicleInput, VehicleRecommendationUncheckedCreateWithoutVehicleInput> | VehicleRecommendationCreateWithoutVehicleInput[] | VehicleRecommendationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleRecommendationCreateOrConnectWithoutVehicleInput | VehicleRecommendationCreateOrConnectWithoutVehicleInput[]
    createMany?: VehicleRecommendationCreateManyVehicleInputEnvelope
    connect?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
  }

  export type VehicleDimensionWeightUncheckedCreateNestedOneWithoutVehicleInput = {
    create?: XOR<VehicleDimensionWeightCreateWithoutVehicleInput, VehicleDimensionWeightUncheckedCreateWithoutVehicleInput>
    connectOrCreate?: VehicleDimensionWeightCreateOrConnectWithoutVehicleInput
    connect?: VehicleDimensionWeightWhereUniqueInput
  }

  export type VehicleRecommendationUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<VehicleRecommendationCreateWithoutVehicleInput, VehicleRecommendationUncheckedCreateWithoutVehicleInput> | VehicleRecommendationCreateWithoutVehicleInput[] | VehicleRecommendationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleRecommendationCreateOrConnectWithoutVehicleInput | VehicleRecommendationCreateOrConnectWithoutVehicleInput[]
    createMany?: VehicleRecommendationCreateManyVehicleInputEnvelope
    connect?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
  }

  export type VehicleDimensionWeightUpdateOneWithoutVehicleNestedInput = {
    create?: XOR<VehicleDimensionWeightCreateWithoutVehicleInput, VehicleDimensionWeightUncheckedCreateWithoutVehicleInput>
    connectOrCreate?: VehicleDimensionWeightCreateOrConnectWithoutVehicleInput
    upsert?: VehicleDimensionWeightUpsertWithoutVehicleInput
    disconnect?: VehicleDimensionWeightWhereInput | boolean
    delete?: VehicleDimensionWeightWhereInput | boolean
    connect?: VehicleDimensionWeightWhereUniqueInput
    update?: XOR<XOR<VehicleDimensionWeightUpdateToOneWithWhereWithoutVehicleInput, VehicleDimensionWeightUpdateWithoutVehicleInput>, VehicleDimensionWeightUncheckedUpdateWithoutVehicleInput>
  }

  export type VehicleRecommendationUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<VehicleRecommendationCreateWithoutVehicleInput, VehicleRecommendationUncheckedCreateWithoutVehicleInput> | VehicleRecommendationCreateWithoutVehicleInput[] | VehicleRecommendationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleRecommendationCreateOrConnectWithoutVehicleInput | VehicleRecommendationCreateOrConnectWithoutVehicleInput[]
    upsert?: VehicleRecommendationUpsertWithWhereUniqueWithoutVehicleInput | VehicleRecommendationUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: VehicleRecommendationCreateManyVehicleInputEnvelope
    set?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    disconnect?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    delete?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    connect?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    update?: VehicleRecommendationUpdateWithWhereUniqueWithoutVehicleInput | VehicleRecommendationUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: VehicleRecommendationUpdateManyWithWhereWithoutVehicleInput | VehicleRecommendationUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: VehicleRecommendationScalarWhereInput | VehicleRecommendationScalarWhereInput[]
  }

  export type VehicleDimensionWeightUncheckedUpdateOneWithoutVehicleNestedInput = {
    create?: XOR<VehicleDimensionWeightCreateWithoutVehicleInput, VehicleDimensionWeightUncheckedCreateWithoutVehicleInput>
    connectOrCreate?: VehicleDimensionWeightCreateOrConnectWithoutVehicleInput
    upsert?: VehicleDimensionWeightUpsertWithoutVehicleInput
    disconnect?: VehicleDimensionWeightWhereInput | boolean
    delete?: VehicleDimensionWeightWhereInput | boolean
    connect?: VehicleDimensionWeightWhereUniqueInput
    update?: XOR<XOR<VehicleDimensionWeightUpdateToOneWithWhereWithoutVehicleInput, VehicleDimensionWeightUpdateWithoutVehicleInput>, VehicleDimensionWeightUncheckedUpdateWithoutVehicleInput>
  }

  export type VehicleRecommendationUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<VehicleRecommendationCreateWithoutVehicleInput, VehicleRecommendationUncheckedCreateWithoutVehicleInput> | VehicleRecommendationCreateWithoutVehicleInput[] | VehicleRecommendationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleRecommendationCreateOrConnectWithoutVehicleInput | VehicleRecommendationCreateOrConnectWithoutVehicleInput[]
    upsert?: VehicleRecommendationUpsertWithWhereUniqueWithoutVehicleInput | VehicleRecommendationUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: VehicleRecommendationCreateManyVehicleInputEnvelope
    set?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    disconnect?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    delete?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    connect?: VehicleRecommendationWhereUniqueInput | VehicleRecommendationWhereUniqueInput[]
    update?: VehicleRecommendationUpdateWithWhereUniqueWithoutVehicleInput | VehicleRecommendationUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: VehicleRecommendationUpdateManyWithWhereWithoutVehicleInput | VehicleRecommendationUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: VehicleRecommendationScalarWhereInput | VehicleRecommendationScalarWhereInput[]
  }

  export type VehicleCreateNestedOneWithoutDimensionWeightsInput = {
    create?: XOR<VehicleCreateWithoutDimensionWeightsInput, VehicleUncheckedCreateWithoutDimensionWeightsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDimensionWeightsInput
    connect?: VehicleWhereUniqueInput
  }

  export type VehicleUpdateOneRequiredWithoutDimensionWeightsNestedInput = {
    create?: XOR<VehicleCreateWithoutDimensionWeightsInput, VehicleUncheckedCreateWithoutDimensionWeightsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDimensionWeightsInput
    upsert?: VehicleUpsertWithoutDimensionWeightsInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutDimensionWeightsInput, VehicleUpdateWithoutDimensionWeightsInput>, VehicleUncheckedUpdateWithoutDimensionWeightsInput>
  }

  export type PersonalityResultCreateNestedOneWithoutRecommendationsInput = {
    create?: XOR<PersonalityResultCreateWithoutRecommendationsInput, PersonalityResultUncheckedCreateWithoutRecommendationsInput>
    connectOrCreate?: PersonalityResultCreateOrConnectWithoutRecommendationsInput
    connect?: PersonalityResultWhereUniqueInput
  }

  export type VehicleCreateNestedOneWithoutRecommendationsInput = {
    create?: XOR<VehicleCreateWithoutRecommendationsInput, VehicleUncheckedCreateWithoutRecommendationsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutRecommendationsInput
    connect?: VehicleWhereUniqueInput
  }

  export type PersonalityResultUpdateOneRequiredWithoutRecommendationsNestedInput = {
    create?: XOR<PersonalityResultCreateWithoutRecommendationsInput, PersonalityResultUncheckedCreateWithoutRecommendationsInput>
    connectOrCreate?: PersonalityResultCreateOrConnectWithoutRecommendationsInput
    upsert?: PersonalityResultUpsertWithoutRecommendationsInput
    connect?: PersonalityResultWhereUniqueInput
    update?: XOR<XOR<PersonalityResultUpdateToOneWithWhereWithoutRecommendationsInput, PersonalityResultUpdateWithoutRecommendationsInput>, PersonalityResultUncheckedUpdateWithoutRecommendationsInput>
  }

  export type VehicleUpdateOneRequiredWithoutRecommendationsNestedInput = {
    create?: XOR<VehicleCreateWithoutRecommendationsInput, VehicleUncheckedCreateWithoutRecommendationsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutRecommendationsInput
    upsert?: VehicleUpsertWithoutRecommendationsInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutRecommendationsInput, VehicleUpdateWithoutRecommendationsInput>, VehicleUncheckedUpdateWithoutRecommendationsInput>
  }

  export type BuyingGuideCreaterelatedVehicleSlugsInput = {
    set: string[]
  }

  export type BuyingGuideUpdaterelatedVehicleSlugsInput = {
    set?: string[]
    push?: string | string[]
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

  export type QuizOptionCreateWithoutQuestionInput = {
    id?: string
    label: string
    order: number
    weights: JsonNullValueInput | InputJsonValue
  }

  export type QuizOptionUncheckedCreateWithoutQuestionInput = {
    id?: string
    label: string
    order: number
    weights: JsonNullValueInput | InputJsonValue
  }

  export type QuizOptionCreateOrConnectWithoutQuestionInput = {
    where: QuizOptionWhereUniqueInput
    create: XOR<QuizOptionCreateWithoutQuestionInput, QuizOptionUncheckedCreateWithoutQuestionInput>
  }

  export type QuizOptionCreateManyQuestionInputEnvelope = {
    data: QuizOptionCreateManyQuestionInput | QuizOptionCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type QuizOptionUpsertWithWhereUniqueWithoutQuestionInput = {
    where: QuizOptionWhereUniqueInput
    update: XOR<QuizOptionUpdateWithoutQuestionInput, QuizOptionUncheckedUpdateWithoutQuestionInput>
    create: XOR<QuizOptionCreateWithoutQuestionInput, QuizOptionUncheckedCreateWithoutQuestionInput>
  }

  export type QuizOptionUpdateWithWhereUniqueWithoutQuestionInput = {
    where: QuizOptionWhereUniqueInput
    data: XOR<QuizOptionUpdateWithoutQuestionInput, QuizOptionUncheckedUpdateWithoutQuestionInput>
  }

  export type QuizOptionUpdateManyWithWhereWithoutQuestionInput = {
    where: QuizOptionScalarWhereInput
    data: XOR<QuizOptionUpdateManyMutationInput, QuizOptionUncheckedUpdateManyWithoutQuestionInput>
  }

  export type QuizOptionScalarWhereInput = {
    AND?: QuizOptionScalarWhereInput | QuizOptionScalarWhereInput[]
    OR?: QuizOptionScalarWhereInput[]
    NOT?: QuizOptionScalarWhereInput | QuizOptionScalarWhereInput[]
    id?: StringFilter<"QuizOption"> | string
    questionId?: StringFilter<"QuizOption"> | string
    label?: StringFilter<"QuizOption"> | string
    order?: IntFilter<"QuizOption"> | number
    weights?: JsonFilter<"QuizOption">
  }

  export type QuizQuestionCreateWithoutOptionsInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    order: number
  }

  export type QuizQuestionUncheckedCreateWithoutOptionsInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    order: number
  }

  export type QuizQuestionCreateOrConnectWithoutOptionsInput = {
    where: QuizQuestionWhereUniqueInput
    create: XOR<QuizQuestionCreateWithoutOptionsInput, QuizQuestionUncheckedCreateWithoutOptionsInput>
  }

  export type QuizQuestionUpsertWithoutOptionsInput = {
    update: XOR<QuizQuestionUpdateWithoutOptionsInput, QuizQuestionUncheckedUpdateWithoutOptionsInput>
    create: XOR<QuizQuestionCreateWithoutOptionsInput, QuizQuestionUncheckedCreateWithoutOptionsInput>
    where?: QuizQuestionWhereInput
  }

  export type QuizQuestionUpdateToOneWithWhereWithoutOptionsInput = {
    where?: QuizQuestionWhereInput
    data: XOR<QuizQuestionUpdateWithoutOptionsInput, QuizQuestionUncheckedUpdateWithoutOptionsInput>
  }

  export type QuizQuestionUpdateWithoutOptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }

  export type QuizQuestionUncheckedUpdateWithoutOptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }

  export type PersonalityResultCreateWithoutSessionInput = {
    id?: string
    personalityCode: string
    practicalScore: number
    emotionalScore: number
    savingScore: number
    qualityScore: number
    comfortScore: number
    drivingScore: number
    brandScore: number
    valueScore: number
    recommendations?: VehicleRecommendationCreateNestedManyWithoutResultInput
  }

  export type PersonalityResultUncheckedCreateWithoutSessionInput = {
    id?: string
    personalityCode: string
    practicalScore: number
    emotionalScore: number
    savingScore: number
    qualityScore: number
    comfortScore: number
    drivingScore: number
    brandScore: number
    valueScore: number
    recommendations?: VehicleRecommendationUncheckedCreateNestedManyWithoutResultInput
  }

  export type PersonalityResultCreateOrConnectWithoutSessionInput = {
    where: PersonalityResultWhereUniqueInput
    create: XOR<PersonalityResultCreateWithoutSessionInput, PersonalityResultUncheckedCreateWithoutSessionInput>
  }

  export type QuizAnswerCreateWithoutSessionInput = {
    id?: string
    questionId: string
    optionId: string
    createdAt?: Date | string
  }

  export type QuizAnswerUncheckedCreateWithoutSessionInput = {
    id?: string
    questionId: string
    optionId: string
    createdAt?: Date | string
  }

  export type QuizAnswerCreateOrConnectWithoutSessionInput = {
    where: QuizAnswerWhereUniqueInput
    create: XOR<QuizAnswerCreateWithoutSessionInput, QuizAnswerUncheckedCreateWithoutSessionInput>
  }

  export type QuizAnswerCreateManySessionInputEnvelope = {
    data: QuizAnswerCreateManySessionInput | QuizAnswerCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type PersonalityResultUpsertWithoutSessionInput = {
    update: XOR<PersonalityResultUpdateWithoutSessionInput, PersonalityResultUncheckedUpdateWithoutSessionInput>
    create: XOR<PersonalityResultCreateWithoutSessionInput, PersonalityResultUncheckedCreateWithoutSessionInput>
    where?: PersonalityResultWhereInput
  }

  export type PersonalityResultUpdateToOneWithWhereWithoutSessionInput = {
    where?: PersonalityResultWhereInput
    data: XOR<PersonalityResultUpdateWithoutSessionInput, PersonalityResultUncheckedUpdateWithoutSessionInput>
  }

  export type PersonalityResultUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    personalityCode?: StringFieldUpdateOperationsInput | string
    practicalScore?: IntFieldUpdateOperationsInput | number
    emotionalScore?: IntFieldUpdateOperationsInput | number
    savingScore?: IntFieldUpdateOperationsInput | number
    qualityScore?: IntFieldUpdateOperationsInput | number
    comfortScore?: IntFieldUpdateOperationsInput | number
    drivingScore?: IntFieldUpdateOperationsInput | number
    brandScore?: IntFieldUpdateOperationsInput | number
    valueScore?: IntFieldUpdateOperationsInput | number
    recommendations?: VehicleRecommendationUpdateManyWithoutResultNestedInput
  }

  export type PersonalityResultUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    personalityCode?: StringFieldUpdateOperationsInput | string
    practicalScore?: IntFieldUpdateOperationsInput | number
    emotionalScore?: IntFieldUpdateOperationsInput | number
    savingScore?: IntFieldUpdateOperationsInput | number
    qualityScore?: IntFieldUpdateOperationsInput | number
    comfortScore?: IntFieldUpdateOperationsInput | number
    drivingScore?: IntFieldUpdateOperationsInput | number
    brandScore?: IntFieldUpdateOperationsInput | number
    valueScore?: IntFieldUpdateOperationsInput | number
    recommendations?: VehicleRecommendationUncheckedUpdateManyWithoutResultNestedInput
  }

  export type QuizAnswerUpsertWithWhereUniqueWithoutSessionInput = {
    where: QuizAnswerWhereUniqueInput
    update: XOR<QuizAnswerUpdateWithoutSessionInput, QuizAnswerUncheckedUpdateWithoutSessionInput>
    create: XOR<QuizAnswerCreateWithoutSessionInput, QuizAnswerUncheckedCreateWithoutSessionInput>
  }

  export type QuizAnswerUpdateWithWhereUniqueWithoutSessionInput = {
    where: QuizAnswerWhereUniqueInput
    data: XOR<QuizAnswerUpdateWithoutSessionInput, QuizAnswerUncheckedUpdateWithoutSessionInput>
  }

  export type QuizAnswerUpdateManyWithWhereWithoutSessionInput = {
    where: QuizAnswerScalarWhereInput
    data: XOR<QuizAnswerUpdateManyMutationInput, QuizAnswerUncheckedUpdateManyWithoutSessionInput>
  }

  export type QuizAnswerScalarWhereInput = {
    AND?: QuizAnswerScalarWhereInput | QuizAnswerScalarWhereInput[]
    OR?: QuizAnswerScalarWhereInput[]
    NOT?: QuizAnswerScalarWhereInput | QuizAnswerScalarWhereInput[]
    id?: StringFilter<"QuizAnswer"> | string
    sessionId?: StringFilter<"QuizAnswer"> | string
    questionId?: StringFilter<"QuizAnswer"> | string
    optionId?: StringFilter<"QuizAnswer"> | string
    createdAt?: DateTimeFilter<"QuizAnswer"> | Date | string
  }

  export type QuizSessionCreateWithoutAnswersInput = {
    id?: string
    status: string
    currentQuestion?: number
    personalityCode?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    result?: PersonalityResultCreateNestedOneWithoutSessionInput
  }

  export type QuizSessionUncheckedCreateWithoutAnswersInput = {
    id?: string
    status: string
    currentQuestion?: number
    personalityCode?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    result?: PersonalityResultUncheckedCreateNestedOneWithoutSessionInput
  }

  export type QuizSessionCreateOrConnectWithoutAnswersInput = {
    where: QuizSessionWhereUniqueInput
    create: XOR<QuizSessionCreateWithoutAnswersInput, QuizSessionUncheckedCreateWithoutAnswersInput>
  }

  export type QuizSessionUpsertWithoutAnswersInput = {
    update: XOR<QuizSessionUpdateWithoutAnswersInput, QuizSessionUncheckedUpdateWithoutAnswersInput>
    create: XOR<QuizSessionCreateWithoutAnswersInput, QuizSessionUncheckedCreateWithoutAnswersInput>
    where?: QuizSessionWhereInput
  }

  export type QuizSessionUpdateToOneWithWhereWithoutAnswersInput = {
    where?: QuizSessionWhereInput
    data: XOR<QuizSessionUpdateWithoutAnswersInput, QuizSessionUncheckedUpdateWithoutAnswersInput>
  }

  export type QuizSessionUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentQuestion?: IntFieldUpdateOperationsInput | number
    personalityCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: PersonalityResultUpdateOneWithoutSessionNestedInput
  }

  export type QuizSessionUncheckedUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentQuestion?: IntFieldUpdateOperationsInput | number
    personalityCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: PersonalityResultUncheckedUpdateOneWithoutSessionNestedInput
  }

  export type QuizSessionCreateWithoutResultInput = {
    id?: string
    status: string
    currentQuestion?: number
    personalityCode?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    answers?: QuizAnswerCreateNestedManyWithoutSessionInput
  }

  export type QuizSessionUncheckedCreateWithoutResultInput = {
    id?: string
    status: string
    currentQuestion?: number
    personalityCode?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    answers?: QuizAnswerUncheckedCreateNestedManyWithoutSessionInput
  }

  export type QuizSessionCreateOrConnectWithoutResultInput = {
    where: QuizSessionWhereUniqueInput
    create: XOR<QuizSessionCreateWithoutResultInput, QuizSessionUncheckedCreateWithoutResultInput>
  }

  export type VehicleRecommendationCreateWithoutResultInput = {
    id?: string
    rank: number
    score: number
    reason: string
    vehicle: VehicleCreateNestedOneWithoutRecommendationsInput
  }

  export type VehicleRecommendationUncheckedCreateWithoutResultInput = {
    id?: string
    vehicleId: string
    rank: number
    score: number
    reason: string
  }

  export type VehicleRecommendationCreateOrConnectWithoutResultInput = {
    where: VehicleRecommendationWhereUniqueInput
    create: XOR<VehicleRecommendationCreateWithoutResultInput, VehicleRecommendationUncheckedCreateWithoutResultInput>
  }

  export type VehicleRecommendationCreateManyResultInputEnvelope = {
    data: VehicleRecommendationCreateManyResultInput | VehicleRecommendationCreateManyResultInput[]
    skipDuplicates?: boolean
  }

  export type QuizSessionUpsertWithoutResultInput = {
    update: XOR<QuizSessionUpdateWithoutResultInput, QuizSessionUncheckedUpdateWithoutResultInput>
    create: XOR<QuizSessionCreateWithoutResultInput, QuizSessionUncheckedCreateWithoutResultInput>
    where?: QuizSessionWhereInput
  }

  export type QuizSessionUpdateToOneWithWhereWithoutResultInput = {
    where?: QuizSessionWhereInput
    data: XOR<QuizSessionUpdateWithoutResultInput, QuizSessionUncheckedUpdateWithoutResultInput>
  }

  export type QuizSessionUpdateWithoutResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentQuestion?: IntFieldUpdateOperationsInput | number
    personalityCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: QuizAnswerUpdateManyWithoutSessionNestedInput
  }

  export type QuizSessionUncheckedUpdateWithoutResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentQuestion?: IntFieldUpdateOperationsInput | number
    personalityCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: QuizAnswerUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type VehicleRecommendationUpsertWithWhereUniqueWithoutResultInput = {
    where: VehicleRecommendationWhereUniqueInput
    update: XOR<VehicleRecommendationUpdateWithoutResultInput, VehicleRecommendationUncheckedUpdateWithoutResultInput>
    create: XOR<VehicleRecommendationCreateWithoutResultInput, VehicleRecommendationUncheckedCreateWithoutResultInput>
  }

  export type VehicleRecommendationUpdateWithWhereUniqueWithoutResultInput = {
    where: VehicleRecommendationWhereUniqueInput
    data: XOR<VehicleRecommendationUpdateWithoutResultInput, VehicleRecommendationUncheckedUpdateWithoutResultInput>
  }

  export type VehicleRecommendationUpdateManyWithWhereWithoutResultInput = {
    where: VehicleRecommendationScalarWhereInput
    data: XOR<VehicleRecommendationUpdateManyMutationInput, VehicleRecommendationUncheckedUpdateManyWithoutResultInput>
  }

  export type VehicleRecommendationScalarWhereInput = {
    AND?: VehicleRecommendationScalarWhereInput | VehicleRecommendationScalarWhereInput[]
    OR?: VehicleRecommendationScalarWhereInput[]
    NOT?: VehicleRecommendationScalarWhereInput | VehicleRecommendationScalarWhereInput[]
    id?: StringFilter<"VehicleRecommendation"> | string
    resultId?: StringFilter<"VehicleRecommendation"> | string
    vehicleId?: StringFilter<"VehicleRecommendation"> | string
    rank?: IntFilter<"VehicleRecommendation"> | number
    score?: IntFilter<"VehicleRecommendation"> | number
    reason?: StringFilter<"VehicleRecommendation"> | string
  }

  export type VehicleDimensionWeightCreateWithoutVehicleInput = {
    id?: string
    practical: number
    emotional: number
    saving: number
    quality: number
    comfort: number
    driving: number
    brand: number
    value: number
  }

  export type VehicleDimensionWeightUncheckedCreateWithoutVehicleInput = {
    id?: string
    practical: number
    emotional: number
    saving: number
    quality: number
    comfort: number
    driving: number
    brand: number
    value: number
  }

  export type VehicleDimensionWeightCreateOrConnectWithoutVehicleInput = {
    where: VehicleDimensionWeightWhereUniqueInput
    create: XOR<VehicleDimensionWeightCreateWithoutVehicleInput, VehicleDimensionWeightUncheckedCreateWithoutVehicleInput>
  }

  export type VehicleRecommendationCreateWithoutVehicleInput = {
    id?: string
    rank: number
    score: number
    reason: string
    result: PersonalityResultCreateNestedOneWithoutRecommendationsInput
  }

  export type VehicleRecommendationUncheckedCreateWithoutVehicleInput = {
    id?: string
    resultId: string
    rank: number
    score: number
    reason: string
  }

  export type VehicleRecommendationCreateOrConnectWithoutVehicleInput = {
    where: VehicleRecommendationWhereUniqueInput
    create: XOR<VehicleRecommendationCreateWithoutVehicleInput, VehicleRecommendationUncheckedCreateWithoutVehicleInput>
  }

  export type VehicleRecommendationCreateManyVehicleInputEnvelope = {
    data: VehicleRecommendationCreateManyVehicleInput | VehicleRecommendationCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type VehicleDimensionWeightUpsertWithoutVehicleInput = {
    update: XOR<VehicleDimensionWeightUpdateWithoutVehicleInput, VehicleDimensionWeightUncheckedUpdateWithoutVehicleInput>
    create: XOR<VehicleDimensionWeightCreateWithoutVehicleInput, VehicleDimensionWeightUncheckedCreateWithoutVehicleInput>
    where?: VehicleDimensionWeightWhereInput
  }

  export type VehicleDimensionWeightUpdateToOneWithWhereWithoutVehicleInput = {
    where?: VehicleDimensionWeightWhereInput
    data: XOR<VehicleDimensionWeightUpdateWithoutVehicleInput, VehicleDimensionWeightUncheckedUpdateWithoutVehicleInput>
  }

  export type VehicleDimensionWeightUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    practical?: IntFieldUpdateOperationsInput | number
    emotional?: IntFieldUpdateOperationsInput | number
    saving?: IntFieldUpdateOperationsInput | number
    quality?: IntFieldUpdateOperationsInput | number
    comfort?: IntFieldUpdateOperationsInput | number
    driving?: IntFieldUpdateOperationsInput | number
    brand?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
  }

  export type VehicleDimensionWeightUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    practical?: IntFieldUpdateOperationsInput | number
    emotional?: IntFieldUpdateOperationsInput | number
    saving?: IntFieldUpdateOperationsInput | number
    quality?: IntFieldUpdateOperationsInput | number
    comfort?: IntFieldUpdateOperationsInput | number
    driving?: IntFieldUpdateOperationsInput | number
    brand?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
  }

  export type VehicleRecommendationUpsertWithWhereUniqueWithoutVehicleInput = {
    where: VehicleRecommendationWhereUniqueInput
    update: XOR<VehicleRecommendationUpdateWithoutVehicleInput, VehicleRecommendationUncheckedUpdateWithoutVehicleInput>
    create: XOR<VehicleRecommendationCreateWithoutVehicleInput, VehicleRecommendationUncheckedCreateWithoutVehicleInput>
  }

  export type VehicleRecommendationUpdateWithWhereUniqueWithoutVehicleInput = {
    where: VehicleRecommendationWhereUniqueInput
    data: XOR<VehicleRecommendationUpdateWithoutVehicleInput, VehicleRecommendationUncheckedUpdateWithoutVehicleInput>
  }

  export type VehicleRecommendationUpdateManyWithWhereWithoutVehicleInput = {
    where: VehicleRecommendationScalarWhereInput
    data: XOR<VehicleRecommendationUpdateManyMutationInput, VehicleRecommendationUncheckedUpdateManyWithoutVehicleInput>
  }

  export type VehicleCreateWithoutDimensionWeightsInput = {
    id?: string
    slug: string
    brand: string
    series: string
    modelName: string
    priceMin: number
    priceMax: number
    energyType: string
    bodyType: string
    heroImage: string
    summary: string
    recommendation: string
    recommendations?: VehicleRecommendationCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutDimensionWeightsInput = {
    id?: string
    slug: string
    brand: string
    series: string
    modelName: string
    priceMin: number
    priceMax: number
    energyType: string
    bodyType: string
    heroImage: string
    summary: string
    recommendation: string
    recommendations?: VehicleRecommendationUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutDimensionWeightsInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutDimensionWeightsInput, VehicleUncheckedCreateWithoutDimensionWeightsInput>
  }

  export type VehicleUpsertWithoutDimensionWeightsInput = {
    update: XOR<VehicleUpdateWithoutDimensionWeightsInput, VehicleUncheckedUpdateWithoutDimensionWeightsInput>
    create: XOR<VehicleCreateWithoutDimensionWeightsInput, VehicleUncheckedCreateWithoutDimensionWeightsInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutDimensionWeightsInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutDimensionWeightsInput, VehicleUncheckedUpdateWithoutDimensionWeightsInput>
  }

  export type VehicleUpdateWithoutDimensionWeightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    series?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    priceMin?: IntFieldUpdateOperationsInput | number
    priceMax?: IntFieldUpdateOperationsInput | number
    energyType?: StringFieldUpdateOperationsInput | string
    bodyType?: StringFieldUpdateOperationsInput | string
    heroImage?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    recommendations?: VehicleRecommendationUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutDimensionWeightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    series?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    priceMin?: IntFieldUpdateOperationsInput | number
    priceMax?: IntFieldUpdateOperationsInput | number
    energyType?: StringFieldUpdateOperationsInput | string
    bodyType?: StringFieldUpdateOperationsInput | string
    heroImage?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    recommendations?: VehicleRecommendationUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type PersonalityResultCreateWithoutRecommendationsInput = {
    id?: string
    personalityCode: string
    practicalScore: number
    emotionalScore: number
    savingScore: number
    qualityScore: number
    comfortScore: number
    drivingScore: number
    brandScore: number
    valueScore: number
    session: QuizSessionCreateNestedOneWithoutResultInput
  }

  export type PersonalityResultUncheckedCreateWithoutRecommendationsInput = {
    id?: string
    sessionId: string
    personalityCode: string
    practicalScore: number
    emotionalScore: number
    savingScore: number
    qualityScore: number
    comfortScore: number
    drivingScore: number
    brandScore: number
    valueScore: number
  }

  export type PersonalityResultCreateOrConnectWithoutRecommendationsInput = {
    where: PersonalityResultWhereUniqueInput
    create: XOR<PersonalityResultCreateWithoutRecommendationsInput, PersonalityResultUncheckedCreateWithoutRecommendationsInput>
  }

  export type VehicleCreateWithoutRecommendationsInput = {
    id?: string
    slug: string
    brand: string
    series: string
    modelName: string
    priceMin: number
    priceMax: number
    energyType: string
    bodyType: string
    heroImage: string
    summary: string
    recommendation: string
    dimensionWeights?: VehicleDimensionWeightCreateNestedOneWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutRecommendationsInput = {
    id?: string
    slug: string
    brand: string
    series: string
    modelName: string
    priceMin: number
    priceMax: number
    energyType: string
    bodyType: string
    heroImage: string
    summary: string
    recommendation: string
    dimensionWeights?: VehicleDimensionWeightUncheckedCreateNestedOneWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutRecommendationsInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutRecommendationsInput, VehicleUncheckedCreateWithoutRecommendationsInput>
  }

  export type PersonalityResultUpsertWithoutRecommendationsInput = {
    update: XOR<PersonalityResultUpdateWithoutRecommendationsInput, PersonalityResultUncheckedUpdateWithoutRecommendationsInput>
    create: XOR<PersonalityResultCreateWithoutRecommendationsInput, PersonalityResultUncheckedCreateWithoutRecommendationsInput>
    where?: PersonalityResultWhereInput
  }

  export type PersonalityResultUpdateToOneWithWhereWithoutRecommendationsInput = {
    where?: PersonalityResultWhereInput
    data: XOR<PersonalityResultUpdateWithoutRecommendationsInput, PersonalityResultUncheckedUpdateWithoutRecommendationsInput>
  }

  export type PersonalityResultUpdateWithoutRecommendationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    personalityCode?: StringFieldUpdateOperationsInput | string
    practicalScore?: IntFieldUpdateOperationsInput | number
    emotionalScore?: IntFieldUpdateOperationsInput | number
    savingScore?: IntFieldUpdateOperationsInput | number
    qualityScore?: IntFieldUpdateOperationsInput | number
    comfortScore?: IntFieldUpdateOperationsInput | number
    drivingScore?: IntFieldUpdateOperationsInput | number
    brandScore?: IntFieldUpdateOperationsInput | number
    valueScore?: IntFieldUpdateOperationsInput | number
    session?: QuizSessionUpdateOneRequiredWithoutResultNestedInput
  }

  export type PersonalityResultUncheckedUpdateWithoutRecommendationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    personalityCode?: StringFieldUpdateOperationsInput | string
    practicalScore?: IntFieldUpdateOperationsInput | number
    emotionalScore?: IntFieldUpdateOperationsInput | number
    savingScore?: IntFieldUpdateOperationsInput | number
    qualityScore?: IntFieldUpdateOperationsInput | number
    comfortScore?: IntFieldUpdateOperationsInput | number
    drivingScore?: IntFieldUpdateOperationsInput | number
    brandScore?: IntFieldUpdateOperationsInput | number
    valueScore?: IntFieldUpdateOperationsInput | number
  }

  export type VehicleUpsertWithoutRecommendationsInput = {
    update: XOR<VehicleUpdateWithoutRecommendationsInput, VehicleUncheckedUpdateWithoutRecommendationsInput>
    create: XOR<VehicleCreateWithoutRecommendationsInput, VehicleUncheckedCreateWithoutRecommendationsInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutRecommendationsInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutRecommendationsInput, VehicleUncheckedUpdateWithoutRecommendationsInput>
  }

  export type VehicleUpdateWithoutRecommendationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    series?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    priceMin?: IntFieldUpdateOperationsInput | number
    priceMax?: IntFieldUpdateOperationsInput | number
    energyType?: StringFieldUpdateOperationsInput | string
    bodyType?: StringFieldUpdateOperationsInput | string
    heroImage?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    dimensionWeights?: VehicleDimensionWeightUpdateOneWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutRecommendationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    series?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    priceMin?: IntFieldUpdateOperationsInput | number
    priceMax?: IntFieldUpdateOperationsInput | number
    energyType?: StringFieldUpdateOperationsInput | string
    bodyType?: StringFieldUpdateOperationsInput | string
    heroImage?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    dimensionWeights?: VehicleDimensionWeightUncheckedUpdateOneWithoutVehicleNestedInput
  }

  export type QuizOptionCreateManyQuestionInput = {
    id?: string
    label: string
    order: number
    weights: JsonNullValueInput | InputJsonValue
  }

  export type QuizOptionUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    weights?: JsonNullValueInput | InputJsonValue
  }

  export type QuizOptionUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    weights?: JsonNullValueInput | InputJsonValue
  }

  export type QuizOptionUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    weights?: JsonNullValueInput | InputJsonValue
  }

  export type QuizAnswerCreateManySessionInput = {
    id?: string
    questionId: string
    optionId: string
    createdAt?: Date | string
  }

  export type QuizAnswerUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    optionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAnswerUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    optionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAnswerUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    optionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleRecommendationCreateManyResultInput = {
    id?: string
    vehicleId: string
    rank: number
    score: number
    reason: string
  }

  export type VehicleRecommendationUpdateWithoutResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    vehicle?: VehicleUpdateOneRequiredWithoutRecommendationsNestedInput
  }

  export type VehicleRecommendationUncheckedUpdateWithoutResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleRecommendationUncheckedUpdateManyWithoutResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleRecommendationCreateManyVehicleInput = {
    id?: string
    resultId: string
    rank: number
    score: number
    reason: string
  }

  export type VehicleRecommendationUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    result?: PersonalityResultUpdateOneRequiredWithoutRecommendationsNestedInput
  }

  export type VehicleRecommendationUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    resultId?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleRecommendationUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    resultId?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
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