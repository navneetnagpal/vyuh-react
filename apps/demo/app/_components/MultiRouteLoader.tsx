import { RouteBase } from '@/content/route-base';
import { useVyuh } from '@/hooks/use-vyuh';
import { FieldKey } from '@/plugins/content/content-provider';
import { DocumentLoader, fetchMultipleWithQuery } from '@/ui/document-loader';
import Link from 'next/link';

export function MultiRoutLoader() {
  return (
    <DocumentLoader
      fetchContent={fetchMultipleWithQuery(
        `*[_type == "vyuh.route"]{_id, title, path, _updatedAt} | order(_updatedAt desc)`,
        {
          live: true,
        },
      )}
      renderContent={(content) => (
        <DocumentList content={content as RouteBase[]} />
      )}
      allowRefresh={true}
    />
  );
}

// Private DocumentList component defined below
function DocumentList({ content }: { content: RouteBase | RouteBase[] }) {
  const { plugins } = useVyuh();

  const routes = Array.isArray(content)
    ? (content as RouteBase[])
    : ([content] as RouteBase[]);

  return (
    <div className={'container mx-auto p-4'}>
      <h1 className={'py-4 text-3xl font-bold'}>Routes</h1>
      <ul
        className={
          'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }
      >
        {routes.map((route) => {
          const id = plugins.content.provider.fieldValue(FieldKey.id, route);
          return (
            <Link href={route.path} key={id}>
              <li
                className={
                  'hover:bg-base-300/50 hover:border-primary rounded border border-gray-200 p-4 transition-shadow duration-200 hover:shadow-md'
                }
              >
                <div>{route.title}</div>
                <div className={'text-sm text-gray-500'}>{route.path}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}