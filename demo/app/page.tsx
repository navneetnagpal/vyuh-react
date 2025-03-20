import { RouteBuilder } from '@vyuh/react-extension-content';

export default function Home() {
  // Load the homepage route from CMS
  return <RouteBuilder url="/" allowRefresh={true} />;
}
