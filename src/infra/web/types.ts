import {
  ContextConfigDefault,
  FastifyBaseLogger,
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface,
  RouteShorthandOptionsWithHandler,
} from 'fastify';
import {
  FastifyPluginAsyncTypebox,
  FastifyPluginCallbackTypebox,
  TypeBoxTypeProvider,
} from '@fastify/type-provider-typebox';

export {
  FastifyPluginAsyncTypebox,
  FastifyPluginCallbackTypebox,
} from '@fastify/type-provider-typebox';

export type FastifyRequestTypebox<TSchema extends FastifySchema> =
  FastifyRequest<
    RouteGenericInterface,
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    TSchema,
    TypeBoxTypeProvider
  >;

export type FastifyReplyTypebox<TSchema extends FastifySchema> = FastifyReply<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  ContextConfigDefault,
  TSchema,
  TypeBoxTypeProvider
>;

export type RouteOptionsTypebox<TSchema extends FastifySchema> =
  RouteShorthandOptionsWithHandler<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    RouteGenericInterface,
    ContextConfigDefault,
    TSchema,
    TypeBoxTypeProvider,
    FastifyBaseLogger
  >;

export const routeOptions = <TSchema extends FastifySchema>(
  opts: RouteOptionsTypebox<TSchema>
) => opts;

export type FastifyInstanceTypebox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;

export interface ServerPlugin<
  PluginType = FastifyPluginAsyncTypebox | FastifyPluginCallbackTypebox,
> {
  plugin: PluginType;
  options?: FastifyPluginOptions;
}
