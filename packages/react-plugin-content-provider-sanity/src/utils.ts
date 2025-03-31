export interface RouteQuery {
  query: string;
  params: Record<string, string>;
}

const routeProjection = `{
    ...,
    "category": category->,
    "regions": regions[] {
      "identifier": region->identifier, 
      "title": region->title,
      items,
    },
  }`;

export const makeRouteQuery = (path?: string, routeId?: string) => {
  let query: string;

  let params: Record<string, string> = {};
  if (path) {
    query = `*[_type in ["vyuh.route", "vyuh.conditionalRoute"] && path == $path] | order(_type asc, _updatedAt desc) ${routeProjection} [0]`;
    params.path = path;
  } else if (routeId) {
    query = `*[_id == $routeId] ${routeProjection} [0]`;
    params.routeId = routeId;
  } else {
    throw new Error('Either path or routeId must be provided');
  }
  return {
    query,
    params,
  };
};

export interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion?: string;
  useCdn?: boolean;
  perspective?: 'published' | 'drafts' | 'raw';
  token?: string;
}
