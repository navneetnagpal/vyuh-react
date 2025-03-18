import { RouteBuilder } from '@vyuh/extension-content';

export default function Home() {
  return <RouteBuilder url={'/misc/text'} allowRefresh={true} />;
}
